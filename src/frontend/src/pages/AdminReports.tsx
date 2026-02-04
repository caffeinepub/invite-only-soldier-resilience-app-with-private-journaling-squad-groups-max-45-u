import { useGetAllReports, useUpdateReportStatus, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { ReportStatus } from '../backend';

export default function AdminReports() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: reports = [], isLoading: reportsLoading } = useGetAllReports();
  const updateStatusMutation = useUpdateReportStatus();

  if (adminLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-4xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You do not have permission to access this page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleUpdateStatus = async (reportId: bigint, status: ReportStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ reportId, status });
      toast.success('Report status updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update report status');
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.open:
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Open
          </Badge>
        );
      case ReportStatus.inReview:
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            In Review
          </Badge>
        );
      case ReportStatus.resolved:
        return (
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </Badge>
        );
    }
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (a.status === ReportStatus.open && b.status !== ReportStatus.open) return -1;
    if (a.status !== ReportStatus.open && b.status === ReportStatus.open) return 1;
    return Number(b.timestamp - a.timestamp);
  });

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Reports</h1>
          <p className="text-muted-foreground">Review and manage community reports</p>
        </div>
      </div>

      {reportsLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports</h3>
            <p className="text-muted-foreground">There are currently no reports to review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedReports.map((report) => (
            <Card key={report.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">Report #{report.id.toString()}</CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                    <CardDescription>
                      {new Date(Number(report.timestamp) / 1000000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="text-sm">
                      {report.reportedEntry !== undefined ? 'Journal Entry' : 'User'}
                    </p>
                  </div>
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
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reporter</p>
                    <p className="text-xs font-mono">{report.reporter.toString()}</p>
                  </div>
                  {report.reportedEntry !== undefined && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported Entry ID</p>
                      <p className="text-xs font-mono">{report.reportedEntry.toString()}</p>
                    </div>
                  )}
                  {report.reportedUser && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported User</p>
                      <p className="text-xs font-mono">{report.reportedUser.toString()}</p>
                    </div>
                  )}
                </div>

                {report.status !== ReportStatus.resolved && (
                  <div className="flex gap-2">
                    {report.status === ReportStatus.open && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(report.id, ReportStatus.inReview)}
                        disabled={updateStatusMutation.isPending}
                      >
                        Mark In Review
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(report.id, ReportStatus.resolved)}
                      disabled={updateStatusMutation.isPending}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
