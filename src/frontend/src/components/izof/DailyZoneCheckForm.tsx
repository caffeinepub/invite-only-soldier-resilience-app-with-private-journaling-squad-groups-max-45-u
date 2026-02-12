import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { useIZOFEntries } from '../../hooks/useIzof';
import { validateDailyZoneCheck } from '../../utils/izofLogic';
import type { EmotionCategory, TaskType, DailyZoneCheckEntry } from '../../types/izof';

const EMOTIONS: EmotionCategory[] = [
  'Calm',
  'Focused',
  'Energized',
  'Anxious',
  'Frustrated',
  'Tired',
  'Overwhelmed',
  'Confident',
];

const TASKS: TaskType[] = [
  'Physical Training',
  'Tactical Exercise',
  'Leadership Task',
  'Administrative Work',
  'High-Stakes Mission',
  'Team Coordination',
  'Individual Study',
  'Other',
];

interface DailyZoneCheckFormProps {
  onEntryCreated: (entry: DailyZoneCheckEntry) => void;
}

export default function DailyZoneCheckForm({ onEntryCreated }: DailyZoneCheckFormProps) {
  const { createEntry } = useIZOFEntries();
  const [stressRating, setStressRating] = useState<number>(5);
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionCategory[]>([]);
  const [upcomingTask, setUpcomingTask] = useState<TaskType | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendation, setRecommendation] = useState<DailyZoneCheckEntry | null>(null);

  const handleEmotionToggle = (emotion: EmotionCategory) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = () => {
    const validation = validateDailyZoneCheck(stressRating, selectedEmotions, upcomingTask);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const entry = createEntry(stressRating, selectedEmotions, upcomingTask!);
      setRecommendation(entry);
      onEntryCreated(entry);
    } catch (error) {
      setErrors(['Failed to save entry. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (recommendation) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <CardTitle>Recommendation</CardTitle>
          </div>
          <CardDescription>Based on your current stress level and optimal zone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Action</p>
            <p className="text-2xl font-bold">{recommendation.recommendation}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Guidance</p>
            <p className="text-sm leading-relaxed">{recommendation.guidanceText}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Zone Check</CardTitle>
        <CardDescription>
          Rate your current stress level, select your emotions, and identify your upcoming task.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Label>Current Stress Level (0 = No stress, 10 = Maximum stress)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[stressRating]}
              onValueChange={(values) => setStressRating(values[0])}
              min={0}
              max={10}
              step={0.5}
              className="flex-1"
            />
            <span className="text-2xl font-bold w-12 text-center">{stressRating}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>How are you feeling? (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-3">
            {EMOTIONS.map(emotion => (
              <div key={emotion} className="flex items-center space-x-2">
                <Checkbox
                  id={`emotion-${emotion}`}
                  checked={selectedEmotions.includes(emotion)}
                  onCheckedChange={() => handleEmotionToggle(emotion)}
                />
                <label
                  htmlFor={`emotion-${emotion}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {emotion}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Upcoming Task</Label>
          <Select value={upcomingTask || ''} onValueChange={(value) => setUpcomingTask(value as TaskType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your upcoming task" />
            </SelectTrigger>
            <SelectContent>
              {TASKS.map(task => (
                <SelectItem key={task} value={task}>
                  {task}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Get Recommendation'}
        </Button>
      </CardFooter>
    </Card>
  );
}
