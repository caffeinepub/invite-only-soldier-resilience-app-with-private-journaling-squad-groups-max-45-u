/**
 * Operator Progress Panel
 * 
 * Displays current XP, rank/tier, and unlockables in a minimalist tactical style with improved formatting for assessment-earned badges.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Unlock } from 'lucide-react';
import { useMissionProgression } from '../../hooks/useMissionProgression';

export default function OperatorProgressPanel() {
  const { progression, rankInfo } = useMissionProgression();

  const xpProgress = rankInfo.nextRank
    ? ((progression.xp - rankInfo.xpRequired) / (rankInfo.nextRank.xpRequired - rankInfo.xpRequired)) * 100
    : 100;

  const formatUnlockable = (item: string): string => {
    if (item.startsWith('side-quest-')) {
      return item.replace('side-quest-', 'SQ-');
    }
    // Assessment badges are stored as full names
    return item;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-primary" />
          Operator Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rank</span>
            <Badge variant="default" className="text-sm">
              {rankInfo.name}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>XP: {progression.xp}</span>
            {rankInfo.nextRank && (
              <span>Next: {rankInfo.nextRank.xpRequired}</span>
            )}
          </div>
          {rankInfo.nextRank && (
            <Progress value={xpProgress} className="h-2" />
          )}
        </div>

        {progression.unlockables.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Unlock className="h-4 w-4 text-primary" />
              Unlocked ({progression.unlockables.length})
            </div>
            <div className="flex flex-wrap gap-1">
              {progression.unlockables.map((item, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  {formatUnlockable(item)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
