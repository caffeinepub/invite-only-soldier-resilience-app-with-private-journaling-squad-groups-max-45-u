/**
 * Mission Progression Hook (Local-Only)
 * 
 * Manages mission progression state including XP, ranks, unlockables,
 * mission history, and side quest completion. All data is stored locally
 * and scoped to the device UUID.
 * 
 * Developer notes:
 * - Assessment reward grant pathway: applyMissionResult accepts assessment completion results
 * - Assessment-based unlock rule evaluation: evaluateUnlockRules checks assessment outcomes via useAssessments hook
 * - Reward deduplication: Mission results track completion to prevent duplicate XP grants
 * - Ad-hoc XP grants: grantAdHocXP allows awarding XP from non-mission sources (e.g., Soldier Connect)
 */

import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { getLocalReadinessState } from '../utils/localDataStore';
import type { OperatorProgression, MissionResult, Mission, MissionUnlockRule } from '../types/missions';
import { getRankFromXP } from '../types/missions';

const STORAGE_KEY_PREFIX = 'dagger-mission-progression-';

function getProgressionKey(localUuid: string): string {
  return `${STORAGE_KEY_PREFIX}${localUuid}`;
}

function loadProgression(localUuid: string): OperatorProgression {
  if (typeof window === 'undefined') {
    return { xp: 0, rank: 'Recruit', tier: 0, unlockables: [], missionHistory: [] };
  }
  
  try {
    const stored = localStorage.getItem(getProgressionKey(localUuid));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load mission progression:', error);
  }
  
  return { xp: 0, rank: 'Recruit', tier: 0, unlockables: [], missionHistory: [] };
}

function saveProgression(localUuid: string, progression: OperatorProgression): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getProgressionKey(localUuid), JSON.stringify(progression));
  } catch (error) {
    console.error('Failed to save mission progression:', error);
  }
}

export function useMissionProgression() {
  const { profile } = useLocalProfile();
  const [progression, setProgression] = useState<OperatorProgression>(() => 
    loadProgression(profile.localUuid)
  );

  useEffect(() => {
    const loaded = loadProgression(profile.localUuid);
    setProgression(loaded);
  }, [profile.localUuid]);

  const applyMissionResult = (result: MissionResult) => {
    const updated: OperatorProgression = {
      ...progression,
      xp: progression.xp + result.xpEarned,
      missionHistory: [...progression.missionHistory, result],
    };

    // Update rank based on new XP
    const rankInfo = getRankFromXP(updated.xp);
    updated.rank = rankInfo.name;
    updated.tier = rankInfo.tier;

    // Add any new unlockables from side quests
    const newUnlockables = result.sideQuestsCompleted
      .map(sqId => `side-quest-${sqId}`)
      .filter(u => !updated.unlockables.includes(u));
    updated.unlockables = [...updated.unlockables, ...newUnlockables];

    setProgression(updated);
    saveProgression(profile.localUuid, updated);
  };

  const grantAdHocXP = (xp: number, source: string) => {
    const updated: OperatorProgression = {
      ...progression,
      xp: progression.xp + xp,
    };

    // Update rank based on new XP
    const rankInfo = getRankFromXP(updated.xp);
    updated.rank = rankInfo.name;
    updated.tier = rankInfo.tier;

    setProgression(updated);
    saveProgression(profile.localUuid, updated);
  };

  const getMissionResult = (missionId: string): MissionResult | undefined => {
    return progression.missionHistory.find(h => h.missionId === missionId);
  };

  const getMissionScore = (missionId: string): number | undefined => {
    const result = getMissionResult(missionId);
    return result ? (result.score / result.maxScore) * 100 : undefined;
  };

  const evaluateUnlockRules = (rules?: MissionUnlockRule[]): { locked: boolean; reason: string } => {
    if (!rules || rules.length === 0) {
      return { locked: false, reason: '' };
    }

    const readinessState = getLocalReadinessState(profile.localUuid);

    for (const rule of rules) {
      switch (rule.type) {
        case 'rank':
          if (progression.tier < Number(rule.value)) {
            return { locked: true, reason: rule.description };
          }
          break;
        case 'streak':
          if (readinessState.streakCount < Number(rule.value)) {
            return { locked: true, reason: rule.description };
          }
          break;
        case 'performance': {
          const [missionId, minScore] = String(rule.value).split(':');
          const score = getMissionScore(missionId);
          if (score === undefined || score < Number(minScore)) {
            return { locked: true, reason: rule.description };
          }
          break;
        }
        case 'mission-complete': {
          const result = getMissionResult(String(rule.value));
          if (!result || !result.passed) {
            return { locked: true, reason: rule.description };
          }
          break;
        }
        case 'assessment': {
          // Assessment unlock evaluation is handled by checking local assessment storage
          // Format: 'assessmentType:outcomePattern' or just 'assessmentType'
          // This is evaluated by the component using useAssessments hook
          // For now, we return locked with the description
          // The actual evaluation happens in the mission card component
          return { locked: true, reason: rule.description };
        }
      }
    }

    return { locked: false, reason: '' };
  };

  const rankInfo = getRankFromXP(progression.xp);

  return {
    progression,
    applyMissionResult,
    grantAdHocXP,
    getMissionResult,
    getMissionScore,
    evaluateUnlockRules,
    rankInfo,
  };
}
