import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFieldMode } from '../hooks/useFieldMode';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useDashboardData, useSubmitDailyInput } from '../hooks/useDashboard';
import ReadinessMeter from '../components/dashboard/ReadinessMeter';
import DailyLoggingPanel from '../components/dashboard/DailyLoggingPanel';
import CoachActionsCard from '../components/dashboard/CoachActionsCard';
import GamificationCard from '../components/dashboard/GamificationCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDashboardRefresh } from '../contexts/DashboardRefreshContext';

export default function DailyDashboard() {
  const { isFieldMode } = useFieldMode();
  const { isOnline } = useOnlineStatus();
  const { data: dashboardData, isLoading, refetch } = useDashboardData();
  const submitMutation = useSubmitDailyInput();
  const { refreshToken } = useDashboardRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refetch when coming back online
  useEffect(() => {
    if (isOnline) {
      refetch();
    }
  }, [isOnline, refetch]);

  // Handle dashboard refresh requests
  useEffect(() => {
    if (refreshToken > 0) {
      setIsRefreshing(true);
      const timer = setTimeout(() => {
        setIsRefreshing(false);
      }, 800);
      refetch();
      return () => clearTimeout(timer);
    }
  }, [refreshToken, refetch]);

  const isSyncing = submitMutation.isPending;
  const hasPendingChanges = !isOnline && submitMutation.variables !== undefined;

  if (isLoading && !isRefreshing) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container py-6 ${isFieldMode ? 'field-mode' : ''}`}>
      {/* Refreshing Indicator */}
      {isRefreshing && (
        <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <RefreshCw className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Refreshing dashboard...
          </AlertDescription>
        </Alert>
      )}

      {/* Offline Status Banner */}
      {!isOnline && (
        <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <WifiOff className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            You're offline. Changes will sync when connection is restored.
            {hasPendingChanges && ' (Pending changes queued)'}
          </AlertDescription>
        </Alert>
      )}

      {/* Syncing Indicator */}
      {isSyncing && (
        <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Syncing your data...
          </AlertDescription>
        </Alert>
      )}

      {/* Success Confirmation */}
      {submitMutation.isSuccess && !isSyncing && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950/20">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Data saved successfully
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Readiness</h1>
          <p className="text-muted-foreground mt-1">
            {dashboardData?.explanation || 'Track your performance factors and optimize readiness'}
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className={`grid gap-6 ${isFieldMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Readiness Overview */}
          <Card className={isFieldMode ? 'border-2' : ''}>
            <CardHeader>
              <CardTitle>Readiness Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ReadinessMeter
                latestInput={dashboardData?.latestInput || null}
                streak={dashboardData?.streak || 0}
              />
            </CardContent>
          </Card>

          {/* Quick Logging */}
          <Card className={isFieldMode ? 'border-2' : ''}>
            <CardHeader>
              <CardTitle>Log Today's Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyLoggingPanel
                onSubmit={(data) => submitMutation.mutate(data)}
                isSubmitting={isSyncing}
                isOffline={!isOnline}
              />
            </CardContent>
          </Card>
        </div>

        {/* Secondary Cards - Hidden in Field Mode */}
        {!isFieldMode && (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Coaching Actions */}
            <CoachActionsCard
              latestInput={dashboardData?.latestInput || null}
              streak={dashboardData?.streak || 0}
            />

            {/* Gamification */}
            <GamificationCard
              streak={dashboardData?.streak || 0}
              latestInput={dashboardData?.latestInput || null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
