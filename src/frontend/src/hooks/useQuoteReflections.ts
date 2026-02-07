import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { getQuoteReflection, saveQuoteReflection } from '../utils/localDataStore';

export function useQuoteReflections(quoteId: string) {
  const { profile } = useLocalProfile();
  const [reflection, setReflection] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load reflection on mount or when quoteId changes
  useEffect(() => {
    setIsLoading(true);
    const stored = getQuoteReflection(profile.localUuid, quoteId);
    setReflection(stored || '');
    setIsLoading(false);
  }, [profile.localUuid, quoteId]);

  const saveReflection = (newReflection: string) => {
    saveQuoteReflection(profile.localUuid, quoteId, newReflection);
    setReflection(newReflection);
  };

  return {
    reflection,
    saveReflection,
    isLoading,
  };
}
