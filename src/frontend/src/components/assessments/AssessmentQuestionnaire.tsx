/**
 * Assessment Questionnaire Component
 * 
 * Mobile-friendly questionnaire UI with progress indicator, next/back controls,
 * and validation for deterministic completion.
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AssessmentDefinition } from '../../types/assessments';

interface AssessmentQuestionnaireProps {
  assessment: AssessmentDefinition;
  onComplete: (answers: Record<string, string>) => void;
  onCancel: () => void;
}

export default function AssessmentQuestionnaire({
  assessment,
  onComplete,
  onCancel,
}: AssessmentQuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = assessment.questions[currentIndex];
  const progress = ((currentIndex + 1) / assessment.questions.length) * 100;
  const isLastQuestion = currentIndex === assessment.questions.length - 1;
  const currentAnswer = answers[currentQuestion.id];

  const handleNext = () => {
    if (!currentAnswer) return;

    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle>{assessment.title}</CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {currentIndex + 1} of {assessment.questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-lg font-medium">{currentQuestion.text}</p>
          
          <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={currentIndex === 0 ? onCancel : handleBack}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {currentIndex === 0 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
          >
            {isLastQuestion ? 'Complete' : 'Next'}
            {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
