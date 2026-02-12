import { useNavigate } from '@tanstack/react-router';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Moon, TrendingUp, Activity, Award } from 'lucide-react';
import { sleepPerformanceCopy } from '../content/sleepPerformanceCopy';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatSleepWindow } from '../utils/sleepPerformance';
import { useFieldMode } from '../hooks/useFieldMode';
import LeaderSleepDoctrineModule from '../components/sleepPerformance/LeaderSleepDoctrineModule';

export default function SleepPerformanceDashboard() {
  const navigate = useNavigate();
  const { logs, state, setMode, getMetrics } = useSleepPerformance();
  const { isFieldMode } = useFieldMode();
  const metrics = getMetrics();

  const getReadinessColor = (value: number): string => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (value: number): string => {
    if (value <= 20) return 'text-green-600';
    if (value <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Moon className="h-8 w-8" />
          Sleep Performance
        </h1>
        <p className="text-muted-foreground mt-1">
          Track sleep, manage debt, and optimize cognitive readiness
        </p>
      </div>

      {/* Core Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.lastSleepWindow ? (
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {Math.floor(metrics.lastSleepWindow.duration / (60 * 60 * 1000))}h{' '}
                  {Math.floor((metrics.lastSleepWindow.duration % (60 * 60 * 1000)) / (60 * 1000))}m
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSleepWindow(metrics.lastSleepWindow)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No logs yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sleep Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getRiskColor(metrics.sleepDebt * 10)}`}>
              {metrics.sleepDebt}h
            </p>
            <p className="text-xs text-muted-foreground">Rolling 7-day deficit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cognitive Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getReadinessColor(metrics.cognitiveReadiness)}`}>
              {metrics.cognitiveReadiness}%
            </p>
            <Progress value={metrics.cognitiveReadiness} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Injury Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getRiskColor(metrics.injuryRisk)}`}>
              {metrics.injuryRisk}%
            </p>
            <Progress value={metrics.injuryRisk} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Mode Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Performance Mode</CardTitle>
          <CardDescription>Adjust guidance based on your current operational tempo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={state.mode} onValueChange={(value: any) => setMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="tactical">Tactical</SelectItem>
              <SelectItem value="recovery">Recovery</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            {(sleepPerformanceCopy.modes[state.mode] || sleepPerformanceCopy.modes.standard).description}
          </div>
        </CardContent>
      </Card>

      {/* Streak & Gamification */}
      {!isFieldMode && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Progress & Unlocks
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Consecutive Good Nights</p>
              <p className="text-2xl font-bold">{state.consecutiveGoodNights} days</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unlocked Naps</p>
              <div className="mt-1">
                {state.unlockedNapDurations.length > 0 ? (
                  state.unlockedNapDurations.map(duration => (
                    <Badge key={duration} variant="secondary" className="mr-1">
                      {duration}min
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">None yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ATP 6-22.5 Leader Sleep Doctrine Module */}
      {!isFieldMode && (
        <div className="mb-6">
          <LeaderSleepDoctrineModule />
        </div>
      )}

      {/* Education Tiles */}
      {!isFieldMode && (
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {sleepPerformanceCopy.educationTiles.map((tile, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{tile.headline}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tile.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button
          onClick={() => navigate({ to: '/sleep/check-in' })}
          size="lg"
          className="h-auto py-4 flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-1">
            <Moon className="h-5 w-5" />
            <span className="font-semibold">Check In</span>
          </div>
          <span className="text-xs opacity-90">Log sleep window & quality</span>
        </Button>

        <Button
          onClick={() => navigate({ to: '/sleep/analysis' })}
          variant="outline"
          size="lg"
          className="h-auto py-4 flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Analysis</span>
          </div>
          <span className="text-xs opacity-90">View debt & performance impact</span>
        </Button>

        <Button
          onClick={() => navigate({ to: '/sleep/action' })}
          variant="outline"
          size="lg"
          className="h-auto py-4 flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-5 w-5" />
            <span className="font-semibold">Action</span>
          </div>
          <span className="text-xs opacity-90">Naps, caffeine, downshift</span>
        </Button>
      </div>
    </div>
  );
}
