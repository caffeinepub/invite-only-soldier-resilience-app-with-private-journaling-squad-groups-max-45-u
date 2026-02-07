/**
 * IZOF React Hooks
 * 
 * Hooks for managing IZOF Daily Zone Check entries and derived values.
 */

import { useLocalProfile } from './useLocalProfile';
import { getIZOFEntries, addIZOFEntry, updateIZOFEntry } from '../utils/localDataStore';
import type { DailyZoneCheckEntry, EmotionCategory, TaskType, PerformanceOutcome } from '../types/izof';
import { estimateIZOFRange, generateRecommendation } from '../utils/izofLogic';
import { useState, useEffect } from 'react';

export function useIZOFEntries() {
  const { profile } = useLocalProfile();
  const [entries, setEntries] = useState<DailyZoneCheckEntry[]>([]);

  useEffect(() => {
    if (profile) {
      setEntries(getIZOFEntries(profile.localUuid));
    }
  }, [profile]);

  const refresh = () => {
    if (profile) {
      setEntries(getIZOFEntries(profile.localUuid));
    }
  };

  const createEntry = (
    stressRating: number,
    emotions: EmotionCategory[],
    upcomingTask: TaskType
  ): DailyZoneCheckEntry => {
    if (!profile) throw new Error('No profile');

    const izofRange = estimateIZOFRange(entries);
    const { recommendation, guidanceText } = generateRecommendation(stressRating, izofRange);

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const newEntry = addIZOFEntry(profile.localUuid, {
      date: dateStr,
      timestamp: Date.now(),
      stressRating,
      emotions,
      upcomingTask,
      recommendation,
      guidanceText,
    });

    refresh();
    return newEntry;
  };

  const updateEntry = (id: string, updates: Partial<DailyZoneCheckEntry>) => {
    if (!profile) throw new Error('No profile');
    updateIZOFEntry(profile.localUuid, id, updates);
    refresh();
  };

  const getTodayEntry = (): DailyZoneCheckEntry | null => {
    const today = new Date().toISOString().split('T')[0];
    return entries.find(e => e.date === today) || null;
  };

  return {
    entries,
    createEntry,
    updateEntry,
    getTodayEntry,
    refresh,
  };
}
