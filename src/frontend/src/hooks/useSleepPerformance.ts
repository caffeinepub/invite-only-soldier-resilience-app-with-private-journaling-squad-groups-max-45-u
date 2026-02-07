import { useLocalProfile } from './useLocalProfile';
import {
  getSleepLogs,
  addSleepLog,
  getSleepPerformanceState,
  updateSleepPerformanceState,
  getCaffeineLogs,
  addCaffeineLog,
  type SleepLog,
  type SleepPerformanceState,
  type CaffeineLog
} from '../utils/localDataStore';
import { useState, useEffect } from 'react';
import {
  computeSleepDebt,
  computeCognitiveReadiness,
  computeInjuryRisk,
  computeEmotionalRegulation,
  type SleepMetrics
} from '../utils/sleepPerformance';

export function useSleepPerformance() {
  const { profile } = useLocalProfile();
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [state, setState] = useState<SleepPerformanceState>(() => getSleepPerformanceState(profile.localUuid));
  const [caffeineLogs, setCaffeineLogs] = useState<CaffeineLog[]>([]);

  useEffect(() => {
    setLogs(getSleepLogs(profile.localUuid));
    setState(getSleepPerformanceState(profile.localUuid));
    setCaffeineLogs(getCaffeineLogs(profile.localUuid));
  }, [profile.localUuid]);

  const logSleep = (log: Omit<SleepLog, 'id' | 'timestamp'>) => {
    const logWithTimestamp = { ...log, timestamp: Date.now() };
    const newLog = addSleepLog(profile.localUuid, logWithTimestamp);
    setLogs(prev => [...prev, newLog]);
    
    // Update state
    const updatedState = getSleepPerformanceState(profile.localUuid);
    const newConsecutiveGoodNights = log.duration >= 7 * 60 * 60 * 1000 
      ? updatedState.consecutiveGoodNights + 1 
      : 0;
    
    // Check for unlocks
    const newUnlockedNaps = [...updatedState.unlockedNapDurations];
    if (newConsecutiveGoodNights >= 7 && !newUnlockedNaps.includes(20)) {
      newUnlockedNaps.push(20);
    }
    if (newConsecutiveGoodNights >= 14 && !newUnlockedNaps.includes(30)) {
      newUnlockedNaps.push(30);
    }
    if (newConsecutiveGoodNights >= 21 && !newUnlockedNaps.includes(90)) {
      newUnlockedNaps.push(90);
    }
    
    const newState: SleepPerformanceState = {
      ...updatedState,
      consecutiveGoodNights: newConsecutiveGoodNights,
      unlockedNapDurations: newUnlockedNaps,
    };
    
    updateSleepPerformanceState(profile.localUuid, newState);
    setState(newState);
    
    return newLog;
  };

  const setMode = (mode: SleepPerformanceState['mode']) => {
    const currentState = getSleepPerformanceState(profile.localUuid);
    const newState = { ...currentState, mode };
    updateSleepPerformanceState(profile.localUuid, newState);
    setState(newState);
  };

  const logCaffeine = (log: Omit<CaffeineLog, 'id' | 'timestamp'>) => {
    const logWithTimestamp = { ...log, timestamp: Date.now() };
    const newLog = addCaffeineLog(profile.localUuid, logWithTimestamp);
    setCaffeineLogs(prev => [...prev, newLog]);
    return newLog;
  };

  const getMetrics = (): SleepMetrics => {
    const sleepDebt = computeSleepDebt(logs);
    const cognitiveReadiness = computeCognitiveReadiness(sleepDebt);
    const injuryRisk = computeInjuryRisk(sleepDebt, logs);
    const emotionalRegulation = computeEmotionalRegulation(sleepDebt);
    
    return {
      sleepDebt,
      cognitiveReadiness,
      injuryRisk,
      emotionalRegulation,
      lastSleepWindow: logs.length > 0 ? logs[logs.length - 1] : null
    };
  };

  return {
    logs,
    state,
    caffeineLogs,
    logSleep,
    setMode,
    logCaffeine,
    getMetrics
  };
}
