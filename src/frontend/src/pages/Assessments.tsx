/**
 * Assessments Module Entry Page
 * 
 * Offline-first UI linking to assessment flows, results/history, trends,
 * and leader view. No backend calls, no authentication gating.
 */

import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { ASSESSMENTS } from '../content/assessments';
import { useAssessments } from '../hooks/useAssessments';

export default function Assessments() {
  const navigate = useNavigate();
  const { getLatestAssessment } = useAssessments();

  return (
    <div className="container max-w-6xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          Self-Awareness & Resilience
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete assessments to understand your strengths, unlock missions, and build operational effectiveness
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate({ to: '/assessments/history' })}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              History & Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Track your progress over time</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate({ to: '/assessments/leader-view' })}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leader View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Team role and coaching guidance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {ASSESSMENTS.filter(a => getLatestAssessment(a.id)).length}/{ASSESSMENTS.length}
            </p>
            <p className="text-sm text-muted-foreground">Assessments completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Assessments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ASSESSMENTS.map((assessment) => {
            const latest = getLatestAssessment(assessment.id);
            
            return (
              <Card key={assessment.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription className="mt-2">{assessment.shortDescription}</CardDescription>
                    </div>
                    {latest && (
                      <Badge variant="default">Completed</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {assessment.estimatedMinutes} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      {assessment.questions.length} questions
                    </div>
                  </div>

                  {latest && (
                    <div className="p-3 rounded-lg bg-muted/50 text-sm">
                      <div className="font-medium">Latest Result:</div>
                      <div className="text-muted-foreground">{latest.outcome.label}</div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={() => navigate({ to: `/assessments/run/${assessment.id}` })}
                  >
                    {latest ? 'Retake Assessment' : 'Start Assessment'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
