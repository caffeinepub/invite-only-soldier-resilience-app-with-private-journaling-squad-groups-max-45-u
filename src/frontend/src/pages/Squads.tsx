import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetMySquads, useCreateSquadGroup, useJoinSquadGroup } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Users, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Squads() {
  const navigate = useNavigate();
  const { data: squads = [], isLoading } = useGetMySquads();
  const createMutation = useCreateSquadGroup();
  const joinMutation = useJoinSquadGroup();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newSquadName, setNewSquadName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleCreateSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSquadName.trim()) {
      toast.error('Please enter a squad name');
      return;
    }

    try {
      await createMutation.mutateAsync(newSquadName.trim());
      toast.success('Squad created successfully');
      setCreateDialogOpen(false);
      setNewSquadName('');
    } catch (error: any) {
      const message = error.message || 'Failed to create squad';
      toast.error(message);
    }
  };

  const handleJoinSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast.error('Please enter an invite code');
      return;
    }

    try {
      await joinMutation.mutateAsync(inviteCode.trim());
      toast.success('Joined squad successfully');
      setJoinDialogOpen(false);
      setInviteCode('');
    } catch (error: any) {
      let message = 'Failed to join squad';
      if (error.message?.includes('Invalid invite code')) {
        message = 'Invalid invite code. Please check and try again.';
      } else if (error.message?.includes('Group is full')) {
        message = 'This squad has reached its maximum capacity of 45 members.';
      } else if (error.message?.includes('Already a member')) {
        message = 'You are already a member of this squad.';
      }
      toast.error(message);
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Squads</h1>
          <p className="text-muted-foreground">Connect with fellow soldiers and share insights</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Join Squad</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a Squad</DialogTitle>
                <DialogDescription>Enter an invite code to join an existing squad</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleJoinSquad} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteCode">Invite Code</Label>
                  <Input
                    id="inviteCode"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="Enter invite code"
                    disabled={joinMutation.isPending}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={joinMutation.isPending}>
                  {joinMutation.isPending ? 'Joining...' : 'Join Squad'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Squad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Squad</DialogTitle>
                <DialogDescription>Start a new squad and invite others to join</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSquad} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="squadName">Squad Name</Label>
                  <Input
                    id="squadName"
                    value={newSquadName}
                    onChange={(e) => setNewSquadName(e.target.value)}
                    placeholder="e.g., Alpha Team, Morning Warriors"
                    disabled={createMutation.isPending}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Squad'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : squads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No squads yet</h3>
            <p className="text-muted-foreground mb-4">Create a squad or join one with an invite code</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
                Join Squad
              </Button>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Squad
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {squads.map((squad) => (
            <Card key={squad.id.toString()} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate({ to: `/squads/${squad.id.toString()}` })}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{squad.name}</CardTitle>
                    <CardDescription>
                      {squad.members.length} {squad.members.length === 1 ? 'member' : 'members'}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
