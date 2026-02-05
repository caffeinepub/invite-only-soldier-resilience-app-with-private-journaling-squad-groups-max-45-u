import type { Principal } from "@icp-sdk/core/principal";

export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface DisclaimerStatus {
    timestamp: Time;
    accepted: boolean;
}

export type Time = bigint;

export interface UserProfile {
    username: string;
    joinedAt: Time;
    inviteCode: string;
    disclaimerStatus?: DisclaimerStatus;
}

export interface DailyInput {
    painScore: bigint;
    overallScore: bigint;
    sleepScore: bigint;
    trainingLoadScore: bigint;
    stressScore: bigint;
    timestamp: Time;
    explanations: string;
}

export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}

// Stub types for missing backend functionality
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

export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateReadinessAndStoreToday(sleepScore: bigint, trainingLoadScore: bigint, stressScore: bigint, painScore: bigint): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardData(): Promise<[string, DailyInput | null, bigint]>;
    getUserProfile(_user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(_profile: UserProfile): Promise<void>;
    
    // Stub methods for missing backend functionality
    registerUser?(username: string): Promise<void>;
    acceptDisclaimer?(): Promise<void>;
    getMyJournalEntries?(): Promise<Journaling[]>;
    addJournaling?(title: string, content: string, isShared: boolean, squadGroup: bigint | null): Promise<bigint>;
    updateJournaling?(entryId: bigint, title: string, content: string, isShared: boolean, squadGroup: bigint | null): Promise<void>;
    deleteJournaling?(entryId: bigint): Promise<void>;
    createSquadGroup?(name: string, joinCode: string): Promise<bigint>;
    joinSquadGroup?(joinCode: string): Promise<bigint>;
    getSquadGroup?(squadId: bigint): Promise<SquadGroup | null>;
    getSquadMembers?(squadId: bigint): Promise<UserProfile[]>;
    leaveSquadGroup?(squadId: bigint): Promise<void>;
    rotateSquadInviteCode?(squadId: bigint): Promise<string>;
    getSharedSquadEntries?(squadId: bigint): Promise<Journaling[]>;
    getGuidelines?(): Promise<string>;
    reportAbuse?(reportedEntry: bigint | null, reportedUser: Principal | null, reason: string, details: string | null): Promise<bigint>;
    getAllReports?(): Promise<Report[]>;
    updateReportStatus?(reportId: bigint, status: ReportStatus): Promise<void>;
}
