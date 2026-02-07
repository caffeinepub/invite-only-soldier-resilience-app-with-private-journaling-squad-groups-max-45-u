/**
 * IZOF Analytics Utilities
 * 
 * Local analytics for stress trends, correlations, and pattern detection.
 */

import type { DailyZoneCheckEntry, IZOFRange } from '../types/izof';
import { estimateIZOFRange } from './izofLogic';

export interface StressTrendPoint {
  date: string;
  stressRating: number;
  performanceOutcome?: number;
}

export interface CorrelationSummary {
  averageStressAtHighPerformance: number;
  averageStressAtLowPerformance: number;
  totalEntries: number;
  highPerformanceCount: number;
  lowPerformanceCount: number;
}

export interface PatternFlag {
  type: 'sustained-high' | 'sustained-low' | 'high-variability';
  message: string;
}

/**
 * Extract time series data for visualization
 */
export function getStressTrendData(entries: DailyZoneCheckEntry[]): StressTrendPoint[] {
  return entries
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(e => ({
      date: e.date,
      stressRating: e.stressRating,
      performanceOutcome: e.performanceOutcome,
    }));
}

/**
 * Compute stress-outcome correlation summary
 */
export function computeCorrelation(entries: DailyZoneCheckEntry[]): CorrelationSummary | null {
  const withOutcomes = entries.filter(e => e.performanceOutcome !== undefined);

  if (withOutcomes.length < 3) {
    return null;
  }

  const highPerf = withOutcomes.filter(e => e.performanceOutcome! >= 4);
  const lowPerf = withOutcomes.filter(e => e.performanceOutcome! <= 2);

  const avgHighStress = highPerf.length > 0
    ? highPerf.reduce((sum, e) => sum + e.stressRating, 0) / highPerf.length
    : 0;

  const avgLowStress = lowPerf.length > 0
    ? lowPerf.reduce((sum, e) => sum + e.stressRating, 0) / lowPerf.length
    : 0;

  return {
    averageStressAtHighPerformance: Math.round(avgHighStress * 10) / 10,
    averageStressAtLowPerformance: Math.round(avgLowStress * 10) / 10,
    totalEntries: withOutcomes.length,
    highPerformanceCount: highPerf.length,
    lowPerformanceCount: lowPerf.length,
  };
}

/**
 * Detect sustained patterns (non-diagnostic)
 */
export function detectPatterns(entries: DailyZoneCheckEntry[]): PatternFlag[] {
  const flags: PatternFlag[] = [];

  if (entries.length < 7) {
    return flags;
  }

  const recent = entries.slice(-7);
  const avgRecent = recent.reduce((sum, e) => sum + e.stressRating, 0) / recent.length;

  // Sustained high pattern
  if (avgRecent >= 8) {
    flags.push({
      type: 'sustained-high',
      message: 'Pattern detected: Sustained high stress over the past week. Consider recovery strategies.',
    });
  }

  // Sustained low pattern
  if (avgRecent <= 2) {
    flags.push({
      type: 'sustained-low',
      message: 'Pattern detected: Sustained low arousal over the past week. Consider energizing activities.',
    });
  }

  // High variability
  const variance = recent.reduce((sum, e) => sum + Math.pow(e.stressRating - avgRecent, 2), 0) / recent.length;
  if (variance > 6) {
    flags.push({
      type: 'high-variability',
      message: 'Pattern detected: High stress variability. Focus on consistent regulation practices.',
    });
  }

  return flags;
}

/**
 * Coach-safe aggregation: weekly averages
 */
export function getWeeklyAverages(entries: DailyZoneCheckEntry[]): { week: string; avgStress: number }[] {
  const weekMap = new Map<string, number[]>();

  entries.forEach(e => {
    const date = new Date(e.timestamp);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, []);
    }
    weekMap.get(weekKey)!.push(e.stressRating);
  });

  return Array.from(weekMap.entries())
    .map(([week, ratings]) => ({
      week,
      avgStress: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10,
    }))
    .sort((a, b) => a.week.localeCompare(b.week));
}

/**
 * Coach-safe aggregation: frequency in zone
 */
export function getFrequencyInZone(entries: DailyZoneCheckEntry[], izofRange: IZOFRange | null): {
  inZone: number;
  tooLow: number;
  tooHigh: number;
} {
  const range = izofRange || { low: 4, high: 7 };

  let inZone = 0;
  let tooLow = 0;
  let tooHigh = 0;

  entries.forEach(e => {
    if (e.stressRating < range.low) {
      tooLow++;
    } else if (e.stressRating > range.high) {
      tooHigh++;
    } else {
      inZone++;
    }
  });

  return { inZone, tooLow, tooHigh };
}

/**
 * Coach-safe aggregation: emotion categories (no verbatim selections)
 */
export function getEmotionCategorySummary(entries: DailyZoneCheckEntry[]): Record<string, number> {
  const summary: Record<string, number> = {};

  entries.forEach(e => {
    e.emotions.forEach(emotion => {
      summary[emotion] = (summary[emotion] || 0) + 1;
    });
  });

  return summary;
}
