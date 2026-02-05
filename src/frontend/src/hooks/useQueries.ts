/**
 * React Query Hooks
 * 
 * This file contains hooks for both local-only and optional backend operations.
 * 
 * LOCAL-ONLY (always available):
 * - Journal operations (useLocalJournalEntries from useLocalData.ts)
 * - Daily readiness inputs (useLocalDailyInputs from useLocalData.ts)
 * 
 * BACKEND-DEPENDENT (gracefully degrade when unavailable):
 * - Groups/squads (requires backend)
 * - Admin reports (requires backend)
 * - Guidelines (has local fallback)
 * 
 * Future seam: Optional cloud sync could be added here by:
 * 1. Reading from local store first (fast, always works)
 * 2. Optionally syncing to backend when online and opted-in
 * 3. Merging remote changes back to local store
 * 4. Never blocking on backend availability
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSafeActor } from './useSafeActor';
import type { UserProfile } from '../backend';
import type { SquadGroup, Report, ReportStatus, Journaling } from '../types/legacy';
import { Principal } from '@dfinity/principal';
import { normalizeInviteCode } from '../utils/inviteCode';

// Groups (backend-dependent, gracefully degrade)
export function useGetMySquads() {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<SquadGroup[]>({
    queryKey: ['mySquads'],
    queryFn: async () => {
      if (!actor) return [];
      if (!('getMyJournalEntries' in actor) || !('getSquadGroup' in actor)) return [];
      
      // This is a stub - backend doesn't fully support groups yet
      return [];
    },
    enabled: !!actor && !actorFetching
  });
}

export function useCreateSquadGroup() {
  const { actor } = useSafeActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, joinCode }: { name: string; joinCode: string }) => {
      if (!actor) throw new Error('Backend not available');
      if (!('createSquadGroup' in actor)) throw new Error('Groups feature not available offline');
      const normalizedCode = normalizeInviteCode(joinCode);
      return (actor as any).createSquadGroup(name, normalizedCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
    }
  });
}

export function useJoinSquadGroup() {
  const { actor } = useSafeActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (joinCode: string) => {
      if (!actor) throw new Error('Backend not available');
      if (!('joinSquadGroup' in actor)) throw new Error('Groups feature not available offline');
      const normalizedCode = normalizeInviteCode(joinCode);
      return (actor as any).joinSquadGroup(normalizedCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
    }
  });
}

export function useGetSquadGroup(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<SquadGroup | null>({
    queryKey: ['squadGroup', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return null;
      if (!('getSquadGroup' in actor)) return null;
      return (actor as any).getSquadGroup(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

export function useGetSquadMembers(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<UserProfile[]>({
    queryKey: ['squadMembers', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return [];
      if (!('getSquadMembers' in actor)) return [];
      return (actor as any).getSquadMembers(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

export function useLeaveSquadGroup() {
  const { actor } = useSafeActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (squadId: bigint) => {
      if (!actor) throw new Error('Backend not available');
      if (!('leaveSquadGroup' in actor)) throw new Error('Groups feature not available offline');
      await (actor as any).leaveSquadGroup(squadId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
      queryClient.invalidateQueries({ queryKey: ['squadGroup'] });
    }
  });
}

export function useRotateSquadInviteCode() {
  const { actor } = useSafeActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (squadId: bigint) => {
      if (!actor) throw new Error('Backend not available');
      if (!('rotateSquadInviteCode' in actor)) throw new Error('Groups feature not available offline');
      return (actor as any).rotateSquadInviteCode(squadId);
    },
    onSuccess: (_, squadId) => {
      queryClient.invalidateQueries({ queryKey: ['squadGroup', squadId.toString()] });
    }
  });
}

export function useGetSharedSquadEntries(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<Journaling[]>({
    queryKey: ['sharedSquadEntries', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return [];
      if (!('getSharedSquadEntries' in actor)) return [];
      return (actor as any).getSharedSquadEntries(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

// Guidelines (has local fallback)
export function useGetGuidelines() {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<string>({
    queryKey: ['guidelines'],
    queryFn: async () => {
      if (!actor) {
        // Local fallback
        return 'Community Guidelines\n\nBe Respectful • Be Constructive • Be Positive • Maintain Privacy • Report Concerns';
      }
      if (!('getGuidelines' in actor)) {
        return 'Community Guidelines\n\nBe Respectful • Be Constructive • Be Positive • Maintain Privacy • Report Concerns';
      }
      return (actor as any).getGuidelines();
    },
    enabled: !!actor && !actorFetching
  });
}

// Reporting (backend-dependent)
export function useReportAbuse() {
  const { actor } = useSafeActor();

  return useMutation({
    mutationFn: async ({
      reportedEntry,
      reportedUser,
      reason,
      details
    }: {
      reportedEntry: bigint | null;
      reportedUser: Principal | null;
      reason: string;
      details: string | null;
    }) => {
      if (!actor) throw new Error('Backend not available');
      if (!('reportAbuse' in actor)) throw new Error('Reporting feature not available offline');
      return (actor as any).reportAbuse(reportedEntry, reportedUser, reason, details);
    }
  });
}

// Admin (backend-dependent)
export function useGetAllReports() {
  const { actor, isFetching: actorFetching } = useSafeActor();

  return useQuery<Report[]>({
    queryKey: ['allReports'],
    queryFn: async () => {
      if (!actor) return [];
      if (!('getAllReports' in actor)) return [];
      return (actor as any).getAllReports();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useUpdateReportStatus() {
  const { actor } = useSafeActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, status }: { reportId: bigint; status: ReportStatus }) => {
      if (!actor) throw new Error('Backend not available');
      if (!('updateReportStatus' in actor)) throw new Error('Admin features not available offline');
      await (actor as any).updateReportStatus(reportId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReports'] });
    }
  });
}
