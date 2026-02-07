/**
 * Reading Rewards Hook
 * 
 * Manages XP and badge grants for reading milestones.
 * Integrates with local gamification system with deduplication.
 */

import { useEffect, useRef } from 'react';
import { useReadingProgress } from './useReadingProgress';
import { useMissionProgression } from './useMissionProgression';
import { toast } from 'sonner';

const READING_XP_PER_BOOK = 50;

export interface ReadingBadge {
  id: string;
  name: string;
  description: string;
  xp: number;
}

const READING_BADGES: Record<string, ReadingBadge> = {
  FIRST_STARTED: { id: 'reading-first-started', name: 'Reader', description: 'Started your first book', xp: 10 },
  FIRST_COMPLETED: { id: 'reading-first-completed', name: 'Finisher', description: 'Completed your first book', xp: 25 },
  THREE_COMPLETED: { id: 'reading-three-completed', name: 'Bookworm', description: 'Completed 3 books', xp: 50 },
  TEN_COMPLETED: { id: 'reading-ten-completed', name: 'Scholar', description: 'Completed 10 books', xp: 100 },
};

const STORAGE_KEY_PREFIX = 'dagger-reading-rewards-';

function getStorageKey(localUuid: string): string {
  return `${STORAGE_KEY_PREFIX}${localUuid}`;
}

function loadGrantedRewards(localUuid: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  
  try {
    const stored = localStorage.getItem(getStorageKey(localUuid));
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Failed to load granted reading rewards:', error);
    return new Set();
  }
}

function saveGrantedRewards(localUuid: string, granted: Set<string>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getStorageKey(localUuid), JSON.stringify([...granted]));
  } catch (error) {
    console.error('Failed to save granted reading rewards:', error);
  }
}

export function useReadingRewards(localUuid: string) {
  const { getCompletedBooks, getInProgressBooks } = useReadingProgress();
  const { progression, applyMissionResult } = useMissionProgression();
  const grantedRef = useRef<Set<string>>(loadGrantedRewards(localUuid));

  useEffect(() => {
    const granted = loadGrantedRewards(localUuid);
    grantedRef.current = granted;
  }, [localUuid]);

  const grantReward = (rewardId: string, xp: number, badgeName: string, description: string) => {
    if (grantedRef.current.has(rewardId)) return;

    // Grant XP via mission progression system
    applyMissionResult({
      missionId: `reading-${rewardId}`,
      passed: true,
      score: 100,
      maxScore: 100,
      xpEarned: xp,
      sideQuestsCompleted: [rewardId],
      completedAt: Date.now(),
      choices: {},
    });

    // Mark as granted
    grantedRef.current.add(rewardId);
    saveGrantedRewards(localUuid, grantedRef.current);

    // Show toast
    toast.success(`🎖️ ${badgeName}`, {
      description: `${description} (+${xp} XP)`,
    });
  };

  const checkAndGrantMilestones = () => {
    const completedBooks = getCompletedBooks();
    const inProgressBooks = getInProgressBooks();
    const completedCount = completedBooks.length;

    // First book started
    if (inProgressBooks.length > 0 || completedCount > 0) {
      const badge = READING_BADGES.FIRST_STARTED;
      grantReward(badge.id, badge.xp, badge.name, badge.description);
    }

    // First book completed
    if (completedCount >= 1) {
      const badge = READING_BADGES.FIRST_COMPLETED;
      grantReward(badge.id, badge.xp, badge.name, badge.description);
    }

    // Three books completed
    if (completedCount >= 3) {
      const badge = READING_BADGES.THREE_COMPLETED;
      grantReward(badge.id, badge.xp, badge.name, badge.description);
    }

    // Ten books completed
    if (completedCount >= 10) {
      const badge = READING_BADGES.TEN_COMPLETED;
      grantReward(badge.id, badge.xp, badge.name, badge.description);
    }

    // Per-book completion XP (deduplicated by book ID)
    completedBooks.forEach(book => {
      const rewardId = `book-completed-${book.bookId}`;
      if (!grantedRef.current.has(rewardId)) {
        grantReward(rewardId, READING_XP_PER_BOOK, 'Book Completed', `Finished reading`);
      }
    });
  };

  const getEarnedBadges = (): ReadingBadge[] => {
    const badges: ReadingBadge[] = [];
    if (grantedRef.current.has(READING_BADGES.FIRST_STARTED.id)) badges.push(READING_BADGES.FIRST_STARTED);
    if (grantedRef.current.has(READING_BADGES.FIRST_COMPLETED.id)) badges.push(READING_BADGES.FIRST_COMPLETED);
    if (grantedRef.current.has(READING_BADGES.THREE_COMPLETED.id)) badges.push(READING_BADGES.THREE_COMPLETED);
    if (grantedRef.current.has(READING_BADGES.TEN_COMPLETED.id)) badges.push(READING_BADGES.TEN_COMPLETED);
    return badges;
  };

  return {
    checkAndGrantMilestones,
    getEarnedBadges,
  };
}
