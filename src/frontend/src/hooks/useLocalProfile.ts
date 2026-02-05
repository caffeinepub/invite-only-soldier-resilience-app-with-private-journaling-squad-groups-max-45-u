/**
 * Local Profile Hook
 * 
 * Provides access to the device-scoped local profile.
 * This replaces authentication-based profile management.
 * 
 * The local profile includes:
 * - localUuid: Device-scoped unique identifier
 * - displayName/callSign: Optional user-chosen name
 * - Disclaimer and guidelines acceptance state
 * - Optional onboarding metadata
 * 
 * Future seam: If authentication is added, this hook could be extended
 * to map a remote identity to the localUuid while maintaining backward
 * compatibility with local-only mode.
 */

import { useState, useEffect } from 'react';
import { getLocalProfile, saveLocalProfile, updateLocalProfile, resetLocalProfile, type LocalProfile } from '../utils/localProfileStorage';

export function useLocalProfile() {
  const [profile, setProfile] = useState<LocalProfile>(() => getLocalProfile());

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dagger-local-profile') {
        setProfile(getLocalProfile());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const update = (updates: Partial<Omit<LocalProfile, 'localUuid' | 'createdAt'>>) => {
    const updated = updateLocalProfile(updates);
    setProfile(updated);
  };

  const reset = () => {
    const newProfile = resetLocalProfile();
    setProfile(newProfile);
  };

  const needsOnboarding = !profile.disclaimerAccepted || !profile.guidelinesAccepted;

  return {
    profile,
    update,
    reset,
    needsOnboarding,
    displayName: profile.displayName || profile.callSign || 'User',
  };
}
