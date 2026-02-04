import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useSafeActor } from './hooks/useSafeActor';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useQueryClient } from '@tanstack/react-query';
import PublicLanding from './pages/PublicLanding';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AppShell from './components/layout/AppShell';
import Journal from './pages/Journal';
import Groups from './pages/Groups';
import GroupSharedEntries from './pages/GroupSharedEntries';
import Modules from './pages/Modules';
import Guidelines from './pages/Guidelines';
import SettingsAbout from './pages/SettingsAbout';
import AdminReports from './pages/AdminReports';
import AppStartupErrorState from './components/system/AppStartupErrorState';

function RootComponent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isError: actorError, retry: retryActor } = useSafeActor();
  const { 
    data: userProfile, 
    isLoading: profileLoading, 
    isFetched,
    isError: profileError,
    refetch: refetchProfile 
  } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  // Show loading state during initialization
  if (isInitializing || (isAuthenticated && profileLoading && !isFetched)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle actor initialization errors
  if (isAuthenticated && actorError) {
    return (
      <AppStartupErrorState
        title="App Initialization Failed"
        message="Unable to connect to the application backend. Please try again."
        onRetry={() => {
          retryActor();
          queryClient.invalidateQueries();
        }}
      />
    );
  }

  // Handle profile loading errors after successful actor init
  if (isAuthenticated && profileError && isFetched) {
    return (
      <AppStartupErrorState
        title="Profile Load Failed"
        message="Unable to load your profile. Please try again."
        onRetry={() => {
          refetchProfile();
        }}
      />
    );
  }

  const needsOnboarding = isAuthenticated && isFetched && (!userProfile || !userProfile.disclaimerStatus?.accepted);

  if (needsOnboarding) {
    return <OnboardingFlow />;
  }

  if (!isAuthenticated) {
    return <PublicLanding />;
  }

  return <AppShell />;
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal',
  component: Journal
});

const groupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups',
  component: Groups
});

const groupEntriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups/$squadId',
  component: GroupSharedEntries
});

const modulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/modules',
  component: Modules
});

const guidelinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guidelines',
  component: Guidelines
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsAbout
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reports',
  component: AdminReports
});

function IndexComponent() {
  const { identity } = useInternetIdentity();
  if (identity) {
    return <Journal />;
  }
  return <PublicLanding />;
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  journalRoute,
  groupsRoute,
  groupEntriesRoute,
  modulesRoute,
  guidelinesRoute,
  settingsRoute,
  adminReportsRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
