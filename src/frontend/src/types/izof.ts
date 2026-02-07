/**
 * IZOF (Individual Zone of Optimal Functioning) Type Definitions
 * 
 * Models for stress zone tracking, regulation, and performance correlation.
 */

export type EmotionCategory = 
  | 'Calm'
  | 'Focused'
  | 'Energized'
  | 'Anxious'
  | 'Frustrated'
  | 'Tired'
  | 'Overwhelmed'
  | 'Confident';

export type TaskType =
  | 'Physical Training'
  | 'Tactical Exercise'
  | 'Leadership Task'
  | 'Administrative Work'
  | 'High-Stakes Mission'
  | 'Team Coordination'
  | 'Individual Study'
  | 'Other';

export type ZoneRecommendation = 'Up-regulate' | 'Maintain' | 'Down-regulate';

export type PerformanceOutcome = 1 | 2 | 3 | 4 | 5;

export interface DailyZoneCheckEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  stressRating: number; // 0-10
  emotions: EmotionCategory[];
  upcomingTask: TaskType;
  recommendation: ZoneRecommendation;
  guidanceText: string;
  performanceOutcome?: PerformanceOutcome;
  reflection?: string;
}

export interface IZOFRange {
  low: number;
  high: number;
}

export interface IZOFSettings {
  coachViewEnabled: boolean;
  estimatedLowZone?: number;
  estimatedHighZone?: number;
}
