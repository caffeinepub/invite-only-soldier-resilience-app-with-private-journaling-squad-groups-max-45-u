/**
 * Outcome Briefing Cards Component
 * 
 * Card-based outcome presentation with interactive scenario-style elements.
 * Chunks content into panels and includes at least one interactive element per outcome.
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Target, Lightbulb, Users, CheckCircle2 } from 'lucide-react';
import type { AssessmentOutcomeContent, InsightChoice } from '../../types/assessments';

interface OutcomeBriefingCardsProps {
  content: AssessmentOutcomeContent;
}

export default function OutcomeBriefingCards({ content }: OutcomeBriefingCardsProps) {
  const [scenarioChoices, setScenarioChoices] = useState<Record<string, string>>({});

  const handleScenarioChoice = (insightIndex: number, choiceId: string) => {
    setScenarioChoices({ ...scenarioChoices, [insightIndex]: choiceId });
  };

  return (
    <div className="space-y-4">
      {/* What It Measures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            What This Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.whatItMeasures}</p>
        </CardContent>
      </Card>

      {/* Relevance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Mission Relevance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.relevance}</p>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Actionable Insights
        </h3>
        
        {content.insights.map((insight, index) => {
          if (insight.type === 'text') {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{insight.content}</p>
                </CardContent>
              </Card>
            );
          }

          if (insight.type === 'briefing') {
            return (
              <Alert key={index}>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-1">{insight.title}</div>
                  <div className="text-sm">{insight.content}</div>
                </AlertDescription>
              </Alert>
            );
          }

          if (insight.type === 'scenario' && insight.choices) {
            const selectedChoice = scenarioChoices[index];
            const choice = insight.choices.find(c => c.id === selectedChoice);

            return (
              <Card key={index} className="border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Scenario</Badge>
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{insight.content}</p>
                  
                  <div className="space-y-2">
                    {insight.choices.map((c) => (
                      <Button
                        key={c.id}
                        variant={selectedChoice === c.id ? 'default' : 'outline'}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleScenarioChoice(index, c.id)}
                      >
                        {c.text}
                      </Button>
                    ))}
                  </div>

                  {choice && (
                    <Alert>
                      <AlertDescription>
                        <div className="font-medium mb-1">Feedback:</div>
                        <div className="text-sm">{choice.feedback}</div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
