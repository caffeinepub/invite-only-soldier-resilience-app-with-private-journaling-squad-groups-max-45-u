import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import type { DailyInput } from '../../backend';

interface ReadinessMeterProps {
  latestInput: DailyInput | null;
  streak: number;
}

export default function ReadinessMeter({ latestInput, streak }: ReadinessMeterProps) {
  const overallScore = latestInput ? Number(latestInput.overallScore) : 0;
  const sleepScore = latestInput ? Number(latestInput.sleepScore) : 0;
  const trainingScore = latestInput ? Number(latestInput.trainingLoadScore) : 0;
  const stressScore = latestInput ? Number(latestInput.stressScore) : 0;
  const painScore = latestInput ? Number(latestInput.painScore) : 0;

  const getTier = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: 'Optimized', color: 'text-green-600 dark:text-green-400' };
    if (score >= 60) return { label: 'Ready', color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { label: 'Degraded', color: 'text-red-600 dark:text-red-400' };
  };

  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const tier = getTier(overallScore);

  if (!latestInput) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No data logged yet. Start by logging your daily factors.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-5xl font-bold ${tier.color}`}>{overallScore}</span>
          <div className="text-left">
            <Badge variant="outline" className={tier.color}>
              {tier.label}
            </Badge>
            {streak > 0 && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>{streak} day streak</span>
              </div>
            )}
          </div>
        </div>
        <Progress value={overallScore} className="h-3" />
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">Factor Breakdown</h4>
        
        <div className="space-y-2">
          <FactorRow label="Sleep" score={sleepScore} />
          <FactorRow label="Training Load" score={trainingScore} />
          <FactorRow label="Stress" score={stressScore} />
          <FactorRow label="Pain/Injury" score={painScore} />
        </div>
      </div>

      {/* Explanation */}
      {latestInput.explanations && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">Analysis</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {latestInput.explanations}
          </p>
        </div>
      )}
    </div>
  );
}

function FactorRow({ label, score }: { label: string; score: number }) {
  const getColor = (s: number): string => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-blue-500';
    if (s >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-28">{label}</span>
      <div className="flex-1">
        <Progress value={score} className="h-2" />
      </div>
      <span className="text-sm font-semibold w-10 text-right">{score}</span>
    </div>
  );
}
