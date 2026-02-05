import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import type { DailyInput } from '../../backend';

interface CoachActionsCardProps {
  latestInput: DailyInput | null;
  streak: number;
}

export default function CoachActionsCard({ latestInput, streak }: CoachActionsCardProps) {
  const sleepScore = latestInput ? Number(latestInput.sleepScore) : 0;
  const trainingScore = latestInput ? Number(latestInput.trainingLoadScore) : 0;
  const stressScore = latestInput ? Number(latestInput.stressScore) : 0;
  const painScore = latestInput ? Number(latestInput.painScore) : 0;

  const actions = generateActions(sleepScore, trainingScore, stressScore, painScore, streak);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Today's Focus
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Log your daily factors to receive personalized guidance.</p>
          ) : (
            actions.map((action, idx) => (
              <ActionItem key={idx} action={action} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface Action {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

function generateActions(
  sleep: number,
  training: number,
  stress: number,
  pain: number,
  streak: number
): Action[] {
  const actions: Action[] = [];

  // Sleep-based actions
  if (sleep < 40) {
    actions.push({
      priority: 'high',
      text: 'Prioritize 8+ hours sleep tonight. Recovery is mission-critical.',
    });
  } else if (sleep < 60) {
    actions.push({
      priority: 'medium',
      text: 'Optimize sleep hygiene: dark room, cool temp, consistent schedule.',
    });
  }

  // Training load actions
  if (training < 40) {
    actions.push({
      priority: 'high',
      text: 'Reduce training intensity. Focus on active recovery and mobility.',
    });
  } else if (training < 60) {
    actions.push({
      priority: 'medium',
      text: 'Monitor acute load. Consider deload or recovery session.',
    });
  }

  // Stress actions
  if (stress < 40) {
    actions.push({
      priority: 'high',
      text: 'Implement stress mitigation: breathing drills, tactical pause.',
    });
  } else if (stress < 60) {
    actions.push({
      priority: 'medium',
      text: 'Maintain resilience practices: mindfulness, social connection.',
    });
  }

  // Pain/injury actions
  if (pain < 40) {
    actions.push({
      priority: 'high',
      text: 'Address pain immediately. Consult medical if persistent.',
    });
  } else if (pain < 60) {
    actions.push({
      priority: 'medium',
      text: 'Prehab focus: targeted mobility and strength work.',
    });
  }

  // Streak-based encouragement
  if (streak >= 7 && actions.length < 3) {
    actions.push({
      priority: 'low',
      text: `${streak}-day streak! Consistency builds resilience.`,
    });
  }

  // Limit to top 5 actions
  return actions.slice(0, 5);
}

function ActionItem({ action }: { action: Action }) {
  const Icon = action.priority === 'high' ? AlertCircle : CheckCircle2;
  const colorClass =
    action.priority === 'high'
      ? 'text-red-600 dark:text-red-400'
      : action.priority === 'medium'
      ? 'text-yellow-600 dark:text-yellow-400'
      : 'text-green-600 dark:text-green-400';

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
      <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${colorClass}`} />
      <div className="flex-1">
        <p className="text-sm leading-relaxed">{action.text}</p>
      </div>
      <Badge variant="outline" className="text-xs">
        {action.priority}
      </Badge>
    </div>
  );
}
