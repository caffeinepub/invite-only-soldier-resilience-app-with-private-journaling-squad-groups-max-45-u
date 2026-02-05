import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useLocalJournalEntries } from '../hooks/useLocalData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Lock, Pencil, BookOpen } from 'lucide-react';
import JournalEditor from '../components/journal/JournalEditor';
import type { LocalJournalEntry } from '../utils/localDataStore';

export default function Journal() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as any;
  const { entries } = useLocalJournalEntries();
  const [selectedEntry, setSelectedEntry] = useState<LocalJournalEntry | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const prefillTitle = search?.prefillTitle;
  const prefillContent = search?.prefillContent;

  const handleCreateNew = () => {
    setSelectedEntry(null);
    setIsCreating(true);
  };

  const handleEdit = (entry: LocalJournalEntry) => {
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

  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Journal</h1>
          <p className="text-muted-foreground">Private reflections stored locally on your device</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {entries.length === 0 ? (
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
          {sortedEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                      <Badge variant="outline" className="gap-1">
                        <Lock className="h-3 w-3" />
                        Local
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(entry.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
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
          ))}
        </div>
      )}
    </div>
  );
}
