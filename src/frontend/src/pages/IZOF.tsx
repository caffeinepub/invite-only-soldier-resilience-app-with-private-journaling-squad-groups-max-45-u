import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ClipboardCheck, BookOpen, Zap, BarChart3 } from 'lucide-react';
import { useIZOFSettings } from '../hooks/useIzofSettings';

export default function IZOF() {
  const { settings, update } = useIZOFSettings();

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">IZOF: Individual Zone of Optimal Functioning</h1>
        <p className="text-muted-foreground mt-2">
          Track your stress-performance relationship and learn regulation skills
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <CardTitle>Daily Zone Check</CardTitle>
            </div>
            <CardDescription>
              Quick drill: Rate your stress, log emotions, get a recommendation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/daily-zone-check">
              <Button className="w-full">Start Zone Check</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>Education</CardTitle>
            </div>
            <CardDescription>
              Learn about IZOF, eustress vs distress, and why your zone is unique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/education">
              <Button variant="outline" className="w-full">Read Education</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Regulation Skills</CardTitle>
            </div>
            <CardDescription>
              Techniques to increase or decrease arousal when you're out of zone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/mental-performance/izof/regulation-skills">
              <Button variant="outline" className="w-full">View Skills</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Stress Readiness Dashboard</CardTitle>
            </div>
            <CardDescription>
              View trends, patterns, and cross-factor insights
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
          <CardTitle>Leader / Coach View</CardTitle>
          <CardDescription>
            Enable aggregate stress summaries (no personal reflections shown)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="coach-view"
              checked={settings.coachViewEnabled}
              onCheckedChange={(checked) => update({ coachViewEnabled: checked })}
            />
            <Label htmlFor="coach-view">
              {settings.coachViewEnabled ? 'Coach View Enabled' : 'Coach View Disabled'}
            </Label>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            When enabled, the dashboard will show aggregate stress data suitable for leaders/coaches.
            Individual reflections remain private.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
