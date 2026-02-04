import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Journaling, SquadGroup, Report, ReportStatus } from '../backend';
import { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}

export function useAcceptInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, inviteCode }: { username: string; inviteCode: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.acceptInvite(username, inviteCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    }
  });
}

export function useAcceptDisclaimer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.acceptDisclaimer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    }
  });
}

export function useGetGlobalInviteCode() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ['globalInviteCode'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getGlobalInviteCode();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useGetMyJournalEntries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Journaling[]>({
    queryKey: ['myJournalEntries'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyJournalEntries();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useAddJournaling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      isShared,
      squadGroup
    }: {
      title: string;
      content: string;
      isShared: boolean;
      squadGroup: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addJournaling(title, content, isShared, squadGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJournalEntries'] });
    }
  });
}

export function useUpdateJournaling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      entryId,
      title,
      content,
      isShared,
      squadGroup
    }: {
      entryId: bigint;
      title: string;
      content: string;
      isShared: boolean;
      squadGroup: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateJournaling(entryId, title, content, isShared, squadGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJournalEntries'] });
      queryClient.invalidateQueries({ queryKey: ['sharedSquadEntries'] });
    }
  });
}

export function useDeleteJournaling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteJournaling(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJournalEntries'] });
      queryClient.invalidateQueries({ queryKey: ['sharedSquadEntries'] });
    }
  });
}

export function useGetMySquads() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SquadGroup[]>({
    queryKey: ['mySquads'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const entries = await actor.getMyJournalEntries();
      const squadIds = new Set<string>();
      entries.forEach((entry) => {
        if (entry.squadGroup !== undefined) {
          squadIds.add(entry.squadGroup.toString());
        }
      });

      const squads: SquadGroup[] = [];
      for (const id of squadIds) {
        try {
          const squad = await actor.getSquadGroup(BigInt(id));
          if (squad) squads.push(squad);
        } catch (e) {
          // Squad might not be accessible
        }
      }
      return squads;
    },
    enabled: !!actor && !actorFetching
  });
}

export function useCreateSquadGroup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createSquadGroup(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
    }
  });
}

export function useJoinSquadGroup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviteCode: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.joinSquadGroup(inviteCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
    }
  });
}

export function useGetSquadGroup(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SquadGroup | null>({
    queryKey: ['squadGroup', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return null;
      return actor.getSquadGroup(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

export function useGetSquadMembers(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['squadMembers', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return [];
      return actor.getSquadMembers(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

export function useLeaveSquadGroup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (squadId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.leaveSquadGroup(squadId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySquads'] });
      queryClient.invalidateQueries({ queryKey: ['squadGroup'] });
      queryClient.invalidateQueries({ queryKey: ['squadMembers'] });
    }
  });
}

export function useRotateSquadInviteCode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (squadId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rotateSquadInviteCode(squadId);
    },
    onSuccess: (_, squadId) => {
      queryClient.invalidateQueries({ queryKey: ['squadGroup', squadId.toString()] });
    }
  });
}

export function useGetSharedSquadEntries(squadId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Journaling[]>({
    queryKey: ['sharedSquadEntries', squadId?.toString()],
    queryFn: async () => {
      if (!actor || !squadId) return [];
      return actor.getSharedSquadEntries(squadId);
    },
    enabled: !!actor && !actorFetching && squadId !== null
  });
}

export function useGetGuidelines() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ['guidelines'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getGuidelines();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useReportAbuse() {
  const { actor } = useActor();

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
      if (!actor) throw new Error('Actor not available');
      return actor.reportAbuse(reportedEntry, reportedUser, reason, details);
    }
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useGetAllReports() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Report[]>({
    queryKey: ['allReports'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllReports();
    },
    enabled: !!actor && !actorFetching
  });
}

export function useUpdateReportStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, status }: { reportId: bigint; status: ReportStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateReportStatus(reportId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReports'] });
    }
  });
}
