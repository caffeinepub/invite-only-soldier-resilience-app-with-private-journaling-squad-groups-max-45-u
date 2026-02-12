import React, { createContext, useContext, useState, useCallback } from 'react';

interface DashboardRefreshContextValue {
  refreshToken: number;
  requestDashboardRefresh: () => void;
}

const DashboardRefreshContext = createContext<DashboardRefreshContextValue | undefined>(undefined);

export function DashboardRefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshToken, setRefreshToken] = useState(0);

  const requestDashboardRefresh = useCallback(() => {
    setRefreshToken((prev) => prev + 1);
  }, []);

  return (
    <DashboardRefreshContext.Provider value={{ refreshToken, requestDashboardRefresh }}>
      {children}
    </DashboardRefreshContext.Provider>
  );
}

export function useDashboardRefresh() {
  const context = useContext(DashboardRefreshContext);
  if (!context) {
    throw new Error('useDashboardRefresh must be used within DashboardRefreshProvider');
  }
  return context;
}
