import styled from 'styled-components';
import PublicIcon from '@mui/icons-material/Public';
import { DashboardNetwork } from './types';

const MatrixContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  direction: rtl;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(30, 45, 80, 0.3);
  border-radius: 6px;

  svg {
    font-size: 16px;
  }
`;

const NetworksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NetworkRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NetworkLabel = styled.div`
  min-width: 100px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  text-align: center;
`;

const TerminalsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
`;

const TerminalBadge = styled.div`
  padding: 6px 10px;
  font-size: 10px;
  font-weight: 500;
  color: white;
  background: #4b5563;
  border-radius: 4px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

interface Props {
  networks: DashboardNetwork[];
}

export const NetworksMatrix = ({ networks }: Props) => {
  if (networks.length === 0) {
    return (
      <MatrixContainer>
        <SectionLabel>
          <PublicIcon />
          רשתות
        </SectionLabel>
        <EmptyState>אין רשתות להצגה</EmptyState>
      </MatrixContainer>
    );
  }

  return (
    <MatrixContainer>
      <SectionLabel>
        <PublicIcon />
        רשתות
      </SectionLabel>
      <NetworksGrid>
        {networks.map(network => (
          <NetworkRow key={network.id}>
            <NetworkLabel>{network.name}</NetworkLabel>
            <TerminalsContainer>
              {network.terminals.map(terminal => (
                <TerminalBadge key={terminal.id}>
                  {terminal.name}
                </TerminalBadge>
              ))}
            </TerminalsContainer>
          </NetworkRow>
        ))}
      </NetworksGrid>
    </MatrixContainer>
  );
};
