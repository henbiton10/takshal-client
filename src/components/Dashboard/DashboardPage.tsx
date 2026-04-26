import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';


const TimeJumpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 18.8 18.2174" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1805 9.77754C16.29 9.7777 17.9998 11.4883 17.9998 13.5979C17.9997 15.7072 16.2899 17.417 14.1805 17.4172C12.071 17.4172 10.3603 15.7073 10.3602 13.5979C10.3602 11.4882 12.0709 9.77754 14.1805 9.77754Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14.2362 11.8974V13.6496" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14.2362 13.6496L15.4043 13.6496" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7.80879 16.5716L5.8 16.5716C3.03857 16.5716 0.8 14.333 0.8 11.5716V6.96993C0.8 4.2085 3.03858 1.96992 5.8 1.96992H11.2121C13.8485 1.96992 15.9857 4.10714 15.9857 6.74353" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4.01399" cy="5.76399" r="0.876098" fill="currentColor" />
    <circle cx="4.01399" cy="9.26789" r="0.876098" fill="currentColor" />
    <circle cx="4.01399" cy="12.7735" r="0.876098" fill="currentColor" />
    <circle cx="9.852" cy="5.76399" r="0.876098" fill="currentColor" />
    <circle cx="6.92964" cy="5.76399" r="0.876098" fill="currentColor" />
    <circle cx="6.92964" cy="9.26789" r="0.876098" fill="currentColor" />
    <circle cx="6.92964" cy="12.7735" r="0.876098" fill="currentColor" />
    <circle cx="12.7744" cy="5.76399" r="0.876098" fill="currentColor" />
    <path d="M4.89131 0.8L4.89131 3.13626" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.39143 0.8L8.39143 3.13626" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M11.8983 0.8L11.8983 3.13626" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);


const ExpandContentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12H5C5.28333 12 5.52083 12.0958 5.7125 12.2875C5.90417 12.4792 6 12.7167 6 13C6 13.2833 5.90417 13.5208 5.7125 13.7125C5.52083 13.9042 5.28333 14 5 14H1C0.716667 14 0.479167 13.9042 0.2875 13.7125C0.0958333 13.5208 0 13.2833 0 13V9C0 8.71667 0.0958333 8.47917 0.2875 8.2875C0.479167 8.09583 0.716667 8 1 8C1.28333 8 1.52083 8.09583 1.7125 8.2875C1.90417 8.47917 2 8.71667 2 9V12ZM12 2H9C8.71667 2 8.47917 1.90417 8.2875 1.7125C8.09583 1.52083 8 1.28333 8 1C8 0.716667 8.09583 0.479167 8.2875 0.2875C8.47917 0.0958333 8.71667 0 9 0H13C13.2833 0 13.5208 0.0958333 13.7125 0.2875C13.9042 0.479167 14 0.716667 14 1V5C14 5.28333 13.9042 5.52083 13.7125 5.7125C13.5208 5.90417 13.2833 6 13 6C12.7167 6 12.4792 5.90417 12.2875 5.7125C12.0958 5.52083 12 5.28333 12 5V2Z" fill="currentColor" />
  </svg>

);

const CollapseContentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H1C0.716667 10 0.479167 9.90417 0.2875 9.7125C0.0958333 9.52083 0 9.28333 0 9C0 8.71667 0.0958333 8.47917 0.2875 8.2875C0.479167 8.09583 0.716667 8 1 8H5C5.28333 8 5.52083 8.09583 5.7125 8.2875C5.90417 8.47917 6 8.71667 6 9V13C6 13.2833 5.90417 13.5208 5.7125 13.7125C5.52083 13.9042 5.28333 14 5 14C4.71667 14 4.47917 13.9042 4.2875 13.7125C4.09583 13.5208 4 13.2833 4 13V10ZM10 4H13C13.2833 4 13.5208 4.09583 13.7125 4.2875C13.9042 4.47917 14 4.71667 14 5C14 5.28333 13.9042 5.52083 13.7125 5.7125C13.5208 5.90417 13.2833 6 13 6H9C8.71667 6 8.47917 5.90417 8.2875 5.7125C8.09583 5.52083 8 5.28333 8 5V1C8 0.716667 8.09583 0.479167 8.2875 0.2875C8.47917 0.0958333 8.71667 0 9 0C9.28333 0 9.52083 0.0958333 9.7125 0.2875C9.90417 0.479167 10 0.716667 10 1V4Z" fill="currentColor" />
  </svg>

);



