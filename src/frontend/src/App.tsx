import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AppShell from './components/layout/AppShell';
import DailyDashboard from './pages/DailyDashboard';
import Journal from './pages/Journal';
import Groups from './pages/Groups';
import GroupSharedEntries from './pages/GroupSharedEntries';
import Modules from './pages/Modules';
import MissionRun from './pages/MissionRun';
import Assessments from './pages/Assessments';
import AssessmentRun from './pages/AssessmentRun';
import AssessmentResults from './pages/AssessmentResults';
import AssessmentHistory from './pages/AssessmentHistory';
import AssessmentLeaderView from './pages/AssessmentLeaderView';
import Guidelines from './pages/Guidelines';
import SettingsAbout from './pages/SettingsAbout';
import AdminReports from './pages/AdminReports';
import SleepPerformanceDashboard from './pages/SleepPerformanceDashboard';
import SleepPerformanceCheckIn from './pages/SleepPerformanceCheckIn';
import SleepPerformanceAnalysis from './pages/SleepPerformanceAnalysis';
import SleepPerformanceAction from './pages/SleepPerformanceAction';
import { useLocalProfile } from './hooks/useLocalProfile';
import { useState } from 'react';

function RootComponent() {
  const { needsOnboarding } = useLocalProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Allow users to defer onboarding - it's not blocking
  if (needsOnboarding && showOnboarding) {
    return <OnboardingFlow onSkip={() => setShowOnboarding(false)} />;
  }

  return <AppShell onShowOnboarding={() => setShowOnboarding(true)} needsOnboarding={needsOnboarding} />;
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DailyDashboard
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

const missionRunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/modules/$missionId',
  component: MissionRun
});

const assessmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessments',
  component: Assessments
});

const assessmentRunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessments/run/$assessmentId',
  component: AssessmentRun
});

const assessmentResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessments/results/$resultId',
  component: AssessmentResults
});

const assessmentHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessments/history',
  component: AssessmentHistory
});

const assessmentLeaderViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessments/leader-view',
  component: AssessmentLeaderView
});

const sleepPerformanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sleep',
  component: SleepPerformanceDashboard
});

const sleepCheckInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sleep/check-in',
  component: SleepPerformanceCheckIn
});

const sleepAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sleep/analysis',
  component: SleepPerformanceAnalysis
});

const sleepActionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sleep/action',
  component: SleepPerformanceAction
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

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  journalRoute,
  groupsRoute,
  groupEntriesRoute,
  modulesRoute,
  missionRunRoute,
  assessmentsRoute,
  assessmentRunRoute,
  assessmentResultsRoute,
  assessmentHistoryRoute,
  assessmentLeaderViewRoute,
  sleepPerformanceRoute,
  sleepCheckInRoute,
  sleepAnalysisRoute,
  sleepActionRoute,
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
