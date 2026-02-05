/**
 * Assessment Results Page
 * 
 * Renders computed outcome with briefing/scenario style cards and
 * navigation to history/trends (offline, local-only).
 */

import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Award, ChevronRight, TrendingUp } from 'lucide-react';
import { useAssessments } from '../hooks/useAssessments';
import { getOutcomeContent } from '../content/assessmentOutcomes';
import { ASSESSMENTS } from '../content/assessments';
import OutcomeBriefingCards from '../components/assessments/OutcomeBriefingCards';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const { resultId } = useParams({ from: '/assessments/results/$resultId' });
  const { assessments } = useAssessments();

  const result = assessments.find(a => a.id === resultId);
  const assessment = result ? ASSESSMENTS.find(a => a.id === result.assessmentType) : null;
  const outcomeContent = result ? getOutcomeContent(result.outcome.outcomeId) : null;

  if (!result || !assessment || !outcomeContent) {
    return (
      <div className="container max-w-2xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Result not found. Please return to the assessments page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate({ to: '/assessments' })} className="hover:underline">
            Assessments
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>{assessment.title}</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Complete</h1>
          <p className="text-muted-foreground mt-2">
            Review your results and actionable insights below
          </p>
        </div>
      </div>

      {/* Reward Notification */}
      {result.rewardGranted && (
        <Alert>
          <Award className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium">Reward Earned!</div>
            <div className="text-sm">+50 XP and {assessment.title} Badge unlocked</div>
          </AlertDescription>
        </Alert>
      )}

      {/* Outcome Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Result</CardTitle>
            <Badge variant="default" className="text-base px-4 py-1">
              {result.outcome.label}
            </Badge>
          </div>
        </CardHeader>
        {result.outcome.scores && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.outcome.scores).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold">{typeof value === 'number' ? Math.round(value) : value}</div>
                  <div className="text-sm text-muted-foreground">{key}</div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Outcome Content */}
      <OutcomeBriefingCards content={outcomeContent} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate({ to: '/assessments/history' })}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View History & Trends
        </Button>
        <Button
          className="flex-1"
          onClick={() => navigate({ to: '/assessments' })}
        >
          Back to Assessments
        </Button>
      </div>
    </div>
  );
}
