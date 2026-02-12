import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ReadinessState {
    highReadinessDays: bigint;
    totalInputs: bigint;
    lastInputTimestamp: Time;
    streakCount: bigint;
}
export interface Journaling {
    id: bigint;
    title: string;
    content: string;
    author: Principal;
    isShared: boolean;
    squadGroup?: bigint;
    timestamp: Time;
}
export interface DisclaimerStatus {
    timestamp: Time;
    accepted: boolean;
}
export interface SquadGroup {
    id: bigint;
    inviteCreatedAt: Time;
    members: Array<Principal>;
    owner: Principal;
    name: string;
    createdAt: Time;
    inviteCode: string;
}
export interface Report {
    id: bigint;
    reportedEntry?: bigint;
    status: ReportStatus;
    reportedUser?: Principal;
    timestamp: Time;
    details?: string;
    reporter: Principal;
    reason: string;
}
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
export enum ReportStatus {
    resolved = "resolved",
    open = "open",
    inReview = "inReview"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createJournalEntry(entry: {
        title: string;
        content: string;
        isShared: boolean;
        squadGroup?: bigint;
    }): Promise<bigint>;
    createReport(reportedEntry: bigint | null, reportedUser: Principal | null, reason: string, details: string | null): Promise<bigint>;
    createSquadGroup(name: string, inviteCode: string): Promise<bigint>;
    getAllReports(): Promise<Array<Report>>;
    getCallerDailyInputs(): Promise<Array<DailyInput>>;
    getCallerJournalEntries(): Promise<Array<Journaling>>;
    getCallerReadinessState(): Promise<ReadinessState | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJournalEntry(id: bigint): Promise<Journaling | null>;
    getLiveLink(): Promise<string>;
    getReport(id: bigint): Promise<Report | null>;
    getSquadGroup(id: bigint): Promise<SquadGroup | null>;
    getUserDailyInputs(user: Principal): Promise<Array<DailyInput>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    joinSquadGroup(id: bigint, inviteCode: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitDailyInput(input: DailyInput): Promise<void>;
    updateCallerReadinessState(state: ReadinessState): Promise<void>;
    updateReportStatus(id: bigint, status: ReportStatus): Promise<void>;
}
