import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { DailyZoneCheckEntry, PerformanceOutcome } from '../../types/izof';
import { useIZOFEntries } from '../../hooks/useIzof';

interface AfterTaskReflectionFormProps {
  entry: DailyZoneCheckEntry;
  onSave: () => void;
  onCancel: () => void;
}

export default function AfterTaskReflectionForm({ entry, onSave, onCancel }: AfterTaskReflectionFormProps) {
  const { updateEntry } = useIZOFEntries();
  const [performanceOutcome, setPerformanceOutcome] = useState<PerformanceOutcome | null>(null);
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!performanceOutcome) return;

    setIsSubmitting(true);
    updateEntry(entry.id, {
      performanceOutcome,
      reflection: reflection.trim() || undefined,
    });
    setIsSubmitting(false);
    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>After-Task Reflection</CardTitle>
        <CardDescription>
          How did you perform? Reflect on your experience to improve your IZOF tracking.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Performance Outcome</Label>
          <RadioGroup value={performanceOutcome?.toString() || ''} onValueChange={(value) => setPerformanceOutcome(parseInt(value) as PerformanceOutcome)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="outcome-5" />
              <Label htmlFor="outcome-5" className="font-normal">5 - Excellent (Peak performance)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="outcome-4" />
              <Label htmlFor="outcome-4" className="font-normal">4 - Good (Above average)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="outcome-3" />
              <Label htmlFor="outcome-3" className="font-normal">3 - Average (Met expectations)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="outcome-2" />
              <Label htmlFor="outcome-2" className="font-normal">2 - Below Average (Struggled)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="outcome-1" />
              <Label htmlFor="outcome-1" className="font-normal">1 - Poor (Significant issues)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="reflection">Reflection (Optional)</Label>
          <Textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What worked? What didn't? How did your stress level affect your performance?"
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleSubmit} disabled={!performanceOutcome || isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : 'Save Reflection'}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
