import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { getReadinessState } from '../utils/localDataStore';
import type { MissionResult, OperatorProgression } from '../types/missions';
import { getRankFromXP, RANKS } from '../types/missions';

interface MissionProgressionState {
  xp: number;
  rank: string;
  tier: number;
  unlockables: string[];
  missionHistory: MissionResult[];
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`localStorage.getItem failed for key ${key}:`, e);
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage.setItem failed for key ${key}:`, e);
  }
}

function getProgressionState(localUuid: string): MissionProgressionState {
  const key = `dagger-mission-progression-${localUuid}`;
  const data = safeLocalStorageGet(key);
  if (data) {
    return JSON.parse(data);
  }
  return {
    xp: 0,
    rank: RANKS[0].name,
    tier: 0,
    unlockables: [],
    missionHistory: [],
  };
}

function saveProgressionState(localUuid: string, state: MissionProgressionState): void {
  const key = `dagger-mission-progression-${localUuid}`;
  safeLocalStorageSet(key, JSON.stringify(state));
}

export function useMissionProgression() {
  const { profile } = useLocalProfile();
  const [progression, setProgression] = useState<OperatorProgression>(() => {
    const state = getProgressionState(profile.localUuid);
    return {
      xp: state.xp,
      rank: state.rank,
      tier: state.tier,
      unlockables: state.unlockables,
      missionHistory: state.missionHistory,
    };
  });

  useEffect(() => {
    const state = getProgressionState(profile.localUuid);
    setProgression({
      xp: state.xp,
      rank: state.rank,
      tier: state.tier,
      unlockables: state.unlockables,
      missionHistory: state.missionHistory,
    });
  }, [profile.localUuid]);

  const applyMissionResult = (result: MissionResult) => {
    const state = getProgressionState(profile.localUuid);
    const newXP = state.xp + result.xpEarned;
    const rankInfo = getRankFromXP(newXP);

    const newUnlockables = [...state.unlockables];
    result.sideQuestsCompleted.forEach((sqId) => {
      if (!newUnlockables.includes(sqId)) {
        newUnlockables.push(sqId);
      }
    });

    const newState: MissionProgressionState = {
      xp: newXP,
      rank: rankInfo.name,
      tier: rankInfo.tier,
      unlockables: newUnlockables,
      missionHistory: [...state.missionHistory, result],
    };

    saveProgressionState(profile.localUuid, newState);
    setProgression({
      xp: newXP,
      rank: rankInfo.name,
      tier: rankInfo.tier,
      unlockables: newState.unlockables,
      missionHistory: newState.missionHistory,
    });
  };

  const grantAdHocXP = (xp: number, source: string) => {
    const state = getProgressionState(profile.localUuid);
    const newXP = state.xp + xp;
    const rankInfo = getRankFromXP(newXP);

    const adHocResult: MissionResult = {
      missionId: `adhoc-${Date.now()}`,
      passed: true,
      score: xp,
      maxScore: xp,
      xpEarned: xp,
      sideQuestsCompleted: [],
      completedAt: Date.now(),
      choices: {},
    };

    const newState: MissionProgressionState = {
      xp: newXP,
      rank: rankInfo.name,
      tier: rankInfo.tier,
      unlockables: state.unlockables,
      missionHistory: [...state.missionHistory, adHocResult],
    };

    saveProgressionState(profile.localUuid, newState);
    setProgression({
      xp: newXP,
      rank: rankInfo.name,
      tier: rankInfo.tier,
      unlockables: newState.unlockables,
      missionHistory: newState.missionHistory,
    });
  };

  const grantUnlockable = (unlockableId: string) => {
    const state = getProgressionState(profile.localUuid);
    if (state.unlockables.includes(unlockableId)) {
      return;
    }

    const newState: MissionProgressionState = {
      ...state,
      unlockables: [...state.unlockables, unlockableId],
    };

    saveProgressionState(profile.localUuid, newState);
    setProgression({
      ...progression,
      unlockables: newState.unlockables,
    });
  };

  const hasUnlockable = (unlockableId: string): boolean => {
    return progression.unlockables.includes(unlockableId);
  };

  const getReadinessStreak = (): number => {
    const readinessState = getReadinessState(profile.localUuid);
    return readinessState.streakCount;
  };

  const rankInfo = getRankFromXP(progression.xp);

  const getMissionResult = (missionId: string): MissionResult | null => {
    return progression.missionHistory.find(r => r.missionId === missionId) || null;
  };

  const evaluateUnlockRules = (unlockRules?: any[]): { locked: boolean; reason: string } => {
    if (!unlockRules || unlockRules.length === 0) return { locked: false, reason: '' };
    
    for (const rule of unlockRules) {
      switch (rule.type) {
        case 'rank':
          if (progression.tier < rule.value) {
            return { locked: true, reason: rule.description };
          }
          break;
        case 'streak':
          if (getReadinessStreak() < rule.value) {
            return { locked: true, reason: rule.description };
          }
          break;
        case 'mission-complete':
          if (!getMissionResult(rule.value)) {
            return { locked: true, reason: rule.description };
          }
          break;
      }
    }
    
    return { locked: false, reason: '' };
  };

  return {
    progression,
    applyMissionResult,
    grantAdHocXP,
    grantUnlockable,
    hasUnlockable,
    getReadinessStreak,
    rankInfo,
    getMissionResult,
    evaluateUnlockRules,
  };
}
