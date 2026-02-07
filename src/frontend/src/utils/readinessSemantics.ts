/**
 * Readiness Semantics Utilities
 * 
 * Provides shared helpers for mapping 0-100 factor scores to color bands
 * and readiness-friendly values, supporting per-factor polarity:
 * - Sleep Quality: higher is better (0=red, 100=green)
 * - Training Load: lower is better (0=green, 100=red)
 * - Stress Level: lower is better (0=green, 100=red)
 * - Pain/Injury Status: lower is better (0=green, 100=red)
 */

export type FactorPolarity = 'higher-is-better' | 'lower-is-better';

export interface FactorConfig {
  polarity: FactorPolarity;
}

export const FACTOR_CONFIGS: Record<string, FactorConfig> = {
  sleep: { polarity: 'higher-is-better' },
  training: { polarity: 'lower-is-better' },
  stress: { polarity: 'lower-is-better' },
  pain: { polarity: 'lower-is-better' },
};

/**
 * Maps a raw 0-100 score to a Tailwind color class based on factor polarity.
 * For higher-is-better: 0=red, 100=green
 * For lower-is-better: 0=green, 100=red
 */
export function getFactorColorClass(score: number, polarity: FactorPolarity): string {
  const readinessValue = toReadinessValue(score, polarity);
  
  if (readinessValue >= 80) return 'text-green-600 dark:text-green-400';
  if (readinessValue >= 60) return 'text-blue-600 dark:text-blue-400';
  if (readinessValue >= 40) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

/**
 * Maps a raw 0-100 score to a progress bar color class based on factor polarity.
 */
export function getFactorProgressColor(score: number, polarity: FactorPolarity): string {
  const readinessValue = toReadinessValue(score, polarity);
  
  if (readinessValue >= 80) return 'bg-green-500';
  if (readinessValue >= 60) return 'bg-blue-500';
  if (readinessValue >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Converts a raw slider value to a readiness-friendly value for aggregation.
 * - Higher-is-better factors: return as-is (higher raw = better readiness)
 * - Lower-is-better factors: invert (lower raw = better readiness)
 */
export function toReadinessValue(rawScore: number, polarity: FactorPolarity): number {
  if (polarity === 'higher-is-better') {
    return rawScore;
  } else {
    // Invert: 0 becomes 100, 100 becomes 0
    return 100 - rawScore;
  }
}

/**
 * Selects an explanation string based on readiness-friendly value bands.
 * Always interprets bands as: high=best, critical=worst.
 */
export function selectExplanationByReadiness(
  rawScore: number,
  polarity: FactorPolarity,
  high: string,
  moderate: string,
  low: string,
  critical: string
): string {
  const readinessValue = toReadinessValue(rawScore, polarity);
  
  if (readinessValue >= 80) return high;
  if (readinessValue >= 60) return moderate;
  if (readinessValue >= 40) return low;
  return critical;
}
