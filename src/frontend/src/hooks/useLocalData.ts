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
  getLocalJournals,
  addLocalJournal,
  updateLocalJournal,
  deleteLocalJournal,
  getLocalDailyInputs,
  addLocalDailyInput,
  getLatestLocalDailyInput,
  getLocalReadinessState,
  updateLocalReadinessState,
  type LocalJournalEntry,
  type LocalDailyInput,
  type LocalReadinessState,
} from '../utils/localDataStore';

export function useLocalJournalEntries() {
  const { profile } = useLocalProfile();
  const [entries, setEntries] = useState<LocalJournalEntry[]>([]);

  const refresh = () => {
    setEntries(getLocalJournals(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const add = (entry: Omit<LocalJournalEntry, 'id' | 'timestamp'>) => {
    const newEntry = addLocalJournal(profile.localUuid, entry);
    refresh();
    return newEntry;
  };

  const update = (entryId: string, updates: Partial<Omit<LocalJournalEntry, 'id' | 'timestamp'>>) => {
    updateLocalJournal(profile.localUuid, entryId, updates);
    refresh();
  };

  const remove = (entryId: string) => {
    deleteLocalJournal(profile.localUuid, entryId);
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
  const [inputs, setInputs] = useState<Record<string, LocalDailyInput>>({});
  const [latest, setLatest] = useState<LocalDailyInput | null>(null);

  const refresh = () => {
    const allInputs = getLocalDailyInputs(profile.localUuid);
    setInputs(allInputs);
    setLatest(getLatestLocalDailyInput(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const add = (input: Omit<LocalDailyInput, 'timestamp'>) => {
    const newInput = addLocalDailyInput(profile.localUuid, input);
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
    getLocalReadinessState(profile.localUuid)
  );

  const refresh = () => {
    setState(getLocalReadinessState(profile.localUuid));
  };

  useEffect(() => {
    refresh();
  }, [profile.localUuid]);

  const update = (updates: Partial<LocalReadinessState>) => {
    updateLocalReadinessState(profile.localUuid, updates);
    refresh();
  };

  return {
    state,
    update,
    refresh,
  };
}
