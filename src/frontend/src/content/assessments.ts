/**
 * Assessment Definitions
 * 
 * Placeholder questionnaires for Big Five/OCEAN, MBTI, DISC,
 * StrengthsFinder-style themes, and GAT-style resilience/EI measures.
 * 
 * Each assessment includes:
 * - Short question set (completable in 2-5 minutes)
 * - Deterministic scoring keys
 * - At least 3 distinct possible outcomes
 * 
 * Developer notes:
 * - To extend questions: Add to the questions array with appropriate scoreKey/value
 * - To modify scoring: Update the scoring logic in assessmentScoring.ts
 * - To add outcomes: Update assessmentOutcomes.ts with new outcome content
 */

import type { AssessmentDefinition } from '../types/assessments';

export const ASSESSMENTS: AssessmentDefinition[] = [
  {
    id: 'ocean',
    title: 'Big Five Personality (OCEAN)',
    shortDescription: 'Measures five core personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism',
    estimatedMinutes: 3,
    scoringType: 'dimensional',
    questions: [
      {
        id: 'o1',
        text: 'I enjoy exploring new ideas and approaches',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'O', value: 1 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'O', value: 2 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'O', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'O', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'O', value: 5 },
        ],
      },
      {
        id: 'c1',
        text: 'I follow through on commitments and stay organized',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'C', value: 1 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'C', value: 2 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'C', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'C', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'C', value: 5 },
        ],
      },
      {
        id: 'e1',
        text: 'I gain energy from social interactions',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'E', value: 1 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'E', value: 2 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'E', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'E', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'E', value: 5 },
        ],
      },
      {
        id: 'a1',
        text: 'I prioritize team harmony and cooperation',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'A', value: 1 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'A', value: 2 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'A', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'A', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'A', value: 5 },
        ],
      },
      {
        id: 'n1',
        text: 'I often feel stressed or anxious under pressure',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'N', value: 1 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'N', value: 2 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'N', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'N', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'N', value: 5 },
        ],
      },
      {
        id: 'o2',
        text: 'I prefer proven methods over experimental approaches',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'O', value: 5 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'O', value: 4 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'O', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'O', value: 2 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'O', value: 1 },
        ],
      },
      {
        id: 'c2',
        text: 'I tend to be spontaneous rather than planned',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'C', value: 5 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'C', value: 4 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'C', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'C', value: 2 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'C', value: 1 },
        ],
      },
      {
        id: 'e2',
        text: 'I prefer working alone to group activities',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', scoreKey: 'E', value: 5 },
          { id: 'disagree', text: 'Disagree', scoreKey: 'E', value: 4 },
          { id: 'neutral', text: 'Neutral', scoreKey: 'E', value: 3 },
          { id: 'agree', text: 'Agree', scoreKey: 'E', value: 2 },
          { id: 'strongly-agree', text: 'Strongly Agree', scoreKey: 'E', value: 1 },
        ],
      },
    ],
  },
  {
    id: 'mbti',
    title: 'Myers-Briggs Type Indicator (MBTI)',
    shortDescription: 'Identifies your personality type across four dimensions: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving',
    estimatedMinutes: 3,
    scoringType: 'type',
    questions: [
      {
        id: 'ei1',
        text: 'After a long day, I prefer to:',
        options: [
          { id: 'socialize', text: 'Socialize with others', scoreKey: 'E', value: 1 },
          { id: 'recharge', text: 'Recharge alone', scoreKey: 'I', value: 1 },
        ],
      },
      {
        id: 'ei2',
        text: 'In team settings, I typically:',
        options: [
          { id: 'speak-up', text: 'Speak up and share ideas readily', scoreKey: 'E', value: 1 },
          { id: 'listen', text: 'Listen and contribute when asked', scoreKey: 'I', value: 1 },
        ],
      },
      {
        id: 'sn1',
        text: 'When solving problems, I focus on:',
        options: [
          { id: 'facts', text: 'Facts and concrete details', scoreKey: 'S', value: 1 },
          { id: 'patterns', text: 'Patterns and possibilities', scoreKey: 'N', value: 1 },
        ],
      },
      {
        id: 'sn2',
        text: 'I trust:',
        options: [
          { id: 'experience', text: 'Experience and proven methods', scoreKey: 'S', value: 1 },
          { id: 'intuition', text: 'Intuition and innovation', scoreKey: 'N', value: 1 },
        ],
      },
      {
        id: 'tf1',
        text: 'When making decisions, I prioritize:',
        options: [
          { id: 'logic', text: 'Logic and objective analysis', scoreKey: 'T', value: 1 },
          { id: 'impact', text: 'Impact on people and values', scoreKey: 'F', value: 1 },
        ],
      },
      {
        id: 'tf2',
        text: 'In conflict, I value:',
        options: [
          { id: 'fairness', text: 'Fairness and consistency', scoreKey: 'T', value: 1 },
          { id: 'harmony', text: 'Harmony and understanding', scoreKey: 'F', value: 1 },
        ],
      },
      {
        id: 'jp1',
        text: 'I prefer to:',
        options: [
          { id: 'plan', text: 'Plan ahead and stick to schedules', scoreKey: 'J', value: 1 },
          { id: 'adapt', text: 'Stay flexible and adapt as needed', scoreKey: 'P', value: 1 },
        ],
      },
      {
        id: 'jp2',
        text: 'My workspace is typically:',
        options: [
          { id: 'organized', text: 'Organized and structured', scoreKey: 'J', value: 1 },
          { id: 'flexible', text: 'Flexible and evolving', scoreKey: 'P', value: 1 },
        ],
      },
    ],
  },
  {
    id: 'disc',
    title: 'DISC Behavioral Style',
    shortDescription: 'Identifies your primary behavioral style: Dominance, Influence, Steadiness, or Conscientiousness',
    estimatedMinutes: 2,
    scoringType: 'dimensional',
    questions: [
      {
        id: 'd1',
        text: 'I take charge and drive results',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'D', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'D', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'D', value: 3 },
        ],
      },
      {
        id: 'i1',
        text: 'I build relationships and inspire others',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'I', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'I', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'I', value: 3 },
        ],
      },
      {
        id: 's1',
        text: 'I provide stability and support to my team',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'S', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'S', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'S', value: 3 },
        ],
      },
      {
        id: 'c1',
        text: 'I focus on accuracy and quality standards',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'C', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'C', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'C', value: 3 },
        ],
      },
      {
        id: 'd2',
        text: 'I prefer direct communication and quick decisions',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'D', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'D', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'D', value: 3 },
        ],
      },
      {
        id: 'i2',
        text: 'I enjoy collaboration and team energy',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'I', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'I', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'I', value: 3 },
        ],
      },
      {
        id: 's2',
        text: 'I value consistency and predictability',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'S', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'S', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'S', value: 3 },
        ],
      },
      {
        id: 'c2',
        text: 'I analyze details before taking action',
        options: [
          { id: 'not-me', text: 'Not Me', scoreKey: 'C', value: 1 },
          { id: 'somewhat', text: 'Somewhat', scoreKey: 'C', value: 2 },
          { id: 'very-much', text: 'Very Much Me', scoreKey: 'C', value: 3 },
        ],
      },
    ],
  },
  {
    id: 'strengths',
    title: 'Strengths Themes',
    shortDescription: 'Identifies your top strength themes: Strategic, Relational, Execution, or Influence',
    estimatedMinutes: 3,
    scoringType: 'dimensional',
    questions: [
      {
        id: 'strategic1',
        text: 'I excel at analyzing situations and planning ahead',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Strategic', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Strategic', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Strategic', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Strategic', value: 4 },
        ],
      },
      {
        id: 'relational1',
        text: 'I build strong connections and understand others',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Relational', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Relational', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Relational', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Relational', value: 4 },
        ],
      },
      {
        id: 'execution1',
        text: 'I get things done and deliver results',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Execution', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Execution', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Execution', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Execution', value: 4 },
        ],
      },
      {
        id: 'influence1',
        text: 'I motivate and persuade others effectively',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Influence', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Influence', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Influence', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Influence', value: 4 },
        ],
      },
      {
        id: 'strategic2',
        text: 'I see patterns and anticipate challenges',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Strategic', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Strategic', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Strategic', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Strategic', value: 4 },
        ],
      },
      {
        id: 'relational2',
        text: 'I create team cohesion and trust',
        options: [
          { id: 'rarely', text: 'Rarely', scoreKey: 'Relational', value: 1 },
          { id: 'sometimes', text: 'Sometimes', scoreKey: 'Relational', value: 2 },
          { id: 'often', text: 'Often', scoreKey: 'Relational', value: 3 },
          { id: 'always', text: 'Always', scoreKey: 'Relational', value: 4 },
        ],
      },
    ],
  },
  {
    id: 'gat',
    title: 'Resilience & Emotional Intelligence',
    shortDescription: 'Measures resilience, emotional regulation, and stress management capabilities',
    estimatedMinutes: 3,
    scoringType: 'band',
    questions: [
      {
        id: 'resilience1',
        text: 'I bounce back quickly from setbacks',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
      {
        id: 'emotional1',
        text: 'I recognize and manage my emotions effectively',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
      {
        id: 'stress1',
        text: 'I stay calm and focused under pressure',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
      {
        id: 'optimism1',
        text: 'I maintain a positive outlook even in difficult situations',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
      {
        id: 'adaptability1',
        text: 'I adapt quickly to changing circumstances',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
      {
        id: 'support1',
        text: 'I seek support when needed and help others',
        options: [
          { id: 'strongly-disagree', text: 'Strongly Disagree', value: 1 },
          { id: 'disagree', text: 'Disagree', value: 2 },
          { id: 'neutral', text: 'Neutral', value: 3 },
          { id: 'agree', text: 'Agree', value: 4 },
          { id: 'strongly-agree', text: 'Strongly Agree', value: 5 },
        ],
      },
    ],
  },
];
