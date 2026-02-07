/**
 * Local Data Store Utility
 * 
 * Centralized storage for all user-generated content scoped by localUuid.
 * All personal data (journals, readiness inputs, streaks, mission progression, assessments, sleep performance, reports, quote reflections) is stored locally
 * and never transmitted to the backend by default.
 * 
 * Storage structure:
 * - dagger-journals-{uuid}: Journal entries array
 * - dagger-daily-inputs-{uuid}: Daily readiness inputs map
 * - dagger-readiness-state-{uuid}: Streak and gamification state
 * - dagger-mission-progression-{uuid}: Mission XP, ranks, unlockables, history
 * - dagger-assessments-{uuid}: Assessment results and history
 * - dagger-sleep-logs-{uuid}: Sleep window logs
 * - dagger-sleep-state-{uuid}: Sleep performance state (debt, mode, streaks, unlocks)
 * - dagger-caffeine-logs-{uuid}: Caffeine intake logs
 * - dagger-reading-progress-{uuid}: Reading status per book
 * - dagger-reading-rewards-{uuid}: Granted reading rewards
 * - dagger-personal-reports-{uuid}: Personal reports on videos/books
 * - dagger-quote-reflections-{uuid}: Per-quote reflections
 * 
 * Future seam: This utility provides a clear adapter interface where
 * optional cloud sync could be added without refactoring consumers.
 * The sync adapter would:
 * 1. Read from local store
 * 2. Optionally sync to remote when online and opted-in
 * 3. Merge remote changes back to local store
 * 4. Maintain local-first behavior as fallback
 */

import type { PersonalReport, CreateReportInput, UpdateReportInput } from '../types/personalReports';

export interface LocalJournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  isShared: boolean;
  sharedGroupId?: string;
}

export interface LocalDailyInput {
  sleepScore: number;
  trainingLoadScore: number;
  stressScore: number;
  painScore: number;
  overallScore: number;
  explanations: string;
  timestamp: number;
}

export interface LocalReadinessState {
  streakCount: number;
  highReadinessDays: number;
  totalInputs: number;
  lastInputTimestamp: number;
}

export interface SleepLog {
  id: string;
  sleepStart: number;
  sleepEnd: number;
  duration: number;
  quality?: number;
  painInputs?: {
    neckPain?: number;
    backPain?: number;
    nerveSymptoms?: boolean;
  };
  stressInputs?: {
    nightmares?: boolean;
    hypervigilance?: boolean;
    racingThoughts?: boolean;
    startleResponse?: boolean;
  };
  timestamp: number;
}

export interface SleepPerformanceState {
  mode: 'field' | 'garrison' | 'shift' | 'high-stress';
  sleepDebt: number;
  streakCount: number;
  totalLogs: number;
  lastLogTimestamp: number;
  unlockedTools: string[];
}

export interface CaffeineLog {
  id: string;
  time: number;
  source: string;
  amountMg: number;
  timestamp: number;
}

export interface QuoteReflection {
  quoteId: string;
  reflection: string;
  timestamp: number;
  lastUpdated: number;
}

function getStorageKey(localUuid: string, type: 'journals' | 'daily-inputs' | 'readiness-state' | 'sleep-logs' | 'sleep-state' | 'caffeine-logs' | 'personal-reports' | 'quote-reflections'): string {
  return `dagger-${type}-${localUuid}`;
}

// Journal operations
export function getLocalJournals(localUuid: string): LocalJournalEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const key = getStorageKey(localUuid, 'journals');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load local journals:', error);
    return [];
  }
}

export function saveLocalJournals(localUuid: string, journals: LocalJournalEntry[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'journals');
    localStorage.setItem(key, JSON.stringify(journals));
  } catch (error) {
    console.error('Failed to save local journals:', error);
  }
}

export function addLocalJournal(localUuid: string, entry: Omit<LocalJournalEntry, 'id' | 'timestamp'>): LocalJournalEntry {
  const journals = getLocalJournals(localUuid);
  const newEntry: LocalJournalEntry = {
    ...entry,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };
  journals.push(newEntry);
  saveLocalJournals(localUuid, journals);
  return newEntry;
}

export function updateLocalJournal(localUuid: string, entryId: string, updates: Partial<Omit<LocalJournalEntry, 'id' | 'timestamp'>>): void {
  const journals = getLocalJournals(localUuid);
  const index = journals.findIndex(j => j.id === entryId);
  if (index !== -1) {
    journals[index] = { ...journals[index], ...updates };
    saveLocalJournals(localUuid, journals);
  }
}

