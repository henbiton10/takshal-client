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
  background: #1c2439;
  border: 1px solid #305088;
  border-radius: 16px;
  width: 820px;
  max-width: 95vw;
  max-height: 85vh;

  overflow: hidden;
  direction: rtl;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 12px 0px rgba(36, 52, 96, 0.25);
  padding: 24px 32px;
  gap: 24px;
`;


const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  width: 100%;
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
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;


const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(174, 199, 255, 0.2);
    border-radius: 10px;
  }
`;


const AllocationCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-right: none;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;


const CardInner = styled.div<{ $status: string }>`
  background: rgba(255, 255, 255, 0.04);
  border-right: 2px solid ${props => {
    switch (props.$status) {
      case 'ready': return 'rgba(255, 255, 255, 0.8)';
      case 'partly_ready': return '#ff8800';
      case 'damaged': return '#ef4444';
      default: return 'rgba(255, 255, 255, 0.8)';
    }
  }};

  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;



const AllocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


const BandBadge = styled.div<{ $band: 'ka' | 'ku' }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  
  ${props => {
    if (props.$band === 'ka') return `background: rgba(255, 179, 0, 0.2); color: #ffb300; border: 1px solid rgba(255, 179, 0, 0.2);`;
    if (props.$band === 'ku') return `background: rgba(255, 255, 255, 0.6); color: #2c2c2c; border: 1px solid rgba(255, 255, 255, 0.4);`;
    return `background: rgba(225, 234, 255, 0.1); color: #e1eaff;`;
  }}
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
  display: flex;
  gap: 12px;
  width: 100%;
`;

const DetailColumn = styled.div`
  background: rgba(255, 255, 255, 0.04);
  flex: 1;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
`;

const DetailItem = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  flex: 1;
  min-width: 0;
`;





const DetailLabel = styled.div`
  font-size: 12px;
  color: #ccc;
  font-weight: 600;
  white-space: nowrap;
`;


const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #e1eaff;
  font-weight: 700;
  white-space: nowrap;


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
                <CardInner $status={terminal.readinessStatus}>
                  <AllocationHeader>
                    <FrequencyInfo>
                      <DirectionLabel $direction={alloc.direction}>
                        {getDirectionLabel(alloc.direction)}
                      </DirectionLabel>
                      {' '}| {alloc.frequency.toFixed(2)} MHz
                    </FrequencyInfo>
                    <BandBadge $band={alloc.frequencyBand}>
                      {alloc.frequencyBand.toUpperCase()}
                    </BandBadge>
                  </AllocationHeader>

                  <AllocationDetails>
                    <DetailColumn>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px', justifyContent: 'flex-start', width: '100%' }}>
                        <SettingsInputAntennaIcon sx={{ fontSize: 16, color: 'white' }} />
                        <DetailLabel>אנטנה</DetailLabel>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <DetailItem>
                          <DetailLabel>תחנה</DetailLabel>
                          <DetailValue>{alloc.connectivity || 'ענתות'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>תחום תדר</DetailLabel>
                          <DetailValue>{alloc.frequencyBand.toUpperCase()}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>קוטר</DetailLabel>
                          <DetailValue>
                            {alloc.antennaSize || '15'} <span style={{ fontSize: '12px', color: '#ccc', fontWeight: 600 }}>מטר</span>
                          </DetailValue>
                        </DetailItem>
                      </div>
                    </DetailColumn>

                    <DetailColumn>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px', justifyContent: 'flex-start', width: '100%' }}>
                        <SatelliteAltIcon sx={{ fontSize: 16, color: 'white' }} />
                        <DetailLabel>לוויין</DetailLabel>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <DetailItem>
                          <DetailLabel>שם לווין</DetailLabel>
                          <DetailValue>{alloc.satellite || 'sat 2'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>מספר משיב</DetailLabel>
                          <DetailValue>{alloc.channel || 'ba24-analog'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>ממיר תדר</DetailLabel>
                          <DetailValue>לא קיים</DetailValue>
                        </DetailItem>
                      </div>
                    </DetailColumn>
                  </AllocationDetails>
                </CardInner>

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
