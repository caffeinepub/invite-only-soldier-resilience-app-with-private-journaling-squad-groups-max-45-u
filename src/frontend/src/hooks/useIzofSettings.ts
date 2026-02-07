/**
 * IZOF Settings Hook
 * 
 * Manages IZOF settings (coach view toggle, range overrides) scoped to local profile.
 */

import { useLocalProfile } from './useLocalProfile';
import { getIZOFSettings, updateIZOFSettings } from '../utils/localDataStore';
import type { IZOFSettings } from '../types/izof';
import { useState, useEffect } from 'react';

export function useIZOFSettings() {
  const { profile } = useLocalProfile();
  const [settings, setSettings] = useState<IZOFSettings>({ coachViewEnabled: false });

  useEffect(() => {
    if (profile) {
      setSettings(getIZOFSettings(profile.localUuid));
    }
  }, [profile]);

  const update = (updates: Partial<IZOFSettings>) => {
    if (!profile) return;
    updateIZOFSettings(profile.localUuid, updates);
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return {
    settings,
    update,
  };
}
