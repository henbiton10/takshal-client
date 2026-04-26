import React, { createContext, useContext, useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useTheme } from 'styled-components';
import { TOUR_STEPS } from './steps';
import { TourTooltip } from './TourTooltip';

interface TourContextType {
  startTour: () => void;
  isTourRunning: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const STORAGE_KEY = 'takshal_tour_completed';

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [run, setRun] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const isCompleted = localStorage.getItem(STORAGE_KEY) === 'true';
    if (!isCompleted) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setTourKey(prev => prev + 1);
    setRun(true);
  };

  const handleJoyrideCallback = (data: any) => {
    const { status, type, action } = data;
    
    // Check for finished or skipped statuses OR the end of the tour
    if (
      status === STATUS.FINISHED || 
      status === STATUS.SKIPPED || 
      status === 'finished' || 
      status === 'skipped' ||
      type === 'tour:end' ||
      action === 'skip'
    ) {
      setRun(false);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  return (
    <TourContext.Provider value={{ startTour, isTourRunning: run }}>
      {children}
      <Joyride
        {...({
          key: `joyride-${tourKey}`,
          steps: TOUR_STEPS,
          run: run,
          continuous: true,
          showProgress: true,
          showSkipButton: true,
          disableOverlayClose: true,
          spotlightClicks: true,
          tooltipComponent: TourTooltip,
          callback: handleJoyrideCallback,
          locale: {
            back: 'הקודם',
            close: 'סגור',
            last: 'סיום',
            next: 'הבא',
            skip: 'דלג',
          },
          styles: {
            options: {
              zIndex: 10000,
              arrowColor: (theme as any).customColors.background.glass,
              overlayColor: 'rgba(0, 0, 0, 0.6)',
              primaryColor: (theme as any).customColors.primary.main,
            },
            spotlight: {
              borderRadius: 16,
            },
          },
        } as any)}
      />
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
