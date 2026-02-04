import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MODULES, CATEGORIES } from '../content/modules';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Quote, Lightbulb, PenLine } from 'lucide-react';

export default function Modules() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);

  const filteredModules = MODULES.filter((m) => m.category === selectedCategory);

  const handleStartReflection = (prefillTitle: string, prefillContent: string) => {
    navigate({
      to: '/journal',
      search: { prefillTitle, prefillContent }
    });
  };

  return (
    <div className="container max-w-5xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground">
          Doctrine-informed content and exercises for personal and professional growth
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-xs">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            {filteredModules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{module.title}</CardTitle>
                      <CardDescription className="mt-2">{module.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{module.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {module.content.map((content, idx) => (
                    <div key={idx} className="space-y-3">
                      {content.type === 'quote' ? (
                        <div className="border-l-4 border-primary pl-4 py-2 bg-muted/30">
                          <div className="flex items-start gap-2">
                            <Quote className="h-5 w-5 text-primary shrink-0 mt-1" />
                            <div className="space-y-2">
                              <p className="text-sm italic">{content.text}</p>
                              {content.citation && (
                                <p className="text-xs text-muted-foreground">
                                  — {content.citation.source}, {content.citation.reference}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-1" />
                            <p className="text-sm leading-relaxed">{content.text}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <PenLine className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Reflection Prompts</h4>
                    </div>
                    <div className="space-y-2">
                      {module.prompts.map((prompt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <p className="text-sm flex-1">{prompt.text}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartReflection(prompt.prefillTitle, prompt.prefillContent)}
                          >
                            Start
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
