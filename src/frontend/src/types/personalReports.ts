export type ReportType = 'video' | 'book';

export interface PersonalReport {
  id: string;
  type: ReportType;
  title: string;
  body: string;
  metadata?: {
    videoUrl?: string;
    bookTitle?: string;
    bookAuthor?: string;
  };
  submitted: boolean;
  xpGranted: boolean;
  xpAwarded: number;
  timestamp: number;
  submittedAt?: number;
}

export interface CreateReportInput {
  type: ReportType;
  title: string;
  body: string;
  metadata?: {
    videoUrl?: string;
    bookTitle?: string;
    bookAuthor?: string;
  };
}

export interface UpdateReportInput {
  title?: string;
  body?: string;
  metadata?: {
    videoUrl?: string;
    bookTitle?: string;
    bookAuthor?: string;
  };
}
