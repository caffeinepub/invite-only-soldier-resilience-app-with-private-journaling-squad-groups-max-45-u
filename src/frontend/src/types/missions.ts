/**
 * Mission Data Model
 * 
 * Defines the structure for mission-based learning experiences.
 * Missions are game-like challenges with briefings, win conditions,
 * XP rewards, interactive steps, side quests, and unlock rules.
 * 
 * Developer notes:
 * - Assessment-based unlock rules use type 'assessment' with value format: 'assessmentType:outcomePattern'
 * - Example: { type: 'assessment', value: 'ocean:high-openness', description: 'Complete OCEAN assessment with high openness' }
 */

export interface MissionStep {
  type: 'briefing' | 'decision' | 'scenario' | 'timed';
  content: string;
  choices?: MissionChoice[];
  timeLimit?: number; // seconds for timed steps
  correctChoice?: string; // for scoring
}

export interface MissionChoice {
  id: string;
  text: string;
  outcome?: string;
  points?: number;
}

export interface MissionWinCondition {
  description: string;
  threshold?: number; // minimum score or percentage
}

export interface MissionSideQuest {
  id: string;
  description: string;
  condition: string; // human-readable condition
  reward: {
    xp: number;
    unlockable?: string;
  };
}

export interface MissionUnlockRule {
  type: 'rank' | 'streak' | 'performance' | 'mission-complete' | 'assessment';
  value: number | string;
  description: string;
}

export interface Mission {
  id: string;
  title: string;
  category: string;
  briefing: string;
  winConditions: MissionWinCondition[];
  xpReward: number;
  steps: MissionStep[];
  sideQuests?: MissionSideQuest[];
  unlockRules?: MissionUnlockRule[];
  reflectionPrompt?: {
    prefillTitle: string;
    prefillContent: string;
  };
}

export interface MissionResult {
  missionId: string;
  passed: boolean;
  score: number;
  maxScore: number;
  xpEarned: number;
  sideQuestsCompleted: string[];
  completedAt: number;
  choices: Record<string, string>;
  timedStepPerformance?: {
    timeUsed: number;
    timeLimit: number;
    responseCorrect: boolean;
  };
}

export interface OperatorProgression {
  xp: number;
  rank: string;
  tier: number;
  unlockables: string[];
  missionHistory: MissionResult[];
}

export const RANKS = [
  { tier: 0, name: 'Recruit', xpRequired: 0 },
  { tier: 1, name: 'Operator', xpRequired: 100 },
  { tier: 2, name: 'Specialist', xpRequired: 300 },
  { tier: 3, name: 'Elite', xpRequired: 600 },
  { tier: 4, name: 'Master', xpRequired: 1000 },
  { tier: 5, name: 'Legend', xpRequired: 1500 },
];

export function getRankFromXP(xp: number): { tier: number; name: string; xpRequired: number; nextRank?: { name: string; xpRequired: number } } {
  let currentRank = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xpRequired) {
      currentRank = rank;
    } else {
      break;
    }
  }
  
  const currentIndex = RANKS.findIndex(r => r.tier === currentRank.tier);
  const nextRank = currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : undefined;
  
  return {
    ...currentRank,
    nextRank,
  };
}
