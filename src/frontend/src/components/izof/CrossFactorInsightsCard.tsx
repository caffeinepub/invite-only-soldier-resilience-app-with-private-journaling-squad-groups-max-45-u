import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import type { DailyZoneCheckEntry } from '../../types/izof';
import type { LocalDailyInput, SleepLog } from '../../utils/localDataStore';
import { generateCrossFactorInsights } from '../../utils/izofIntegration';

interface CrossFactorInsightsCardProps {
  izofEntries: DailyZoneCheckEntry[];
  dailyInputs: LocalDailyInput[];
  sleepLogs: SleepLog[];
}

export default function CrossFactorInsightsCard({ izofEntries, dailyInputs, sleepLogs }: CrossFactorInsightsCardProps) {
  const { insights, missingData } = generateCrossFactorInsights(izofEntries, dailyInputs, sleepLogs);

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Factor Insights</CardTitle>
        <CardDescription>
          Stress, training load, and sleep combined for performance signals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {missingData.length > 0 && (
          <div className="space-y-2">
            {missingData.map((prompt, index) => (
              <Alert key={index}>
                <Info className="h-4 w-4" />
                <AlertDescription>{prompt.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {insights.length > 0 && (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <Alert key={index} variant={insight.severity === 'critical' ? 'destructive' : 'default'}>
                {getIcon(insight.severity)}
                <AlertDescription>{insight.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground pt-2">
          These insights are performance signals, not medical diagnoses. Recovery is a performance multiplier.
        </p>
      </CardContent>
    </Card>
  );
}
