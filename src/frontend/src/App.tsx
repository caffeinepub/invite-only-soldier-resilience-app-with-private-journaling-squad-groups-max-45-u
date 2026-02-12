import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, Route, RootRoute, RouterProvider, Outlet, ErrorComponent } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import AppShell from './components/layout/AppShell';
import RouteErrorBoundary from './components/system/RouteErrorBoundary';
import DailyDashboard from './pages/DailyDashboard';
import Journal from './pages/Journal';
import Groups from './pages/Groups';
import GroupSharedEntries from './pages/GroupSharedEntries';
import Modules from './pages/Modules';
import MissionRun from './pages/MissionRun';
import Assessments from './pages/Assessments';
import AssessmentHistory from './pages/AssessmentHistory';
import AssessmentRun from './pages/AssessmentRun';
import AssessmentResults from './pages/AssessmentResults';
import AssessmentLeaderView from './pages/AssessmentLeaderView';
import SleepPerformanceDashboard from './pages/SleepPerformanceDashboard';
import SleepPerformanceCheckIn from './pages/SleepPerformanceCheckIn';
import SleepPerformanceAnalysis from './pages/SleepPerformanceAnalysis';
import SleepPerformanceAction from './pages/SleepPerformanceAction';
import MentalPerformanceReading from './pages/MentalPerformanceReading';
import FreeSoldierApps from './pages/FreeSoldierApps';
import MilitaryApps from './pages/MilitaryApps';
import LifeLessonsRemoved from './pages/LifeLessonsRemoved';
import Reports from './pages/Reports';
import Guidelines from './pages/Guidelines';
import SettingsAbout from './pages/SettingsAbout';
import AdminReports from './pages/AdminReports';
import DailyQuotes from './pages/DailyQuotes';
import IZOF from './pages/IZOF';
import IZOFDailyZoneCheck from './pages/IZOFDailyZoneCheck';
import IZOFEducation from './pages/IZOFEducation';
import IZOFRegulationSkills from './pages/IZOFRegulationSkills';
import IZOFStressReadinessDashboard from './pages/IZOFStressReadinessDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Root route with AppShell layout and error boundary
const rootRoute = new RootRoute({
  component: () => (
    <RouteErrorBoundary>
      <AppShell>
        <Outlet />
      </AppShell>
    </RouteErrorBoundary>
  ),
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <ErrorComponent error={error} />
    </div>
  ),
});

// Define all routes - GUARDRAIL: Life Lessons route path must remain unchanged
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DailyDashboard,
});

const quotesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/quotes',
  component: DailyQuotes,
});

const journalRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/journal',
  component: Journal,
});

const groupsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/groups',
  component: Groups,
});

const groupDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/groups/$groupId',
  component: GroupSharedEntries,
});

const modulesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/modules',
  component: Modules,
});

const missionRunRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/modules/$missionId',
  component: MissionRun,
});

const assessmentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/assessments',
  component: Assessments,
});

const assessmentHistoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/assessments/history',
  component: AssessmentHistory,
});

const assessmentRunRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/assessments/run/$assessmentId',
  component: AssessmentRun,
});

const assessmentResultsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/assessments/results/$resultId',
  component: AssessmentResults,
});

const assessmentLeaderViewRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/assessments/leader-view',
  component: AssessmentLeaderView,
});

const sleepRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sleep',
  component: SleepPerformanceDashboard,
});

const sleepCheckInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sleep/check-in',
  component: SleepPerformanceCheckIn,
});

const sleepAnalysisRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sleep/analysis',
  component: SleepPerformanceAnalysis,
});

const sleepActionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sleep/action',
  component: SleepPerformanceAction,
});

const mentalPerformanceReadingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/reading',
  component: MentalPerformanceReading,
});

const freeSoldierAppsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/apps',
  component: FreeSoldierApps,
});

const militaryAppsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/tools/military-apps',
  component: MilitaryApps,
});

// GUARDRAIL: Route path '/mental-performance/life-lessons' remains unchanged
const lifeLessonsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/life-lessons',
  component: LifeLessonsRemoved,
});

const izofRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/izof',
  component: IZOF,
});

const izofDailyZoneCheckRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/izof/daily-zone-check',
  component: IZOFDailyZoneCheck,
});

const izofEducationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/izof/education',
  component: IZOFEducation,
});

const izofRegulationSkillsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/izof/regulation-skills',
  component: IZOFRegulationSkills,
});

const izofDashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/mental-performance/izof/dashboard',
  component: IZOFStressReadinessDashboard,
});

const reportsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/reports',
  component: Reports,
});

const guidelinesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/guidelines',
  component: Guidelines,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsAbout,
});

const adminReportsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin/reports',
  component: AdminReports,
});

// Create router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  quotesRoute,
  journalRoute,
  groupsRoute,
  groupDetailRoute,
  modulesRoute,
  missionRunRoute,
  assessmentsRoute,
  assessmentHistoryRoute,
  assessmentRunRoute,
  assessmentResultsRoute,
  assessmentLeaderViewRoute,
  sleepRoute,
  sleepCheckInRoute,
  sleepAnalysisRoute,
  sleepActionRoute,
  mentalPerformanceReadingRoute,
  freeSoldierAppsRoute,
  militaryAppsRoute,
  lifeLessonsRoute,
  izofRoute,
  izofDailyZoneCheckRoute,
  izofEducationRoute,
  izofRegulationSkillsRoute,
  izofDashboardRoute,
  reportsRoute,
  guidelinesRoute,
  settingsRoute,
  adminReportsRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
