import { useState, useEffect } from 'react';

const FIELD_MODE_KEY = 'dagger-field-mode';

export function useFieldMode() {
  const [isFieldMode, setIsFieldMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(FIELD_MODE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem(FIELD_MODE_KEY, String(isFieldMode));
  }, [isFieldMode]);

  const toggleFieldMode = () => setIsFieldMode((prev) => !prev);

  return {
    isFieldMode,
    setIsFieldMode,
    toggleFieldMode,
  };
}
