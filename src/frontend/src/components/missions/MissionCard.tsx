/**
 * Mission Card Component
 * 
 * Displays a mission as a game-like card with briefing, win conditions,
 * XP reward, and lock state with explicit unlock requirements including assessment-based unlocks.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Target, Zap, CheckCircle2 } from 'lucide-react';
import type { Mission } from '../../types/missions';
import { useMissionProgression } from '../../hooks/useMissionProgression';
import { useAssessments } from '../../hooks/useAssessments';

interface MissionCardProps {
  mission: Mission;
  onStart: (missionId: string) => void;
}

export default function MissionCard({ mission, onStart }: MissionCardProps) {
  const { evaluateUnlockRules, getMissionResult } = useMissionProgression();
  const { hasCompletedAssessment, hasOutcome } = useAssessments();
  
  // Evaluate unlock rules with assessment support
  let unlockStatus = evaluateUnlockRules(mission.unlockRules);
  
  // Override assessment unlock evaluation
  if (mission.unlockRules) {
    for (const rule of mission.unlockRules) {
      if (rule.type === 'assessment') {
        const parts = String(rule.value).split(':');
        const assessmentType = parts[0] as any;
        const outcomePattern = parts[1];
        
        if (outcomePattern) {
          // Check for specific outcome pattern
          if (!hasOutcome(assessmentType, outcomePattern)) {
            unlockStatus = { locked: true, reason: rule.description };
            break;
          }
        } else {
          // Just check if assessment is completed
          if (!hasCompletedAssessment(assessmentType)) {
            unlockStatus = { locked: true, reason: rule.description };
            break;
          }
        }
      }
    }
  }
  
  const result = getMissionResult(mission.id);

  return (
    <Card className={unlockStatus.locked ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{mission.title}</CardTitle>
              {result?.passed && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Complete
                </Badge>
              )}
              {unlockStatus.locked && (
                <Badge variant="outline" className="gap-1">
                  <Lock className="h-3 w-3" />
                  Locked
                </Badge>
              )}
            </div>
            <CardDescription>{mission.briefing}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {mission.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 text-sm">
            <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Win Conditions</div>
              <ul className="text-muted-foreground space-y-1 mt-1">
                {mission.winConditions.map((wc, idx) => (
                  <li key={idx}>• {wc.description}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Reward</div>
              <div className="text-muted-foreground mt-1">+{mission.xpReward} XP</div>
              {mission.sideQuests && mission.sideQuests.length > 0 && (
                <div className="text-muted-foreground text-xs mt-1">
                  +{mission.sideQuests.length} side quest{mission.sideQuests.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>

        {unlockStatus.locked ? (
          <div className="p-3 rounded-lg border bg-muted/30 text-sm">
            <div className="flex items-center gap-2 font-medium mb-1">
              <Lock className="h-4 w-4" />
              Unlock Requirements
            </div>
            <p className="text-muted-foreground">{unlockStatus.reason}</p>
          </div>
        ) : (
          <Button
            onClick={() => onStart(mission.id)}
            className="w-full"
            size="lg"
          >
            {result?.passed ? 'Replay Mission' : 'Start Mission'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
