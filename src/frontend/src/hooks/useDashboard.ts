/**
 * Dashboard Hooks (Local-Only)
 * 
 * Manages daily readiness inputs and streak calculation locally.
 * All computation happens client-side; no backend dependency.
 * 
 * Readiness calculation:
 * - Input score: average of 4 factors (sleep, training, stress, pain)
 * - Streak bonus: up to 30 points for maintaining 21+ day streak
 * - Overall score: 70% input + 30% streak bonus
 * 
 * Future seam: Optional backend sync could be added without changing
 * the local-first behavior or UI contract.
 */

import { useLocalDailyInputs, useLocalReadinessState } from './useLocalData';
import { useLocalProfile } from './useLocalProfile';
import type { LocalDailyInput } from '../utils/localDataStore';
import type { DailyInput } from '../backend';
import { useState } from 'react';

interface DashboardData {
  explanation: string;
  latestInput: DailyInput | null;
  streak: number;
}

export function useDashboardData() {
  const { latest } = useLocalDailyInputs();
  const { state } = useLocalReadinessState();

  // Convert LocalDailyInput to DailyInput (number to bigint)
  const convertedLatest: DailyInput | null = latest ? {
    sleepScore: BigInt(latest.sleepScore),
    trainingLoadScore: BigInt(latest.trainingLoadScore),
    stressScore: BigInt(latest.stressScore),
    painScore: BigInt(latest.painScore),
    overallScore: BigInt(latest.overallScore),
    explanations: latest.explanations,
    timestamp: BigInt(latest.timestamp * 1000000), // Convert ms to nanoseconds
  } : null;

  const data: DashboardData = {
    explanation: 'All scores are evaluated as percentage of optimized state. Readiness is based on combined factors with streak influence.',
    latestInput: convertedLatest,
    streak: state.streakCount,
  };

  return {
    data,
    isLoading: false,
    isError: false,
    refetch: () => {}, // No-op for local data
  };
}

interface DailyInputSubmission {
  sleepScore: number;
  trainingLoadScore: number;
  stressScore: number;
  painScore: number;
}

export function useSubmitDailyInput() {
  const { add } = useLocalDailyInputs();
  const { state, update: updateState } = useLocalReadinessState();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [variables, setVariables] = useState<DailyInputSubmission | undefined>(undefined);

  const mutate = async (input: DailyInputSubmission) => {
    setIsPending(true);
    setIsSuccess(false);
    setIsError(false);
    setVariables(input);

    try {
      // Calculate scores
      const inputScore = Math.round(
        (input.sleepScore + input.trainingLoadScore + input.stressScore + input.painScore) / 4
      );

      // Calculate streak bonus (up to 30 points for 21+ day streak)
      const streakBonus = state.streakCount > 0
        ? Math.min(30, Math.round((state.streakCount * 30) / 21))
        : 0;

      // Overall score: 70% input + 30% streak bonus
      const overallScore = Math.round(inputScore * 0.7 + streakBonus * 0.3);

      // Generate explanations
      const explanations = generateReadinessExplanations(
        input.sleepScore,
        input.trainingLoadScore,
        input.stressScore,
        input.painScore,
        overallScore,
        streakBonus
      );

      // Save input
      add({
        ...input,
        overallScore,
        explanations,
      });

      // Update streak
      let newStreak = state.streakCount;
      if (overallScore >= 80) {
        newStreak = state.streakCount + 1;
      } else {
        newStreak = 0;
      }

      const newHighReadinessDays = overallScore >= 80 ? state.highReadinessDays + 1 : state.highReadinessDays;

      updateState({
        streakCount: newStreak,
        highReadinessDays: newHighReadinessDays,
        totalInputs: state.totalInputs + 1,
        lastInputTimestamp: Date.now(),
      });

      setIsSuccess(true);
      setIsPending(false);
      return overallScore;
    } catch (error) {
      setIsError(true);
      setIsPending(false);
      throw error;
    }
  };

  const mutateAsync = async (input: DailyInputSubmission) => {
    return mutate(input);
  };

  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    variables,
  };
}

function generateReadinessExplanations(
  sleepScore: number,
  trainingLoadScore: number,
  stressScore: number,
  painScore: number,
  overallScore: number,
  streakBonus: number
): string {
  const sleepExplanation = selectExplanation(
    sleepScore,
    'Stable sleep; steady impacts.',
    'Good NREM but need REM; efficiency is crucial.',
    'Better duration, optimize circadian rhythm.',
    'Prioritize sleep; recovery is non-negotiable.'
  );

  const trainingLoadExplanation = selectExplanation(
    trainingLoadScore,
    'Maintained load; continue periodization.',
    'Steady workload - monitor acute spikes.',
    'Optimize recovery sessions (hydro, mobility, nutrition).',
    'Periodize strength and conditioning; avoid overload.'
  );

  const stressExplanation = selectExplanation(
    stressScore,
    'No critical outliers detected.',
    'Stable cortisol and HRV.',
    'Functional - bolster physical resilience.',
    'PRV and CNS fatigue indicate need for adjustment.'
  );

  const painExplanation = selectExplanation(
    painScore,
    'Maintain low risk - proper mobility, prehab.',
    'Functionally aligned - holistic focus.',
    'Target deficit areas (strength, mobility).',
    'Restore muscle and neuromuscular balance.'
  );

  const aggregate = Math.round((sleepScore + trainingLoadScore + stressScore + painScore) / 4);

  return `Phase factors: Sleep ${sleepExplanation}; Training Load ${trainingLoadExplanation} | Stress ${stressExplanation}; Pain ${painExplanation}. Aggregate score: ${aggregate} | Readiness influences and streak bonus: ${streakBonus}`;
}

function selectExplanation(score: number, high: string, moderate: string, low: string, critical: string): string {
  if (score >= 80) return high;
  if (score >= 60) return moderate;
  if (score >= 40) return low;
  return critical;
}
