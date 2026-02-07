/**
 * Dashboard Hooks (Local-Only)
 * 
 * Manages daily readiness inputs and streak calculation locally.
 * All computation happens client-side; no backend dependency.
 * 
 * Readiness calculation:
 * - Converts raw slider values to readiness-friendly values (inverts lower-is-better factors)
 * - Input score: average of 4 readiness-friendly factors
 * - Streak bonus: up to 30 points for maintaining 21+ day streak
 * - Overall score: 70% input + 30% streak bonus
 * 
 * Factor polarity:
 * - Sleep Quality: higher raw value = better readiness (0=worst, 100=best)
 * - Training Load: lower raw value = better readiness (0=best, 100=worst)
 * - Stress Level: lower raw value = better readiness (0=best, 100=worst)
 * - Pain/Injury Status: lower raw value = better readiness (0=best, 100=worst)
 */

import { useLocalDailyInputs, useLocalReadinessState } from './useLocalData';
import { useLocalProfile } from './useLocalProfile';
import type { LocalDailyInput } from '../utils/localDataStore';
import type { DailyInput } from '../backend';
import { useState } from 'react';
import { toReadinessValue, selectExplanationByReadiness, FACTOR_CONFIGS } from '../utils/readinessSemantics';

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
      // Convert raw slider values to readiness-friendly values
      const sleepReadiness = toReadinessValue(input.sleepScore, FACTOR_CONFIGS.sleep.polarity);
      const trainingReadiness = toReadinessValue(input.trainingLoadScore, FACTOR_CONFIGS.training.polarity);
      const stressReadiness = toReadinessValue(input.stressScore, FACTOR_CONFIGS.stress.polarity);
      const painReadiness = toReadinessValue(input.painScore, FACTOR_CONFIGS.pain.polarity);

      // Calculate input score from readiness-friendly values
      const inputScore = Math.round(
        (sleepReadiness + trainingReadiness + stressReadiness + painReadiness) / 4
      );

      // Calculate streak bonus (up to 30 points for 21+ day streak)
      const streakBonus = state.streakCount > 0
        ? Math.min(30, Math.round((state.streakCount * 30) / 21))
        : 0;

      // Overall score: 70% input + 30% streak bonus
      const overallScore = Math.round(inputScore * 0.7 + streakBonus * 0.3);

      // Generate explanations using raw values but correct polarity
      const explanations = generateReadinessExplanations(
        input.sleepScore,
        input.trainingLoadScore,
        input.stressScore,
        input.painScore,
        overallScore,
        streakBonus
      );

      // Save input with raw slider values
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
  // Use selectExplanationByReadiness to apply correct polarity
  const sleepExplanation = selectExplanationByReadiness(
    sleepScore,
    FACTOR_CONFIGS.sleep.polarity,
    'Stable sleep; steady impacts.',
    'Good NREM but need REM; efficiency is crucial.',
    'Better duration, optimize circadian rhythm.',
    'Prioritize sleep; recovery is non-negotiable.'
  );

  const trainingLoadExplanation = selectExplanationByReadiness(
    trainingLoadScore,
    FACTOR_CONFIGS.training.polarity,
    'Minimal load; optimal recovery window.',
    'Light workload - maintain readiness.',
    'Moderate load - monitor recovery needs.',
    'Heavy load - prioritize recovery and periodization.'
  );

  const stressExplanation = selectExplanationByReadiness(
    stressScore,
    FACTOR_CONFIGS.stress.polarity,
    'Low stress; optimal cognitive state.',
    'Manageable stress - maintain resilience practices.',
    'Elevated stress - implement mitigation strategies.',
    'High stress - immediate intervention required.'
  );

  const painExplanation = selectExplanationByReadiness(
    painScore,
    FACTOR_CONFIGS.pain.polarity,
    'No pain; full operational capacity.',
    'Minor discomfort - maintain mobility work.',
    'Noticeable pain - address deficit areas.',
    'Significant pain - seek medical attention.'
  );

  // Calculate aggregate from readiness-friendly values
  const sleepReadiness = toReadinessValue(sleepScore, FACTOR_CONFIGS.sleep.polarity);
  const trainingReadiness = toReadinessValue(trainingLoadScore, FACTOR_CONFIGS.training.polarity);
  const stressReadiness = toReadinessValue(stressScore, FACTOR_CONFIGS.stress.polarity);
  const painReadiness = toReadinessValue(painScore, FACTOR_CONFIGS.pain.polarity);
  const aggregate = Math.round((sleepReadiness + trainingReadiness + stressReadiness + painReadiness) / 4);

  return `Phase factors: Sleep ${sleepExplanation}; Training Load ${trainingLoadExplanation} | Stress ${stressExplanation}; Pain ${painExplanation}. Aggregate score: ${aggregate} | Readiness influences and streak bonus: ${streakBonus}`;
}
