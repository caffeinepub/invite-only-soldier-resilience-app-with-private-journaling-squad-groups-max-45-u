/**
 * Assessment Hook (Local-Only)
 * 
 * Manages assessment runs, results storage, history, and trends.
 * All data is stored locally and scoped to the device UUID.
 * 
 * Developer notes:
 * - Assessment runs are stored in localStorage with key: dagger-assessments-{localUuid}
 * - Trend summaries compute simple deltas between first and latest runs
 * - Unlock evaluation helpers provide signals for mission unlock rules
 */

import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import type { AssessmentResult, AssessmentType } from '../types/assessments';

const STORAGE_KEY_PREFIX = 'dagger-assessments-';

function getAssessmentsKey(localUuid: string): string {
  return `${STORAGE_KEY_PREFIX}${localUuid}`;
}

function loadAssessments(localUuid: string): AssessmentResult[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(getAssessmentsKey(localUuid));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load assessments:', error);
  }
  
  return [];
}

function saveAssessments(localUuid: string, assessments: AssessmentResult[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getAssessmentsKey(localUuid), JSON.stringify(assessments));
  } catch (error) {
    console.error('Failed to save assessments:', error);
  }
}

export function useAssessments() {
  const { profile } = useLocalProfile();
  const [assessments, setAssessments] = useState<AssessmentResult[]>(() => 
    loadAssessments(profile.localUuid)
  );

  useEffect(() => {
    const loaded = loadAssessments(profile.localUuid);
    setAssessments(loaded);
  }, [profile.localUuid]);

  const saveAssessmentResult = (result: AssessmentResult) => {
    const updated = [...assessments, result];
    setAssessments(updated);
    saveAssessments(profile.localUuid, updated);
  };

  const getAssessmentHistory = (assessmentType: AssessmentType): AssessmentResult[] => {
    return assessments
      .filter(a => a.assessmentType === assessmentType)
      .sort((a, b) => b.completedAt - a.completedAt);
  };

  const getLatestAssessment = (assessmentType: AssessmentType): AssessmentResult | null => {
    const history = getAssessmentHistory(assessmentType);
    return history.length > 0 ? history[0] : null;
  };

  const getAssessmentTrend = (assessmentType: AssessmentType): {
    hasMultiple: boolean;
    firstOutcome?: string;
    latestOutcome?: string;
    scoreDelta?: Record<string, number>;
  } => {
    const history = getAssessmentHistory(assessmentType);
    if (history.length < 2) {
      return { hasMultiple: false };
    }

    const first = history[history.length - 1];
    const latest = history[0];
    
    const scoreDelta: Record<string, number> = {};
    if (first.outcome.scores && latest.outcome.scores) {
      Object.keys(latest.outcome.scores).forEach(key => {
        const firstScore = first.outcome.scores?.[key] || 0;
        const latestScore = latest.outcome.scores?.[key] || 0;
        scoreDelta[key] = latestScore - firstScore;
      });
    }

    return {
      hasMultiple: true,
      firstOutcome: first.outcome.label,
      latestOutcome: latest.outcome.label,
      scoreDelta,
    };
  };

  // Helper for unlock evaluation
  const hasCompletedAssessment = (assessmentType: AssessmentType): boolean => {
    return assessments.some(a => a.assessmentType === assessmentType);
  };

  const hasOutcome = (assessmentType: AssessmentType, outcomePattern: string): boolean => {
    const latest = getLatestAssessment(assessmentType);
    if (!latest) return false;
    return latest.outcome.outcomeId.includes(outcomePattern);
  };

  return {
    assessments,
    saveAssessmentResult,
    getAssessmentHistory,
    getLatestAssessment,
    getAssessmentTrend,
    hasCompletedAssessment,
    hasOutcome,
  };
}
