import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import type { DailyZoneCheckEntry, IZOFRange } from '../../types/izof';
import { getWeeklyAverages, getFrequencyInZone, getEmotionCategorySummary } from '../../utils/izofAnalytics';

interface CoachViewPanelProps {
  entries: DailyZoneCheckEntry[];
  izofRange: IZOFRange | null;
}

export default function CoachViewPanel({ entries, izofRange }: CoachViewPanelProps) {
  const weeklyAverages = getWeeklyAverages(entries);
  const frequencyInZone = getFrequencyInZone(entries, izofRange);
  const emotionSummary = getEmotionCategorySummary(entries);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle>Leader / Coach View</CardTitle>
        </div>
        <CardDescription>
          Aggregate, non-diagnostic stress summaries for coaching purposes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertDescription>
            This view is non-diagnostic and intended for performance coaching only. Individual reflections and detailed emotion data are not displayed.
          </AlertDescription>
        </Alert>

        <div>
          <p className="text-sm font-semibold mb-2">Weekly Stress Averages</p>
          <div className="space-y-1">
            {weeklyAverages.slice(-4).map((week, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">Week of {week.week}</span>
                <span className="font-medium">{week.avgStress}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Frequency in Zone</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-2xl font-bold">{frequencyInZone.tooLow}</p>
              <p className="text-xs text-muted-foreground">Too Low</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{frequencyInZone.inZone}</p>
              <p className="text-xs text-muted-foreground">In Zone</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{frequencyInZone.tooHigh}</p>
              <p className="text-xs text-muted-foreground">Too High</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Emotion Category Summary</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(emotionSummary)
              .sort((a, b) => b[1] - a[1])
              .map(([emotion, count]) => (
                <Badge key={emotion} variant="outline">
                  {emotion}: {count}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
