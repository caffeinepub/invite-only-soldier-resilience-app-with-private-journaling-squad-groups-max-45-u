import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, TrendingUp } from 'lucide-react';
import type { LocalDailyInput } from '@/utils/localDataStore';

interface GamificationCardProps {
  streak: number;
  latestInput: LocalDailyInput | null;
}

interface BadgeItem {
  label: string;
  icon: string;
}

export default function GamificationCard({ streak, latestInput }: GamificationCardProps) {
  const overallScore = latestInput ? latestInput.overallScore : 0;

  const getTier = (score: number): { label: string; color: string; icon: React.ReactNode } => {
    if (score >= 80) {
      return {
        label: 'Elite Operator',
        color: 'text-green-600 dark:text-green-400',
        icon: <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />,
      };
    }
    if (score >= 60) {
      return {
        label: 'Mission Ready',
        color: 'text-blue-600 dark:text-blue-400',
        icon: <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      };
    }
    if (score >= 40) {
      return {
        label: 'Building Capacity',
        color: 'text-yellow-600 dark:text-yellow-400',
        icon: <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      };
    }
    return {
      label: 'Recovery Mode',
      color: 'text-red-600 dark:text-red-400',
      icon: <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />,
    };
  };

  const tier = getTier(overallScore);

  const badges: BadgeItem[] = [];
  if (streak >= 7) badges.push({ label: '7-Day Streak', icon: '🔥' });
  if (streak >= 21) badges.push({ label: '21-Day Streak', icon: '⚡' });
  if (overallScore >= 80) badges.push({ label: 'Elite Performance', icon: '🏆' });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Tier */}
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          {tier.icon}
          <div className="flex-1">
            <p className="text-sm font-medium">Current Tier</p>
            <p className={`text-lg font-bold ${tier.color}`}>{tier.label}</p>
          </div>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <Flame className="h-5 w-5 text-orange-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">Current Streak</p>
              <p className="text-lg font-bold">{streak} days</p>
            </div>
          </div>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Earned Badges</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge.icon} {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {badges.length === 0 && streak === 0 && (
          <p className="text-sm text-muted-foreground">
            Keep logging daily to earn badges and build your streak!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
