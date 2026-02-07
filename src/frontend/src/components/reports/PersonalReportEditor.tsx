import { useState, useEffect } from 'react';
import { useLocalReports } from '../../hooks/useLocalReports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Award, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { PersonalReport, ReportType } from '../../types/personalReports';
import { calculateReportXP } from '../../utils/reportXp';

interface PersonalReportEditorProps {
  open: boolean;
  onClose: () => void;
  editingReport: PersonalReport | null;
}

export default function PersonalReportEditor({ open, onClose, editingReport }: PersonalReportEditorProps) {
  const { createReport, updateReport, submitReport } = useLocalReports();
  const [type, setType] = useState<ReportType>('video');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editingReport;
  const isSubmitted = editingReport?.submitted && editingReport?.xpGranted;

  useEffect(() => {
    if (editingReport) {
      setType(editingReport.type);
      setTitle(editingReport.title);
      setBody(editingReport.body);
      if (editingReport.metadata) {
        setVideoUrl(editingReport.metadata.videoUrl || '');
        setBookTitle(editingReport.metadata.bookTitle || '');
        setBookAuthor(editingReport.metadata.bookAuthor || '');
      }
    } else {
      resetForm();
    }
  }, [editingReport, open]);

  const resetForm = () => {
    setType('video');
    setTitle('');
    setBody('');
    setVideoUrl('');
    setBookTitle('');
    setBookAuthor('');
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!body.trim()) {
      toast.error('Please write your report');
      return;
    }

    const metadata = type === 'video'
      ? { videoUrl: videoUrl.trim() || undefined }
      : {
          bookTitle: bookTitle.trim() || undefined,
          bookAuthor: bookAuthor.trim() || undefined,
        };

    const xpAwarded = calculateReportXP(body.trim());

    if (isEditing && editingReport) {
      updateReport(editingReport.id, {
        title: title.trim(),
        body: body.trim(),
        metadata,
      });
      toast.success('Report saved');
    } else {
      createReport({
        type,
        title: title.trim(),
        body: body.trim(),
        metadata,
        xpAwarded,
      });
      toast.success('Report created');
    }

    onClose();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!body.trim()) {
      toast.error('Please write your report');
      return;
    }

    setIsSubmitting(true);

    try {
      const metadata = type === 'video'
        ? { videoUrl: videoUrl.trim() || undefined }
        : {
            bookTitle: bookTitle.trim() || undefined,
            bookAuthor: bookAuthor.trim() || undefined,
          };

      const xpAwarded = calculateReportXP(body.trim());
      let reportId: string;

      if (isEditing && editingReport) {
        updateReport(editingReport.id, {
          title: title.trim(),
          body: body.trim(),
          metadata,
        });
        reportId = editingReport.id;
      } else {
        const newReport = createReport({
          type,
          title: title.trim(),
          body: body.trim(),
          metadata,
          xpAwarded,
        });
        reportId = newReport.id;
      }

      submitReport(reportId);

      toast.success(`Report submitted! Earned ${xpAwarded} Dagger points`, {
        icon: <Award className="h-4 w-4" />,
      });

      onClose();
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedXP = calculateReportXP(body);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (isSubmitted ? 'View Report' : 'Edit Report') : 'New Report'}
          </DialogTitle>
          <DialogDescription>
            {isSubmitted
              ? 'This report has been submitted and earned XP.'
              : 'Write a detailed report to earn Dagger points based on length.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Report Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ReportType)} disabled={isSubmitted}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="book">Book</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter report title"
              disabled={isSubmitted}
            />
          </div>

          {type === 'video' && (
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL (optional)</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                disabled={isSubmitted}
              />
            </div>
          )}

          {type === 'book' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bookTitle">Book Title (optional)</Label>
                <Input
                  id="bookTitle"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter book title"
                  disabled={isSubmitted}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookAuthor">Author (optional)</Label>
                <Input
                  id="bookAuthor"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Enter author name"
                  disabled={isSubmitted}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="body">Report *</Label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{body.length} characters</span>
                {!isSubmitted && estimatedXP > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Award className="h-3 w-3" />
                    ~{estimatedXP} XP
                  </Badge>
                )}
              </div>
            </div>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your detailed report here..."
              className="min-h-[300px] font-mono text-sm"
              disabled={isSubmitted}
            />
          </div>
        </div>

        <DialogFooter>
          {isSubmitted ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleSave} disabled={isSubmitting}>
                Save Draft
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2" />}
                Submit & Earn XP
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
