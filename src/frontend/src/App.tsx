import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import PublicLanding from './pages/PublicLanding';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AppShell from './components/layout/AppShell';
import Journal from './pages/Journal';
import Squads from './pages/Squads';
import SquadSharedEntries from './pages/SquadSharedEntries';
import Modules from './pages/Modules';
import Guidelines from './pages/Guidelines';
import SettingsAbout from './pages/SettingsAbout';
import AdminReports from './pages/AdminReports';

function RootComponent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
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

const squadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/squads',
  component: Squads
});

const squadEntriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/squads/$squadId',
  component: SquadSharedEntries
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
  squadsRoute,
  squadEntriesRoute,
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
