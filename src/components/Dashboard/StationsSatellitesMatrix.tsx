import { useMemo } from 'react';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { DashboardStation, DashboardSatellite } from './types';

const MatrixContainer = styled.div`
  overflow-x: auto;
  direction: rtl;
`;

const Table = styled.table`
  width: fit-content;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background: rgba(30, 45, 80, 0.3);
`;

const CategoryHeader = styled.th<{ $type: 'local' | 'global' }>`
  padding: 8px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${props => props.$type === 'local' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
  border-bottom: 2px solid ${props => props.$type === 'local' ? '#22c55e' : '#3b82f6'};
  white-space: nowrap;
`;

const SatelliteHeader = styled.th<{ $affiliation: 'local' | 'global' }>`
  padding: 8px 12px;
  text-align: center;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  background: ${props => props.$affiliation === 'local' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  white-space: nowrap;

  .satellite-icon {
    margin-left: 4px;
    font-size: 14px;
    opacity: 0.7;
  }
`;

const StationHeader = styled.th`
  padding: 8px 12px;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: rgba(30, 45, 80, 0.5);
  white-space: nowrap;
`;

const DataRow = styled.tr`
  &:nth-child(even) {
    background: rgba(20, 35, 65, 0.2);
  }

  &:hover {
    background: rgba(30, 45, 80, 0.3);
  }
`;

const StationCell = styled.td<{ $affiliation: string }>`
  padding: 8px 12px;
  text-align: right;
  font-size: 12px;
  color: white;
  border-left: 1px solid rgba(174, 199, 255, 0.08);
  white-space: nowrap;
  background: ${props => {
    switch (props.$affiliation) {
      case 'airforce': return 'rgba(59, 130, 246, 0.15)';
      case 'navy': return 'rgba(20, 184, 166, 0.15)';
      case 'ground': return 'rgba(34, 197, 94, 0.15)';
      case 'intelligence': return 'rgba(168, 85, 247, 0.15)';
      default: return 'rgba(107, 114, 128, 0.15)';
    }
  }};

  .station-content {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .station-icon {
    font-size: 16px;
    color: ${props => {
      switch (props.$affiliation) {
        case 'airforce': return '#3b82f6';
        case 'navy': return '#14b8a6';
        case 'ground': return '#22c55e';
        case 'intelligence': return '#a855f7';
        default: return '#6b7280';
      }
    }};
  }
`;

const AllocationCell = styled.td<{ $affiliation: 'local' | 'global'; $hasAllocation: boolean }>`
  padding: 8px 12px;
  text-align: center;
  border-left: 1px solid rgba(174, 199, 255, 0.05);
  background: ${props => {
    if (props.$hasAllocation) {
      return props.$affiliation === 'local' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(59, 130, 246, 0.25)';
    }
    return props.$affiliation === 'local' ? 'rgba(34, 197, 94, 0.05)' : 'rgba(59, 130, 246, 0.05)';
  }};
  width: fit-content;
  vertical-align: top;
`;

const AllocationBadgesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  direction: rtl;
`;

const AllocationBadge = styled.div<{ $band: 'ka' | 'ku' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  background: ${props => props.$band === 'ku' ? '#22c55e' : '#f97316'};
  color: white;
  white-space: nowrap;

  .badge-icon {
    font-size: 12px;
  }
`;

const MoreIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

interface Props {
  stations: DashboardStation[];
  satellites: DashboardSatellite[];
}

export const StationsSatellitesMatrix = ({ stations, satellites }: Props) => {
  const localSatellites = useMemo(
    () => satellites.filter(s => s.affiliation === 'local'),
    [satellites]
  );

  const globalSatellites = useMemo(
    () => satellites.filter(s => s.affiliation === 'global'),
    [satellites]
  );

  const getStationAllocations = (stationId: number, satelliteId: number) => {
    const satellite = satellites.find(s => s.id === satelliteId);
    if (!satellite) return [];
    return satellite.allocations.filter(a => a.stationId === stationId);
  };

  const renderAllocations = (stationId: number, satelliteId: number) => {
    const allocations = getStationAllocations(stationId, satelliteId);
    if (allocations.length === 0) return null;

    const visibleAllocations = allocations.slice(0, 2);
    const hiddenAllocations = allocations.slice(2);
    const remaining = hiddenAllocations.length;

    const renderTooltipContent = () => (
      <AllocationBadgesContainer>
        {hiddenAllocations.map((alloc, idx) => (
          <AllocationBadge key={idx} $band={alloc.frequencyBand}>
            {alloc.antennaSize} {alloc.frequencyBand.toUpperCase()}
            <SatelliteAltIcon className="badge-icon" />
          </AllocationBadge>
        ))}
      </AllocationBadgesContainer>
    );

    return (
      <AllocationBadgesContainer>
        {visibleAllocations.map((alloc, idx) => (
          <AllocationBadge key={idx} $band={alloc.frequencyBand}>
            {alloc.antennaSize} {alloc.frequencyBand.toUpperCase()}
            <SatelliteAltIcon className="badge-icon" />
          </AllocationBadge>
        ))}
        {remaining > 0 && (
          <Tooltip 
            title={renderTooltipContent()} 
            placement="left" 
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#0f1d32',
                  border: '1px solid rgba(174, 199, 255, 0.15)',
                  padding: '8px',
                  '& .MuiTooltip-arrow': {
                    color: '#0f1d32',
                  },
                },
              },
            }}
          >
            <MoreIndicator>+{remaining}</MoreIndicator>
          </Tooltip>
        )}
      </AllocationBadgesContainer>
    );
  };

  return (
    <MatrixContainer>
      <Table>
        <thead>
          <HeaderRow>
            <StationHeader rowSpan={2}>תחנה קרקעית</StationHeader>
            <CategoryHeader $type="local" colSpan={localSatellites.length}>
              <SettingsIcon sx={{ fontSize: 14, marginLeft: 4, verticalAlign: 'middle' }} />
              כוחותינו
            </CategoryHeader>
            <CategoryHeader $type="global" colSpan={globalSatellites.length}>
              <PublicIcon sx={{ fontSize: 14, marginLeft: 4, verticalAlign: 'middle' }} />
              עולמי
            </CategoryHeader>
          </HeaderRow>
          <HeaderRow>
            {localSatellites.map(sat => (
              <SatelliteHeader key={sat.id} $affiliation="local">
                <SatelliteAltIcon className="satellite-icon" />
                {sat.name}
              </SatelliteHeader>
            ))}
            {globalSatellites.map(sat => (
              <SatelliteHeader key={sat.id} $affiliation="global">
                <SatelliteAltIcon className="satellite-icon" />
                {sat.name}
              </SatelliteHeader>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {stations.map(station => (
            <DataRow key={station.id}>
              <StationCell $affiliation={station.organizationalAffiliation}>
                <div className="station-content">
                  <SettingsIcon className="station-icon" />
                  {station.name}
                </div>
              </StationCell>
              {localSatellites.map(sat => (
                <AllocationCell
                  key={sat.id}
                  $affiliation="local"
                  $hasAllocation={getStationAllocations(station.id, sat.id).length > 0}
                >
                  {renderAllocations(station.id, sat.id)}
                </AllocationCell>
              ))}
              {globalSatellites.map(sat => (
                <AllocationCell
                  key={sat.id}
                  $affiliation="global"
                  $hasAllocation={getStationAllocations(station.id, sat.id).length > 0}
                >
                  {renderAllocations(station.id, sat.id)}
                </AllocationCell>
              ))}
            </DataRow>
          ))}
        </tbody>
      </Table>
    </MatrixContainer>
  );
};
