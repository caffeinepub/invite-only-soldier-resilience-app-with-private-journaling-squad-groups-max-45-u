/**
 * IZOF Integration Utilities
 * 
 * Cross-factor helpers that combine IZOF stress data with sleep and training load.
 */

import type { DailyZoneCheckEntry } from '../types/izof';
import type { LocalDailyInput, SleepLog } from './localDataStore';

export interface CrossFactorInsight {
  type: 'recovery-priority' | 'overtraining-risk' | 'sleep-stress-link' | 'balanced';
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface MissingDataPrompt {
  type: 'sleep' | 'training' | 'stress';
  message: string;
}

/**
 * Generate cross-factor insights from IZOF, daily inputs, and sleep logs
 */
export function generateCrossFactorInsights(
  izofEntries: DailyZoneCheckEntry[],
  dailyInputs: LocalDailyInput[],
  sleepLogs: SleepLog[]
): { insights: CrossFactorInsight[]; missingData: MissingDataPrompt[] } {
  const insights: CrossFactorInsight[] = [];
  const missingData: MissingDataPrompt[] = [];

  // Check for missing data
  if (izofEntries.length === 0) {
    missingData.push({
      type: 'stress',
      message: 'No IZOF stress data logged yet. Complete a Daily Zone Check to begin tracking.',
    });
  }

  if (dailyInputs.length === 0) {
    missingData.push({
      type: 'training',
      message: 'No daily readiness inputs logged yet. Log your training load and stress on the Dashboard.',
    });
  }

  if (sleepLogs.length === 0) {
    missingData.push({
      type: 'sleep',
      message: 'No sleep logs recorded yet. Check in your sleep performance to track recovery.',
    });
  }

  // If any data is missing, return early
  if (missingData.length > 0) {
    return { insights, missingData };
  }

  // Get recent data (last 7 days)
  const recentIzof = izofEntries.slice(-7);
  const recentInputs = dailyInputs.slice(-7);
  const recentSleep = sleepLogs.slice(-7);

  // Calculate averages
  const avgStress = recentIzof.reduce((sum, e) => sum + e.stressRating, 0) / recentIzof.length;
  const avgTrainingLoad = recentInputs.reduce((sum, e) => sum + e.trainingLoadScore, 0) / recentInputs.length;
  const avgSleepDuration = recentSleep.reduce((sum, e) => sum + e.duration, 0) / recentSleep.length;

  // Insight 1: Overtraining risk (high stress + high training load + low sleep)
  if (avgStress >= 7 && avgTrainingLoad >= 70 && avgSleepDuration < 6) {
    insights.push({
      type: 'overtraining-risk',
      message: 'High stress combined with heavy training load and insufficient sleep. Prioritize recovery to maintain performance and prevent burnout.',
      severity: 'critical',
    });
  }

  // Insight 2: Sleep-stress link (high stress + poor sleep)
  else if (avgStress >= 7 && avgSleepDuration < 6) {
    insights.push({
      type: 'sleep-stress-link',
      message: 'Elevated stress paired with reduced sleep. Focus on sleep hygiene and stress regulation techniques to break this cycle.',
      severity: 'warning',
    });
  }

  // Insight 3: Recovery priority (high training load + low sleep)
  else if (avgTrainingLoad >= 70 && avgSleepDuration < 6.5) {
    insights.push({
      type: 'recovery-priority',
      message: 'Heavy training load with suboptimal sleep. Recovery is a performance multiplier—prioritize sleep and active recovery.',
      severity: 'warning',
    });
  }

  // Insight 4: Balanced state
  else if (avgStress >= 4 && avgStress <= 7 && avgSleepDuration >= 7 && avgTrainingLoad < 60) {
    insights.push({
      type: 'balanced',
      message: 'Stress, training, and sleep are well-balanced. Maintain this state to sustain peak performance.',
      severity: 'info',
    });
  }

  return { insights, missingData };
}
