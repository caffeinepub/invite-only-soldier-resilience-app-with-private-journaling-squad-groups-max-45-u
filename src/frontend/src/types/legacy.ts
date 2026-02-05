import type { Principal } from "@dfinity/principal";
import type { Time } from '../backend';

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
