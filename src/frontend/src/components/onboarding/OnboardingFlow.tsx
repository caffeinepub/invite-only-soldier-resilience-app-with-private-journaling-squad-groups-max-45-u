import { useState } from 'react';
import { useAcceptInvite, useAcceptDisclaimer, useGetGlobalInviteCode } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../../content/disclaimer';
import { normalizeInviteCode } from '../../utils/inviteCode';

export default function OnboardingFlow() {
  const [step, setStep] = useState<'invite' | 'disclaimer'>('invite');
  const [username, setUsername] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);

  const acceptInviteMutation = useAcceptInvite();
  const acceptDisclaimerMutation = useAcceptDisclaimer();
  const { refetch: fetchGlobalInviteCode, isFetching: isFetchingCode } = useGetGlobalInviteCode();

  const handleGetInviteCode = async () => {
    try {
      const result = await fetchGlobalInviteCode();
      if (result.data) {
        setInviteCode(result.data);
      }
    } catch (error: any) {
      // Error will be shown via getErrorMessage
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const normalizedCode = normalizeInviteCode(inviteCode);
      await acceptInviteMutation.mutateAsync({ username: username.trim(), inviteCode: normalizedCode });
      setStep('disclaimer');
    } catch (error: any) {
      // Error will be shown via mutation state
    }
  };

  const handleDisclaimerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedDisclaimer || !acceptedGuidelines) return;

    try {
      await acceptDisclaimerMutation.mutateAsync();
    } catch (error: any) {
      // Error will be shown via mutation state
    }
  };

  const getErrorMessage = (error: any): string => {
    if (!error) return '';
    const message = error.message || String(error);
    if (message.includes('Maximum number of users reached')) {
      return 'This app has reached its maximum capacity of 45 users. Registration is currently closed.';
    }
    if (message.includes('Invalid invite code')) {
      return 'The invite code you entered is invalid. Please check and try again.';
    }
    if (message.includes('Username already taken')) {
      return 'This username is already taken. Please choose a different one.';
    }
    if (message.includes('User already registered')) {
      return 'You are already registered. Please refresh the page.';
    }
    return 'An error occurred. Please try again.';
  };

  if (step === 'invite') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/generated/dagger-icon-mark.dim_256x256.png"
                alt="DAGGER"
                className="h-16 w-16 object-contain"
              />
            </div>
            <CardTitle>Join the Community</CardTitle>
            <CardDescription>Enter your invite code and choose a username to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="inviteCode"
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter your invite code"
                    required
                    disabled={acceptInviteMutation.isPending || isFetchingCode}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetInviteCode}
                    disabled={acceptInviteMutation.isPending || isFetchingCode}
                  >
                    {isFetchingCode ? 'Loading...' : 'Get Code'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Invite code is not case-sensitive
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  minLength={3}
                  maxLength={20}
                  disabled={acceptInviteMutation.isPending}
                />
                <p className="text-xs text-muted-foreground">
                  This username will be visible to other members in your squads
                </p>
              </div>

              {acceptInviteMutation.isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{getErrorMessage(acceptInviteMutation.error)}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={acceptInviteMutation.isPending}>
                {acceptInviteMutation.isPending ? 'Registering...' : 'Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/generated/dagger-icon-mark.dim_256x256.png"
              alt="DAGGER"
              className="h-12 w-12 object-contain"
            />
          </div>
          <CardTitle>Important Information</CardTitle>
          <CardDescription>Please review and accept the following before continuing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDisclaimerSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Disclaimer</h3>
                <ScrollArea className="h-32 rounded-md border p-4">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{DISCLAIMER_TEXT}</p>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Community Guidelines</h3>
                <ScrollArea className="h-32 rounded-md border p-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>Be Respectful:</strong> Treat all members with dignity and respect. We are here to
                      support each other's growth.
                    </p>
                    <p>
                      <strong>Be Constructive:</strong> Share insights and reflections that help build resilience and
                      team cohesion.
                    </p>
                    <p>
                      <strong>Be Positive:</strong> Focus on growth, learning, and the positive outcomes of service.
                    </p>
                    <p>
                      <strong>Maintain Privacy:</strong> Do not share operational details, classified information, or
                      personal information about others.
                    </p>
                    <p>
                      <strong>Report Concerns:</strong> If you see content that violates these guidelines, please report
                      it.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="disclaimer"
                  checked={acceptedDisclaimer}
                  onCheckedChange={(checked) => setAcceptedDisclaimer(checked === true)}
                  disabled={acceptDisclaimerMutation.isPending}
                />
                <label htmlFor="disclaimer" className="text-sm leading-none peer-disabled:cursor-not-allowed">
                  I have read and understand the disclaimer
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="guidelines"
                  checked={acceptedGuidelines}
                  onCheckedChange={(checked) => setAcceptedGuidelines(checked === true)}
                  disabled={acceptDisclaimerMutation.isPending}
                />
                <label htmlFor="guidelines" className="text-sm leading-none peer-disabled:cursor-not-allowed">
                  I agree to follow the community guidelines
                </label>
              </div>
            </div>

            {acceptDisclaimerMutation.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{getErrorMessage(acceptDisclaimerMutation.error)}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!acceptedDisclaimer || !acceptedGuidelines || acceptDisclaimerMutation.isPending}
            >
              {acceptDisclaimerMutation.isPending ? 'Processing...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
