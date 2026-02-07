/**
 * Mental Performance: Recommended Reading Page
 * 
 * Curated reading list with Libby guide, expandable book cards,
 * local progress tracking, and gamification integration.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Award, CheckCircle2, Circle, BookMarked } from 'lucide-react';
import { libbyGuide, readingList, additionalRecommendations, type BookContent } from '../content/mentalPerformance/recommendedReading';
import { useReadingProgress, type ReadingStatus } from '../hooks/useReadingProgress';
import { useReadingRewards } from '../hooks/useReadingRewards';
import { useLocalProfile } from '../hooks/useLocalProfile';

export default function MentalPerformanceReading() {
  const { profile } = useLocalProfile();
  const { getBookStatus, updateBookStatus, getCompletedBooks } = useReadingProgress();
  const { checkAndGrantMilestones, getEarnedBadges } = useReadingRewards(profile.localUuid);
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkAndGrantMilestones();
  }, []);

  const toggleBook = (bookId: string) => {
    const newExpanded = new Set(expandedBooks);
    if (newExpanded.has(bookId)) {
      newExpanded.delete(bookId);
    } else {
      newExpanded.add(bookId);
    }
    setExpandedBooks(newExpanded);
  };

  const handleStatusChange = (bookId: string, status: ReadingStatus) => {
    updateBookStatus(bookId, status);
    checkAndGrantMilestones();
  };

  const getStatusIcon = (status?: ReadingStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <BookMarked className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status?: ReadingStatus) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'To Read';
    }
  };

  const earnedBadges = getEarnedBadges();
  const completedCount = getCompletedBooks().length;

  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recommended Reading</h1>
        <p className="text-muted-foreground">
          Build mental resilience, leadership, and performance through proven books for soldiers and leaders.
        </p>
      </div>

      {/* Libby Guide */}
      <Card className="mb-8 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {libbyGuide.title}
          </CardTitle>
          <CardDescription>{libbyGuide.intro}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {libbyGuide.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm mb-2">Pro Tips:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {libbyGuide.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Badges */}
      {(completedCount > 0 || earnedBadges.length > 0) && (
        <Alert className="mb-8">
          <Award className="h-4 w-4" />
          <AlertTitle>Your Reading Progress</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <p className="text-sm">
                <strong>{completedCount}</strong> {completedCount === 1 ? 'book' : 'books'} completed
              </p>
              {earnedBadges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {earnedBadges.map(badge => (
                    <Badge key={badge.id} variant="secondary" className="gap-1">
                      <Award className="h-3 w-3" />
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Core Reading List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Core Reading List</h2>
        <div className="space-y-4">
          {readingList.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isExpanded={expandedBooks.has(book.id)}
              onToggle={() => toggleBook(book.id)}
              status={getBookStatus(book.id)}
              onStatusChange={(status) => handleStatusChange(book.id, status)}
              getStatusIcon={getStatusIcon}
              getStatusLabel={getStatusLabel}
            />
          ))}
        </div>
      </div>

      {/* Additional Recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Additional Recommendations</h2>
        <div className="space-y-4">
          {additionalRecommendations.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isExpanded={expandedBooks.has(book.id)}
              onToggle={() => toggleBook(book.id)}
              status={getBookStatus(book.id)}
              onStatusChange={(status) => handleStatusChange(book.id, status)}
              getStatusIcon={getStatusIcon}
              getStatusLabel={getStatusLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BookCardProps {
  book: BookContent;
  isExpanded: boolean;
  onToggle: () => void;
  status?: ReadingStatus;
  onStatusChange: (status: ReadingStatus) => void;
  getStatusIcon: (status?: ReadingStatus) => React.ReactNode;
  getStatusLabel: (status?: ReadingStatus) => string;
}

function BookCard({ book, isExpanded, onToggle, status, onStatusChange, getStatusIcon, getStatusLabel }: BookCardProps) {
  return (
    <Card>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getStatusIcon(status)}
                <CardTitle className="text-lg">{book.title}</CardTitle>
              </div>
              <CardDescription className="text-sm">
                {book.author} • {book.category}
              </CardDescription>
              <p className="text-sm mt-2 text-foreground">{book.whyItMatters}</p>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant={status === 'to-read' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('to-read')}
            >
              To Read
            </Button>
            <Button
              variant={status === 'in-progress' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('in-progress')}
            >
              In Progress
            </Button>
            <Button
              variant={status === 'completed' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('completed')}
            >
              Completed
            </Button>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            <Separator />

            {/* Core Themes */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Core Principles</h4>
              <ul className="space-y-1 text-sm">
                {book.coreThemes.map((theme, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Lessons */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Actionable Lessons</h4>
              <ul className="space-y-1 text-sm">
                {book.actionableLessons.map((lesson, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excerpt Summaries */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Key Ideas (Educational Summaries)</h4>
              <div className="space-y-2">
                {book.excerptSummaries.map((excerpt, idx) => (
                  <p key={idx} className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3">
                    {excerpt}
                  </p>
                ))}
              </div>
            </div>

            {/* Use This When */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Use This When...</h4>
              <div className="flex flex-wrap gap-2">
                {book.useThisWhen.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reflection Prompts */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Reflection Prompts</h4>
              <ul className="space-y-1 text-sm">
                {book.reflectionPrompts.map((prompt, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary">?</span>
                    <span className="italic">{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Actions */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Micro-Actions (Do This Week)</h4>
              <ul className="space-y-1 text-sm">
                {book.microActions.map((action, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span className="font-medium">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Libby Link */}
            {book.libbySearchTerm && (
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://libbyapp.com/search/global/${encodeURIComponent(book.libbySearchTerm)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Search in Libby
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