import { StationsSatellitesMatrix } from './StationsSatellitesMatrix';
import { StationsTerminalsMatrix } from './StationsTerminalsMatrix';
import { AntennaConnectivityMatrix } from './AntennaConnectivityMatrix';
import { NetworksMatrix } from './NetworksMatrix';
import { TerminalPopup } from './TerminalPopup';
import { TimeSelector } from './TimeSelector';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditLayoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H10V10H3V3ZM3 14H10V21H3V14ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM5 5V8H8V5H5ZM5 16V19H8V16H5ZM16 5V8H19V5H16ZM16 16V19H19V16H16Z" fill="currentColor"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.36 3 12 3C13.64 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor"/>
  </svg>
);

const DragIndicatorIcon = () => (
  <div style={{ display: 'flex', gap: '2px', color: 'var(--mui-palette-primary-main)', fontSize: '20px', fontWeight: 'bold' }}>
    ⋮⋮
  </div>
);

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="currentColor"/>
  </svg>
);

import {
  DashboardTerminal,
  TimeRange,
  DashboardSection,
  DashboardData,
} from './types';
import { dashboardApi } from '../../services/api';
import { PageLayout } from '../../shared/components/PageLayout';
import { useInitialization } from '../../contexts/InitializationContext';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog/ConfirmDialog';

const TimeSelectButton = styled.button<{ $isEditing?: boolean; $isReset?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  background: ${props => {
    if (props.$isReset) return props.theme.customColors.error.main;
    if (props.$isEditing) return props.theme.customColors.primary.main;
    return 'transparent';
  }};
  border: ${props => (props.$isReset || props.$isEditing) ? 'none' : `1px solid ${props.theme.customColors.border.divider}`};
  border-radius: 20px;
  color: ${props => {
    if (props.$isReset || props.$isEditing) return props.theme.customColors.text.white;
    return props.theme.customColors.text.primary;
  }};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0px 1px 3px ${({ theme }) => theme.palette.mode === 'dark' ? theme.customColors.border.divider : 'rgba(0,0,0,0.1)'};

  &:hover {
    background: ${props => {
      if (props.$isReset) return props.theme.customColors.error.main;
      if (props.$isEditing) return props.theme.customColors.primary.hover;
      return props.theme.customColors.action.hover;
    }};
    opacity: 0.9;
  }

  svg {
    font-size: 24px;
  }
`;


const SnapshotContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 20px 0;
  background: transparent;
`;

const SnapshotTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.customColors.text.primary};
  text-align: right;
  
  span {
    color: ${props => props.theme.customColors.text.secondary};
  }
`;

const LastUpdate = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.customColors.text.muted};
  letter-spacing: 0.16px;
`;

const DashboardWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px;
  overflow-y: auto;
  height: calc(100vh - 120px);
  position: relative;
  direction: ltr; /* Ensure scrollbar is on the right and RGL has LTR context */
  transform: translate(0, 0); /* Create new stacking context for accurate offset calculations */
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  direction: ltr;
`;





const SectionCard = styled.div<{ $flex?: number; $isFullscreen?: boolean; $isEditing?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: ${props => props.$flex || 1};
  height: 100%;
  width: 100%;
  min-height: 0;
  min-width: 0;
  
  ${props => props.$isEditing && `
    outline: 2px dashed ${props.theme.customColors.border.primary};
    outline-offset: 4px;
    border-radius: 12px;
    background: ${props.theme.customColors.background.dark};
  `}

  /* Restore RTL for the content of the card */
  direction: rtl;
`;



const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: default;
  
  &.grid-handle {
    cursor: move;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.customColors.text.secondary};
  margin: 0;
