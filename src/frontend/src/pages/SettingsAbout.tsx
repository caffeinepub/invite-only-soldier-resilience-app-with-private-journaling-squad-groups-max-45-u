import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalProfile } from '../hooks/useLocalProfile';
import { Shield, Info, User, Code } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../content/disclaimer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SettingsAbout() {
  const { profile, update } = useLocalProfile();
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    update({ displayName: displayName.trim() || undefined });
    setIsEditing(false);
    toast.success('Display name updated');
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & About</h1>
        <p className="text-muted-foreground">Your local profile and app information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Local Profile</CardTitle>
          </div>
          <CardDescription>Stored on this device only</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name or call sign"
                disabled={!isEditing}
                maxLength={30}
              />
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => {
                    setDisplayName(profile.displayName || '');
                    setIsEditing(false);
                  }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Device ID</p>
            <p className="text-xs font-mono bg-muted p-2 rounded mt-1 break-all">{profile.localUuid}</p>
            <p className="text-xs text-muted-foreground mt-1">
              This unique ID is used to store your data locally. Share it with support if you need help.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Profile Created</p>
            <p className="text-sm">
              {new Date(profile.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Disclaimer & Guidelines</p>
            <p className="text-sm">
              {profile.disclaimerAccepted && profile.disclaimerAcceptedAt
                ? `Accepted on ${new Date(profile.disclaimerAcceptedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}`
                : 'Not yet accepted'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Disclaimer</CardTitle>
          </div>
          <CardDescription>Important information about this application</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 rounded-md border p-4">
            <p className="text-sm text-muted-foreground whitespace-pre-line">{DISCLAIMER_TEXT}</p>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>About</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Purpose</p>
            <p className="text-sm">
              This application supports personal growth, mental readiness, resilience, and team cohesion for service
              members through guided reflection and peer connection.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Content Sources</p>
            <p className="text-sm">
              Content is informed by Army doctrine (including FM 7-22), field manuals, and insights from
              high-performance teams and athletes.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Privacy & Data</p>
            <p className="text-sm">
              All your data (journal entries, readiness inputs, streaks) is stored locally on this device only.
              Nothing is sent to a server by default. You control your data completely.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Offline-First</p>
            <p className="text-sm">
              This app works fully offline. No account or internet connection required. Your data stays on your device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
