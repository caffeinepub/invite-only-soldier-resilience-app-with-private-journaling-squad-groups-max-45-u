import React from 'react';
import PageScaffold from '../components/layout/PageScaffold';
import ReadinessMeter from '../components/dashboard/ReadinessMeter';
import DailyLoggingPanel from '../components/dashboard/DailyLoggingPanel';
import CoachActionsCard from '../components/dashboard/CoachActionsCard';
import GamificationCard from '../components/dashboard/GamificationCard';
import { useGetReadinessState, useSubmitDailyInput } from '../hooks/useDashboard';
import { useFieldMode } from '../hooks/useFieldMode';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useDashboardRefresh } from '../contexts/DashboardRefreshContext';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export default function DailyDashboard() {
  const readinessState = useGetReadinessState();
  const submitMutation = useSubmitDailyInput();
  const { isFieldMode } = useFieldMode();
  const isOnline = useOnlineStatus();
  const { refreshToken } = useDashboardRefresh();
  const [showRefreshIndicator, setShowRefreshIndicator] = React.useState(false);

  React.useEffect(() => {
    if (refreshToken > 0) {
      setShowRefreshIndicator(true);
      const timer = setTimeout(() => {
        setShowRefreshIndicator(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [refreshToken]);

  const handleSubmit = async (data: {
    sleepScore: number;
    trainingLoadScore: number;
    stressScore: number;
    painScore: number;
  }) => {
    try {
      await submitMutation.mutateAsync(data);
      toast.success('Daily data logged successfully');
    } catch (error) {
      toast.error('Failed to log daily data');
    }
  };

  return (
    <PageScaffold
      title="Daily Dashboard"
      description="Track your readiness and performance"
      maxWidth="6xl"
    >
      {showRefreshIndicator && (
        <div className="flex items-center justify-center py-2">
          <RefreshCw className="h-4 w-4 animate-spin text-primary mr-2" />
          <span className="text-sm text-muted-foreground">Refreshing...</span>
        </div>
      )}

      {!isOnline && (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're offline. All data is stored locally on your device.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ReadinessMeter 
            latestInput={readinessState.latestInput} 
            streak={readinessState.streak} 
          />
          {!isFieldMode && (
            <GamificationCard 
              streak={readinessState.streak} 
              latestInput={readinessState.latestInput} 
            />
          )}
        </div>

        <div className="space-y-6">
          <DailyLoggingPanel 
            onSubmit={handleSubmit}
            isSubmitting={submitMutation.isPending}
            isOffline={!isOnline}
          />
          <CoachActionsCard latestInput={readinessState.latestInput} />
        </div>
      </div>
    </PageScaffold>
  );
}
