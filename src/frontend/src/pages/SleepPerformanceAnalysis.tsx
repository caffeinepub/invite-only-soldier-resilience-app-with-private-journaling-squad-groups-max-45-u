import { useNavigate } from '@tanstack/react-router';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, TrendingDown, AlertTriangle } from 'lucide-react';
import { mapDebtToPerformance } from '../utils/sleepPerformance';
import { sleepPerformanceCopy } from '../content/sleepPerformanceCopy';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SleepPerformanceAnalysis() {
  const navigate = useNavigate();
  const { logs, getMetrics } = useSleepPerformance();
  const metrics = getMetrics();
  const performanceImpact = mapDebtToPerformance(metrics.sleepDebt, logs);

  const getImpactColor = (value: number): string => {
    if (value <= 20) return 'text-green-600 dark:text-green-400';
    if (value <= 40) return 'text-yellow-600 dark:text-yellow-400';
    if (value <= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate({ to: '/sleep' })} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <TrendingDown className="h-8 w-8" />
          Performance Analysis
        </h1>
        <p className="text-muted-foreground mt-1">Sleep debt impact on operational readiness</p>
      </div>

      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Estimate Disclaimer</AlertTitle>
        <AlertDescription>{sleepPerformanceCopy.estimateDisclaimer}</AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rolling Sleep Debt</CardTitle>
          <CardDescription>Cumulative deficit over last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">{metrics.sleepDebt.toFixed(1)} hours</div>
          <p className="text-sm text-muted-foreground">{sleepPerformanceCopy.debtExplainer}</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Mapped Performance Degradation</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reaction Time Degradation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Impact Level</span>
              <span className={`text-2xl font-bold ${getImpactColor(performanceImpact.reactionTime)}`}>
                +{performanceImpact.reactionTime}%
              </span>
            </div>
            <Progress value={performanceImpact.reactionTime} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Reaction time slows proportionally to sleep debt. Decision-making speed and situational awareness degrade.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">PT Injury Risk Elevation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Risk Increase</span>
              <span className={`text-2xl font-bold ${getImpactColor(performanceImpact.injuryRisk)}`}>
                +{performanceImpact.injuryRisk}%
              </span>
            </div>
            <Progress value={performanceImpact.injuryRisk} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {sleepPerformanceCopy.injuryWarning} Neuromuscular coordination and tissue repair are compromised.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emotional Volatility Elevation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Impact Level</span>
              <span className={`text-2xl font-bold ${getImpactColor(performanceImpact.emotionalVolatility)}`}>
                +{performanceImpact.emotionalVolatility}%
              </span>
            </div>
            <Progress value={performanceImpact.emotionalVolatility} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {sleepPerformanceCopy.emotionalNote} Stress response amplifies; team dynamics may suffer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Judgment Error Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Risk Increase</span>
              <span className={`text-2xl font-bold ${getImpactColor(performanceImpact.judgmentErrors)}`}>
                +{performanceImpact.judgmentErrors}%
              </span>
            </div>
            <Progress value={performanceImpact.judgmentErrors} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Tactical decision-making and problem-solving capacity decline. Risk assessment becomes less reliable.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={() => navigate({ to: '/sleep/action' })} className="flex-1">
          Get Recommendations
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: '/sleep' })}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
