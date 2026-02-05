/**
 * Assessment Type Definitions
 * 
 * Models for assessment configurations, questions, scoring, outcomes,
 * and stored results used across the assessments module.
 */

export type AssessmentType = 'ocean' | 'mbti' | 'disc' | 'strengths' | 'gat';

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  id: string;
  text: string;
  scoreKey?: string; // For dimensional scoring (e.g., 'O', 'C', 'E', 'A', 'N' for OCEAN)
  value?: number; // For simple numeric scoring
}

export interface AssessmentDefinition {
  id: AssessmentType;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  questions: AssessmentQuestion[];
  scoringType: 'dimensional' | 'type' | 'band';
}

export interface AssessmentScores {
  [key: string]: number;
}

export interface AssessmentOutcome {
  outcomeId: string;
  label: string;
  scores?: AssessmentScores;
}

export interface AssessmentResult {
  id: string;
  assessmentType: AssessmentType;
  outcome: AssessmentOutcome;
  completedAt: number;
  answers: Record<string, string>;
  rewardGranted?: boolean; // Track if XP/badge was already granted
}

export interface AssessmentOutcomeContent {
  outcomeId: string;
  whatItMeasures: string;
  relevance: string;
  insights: AssessmentInsight[];
}

export interface AssessmentInsight {
  type: 'text' | 'scenario' | 'briefing';
  title: string;
  content: string;
  choices?: InsightChoice[];
}

export interface InsightChoice {
  id: string;
  text: string;
  feedback: string;
}
