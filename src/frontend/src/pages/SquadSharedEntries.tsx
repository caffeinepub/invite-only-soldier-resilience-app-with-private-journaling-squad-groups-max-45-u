import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetSquadGroup, useGetSquadMembers, useGetSharedSquadEntries, useLeaveSquadGroup, useRotateSquadInviteCode } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, Users, FileText, Copy, RefreshCw, LogOut, Flag } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import ReportDialog from '../components/reports/ReportDialog';

export default function SquadSharedEntries() {
  const { squadId } = useParams({ strict: false }) as { squadId: string };
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [reportingEntry, setReportingEntry] = useState<bigint | null>(null);

  const { data: squad, isLoading: squadLoading } = useGetSquadGroup(squadId ? BigInt(squadId) : null);
  const { data: members = [], isLoading: membersLoading } = useGetSquadMembers(squadId ? BigInt(squadId) : null);
  const { data: entries = [], isLoading: entriesLoading } = useGetSharedSquadEntries(squadId ? BigInt(squadId) : null);
  const leaveMutation = useLeaveSquadGroup();
  const rotateMutation = useRotateSquadInviteCode();

  const isOwner = squad && identity && squad.owner.toString() === identity.getPrincipal().toString();

  const handleCopyInviteCode = () => {
    if (squad) {
      navigator.clipboard.writeText(squad.inviteCode);
      toast.success('Invite code copied to clipboard');
    }
  };

  const handleRotateCode = async () => {
    if (!squad) return;
    try {
      await rotateMutation.mutateAsync(squad.id);
      toast.success('Invite code rotated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to rotate invite code');
    }
  };

  const handleLeave = async () => {
    if (!squad) return;
    try {
      await leaveMutation.mutateAsync(squad.id);
      toast.success('Left squad successfully');
      navigate({ to: '/squads' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to leave squad');
    }
  };

  if (squadLoading || membersLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!squad) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Squad not found</h3>
            <Button onClick={() => navigate({ to: '/squads' })}>Back to Squads</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedEntries = [...entries].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/squads' })}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{squad.name}</h1>
          <p className="text-muted-foreground">
            {members.length} {members.length === 1 ? 'member' : 'members'}
          </p>
        </div>
        {!isOwner && (
          <Button variant="outline" onClick={() => setShowLeaveDialog(true)}>
            <LogOut className="h-4 w-4 mr-2" />
            Leave Squad
          </Button>
        )}
      </div>

      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entries">
            <FileText className="h-4 w-4 mr-2" />
            Shared Entries
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-4">
          {entriesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : entries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No shared entries yet</h3>
                <p className="text-muted-foreground">Members can share journal entries with this squad</p>
              </CardContent>
            </Card>
          ) : (
            sortedEntries.map((entry) => {
              const author = members.find((m) => m.joinedAt.toString() === entry.author.toString());
              const isMyEntry = identity && entry.author.toString() === identity.getPrincipal().toString();
              return (
                <Card key={entry.id.toString()}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-xl">{entry.title}</CardTitle>
                          {isMyEntry && <Badge variant="secondary">You</Badge>}
                        </div>
                        <CardDescription>
                          By {author?.username || 'Unknown'} •{' '}
                          {new Date(Number(entry.timestamp) / 1000000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                      {!isMyEntry && (
                        <Button variant="ghost" size="icon" onClick={() => setReportingEntry(entry.id)}>
                          <Flag className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          {isOwner && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Invite Code</CardTitle>
                <CardDescription>Share this code with others to invite them to this squad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-2 bg-muted rounded-md text-lg font-mono">{squad.inviteCode}</code>
                  <Button variant="outline" size="icon" onClick={handleCopyInviteCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleRotateCode} disabled={rotateMutation.isPending}>
                    <RefreshCw className={`h-4 w-4 ${rotateMutation.isPending ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Rotating the code will invalidate the current code and generate a new one
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Members ({members.length}/45)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {members.map((member) => {
                  const isMemberOwner = member.joinedAt.toString() === squad.owner.toString();
                  const isMe = identity && member.joinedAt.toString() === identity.getPrincipal().toString();
                  return (
                    <div key={member.username} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{member.username}</span>
                        {isMemberOwner && <Badge variant="secondary">Owner</Badge>}
                        {isMe && <Badge variant="outline">You</Badge>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Squad?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave {squad.name}? You'll need a new invite code to rejoin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeave}>Leave Squad</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {reportingEntry && (
        <ReportDialog
          reportedEntry={reportingEntry}
          reportedUser={null}
          onClose={() => setReportingEntry(null)}
        />
      )}
    </div>
  );
}
