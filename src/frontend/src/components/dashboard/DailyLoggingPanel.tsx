import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, ChevronDown, Info } from 'lucide-react';
import { getFactorColorClass, FACTOR_CONFIGS } from '@/utils/readinessSemantics';
import { DAILY_FACTOR_GUIDANCE } from '@/content/dailyFactorGuidance';

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
          factorKey="sleep"
        />
        
        <FactorSlider
          label="Training Load"
          value={trainingLoadScore}
          onChange={setTrainingLoadScore}
          description="Intensity and volume management"
          factorKey="training"
        />
        
        <FactorSlider
          label="Stress Level"
          value={stressScore}
          onChange={setStressScore}
          description="Mental and operational demands"
          factorKey="stress"
        />
        
        <FactorSlider
          label="Pain/Injury Status"
          value={painScore}
          onChange={setPainScore}
          description="Musculoskeletal health"
          factorKey="pain"
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
  factorKey,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description: string;
  factorKey: string;
}) {
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const config = FACTOR_CONFIGS[factorKey];
  const guidance = DAILY_FACTOR_GUIDANCE[factorKey];
  
  const colorClass = getFactorColorClass(value, config.polarity);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className={`text-lg font-bold ${colorClass}`}>{value}</span>
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
      
      {/* Self-Rating Guidance */}
      {guidance && (
        <Collapsible open={isGuidanceOpen} onOpenChange={setIsGuidanceOpen}>
          <CollapsibleTrigger className="flex items-center gap-1.5 text-xs text-primary hover:underline">
            <Info className="h-3 w-3" />
            <span>Self-Rating Guide</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${isGuidanceOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
              <p className="text-xs font-medium text-foreground">
                {guidance.polarityStatement}
              </p>
              <div className="space-y-2">
                {guidance.anchors.map((anchor) => (
                  <div key={anchor.value} className="text-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-foreground min-w-[3ch]">{anchor.value}</span>
                      <span className="font-medium text-muted-foreground">({anchor.label}):</span>
                    </div>
                    <p className="text-muted-foreground ml-5 mt-0.5 leading-relaxed">
                      {anchor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
