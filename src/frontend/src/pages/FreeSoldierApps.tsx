/**
 * Free Soldier Apps Page
 * 
 * Scannable, tappable cards for mental health, resilience, and wellness apps
 * available to soldiers at no cost, with Libby DoD ID instructions.
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Brain,
  Moon,
  Heart,
  Wind,
  Target,
  Flame,
  Anchor,
  Compass,
  Zap,
  Activity,
  Book,
  Smartphone,
  Headphones,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  MapPin,
  Radio,
  Dumbbell,
  Clipboard
} from 'lucide-react';
import { libbyGuide, freeSoldierApps } from '../content/mentalPerformance/freeSoldierApps';
import type { IconToken, AppCardContent } from '../types/mentalPerformance';

const iconMap: Record<IconToken, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  brain: Brain,
  moon: Moon,
  heart: Heart,
  wind: Wind,
  target: Target,
  flame: Flame,
  anchor: Anchor,
  compass: Compass,
  zap: Zap,
  activity: Activity,
  book: Book,
  smartphone: Smartphone,
  headphones: Headphones,
  users: Users,
  map: MapPin,
  radio: Radio,
  dumbbell: Dumbbell,
  clipboard: Clipboard
};

export default function FreeSoldierApps() {
  const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const toggleApp = (appId: string) => {
    const newExpanded = new Set(expandedApps);
    if (newExpanded.has(appId)) {
      newExpanded.delete(appId);
    } else {
      newExpanded.add(appId);
    }
    setExpandedApps(newExpanded);
  };

  // Extract all unique tags
  const allTags = Array.from(
    new Set(freeSoldierApps.flatMap(app => app.tags))
  ).sort();

  // Filter apps by selected tag
  const filteredApps = selectedTag
    ? freeSoldierApps.filter(app => app.tags.includes(selectedTag as any))
    : freeSoldierApps;

  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Free Soldier Apps</h1>
        <p className="text-muted-foreground">
          Mental health, stress management, resilience, and wellness tools—100% free for service members.
        </p>
      </div>

      {/* TAG Vetted Source Note */}
      <Alert className="mb-6 border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          For additional vetted Army mobile apps, visit the{' '}
          <a
            href="https://tag.army.mil"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            TRADOC Application Gateway (TAG)
            <ExternalLink className="h-3 w-3" />
          </a>
          {' '}— the official source for Army-approved mobile applications.
        </AlertDescription>
      </Alert>

      {/* Libby Guide */}
      <Card className="mb-8 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
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

      {/* Tag Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All Apps ({freeSoldierApps.length})
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="space-y-4">
        {filteredApps.length === 0 && (
          <Alert>
            <AlertDescription>No apps found for this category.</AlertDescription>
          </Alert>
        )}
        {filteredApps.map(app => (
          <AppCard
            key={app.id}
            app={app}
            isExpanded={expandedApps.has(app.id)}
            onToggle={() => toggleApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface AppCardProps {
  app: AppCardContent;
  isExpanded: boolean;
  onToggle: () => void;
}

function AppCard({ app, isExpanded, onToggle }: AppCardProps) {
  const IconComponent = iconMap[app.iconToken];

  return (
    <Card className={app.featured ? 'border-primary/40' : ''}>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{app.name}</CardTitle>
                  {app.featured && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription className="text-sm font-medium text-foreground">
                {app.oneLine}
              </CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {app.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            <Separator />

            {/* How to Use */}
            <div>
              <h4 className="font-semibold text-sm mb-2">How to Use</h4>
              <p className="text-sm text-muted-foreground">{app.howToUse}</p>
            </div>

            {/* Download Links */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Download</h4>
              <div className="flex flex-wrap gap-2">
                {app.downloadLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {link.platform}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
