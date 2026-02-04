import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Shield, Info, User } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../content/disclaimer';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SettingsAbout() {
  const { data: userProfile } = useGetCallerUserProfile();

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & About</h1>
        <p className="text-muted-foreground">Your profile and app information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Username</p>
            <p className="text-lg">{userProfile?.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            <p className="text-lg">
              {userProfile?.joinedAt
                ? new Date(Number(userProfile.joinedAt) / 1000000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'Unknown'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Disclaimer Accepted</p>
            <p className="text-lg">
              {userProfile?.disclaimerStatus?.accepted
                ? new Date(Number(userProfile.disclaimerStatus.timestamp) / 1000000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'Not accepted'}
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
            <p className="text-sm font-medium text-muted-foreground">Privacy</p>
            <p className="text-sm">
              Journal entries are private by default. You control what you share and with whom. All shared content is
              visible only to members of the squad you choose.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
