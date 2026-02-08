import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSleepPerformance } from '../hooks/useSleepPerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Coffee, Moon, AlertTriangle, Wind } from 'lucide-react';
import { sleepPerformanceCopy } from '../content/sleepPerformanceCopy';
import { getPainGuidance, getStressDisruptionTools, estimateCaffeineClearance, recommendLastCaffeineTime } from '../utils/sleepPerformance';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function SleepPerformanceAction() {
  const navigate = useNavigate();
  const { logs, state, logCaffeine, caffeineLogs } = useSleepPerformance();
  const lastLog = logs.length > 0 ? logs[logs.length - 1] : null;

  const [caffeineSource, setCaffeineSource] = useState('coffee');
  const [caffeineAmount, setCaffeineAmount] = useState('95');
  const [caffeineTime, setCaffeineTime] = useState('');
  const [plannedSleepTime, setPlannedSleepTime] = useState('');
  const [selectedNapDuration, setSelectedNapDuration] = useState<10 | 20 | 30 | 90>(20);

  const modeGuidance = sleepPerformanceCopy.modes[state.mode] || sleepPerformanceCopy.modes.standard;
  const painGuidance = lastLog?.painInputs ? getPainGuidance(lastLog.painInputs) : null;
  const stressTools = lastLog?.stressInputs ? getStressDisruptionTools(lastLog.stressInputs) : null;

  const handleLogCaffeine = () => {
    if (!caffeineTime) {
      alert('Please enter caffeine intake time');
      return;
    }

    logCaffeine({
      source: caffeineSource,
      amount: parseInt(caffeineAmount)
    });

    alert('Caffeine logged');
    setCaffeineTime('');
  };

  const getLastCaffeineRecommendation = () => {
    if (!plannedSleepTime) return null;
    const sleepTime = new Date(plannedSleepTime).getTime();
    const recommendedTime = recommendLastCaffeineTime(sleepTime);
    return new Date(recommendedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRecentCaffeineClearance = () => {
    if (caffeineLogs.length === 0) return null;
    const recent = caffeineLogs[caffeineLogs.length - 1];
    const { clearanceTime } = estimateCaffeineClearance(recent);
    return new Date(clearanceTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const napGuidance = sleepPerformanceCopy.napGuidance[selectedNapDuration];
  const isAdvancedNapsUnlocked = state.unlockedNapDurations.includes(90);

  return (
    <div className="container py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate({ to: '/sleep' })} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Moon className="h-8 w-8" />
          Tactical Recommendations
        </h1>
        <p className="text-muted-foreground mt-1">Mode-adjusted guidance and tools</p>
      </div>

      {/* Mode Guidance */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Mode: {modeGuidance.name}</CardTitle>
          <CardDescription>{modeGuidance.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Sleep Target</p>
            <p className="text-sm text-muted-foreground">{modeGuidance.sleepTarget}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Nap Strategy</p>
            <p className="text-sm text-muted-foreground">{modeGuidance.napStrategy}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Caffeine Guidance</p>
            <p className="text-sm text-muted-foreground">{modeGuidance.caffeineGuidance}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Wind-Down Protocol</p>
            <p className="text-sm text-muted-foreground">{modeGuidance.windDown}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="naps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="naps">Naps</TabsTrigger>
          <TabsTrigger value="caffeine">Caffeine</TabsTrigger>
          <TabsTrigger value="downshift">Downshift</TabsTrigger>
          <TabsTrigger value="pain-stress">Pain & Stress</TabsTrigger>
        </TabsList>

        {/* Naps Tab */}
        <TabsContent value="naps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tactical Naps</CardTitle>
              <CardDescription>Strategic rest for performance recovery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={selectedNapDuration === 10 ? 'default' : 'outline'}
                  onClick={() => setSelectedNapDuration(10)}
                >
                  10 min
                </Button>
                <Button
                  variant={selectedNapDuration === 20 ? 'default' : 'outline'}
                  onClick={() => setSelectedNapDuration(20)}
                  disabled={!state.unlockedNapDurations.includes(20)}
                >
                  20 min {!state.unlockedNapDurations.includes(20) && '🔒'}
                </Button>
                <Button
                  variant={selectedNapDuration === 30 ? 'default' : 'outline'}
                  onClick={() => setSelectedNapDuration(30)}
                  disabled={!state.unlockedNapDurations.includes(30)}
                >
                  30 min {!state.unlockedNapDurations.includes(30) && '🔒'}
                </Button>
                <Button
                  variant={selectedNapDuration === 90 ? 'default' : 'outline'}
                  onClick={() => setSelectedNapDuration(90)}
                  disabled={!state.unlockedNapDurations.includes(90)}
                >
                  90 min {!state.unlockedNapDurations.includes(90) && '🔒'}
                </Button>
              </div>

              {napGuidance && (
                <div className="space-y-2">
                  <h3 className="font-semibold">{napGuidance.name}</h3>
                  <p className="text-sm text-muted-foreground">{napGuidance.note}</p>
                  <p className="text-sm"><strong>Wake-up:</strong> {napGuidance.wakeup}</p>
                  <p className="text-sm"><strong>Reactivation:</strong> {napGuidance.reactivation}</p>
                </div>
              )}

              {!isAdvancedNapsUnlocked && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Unlock Advanced Naps</AlertTitle>
                  <AlertDescription>
                    Maintain 7+ consecutive nights of quality sleep to unlock longer nap durations.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Caffeine Tab */}
        <TabsContent value="caffeine" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Caffeine Timing Engine</CardTitle>
              <CardDescription>Optimize caffeine intake for performance without sleep disruption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caffeineSource">Caffeine Source</Label>
                <Select value={caffeineSource} onValueChange={setCaffeineSource}>
                  <SelectTrigger id="caffeineSource">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">Coffee (95mg)</SelectItem>
                    <SelectItem value="energy-drink">Energy Drink (80mg)</SelectItem>
                    <SelectItem value="tea">Tea (47mg)</SelectItem>
                    <SelectItem value="pre-workout">Pre-Workout (150mg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caffeineAmount">Amount (mg)</Label>
                <Input
                  id="caffeineAmount"
                  type="number"
                  value={caffeineAmount}
                  onChange={(e) => setCaffeineAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caffeineTime">Intake Time</Label>
                <Input
                  id="caffeineTime"
                  type="time"
                  value={caffeineTime}
                  onChange={(e) => setCaffeineTime(e.target.value)}
                />
              </div>

              <Button onClick={handleLogCaffeine} className="w-full">
                <Coffee className="h-4 w-4 mr-2" />
                Log Caffeine
              </Button>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="plannedSleepTime">Planned Sleep Time</Label>
                <Input
                  id="plannedSleepTime"
                  type="time"
                  value={plannedSleepTime}
                  onChange={(e) => setPlannedSleepTime(e.target.value)}
                />
              </div>

              {getLastCaffeineRecommendation() && (
                <Alert>
                  <Coffee className="h-4 w-4" />
                  <AlertTitle>Last Caffeine Recommendation</AlertTitle>
                  <AlertDescription>
                    For your planned sleep time, consume your last caffeine by {getLastCaffeineRecommendation()}
                  </AlertDescription>
                </Alert>
              )}

              {getRecentCaffeineClearance() && (
                <Alert>
                  <AlertTitle>Recent Caffeine Clearance</AlertTitle>
                  <AlertDescription>
                    Your last caffeine intake will clear by approximately {getRecentCaffeineClearance()}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downshift Tab */}
        <TabsContent value="downshift" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nervous System Downshift</CardTitle>
              <CardDescription>Routines to transition from high-alert to rest mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sleepPerformanceCopy.downshiftRoutines.map((routine) => (
                <div key={routine.name} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{routine.name}</h3>
                    <span className="text-sm text-muted-foreground">{routine.duration} min</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    {routine.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pain & Stress Tab */}
        <TabsContent value="pain-stress" className="space-y-4">
          {painGuidance && (
            <Card>
              <CardHeader>
                <CardTitle>Pain-Adjusted Guidance</CardTitle>
                <CardDescription>Based on your last sleep check-in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{painGuidance}</p>
              </CardContent>
            </Card>
          )}

          {stressTools && (
            <Card>
              <CardHeader>
                <CardTitle>Stress Disruption Tools</CardTitle>
                <CardDescription>Targeted interventions for sleep quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {stressTools.map((tool, idx) => (
                    <li key={idx}>{tool}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {!painGuidance && !stressTools && (
            <Card>
              <CardHeader>
                <CardTitle>No Recent Data</CardTitle>
                <CardDescription>Complete a sleep check-in to see personalized guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate({ to: '/sleep/check-in' })}>
                  Go to Check-In
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
