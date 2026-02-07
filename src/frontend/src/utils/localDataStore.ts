/**
 * Local Data Store Utility
 * 
 * Centralized storage for all user-generated content scoped by localUuid.
 */

import type { VideoProgress } from '../types/motivationalVideos';

const STORAGE_KEYS = {
  journals: 'dagger-journals',
  dailyInputs: 'dagger-daily-inputs',
  readinessState: 'dagger-readiness-state',
  missionProgression: 'dagger-mission-progression',
  assessments: 'dagger-assessments',
  sleepLogs: 'dagger-sleep-logs',
  sleepPerformanceState: 'dagger-sleep-performance-state',
  caffeineLogs: 'dagger-caffeine-logs',
  readingProgress: 'dagger-reading-progress',
  readingRewards: 'dagger-reading-rewards',
  personalReports: 'dagger-personal-reports',
  quoteReflections: 'dagger-quote-reflections',
  izofEntries: 'dagger-izof-entries',
  izofSettings: 'dagger-izof-settings',
  lifeLessonsProgress: 'dagger-life-lessons-progress',
} as const;

// Type Definitions
export interface LocalJournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags?: string[];
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
  startTime: number;
  endTime: number;
  duration: number;
  quality: number;
  timestamp: number;
  painInputs?: {
    neckPain?: number;
    backPain?: number;
    nerveSymptoms?: boolean;
  };
  stressDisruption?: {
    nightmares?: boolean;
    hypervigilance?: boolean;
    racingThoughts?: boolean;
    startleResponse?: boolean;
  };
  stressInputs?: {
    nightmares?: boolean;
    hypervigilance?: boolean;
    racingThoughts?: boolean;
    startleResponse?: boolean;
  };
}

export interface SleepPerformanceState {
  mode: 'standard' | 'tactical' | 'recovery';
  sleepDebt: number;
  consecutiveGoodNights: number;
  unlockedNapDurations: number[];
}

export interface CaffeineLog {
  id: string;
  amount: number;
  timestamp: number;
  type: string;
  source?: string;
}

// Life Lessons Progress Storage
export function getLifeLessonsProgress(localUuid: string): Record<string, VideoProgress> {
  try {
    const key = `${STORAGE_KEYS.lifeLessonsProgress}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load life lessons progress:', error);
    return {};
  }
}

export function saveLifeLessonsProgress(localUuid: string, progress: Record<string, VideoProgress>): void {
  try {
    const key = `${STORAGE_KEYS.lifeLessonsProgress}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save life lessons progress:', error);
  }
}

export function getVideoProgress(localUuid: string, videoId: string): VideoProgress {
  const allProgress = getLifeLessonsProgress(localUuid);
  return allProgress[videoId] || {
    isFavorited: false,
    isWatched: false,
  };
}

export function updateVideoProgress(
  localUuid: string,
  videoId: string,
  updates: Partial<VideoProgress>
): void {
  const allProgress = getLifeLessonsProgress(localUuid);
  allProgress[videoId] = {
    ...allProgress[videoId],
    ...updates,
  };
  saveLifeLessonsProgress(localUuid, allProgress);
}

// Reset function
export function resetAllLocalData(localUuid: string): void {
  Object.values(STORAGE_KEYS).forEach((baseKey) => {
    const key = `${baseKey}-${localUuid}`;
    localStorage.removeItem(key);
  });
}

// Journal functions
export function getJournals(localUuid: string): LocalJournalEntry[] {
  try {
    const key = `${STORAGE_KEYS.journals}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load journals:', error);
    return [];
  }
}

export function saveJournals(localUuid: string, journals: LocalJournalEntry[]): void {
  try {
    const key = `${STORAGE_KEYS.journals}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(journals));
  } catch (error) {
    console.error('Failed to save journals:', error);
  }
}

export function addJournal(localUuid: string, entry: Omit<LocalJournalEntry, 'id'>): LocalJournalEntry {
  const journals = getJournals(localUuid);
  const newEntry: LocalJournalEntry = {
    ...entry,
    id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  journals.push(newEntry);
  saveJournals(localUuid, journals);
  return newEntry;
}

export function updateJournal(localUuid: string, entryId: string, updates: Partial<Omit<LocalJournalEntry, 'id' | 'timestamp'>>): void {
  const journals = getJournals(localUuid);
  const index = journals.findIndex(j => j.id === entryId);
  if (index !== -1) {
    journals[index] = { ...journals[index], ...updates };
    saveJournals(localUuid, journals);
  }
}

export function deleteJournal(localUuid: string, entryId: string): void {
  const journals = getJournals(localUuid);
  const filtered = journals.filter(j => j.id !== entryId);
  saveJournals(localUuid, filtered);
}

// Daily Inputs functions
export function getDailyInputs(localUuid: string): LocalDailyInput[] {
  try {
    const key = `${STORAGE_KEYS.dailyInputs}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load daily inputs:', error);
    return [];
  }
}

export function saveDailyInputs(localUuid: string, inputs: LocalDailyInput[]): void {
  try {
    const key = `${STORAGE_KEYS.dailyInputs}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(inputs));
  } catch (error) {
    console.error('Failed to save daily inputs:', error);
  }
}

