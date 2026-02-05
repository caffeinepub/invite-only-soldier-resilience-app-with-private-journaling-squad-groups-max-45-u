import { useState, useEffect } from 'react';
import { useLocalJournalEntries } from '../../hooks/useLocalData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { X, Save, Trash2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import type { LocalJournalEntry } from '../../utils/localDataStore';

interface JournalEditorProps {
  entry: LocalJournalEntry | null;
  onClose: () => void;
  prefillTitle?: string;
  prefillContent?: string;
}

export default function JournalEditor({ entry, onClose, prefillTitle, prefillContent }: JournalEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { add, update, remove } = useLocalJournalEntries();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    } else if (prefillTitle || prefillContent) {
      setTitle(prefillTitle || '');
      setContent(prefillContent || '');
    }
  }, [entry, prefillTitle, prefillContent]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    setIsSaving(true);
    try {
      if (entry) {
        update(entry.id, {
          title: title.trim(),
          content: content.trim(),
        });
        toast.success('Entry updated successfully');
      } else {
        add({
          title: title.trim(),
          content: content.trim(),
          isShared: false,
        });
        toast.success('Entry created successfully');
      }
      onClose();
    } catch (error: any) {
      toast.error('Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!entry) return;
    try {
      remove(entry.id);
      toast.success('Entry deleted successfully');
      onClose();
    } catch (error: any) {
      toast.error('Failed to delete entry');
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{entry ? 'Edit Entry' : 'New Entry'}</h1>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Local Entry</CardTitle>
            </div>
            <CardDescription>Stored privately on your device only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your entry a title..."
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your reflection..."
                rows={12}
                disabled={isSaving}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div>
            {entry && (
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Entry
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this journal entry from your device. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
