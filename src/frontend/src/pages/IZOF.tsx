import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, ClipboardCheck, BookOpen, Activity, BarChart3 } from 'lucide-react';
import { useIZOFSettings } from '../hooks/useIzofSettings';

export default function IZOF() {
  const { settings, update } = useIZOFSettings();

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">IZOF Mental Performance</h1>
        <p className="text-muted-foreground mt-2">
          Individual Zone of Optimal Functioning: Identify, regulate, and train your optimal stress zone for peak performance under pressure.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <CardTitle>Daily Zone Check</CardTitle>
            </div>
            <CardDescription>
              Log your stress level, emotions, and upcoming task. Get personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/daily-check">
              <Button className="w-full">Start Daily Check</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>IZOF Education</CardTitle>
            </div>
            <CardDescription>
              Learn about IZOF, eustress vs distress, and why your optimal zone is unique.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/education">
              <Button variant="outline" className="w-full">Learn More</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Stress Regulation Skills</CardTitle>
            </div>
            <CardDescription>
              Techniques to increase or decrease arousal and a decision helper for your current state.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/regulation">
              <Button variant="outline" className="w-full">View Skills</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Stress Readiness Dashboard</CardTitle>
            </div>
            <CardDescription>
              Visualize trends, identify your IZOF range, and correlate stress with performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/dashboard">
              <Button variant="outline" className="w-full">View Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Leader / Coach View</CardTitle>
          </div>
          <CardDescription>
            Enable aggregate, non-diagnostic stress summaries for coaching purposes. Does not display individual reflections or detailed emotion data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="coach-view-toggle" className="text-sm font-medium">
              Enable Coach View
            </Label>
            <Switch
              id="coach-view-toggle"
              checked={settings.coachViewEnabled}
              onCheckedChange={(checked) => update({ coachViewEnabled: checked })}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            When enabled, the Stress Readiness Dashboard will display aggregate coaching insights. This view is non-diagnostic and intended for performance coaching only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
