/**
 * Local Data Hooks
 * 
 * React hooks wrapping localDataStore for UI consumption.
 * These hooks provide reactive access to local-only data.
 * 
 * All hooks are scoped to the current local profile UUID.
 */

import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import {
  getJournals,
  addJournal,
  updateJournal,
  deleteJournal,
  getDailyInputs,
  addDailyInput,
  getLatestDailyInput,
  getReadinessState,
  updateReadinessState,
  type LocalJournalEntry,
  type LocalDailyInput,
  type LocalReadinessState,
} from '../utils/localDataStore';

export function useLocalJournalEntries() {
  const { profile } = useLocalProfile();
  const [entries, setEntries] = useState<LocalJournalEntry[]>([]);

  const refresh = () => {
    setEntries(getJournals(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const add = (entry: Omit<LocalJournalEntry, 'id' | 'timestamp'>) => {
    const newEntry = addJournal(profile.localUuid, entry);
    refresh();
    return newEntry;
  };

  const update = (entryId: string, updates: Partial<Omit<LocalJournalEntry, 'id' | 'timestamp'>>) => {
    updateJournal(profile.localUuid, entryId, updates);
    refresh();
  };

  const remove = (entryId: string) => {
    deleteJournal(profile.localUuid, entryId);
    refresh();
  };

  return {
    entries,
    add,
    update,
    remove,
    refresh,
  };
}

export function useLocalDailyInputs() {
  const { profile } = useLocalProfile();
  const [inputs, setInputs] = useState<LocalDailyInput[]>([]);
  const [latest, setLatest] = useState<LocalDailyInput | null>(null);

  const refresh = () => {
    const allInputs = getDailyInputs(profile.localUuid);
    setInputs(allInputs);
    setLatest(getLatestDailyInput(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const add = (input: Omit<LocalDailyInput, 'timestamp'>) => {
    const newInput: LocalDailyInput = { ...input, timestamp: Date.now() };
    addDailyInput(profile.localUuid, newInput);
    refresh();
    return newInput;
  };

  return {
    inputs,
    latest,
    add,
    refresh,
  };
}

export function useLocalReadinessState() {
  const { profile } = useLocalProfile();
  const [state, setState] = useState<LocalReadinessState>(() => 
    getReadinessState(profile.localUuid)
  );

  const refresh = () => {
    setState(getReadinessState(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const update = (updates: Partial<LocalReadinessState>) => {
    const current = getReadinessState(profile.localUuid);
    updateReadinessState(profile.localUuid, { ...current, ...updates });
    refresh();
  };

  return {
    state,
    update,
    refresh,
  };
}
