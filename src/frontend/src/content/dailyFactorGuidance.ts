/**
 * Daily Factor Self-Rating Guidance
 * 
 * Provides soldier-oriented guidance for self-rating each daily factor
 * on a 0-100 scale with explicit anchor descriptions at 0/25/50/75/100.
 */

export interface FactorGuidance {
  factorName: string;
  polarity: 'higher-is-better' | 'lower-is-better';
  polarityStatement: string;
  anchors: {
    value: number;
    label: string;
    description: string;
  }[];
}

export const DAILY_FACTOR_GUIDANCE: Record<string, FactorGuidance> = {
  sleep: {
    factorName: 'Sleep Quality',
    polarity: 'higher-is-better',
    polarityStatement: '0 is worst, 100 is best. Higher scores indicate better sleep quality.',
    anchors: [
      {
        value: 0,
        label: 'Critical',
        description: 'No sleep or severely disrupted (< 3 hours, constant waking, no REM cycles).',
      },
      {
        value: 25,
        label: 'Poor',
        description: 'Minimal sleep (3-4 hours), frequent interruptions, woke up exhausted.',
      },
      {
        value: 50,
        label: 'Fair',
        description: 'Some sleep (5-6 hours), a few wake-ups, feel somewhat rested but not optimal.',
      },
      {
        value: 75,
        label: 'Good',
        description: 'Solid sleep (7-8 hours), minimal interruptions, woke up feeling refreshed.',
      },
      {
        value: 100,
        label: 'Excellent',
        description: 'Full, uninterrupted sleep (8+ hours), deep recovery, woke up energized and ready.',
      },
    ],
  },
  training: {
    factorName: 'Training Load',
    polarity: 'lower-is-better',
    polarityStatement: '0 is best, 100 is worst. Lower scores indicate manageable training load.',
    anchors: [
      {
        value: 0,
        label: 'Minimal',
        description: 'Rest day or very light activity (stretching, walking). No physical strain.',
      },
      {
        value: 25,
        label: 'Light',
        description: 'Easy workout or moderate activity. Muscles feel fresh, no soreness.',
      },
      {
        value: 50,
        label: 'Moderate',
        description: 'Standard training session. Some fatigue, manageable soreness, can continue normal duties.',
      },
      {
        value: 75,
        label: 'Heavy',
        description: 'Intense training or high volume. Significant fatigue, noticeable soreness, need recovery.',
      },
      {
        value: 100,
        label: 'Extreme',
        description: 'Maximum effort or overload (ruck march, combat drills, multi-day field ops). Exhausted, need immediate recovery.',
      },
    ],
  },
  stress: {
    factorName: 'Stress Level',
    polarity: 'lower-is-better',
    polarityStatement: '0 is best, 100 is worst. Lower scores indicate manageable stress.',
    anchors: [
      {
        value: 0,
        label: 'Calm',
        description: 'Relaxed, clear-headed, no operational or personal stressors. Fully in control.',
      },
      {
        value: 25,
        label: 'Low',
        description: 'Minor stressors (routine tasks, small deadlines). Easily manageable, no impact on focus.',
      },
      {
        value: 50,
        label: 'Moderate',
        description: 'Noticeable stress (mission prep, family issues, workload). Can manage but requires effort.',
      },
      {
        value: 75,
        label: 'High',
        description: 'Significant stress (deployment uncertainty, conflict, major deadlines). Affecting focus and mood.',
      },
      {
        value: 100,
        label: 'Overwhelming',
        description: 'Extreme stress (combat, crisis, severe personal issues). Struggling to cope, need immediate support.',
      },
    ],
  },
  pain: {
    factorName: 'Pain/Injury Status',
    polarity: 'lower-is-better',
    polarityStatement: '0 is best, 100 is worst. Lower scores indicate better musculoskeletal health.',
    anchors: [
      {
        value: 0,
        label: 'None',
        description: 'No pain or discomfort. Full range of motion, ready for any physical task.',
      },
      {
        value: 25,
        label: 'Minor',
        description: 'Slight discomfort or stiffness (tight muscles, minor soreness). Does not limit activity.',
      },
      {
        value: 50,
        label: 'Moderate',
        description: 'Noticeable pain (joint ache, muscle strain). Can perform duties but with some limitation.',
      },
      {
        value: 75,
        label: 'Significant',
        description: 'Persistent pain (chronic back pain, knee issues). Limits performance, may need medical attention.',
      },
      {
        value: 100,
        label: 'Severe',
        description: 'Acute or debilitating pain (injury, nerve pain). Cannot perform normal duties, requires immediate medical care.',
      },
    ],
  },
};
