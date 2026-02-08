import type { Principal } from "@dfinity/principal";
import type { Time } from '../backend';
import type { EmotionCategory, TaskType, ZoneRecommendation, PerformanceOutcome } from './izof';

// Legacy types for features that are not yet implemented in the current backend
// These types allow the existing Journal, Groups, and Admin pages to compile
// but the features will not work until the backend is updated

export interface Journaling {
    id: bigint;
    author: Principal;
    title: string;
    content: string;
    isShared: boolean;
    squadGroup?: bigint;
    timestamp: Time;
}

export interface SquadGroup {
    id: bigint;
    name: string;
    owner: Principal;
    members: Principal[];
    createdAt: Time;
    inviteCode: string;
    inviteCreatedAt: Time;
}

export interface Report {
    id: bigint;
    reporter: Principal;
    reportedEntry?: bigint;
    reportedUser?: Principal;
    reason: string;
    details?: string;
    status: ReportStatus;
    timestamp: Time;
}

export type ReportStatus = 
    | { __kind__: 'open' }
    | { __kind__: 'inReview' }
    | { __kind__: 'resolved' };

// IZOF Types (matching actual app usage with proper emotion types)
export interface IZOFEntry {
    id: string;
    date: string; // YYYY-MM-DD
    timestamp: number;
    stressRating: number; // 0-10
    emotions: EmotionCategory[];
    upcomingTask: TaskType;
    recommendation: ZoneRecommendation;
    guidanceText: string;
    performanceOutcome?: PerformanceOutcome;
    reflection?: string;
}

export interface IZOFRange {
    min?: number;
    max?: number;
    low?: number;
    high?: number;
}

export interface IZOFSettings {
    coachViewEnabled: boolean;
    rangeOverride: IZOFRange | null;
}

// Personal Reports Types (matching actual app usage)
export interface PersonalReport {
    id: string;
    type: 'video' | 'book';
    title: string;
    body: string;
    metadata?: {
        videoUrl?: string;
        bookTitle?: string;
        author?: string;
        bookAuthor?: string;
    };
    isSubmitted: boolean;
    submitted: boolean;
    xpAwarded: number;
    xpGranted: boolean;
    createdAt: number;
    updatedAt: number;
    timestamp: number;
    submittedAt?: number;
}
