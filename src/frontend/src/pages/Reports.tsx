import React, { useState } from 'react';
import { useLocalReports } from '../hooks/useLocalReports';
import PersonalReportEditor from '../components/reports/PersonalReportEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, BookOpen, Video, Award, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { PersonalReport } from '../types/personalReports';

export default function Reports() {
  const { reports, deleteReport } = useLocalReports();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<PersonalReport | null>(null);

  const handleCreate = () => {
    setEditingReport(null);
    setEditorOpen(true);
  };

  const handleEdit = (report: PersonalReport) => {
    setEditingReport(report);
    setEditorOpen(true);
  };

  const handleDelete = (reportId: string) => {
    if (confirm('Delete this report? This action cannot be undone.')) {
      deleteReport(reportId);
    }
  };

  const handleClose = () => {
    setEditorOpen(false);
    setEditingReport(null);
  };

  const getTypeIcon = (type: 'video' | 'book') => {
    return type === 'video' ? <Video className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />;
  };

  const sortedReports = [...reports].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personal Reports</h1>
          <p className="mt-2 text-muted-foreground">
            Document your insights from videos and books. Earn XP for thoughtful reflections.
          </p>
        </div>
        <Button onClick={handleCreate} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          New Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No reports yet</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Start documenting your learning journey. Create your first report to earn XP.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedReports.map((report) => (
            <Card key={report.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="shrink-0">
                        {getTypeIcon(report.type)}
                        <span className="ml-1 capitalize">{report.type}</span>
                      </Badge>
                      {report.submittedAt && report.xpGranted && (
                        <Badge variant="secondary" className="shrink-0">
                          <Award className="mr-1 h-3 w-3" />
                          +{report.xpAwarded} XP
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    {report.metadata && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.type === 'video' && report.metadata.videoUrl && (
                          <span>Video: {report.metadata.videoUrl}</span>
                        )}
                        {report.type === 'book' && report.metadata.bookAuthor && (
                          <span>by {report.metadata.bookAuthor}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(report)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(report.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{report.body}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Created {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                  </span>
                  {report.submittedAt && (
                    <span>
                      • Submitted {formatDistanceToNow(report.submittedAt, { addSuffix: true })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PersonalReportEditor
        open={editorOpen}
        onClose={handleClose}
        editingReport={editingReport}
      />
    </div>
  );
}
