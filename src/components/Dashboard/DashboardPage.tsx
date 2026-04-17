import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
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

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const TimeSelectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(61, 98, 178, 1);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(61, 98, 178, 0.8);
  }

  svg {
    font-size: 18px;
  }
`;

const LastUpdate = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px 24px;
  overflow: auto;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  direction: rtl;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 16px;
  direction: rtl;
`;

const SectionCard = styled.div<{ $flex?: number; $isFullscreen?: boolean; $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  background: rgba(20, 35, 65, 0.4);
  border: 1px solid rgba(174, 199, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  flex: ${props => props.$flex || 1};
  min-height: ${props => (props.$isFullscreen ? '100%' : 'auto')};
  max-height: ${props => props.$maxHeight || 'none'};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(30, 45, 80, 0.5);
  border-bottom: 1px solid rgba(174, 199, 255, 0.08);
  direction: rtl;
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const SectionToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SectionContent = styled.div`
  padding: 16px;
  overflow: auto;
  flex: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
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
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

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
      const start = timeRange.startDate.toLocaleDateString('he-IL');
      const end = timeRange.endDate.toLocaleDateString('he-IL');
      return `${timeRange.startTime} ${start} - ${timeRange.endTime} ${end}`;
    }
    return new Date().toLocaleDateString('he-IL');
  };

  const renderSectionCard = (
    section: DashboardSection,
    title: string,
    content: React.ReactNode,
    flex = 1,
    maxHeight?: string,
  ) => (
    <SectionCard
      key={section}
      $flex={fullscreenSection ? undefined : flex}
      $isFullscreen={fullscreenSection === section}
      $maxHeight={fullscreenSection === section ? undefined : maxHeight}
    >
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionToggle onClick={() => toggleFullscreen(section)}>
          {fullscreenSection === section ? <FullscreenExitIcon /> : <FullscreenIcon />}
          {fullscreenSection === section ? 'הקטן תצוגה' : 'תצוגה מלאה'}
        </SectionToggle>
      </SectionHeader>
      <SectionContent>{content}</SectionContent>
    </SectionCard>
  );

  return (
    <PageLayout
      title="דאשבורד"
      subtitle={`תמונת מצב: ${formatDisplayDate()}`}
      contentPadding="0"
      actions={
        <HeaderLeft>
          <TimeSelectButton onClick={() => setShowTimeSelector(true)}>
            <CalendarTodayIcon />
            בחירת זמן
          </TimeSelectButton>
          <LastUpdate>מועד עדכון: {lastUpdated}</LastUpdate>
        </HeaderLeft>
      }
    >

      <MainContent>
        {loading && !dashboardData ? (
          <LoadingContainer>טוען נתונים...</LoadingContainer>
        ) : (() => {
          const hasOperationsInRange =
            (dashboardData?.stations.length || 0) > 0 ||
            (dashboardData?.satellites.length || 0) > 0 ||
            (dashboardData?.networks.length || 0) > 0;

          if (!hasOperationsInRange && timeRange) {
            return (
              <LoadingContainer>
                אין פ״מים בטווח הזמן שבחרת
              </LoadingContainer>
            );
          }

          return (
            <>
              {fullscreenSection === null ? (
                <>
                  <TopSection>
                    {renderSectionCard(
                      'stations-satellites',
                      'מצבת התחנות והלווינים',
                      <StationsSatellitesMatrix
                        stations={dashboardData?.stations || []}
                        satellites={dashboardData?.satellites || []}
                      />,
                      1,
                      '350px',
                    )}

                    {renderSectionCard(
                      'stations-terminals',
                      'מצבת התחנות והטרמינלים',
                      <StationsTerminalsMatrix
                        stations={dashboardData?.stations || []}
                        onTerminalClick={handleTerminalClick}
                      />,
                      1,
                      '300px',
                    )}

                    <BottomSection>
                      {renderSectionCard(
                        'antenna-connectivity',
                        'מצבת קישוריות אנטנות',
                        <AntennaConnectivityMatrix
                          stations={dashboardData?.stations || []}
                          showFullView
                        />,
                      )}

                      {renderSectionCard(
                        'networks',
                        'מצבת רשתות',
                        <NetworksMatrix networks={dashboardData?.networks || []} />,
                      )}
                    </BottomSection>
                  </TopSection>
                </>
              ) : (
                renderSectionCard(
                  fullscreenSection,
                  fullscreenSection === 'stations-satellites'
                    ? 'מצבת התחנות והלווינים'
                    : fullscreenSection === 'stations-terminals'
                      ? 'מצבת התחנות והטרמינלים'
                      : fullscreenSection === 'antenna-connectivity'
                        ? 'מצבת קישוריות אנטנות'
                        : 'מצבת רשתות',
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
                )
              )}
            </>
          );
        })()}
      </MainContent>

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