export function addDailyInput(localUuid: string, input: LocalDailyInput): void {
  const inputs = getDailyInputs(localUuid);
  inputs.push(input);
  saveDailyInputs(localUuid, inputs);
}

export function getLatestDailyInput(localUuid: string): LocalDailyInput | null {
  const inputs = getDailyInputs(localUuid);
  return inputs.length > 0 ? inputs[inputs.length - 1] : null;
}

// Readiness State functions
export function getReadinessState(localUuid: string): LocalReadinessState {
  try {
    const key = `${STORAGE_KEYS.readinessState}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {
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

export function saveReadinessState(localUuid: string, state: LocalReadinessState): void {
  try {
    const key = `${STORAGE_KEYS.readinessState}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save readiness state:', error);
  }
}

export function updateReadinessState(localUuid: string, state: LocalReadinessState): void {
  saveReadinessState(localUuid, state);
}

// Mission Progression functions
export function getMissionProgression(localUuid: string): any {
  try {
    const key = `${STORAGE_KEYS.missionProgression}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load mission progression:', error);
    return null;
  }
}

export function saveMissionProgression(localUuid: string, progression: any): void {
  try {
    const key = `${STORAGE_KEYS.missionProgression}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(progression));
  } catch (error) {
    console.error('Failed to save mission progression:', error);
  }
}

// Assessment functions
export function getAssessments(localUuid: string): any[] {
  try {
    const key = `${STORAGE_KEYS.assessments}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load assessments:', error);
    return [];
  }
}

export function saveAssessments(localUuid: string, assessments: any[]): void {
  try {
    const key = `${STORAGE_KEYS.assessments}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(assessments));
  } catch (error) {
    console.error('Failed to save assessments:', error);
  }
}

// Sleep Log functions
export function getSleepLogs(localUuid: string): SleepLog[] {
  try {
    const key = `${STORAGE_KEYS.sleepLogs}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load sleep logs:', error);
    return [];
  }
}

export function saveSleepLogs(localUuid: string, logs: SleepLog[]): void {
  try {
    const key = `${STORAGE_KEYS.sleepLogs}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save sleep logs:', error);
  }
}

export function addSleepLog(localUuid: string, log: Omit<SleepLog, 'id'>): SleepLog {
  const logs = getSleepLogs(localUuid);
  const newLog: SleepLog = {
    ...log,
    id: `sleep-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  logs.push(newLog);
  saveSleepLogs(localUuid, logs);
  return newLog;
}

// Sleep Performance State functions
export function getSleepPerformanceState(localUuid: string): SleepPerformanceState {
  try {
    const key = `${STORAGE_KEYS.sleepPerformanceState}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {
      mode: 'standard',
      sleepDebt: 0,
      consecutiveGoodNights: 0,
      unlockedNapDurations: [10],
    };
  } catch (error) {
    console.error('Failed to load sleep performance state:', error);
    return {
      mode: 'standard',
      sleepDebt: 0,
      consecutiveGoodNights: 0,
      unlockedNapDurations: [10],
    };
  }
}

export function saveSleepPerformanceState(localUuid: string, state: SleepPerformanceState): void {
  try {
    const key = `${STORAGE_KEYS.sleepPerformanceState}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save sleep performance state:', error);
  }
}

export function updateSleepPerformanceState(localUuid: string, state: SleepPerformanceState): void {
  saveSleepPerformanceState(localUuid, state);
}

// Caffeine Log functions
export function getCaffeineLogs(localUuid: string): CaffeineLog[] {
  try {
    const key = `${STORAGE_KEYS.caffeineLogs}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load caffeine logs:', error);
    return [];
  }
}

