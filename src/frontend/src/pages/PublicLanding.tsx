import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Target, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DISCLAIMER_TEXT } from '../content/disclaimer';

export default function PublicLanding() {
  const { login, loginStatus, isLoginError } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src="/assets/generated/dagger-wordmark-transparent.dim_1600x500.png"
              alt="DAGGER - Holistic Health and Fitness"
              className="h-24 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Resilience & Growth</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A personal development platform for soldiers focused on mental readiness, resilience, and team cohesion
          </p>
        </div>

        <Alert className="border-primary/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm whitespace-pre-line">{DISCLAIMER_TEXT}</AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Private Journaling</CardTitle>
              <CardDescription>
                Reflect on your growth, challenges, and positive outcomes from service in a private space
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Groups</CardTitle>
              <CardDescription>
                Connect with fellow soldiers in small groups to share insights and support each other
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Guided Modules</CardTitle>
              <CardDescription>
                Access doctrine-informed content and exercises focused on mental readiness and high performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Sign in with Internet Identity to create your account and start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} disabled={loginStatus === 'logging-in'} size="lg" className="w-full">
              {loginStatus === 'logging-in' ? 'Connecting...' : 'Sign In with Internet Identity'}
            </Button>
            {isLoginError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Login failed. Please try again.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help?{' '}
            <button className="underline hover:text-foreground" onClick={() => window.scrollTo({ top: 0 })}>
              Review the disclaimer
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
