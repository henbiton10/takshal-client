import { useMemo } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import { DashboardStation, DashboardTerminal } from './types';

const MatrixContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  direction: rtl;
`;

const StationColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(20, 35, 65, 0.3);
  border-radius: 8px;
  padding: 12px;
`;

const StationHeader = styled.div<{ $affiliation: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background: ${props => {
    switch (props.$affiliation) {
      case 'airforce': return 'rgba(59, 130, 246, 0.2)';
      case 'tikshuv': return 'rgba(20, 184, 166, 0.2)';
      case 'ground': return 'rgba(34, 197, 94, 0.2)';
      case 'intelligence': return 'rgba(168, 85, 247, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$affiliation) {
      case 'airforce': return 'rgba(59, 130, 246, 0.3)';
      case 'tikshuv': return 'rgba(20, 184, 166, 0.3)';
      case 'ground': return 'rgba(34, 197, 94, 0.3)';
      case 'intelligence': return 'rgba(168, 85, 247, 0.3)';
      default: return 'rgba(107, 114, 128, 0.3)';
    }
  }};

  .station-icon {
    font-size: 20px;
    color: ${props => {
      switch (props.$affiliation) {
        case 'airforce': return '#3b82f6';
        case 'tikshuv': return '#14b8a6';
        case 'ground': return '#22c55e';
        case 'intelligence': return '#a855f7';
        default: return '#6b7280';
      }
    }};
  }

  .station-name {
    font-size: 12px;
    font-weight: 500;
    color: white;
    line-height: 1.3;
  }
`;

const TerminalsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 40px;
`;

const TerminalCell = styled.button<{ $status: string; $isAllocated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  min-width: 70px;
  border-radius: 6px;
  border: none;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${props => {
    if (props.$status === 'damaged') return '#dc2626';
    if (props.$status === 'partly_ready') return '#eab308';
    if (props.$isAllocated) return '#22c55e';
    return '#4b5563';
  }};
  
  color: ${props => {
    if (props.$status === 'partly_ready') return '#1f2937';
    return 'white';
  }};

  &:hover {
    opacity: 0.85;
    transform: scale(1.02);
  }

  .allocation-badge {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-right: 4px;
    padding: 1px 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    font-size: 9px;
  }
`;

const EmptyTerminals = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 11px;
`;

interface Props {
  stations: DashboardStation[];
  onTerminalClick: (terminal: DashboardTerminal) => void;
}

export const StationsTerminalsMatrix = ({ stations, onTerminalClick }: Props) => {
  const sortedStations = useMemo(() => {
    return [...stations].sort((a, b) => {
      const order = ['airforce', 'tikshuv', 'ground', 'intelligence', 'other'];
      return order.indexOf(a.organizationalAffiliation) - order.indexOf(b.organizationalAffiliation);
    });
  }, [stations]);

  const getTerminalStatusLabel = (terminal: DashboardTerminal) => {
    if (terminal.isAllocated && terminal.allocations.length > 0) {
      const alloc = terminal.allocations[0];
      return (
        <>
          <span className="allocation-badge">
            {alloc.antennaSize} {alloc.frequencyBand.toUpperCase()}
          </span>
          {terminal.name}
        </>
      );
    }
    return terminal.name;
  };

  const columns = useMemo(() => {
    const col1: DashboardStation[] = [];
    const col2: DashboardStation[] = [];
    
    sortedStations.forEach((station, index) => {
      if (index % 2 === 0) {
        col1.push(station);
      } else {
        col2.push(station);
      }
    });
    
    return [col1, col2];
  }, [sortedStations]);

  const renderStationCard = (station: DashboardStation) => (
    <StationCard key={station.id}>
      <StationHeader $affiliation={station.organizationalAffiliation}>
        <SettingsIcon className="station-icon" />
        <span className="station-name">{station.name}</span>
      </StationHeader>
      <TerminalsGrid>
        {station.terminals.length > 0 ? (
          station.terminals.map(terminal => (
            <TerminalCell
              key={terminal.id}
              $status={terminal.readinessStatus}
              $isAllocated={terminal.isAllocated}
              onClick={() => onTerminalClick(terminal)}
              title={`${terminal.name} - ${terminal.readinessStatus === 'ready' ? 'כשיר' : terminal.readinessStatus === 'partly_ready' ? 'כשיר חלקית' : 'תקול'}`}
            >
              {getTerminalStatusLabel(terminal)}
            </TerminalCell>
          ))
        ) : (
          <EmptyTerminals>אין טרמינלים</EmptyTerminals>
        )}
      </TerminalsGrid>
    </StationCard>
  );

  return (
    <MatrixContainer>
      <StationColumn>
        {columns[0].map(renderStationCard)}
      </StationColumn>
      <StationColumn>
        {columns[1].map(renderStationCard)}
      </StationColumn>
    </MatrixContainer>
  );
};
