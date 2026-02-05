/**
 * Assessment Run Page
 * 
 * Hosts the questionnaire runner for a selected assessment and navigates
 * to results view upon completion (offline, local-only).
 */

import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ASSESSMENTS } from '../content/assessments';
import { scoreAssessment } from '../utils/assessmentScoring';
import { useAssessments } from '../hooks/useAssessments';
import { useMissionProgression } from '../hooks/useMissionProgression';
import AssessmentQuestionnaire from '../components/assessments/AssessmentQuestionnaire';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { AssessmentResult } from '../types/assessments';

export default function AssessmentRun() {
  const navigate = useNavigate();
  const { assessmentId } = useParams({ from: '/assessments/run/$assessmentId' });
  const { saveAssessmentResult } = useAssessments();
  const { progression, applyMissionResult } = useMissionProgression();
  const [isCompleting, setIsCompleting] = useState(false);

  const assessment = ASSESSMENTS.find(a => a.id === assessmentId);

  if (!assessment) {
    return (
      <div className="container max-w-2xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Assessment not found. Please return to the assessments page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleComplete = async (answers: Record<string, string>) => {
    if (isCompleting) return;
    setIsCompleting(true);

    try {
      // Score the assessment
      const outcome = scoreAssessment(assessment, answers);

      // Create result
      const result: AssessmentResult = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        assessmentType: assessment.id,
        outcome,
        completedAt: Date.now(),
        answers,
        rewardGranted: false,
      };

      // Save result
      saveAssessmentResult(result);

      // Grant XP and badge (once per run)
      const xpReward = 50;
      const badgeName = `${assessment.title} Badge`;
      
      // Apply reward via mission progression system
      applyMissionResult({
        missionId: `assessment-${assessment.id}`,
        passed: true,
        score: 100,
        maxScore: 100,
        xpEarned: xpReward,
        sideQuestsCompleted: [],
        completedAt: Date.now(),
        choices: {},
      });

      // Mark reward as granted
      result.rewardGranted = true;

      // Navigate to results
      navigate({ to: `/assessments/results/${result.id}` });
    } catch (error) {
      console.error('Failed to complete assessment:', error);
      setIsCompleting(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/assessments' });
  };

  return (
    <div className="container max-w-4xl py-8">
      <AssessmentQuestionnaire
        assessment={assessment}
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </div>
  );
}
