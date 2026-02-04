import { useGetGuidelines } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Guidelines() {
  const { data: guidelines, isLoading } = useGetGuidelines();

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Guidelines</h1>
          <p className="text-muted-foreground">Our shared commitment to a positive community</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p>
                <strong>Be Respectful:</strong> Treat all members with dignity and respect. We are here to support each
                other's growth and development as soldiers and individuals.
              </p>
              <p>
                <strong>Be Constructive:</strong> Share insights, reflections, and experiences that help build
                resilience, mental readiness, and team cohesion. Focus on growth and learning.
              </p>
              <p>
                <strong>Be Positive:</strong> Emphasize the positive outcomes of service and the strengths we develop
                through challenges. Support your fellow soldiers in their journey.
              </p>
              <p>
                <strong>Maintain Privacy:</strong> Do not share operational details, classified information, or personal
                information about others without their consent. Respect OPSEC at all times.
              </p>
              <p>
                <strong>Report Concerns:</strong> If you see content or behavior that violates these guidelines, please
                report it. We all share responsibility for maintaining a positive community.
              </p>
              <p>
                <strong>Embody Army Values:</strong> Let Loyalty, Duty, Respect, Selfless Service, Honor, Integrity, and
                Personal Courage guide your interactions in this community.
              </p>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Violations of these guidelines may result in content removal or account restrictions. Our goal is to
                maintain a safe, supportive environment for all members.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
