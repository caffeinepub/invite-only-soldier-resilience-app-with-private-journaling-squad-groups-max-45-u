import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import type { LocalDailyInput } from '@/utils/localDataStore';
import { toReadinessValue, FACTOR_CONFIGS } from '@/utils/readinessSemantics';

interface CoachActionsCardProps {
  latestInput: LocalDailyInput | null;
}

export default function CoachActionsCard({ latestInput }: CoachActionsCardProps) {
  if (!latestInput) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Coaching Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Log your daily factors to receive personalized coaching actions.
          </p>
        </CardContent>
      </Card>
    );
  }

  const actions = generateCoachingActions(latestInput);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Coaching Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              <div className="flex-shrink-0 mt-0.5">
                {action.priority === 'high' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : action.priority === 'medium' ? (
                  <TrendingUp className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{action.title}</p>
                  <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {action.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface CoachingAction {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

function generateCoachingActions(input: LocalDailyInput): CoachingAction[] {
  const actions: CoachingAction[] = [];

  // Convert raw values to readiness values for threshold checks
  const sleepReadiness = toReadinessValue(input.sleepScore, FACTOR_CONFIGS.sleep.polarity);
  const trainingReadiness = toReadinessValue(input.trainingLoadScore, FACTOR_CONFIGS.training.polarity);
  const stressReadiness = toReadinessValue(input.stressScore, FACTOR_CONFIGS.stress.polarity);
  const painReadiness = toReadinessValue(input.painScore, FACTOR_CONFIGS.pain.polarity);

  // Sleep actions (higher raw = better)
  if (sleepReadiness < 40) {
    actions.push({
      title: 'Prioritize Sleep Recovery',
      description: 'Sleep quality is critically low. Aim for 7-9 hours tonight and optimize your sleep environment.',
      priority: 'high',
    });
  } else if (sleepReadiness < 60) {
    actions.push({
      title: 'Improve Sleep Quality',
      description: 'Consider adjusting your sleep schedule or environment to improve recovery.',
      priority: 'medium',
    });
  }

  // Training load actions (lower raw = better, so higher readiness means lower load)
  if (trainingReadiness < 40) {
    actions.push({
      title: 'Reduce Training Volume',
      description: 'Training load is very high. Consider active recovery or lighter sessions to prevent overtraining.',
      priority: 'high',
    });
  } else if (trainingReadiness < 60) {
    actions.push({
      title: 'Monitor Training Load',
      description: 'Training load is elevated. Ensure adequate recovery between sessions.',
      priority: 'medium',
    });
  }

  // Stress actions (lower raw = better)
  if (stressReadiness < 40) {
    actions.push({
      title: 'Implement Stress Management',
      description: 'Stress levels are high. Practice breathing exercises, take breaks, or seek support.',
      priority: 'high',
    });
  } else if (stressReadiness < 60) {
    actions.push({
      title: 'Maintain Stress Resilience',
      description: 'Stress is elevated. Continue resilience practices and monitor your workload.',
      priority: 'medium',
    });
  }

  // Pain actions (lower raw = better)
  if (painReadiness < 40) {
    actions.push({
      title: 'Address Pain/Injury',
      description: 'Significant pain detected. Seek medical attention and avoid aggravating activities.',
      priority: 'high',
    });
  } else if (painReadiness < 60) {
    actions.push({
      title: 'Monitor Pain Levels',
      description: 'Some discomfort present. Focus on mobility work and proper movement patterns.',
      priority: 'medium',
    });
  }

  // If all factors are good
  if (actions.length === 0) {
    actions.push({
      title: 'Maintain Current Practices',
      description: 'All factors are in good range. Keep up your current recovery and training practices.',
      priority: 'low',
    });
  }

  // Sort by priority and limit to top 5
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return actions
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 5);
}
