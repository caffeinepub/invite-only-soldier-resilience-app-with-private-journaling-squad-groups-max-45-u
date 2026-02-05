/**
 * Mission Runner Component
 * 
 * Executes the mission step loop with briefings, decisions, scenarios,
 * and timed challenges. Produces a mission result for the debrief.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import type { Mission, MissionStep, MissionResult, MissionChoice } from '../../types/missions';

interface MissionRunnerProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
}

export default function MissionRunner({ mission, onComplete }: MissionRunnerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timedStepData, setTimedStepData] = useState<{
    timeUsed: number;
    timeLimit: number;
    responseCorrect: boolean;
  } | undefined>(undefined);
  const [sideQuestsCompleted, setSideQuestsCompleted] = useState<string[]>([]);

  const currentStep = mission.steps[currentStepIndex];
  const isLastStep = currentStepIndex === mission.steps.length - 1;
  const progress = ((currentStepIndex + 1) / mission.steps.length) * 100;

  const handleChoice = (choice: MissionChoice) => {
    const stepKey = `step-${currentStepIndex}`;
    setChoices(prev => ({ ...prev, [stepKey]: choice.id }));

    // Score the choice
    if (choice.points !== undefined) {
      setScore(prev => prev + (choice.points || 0));
      setMaxScore(prev => prev + (currentStep.choices?.reduce((max, c) => Math.max(max, c.points || 0), 0) || 0));
    }

    // Check if correct choice for timed step
    if (currentStep.type === 'timed' && currentStep.correctChoice) {
      const isCorrect = choice.id === currentStep.correctChoice;
      // timedStepData will be set by TimedStep component
    }

    // Advance to next step
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      finishMission();
    }
  };

  const finishMission = () => {
    // Calculate pass/fail
    const scorePercentage = maxScore > 0 ? (score / maxScore) * 100 : 100;
    const passed = mission.winConditions.every(wc => {
      if (wc.threshold !== undefined) {
        return scorePercentage >= wc.threshold;
      }
      return true;
    });

    // Calculate XP (full if passed, 50% if failed)
    const xpEarned = passed ? mission.xpReward : Math.floor(mission.xpReward * 0.5);

    // Evaluate side quests (simplified: complete if score > 80%)
    const completedSideQuests = mission.sideQuests
      ?.filter(() => scorePercentage >= 80)
      .map(sq => sq.id) || [];

    const result: MissionResult = {
      missionId: mission.id,
      passed,
      score,
      maxScore,
      xpEarned,
      sideQuestsCompleted: completedSideQuests,
      completedAt: Date.now(),
      choices,
      timedStepPerformance: timedStepData,
    };

    onComplete(result);
  };

  if (currentStep.type === 'timed') {
    return (
      <TimedStep
        step={currentStep}
        onChoice={(choice, timeUsed) => {
          const isCorrect = currentStep.correctChoice === choice.id;
          setTimedStepData({
            timeUsed,
            timeLimit: currentStep.timeLimit || 30,
            responseCorrect: isCorrect,
          });
          handleChoice(choice);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Step {currentStepIndex + 1} of {mission.steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentStep.type === 'briefing' && 'Mission Briefing'}
            {currentStep.type === 'decision' && 'Decision Point'}
            {currentStep.type === 'scenario' && 'Scenario Challenge'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{currentStep.content}</p>

          {currentStep.choices && currentStep.choices.length > 0 && (
            <div className="space-y-2 pt-2">
              {currentStep.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleChoice(choice)}
                >
                  <div className="space-y-1">
                    <div className="font-medium">{choice.text}</div>
                    {choice.outcome && (
                      <div className="text-xs text-muted-foreground">{choice.outcome}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}

          {currentStep.type === 'briefing' && (
            <Button onClick={() => setCurrentStepIndex(prev => prev + 1)} className="w-full">
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TimedStep({ step, onChoice }: { step: MissionStep; onChoice: (choice: MissionChoice, timeUsed: number) => void }) {
  const [timeLeft, setTimeLeft] = useState(step.timeLimit || 30);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-select first choice if time runs out
          if (step.choices && step.choices.length > 0) {
            const timeUsed = (Date.now() - startTime) / 1000;
            onChoice(step.choices[0], timeUsed);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimedChoice = (choice: MissionChoice) => {
    const timeUsed = (Date.now() - startTime) / 1000;
    onChoice(choice, timeUsed);
  };

  const timePercentage = ((step.timeLimit || 30) - timeLeft) / (step.timeLimit || 30) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Timed Decision
            </CardTitle>
            <div className="flex items-center gap-2 text-destructive font-mono text-xl">
              <Clock className="h-5 w-5" />
              {timeLeft}s
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={timePercentage} className="h-2" />
          
          <p className="text-sm leading-relaxed whitespace-pre-line">{step.content}</p>

          {step.choices && step.choices.length > 0 && (
            <div className="space-y-2 pt-2">
              {step.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleTimedChoice(choice)}
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
