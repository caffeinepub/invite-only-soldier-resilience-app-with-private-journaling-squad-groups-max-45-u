import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useIZOFEntries } from '../hooks/useIzof';
import { useIZOFSettings } from '../hooks/useIzofSettings';
import { useLocalDailyInputs } from '../hooks/useLocalData';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import StressTrendChart from '../components/izof/StressTrendChart';
import StressOutcomeCorrelation from '../components/izof/StressOutcomeCorrelation';
import CoachViewPanel from '../components/izof/CoachViewPanel';
import CrossFactorInsightsCard from '../components/izof/CrossFactorInsightsCard';
import { estimateIZOFRange } from '../utils/izofLogic';
import { detectPatterns } from '../utils/izofAnalytics';

export default function IZOFStressReadinessDashboard() {
  const { entries } = useIZOFEntries();
  const { settings } = useIZOFSettings();
  const { inputs } = useLocalDailyInputs();
  const { logs } = useSleepPerformance();

  const izofRange = estimateIZOFRange(entries);
  const patterns = detectPatterns(entries);

  return (
    <div className="container max-w-5xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/mental-performance/izof">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stress Readiness Dashboard</h1>
          <p className="text-muted-foreground">Track your stress trends and performance correlation</p>
        </div>
      </div>

      {entries.length === 0 && (
        <Alert>
          <AlertDescription>
            No IZOF data yet. Complete your first Daily Zone Check to start tracking your stress patterns.
          </AlertDescription>
        </Alert>
      )}

      {entries.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Stress Trend Over Time</CardTitle>
              <CardDescription>Your stress ratings from Daily Zone Checks</CardDescription>
            </CardHeader>
            <CardContent>
              <StressTrendChart entries={entries} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Personal IZOF Range</CardTitle>
              <CardDescription>
                Estimated from your high-performance entries (outcome 4-5)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {izofRange ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {izofRange.low.toFixed(1)} - {izofRange.high.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This range represents your optimal stress zone based on {entries.filter(e => e.performanceOutcome && e.performanceOutcome >= 4).length} high-performance entries.
                    As you log more data, this range will become more accurate.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Not enough data yet. Complete at least 3 Daily Zone Checks with after-task reflections (performance outcome 4-5) to estimate your IZOF range.
                </p>
              )}
            </CardContent>
          </Card>

          <StressOutcomeCorrelation entries={entries} />

          {patterns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pattern Detection</CardTitle>
                <CardDescription>Non-diagnostic performance signals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {patterns.map((pattern, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{pattern.message}</AlertDescription>
                  </Alert>
                ))}
                <p className="text-xs text-muted-foreground pt-2">
                  These patterns are for performance awareness only and are not medical or diagnostic assessments.
                </p>
              </CardContent>
            </Card>
          )}

          <CrossFactorInsightsCard izofEntries={entries} dailyInputs={inputs} sleepLogs={logs} />

          {settings.coachViewEnabled && (
            <CoachViewPanel entries={entries} izofRange={izofRange} />
          )}
        </>
      )}
    </div>
  );
}
