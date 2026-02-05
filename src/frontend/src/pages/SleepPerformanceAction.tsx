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

  const modeGuidance = sleepPerformanceCopy.modes[state.mode];
  const painGuidance = lastLog ? getPainGuidance(lastLog.painInputs) : null;
  const stressTools = lastLog ? getStressDisruptionTools(lastLog.stressInputs) : null;

  const handleLogCaffeine = () => {
    if (!caffeineTime) {
      alert('Please enter caffeine intake time');
      return;
    }

    const time = new Date(caffeineTime).getTime();
    logCaffeine({
      time,
      source: caffeineSource,
      amountMg: parseInt(caffeineAmount)
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
  const isAdvancedNapsUnlocked = state.unlockedTools.includes('advanced-naps');

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
              <CardTitle>Micro-Naps & Controlled Rest</CardTitle>
              <CardDescription>{sleepPerformanceCopy.napNormalization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Nap Duration</Label>
                <Select
                  value={selectedNapDuration.toString()}
                  onValueChange={(value) => setSelectedNapDuration(parseInt(value) as 10 | 20 | 30 | 90)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    {isAdvancedNapsUnlocked && <SelectItem value="90">90 minutes (Unlocked)</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">{napGuidance.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium">Wakeup Guidance</p>
                    <p className="text-muted-foreground">{napGuidance.wakeup}</p>
                  </div>
                  <div>
                    <p className="font-medium">Reactivation</p>
                    <p className="text-muted-foreground">{napGuidance.reactivation}</p>
                  </div>
                  <div>
                    <p className="font-medium">Note</p>
                    <p className="text-muted-foreground">{napGuidance.note}</p>
                  </div>
                </div>
              </div>

              {!isAdvancedNapsUnlocked && selectedNapDuration === 90 && (
                <Alert>
                  <AlertTitle>Locked</AlertTitle>
                  <AlertDescription>
                    90-minute naps unlock after 7 consecutive days of sleep logging.
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
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Caffeine Timing Engine
              </CardTitle>
              <CardDescription>{sleepPerformanceCopy.caffeineUtility}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select value={caffeineSource} onValueChange={setCaffeineSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coffee">Coffee (8oz)</SelectItem>
                      <SelectItem value="espresso">Espresso (1 shot)</SelectItem>
                      <SelectItem value="energy-drink">Energy Drink</SelectItem>
                      <SelectItem value="pre-workout">Pre-Workout</SelectItem>
                      <SelectItem value="rip-it">Rip It</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (mg)</Label>
                  <Input
                    type="number"
                    value={caffeineAmount}
                    onChange={(e) => setCaffeineAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={caffeineTime}
                    onChange={(e) => setCaffeineTime(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleLogCaffeine} className="w-full">
                Log Caffeine
              </Button>

              <Separator />

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Planned Sleep Time</Label>
                  <Input
                    type="time"
                    value={plannedSleepTime}
                    onChange={(e) => setPlannedSleepTime(e.target.value)}
                  />
                </div>

                {plannedSleepTime && (
                  <Alert>
                    <AlertTitle>Recommended Last Intake</AlertTitle>
                    <AlertDescription>
                      Stop caffeine by <strong>{getLastCaffeineRecommendation()}</strong> for optimal sleep at {plannedSleepTime}
                    </AlertDescription>
                  </Alert>
                )}

                {getRecentCaffeineClearance() && (
                  <Alert>
                    <AlertTitle>Recent Caffeine Clearance</AlertTitle>
                    <AlertDescription>
                      Last logged caffeine estimated to clear by <strong>{getRecentCaffeineClearance()}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downshift Tab */}
        <TabsContent value="downshift" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                Nervous System Downshift
              </CardTitle>
              <CardDescription>2-5 minute pre-sleep routines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sleepPerformanceCopy.downshiftRoutines.map((routine, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold">{routine.name} ({routine.duration} min)</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    {routine.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pain & Stress Tab */}
        <TabsContent value="pain-stress" className="space-y-4">
          {painGuidance && (painGuidance.positioning.length > 1 || painGuidance.microRoutine !== 'No specific routine needed') && (
            <Card>
              <CardHeader>
                <CardTitle>Pain-Aware Sleep Optimization</CardTitle>
                <CardDescription>{sleepPerformanceCopy.painAwareness}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm mb-1">Positioning</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {painGuidance.positioning.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Pillow Guidance</p>
                  <p className="text-sm text-muted-foreground">{painGuidance.pillowGuidance}</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Micro-Routine</p>
                  <p className="text-sm text-muted-foreground">{painGuidance.microRoutine}</p>
                </div>
                {painGuidance.redFlag && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Red Flag</AlertTitle>
                    <AlertDescription>{painGuidance.redFlag}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {stressTools && (
            <Card>
              <CardHeader>
                <CardTitle>Stress-Related Sleep Disruption Support</CardTitle>
                <CardDescription>{sleepPerformanceCopy.stressNormalization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm mb-1">Immediate Tool</p>
                  <p className="text-sm text-muted-foreground">{stressTools.immediateTool}</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Follow-Up</p>
                  <p className="text-sm text-muted-foreground">{stressTools.followUp}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!painGuidance && !stressTools && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No pain or stress inputs logged in your last sleep check-in.</p>
                <p className="text-sm mt-2">These tools appear when you include optional assessments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex gap-4">
        <Button onClick={() => navigate({ to: '/sleep' })} variant="outline" className="flex-1">
          Back to Dashboard
        </Button>
        <Button onClick={() => navigate({ to: '/sleep/check-in' })} className="flex-1">
          Log New Sleep
        </Button>
      </div>
    </div>
  );
}
