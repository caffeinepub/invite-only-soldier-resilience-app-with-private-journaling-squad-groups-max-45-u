import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Moon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SleepPerformanceCheckIn() {
  const navigate = useNavigate();
  const { logSleep } = useSleepPerformance();
  
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [quality, setQuality] = useState([7]);
  
  // Optional pain inputs
  const [includePain, setIncludePain] = useState(false);
  const [neckPain, setNeckPain] = useState([0]);
  const [backPain, setBackPain] = useState([0]);
  const [nerveSymptoms, setNerveSymptoms] = useState(false);
  
  // Optional stress inputs
  const [includeStress, setIncludeStress] = useState(false);
  const [nightmares, setNightmares] = useState(false);
  const [hypervigilance, setHypervigilance] = useState(false);
  const [racingThoughts, setRacingThoughts] = useState(false);
  const [startleResponse, setStartleResponse] = useState(false);

  const handleSubmit = () => {
    if (!sleepStart || !sleepEnd) {
      alert('Please enter sleep start and end times');
      return;
    }

    const start = new Date(sleepStart).getTime();
    const end = new Date(sleepEnd).getTime();
    
    if (end <= start) {
      alert('Sleep end time must be after start time');
      return;
    }

    const duration = end - start;

    logSleep({
      sleepStart: start,
      sleepEnd: end,
      duration,
      quality: quality[0],
      painInputs: includePain ? {
        neckPain: neckPain[0],
        backPain: backPain[0],
        nerveSymptoms
      } : undefined,
      stressInputs: includeStress ? {
        nightmares,
        hypervigilance,
        racingThoughts,
        startleResponse
      } : undefined
    });

    navigate({ to: '/sleep/analysis' });
  };

  return (
    <div className="container py-8 max-w-3xl">
      <Button variant="ghost" onClick={() => navigate({ to: '/sleep' })} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Moon className="h-8 w-8" />
          Sleep Check-In
        </h1>
        <p className="text-muted-foreground mt-1">Log your last sleep window</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sleep Window</CardTitle>
          <CardDescription>Enter when you went to sleep and when you woke up</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sleepStart">Sleep Start</Label>
              <Input
                id="sleepStart"
                type="datetime-local"
                value={sleepStart}
                onChange={(e) => setSleepStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleepEnd">Sleep End</Label>
              <Input
                id="sleepEnd"
                type="datetime-local"
                value={sleepEnd}
                onChange={(e) => setSleepEnd(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sleep Quality (1-10)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={quality}
                onValueChange={setQuality}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-lg font-semibold w-8">{quality[0]}</span>
            </div>
          </div>

          <Separator />

          {/* Optional Pain Inputs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includePain"
                checked={includePain}
                onCheckedChange={(checked) => setIncludePain(checked as boolean)}
              />
              <Label htmlFor="includePain" className="cursor-pointer">
                Include pain assessment (optional)
              </Label>
            </div>

            {includePain && (
              <div className="space-y-4 pl-6 border-l-2 border-muted">
                <div className="space-y-2">
                  <Label>Neck Pain (0-10)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={neckPain}
                      onValueChange={setNeckPain}
                      min={0}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold w-8">{neckPain[0]}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Back Pain (0-10)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={backPain}
                      onValueChange={setBackPain}
                      min={0}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold w-8">{backPain[0]}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nerveSymptoms"
                    checked={nerveSymptoms}
                    onCheckedChange={(checked) => setNerveSymptoms(checked as boolean)}
                  />
                  <Label htmlFor="nerveSymptoms" className="cursor-pointer">
                    Nerve symptoms (numbness, tingling, weakness)
                  </Label>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Optional Stress Inputs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeStress"
                checked={includeStress}
                onCheckedChange={(checked) => setIncludeStress(checked as boolean)}
              />
              <Label htmlFor="includeStress" className="cursor-pointer">
                Include sleep disruption check (optional)
              </Label>
            </div>

            {includeStress && (
              <div className="space-y-3 pl-6 border-l-2 border-muted">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nightmares"
                    checked={nightmares}
                    onCheckedChange={(checked) => setNightmares(checked as boolean)}
                  />
                  <Label htmlFor="nightmares" className="cursor-pointer">
                    Nightmares
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hypervigilance"
                    checked={hypervigilance}
                    onCheckedChange={(checked) => setHypervigilance(checked as boolean)}
                  />
                  <Label htmlFor="hypervigilance" className="cursor-pointer">
                    Hypervigilance
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="racingThoughts"
                    checked={racingThoughts}
                    onCheckedChange={(checked) => setRacingThoughts(checked as boolean)}
                  />
                  <Label htmlFor="racingThoughts" className="cursor-pointer">
                    Racing thoughts
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="startleResponse"
                    checked={startleResponse}
                    onCheckedChange={(checked) => setStartleResponse(checked as boolean)}
                  />
                  <Label htmlFor="startleResponse" className="cursor-pointer">
                    Startle response
                  </Label>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Log Sleep & Continue
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/sleep' })}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