export function deleteLocalJournal(localUuid: string, entryId: string): void {
  const journals = getLocalJournals(localUuid);
  const filtered = journals.filter(j => j.id !== entryId);
  saveLocalJournals(localUuid, filtered);
}

// Daily input operations
export function getLocalDailyInputs(localUuid: string): Record<string, LocalDailyInput> {
  if (typeof window === 'undefined') return {};
  
  try {
    const key = getStorageKey(localUuid, 'daily-inputs');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load daily inputs:', error);
    return {};
  }
}

export function saveLocalDailyInputs(localUuid: string, inputs: Record<string, LocalDailyInput>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'daily-inputs');
    localStorage.setItem(key, JSON.stringify(inputs));
  } catch (error) {
    console.error('Failed to save daily inputs:', error);
  }
}

export function addLocalDailyInput(localUuid: string, input: Omit<LocalDailyInput, 'timestamp'>): LocalDailyInput {
  const inputs = getLocalDailyInputs(localUuid);
  const newInput: LocalDailyInput = {
    ...input,
    timestamp: Date.now(),
  };
  const dateKey = new Date().toISOString().split('T')[0];
  inputs[dateKey] = newInput;
  saveLocalDailyInputs(localUuid, inputs);
  return newInput;
}

export function getLatestLocalDailyInput(localUuid: string): LocalDailyInput | null {
  const inputs = getLocalDailyInputs(localUuid);
  const entries = Object.entries(inputs);
  if (entries.length === 0) return null;
  
  entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
  return entries[0][1];
}

// Readiness state operations
export function getLocalReadinessState(localUuid: string): LocalReadinessState {
  if (typeof window === 'undefined') {
    return { streakCount: 0, highReadinessDays: 0, totalInputs: 0, lastInputTimestamp: 0 };
  }
  
  try {
    const key = getStorageKey(localUuid, 'readiness-state');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { streakCount: 0, highReadinessDays: 0, totalInputs: 0, lastInputTimestamp: 0 };
  } catch (error) {
    console.error('Failed to load readiness state:', error);
    return { streakCount: 0, highReadinessDays: 0, totalInputs: 0, lastInputTimestamp: 0 };
  }
}

export function saveLocalReadinessState(localUuid: string, state: LocalReadinessState): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'readiness-state');
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save readiness state:', error);
  }
}

export function updateLocalReadinessState(localUuid: string, updates: Partial<LocalReadinessState>): void {
  const current = getLocalReadinessState(localUuid);
  const updated = { ...current, ...updates };
  saveLocalReadinessState(localUuid, updated);
}

// Sleep log operations
export function getSleepLogs(localUuid: string): SleepLog[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const key = getStorageKey(localUuid, 'sleep-logs');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load sleep logs:', error);
    return [];
  }
}

export function saveSleepLogs(localUuid: string, logs: SleepLog[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'sleep-logs');
    localStorage.setItem(key, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save sleep logs:', error);
  }
}

export function addSleepLog(localUuid: string, log: Omit<SleepLog, 'id' | 'timestamp'>): SleepLog {
  const logs = getSleepLogs(localUuid);
  const newLog: SleepLog = {
    ...log,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };
  logs.push(newLog);
  saveSleepLogs(localUuid, logs);
  return newLog;
}

// Sleep performance state operations
export function getSleepPerformanceState(localUuid: string): SleepPerformanceState {
  if (typeof window === 'undefined') {
    return { mode: 'garrison', sleepDebt: 0, streakCount: 0, totalLogs: 0, lastLogTimestamp: 0, unlockedTools: [] };
  }
  
  try {
    const key = getStorageKey(localUuid, 'sleep-state');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { mode: 'garrison', sleepDebt: 0, streakCount: 0, totalLogs: 0, lastLogTimestamp: 0, unlockedTools: [] };
  } catch (error) {
    console.error('Failed to load sleep performance state:', error);
    return { mode: 'garrison', sleepDebt: 0, streakCount: 0, totalLogs: 0, lastLogTimestamp: 0, unlockedTools: [] };
  }
}

export function saveSleepPerformanceState(localUuid: string, state: SleepPerformanceState): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'sleep-state');
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save sleep performance state:', error);
  }
}

export function updateSleepPerformanceState(localUuid: string, updates: Partial<SleepPerformanceState>): void {
  const current = getSleepPerformanceState(localUuid);
  const updated = { ...current, ...updates };
  saveSleepPerformanceState(localUuid, updated);
}

// Caffeine log operations
export function getCaffeineLogs(localUuid: string): CaffeineLog[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const key = getStorageKey(localUuid, 'caffeine-logs');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load caffeine logs:', error);
    return [];
  }
}

