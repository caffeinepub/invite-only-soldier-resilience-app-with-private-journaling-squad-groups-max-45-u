import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import DailyZoneCheckForm from '../components/izof/DailyZoneCheckForm';
import AfterTaskReflectionForm from '../components/izof/AfterTaskReflectionForm';
import { useIZOFEntries } from '../hooks/useIzof';
import type { DailyZoneCheckEntry } from '../types/izof';

export default function IZOFDailyZoneCheck() {
  const { getTodayEntry } = useIZOFEntries();
  const [currentEntry, setCurrentEntry] = useState<DailyZoneCheckEntry | null>(getTodayEntry());
  const [showReflection, setShowReflection] = useState(false);

  const handleEntryCreated = (entry: DailyZoneCheckEntry) => {
    setCurrentEntry(entry);
  };

  const handleReflectionSaved = () => {
    setShowReflection(false);
    setCurrentEntry(getTodayEntry());
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/mental-performance/izof">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Zone Check</h1>
          <p className="text-muted-foreground">Assess your stress level and get personalized guidance</p>
        </div>
      </div>

      {currentEntry && !showReflection ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <CardTitle>Today's Check Complete</CardTitle>
            </div>
            <CardDescription>
              You've already completed your Daily Zone Check for today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recommendation</p>
              <p className="text-lg font-semibold">{currentEntry.recommendation}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Guidance</p>
              <p className="text-sm">{currentEntry.guidanceText}</p>
            </div>
            {!currentEntry.performanceOutcome && (
              <Button onClick={() => setShowReflection(true)} className="w-full">
                Add After-Task Reflection
              </Button>
            )}
            {currentEntry.performanceOutcome && (
              <Alert>
                <AlertDescription>
                  You've completed your after-task reflection. Check the Dashboard to see your progress.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : showReflection && currentEntry ? (
        <AfterTaskReflectionForm
          entry={currentEntry}
          onSave={handleReflectionSaved}
          onCancel={() => setShowReflection(false)}
        />
      ) : (
        <DailyZoneCheckForm onEntryCreated={handleEntryCreated} />
      )}
    </div>
  );
}
