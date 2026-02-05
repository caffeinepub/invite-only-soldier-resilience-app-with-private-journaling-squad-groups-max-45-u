/**
 * Mission Run Page
 * 
 * Dedicated page for running a mission by ID. Loads the mission,
 * runs the interactive step loop, and displays the debrief.
 */

import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { MISSIONS } from '../content/modules';
import { useMissionProgression } from '../hooks/useMissionProgression';
import MissionRunner from '../components/missions/MissionRunner';
import MissionDebrief from '../components/missions/MissionDebrief';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { MissionResult } from '../types/missions';

export default function MissionRun() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as any;
  const missionId = params.missionId;
  const { applyMissionResult } = useMissionProgression();
  const [result, setResult] = useState<MissionResult | null>(null);

  const mission = MISSIONS.find(m => m.id === missionId);

  if (!mission) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Mission Not Found</h1>
          <Button onClick={() => navigate({ to: '/modules' })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Missions
          </Button>
        </div>
      </div>
    );
  }

  const handleComplete = (missionResult: MissionResult) => {
    applyMissionResult(missionResult);
    setResult(missionResult);
  };

  const handleRetry = () => {
    setResult(null);
  };

  const handleExit = () => {
    navigate({ to: '/modules' });
  };

  const handleReflect = () => {
    if (mission.reflectionPrompt) {
      navigate({
        to: '/journal',
        search: {
          prefillTitle: mission.reflectionPrompt.prefillTitle,
          prefillContent: mission.reflectionPrompt.prefillContent,
        },
      });
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/modules' })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{mission.title}</h1>
          <p className="text-sm text-muted-foreground">{mission.category}</p>
        </div>
      </div>

      {result ? (
        <MissionDebrief
          mission={mission}
          result={result}
          onRetry={handleRetry}
          onExit={handleExit}
          onReflect={mission.reflectionPrompt ? handleReflect : undefined}
        />
      ) : (
        <MissionRunner mission={mission} onComplete={handleComplete} />
      )}
    </div>
  );
}
