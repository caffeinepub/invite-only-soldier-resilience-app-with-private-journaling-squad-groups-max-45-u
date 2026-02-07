import { useState } from 'react';
import { dailyQuotes } from '../content/dailyQuotes';
import { getDailyQuoteIndex } from '../utils/dailyRotation';
import { useQuoteReflections } from '../hooks/useQuoteReflections';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quote, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function DailyQuotes() {
  const dailyIndex = getDailyQuoteIndex(dailyQuotes.length);
  const todaysQuote = dailyQuotes[dailyIndex];
  
  const { reflection, saveReflection, isLoading } = useQuoteReflections(todaysQuote.id);
  const [localReflection, setLocalReflection] = useState(reflection);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state when reflection loads
  if (!isLoading && localReflection !== reflection && localReflection === '') {
    setLocalReflection(reflection);
  }

  const handleSave = () => {
    setIsSaving(true);
    saveReflection(localReflection);
    toast.success('Reflection saved');
    setIsSaving(false);
  };

  const hasChanges = localReflection !== reflection;

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Quote className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Daily Quote</h1>
        </div>
        <p className="text-muted-foreground">
          Reflect on today's quote and how it impacts your life.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2 leading-relaxed">
                "{todaysQuote.quote}"
              </CardTitle>
              <CardDescription className="text-base">
                — {todaysQuote.author}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {todaysQuote.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground italic">
              {todaysQuote.annotation}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Reflection</CardTitle>
          <CardDescription>
            How does this quote impact your life today? What actions will you take?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your thoughts here..."
            value={localReflection}
            onChange={(e) => setLocalReflection(e.target.value)}
            className="min-h-[200px] resize-none"
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving || isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Reflection'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>A new quote will appear tomorrow. Your reflections are saved locally on this device.</p>
      </div>
    </div>
  );
}
