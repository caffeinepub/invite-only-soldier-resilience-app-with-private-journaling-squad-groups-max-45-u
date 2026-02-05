import { useState } from 'react';
import { useLocalProfile } from '../../hooks/useLocalProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DISCLAIMER_TEXT } from '../../content/disclaimer';

interface OnboardingFlowProps {
  onSkip: () => void;
}

export default function OnboardingFlow({ onSkip }: OnboardingFlowProps) {
  const { profile, update } = useLocalProfile();
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);
  const [whatBroughtYouHere, setWhatBroughtYouHere] = useState(profile.whatBroughtYouHere || '');

  const handleComplete = () => {
    update({
      displayName: displayName.trim() || undefined,
      disclaimerAccepted: acceptedDisclaimer,
      disclaimerAcceptedAt: Date.now(),
      guidelinesAccepted: acceptedGuidelines,
      guidelinesAcceptedAt: Date.now(),
      whatBroughtYouHere: whatBroughtYouHere || undefined,
    });
    onSkip();
  };

  const canComplete = acceptedDisclaimer && acceptedGuidelines;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/generated/dagger-icon-mark.dim_256x256.png"
              alt="DAGGER"
              className="h-16 w-16 object-contain"
            />
          </div>
          <CardTitle>Welcome to Resilience</CardTitle>
          <CardDescription>Let's get you set up (you can skip and do this later)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name or Call Sign (Optional)</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How should we address you?"
                maxLength={30}
              />
              <p className="text-xs text-muted-foreground">
                This is stored locally on your device only
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatBrought">What brought you here? (Optional)</Label>
              <Select value={whatBroughtYouHere} onValueChange={setWhatBroughtYouHere}>
                <SelectTrigger id="whatBrought">
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal-growth">Personal growth and resilience</SelectItem>
                  <SelectItem value="team-cohesion">Team cohesion and leadership</SelectItem>
                  <SelectItem value="mental-readiness">Mental readiness and performance</SelectItem>
                  <SelectItem value="peer-support">Peer support and connection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                />
                <label htmlFor="guidelines" className="text-sm leading-none peer-disabled:cursor-not-allowed">
                  I agree to follow the community guidelines
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onSkip} className="flex-1">
                Skip for Now
              </Button>
              <Button onClick={handleComplete} disabled={!canComplete} className="flex-1">
                Complete Setup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
