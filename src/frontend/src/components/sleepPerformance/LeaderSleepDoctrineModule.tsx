import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { atp6225Content } from '../../content/atp6225LeaderSleepDoctrine';

export default function LeaderSleepDoctrineModule() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-2">{atp6225Content.title}</CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {atp6225Content.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {atp6225Content.sections.map((section, index) => {
          const isExpanded = expandedSections.has(index);
          return (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-4 py-3 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors text-left"
                aria-expanded={isExpanded}
              >
                <span className="font-medium text-sm pr-2">{section.title}</span>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 py-4 bg-card space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground italic">{atp6225Content.footer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
