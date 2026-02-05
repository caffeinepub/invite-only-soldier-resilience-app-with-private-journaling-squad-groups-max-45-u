/**
 * Assessment History Page
 * 
 * Lists previous runs per assessment with date/time and outcome label/score
 * pulled from local storage.
 */

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Clock, TrendingUp } from 'lucide-react';
import { useAssessments } from '../hooks/useAssessments';
import { ASSESSMENTS } from '../content/assessments';
import type { AssessmentType } from '../types/assessments';

export default function AssessmentHistory() {
  const navigate = useNavigate();
  const { getAssessmentHistory, getAssessmentTrend } = useAssessments();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType>(ASSESSMENTS[0].id);

  const history = getAssessmentHistory(selectedAssessment);
  const trend = getAssessmentTrend(selectedAssessment);
  const assessment = ASSESSMENTS.find(a => a.id === selectedAssessment);

  const handleTabChange = (value: string) => {
    setSelectedAssessment(value as AssessmentType);
  };

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => navigate({ to: '/assessments' })} className="hover:underline">
          Assessments
        </button>
        <ChevronRight className="h-4 w-4" />
        <span>History & Trends</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">History & Trends</h1>
        <p className="text-muted-foreground mt-2">
          Track your assessment results over time
        </p>
      </div>

      <Tabs value={selectedAssessment} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1">
          {ASSESSMENTS.map((a) => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs px-2">
              {a.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {ASSESSMENTS.map((a) => (
          <TabsContent key={a.id} value={a.id} className="space-y-6 mt-6">
            {/* Trend Summary */}
            {trend.hasMultiple && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Trend Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">First Result</div>
                      <div className="font-medium">{trend.firstOutcome}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Latest Result</div>
                      <div className="font-medium">{trend.latestOutcome}</div>
                    </div>
                  </div>

                  {trend.scoreDelta && Object.keys(trend.scoreDelta).length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Score Changes</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(trend.scoreDelta).map(([key, delta]) => (
                          <div key={key} className="text-center p-2 rounded-lg bg-muted/50">
                            <div className={`text-lg font-bold ${delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : ''}`}>
                              {delta > 0 ? '+' : ''}{Math.round(delta)}
                            </div>
                            <div className="text-xs text-muted-foreground">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* History List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Assessment History</h3>
              
              {history.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No assessment history yet. Complete your first assessment to see results here.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {history.map((result) => (
                    <Card key={result.id} className="hover:border-primary transition-colors cursor-pointer" onClick={() => navigate({ to: `/assessments/results/${result.id}` })}>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Badge variant="default">{result.outcome.label}</Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(result.completedAt).toLocaleDateString()} at {new Date(result.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            {result.outcome.scores && (
                              <div className="flex gap-4 mt-2 text-sm">
                                {Object.entries(result.outcome.scores).slice(0, 4).map(([key, value]) => (
                                  <span key={key} className="text-muted-foreground">
                                    {key}: <span className="font-medium">{typeof value === 'number' ? Math.round(value) : value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Button variant="outline" onClick={() => navigate({ to: '/assessments' })}>
        Back to Assessments
      </Button>
    </div>
  );
}
