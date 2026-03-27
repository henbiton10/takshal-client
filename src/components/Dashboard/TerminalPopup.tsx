import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { DashboardTerminal } from './types';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: #0f1d32;
  border: 1px solid rgba(174, 199, 255, 0.15);
  border-radius: 12px;
  min-width: 400px;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  direction: rtl;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(30, 45, 80, 0.5);
  border-bottom: 1px solid rgba(174, 199, 255, 0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TerminalName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: white;

  svg {
    font-size: 20px;
  }
`;

const StatusBadge = styled.div<{ $status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: ${props => {
    switch (props.$status) {
      case 'ready': return 'rgba(34, 197, 94, 0.2)';
      case 'partly_ready': return 'rgba(234, 179, 8, 0.2)';
      case 'damaged': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'ready': return '#22c55e';
      case 'partly_ready': return '#eab308';
      case 'damaged': return '#ef4444';
      default: return '#9ca3af';
    }
  }};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
`;

const PopupContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
`;

const AllocationCard = styled.div`
  background: rgba(20, 35, 65, 0.5);
  border: 1px solid rgba(174, 199, 255, 0.1);
  border-radius: 10px;
`;

const AllocationHeader = styled.div<{ $direction: 'transmission' | 'reception' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: ${props => props.$direction === 'transmission' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(59, 130, 246, 0.15)'};
  border-bottom: 1px solid rgba(174, 199, 255, 0.08);
`;

const BandBadge = styled.div<{ $band: 'ka' | 'ku' }>`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$band === 'ku' ? '#22c55e' : '#f97316'};
  color: white;
`;

const FrequencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
`;

const DirectionLabel = styled.span<{ $direction: 'transmission' | 'reception' }>`
  color: ${props => props.$direction === 'transmission' ? '#f97316' : '#3b82f6'};
  font-weight: 500;
`;

const AllocationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 12px 14px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: rgba(30, 45, 80, 0.4);
  border-radius: 6px;
`;

const DetailLabel = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: white;
  font-weight: 500;

  svg {
    font-size: 14px;
    opacity: 0.7;
  }
`;

const NoAllocations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  gap: 8px;

  .message {
    font-size: 14px;
  }

  .sub-message {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
  }
`;

interface Props {
  terminal: DashboardTerminal;
  onClose: () => void;
}

export const TerminalPopup = ({ terminal, onClose }: Props) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return 'פעיל';
      case 'partly_ready': return 'כשיר חלקית';
      case 'damaged': return 'תקול';
      default: return status;
    }
  };

  const getDirectionLabel = (direction: 'transmission' | 'reception') => {
    return direction === 'transmission' ? 'שידור' : 'קליטה';
  };

  return (
    <Overlay onClick={onClose}>
      <PopupContainer onClick={e => e.stopPropagation()}>
        <PopupHeader>
          <HeaderLeft>
            <TerminalName>
              <TerminalIcon />
              {terminal.name}
            </TerminalName>
            <StatusBadge $status={terminal.readinessStatus}>
              {getStatusLabel(terminal.readinessStatus)}
            </StatusBadge>
          </HeaderLeft>
          <CloseButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </CloseButton>
        </PopupHeader>

        <PopupContent>
          {terminal.allocations.length > 0 ? (
            terminal.allocations.map((alloc, idx) => (
              <AllocationCard key={idx}>
                <AllocationHeader $direction={alloc.direction}>
                  <BandBadge $band={alloc.frequencyBand}>
                    {alloc.frequencyBand.toUpperCase()}
                  </BandBadge>
                  <FrequencyInfo>
                    {alloc.frequency.toFixed(2)} MHz |{' '}
                    <DirectionLabel $direction={alloc.direction}>
                      {getDirectionLabel(alloc.direction)}
                    </DirectionLabel>
                  </FrequencyInfo>
                </AllocationHeader>

                <AllocationDetails>
                  <DetailItem>
                    <DetailLabel>לוויין</DetailLabel>
                    <DetailValue>
                      <SatelliteAltIcon />
                      {alloc.satellite || 'לא קיים'}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>אנטנה</DetailLabel>
                    <DetailValue>
                      <SettingsInputAntennaIcon />
                      {alloc.antenna || 'לא קיים'}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>גודל אנטנה</DetailLabel>
                    <DetailValue>
                      {alloc.antennaSize || 'N/A'} מ'
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>ערוץ</DetailLabel>
                    <DetailValue>
                      {alloc.channel || 'לא קיים'}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>תחום תדר</DetailLabel>
                    <DetailValue>
                      {alloc.frequencyBand.toUpperCase()}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>קישוריות</DetailLabel>
                    <DetailValue>
                      {alloc.connectivity || 'ענותות'}
                    </DetailValue>
                  </DetailItem>
                </AllocationDetails>
              </AllocationCard>
            ))
          ) : (
            <NoAllocations>
              <div className="message">אין הקצאות פעילות</div>
              <div className="sub-message">הטרמינל לא מוקצה כרגע</div>
            </NoAllocations>
          )}
        </PopupContent>
      </PopupContainer>
    </Overlay>
  );
};
