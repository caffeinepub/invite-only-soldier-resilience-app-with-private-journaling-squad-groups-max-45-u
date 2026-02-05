import { useState } from 'react';
import { useGetMySquads, useCreateSquadGroup, useJoinSquadGroup } from '../hooks/useQueries';
import { useSafeActor } from '../hooks/useSafeActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Users, AlertCircle, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function Groups() {
  const navigate = useNavigate();
  const { actor } = useSafeActor();
  const { data: squads = [], isLoading } = useGetMySquads();
  const createMutation = useCreateSquadGroup();
  const joinMutation = useJoinSquadGroup();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newJoinCode, setNewJoinCode] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const backendUnavailable = !actor || !('createSquadGroup' in actor);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || !newJoinCode.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: newGroupName.trim(),
        joinCode: newJoinCode.trim()
      });
      toast.success('Group created successfully');
      setCreateDialogOpen(false);
      setNewGroupName('');
      setNewJoinCode('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create group');
    }
  };

  const handleJoinGroup = async () => {
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
      toast.error(error.message || 'Failed to join group');
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">Connect with fellow soldiers in small groups</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={backendUnavailable}>
                Join Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a Group</DialogTitle>
                <DialogDescription>Enter the join code shared by the group owner</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="joinCode">Join Code</Label>
                  <Input
                    id="joinCode"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter join code..."
                    disabled={joinMutation.isPending}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleJoinGroup} disabled={joinMutation.isPending}>
                  {joinMutation.isPending ? 'Joining...' : 'Join Group'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={backendUnavailable}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>Create a private group and invite members with a join code</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Alpha Squad"
                    disabled={createMutation.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newJoinCode">Join Code</Label>
                  <Input
                    id="newJoinCode"
                    value={newJoinCode}
                    onChange={(e) => setNewJoinCode(e.target.value)}
                    placeholder="Create a join code..."
                    disabled={createMutation.isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Share this code with members you want to invite
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup} disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Group'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {backendUnavailable && (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Groups require backend connectivity. This feature is not available in offline-only mode.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : squads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No groups yet</h3>
            <p className="text-muted-foreground mb-4">
              {backendUnavailable
                ? 'Groups are not available offline'
                : 'Create a new group or join an existing one to get started'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {squads.map((squad) => (
            <Card
              key={squad.id.toString()}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate({ to: `/groups/${squad.id.toString()}` })}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{squad.name}</CardTitle>
                    <CardDescription>{squad.members.length} members</CardDescription>
                  </div>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
