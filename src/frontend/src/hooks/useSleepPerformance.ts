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
    const newLog = addSleepLog(profile.localUuid, log);
    setLogs(prev => [...prev, newLog]);
    
    // Update state
    const updatedState = getSleepPerformanceState(profile.localUuid);
    updatedState.totalLogs += 1;
    updatedState.lastLogTimestamp = Date.now();
    
    // Update streak
    const daysSinceLastLog = updatedState.lastLogTimestamp 
      ? (Date.now() - updatedState.lastLogTimestamp) / (1000 * 60 * 60 * 24)
      : 999;
    
    if (daysSinceLastLog <= 1.5) {
      updatedState.streakCount += 1;
    } else {
      updatedState.streakCount = 1;
    }
    
    // Check for unlocks
    if (updatedState.streakCount >= 7 && !updatedState.unlockedTools.includes('advanced-naps')) {
      updatedState.unlockedTools.push('advanced-naps');
    }
    
    updateSleepPerformanceState(profile.localUuid, updatedState);
    setState(updatedState);
    
    return newLog;
  };

  const setMode = (mode: SleepPerformanceState['mode']) => {
    updateSleepPerformanceState(profile.localUuid, { mode });
    setState(prev => ({ ...prev, mode }));
  };

  const logCaffeine = (log: Omit<CaffeineLog, 'id' | 'timestamp'>) => {
    const newLog = addCaffeineLog(profile.localUuid, log);
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
