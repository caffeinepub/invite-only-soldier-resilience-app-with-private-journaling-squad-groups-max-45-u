import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { DailyZoneCheckEntry } from '../../types/izof';
import { computeCorrelation } from '../../utils/izofAnalytics';

interface StressOutcomeCorrelationProps {
  entries: DailyZoneCheckEntry[];
}

export default function StressOutcomeCorrelation({ entries }: StressOutcomeCorrelationProps) {
  const correlation = computeCorrelation(entries);

  if (!correlation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stress-Performance Correlation</CardTitle>
          <CardDescription>Not enough data yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Complete at least 3 Daily Zone Checks with after-task reflections to see correlation data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stress-Performance Correlation</CardTitle>
        <CardDescription>How your stress level relates to performance outcomes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg Stress at High Performance (4-5)</p>
            <p className="text-2xl font-bold">{correlation.averageStressAtHighPerformance}</p>
            <p className="text-xs text-muted-foreground">Based on {correlation.highPerformanceCount} entries</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg Stress at Low Performance (1-2)</p>
            <p className="text-2xl font-bold">{correlation.averageStressAtLowPerformance}</p>
            <p className="text-xs text-muted-foreground">Based on {correlation.lowPerformanceCount} entries</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Total entries with performance outcomes: {correlation.totalEntries}
        </p>
      </CardContent>
    </Card>
  );
}
