/**
 * Assessment Scoring Utilities
 * 
 * Deterministic placeholder scoring for each assessment type.
 * Each assessment produces at least 3 distinct possible outcomes.
 */

import type { AssessmentDefinition, AssessmentOutcome, AssessmentScores } from '../types/assessments';

export function scoreAssessment(
  assessment: AssessmentDefinition,
  answers: Record<string, string>
): AssessmentOutcome {
  switch (assessment.scoringType) {
    case 'dimensional':
      return scoreDimensional(assessment, answers);
    case 'type':
      return scoreType(assessment, answers);
    case 'band':
      return scoreBand(assessment, answers);
    default:
      throw new Error(`Unknown scoring type: ${assessment.scoringType}`);
  }
}

function scoreDimensional(
  assessment: AssessmentDefinition,
  answers: Record<string, string>
): AssessmentOutcome {
  const scores: AssessmentScores = {};

  // Calculate dimension scores
  assessment.questions.forEach((question) => {
    const answerId = answers[question.id];
    if (!answerId) return;

    const option = question.options.find((opt) => opt.id === answerId);
    if (!option || !option.scoreKey) return;

    if (!scores[option.scoreKey]) {
      scores[option.scoreKey] = 0;
    }
    scores[option.scoreKey] += option.value || 0;
  });

  // Determine primary dimension
  let primaryDimension = '';
  let maxScore = 0;
  Object.entries(scores).forEach(([dim, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primaryDimension = dim;
    }
  });

  // Generate outcome based on assessment type
  if (assessment.id === 'ocean') {
    return {
      outcomeId: `ocean-${primaryDimension.toLowerCase()}`,
      label: getOceanLabel(primaryDimension, scores[primaryDimension]),
      scores,
    };
  } else if (assessment.id === 'disc') {
    return {
      outcomeId: `disc-${primaryDimension.toLowerCase()}`,
      label: `${getDISCLabel(primaryDimension)} Style`,
      scores,
    };
  } else if (assessment.id === 'strengths') {
    return {
      outcomeId: `strengths-${primaryDimension.toLowerCase()}`,
      label: `${primaryDimension} Strength`,
      scores,
    };
  }

  return {
    outcomeId: 'unknown',
    label: 'Unknown',
    scores,
  };
}

function scoreType(
  assessment: AssessmentDefinition,
  answers: Record<string, string>
): AssessmentOutcome {
  const dimensionScores: Record<string, number> = {};

  // Count preferences for each dimension
  assessment.questions.forEach((question) => {
    const answerId = answers[question.id];
    if (!answerId) return;

    const option = question.options.find((opt) => opt.id === answerId);
    if (!option || !option.scoreKey) return;

    if (!dimensionScores[option.scoreKey]) {
      dimensionScores[option.scoreKey] = 0;
    }
    dimensionScores[option.scoreKey] += option.value || 0;
  });

  // Determine MBTI type
  const type = [
    dimensionScores['E'] >= (dimensionScores['I'] || 0) ? 'E' : 'I',
    dimensionScores['S'] >= (dimensionScores['N'] || 0) ? 'S' : 'N',
    dimensionScores['T'] >= (dimensionScores['F'] || 0) ? 'T' : 'F',
    dimensionScores['J'] >= (dimensionScores['P'] || 0) ? 'J' : 'P',
  ].join('');

  return {
    outcomeId: `mbti-${type.toLowerCase()}`,
    label: type,
    scores: dimensionScores,
  };
}

function scoreBand(
  assessment: AssessmentDefinition,
  answers: Record<string, string>
): AssessmentOutcome {
  let totalScore = 0;
  let maxPossible = 0;

  assessment.questions.forEach((question) => {
    const answerId = answers[question.id];
    if (!answerId) return;

    const option = question.options.find((opt) => opt.id === answerId);
    if (!option) return;

    totalScore += option.value || 0;
    maxPossible += 5; // Assuming 5-point scale
  });

  const percentage = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;

  let band = 'developing';
  let label = 'Developing Resilience';
  if (percentage >= 80) {
    band = 'high';
    label = 'High Resilience';
  } else if (percentage >= 60) {
    band = 'moderate';
    label = 'Moderate Resilience';
  } else if (percentage >= 40) {
    band = 'building';
    label = 'Building Resilience';
  }

  return {
    outcomeId: `gat-${band}`,
    label,
    scores: { total: totalScore, percentage },
  };
}

function getOceanLabel(dimension: string, score: number): string {
  const labels: Record<string, { high: string; low: string }> = {
    O: { high: 'High Openness', low: 'Practical Focus' },
    C: { high: 'High Conscientiousness', low: 'Flexible Approach' },
    E: { high: 'High Extraversion', low: 'Reflective Style' },
    A: { high: 'High Agreeableness', low: 'Direct Approach' },
    N: { high: 'Stress-Aware', low: 'Stress-Resilient' },
  };

  const isHigh = score >= 7;
  return labels[dimension]?.[isHigh ? 'high' : 'low'] || 'Balanced';
}

function getDISCLabel(dimension: string): string {
  const labels: Record<string, string> = {
    D: 'Dominance',
    I: 'Influence',
    S: 'Steadiness',
    C: 'Conscientiousness',
  };
  return labels[dimension] || 'Balanced';
}
