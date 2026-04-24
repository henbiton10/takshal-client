import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { DashboardTerminal } from './types';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { useTheme } from '@mui/material/styles';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: ${({ theme }) => theme.customColors.background.glass};
  backdrop-filter: blur(40px);
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 16px;
  width: 820px;
  max-width: 95vw;
  max-height: 85vh;

  overflow: hidden;
  direction: rtl;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.4);
  padding: 24px 32px;
  gap: 24px;
`;


const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider};
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
  color: ${({ theme }) => theme.palette.mode === 'dark' ? theme.customColors.text.white : theme.customColors.text.primary};

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
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    switch (props.$status) {
      case 'ready': return `${ready}33`; // 20% opacity
      case 'partly_ready': return `${partlyReady}33`;
      case 'damaged': return `${damaged}33`;
      default: return props.theme.customColors.background.medium;
    }
  }};
  color: ${props => {
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    switch (props.$status) {
      case 'ready': return ready;
      case 'partly_ready': return partlyReady;
      case 'damaged': return damaged;
      default: return props.theme.customColors.text.disabled;
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
  background: ${({ theme }) => theme.customColors.action.hover};
  border-radius: 100px;
  color: ${({ theme }) => theme.palette.mode === 'dark' ? theme.customColors.text.white : theme.customColors.text.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.customColors.action.selected};
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
    background: ${({ theme }) => theme.customColors.border.divider};
    border-radius: 10px;
  }
`;


const AllocationCard = styled.div`
  border: 1px solid ${({ theme }) => theme.customColors.border.subtle};
  border-right: none;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;


const CardInner = styled.div<{ $status: string }>`
  background: ${({ theme }) => theme.customColors.background.subtle};
  border-right: 2px solid ${props => {
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    switch (props.$status) {
      case 'ready': return ready;
      case 'partly_ready': return partlyReady;
      case 'damaged': return damaged;
      default: return props.theme.customColors.text.primary;
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
    const { status: statusColors, text, border } = props.theme.customColors;
    if (props.$band === 'ka') return `background: ${statusColors.ka}33; color: ${statusColors.ka}; border: 1px solid ${statusColors.ka}33;`;
    if (props.$band === 'ku') return `
      background: ${props.theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}; 
      color: ${text.primary}; 
      border: 1px solid ${border.divider};
    `;
    return `background: ${props.theme.customColors.background.medium}; color: ${props.theme.customColors.text.secondary};`;
  }}
`;


const FrequencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.customColors.text.primary};
`;

const DirectionLabel = styled.span<{ $direction: 'transmission' | 'reception' }>`
  color: ${props => props.$direction === 'transmission' ? props.theme.customColors.error.main : props.theme.customColors.primary.main};
  font-weight: 500;
`;

const AllocationDetails = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const DetailColumn = styled.div`
  background: ${({ theme }) => theme.customColors.background.light};
  flex: 1;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
`;

const DetailItem = styled.div`
  background: ${({ theme }) => theme.customColors.background.subtle};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
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
  color: ${({ theme }) => theme.customColors.text.disabled};
  font-weight: 600;
  white-space: nowrap;
`;


const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.customColors.text.secondary};
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
  color: ${({ theme }) => theme.customColors.text.disabled};
  text-align: center;
  gap: 8px;

  .message {
    font-size: 14px;
  }

  .sub-message {
    font-size: 12px;
    color: ${({ theme }) => theme.customColors.text.placeholder};
  }
`;

interface Props {
  terminal: DashboardTerminal;
  onClose: () => void;
}

export const TerminalPopup = ({ terminal, onClose }: Props) => {
  const theme = useTheme();
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
      <PopupContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
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
                        <SettingsInputAntennaIcon sx={{ fontSize: 16, color: (theme) => theme.palette.mode === 'dark' ? theme.customColors.text.white : theme.customColors.text.secondary }} />
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
                            {alloc.antennaSize || '15'} <span style={{ fontSize: '12px', color: theme.customColors.text.disabled, fontWeight: 600 }}>מטר</span>
                          </DetailValue>
                        </DetailItem>
                      </div>
                    </DetailColumn>

                    <DetailColumn>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px', justifyContent: 'flex-start', width: '100%' }}>
                        <SatelliteAltIcon sx={{ fontSize: 16, color: (theme) => theme.palette.mode === 'dark' ? theme.customColors.text.white : theme.customColors.text.secondary }} />
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
