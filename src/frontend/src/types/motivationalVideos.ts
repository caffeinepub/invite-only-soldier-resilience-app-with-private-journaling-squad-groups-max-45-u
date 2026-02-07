/**
 * Type definitions for Motivational Life Lessons video dataset
 */

export type VideoCategoryTag =
  | 'Confidence'
  | 'Overcoming Adversity'
  | 'Rational Thinking'
  | 'Focus & Concentration'
  | 'Stress Management Techniques'
  | 'Leadership Development'
  | 'Teamwork & Collaboration'
  | 'Emotional Intelligence'
  | 'Motivation & Goal Setting'
  | 'Mindfulness & Meditation'
  | 'Humility & Followership'
  | 'General Mindset Shifts';

export interface MotivationalVideo {
  id: string;
  title: string;
  description: string;
  category: VideoCategoryTag;
  icon: string;
  url: string;
}

export interface VideoProgress {
  isFavorited: boolean;
  isWatched: boolean;
  reflection?: {
    application: string;
    rating: number; // 1-5
  };
}
