import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

interface DailyLoggingPanelProps {
  onSubmit: (data: {
    sleepScore: number;
    trainingLoadScore: number;
    stressScore: number;
    painScore: number;
  }) => void;
  isSubmitting: boolean;
  isOffline: boolean;
}

export default function DailyLoggingPanel({ onSubmit, isSubmitting, isOffline }: DailyLoggingPanelProps) {
  const [sleepScore, setSleepScore] = useState(70);
  const [trainingLoadScore, setTrainingLoadScore] = useState(70);
  const [stressScore, setStressScore] = useState(70);
  const [painScore, setPainScore] = useState(70);

  const handleSubmit = () => {
    onSubmit({
      sleepScore,
      trainingLoadScore,
      stressScore,
      painScore,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FactorSlider
          label="Sleep Quality"
          value={sleepScore}
          onChange={setSleepScore}
          description="Duration, efficiency, and recovery"
        />
        
        <FactorSlider
          label="Training Load"
          value={trainingLoadScore}
          onChange={setTrainingLoadScore}
          description="Intensity and volume management"
        />
        
        <FactorSlider
          label="Stress Level"
          value={stressScore}
          onChange={setStressScore}
          description="Mental and operational demands"
        />
        
        <FactorSlider
          label="Pain/Injury Status"
          value={painScore}
          onChange={setPainScore}
          description="Musculoskeletal health"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isOffline ? 'Queuing...' : 'Saving...'}
          </>
        ) : (
          "Log Today's Data"
        )}
      </Button>
    </div>
  );
}

function FactorSlider({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description: string;
}) {
  const getColor = (v: number): string => {
    if (v >= 80) return 'text-green-600 dark:text-green-400';
    if (v >= 60) return 'text-blue-600 dark:text-blue-400';
    if (v >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className={`text-lg font-bold ${getColor(value)}`}>{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={0}
        max={100}
        step={5}
        className="cursor-pointer"
      />
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
