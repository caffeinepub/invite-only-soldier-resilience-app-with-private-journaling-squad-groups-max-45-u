/**
 * Type definitions for Motivational Life Lessons & Rationality for Soldiers video dataset
 */

export type VideoCategoryTag =
  | 'Resilience'
  | 'Confidence'
  | 'Discipline'
  | 'Leadership'
  | 'Mindset'
  | 'Stress'
  | 'Rationality'
  | 'Military/Athlete'
  | 'Failure/Perseverance'
  | 'Life Lessons'
  | 'Self-Improvement';

export interface MotivationalVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  lessonSummary: string;
  soldierTakeaway: string;
  categoryTag: VideoCategoryTag;
  badges?: string[];
  impactScore?: number; // Optional ranking for prioritization
}
