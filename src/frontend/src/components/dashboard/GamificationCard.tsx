import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, Award, Target } from 'lucide-react';
import type { DailyInput } from '../../backend';

interface GamificationCardProps {
  streak: number;
  latestInput: DailyInput | null;
}

export default function GamificationCard({ streak, latestInput }: GamificationCardProps) {
  const overallScore = latestInput ? Number(latestInput.overallScore) : 0;

  const getTier = (score: number): string => {
    if (score >= 80) return 'Optimized';
    if (score >= 60) return 'Ready';
    if (score >= 40) return 'Moderate';
    return 'Degraded';
  };

  const tier = getTier(overallScore);

  const badges = generateBadges(streak, overallScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Progress & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Tier */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Tier</span>
            <Badge variant="outline" className="font-semibold">
              {tier}
            </Badge>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Current Streak</p>
              <p className="text-xs text-muted-foreground">Consecutive high-readiness days</p>
            </div>
          </div>
          <span className="text-2xl font-bold">{streak}</span>
        </div>

        {/* Badges */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Earned Badges
          </h4>
          <div className="space-y-2">
            {badges.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keep logging to earn badges</p>
            ) : (
              badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-md bg-muted/30"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface BadgeData {
  icon: string;
  name: string;
  description: string;
}

function generateBadges(streak: number, overallScore: number): BadgeData[] {
  const badges: BadgeData[] = [];

  if (streak >= 3) {
    badges.push({
      icon: '🔥',
      name: 'Consistency',
      description: '3+ day streak',
    });
  }

  if (streak >= 7) {
    badges.push({
      icon: '⚡',
      name: 'Week Warrior',
      description: '7+ day streak',
    });
  }

  if (streak >= 21) {
    badges.push({
      icon: '💎',
      name: 'Elite Performer',
      description: '21+ day streak',
    });
  }

  if (overallScore >= 80) {
    badges.push({
      icon: '🎯',
      name: 'Optimized',
      description: 'Peak readiness achieved',
    });
  }

  return badges;
}
