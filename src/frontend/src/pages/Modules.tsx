/**
 * Missions Page
 * 
 * Mission-style interface showing briefing, win conditions, XP reward,
 * and lock state with clear unlock requirements. Displays operator
 * progression and mission cards.
 */

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MISSIONS, CATEGORIES } from '../content/modules';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MissionCard from '../components/missions/MissionCard';
import OperatorProgressPanel from '../components/missions/OperatorProgressPanel';

export default function Modules() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);

  const filteredMissions = MISSIONS.filter((m) => m.category === selectedCategory);

  const handleStartMission = (missionId: string) => {
    navigate({ to: `/modules/${missionId}` });
  };

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
        <p className="text-muted-foreground">
          Complete missions to earn XP, unlock content, and build operational readiness
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 gap-1">
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs px-2">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4 mt-6">
                {filteredMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onStart={handleStartMission}
                  />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <OperatorProgressPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
