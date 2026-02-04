import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useGetMyJournalEntries, useGetMySquads } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Lock, Users, Pencil, Trash2 } from 'lucide-react';
import JournalEditor from '../components/journal/JournalEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Journaling } from '../backend';

export default function Journal() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as any;
  const { data: entries = [], isLoading } = useGetMyJournalEntries();
  const { data: squads = [] } = useGetMySquads();
  const [selectedEntry, setSelectedEntry] = useState<Journaling | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const prefillTitle = search?.prefillTitle;
  const prefillContent = search?.prefillContent;

  const handleCreateNew = () => {
    setSelectedEntry(null);
    setIsCreating(true);
  };

  const handleEdit = (entry: Journaling) => {
    setSelectedEntry(entry);
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
    setSelectedEntry(null);
    if (prefillTitle || prefillContent) {
      navigate({ to: '/journal', search: {} });
    }
  };

  if (isCreating || prefillTitle || prefillContent) {
    return (
      <JournalEditor
        entry={selectedEntry}
        onClose={handleClose}
        prefillTitle={prefillTitle}
        prefillContent={prefillContent}
      />
    );
  }

  const sortedEntries = [...entries].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Journal</h1>
          <p className="text-muted-foreground">Private reflections and shared insights</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : entries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No journal entries yet</h3>
            <p className="text-muted-foreground mb-4">Start your journey by creating your first reflection</p>
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedEntries.map((entry) => {
            const squad = entry.squadGroup ? squads.find((s) => s.id === entry.squadGroup) : null;
            return (
              <Card key={entry.id.toString()} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{entry.title}</CardTitle>
                        {entry.isShared ? (
                          <Badge variant="secondary" className="gap-1">
                            <Users className="h-3 w-3" />
                            Shared
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <Lock className="h-3 w-3" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {new Date(Number(entry.timestamp) / 1000000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {entry.isShared && squad && <> • Shared with {squad.name}</>}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{entry.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BookOpen({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
