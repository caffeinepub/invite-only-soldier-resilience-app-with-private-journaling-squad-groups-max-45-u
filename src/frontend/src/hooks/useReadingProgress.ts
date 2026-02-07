/**
 * Reading Progress Hook
 * 
 * Manages per-book reading status (To Read / In Progress / Completed)
 * scoped to the current device profile UUID.
 */

import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';

export type ReadingStatus = 'to-read' | 'in-progress' | 'completed';

export interface BookProgress {
  bookId: string;
  status: ReadingStatus;
  completedAt?: number;
  startedAt?: number;
}

const STORAGE_KEY_PREFIX = 'dagger-reading-progress-';

function getStorageKey(localUuid: string): string {
  return `${STORAGE_KEY_PREFIX}${localUuid}`;
}

function loadProgress(localUuid: string): Record<string, BookProgress> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(getStorageKey(localUuid));
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load reading progress:', error);
    return {};
  }
}

function saveProgress(localUuid: string, progress: Record<string, BookProgress>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getStorageKey(localUuid), JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save reading progress:', error);
  }
}

export function useReadingProgress() {
  const { profile } = useLocalProfile();
  const [progress, setProgress] = useState<Record<string, BookProgress>>(() => 
    loadProgress(profile.localUuid)
  );

  useEffect(() => {
    const loaded = loadProgress(profile.localUuid);
    setProgress(loaded);
  }, [profile.localUuid]);

  const getBookProgress = (bookId: string): BookProgress | undefined => {
    return progress[bookId];
  };

  const getBookStatus = (bookId: string): ReadingStatus | undefined => {
    return progress[bookId]?.status;
  };

  const updateBookStatus = (bookId: string, status: ReadingStatus) => {
    const now = Date.now();
    const existing = progress[bookId];
    
    const updated: BookProgress = {
      bookId,
      status,
      startedAt: existing?.startedAt || (status !== 'to-read' ? now : undefined),
      completedAt: status === 'completed' ? now : undefined,
    };

    const newProgress = { ...progress, [bookId]: updated };
    setProgress(newProgress);
    saveProgress(profile.localUuid, newProgress);
  };

  const getCompletedBooks = (): BookProgress[] => {
    return Object.values(progress).filter(p => p.status === 'completed');
  };

  const getInProgressBooks = (): BookProgress[] => {
    return Object.values(progress).filter(p => p.status === 'in-progress');
  };

  return {
    progress,
    getBookProgress,
    getBookStatus,
    updateBookStatus,
    getCompletedBooks,
    getInProgressBooks,
  };
}
