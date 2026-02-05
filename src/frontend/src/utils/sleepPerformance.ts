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
  const clearanceTime = log.time + (halfLife * 4); // ~4 half-lives for 94% clearance
  
  return { clearanceTime, halfLife };
}

export function recommendLastCaffeineTime(plannedSleepTime: number): number {
  // 6 hours before planned sleep
  return plannedSleepTime - (6 * 60 * 60 * 1000);
}

export function getPainGuidance(painInputs?: SleepLog['painInputs']): {
  positioning: string[];
  pillowGuidance: string;
  microRoutine: string;
  redFlag: string | null;
} {
  if (!painInputs) {
    return {
      positioning: ['Neutral spine alignment', 'Support natural curves'],
      pillowGuidance: 'Maintain head-neck alignment',
      microRoutine: 'No specific routine needed',
      redFlag: null
    };
  }

  const positioning: string[] = [];
  let pillowGuidance = '';
  let microRoutine = '';
  let redFlag: string | null = null;

  if (painInputs.neckPain && painInputs.neckPain > 5) {
    positioning.push('Side-lying with pillow between knees');
    positioning.push('Avoid stomach sleeping');
    pillowGuidance = 'Cervical support pillow maintaining natural curve';
    microRoutine = '60-sec: Chin tucks (10 reps), gentle neck rotations (5 each side)';
  }

  if (painInputs.backPain && painInputs.backPain > 5) {
    positioning.push('Side-lying with pillow between knees');
    positioning.push('Or back-lying with pillow under knees');
    pillowGuidance = 'Lumbar support if back-lying';
    microRoutine = '90-sec: Knee-to-chest stretch (30s each side), pelvic tilts (10 reps)';
  }

  if (painInputs.nerveSymptoms) {
    redFlag = 'Nerve symptoms require evaluation. If worsening numbness, weakness, or bowel/bladder changes occur, seek immediate medical attention.';
  }

  if (positioning.length === 0) {
    positioning.push('Neutral spine alignment');
  }

  return { positioning, pillowGuidance, microRoutine, redFlag };
}

export function getStressDisruptionTools(stressInputs?: SleepLog['stressInputs']): {
  immediateTool: string;
  followUp: string;
} | null {
  if (!stressInputs) return null;

  const hasAny = stressInputs.nightmares || stressInputs.hypervigilance || 
                 stressInputs.racingThoughts || stressInputs.startleResponse;

  if (!hasAny) return null;

  let immediateTool = '';
  let followUp = '';

  if (stressInputs.hypervigilance || stressInputs.startleResponse) {
    immediateTool = '4-min: Box breathing (4-4-4-4 count, 8 cycles). Ground with 5-4-3-2-1 sensory check.';
    followUp = 'Consider environment adjustments: door positioning, lighting, noise control. If persistent, discuss with leadership or medical.';
  } else if (stressInputs.racingThoughts) {
    immediateTool = '3-min: Brain dump on paper. Then 4-7-8 breathing (4 cycles).';
    followUp = 'Pre-sleep routine: 30-min wind-down, no screens, dim lighting. If ongoing, consider professional support.';
  } else if (stressInputs.nightmares) {
    immediateTool = '2-min: Grounding exercise. Reorient to present: name 5 objects, feel surface beneath you.';
    followUp = 'Track patterns. If frequent or worsening, this warrants professional evaluation.';
  }

  return { immediateTool, followUp };
}
