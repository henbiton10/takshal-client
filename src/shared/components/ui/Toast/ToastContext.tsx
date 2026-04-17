import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Toast } from './Toast';

interface ToastData {
  id: string;
  title: string;
  subtitle: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showSuccess: (title: string, subtitle: string) => void;
  showError: (title: string, subtitle: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showSuccess = useCallback((title: string, subtitle: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, subtitle, type: 'success' }]);
  }, []);

  const showError = useCallback((title: string, subtitle: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, subtitle, type: 'error' }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          subtitle={toast.subtitle}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