export function saveCaffeineLogs(localUuid: string, logs: CaffeineLog[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'caffeine-logs');
    localStorage.setItem(key, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save caffeine logs:', error);
  }
}

export function addCaffeineLog(localUuid: string, log: Omit<CaffeineLog, 'id' | 'timestamp'>): CaffeineLog {
  const logs = getCaffeineLogs(localUuid);
  const newLog: CaffeineLog = {
    ...log,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };
  logs.push(newLog);
  saveCaffeineLogs(localUuid, logs);
  return newLog;
}

// Personal Reports operations
export function getPersonalReports(localUuid: string): PersonalReport[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const key = getStorageKey(localUuid, 'personal-reports');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load personal reports:', error);
    return [];
  }
}

export function savePersonalReports(localUuid: string, reports: PersonalReport[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'personal-reports');
    localStorage.setItem(key, JSON.stringify(reports));
  } catch (error) {
    console.error('Failed to save personal reports:', error);
  }
}

export function addPersonalReport(localUuid: string, input: CreateReportInput): PersonalReport {
  const reports = getPersonalReports(localUuid);
  const newReport: PersonalReport = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    type: input.type,
    title: input.title,
    body: input.body,
    metadata: input.metadata,
    submitted: false,
    xpGranted: false,
    xpAwarded: 0,
    timestamp: Date.now(),
  };
  reports.push(newReport);
  savePersonalReports(localUuid, reports);
  return newReport;
}

export function updatePersonalReport(localUuid: string, reportId: string, updates: UpdateReportInput): void {
  const reports = getPersonalReports(localUuid);
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...updates };
    savePersonalReports(localUuid, reports);
  }
}

export function deletePersonalReport(localUuid: string, reportId: string): void {
  const reports = getPersonalReports(localUuid);
  const filtered = reports.filter(r => r.id !== reportId);
  savePersonalReports(localUuid, filtered);
}

export function submitPersonalReport(localUuid: string, reportId: string, xpAwarded: number): void {
  const reports = getPersonalReports(localUuid);
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1 && !reports[index].xpGranted) {
    reports[index] = {
      ...reports[index],
      submitted: true,
      xpGranted: true,
      xpAwarded,
      submittedAt: Date.now(),
    };
    savePersonalReports(localUuid, reports);
  }
}

// Quote Reflections operations
export function getQuoteReflections(localUuid: string): Record<string, QuoteReflection> {
  if (typeof window === 'undefined') return {};
  
  try {
    const key = getStorageKey(localUuid, 'quote-reflections');
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load quote reflections:', error);
    return {};
  }
}

export function saveQuoteReflections(localUuid: string, reflections: Record<string, QuoteReflection>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getStorageKey(localUuid, 'quote-reflections');
    localStorage.setItem(key, JSON.stringify(reflections));
  } catch (error) {
    console.error('Failed to save quote reflections:', error);
  }
}

export function getQuoteReflection(localUuid: string, quoteId: string): QuoteReflection | null {
  const reflections = getQuoteReflections(localUuid);
  return reflections[quoteId] || null;
}

export function saveQuoteReflection(localUuid: string, quoteId: string, reflection: string): void {
  const reflections = getQuoteReflections(localUuid);
  const now = Date.now();
  
  reflections[quoteId] = {
    quoteId,
    reflection,
    timestamp: reflections[quoteId]?.timestamp || now,
    lastUpdated: now,
  };
  
  saveQuoteReflections(localUuid, reflections);
}

// Reset all local data for a user
export function resetAllLocalData(localUuid: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(getStorageKey(localUuid, 'journals'));
    localStorage.removeItem(getStorageKey(localUuid, 'daily-inputs'));
    localStorage.removeItem(getStorageKey(localUuid, 'readiness-state'));
    localStorage.removeItem(`dagger-mission-progression-${localUuid}`);
    localStorage.removeItem(`dagger-assessments-${localUuid}`);
    localStorage.removeItem(getStorageKey(localUuid, 'sleep-logs'));
    localStorage.removeItem(getStorageKey(localUuid, 'sleep-state'));
    localStorage.removeItem(getStorageKey(localUuid, 'caffeine-logs'));
    localStorage.removeItem(`dagger-reading-progress-${localUuid}`);
    localStorage.removeItem(`dagger-reading-rewards-${localUuid}`);
    localStorage.removeItem(getStorageKey(localUuid, 'personal-reports'));
    localStorage.removeItem(getStorageKey(localUuid, 'quote-reflections'));
  } catch (error) {
    console.error('Failed to reset local data:', error);
  }
}
