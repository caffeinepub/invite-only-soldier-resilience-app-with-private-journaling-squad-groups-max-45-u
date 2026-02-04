import { useState, useEffect } from 'react';
import { useAddJournaling, useUpdateJournaling, useDeleteJournaling, useGetMySquads } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { X, Save, Trash2, Lock, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { Journaling } from '../../backend';

interface JournalEditorProps {
  entry: Journaling | null;
  onClose: () => void;
  prefillTitle?: string;
  prefillContent?: string;
}

export default function JournalEditor({ entry, onClose, prefillTitle, prefillContent }: JournalEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<string>('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: squads = [] } = useGetMySquads();
  const addMutation = useAddJournaling();
  const updateMutation = useUpdateJournaling();
  const deleteMutation = useDeleteJournaling();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setIsShared(entry.isShared);
      setSelectedSquad(entry.squadGroup?.toString() || '');
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

    if (isShared && !selectedSquad) {
      toast.error('Please select a squad to share with');
      return;
    }

    try {
      if (entry) {
        await updateMutation.mutateAsync({
          entryId: entry.id,
          title: title.trim(),
          content: content.trim(),
          isShared,
          squadGroup: isShared && selectedSquad ? BigInt(selectedSquad) : null
        });
        toast.success('Entry updated successfully');
      } else {
        await addMutation.mutateAsync({
          title: title.trim(),
          content: content.trim(),
          isShared,
          squadGroup: isShared && selectedSquad ? BigInt(selectedSquad) : null
        });
        toast.success('Entry created successfully');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save entry');
    }
  };

  const handleDelete = async () => {
    if (!entry) return;
    try {
      await deleteMutation.mutateAsync(entry.id);
      toast.success('Entry deleted successfully');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete entry');
    }
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

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
              <CardTitle>Private Entry</CardTitle>
            </div>
            <CardDescription>Your reflections are private by default</CardDescription>
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

        {squads.length > 0 && (
          <Card className="border-secondary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary-foreground" />
                <CardTitle>Share with Squad</CardTitle>
              </div>
              <CardDescription>Optionally share this entry with one of your squads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share this entry</Label>
                  <p className="text-sm text-muted-foreground">Make this entry visible to squad members</p>
                </div>
                <Switch checked={isShared} onCheckedChange={setIsShared} disabled={isSaving} />
              </div>

              {isShared && (
                <div className="space-y-2">
                  <Label htmlFor="squad">Select Squad</Label>
                  <Select value={selectedSquad} onValueChange={setSelectedSquad} disabled={isSaving}>
                    <SelectTrigger id="squad">
                      <SelectValue placeholder="Choose a squad..." />
                    </SelectTrigger>
                    <SelectContent>
                      {squads.map((squad) => (
                        <SelectItem key={squad.id.toString()} value={squad.id.toString()}>
                          {squad.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {isShared && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Shared entries are visible to all members of the selected squad. You can unshare at any time.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <div>
            {entry && (
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete Entry'}
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
              This will permanently delete this journal entry. This action cannot be undone.
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
