import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { DashboardStation, DashboardTerminal } from './types';


// Asset imports
const IAF_ICON = '/src/assets/IAF.png';
const C4I_ICON = '/src/assets/C4I.svg';

const MatrixContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  direction: rtl;
  background: #1c2439;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(28, 36, 57, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #305088;
  padding: 10px;
  height: 56px;
  color: #fafafa;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const StationHeaderCell = styled.th`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 20;
  background: #1c2439;
  width: 320px;
  min-width: 320px;
`;

const DataRow = styled.tr`
  min-height: 56px;
  border-bottom: 1px solid #305088;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StationCell = styled.td`
  position: sticky;
  right: 0;
  z-index: 5;
  background: rgba(41, 121, 255);
  backdrop-filter: blur(8px);
  border: 1px solid #305088;
  padding: 0 16px;
  text-align: right;
  width: 320px;
  min-width: 320px;

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    color: #fafafa;
    font-size: 18px;
    font-weight: 700;
  }
`;

const TerminalsGridCell = styled.td`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  width: 100%;
`;

const TerminalCell = styled.button<{ $status: string; $isAllocated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #305088;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  color: #fafafa;
  white-space: nowrap;
  
  background: ${props => {
    const statusColors = props.theme.customColors.status;
    if (props.$status === 'damaged') return statusColors.damaged;
    if (props.$status === 'partly_ready') return statusColors.partlyReady;
    if (props.$isAllocated) return statusColors.allocated;
    return 'transparent';
  }};

  &:hover {
    opacity: 0.8;
    background: ${props => props.$isAllocated ? '' : 'rgba(255, 255, 255, 0.1)'};
  }


  svg {
    font-size: 18px;
    color: ${props => props.$isAllocated ? '#75eca6' : '#e1eaff'};
  }
`;

const BattalionBadge = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

interface Props {
  stations: DashboardStation[];
  onTerminalClick: (terminal: DashboardTerminal) => void;
}

export const StationsTerminalsMatrix = ({ stations, onTerminalClick }: Props) => {
  const getAffiliationIcon = (affiliation: string) => {
    const aff = affiliation.toLowerCase();
    if (aff === 'tikshuv' || aff === 'intelligence') return C4I_ICON;
    return IAF_ICON;
  };

  return (
    <MatrixContainer>
      <Table>
        <thead>
          <tr>
            <StationHeaderCell />
            <HeaderCell>טרמינלים</HeaderCell>
          </tr>

        </thead>
        <tbody>
          {stations.map(station => (
            <DataRow key={station.id}>
              <StationCell>
                <div className="content">
                  <BattalionBadge>
                    <img src={getAffiliationIcon(station.organizationalAffiliation)} alt={station.organizationalAffiliation} />
                  </BattalionBadge>
                  {station.name}
                </div>
              </StationCell>
              <TerminalsGridCell>
                {station.terminals.length > 0 ? (
                  station.terminals.map(terminal => (
                    <Tooltip
                      key={terminal.id}
                      title={
                        <div style={{ padding: '4px' }}>
                          <div><strong>{terminal.name}</strong></div>
                          <div>סטטוס: {
                            terminal.readinessStatus === 'ready' ? 'כשיר' :
                              terminal.readinessStatus === 'partly_ready' ? 'כשיר חלקית' : 'תקול'
                          }</div>
                        </div>
                      }
                      arrow
                    >
                      <TerminalCell
                        $status={terminal.readinessStatus}
                        $isAllocated={terminal.isAllocated}
                        onClick={() => onTerminalClick(terminal)}
                      >
                        {terminal.name}
                      </TerminalCell>

                    </Tooltip>
                  ))
                ) : (
                  <div style={{ color: 'rgba(255,255,255,0.3)', padding: '16px', gridColumn: '1 / -1' }}>
                    אין טרמינלים
                  </div>
                )}
              </TerminalsGridCell>
            </DataRow>
          ))}

        </tbody>
      </Table>
    </MatrixContainer>
  );
};
