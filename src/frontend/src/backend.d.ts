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
    acceptDisclaimer(): Promise<void>;
    acceptInvite(username: string, inviteCode: string): Promise<void>;
    addJournaling(title: string, content: string, isShared: boolean, squadGroup: bigint | null): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createSquadGroup(name: string): Promise<bigint>;
    deleteJournaling(entryId: bigint): Promise<void>;
    getAllReports(): Promise<Array<Report>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGlobalInviteCode(): Promise<string>;
    getGuidelines(): Promise<string>;
    getJournaling(entryId: bigint): Promise<Journaling | null>;
    getMyJournalEntries(): Promise<Array<Journaling>>;
    getReport(reportId: bigint): Promise<Report | null>;
    getSharedSquadEntries(squadId: bigint): Promise<Array<Journaling>>;
    getSquadGroup(squadId: bigint): Promise<SquadGroup | null>;
    getSquadMembers(squadId: bigint): Promise<Array<UserProfile>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    joinSquadGroup(inviteCode: string): Promise<bigint>;
    leaveSquadGroup(squadId: bigint): Promise<void>;
    reportAbuse(reportedEntry: bigint | null, reportedUser: Principal | null, reason: string, details: string | null): Promise<bigint>;
    rotateSquadInviteCode(squadId: bigint): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateJournaling(entryId: bigint, title: string, content: string, isShared: boolean, squadGroup: bigint | null): Promise<void>;
    updateReportStatus(reportId: bigint, status: ReportStatus): Promise<void>;
}
