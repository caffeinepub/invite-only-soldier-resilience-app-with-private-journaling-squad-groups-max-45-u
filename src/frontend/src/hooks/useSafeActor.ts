import { useInternetIdentity } from './useInternetIdentity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type backendInterface } from '../backend';
import { createActorWithConfig } from '../config';

const SAFE_ACTOR_QUERY_KEY = 'safeActor';

export function useSafeActor() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [initWarning, setInitWarning] = useState<string | null>(null);

  const actorQuery = useQuery<backendInterface>({
    queryKey: [SAFE_ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      setInitWarning(null);
      const isAuthenticated = !!identity;

      if (!isAuthenticated) {
        // Return anonymous actor if not authenticated
        return await createActorWithConfig();
      }

      const actorOptions = {
        agentOptions: {
          identity
        }
      };

      const actor = await createActorWithConfig(actorOptions);
      
      // No explicit initialization needed - backend handles authorization internally
      // based on registered user status and principal checks
      
      return actor;
    },
    staleTime: Infinity,
    enabled: true,
    retry: 1
  });

  // When the actor changes, invalidate dependent queries
  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(SAFE_ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(SAFE_ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);

  const retry = () => {
    queryClient.invalidateQueries({ queryKey: [SAFE_ACTOR_QUERY_KEY] });
    queryClient.refetchQueries({ queryKey: [SAFE_ACTOR_QUERY_KEY] });
  };

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
    isError: actorQuery.isError,
    error: actorQuery.error,
    initWarning,
    retry
  };
}
