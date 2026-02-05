import { useGetAllReports, useUpdateReportStatus } from '../hooks/useQueries';
import { useSafeActor } from '../hooks/useSafeActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import type { ReportStatus } from '../types/legacy';

export default function AdminReports() {
  const { actor } = useSafeActor();
  const { data: reports = [], isLoading } = useGetAllReports();
  const updateStatusMutation = useUpdateReportStatus();

  const backendUnavailable = !actor || !('getAllReports' in actor);

  const handleUpdateStatus = async (reportId: bigint, status: ReportStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ reportId, status });
      toast.success('Report status updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update report status');
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    if (status.__kind__ === 'open') {
      return <Badge variant="destructive">Open</Badge>;
    } else if (status.__kind__ === 'inReview') {
      return <Badge variant="secondary">In Review</Badge>;
    } else {
      return <Badge variant="outline">Resolved</Badge>;
    }
  };

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Reports</h1>
          <p className="text-muted-foreground">Review and manage abuse reports</p>
        </div>
      </div>

      {backendUnavailable && (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Admin reports require backend connectivity. This feature is not available in offline-only mode.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports</h3>
            <p className="text-muted-foreground">
              {backendUnavailable ? 'Reports are not available offline' : 'All clear! No abuse reports to review.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">Report #{report.id.toString()}</CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                    <CardDescription>
                      Reported on{' '}
                      {new Date(Number(report.timestamp) / 1000000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                  <p className="text-sm">{report.reason}</p>
                </div>
                {report.details && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Details</p>
                    <p className="text-sm">{report.details}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {report.status.__kind__ === 'open' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(report.id, { __kind__: 'inReview' })}
                      disabled={updateStatusMutation.isPending || backendUnavailable}
                    >
                      Mark In Review
                    </Button>
                  )}
                  {(report.status.__kind__ === 'open' || report.status.__kind__ === 'inReview') && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(report.id, { __kind__: 'resolved' })}
                      disabled={updateStatusMutation.isPending || backendUnavailable}
                    >
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
