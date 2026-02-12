import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { IZOF_EDUCATION_CONTENT } from '../content/izofEducation';

export default function IZOFEducation() {
  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/mental-performance/izof">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IZOF Education</h1>
          <p className="text-muted-foreground">Understanding your Individual Zone of Optimal Functioning</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{IZOF_EDUCATION_CONTENT.overview.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line leading-relaxed">{IZOF_EDUCATION_CONTENT.overview.content}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{IZOF_EDUCATION_CONTENT.eustressVsDistress.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line leading-relaxed">{IZOF_EDUCATION_CONTENT.eustressVsDistress.content}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{IZOF_EDUCATION_CONTENT.individuality.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line leading-relaxed">{IZOF_EDUCATION_CONTENT.individuality.content}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{IZOF_EDUCATION_CONTENT.examples.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line leading-relaxed">{IZOF_EDUCATION_CONTENT.examples.content}</p>
        </CardContent>
      </Card>

      <div className="pt-4">
        <p className="text-xs text-muted-foreground text-center">
          This content is for performance education purposes only and is not medical or diagnostic advice.
        </p>
      </div>
    </div>
  );
}
