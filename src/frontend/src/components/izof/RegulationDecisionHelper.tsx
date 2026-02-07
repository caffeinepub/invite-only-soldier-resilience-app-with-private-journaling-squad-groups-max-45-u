import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useIZOFEntries } from '../../hooks/useIzof';
import { estimateIZOFRange, categorizeStressState } from '../../utils/izofLogic';

export default function RegulationDecisionHelper() {
  const { entries } = useIZOFEntries();
  const [currentStress, setCurrentStress] = useState<number>(5);

  const izofRange = estimateIZOFRange(entries);
  const state = categorizeStressState(currentStress, izofRange);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'Too low':
        return 'bg-blue-600';
      case 'In zone':
        return 'bg-green-600';
      case 'Too high':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getRecommendation = (state: string) => {
    switch (state) {
      case 'Too low':
        return 'Use techniques to increase arousal (see below)';
      case 'In zone':
        return 'Maintain your current state with centering techniques';
      case 'Too high':
        return 'Use techniques to decrease arousal (see below)';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision Helper</CardTitle>
        <CardDescription>
          Adjust the slider to see if you're too low, in zone, or too high
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Current Stress Level</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[currentStress]}
              onValueChange={(values) => setCurrentStress(values[0])}
              min={0}
              max={10}
              step={0.5}
              className="flex-1"
            />
            <span className="text-2xl font-bold w-12 text-center">{currentStress}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Your State</Label>
          <Badge className={`${getStateColor(state)} text-white text-lg px-4 py-2`}>
            {state}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Recommendation</Label>
          <p className="text-sm text-muted-foreground">{getRecommendation(state)}</p>
        </div>

        {izofRange && (
          <div className="text-xs text-muted-foreground pt-2">
            Your estimated IZOF range: {izofRange.low.toFixed(1)} - {izofRange.high.toFixed(1)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
