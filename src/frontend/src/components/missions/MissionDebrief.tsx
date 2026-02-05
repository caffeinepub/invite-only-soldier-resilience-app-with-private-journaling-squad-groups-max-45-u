/**
 * Mission Debrief Component
 * 
 * Shows pass/fail against win conditions, performance metrics,
 * earned XP, side quest outcomes, and clear actions.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, Trophy, Target, Clock, Award, PenLine } from 'lucide-react';
import type { Mission, MissionResult } from '../../types/missions';

interface MissionDebriefProps {
  mission: Mission;
  result: MissionResult;
  onRetry: () => void;
  onExit: () => void;
  onReflect?: () => void;
}

export default function MissionDebrief({ mission, result, onRetry, onExit, onReflect }: MissionDebriefProps) {
  const scorePercentage = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 100;

  return (
    <div className="space-y-6">
      <Card className={result.passed ? 'border-green-500' : 'border-destructive'}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {result.passed ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <CardTitle className="text-2xl">
                {result.passed ? 'Mission Complete' : 'Mission Failed'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{mission.title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-3xl font-bold">{scorePercentage}%</div>
              <div className="text-sm text-muted-foreground mt-1">Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-3xl font-bold text-primary">+{result.xpEarned}</div>
              <div className="text-sm text-muted-foreground mt-1">XP Earned</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-3xl font-bold">{result.sideQuestsCompleted.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Side Quests</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <Target className="h-5 w-5 text-primary" />
              Win Conditions
            </div>
            {mission.winConditions.map((wc, idx) => {
              const met = wc.threshold ? scorePercentage >= wc.threshold : result.passed;
              return (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  {met ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  )}
                  <span className={met ? 'text-foreground' : 'text-muted-foreground'}>
                    {wc.description}
                  </span>
                </div>
              );
            })}
          </div>

          {result.timedStepPerformance && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="h-5 w-5 text-primary" />
                  Timed Decision Performance
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Time Used:</span>{' '}
                    <span className="font-medium">{result.timedStepPerformance.timeUsed.toFixed(1)}s</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time Limit:</span>{' '}
                    <span className="font-medium">{result.timedStepPerformance.timeLimit}s</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Response:</span>{' '}
                    <Badge variant={result.timedStepPerformance.responseCorrect ? 'default' : 'destructive'}>
                      {result.timedStepPerformance.responseCorrect ? 'Correct' : 'Incorrect'}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}

          {result.sideQuestsCompleted.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Award className="h-5 w-5 text-primary" />
                  Side Quests Completed
                </div>
                <div className="space-y-2">
                  {mission.sideQuests
                    ?.filter(sq => result.sideQuestsCompleted.includes(sq.id))
                    .map((sq) => (
                      <div key={sq.id} className="flex items-start gap-2 text-sm p-2 rounded-lg bg-muted/30">
                        <Trophy className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium">{sq.description}</div>
                          <div className="text-muted-foreground text-xs mt-1">
                            +{sq.reward.xp} XP
                            {sq.reward.unlockable && ` • Unlocked: ${sq.reward.unlockable}`}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onRetry} variant="outline" className="flex-1">
              Retry Mission
            </Button>
            {onReflect && mission.reflectionPrompt && (
              <Button onClick={onReflect} variant="outline" className="flex-1">
                <PenLine className="h-4 w-4 mr-2" />
                Reflect
              </Button>
            )}
            <Button onClick={onExit} className="flex-1">
              Back to Missions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
