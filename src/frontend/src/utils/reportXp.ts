/**
 * Report XP Calculation Utility
 * 
 * Deterministic XP calculation based on report body length.
 * 
 * XP Rules:
 * - 0-99 characters: 0 XP (too short)
 * - 100-299 characters: 10 XP (brief)
 * - 300-599 characters: 25 XP (moderate)
 * - 600-999 characters: 50 XP (detailed)
 * - 1000-1999 characters: 75 XP (comprehensive)
 * - 2000+ characters: 100 XP (extensive)
 */

export function calculateReportXP(body: string): number {
  const length = body.trim().length;

  if (length < 100) return 0;
  if (length < 300) return 10;
  if (length < 600) return 25;
  if (length < 1000) return 50;
  if (length < 2000) return 75;
  return 100;
}
