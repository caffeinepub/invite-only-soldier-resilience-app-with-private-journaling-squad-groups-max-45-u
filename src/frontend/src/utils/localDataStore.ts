/**
 * Centralized localStorage utility for all device-scoped data
 * 
 * Manages:
 * - Journal entries (local-only, no isShared field)
 * - Daily readiness inputs with explanations
 * - Sleep logs with sleepStart/sleepEnd/stressInputs
 * - Caffeine logs with source field
 * - IZOF entries and settings
 * - Personal reports with XP tracking
 * - Quote reflections
 */

import type {
  IZOFEntry as LegacyIZOFEntry,
  IZOFSettings as LegacyIZOFSettings,
  PersonalReport as LegacyPersonalReport,
} from '../types/legacy';

// Re-export legacy types
export type { IZOFEntry, IZOFSettings, PersonalReport } from '../types/legacy';

// ============================================================================
// Local-only Type Definitions
// ============================================================================

export interface LocalJournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export interface LocalDailyInput {
  sleepScore: number; // 0-100
  trainingLoadScore: number; // 0-100
  stressScore: number; // 0-100
  painScore: number; // 0-100
  overallScore: number; // 0-100
  explanations: string;
  timestamp: number;
}

export interface SleepLog {
  id: string;
  sleepStart: number; // timestamp
  sleepEnd: number; // timestamp
  startTime?: number; // alias for sleepStart
  endTime?: number; // alias for sleepEnd
  duration: number; // milliseconds
  quality: number; // 1-10
  painDisruption?: number; // 0-10
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

export interface CaffeineLog {
  id: string;
  amount: number; // mg
  source: string;
  type?: string; // alias for source
  timestamp: number;
}

export interface SleepPerformanceState {
  mode: 'standard' | 'tactical' | 'recovery';
  sleepDebt: number; // hours
  consecutiveGoodNights: number;
  unlockedNapDurations: number[]; // minutes
}

export interface LocalReadinessState {
  streakCount: number;
  highReadinessDays: number;
  totalInputs: number;
  lastInputTimestamp: number;
}

// ============================================================================
// Journal Entries (Local-only, no isShared field)
// ============================================================================

export function getJournalEntries(localUuid: string): LocalJournalEntry[] {
  try {
    const key = `dagger-journal-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load journal entries:', error);
    return [];
  }
}

// Alias for backward compatibility
export const getJournals = getJournalEntries;

export function addJournalEntry(
  localUuid: string,
  entry: Omit<LocalJournalEntry, 'id' | 'timestamp'>
): LocalJournalEntry {
  const entries = getJournalEntries(localUuid);
  const newEntry: LocalJournalEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  entries.push(newEntry);
  localStorage.setItem(`dagger-journal-${localUuid}`, JSON.stringify(entries));
  return newEntry;
}

// Alias for backward compatibility
export const addJournal = addJournalEntry;

export function updateJournalEntry(
  localUuid: string,
  id: string,
  updates: Partial<Omit<LocalJournalEntry, 'id' | 'timestamp'>>
): void {
  const entries = getJournalEntries(localUuid);
  const index = entries.findIndex((e) => e.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    localStorage.setItem(`dagger-journal-${localUuid}`, JSON.stringify(entries));
  }
}

// Alias for backward compatibility
export const updateJournal = updateJournalEntry;

export function deleteJournalEntry(localUuid: string, id: string): void {
  const entries = getJournalEntries(localUuid);
  const filtered = entries.filter((e) => e.id !== id);
  localStorage.setItem(`dagger-journal-${localUuid}`, JSON.stringify(filtered));
}

// Alias for backward compatibility
export const deleteJournal = deleteJournalEntry;

// ============================================================================
// Daily Readiness Inputs (with explanations)
// ============================================================================

export function getDailyInputs(localUuid: string): LocalDailyInput[] {
  try {
    const key = `dagger-daily-inputs-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load daily inputs:', error);
    return [];
  }
}

export function addDailyInput(
  localUuid: string,
  input: Omit<LocalDailyInput, 'timestamp'>
): void {
  const inputs = getDailyInputs(localUuid);
  const newInput: LocalDailyInput = {
    ...input,
    timestamp: Date.now(),
  };
  inputs.push(newInput);
  localStorage.setItem(`dagger-daily-inputs-${localUuid}`, JSON.stringify(inputs));
}

export function getLatestDailyInput(localUuid: string): LocalDailyInput | null {
  const inputs = getDailyInputs(localUuid);
  if (inputs.length === 0) return null;
  return inputs[inputs.length - 1];
}

// ============================================================================
// Readiness State
// ============================================================================

export function getReadinessState(localUuid: string): LocalReadinessState {
  try {
    const key = `dagger-readiness-state-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored
      ? JSON.parse(stored)
      : {
          streakCount: 0,
          highReadinessDays: 0,
          totalInputs: 0,
          lastInputTimestamp: 0,
        };
  } catch (error) {
    console.error('Failed to load readiness state:', error);
    return {
      streakCount: 0,
      highReadinessDays: 0,
      totalInputs: 0,
      lastInputTimestamp: 0,
    };
  }
}

export function updateReadinessState(
  localUuid: string,
  state: LocalReadinessState
): void {
  const key = `dagger-readiness-state-${localUuid}`;
  localStorage.setItem(key, JSON.stringify(state));
}

// ============================================================================
// Sleep Logs (with sleepStart, sleepEnd, stressInputs)
// ============================================================================

export function getSleepLogs(localUuid: string): SleepLog[] {
  try {
    const key = `dagger-sleep-logs-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load sleep logs:', error);
    return [];
  }
}

export function addSleepLog(
  localUuid: string,
  log: Omit<SleepLog, 'id'>
): SleepLog {
  const logs = getSleepLogs(localUuid);
  const newLog: SleepLog = {
    ...log,
    id: Date.now().toString(),
  };
  logs.push(newLog);
  localStorage.setItem(`dagger-sleep-logs-${localUuid}`, JSON.stringify(logs));
  return newLog;
}

// ============================================================================
// Sleep Performance State
// ============================================================================

export function getSleepPerformanceState(localUuid: string): SleepPerformanceState {
  try {
    const key = `dagger-sleep-performance-state-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored
      ? JSON.parse(stored)
      : {
          mode: 'standard' as const,
          sleepDebt: 0,
          consecutiveGoodNights: 0,
          unlockedNapDurations: [10],
        };
  } catch (error) {
    console.error('Failed to load sleep performance state:', error);
    return {
      mode: 'standard' as const,
      sleepDebt: 0,
      consecutiveGoodNights: 0,
      unlockedNapDurations: [10],
    };
  }
}

export function updateSleepPerformanceState(
  localUuid: string,
  state: SleepPerformanceState
): void {
  const key = `dagger-sleep-performance-state-${localUuid}`;
  localStorage.setItem(key, JSON.stringify(state));
}

// ============================================================================
// Caffeine Logs (with source field)
// ============================================================================

export function getCaffeineLogs(localUuid: string): CaffeineLog[] {
  try {
    const key = `dagger-caffeine-logs-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load caffeine logs:', error);
    return [];
  }
}

export function addCaffeineLog(
  localUuid: string,
  log: Omit<CaffeineLog, 'id'>
): CaffeineLog {
  const logs = getCaffeineLogs(localUuid);
  const newLog: CaffeineLog = {
    ...log,
    id: Date.now().toString(),
  };
  logs.push(newLog);
  localStorage.setItem(`dagger-caffeine-logs-${localUuid}`, JSON.stringify(logs));
  return newLog;
}

// ============================================================================
// IZOF Entries
// ============================================================================

export function getIZOFEntries(localUuid: string): LegacyIZOFEntry[] {
  try {
    const key = `dagger-izof-entries-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load IZOF entries:', error);
    return [];
  }
}

export function addIZOFEntry(
  localUuid: string,
  entry: Omit<LegacyIZOFEntry, 'id'>
): LegacyIZOFEntry {
  const entries = getIZOFEntries(localUuid);
  const newEntry: LegacyIZOFEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  entries.push(newEntry);
  localStorage.setItem(`dagger-izof-entries-${localUuid}`, JSON.stringify(entries));
  return newEntry;
}

export function updateIZOFEntry(
  localUuid: string,
  id: string,
  updates: Partial<Omit<LegacyIZOFEntry, 'id'>>
): void {
  const entries = getIZOFEntries(localUuid);
  const index = entries.findIndex((e) => e.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    localStorage.setItem(`dagger-izof-entries-${localUuid}`, JSON.stringify(entries));
  }
}

// ============================================================================
// IZOF Settings
// ============================================================================

export function getIZOFSettings(localUuid: string): LegacyIZOFSettings {
  try {
    const key = `dagger-izof-settings-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored
      ? JSON.parse(stored)
      : { coachViewEnabled: false, rangeOverride: null };
  } catch (error) {
    console.error('Failed to load IZOF settings:', error);
    return { coachViewEnabled: false, rangeOverride: null };
  }
}

export function updateIZOFSettings(
  localUuid: string,
  settings: Partial<LegacyIZOFSettings>
): void {
  const current = getIZOFSettings(localUuid);
  const updated = { ...current, ...settings };
  localStorage.setItem(`dagger-izof-settings-${localUuid}`, JSON.stringify(updated));
}

// ============================================================================
// Personal Reports (with XP tracking)
// ============================================================================

export function getPersonalReports(localUuid: string): LegacyPersonalReport[] {
  try {
    const key = `dagger-personal-reports-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load personal reports:', error);
    return [];
  }
}

export function addPersonalReport(
  localUuid: string,
  report: Omit<LegacyPersonalReport, 'id' | 'createdAt' | 'updatedAt' | 'timestamp' | 'isSubmitted' | 'submitted' | 'xpGranted'>
): LegacyPersonalReport {
  const reports = getPersonalReports(localUuid);
  const now = Date.now();
  const newReport: LegacyPersonalReport = {
    ...report,
    id: now.toString(),
    createdAt: now,
    updatedAt: now,
    timestamp: now,
    isSubmitted: false,
    submitted: false,
    xpGranted: false,
  };
  reports.push(newReport);
  localStorage.setItem(`dagger-personal-reports-${localUuid}`, JSON.stringify(reports));
  return newReport;
}

export function updatePersonalReport(
  localUuid: string,
  id: string,
  updates: Partial<Omit<LegacyPersonalReport, 'id' | 'createdAt'>>
): void {
  const reports = getPersonalReports(localUuid);
  const index = reports.findIndex((r) => r.id === id);
  if (index !== -1) {
    reports[index] = {
      ...reports[index],
      ...updates,
      updatedAt: Date.now(),
    };
    localStorage.setItem(`dagger-personal-reports-${localUuid}`, JSON.stringify(reports));
  }
}

export function deletePersonalReport(localUuid: string, id: string): void {
  const reports = getPersonalReports(localUuid);
  const filtered = reports.filter((r) => r.id !== id);
  localStorage.setItem(`dagger-personal-reports-${localUuid}`, JSON.stringify(filtered));
}

export function submitPersonalReport(localUuid: string, reportId: string): void {
  updatePersonalReport(localUuid, reportId, { 
    isSubmitted: true, 
    submitted: true,
    submittedAt: Date.now() 
  });
}

export function markReportXpGranted(localUuid: string, reportId: string): void {
  updatePersonalReport(localUuid, reportId, { xpGranted: true });
}

// ============================================================================
// Quote Reflections
// ============================================================================

export function getQuoteReflection(localUuid: string, quoteId: string): string {
  try {
    const key = `dagger-quote-reflections-${localUuid}`;
    const stored = localStorage.getItem(key);
    const reflections: Record<string, string> = stored ? JSON.parse(stored) : {};
    return reflections[quoteId] || '';
  } catch (error) {
    console.error('Failed to load quote reflection:', error);
    return '';
  }
}

export function saveQuoteReflection(
  localUuid: string,
  quoteId: string,
  reflection: string
): void {
  try {
    const key = `dagger-quote-reflections-${localUuid}`;
    const stored = localStorage.getItem(key);
    const reflections: Record<string, string> = stored ? JSON.parse(stored) : {};
    reflections[quoteId] = reflection;
    localStorage.setItem(key, JSON.stringify(reflections));
  } catch (error) {
    console.error('Failed to save quote reflection:', error);
  }
}

// ============================================================================
// Reset All Data
// ============================================================================

export function resetAllLocalData(localUuid: string): void {
  const keys = [
    `dagger-journal-${localUuid}`,
    `dagger-daily-inputs-${localUuid}`,
    `dagger-readiness-state-${localUuid}`,
    `dagger-sleep-logs-${localUuid}`,
    `dagger-sleep-performance-state-${localUuid}`,
    `dagger-caffeine-logs-${localUuid}`,
    `dagger-izof-entries-${localUuid}`,
    `dagger-izof-settings-${localUuid}`,
    `dagger-personal-reports-${localUuid}`,
    `dagger-quote-reflections-${localUuid}`,
    `dagger-mission-progression-${localUuid}`,
    `dagger-assessment-results-${localUuid}`,
    `dagger-reading-progress-${localUuid}`,
    `dagger-reading-rewards-${localUuid}`,
  ];
  
  keys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
    }
  });
}
