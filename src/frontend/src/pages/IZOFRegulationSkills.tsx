import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { REGULATION_SKILLS } from '../content/izofRegulationSkills';
import RegulationDecisionHelper from '../components/izof/RegulationDecisionHelper';

export default function IZOFRegulationSkills() {
  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/mental-performance/izof">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stress Regulation Skills</h1>
          <p className="text-muted-foreground">Techniques to adjust your arousal level</p>
        </div>
      </div>

      <RegulationDecisionHelper />

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>{REGULATION_SKILLS.increaseArousal.title}</CardTitle>
          <CardDescription>{REGULATION_SKILLS.increaseArousal.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {REGULATION_SKILLS.increaseArousal.techniques.map((technique, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-semibold">{technique.name}</p>
              <p className="text-sm text-muted-foreground">{technique.instructions}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{REGULATION_SKILLS.decreaseArousal.title}</CardTitle>
          <CardDescription>{REGULATION_SKILLS.decreaseArousal.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {REGULATION_SKILLS.decreaseArousal.techniques.map((technique, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-semibold">{technique.name}</p>
              <p className="text-sm text-muted-foreground">{technique.instructions}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