`;

const SectionToggle = styled.button`
  display: flex;
  align-items: center;

  gap: 6px;
  padding: 6px 8px 6px 12px;
  background: ${props => props.theme.customColors.background.default};
  border: 1px solid ${props => props.theme.customColors.border.primary};
  border-radius: 12px;
  color: ${props => props.theme.customColors.text.secondary};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.customColors.background.paper};
    border-color: ${props => props.theme.customColors.border.accent};
  }

  svg {
    font-size: 24px;
    color: ${props => props.theme.customColors.text.secondary};
  }
`;


const SectionContent = styled.div`
  background: ${props => props.theme.customColors.background.default};
  border: 1px solid ${props => props.theme.customColors.border.primary};
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1px;
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
    width: 100%;
    height: 100%;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.customColors.text.disabled};
`;

const formatDateForApi = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const STORAGE_KEY = 'dashboard_time_range';
const LAYOUT_STORAGE_KEY = 'dashboard_layout';

const MIN_DIMENSIONS: Record<string, { minW: number; minH: number }> = {
  'stations-satellites': { minW: 6, minH: 6 },
  'stations-terminals': { minW: 4, minH: 8 },
  'antenna-connectivity': { minW: 4, minH: 5 },
  'networks': { minW: 4, minH: 3 },
};

const DEFAULT_LAYOUTS: Record<string, Layout[]> = {
  lg: [
    { i: 'stations-satellites', x: 0, y: 0, w: 12, h: 8, ...MIN_DIMENSIONS['stations-satellites'] },
    { i: 'stations-terminals', x: 6, y: 8, w: 6, h: 12, ...MIN_DIMENSIONS['stations-terminals'] },
    { i: 'antenna-connectivity', x: 0, y: 8, w: 6, h: 7, ...MIN_DIMENSIONS['antenna-connectivity'] },
    { i: 'networks', x: 0, y: 15, w: 6, h: 5, ...MIN_DIMENSIONS['networks'] },
  ]
};

const normalizeLayout = (layout: Layouts) => {
  const normalized: Record<string, any> = {};
  Object.keys(layout).forEach(key => {
    normalized[key] = (layout[key] || []).map((item: Layout) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h
    })).sort((a: any, b: any) => a.i.localeCompare(b.i));
  });
  return JSON.stringify(normalized);
};

const loadLayoutFromStorage = () => {
  try {
    const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!stored) return DEFAULT_LAYOUTS;
    
    const parsed: Record<string, Layout[]> = JSON.parse(stored);
    
    // Always inject min dimensions to ensure they apply even to old stored layouts
    Object.keys(parsed).forEach((breakpoint: string) => {
      parsed[breakpoint] = parsed[breakpoint].map((item: Layout) => ({
        ...item,
        ...(MIN_DIMENSIONS[item.i] || {})
      }));
    });
    
    return parsed;
  } catch (error) {
    console.error('Failed to load layout:', error);
    return DEFAULT_LAYOUTS;
  }
};

const loadTimeRangeFromStorage = (): TimeRange | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return {
      startDate: new Date(parsed.startDate),
      endDate: new Date(parsed.endDate),
      startTime: parsed.startTime,
      endTime: parsed.endTime,
    };
  } catch (error) {
    console.error('Failed to load time range from storage:', error);
    return null;
  }
};

const saveTimeRangeToStorage = (timeRange: TimeRange | null) => {
  try {
    if (timeRange) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        startDate: timeRange.startDate.toISOString(),
        endDate: timeRange.endDate.toISOString(),
        startTime: timeRange.startTime,
        endTime: timeRange.endTime,
      }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to save time range to storage:', error);
  }
};

export const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);


  const [loading, setLoading] = useState(true);
  const [selectedTerminal, setSelectedTerminal] = useState<DashboardTerminal | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange | null>(() => loadTimeRangeFromStorage());
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString('he-IL'));
  const [fullscreenSection, setFullscreenSection] = useState<DashboardSection | null>(null);
  const [layouts, setLayouts] = useState<Layouts>(() => loadLayoutFromStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { setAppReady } = useInitialization();

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      let data: DashboardData;

      if (timeRange) {
        const startDate = formatDateForApi(timeRange.startDate);
        const endDate = formatDateForApi(timeRange.endDate);
        data = await dashboardApi.getDashboardData(
          startDate,
          endDate,
          timeRange.startTime,
          timeRange.endTime
        );
      } else {
        data = await dashboardApi.getDashboardData();
      }

      setDashboardData(data);
      setLastUpdated(new Date().toLocaleString('he-IL'));
      setAppReady(true);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange, setAppReady]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handleTerminalClick = useCallback((terminal: DashboardTerminal) => {
    setSelectedTerminal(terminal);
  }, []);

  const handleCloseTerminalPopup = useCallback(() => {
    setSelectedTerminal(null);
  }, []);

  const handleTimeSelect = useCallback((range: TimeRange) => {
    setTimeRange(range);
    saveTimeRangeToStorage(range);
    setShowTimeSelector(false);
  }, []);

  const toggleFullscreen = useCallback((section: DashboardSection) => {
    setFullscreenSection((currentSection) =>
      currentSection === section ? null : section,
    );
  }, []);

  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(allLayouts));
  };

  const handleResetLayout = () => {
    // Deep clone to avoid mutations
    const defaultLayoutCopy = JSON.parse(JSON.stringify(DEFAULT_LAYOUTS));
    setLayouts(defaultLayoutCopy);
    localStorage.removeItem(LAYOUT_STORAGE_KEY); // Removing the key is cleaner than storing the default
    setShowResetConfirm(false);
  };

  const isDefaultLayout = normalizeLayout(layouts) === normalizeLayout(DEFAULT_LAYOUTS);

  const formatDisplayDate = () => {
    if (timeRange) {
      const d = timeRange.endDate;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = String(d.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    }
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const getSectionTitle = (section: DashboardSection | null) => {
    switch (section) {
      case 'stations-satellites': return 'מצבת התחנות והלווינים';
      case 'stations-terminals': return 'מצבת התחנות והטרמינלים';
      case 'antenna-connectivity': return 'מצבת קישוריות אנטנות';
      case 'networks': return 'מצבת רשתות';
      default: return '';
    }
  };

  const renderSectionCard = (
    section: DashboardSection,
    title: string,
    content: React.ReactNode,
    flex = 1,
  ) => (
    <SectionCard
      key={section}
      $flex={fullscreenSection ? undefined : flex}
      $isFullscreen={fullscreenSection === section}
      $isEditing={isEditing}
    >

      <ControlBar>
        <TitleGroup className={isEditing ? 'grid-handle' : ''}>
          {isEditing && <DragIndicatorIcon />}
          <SectionTitle>{title}</SectionTitle>
        </TitleGroup>
        <SectionToggle onClick={() => toggleFullscreen(section)}>
          {fullscreenSection === section ? <CollapseContentIcon /> : <ExpandContentIcon />}
          <p style={{ margin: 0 }}>{fullscreenSection === section ? 'הקטן תצוגה' : 'תצוגה מלאה'}</p>
        </SectionToggle>

      </ControlBar>
      <SectionContent>{content}</SectionContent>
    </SectionCard>
  );

  return (
    <PageLayout
      title={fullscreenSection ? undefined : "סטטוס מערך התקש״ל"}
      breadcrumbs={fullscreenSection ? {
        parent: 'סטטוס מערך התקש״ל',
        onParentClick: () => setFullscreenSection(null),
        current: getSectionTitle(fullscreenSection),
        onBack: () => setFullscreenSection(null)
      } : undefined}
      contentPadding="0"
      fullHeight={true}
      actions={
        <div style={{ display: 'flex', gap: '12px' }}>
          {isEditing && !isDefaultLayout && (
            <TimeSelectButton 
              $isReset
              onClick={() => setShowResetConfirm(true)}
            >
              <ResetIcon />
              איפוס פריסה
            </TimeSelectButton>
          )}
          <TimeSelectButton 
            $isEditing={isEditing}
            onClick={() => setIsEditing(!isEditing)}
            data-tour="edit-layout"
          >
            {isEditing ? <LockIcon /> : <EditLayoutIcon />}
            {isEditing ? 'שמור פריסה' : 'עריכת פריסה'}
          </TimeSelectButton>
          <TimeSelectButton 
            $isEditing
            onClick={() => setShowTimeSelector(true)}
            data-tour="time-selector"
          >
            <TimeJumpIcon />
            בחירת זמן
          </TimeSelectButton>
        </div>
      }
    >
      <DashboardWrapper>
        <SnapshotContainer>
          <SnapshotTitle>
            תמונת מצב: <span> {formatDisplayDate()}</span>
          </SnapshotTitle>
          <LastUpdate>מועד עדכון {lastUpdated.split(',')[0]}</LastUpdate>

        </SnapshotContainer>

        <MainContent>
          {loading && !dashboardData ? (
            <LoadingContainer>טוען נתונים...</LoadingContainer>
          ) : (() => {
            if (fullscreenSection !== null) {
              return renderSectionCard(
                fullscreenSection,
                getSectionTitle(fullscreenSection),
                fullscreenSection === 'stations-satellites' ? (
                  <StationsSatellitesMatrix
                    stations={dashboardData?.stations || []}
                    satellites={dashboardData?.satellites || []}
                  />
                ) : fullscreenSection === 'stations-terminals' ? (
                  <StationsTerminalsMatrix
                    stations={dashboardData?.stations || []}
                    onTerminalClick={handleTerminalClick}
                  />
                ) : fullscreenSection === 'antenna-connectivity' ? (
                  <AntennaConnectivityMatrix
                    stations={dashboardData?.stations || []}
                  />
                ) : (
                  <NetworksMatrix networks={dashboardData?.networks || []} />
                ),
                1
              );
            }

            return (
              <GridContainer>
                <ResponsiveGridLayout
                  className={`layout ${isEditing ? 'is-editing' : ''}`}
                  layouts={layouts}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  rowHeight={30}
                  isDraggable={isEditing}
                  isResizable={isEditing}
                  onLayoutChange={handleLayoutChange}
                  draggableHandle=".grid-handle"
                  margin={[20, 20]}
                  useCSSTransforms={true}
                  resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
                >
                  <div key="stations-satellites">
                    {renderSectionCard(
                      'stations-satellites',
                      'מצבת התחנות והלווינים',
                      <StationsSatellitesMatrix
                        stations={dashboardData?.stations || []}
                        satellites={dashboardData?.satellites || []}
                      />
                    )}
                  </div>

                  <div key="stations-terminals">
                    {renderSectionCard(
                      'stations-terminals',
                      'מצבת התחנות והטרמינלים',
                      <StationsTerminalsMatrix
                        stations={dashboardData?.stations || []}
                        onTerminalClick={handleTerminalClick}
                      />
                    )}
                  </div>

                  <div key="antenna-connectivity">
                    {renderSectionCard(
                      'antenna-connectivity',
                      'מצבת קישוריות אנטנות',
                      <AntennaConnectivityMatrix
                        stations={dashboardData?.stations || []}
                      />
                    )}
                  </div>

                  <div key="networks">
                    {renderSectionCard(
                      'networks',
                      'מצבת רשתות',
                      <NetworksMatrix networks={dashboardData?.networks || []} />
                    )}
                  </div>
                </ResponsiveGridLayout>
              </GridContainer>
            );
          })()}
        </MainContent>

      </DashboardWrapper>

      {selectedTerminal && (
        <TerminalPopup
          terminal={selectedTerminal}
          onClose={handleCloseTerminalPopup}
        />
      )}

      {showTimeSelector && (
        <TimeSelector
          onSelect={handleTimeSelect}
          onClose={() => setShowTimeSelector(false)}
          currentRange={timeRange}
        />
      )}

      <ConfirmDialog
        open={showResetConfirm}
        title="איפוס פריסה"
        message="האם אתה בטוח שברצונך לאפס את פריסת הדאשבורד לברירת המחדל? פעולה זו לא ניתנת לביטול."
        confirmText="אפס פריסה"
        cancelText="בטל"
        onConfirm={handleResetLayout}
        onCancel={() => setShowResetConfirm(false)}
      />
    </PageLayout>
  );
};
