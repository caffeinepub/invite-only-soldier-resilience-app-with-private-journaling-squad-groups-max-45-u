import React from 'react';
import { Link } from '@tanstack/react-router';
import { BookMarked, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageScaffold from '@/components/layout/PageScaffold';

export default function LifeLessonsRemoved() {
  return (
    <PageScaffold
      title="Section Unavailable"
      description="The Motivational Videos section is no longer available."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>This Section Has Been Removed</CardTitle>
            <CardDescription>
              The Motivational Videos (Life Lessons) section is no longer part of this application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can explore other Mental Performance resources available in the app:
            </p>
            
            <div className="space-y-3">
              <Link to="/mental-performance/reading">
                <Button variant="outline" className="w-full justify-start">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Recommended Reading
                </Button>
              </Link>
              
              <Link to="/mental-performance/izof">
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  IZOF (Stress & Performance)
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="default" className="w-full justify-start">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageScaffold>
  );
}
