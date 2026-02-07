import type { SleepLog, CaffeineLog } from './localDataStore';

export interface SleepMetrics {
  sleepDebt: number;
  cognitiveReadiness: number;
  injuryRisk: number;
  emotionalRegulation: number;
  lastSleepWindow: SleepLog | null;
}

export interface PerformanceImpact {
  reactionTime: number;
  injuryRisk: number;
  emotionalVolatility: number;
  judgmentErrors: number;
}

const OPTIMAL_SLEEP_HOURS = 7.5;
const DEBT_WINDOW_DAYS = 7;

export function computeSleepDebt(logs: SleepLog[]): number {
  if (logs.length === 0) return 0;
  
  const now = Date.now();
  const windowStart = now - (DEBT_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  
  const recentLogs = logs.filter(log => log.timestamp >= windowStart);
  
  let totalDebt = 0;
  recentLogs.forEach(log => {
    const hoursSlept = log.duration / (60 * 60 * 1000);
    const deficit = Math.max(0, OPTIMAL_SLEEP_HOURS - hoursSlept);
    totalDebt += deficit;
  });
  
  return Math.round(totalDebt * 10) / 10;
}

export function computeCognitiveReadiness(sleepDebt: number): number {
  // 0 debt = 100%, each hour of debt reduces by ~8%
  const readiness = Math.max(0, 100 - (sleepDebt * 8));
  return Math.round(readiness);
}

export function computeInjuryRisk(sleepDebt: number, logs: SleepLog[]): number {
  // Base risk from debt
  let risk = Math.min(100, sleepDebt * 10);
  
  // Check for consecutive short nights
  const recentLogs = logs.slice(-3);
  const shortNights = recentLogs.filter(log => {
    const hours = log.duration / (60 * 60 * 1000);
    return hours < 5;
  }).length;
  
  if (shortNights >= 3) {
    risk = Math.min(100, risk + 25);
  }
  
  return Math.round(risk);
}

export function computeEmotionalRegulation(sleepDebt: number): number {
  // 0 debt = 100%, exponential degradation
  const regulation = Math.max(0, 100 - (sleepDebt * 12));
  return Math.round(regulation);
}

export function mapDebtToPerformance(sleepDebt: number, logs: SleepLog[]): PerformanceImpact {
  return {
    reactionTime: Math.min(100, Math.round(sleepDebt * 15)),
    injuryRisk: computeInjuryRisk(sleepDebt, logs),
    emotionalVolatility: Math.min(100, Math.round(sleepDebt * 18)),
    judgmentErrors: Math.min(100, Math.round(sleepDebt * 12))
  };
}

export function formatSleepWindow(log: SleepLog): string {
  const start = new Date(log.sleepStart);
  const end = new Date(log.sleepEnd);
  const hours = Math.floor(log.duration / (60 * 60 * 1000));
  const minutes = Math.floor((log.duration % (60 * 60 * 1000)) / (60 * 1000));
  
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${hours}h ${minutes}m)`;
}

export function estimateCaffeineClearance(log: CaffeineLog): { clearanceTime: number; halfLife: number } {
  const halfLife = 5 * 60 * 60 * 1000; // 5 hours in ms
  const clearanceTime = log.timestamp + (halfLife * 4); // ~4 half-lives for 94% clearance
  
  return { clearanceTime, halfLife };
}

export function recommendLastCaffeineTime(plannedSleepTime: number): number {
  const halfLife = 5 * 60 * 60 * 1000;
  const clearanceNeeded = halfLife * 4;
  return plannedSleepTime - clearanceNeeded;
}

export function getPainGuidance(painInputs?: { neckPain?: number; backPain?: number; nerveSymptoms?: boolean }): string | null {
  if (!painInputs) return null;
  
  const hasPain = (painInputs.neckPain && painInputs.neckPain > 3) || 
                  (painInputs.backPain && painInputs.backPain > 3) || 
                  painInputs.nerveSymptoms;
  
  if (!hasPain) return null;
  
  return 'Consider sleep position adjustments and consult medical if pain persists.';
}

export function getStressDisruptionTools(stressInputs?: { nightmares?: boolean; hypervigilance?: boolean; racingThoughts?: boolean; startleResponse?: boolean }): string[] | null {
  if (!stressInputs) return null;
  
  const tools: string[] = [];
  
  if (stressInputs.nightmares) {
    tools.push('Imagery rehearsal therapy');
  }
  if (stressInputs.hypervigilance) {
    tools.push('Progressive muscle relaxation');
  }
  if (stressInputs.racingThoughts) {
    tools.push('Thought journaling before bed');
  }
  if (stressInputs.startleResponse) {
    tools.push('Controlled breathing exercises');
  }
  
  return tools.length > 0 ? tools : null;
}
