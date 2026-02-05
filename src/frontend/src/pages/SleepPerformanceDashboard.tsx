import { useNavigate } from '@tanstack/react-router';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import { useFieldMode } from '../hooks/useFieldMode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Moon, TrendingUp, AlertTriangle, Brain, Target, Copy, Check } from 'lucide-react';
import { sleepPerformanceCopy } from '../content/sleepPerformanceCopy';
import { formatSleepWindow } from '../utils/sleepPerformance';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function SleepPerformanceDashboard() {
  const navigate = useNavigate();
  const { logs, state, setMode, getMetrics } = useSleepPerformance();
  const { isFieldMode } = useFieldMode();
  const metrics = getMetrics();
  const [copiedTile, setCopiedTile] = useState<number | null>(null);

  const handleCopyTile = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTile(index);
    setTimeout(() => setCopiedTile(null), 2000);
  };

  const getReadinessColor = (value: number): string => {
    if (value >= 80) return 'text-green-600 dark:text-green-400';
    if (value >= 60) return 'text-blue-600 dark:text-blue-400';
    if (value >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getInjuryRiskColor = (value: number): string => {
    if (value <= 20) return 'text-green-600 dark:text-green-400';
    if (value <= 40) return 'text-yellow-600 dark:text-yellow-400';
    if (value <= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Moon className="h-8 w-8" />
            {sleepPerformanceCopy.dashboardTitle}
          </h1>
          <p className="text-muted-foreground mt-1">{sleepPerformanceCopy.dashboardSubtitle}</p>
        </div>
        <Button onClick={() => navigate({ to: '/sleep/check-in' })} size="lg">
          Log Sleep
        </Button>
      </div>

      {/* Mode Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Tactical Sleep Mode</CardTitle>
          <CardDescription>{sleepPerformanceCopy.modeContext}</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={state.mode} onValueChange={(value) => setMode(value as typeof state.mode)}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="field">Field Mode</SelectItem>
              <SelectItem value="garrison">Garrison Mode</SelectItem>
              <SelectItem value="shift">Shift / CQ / Staff Duty</SelectItem>
              <SelectItem value="high-stress">High-Stress / Post-Event</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-3 text-sm text-muted-foreground">
            <p className="font-medium">{sleepPerformanceCopy.modes[state.mode].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Core Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Last Sleep Window</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.lastSleepWindow ? (
              <div className="text-sm">
                <p className="font-mono">{formatSleepWindow(metrics.lastSleepWindow)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No sleep logged yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sleep Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sleepDebt.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground mt-1">{sleepPerformanceCopy.debtExplainer}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cognitive Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getReadinessColor(metrics.cognitiveReadiness)}`}>
              {metrics.cognitiveReadiness}%
            </div>
            <Progress value={metrics.cognitiveReadiness} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{sleepPerformanceCopy.cognitiveImpact}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Injury Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getInjuryRiskColor(metrics.injuryRisk)}`}>
              {metrics.injuryRisk}%
            </div>
            <Progress value={metrics.injuryRisk} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{sleepPerformanceCopy.injuryWarning}</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Impact Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Performance Impact Analysis
          </CardTitle>
          <CardDescription>{sleepPerformanceCopy.estimateDisclaimer}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Emotional Regulation</span>
              <span className={getReadinessColor(metrics.emotionalRegulation)}>{metrics.emotionalRegulation}%</span>
            </div>
            <Progress value={metrics.emotionalRegulation} />
            <p className="text-xs text-muted-foreground mt-1">{sleepPerformanceCopy.emotionalNote}</p>
          </div>
        </CardContent>
      </Card>

      {/* Streak & Gamification */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Consistency & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Logging Streak</p>
              <p className="text-2xl font-bold">{state.streakCount} days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Logs</p>
              <p className="text-2xl font-bold">{state.totalLogs}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unlocked Tools</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {state.unlockedTools.length > 0 ? (
                  state.unlockedTools.map(tool => (
                    <Badge key={tool} variant="secondary">{tool}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Log 7 days to unlock</p>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{sleepPerformanceCopy.streakMotivation}</p>
        </CardContent>
      </Card>

      {/* Education Tiles */}
      {!isFieldMode && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5" />
            Command-Safe Education
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {sleepPerformanceCopy.educationTiles.map((tile, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    {tile.headline}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCopyTile(index, `${tile.headline}\n\n${tile.body}`)}
                    >
                      {copiedTile === index ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tile.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Button onClick={() => navigate({ to: '/sleep/check-in' })} variant="default">
          Daily Check-In
        </Button>
        <Button onClick={() => navigate({ to: '/sleep/analysis' })} variant="outline">
          View Analysis
        </Button>
        <Button onClick={() => navigate({ to: '/sleep/action' })} variant="outline">
          Get Recommendations
        </Button>
      </div>
    </div>
  );
}
