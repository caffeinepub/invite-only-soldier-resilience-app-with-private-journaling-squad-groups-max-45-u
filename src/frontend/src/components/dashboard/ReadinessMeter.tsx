import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
import type { LocalDailyInput } from '@/utils/localDataStore';
import { getFactorColorClass, FACTOR_CONFIGS } from '@/utils/readinessSemantics';

interface ReadinessMeterProps {
  latestInput: LocalDailyInput | null;
  streak: number;
}

export default function ReadinessMeter({ latestInput, streak }: ReadinessMeterProps) {
  const overallScore = latestInput ? latestInput.overallScore : 0;
  const sleepScore = latestInput ? latestInput.sleepScore : 0;
  const trainingScore = latestInput ? latestInput.trainingLoadScore : 0;
  const stressScore = latestInput ? latestInput.stressScore : 0;
  const painScore = latestInput ? latestInput.painScore : 0;

  const getTier = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: 'Optimized', color: 'text-green-600 dark:text-green-400' };
    if (score >= 60) return { label: 'Ready', color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { label: 'Degraded', color: 'text-red-600 dark:text-red-400' };
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
          <FactorRow label="Sleep" score={sleepScore} factorKey="sleep" />
          <FactorRow label="Training Load" score={trainingScore} factorKey="training" />
          <FactorRow label="Stress" score={stressScore} factorKey="stress" />
          <FactorRow label="Pain/Injury" score={painScore} factorKey="pain" />
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

function FactorRow({ label, score, factorKey }: { label: string; score: number; factorKey: string }) {
  const config = FACTOR_CONFIGS[factorKey];
  const colorClass = getFactorColorClass(score, config.polarity);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-28">{label}</span>
      <div className="flex-1">
        <Progress value={score} className="h-2" />
      </div>
      <span className={`text-sm font-semibold w-10 text-right ${colorClass}`}>{score}</span>
    </div>
  );
}
