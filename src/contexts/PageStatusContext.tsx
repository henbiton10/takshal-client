import { createContext, useContext, useState, ReactNode } from 'react';

interface PageStatus {
  hasActiveForm: boolean;
}

interface PageStatusContextType {
  statuses: Record<string, PageStatus>;
  setPageStatus: (pageId: string, hasActiveForm: boolean) => void;
}

const PageStatusContext = createContext<PageStatusContextType | undefined>(undefined);

export const PageStatusProvider = ({ children }: { children: ReactNode }) => {
  const [statuses, setStatuses] = useState<Record<string, PageStatus>>({});

  const setPageStatus = (pageId: string, hasActiveForm: boolean) => {
    setStatuses(prev => {
      if (prev[pageId]?.hasActiveForm === hasActiveForm) return prev;
      return {
        ...prev,
        [pageId]: { hasActiveForm }
      };
    });
  };

  return (
    <PageStatusContext.Provider value={{ statuses, setPageStatus }}>
      {children}
    </PageStatusContext.Provider>
  );
};

export const usePageStatus = () => {
  const context = useContext(PageStatusContext);
  if (!context) {
    throw new Error('usePageStatus must be used within a PageStatusProvider');
  }
  return context;
};
