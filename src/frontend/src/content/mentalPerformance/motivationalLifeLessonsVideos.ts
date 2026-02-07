/**
 * Motivational Life Lessons & Rationality for Soldiers
 * 
 * Curated collection of motivational, rationality, and mental performance videos
 * for soldier readiness, resilience, leadership, and rational decision-making.
 * 
 * NOTE: Life Lessons category has been reset and is empty pending new content.
 */

import type { MotivationalVideo, VideoCategoryTag } from '../../types/motivationalVideos';

// All Life Lessons videos have been removed - dataset is now empty
export const motivationalVideos: MotivationalVideo[] = [];

/**
 * Returns all categories with their video counts.
 * Life Lessons category is preserved structurally but contains zero items.
 */
export function getCategories(): Array<{ tag: VideoCategoryTag; count: number }> {
  // Return empty array since no videos exist
  return [];
}
