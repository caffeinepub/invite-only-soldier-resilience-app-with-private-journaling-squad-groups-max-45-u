/**
 * Local Profile Storage Utility
 * 
 * Manages device-scoped profile data stored in localStorage.
 * This is the single source of truth for local profile state.
 * 
 * Future seam: If authentication is added later, this could be extended
 * to sync with a remote profile while maintaining the local UUID as a fallback.
 */

const LOCAL_PROFILE_KEY = 'dagger-local-profile';

export interface LocalProfile {
  localUuid: string;
  displayName?: string;
  callSign?: string;
  disclaimerAccepted: boolean;
  disclaimerAcceptedAt?: number;
  guidelinesAccepted: boolean;
  guidelinesAcceptedAt?: number;
  whatBroughtYouHere?: string;
  createdAt: number;
}

function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getLocalProfile(): LocalProfile {
  if (typeof window === 'undefined') {
    // SSR fallback - should not happen in this app
    return createDefaultProfile();
  }

  try {
    const stored = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (stored) {
      const profile = JSON.parse(stored) as LocalProfile;
      // Validate structure
      if (profile.localUuid && typeof profile.localUuid === 'string') {
        return profile;
      }
    }
  } catch (error) {
    console.warn('Failed to load local profile, creating new one:', error);
  }

  // Create new profile if none exists or loading failed
  const newProfile = createDefaultProfile();
  saveLocalProfile(newProfile);
  return newProfile;
}

function createDefaultProfile(): LocalProfile {
  return {
    localUuid: generateUuid(),
    disclaimerAccepted: false,
    guidelinesAccepted: false,
    createdAt: Date.now(),
  };
}

export function saveLocalProfile(profile: LocalProfile): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save local profile:', error);
  }
}

export function updateLocalProfile(updates: Partial<Omit<LocalProfile, 'localUuid' | 'createdAt'>>): LocalProfile {
  const current = getLocalProfile();
  const updated = { ...current, ...updates };
  saveLocalProfile(updated);
  return updated;
}

export function resetLocalProfile(): LocalProfile {
  const newProfile = createDefaultProfile();
  saveLocalProfile(newProfile);
  return newProfile;
}
