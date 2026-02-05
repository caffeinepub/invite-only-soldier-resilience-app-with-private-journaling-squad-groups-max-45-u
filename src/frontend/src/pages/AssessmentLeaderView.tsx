/**
 * Assessment Leader View Page
 * 
 * Squad-leader oriented interpretation using locally stored results
 * (offline, no auth).
 */

import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronRight, Users, Target, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';
import { useAssessments } from '../hooks/useAssessments';
import { ASSESSMENTS } from '../content/assessments';
import { getLeaderGuidanceForOutcome } from '../content/leaderGuidance';

export default function AssessmentLeaderView() {
  const navigate = useNavigate();
  const { getLatestAssessment } = useAssessments();

  const completedAssessments = ASSESSMENTS.filter(a => getLatestAssessment(a.id));

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => navigate({ to: '/assessments' })} className="hover:underline">
          Assessments
        </button>
        <ChevronRight className="h-4 w-4" />
        <span>Leader View</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          Leader View
        </h1>
        <p className="text-muted-foreground mt-2">
          Team role recommendations and coaching guidance based on your assessment results
        </p>
      </div>

      <Alert>
        <AlertDescription>
          <div className="font-medium mb-1">For Squad Leaders</div>
          <div className="text-sm">
            This view provides practical guidance for understanding team members' strengths, communication preferences, and development needs. Use these insights to optimize team composition and coaching approaches.
          </div>
        </AlertDescription>
      </Alert>

      {completedAssessments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Complete assessments to see personalized leader guidance
            </p>
            <Button onClick={() => navigate({ to: '/assessments' })}>
              Start Assessments
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {completedAssessments.map((assessment) => {
            const result = getLatestAssessment(assessment.id);
            if (!result) return null;

            const guidance = getLeaderGuidanceForOutcome(assessment.id, result.outcome.outcomeId);

            return (
              <Card key={assessment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{assessment.title}</CardTitle>
                    <Badge variant="default">{result.outcome.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {guidance.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {guidance.map((g, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-sm">
                              <Target className="h-4 w-4 text-primary" />
                              {g.teamRole.title}
                            </div>
                            <p className="text-sm text-muted-foreground">{g.teamRole.content}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-sm">
                              <MessageSquare className="h-4 w-4 text-primary" />
                              {g.communication.title}
                            </div>
                            <p className="text-sm text-muted-foreground">{g.communication.content}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-sm">
                              <AlertTriangle className="h-4 w-4 text-primary" />
                              {g.frictionPoints.title}
                            </div>
                            <p className="text-sm text-muted-foreground">{g.frictionPoints.content}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-sm">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              {g.coaching.title}
                            </div>
                            <p className="text-sm text-muted-foreground">{g.coaching.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      General guidance: Use this soldier's {result.outcome.label} profile to inform team role assignments and communication approaches.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Button variant="outline" onClick={() => navigate({ to: '/assessments' })}>
        Back to Assessments
      </Button>
    </div>
  );
}
