/**
 * Life Lessons Progress Hook
 * 
 * Manages per-video state (favorites, watched, reflections) for Life Lessons videos.
 * All state is scoped to the current device profile (localUuid).
 */

import { useState, useEffect, useCallback } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { getVideoProgress, updateVideoProgress } from '../utils/localDataStore';
import type { VideoProgress } from '../types/motivationalVideos';

export function useLifeLessonsProgress(videoId: string) {
  const { profile } = useLocalProfile();
  const [progress, setProgress] = useState<VideoProgress>(() =>
    getVideoProgress(profile.localUuid, videoId)
  );

  // Reload progress when videoId changes
  useEffect(() => {
    setProgress(getVideoProgress(profile.localUuid, videoId));
  }, [videoId, profile.localUuid]);

  const toggleFavorite = useCallback(() => {
    const newProgress = {
      ...progress,
      isFavorited: !progress.isFavorited,
    };
    setProgress(newProgress);
    updateVideoProgress(profile.localUuid, videoId, newProgress);
  }, [progress, videoId, profile.localUuid]);

  const toggleWatched = useCallback(() => {
    const newProgress = {
      ...progress,
      isWatched: !progress.isWatched,
    };
    setProgress(newProgress);
    updateVideoProgress(profile.localUuid, videoId, newProgress);
  }, [progress, videoId, profile.localUuid]);

  const saveReflection = useCallback(
    (application: string, rating: number) => {
      const newProgress = {
        ...progress,
        reflection: { application, rating },
      };
      setProgress(newProgress);
      updateVideoProgress(profile.localUuid, videoId, newProgress);
    },
    [progress, videoId, profile.localUuid]
  );

  return {
    progress,
    toggleFavorite,
    toggleWatched,
    saveReflection,
  };
}

export function useAllLifeLessonsProgress() {
  const { profile } = useLocalProfile();
  const [allProgress, setAllProgress] = useState<Record<string, VideoProgress>>({});

  useEffect(() => {
    // Load all progress for filtering
    const loadAllProgress = () => {
      try {
        const key = `dagger-life-lessons-progress-${profile.localUuid}`;
        const stored = localStorage.getItem(key);
        setAllProgress(stored ? JSON.parse(stored) : {});
      } catch (error) {
        console.error('Failed to load all life lessons progress:', error);
        setAllProgress({});
      }
    };

    loadAllProgress();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `dagger-life-lessons-progress-${profile.localUuid}`) {
        loadAllProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [profile.localUuid]);

  return allProgress;
}
