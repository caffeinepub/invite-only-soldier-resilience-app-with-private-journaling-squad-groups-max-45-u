import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { getProductionUrl } from '../config/productionUrl';

/**
 * Hook that resolves the production URL from config and optionally from backend.
 * Returns the frontend-derived URL immediately, and can fetch backend's live link.
 */
export function useProductionUrl() {
  const { actor, isFetching: actorFetching } = useActor();
  const frontendUrl = getProductionUrl();

  const backendQuery = useQuery<string>({
    queryKey: ['liveLink'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLiveLink();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: Infinity, // Live link doesn't change
  });

  return {
    url: frontendUrl,
    backendUrl: backendQuery.data,
    isLoadingBackend: backendQuery.isLoading,
    error: backendQuery.error,
  };
}
