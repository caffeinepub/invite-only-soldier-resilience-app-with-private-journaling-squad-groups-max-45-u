import { useInternetIdentity } from './useInternetIdentity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type backendInterface } from '../backend';
import { createActorWithConfig } from '../config';
import { getSecretParameter } from '../utils/urlParams';

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
      
      // Try to initialize access control, but don't fail actor creation if it errors
      try {
        const adminToken = getSecretParameter('caffeineAdminToken') || '';
        await actor._initializeAccessControlWithSecret(adminToken);
      } catch (error) {
        console.warn('Access control initialization failed:', error);
        setInitWarning('App initialization encountered an issue. Some features may be limited.');
      }
      
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
