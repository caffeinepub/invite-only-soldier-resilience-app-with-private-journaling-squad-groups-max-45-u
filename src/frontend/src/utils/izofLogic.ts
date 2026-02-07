/**
 * IZOF Logic Helpers
 * 
 * Client-side logic for zone categorization, recommendations, and decision helpers.
 */

import type { ZoneRecommendation, DailyZoneCheckEntry } from '../types/izof';

export interface IZOFRange {
  low: number;
  high: number;
}

/**
 * Estimate personal IZOF range from historical entries
 * Uses entries where performance outcome was 4 or 5
 */
export function estimateIZOFRange(entries: DailyZoneCheckEntry[]): IZOFRange | null {
  const highPerformanceEntries = entries.filter(
    e => e.performanceOutcome && e.performanceOutcome >= 4
  );

  if (highPerformanceEntries.length < 3) {
    return null; // Need at least 3 data points
  }

  const stressRatings = highPerformanceEntries.map(e => e.stressRating);
  const min = Math.min(...stressRatings);
  const max = Math.max(...stressRatings);

  // Add small buffer
  return {
    low: Math.max(0, min - 0.5),
    high: Math.min(10, max + 0.5),
  };
}

/**
 * Generate zone recommendation based on current stress and estimated IZOF range
 */
export function generateRecommendation(
  stressRating: number,
  izofRange: IZOFRange | null
): { recommendation: ZoneRecommendation; guidanceText: string } {
  // Default range if no personal data yet (moderate zone)
  const range = izofRange || { low: 4, high: 7 };

  if (stressRating < range.low) {
    return {
      recommendation: 'Up-regulate',
      guidanceText: 'Your stress level is below your optimal zone. Consider energizing techniques: movement, power posture, or energizing self-talk to increase arousal before your task.',
    };
  } else if (stressRating > range.high) {
    return {
      recommendation: 'Down-regulate',
      guidanceText: 'Your stress level is above your optimal zone. Use calming techniques: tactical breathing, focus cues, or progressive muscle relaxation to reduce arousal before your task.',
    };
  } else {
    return {
      recommendation: 'Maintain',
      guidanceText: 'You are in your optimal stress zone. Maintain this state with brief centering techniques and stay focused on your task.',
    };
  }
}

/**
 * Decision helper: categorize current state relative to zone
 */
export function categorizeStressState(
  stressRating: number,
  izofRange: IZOFRange | null
): 'Too low' | 'In zone' | 'Too high' {
  const range = izofRange || { low: 4, high: 7 };

  if (stressRating < range.low) {
    return 'Too low';
  } else if (stressRating > range.high) {
    return 'Too high';
  } else {
    return 'In zone';
  }
}

/**
 * Validate Daily Zone Check inputs
 */
export function validateDailyZoneCheck(
  stressRating: number | null,
  emotions: string[],
  upcomingTask: string | null
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (stressRating === null || stressRating < 0 || stressRating > 10) {
    errors.push('Stress rating is required (0-10)');
  }

  if (emotions.length === 0) {
    errors.push('Select at least one emotion');
  }

  if (!upcomingTask) {
    errors.push('Select an upcoming task');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