export function saveCaffeineLogs(localUuid: string, logs: CaffeineLog[]): void {
  try {
    const key = `${STORAGE_KEYS.caffeineLogs}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save caffeine logs:', error);
  }
}

export function addCaffeineLog(localUuid: string, log: Omit<CaffeineLog, 'id'>): CaffeineLog {
  const logs = getCaffeineLogs(localUuid);
  const newLog: CaffeineLog = {
    ...log,
    id: `caffeine-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  logs.push(newLog);
  saveCaffeineLogs(localUuid, logs);
  return newLog;
}

// Reading Progress functions
export function getReadingProgress(localUuid: string): any {
  try {
    const key = `${STORAGE_KEYS.readingProgress}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load reading progress:', error);
    return {};
  }
}

export function saveReadingProgress(localUuid: string, progress: any): void {
  try {
    const key = `${STORAGE_KEYS.readingProgress}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save reading progress:', error);
  }
}

// Reading Rewards functions
export function getReadingRewards(localUuid: string): any {
  try {
    const key = `${STORAGE_KEYS.readingRewards}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { grantedBadges: [] };
  } catch (error) {
    console.error('Failed to load reading rewards:', error);
    return { grantedBadges: [] };
  }
}

export function saveReadingRewards(localUuid: string, rewards: any): void {
  try {
    const key = `${STORAGE_KEYS.readingRewards}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(rewards));
  } catch (error) {
    console.error('Failed to save reading rewards:', error);
  }
}

// Personal Reports functions
export function getPersonalReports(localUuid: string): any[] {
  try {
    const key = `${STORAGE_KEYS.personalReports}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load personal reports:', error);
    return [];
  }
}

export function savePersonalReports(localUuid: string, reports: any[]): void {
  try {
    const key = `${STORAGE_KEYS.personalReports}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(reports));
  } catch (error) {
    console.error('Failed to save personal reports:', error);
  }
}

export function addPersonalReport(localUuid: string, report: any): any {
  const reports = getPersonalReports(localUuid);
  const newReport = {
    ...report,
    id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
    isSubmitted: false,
    xpGranted: false,
  };
  reports.push(newReport);
  savePersonalReports(localUuid, reports);
  return newReport;
}

export function updatePersonalReport(localUuid: string, reportId: string, updates: any): void {
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

export function submitPersonalReport(localUuid: string, reportId: string): void {
  const reports = getPersonalReports(localUuid);
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index].isSubmitted = true;
    reports[index].submittedAt = Date.now();
    savePersonalReports(localUuid, reports);
  }
}

export function markReportXpGranted(localUuid: string, reportId: string): void {
  const reports = getPersonalReports(localUuid);
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index].xpGranted = true;
    savePersonalReports(localUuid, reports);
  }
}

// Quote Reflections functions
export function getQuoteReflections(localUuid: string): Record<string, string> {
  try {
    const key = `${STORAGE_KEYS.quoteReflections}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load quote reflections:', error);
    return {};
  }
}

export function saveQuoteReflections(localUuid: string, reflections: Record<string, string>): void {
  try {
    const key = `${STORAGE_KEYS.quoteReflections}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(reflections));
  } catch (error) {
    console.error('Failed to save quote reflections:', error);
  }
}

export function getQuoteReflection(localUuid: string, quoteId: string): string | null {
  const reflections = getQuoteReflections(localUuid);
  return reflections[quoteId] || null;
}

export function saveQuoteReflection(localUuid: string, quoteId: string, reflection: string): void {
  const reflections = getQuoteReflections(localUuid);
  reflections[quoteId] = reflection;
  saveQuoteReflections(localUuid, reflections);
}

// IZOF Entries functions
export function getIzofEntries(localUuid: string): any[] {
  try {
    const key = `${STORAGE_KEYS.izofEntries}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load IZOF entries:', error);
    return [];
  }
}

// Alias for backward compatibility
export const getIZOFEntries = getIzofEntries;

export function saveIzofEntries(localUuid: string, entries: any[]): void {
  try {
    const key = `${STORAGE_KEYS.izofEntries}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save IZOF entries:', error);
  }
}

export function addIZOFEntry(localUuid: string, entry: any): any {
  const entries = getIzofEntries(localUuid);
  const newEntry = {
    ...entry,
    id: `izof-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  entries.push(newEntry);
  saveIzofEntries(localUuid, entries);
  return newEntry;
}

export function updateIZOFEntry(localUuid: string, entryId: string, updates: any): void {
  const entries = getIzofEntries(localUuid);
  const index = entries.findIndex(e => e.id === entryId);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    saveIzofEntries(localUuid, entries);
  }
}

// IZOF Settings functions
export function getIzofSettings(localUuid: string): any {
  try {
    const key = `${STORAGE_KEYS.izofSettings}-${localUuid}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { coachViewEnabled: false };
  } catch (error) {
    console.error('Failed to load IZOF settings:', error);
    return { coachViewEnabled: false };
  }
}

// Alias for backward compatibility
export const getIZOFSettings = getIzofSettings;

export function saveIzofSettings(localUuid: string, settings: any): void {
  try {
    const key = `${STORAGE_KEYS.izofSettings}-${localUuid}`;
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save IZOF settings:', error);
  }
}

export function updateIZOFSettings(localUuid: string, updates: any): void {
  const current = getIzofSettings(localUuid);
  const updated = { ...current, ...updates };
  saveIzofSettings(localUuid, updated);
}
