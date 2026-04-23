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
    <path d="M2 12H5C5.28333 12 5.52083 12.0958 5.7125 12.2875C5.90417 12.4792 6 12.7167 6 13C6 13.2833 5.90417 13.5208 5.7125 13.7125C5.52083 13.9042 5.28333 14 5 14H1C0.716667 14 0.479167 13.9042 0.2875 13.7125C0.0958333 13.5208 0 13.2833 0 13V9C0 8.71667 0.0958333 8.47917 0.2875 8.2875C0.479167 8.09583 0.716667 8 1 8C1.28333 8 1.52083 8.09583 1.7125 8.2875C1.90417 8.47917 2 8.71667 2 9V12ZM12 2H9C8.71667 2 8.47917 1.90417 8.2875 1.7125C8.09583 1.52083 8 1.28333 8 1C8 0.716667 8.09583 0.479167 8.2875 0.2875C8.47917 0.0958333 8.71667 0 9 0H13C13.2833 0 13.5208 0.0958333 13.7125 0.2875C13.9042 0.479167 14 0.716667 14 1V5C14 5.28333 13.9042 5.52083 13.7125 5.7125C13.5208 5.90417 13.2833 6 13 6C12.7167 6 12.4792 5.90417 12.2875 5.7125C12.0958 5.52083 12 5.28333 12 5V2Z" fill="#F2F2F2" />
  </svg>

);

const CollapseContentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H1C0.716667 10 0.479167 9.90417 0.2875 9.7125C0.0958333 9.52083 0 9.28333 0 9C0 8.71667 0.0958333 8.47917 0.2875 8.2875C0.479167 8.09583 0.716667 8 1 8H5C5.28333 8 5.52083 8.09583 5.7125 8.2875C5.90417 8.47917 6 8.71667 6 9V13C6 13.2833 5.90417 13.5208 5.7125 13.7125C5.52083 13.9042 5.28333 14 5 14C4.71667 14 4.47917 13.9042 4.2875 13.7125C4.09583 13.5208 4 13.2833 4 13V10ZM10 4H13C13.2833 4 13.5208 4.09583 13.7125 4.2875C13.9042 4.47917 14 4.71667 14 5C14 5.28333 13.9042 5.52083 13.7125 5.7125C13.5208 5.90417 13.2833 6 13 6H9C8.71667 6 8.47917 5.90417 8.2875 5.7125C8.09583 5.52083 8 5.28333 8 5V1C8 0.716667 8.09583 0.479167 8.2875 0.2875C8.47917 0.0958333 8.71667 0 9 0C9.28333 0 9.52083 0.0958333 9.7125 0.2875C9.90417 0.479167 10 0.716667 10 1V4Z" fill="#F2F2F2" />
  </svg>

);



import { StationsSatellitesMatrix } from './StationsSatellitesMatrix';
import { StationsTerminalsMatrix } from './StationsTerminalsMatrix';
import { AntennaConnectivityMatrix } from './AntennaConnectivityMatrix';
import { NetworksMatrix } from './NetworksMatrix';
import { TerminalPopup } from './TerminalPopup';
import { TimeSelector } from './TimeSelector';

import {
  DashboardTerminal,
  TimeRange,
  DashboardSection,
  DashboardData,
} from './types';
import { dashboardApi } from '../../services/api';
import { PageLayout } from '../../shared/components/PageLayout';
import { useInitialization } from '../../contexts/InitializationContext';

const TimeSelectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  background: #3d62b2;
  border: none;
  border-radius: 20px;
  color: #fafafa;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #304f93;
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
  color: #fafafa;
  text-align: right;
  
  span {
    color: #e1eaff;
  }
`;

const LastUpdate = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #bababa;
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
  gap: 20px;
  padding: 10px 20px 20px;
  overflow: hidden;
  height: calc(100vh - 120px); /* Adjust based on header/snapshot height */
`;

const DashboardRow = styled.div<{ $flex?: number }>`
  display: flex;
  gap: 20px;
  flex: ${props => props.$flex || 1};
  min-height: 0;
  min-width: 0;
`;

const DashboardColumn = styled.div<{ $flex?: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: ${props => props.$flex || 1};
  min-height: 0;
  min-width: 0;
`;



const SectionCard = styled.div<{ $flex?: number; $isFullscreen?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: ${props => props.$flex || 1};
  height: 100%;
  width: 100%;
  min-height: 0;
  min-width: 0;
`;



const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #e1eaff;
  margin: 0;
`;

const SectionToggle = styled.button`
  display: flex;
  align-items: center;

  gap: 6px;
  padding: 6px 8px 6px 12px;
  background: #1c2439;
  border: 1px solid #305088;
  border-radius: 12px;
  color: #e1eaff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #252f4a;
    border-color: #3f60a0;
  }

  svg {
    font-size: 24px;
    color: #e1eaff;
  }
`;


const SectionContent = styled.div`
  background: #1c2439;
  border: 1px solid #305088;
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
  color: rgba(255, 255, 255, 0.5);
`;

const formatDateForApi = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const STORAGE_KEY = 'dashboard_time_range';

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
    >

      <ControlBar>
        <SectionTitle>{title}</SectionTitle>
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
      title={fullscreenSection ? undefined : "דאשבורד"}
      breadcrumbs={fullscreenSection ? {
        parent: 'דאשבורד',
        onParentClick: () => setFullscreenSection(null),
        current: getSectionTitle(fullscreenSection),
        onBack: () => setFullscreenSection(null)
      } : undefined}
      contentPadding="0"
      fullHeight={true}
      actions={
        <TimeSelectButton onClick={() => setShowTimeSelector(true)}>
          <TimeJumpIcon />
          בחירת זמן
        </TimeSelectButton>

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
                    showFullView
                  />
                ) : (
                  <NetworksMatrix networks={dashboardData?.networks || []} />
                ),
                1
              );
            }

            return (
              <>
                <DashboardRow $flex={1}>
                  {renderSectionCard(
                    'stations-satellites',
                    'מצבת התחנות והלווינים',
                    <StationsSatellitesMatrix
                      stations={dashboardData?.stations || []}
                      satellites={dashboardData?.satellites || []}
                    />
                  )}
                </DashboardRow>

                <DashboardRow $flex={1}>

                  {/* Right Half: Terminals */}
                  <DashboardColumn $flex={1}>
                    {renderSectionCard(
                      'stations-terminals',
                      'מצבת התחנות והטרמינלים',
                      <StationsTerminalsMatrix
                        stations={dashboardData?.stations || []}
                        onTerminalClick={handleTerminalClick}
                      />
                    )}
                  </DashboardColumn>

                  {/* Left Half: Split Vertically */}
                  <DashboardColumn $flex={1}>
                    <DashboardRow $flex={1.2}>
                      {renderSectionCard(
                        'antenna-connectivity',
                        'מצבת קישוריות אנטנות',
                        <AntennaConnectivityMatrix
                          stations={dashboardData?.stations || []}
                          showFullView
                        />
                      )}
                    </DashboardRow>
                    <DashboardRow $flex={0.8}>
                      {renderSectionCard(
                        'networks',
                        'מצבת רשתות',
                        <NetworksMatrix networks={dashboardData?.networks || []} />
                      )}
                    </DashboardRow>

                  </DashboardColumn>

                </DashboardRow>
              </>
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
    </PageLayout>
  );
};
