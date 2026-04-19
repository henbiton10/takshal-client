import React, { createContext, useContext, useState, useCallback } from 'react';

interface InitializationContextValue {
  isAppReady: boolean;
  setAppReady: (ready: boolean) => void;
}

const InitializationContext = createContext<InitializationContextValue | undefined>(undefined);

export const InitializationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);

  const setAppReady = useCallback((ready: boolean) => {
    if (ready) setIsAppReady(true);
  }, []);

  return (
    <InitializationContext.Provider value={{ isAppReady, setAppReady }}>
      {children}
    </InitializationContext.Provider>
  );
};

export const useInitialization = () => {
  const context = useContext(InitializationContext);
  if (context === undefined) {
    throw new Error('useInitialization must be used within an InitializationProvider');
  }
  return context;
};
