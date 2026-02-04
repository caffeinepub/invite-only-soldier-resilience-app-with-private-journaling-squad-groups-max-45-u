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

export default function Groups() {
  const navigate = useNavigate();
  const { data: squads = [], isLoading } = useGetMySquads();
  const createMutation = useCreateSquadGroup();
  const joinMutation = useJoinSquadGroup();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupJoinCode, setNewGroupJoinCode] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }
    if (!newGroupJoinCode.trim()) {
      toast.error('Please enter a join code');
      return;
    }

    try {
      await createMutation.mutateAsync({ name: newGroupName.trim(), joinCode: newGroupJoinCode.trim() });
      toast.success('Group created successfully');
      setCreateDialogOpen(false);
      setNewGroupName('');
      setNewGroupJoinCode('');
    } catch (error: any) {
      const message = error.message || 'Failed to create group';
      toast.error(message);
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      toast.error('Please enter a join code');
      return;
    }

    try {
      await joinMutation.mutateAsync(joinCode.trim());
      toast.success('Joined group successfully');
      setJoinDialogOpen(false);
      setJoinCode('');
    } catch (error: any) {
      let message = 'Failed to join group';
      if (error.message?.includes('Invalid invite code')) {
        message = 'Invalid join code. Please check and try again.';
      } else if (error.message?.includes('Group is full')) {
        message = 'This group has reached its maximum capacity of 45 members.';
      } else if (error.message?.includes('Already a member')) {
        message = 'You are already a member of this group.';
      }
      toast.error(message);
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Groups</h1>
          <p className="text-muted-foreground">Connect with fellow soldiers and share insights</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Join Group</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a Group</DialogTitle>
                <DialogDescription>Enter a join code to join an existing group</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleJoinGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="joinCode">Join Code</Label>
                  <Input
                    id="joinCode"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="Enter join code"
                    disabled={joinMutation.isPending}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={joinMutation.isPending}>
                  {joinMutation.isPending ? 'Joining...' : 'Join Group'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Group</DialogTitle>
                <DialogDescription>Start a new group and set a join code for others to join</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Alpha Team, Morning Warriors"
                    disabled={createMutation.isPending}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupJoinCode">Join Code</Label>
                  <Input
                    id="groupJoinCode"
                    value={newGroupJoinCode}
                    onChange={(e) => setNewGroupJoinCode(e.target.value)}
                    placeholder="Create a code for others to join"
                    disabled={createMutation.isPending}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Choose a memorable code that you can share with others
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Group'}
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
            <h3 className="text-lg font-semibold mb-2">No groups yet</h3>
            <p className="text-muted-foreground mb-4">Create a group or join one with a join code</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
                Join Group
              </Button>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {squads.map((squad) => (
            <Card key={squad.id.toString()} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate({ to: `/groups/${squad.id.toString()}` })}>
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
