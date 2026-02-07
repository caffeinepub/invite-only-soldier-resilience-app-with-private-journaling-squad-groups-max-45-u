/**
 * Soldier Connect XP Rules
 * 
 * Centralized XP calculation for Soldier Connect activities.
 */

export const SOLDIER_CONNECT_XP = {
  THREAD_CREATE: 10,
  REPLY_CREATE: 5,
  STORY_CREATE: 15,
  STORY_HIGHLIGHT_BONUS: 25,
  MENTOR_NOTE_CREATE: 8,
  CHALLENGE_CREATE: 20,
  CHALLENGE_STREAK_BONUS: 5,
  REACTION_CREATE: 1,
} as const;

export function calculateThreadXP(): number {
  return SOLDIER_CONNECT_XP.THREAD_CREATE;
}

export function calculateReplyXP(): number {
  return SOLDIER_CONNECT_XP.REPLY_CREATE;
}

export function calculateStoryXP(isHighlight: boolean = false): number {
  return SOLDIER_CONNECT_XP.STORY_CREATE + (isHighlight ? SOLDIER_CONNECT_XP.STORY_HIGHLIGHT_BONUS : 0);
}

export function calculateMentorNoteXP(): number {
  return SOLDIER_CONNECT_XP.MENTOR_NOTE_CREATE;
}

export function calculateChallengeXP(hasStreak: boolean = false): number {
  return SOLDIER_CONNECT_XP.CHALLENGE_CREATE + (hasStreak ? SOLDIER_CONNECT_XP.CHALLENGE_STREAK_BONUS : 0);
}

export function calculateReactionXP(): number {
  return SOLDIER_CONNECT_XP.REACTION_CREATE;
}
