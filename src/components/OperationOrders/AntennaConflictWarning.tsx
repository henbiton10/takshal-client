import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { AntennaSatelliteConflict } from '../../services/api/types';

interface AntennaConflictWarningProps {
  open: boolean;
  conflicts: AntennaSatelliteConflict[];
  onConfirm: () => void;
  onCancel: () => void;
}

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      background: ${({ theme }) => theme.customColors.background.default};
      border-radius: 12px;
      min-width: 500px;
      max-width: 600px;
      direction: rtl;
      border: 1px solid ${({ theme }) => theme.customColors.status.partlyReady}4D;
    }
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: ${({ theme }) => theme.customColors.status.partlyReady};
    font-size: 18px;
    font-weight: 600;
    padding: 20px 24px 16px;
    text-align: right;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 0 24px 20px;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 16px 24px;
    gap: 12px;
    justify-content: flex-start;
    border-top: 1px solid ${({ theme }) => theme.customColors.border.divider};
  }
`;

const CancelButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.background.medium};
    color: ${({ theme }) => theme.customColors.text.white};
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.customColors.border.primary};
    
    &:hover {
      background: ${({ theme }) => theme.customColors.action.hover};
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.status.partlyReady}40;
    color: ${({ theme }) => theme.customColors.status.partlyReady};
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.customColors.status.partlyReady}66;
    
    &:hover {
      background: ${({ theme }) => theme.customColors.status.partlyReady}59;
    }
  }
`;

const ConflictCard = styled.div`
  background: ${({ theme }) => theme.customColors.status.partlyReady}1A;
  border: 1px solid ${({ theme }) => theme.customColors.status.partlyReady}33;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ConflictTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.customColors.status.partlyReady};
  margin-bottom: 12px;
`;

const ConflictDetail = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.customColors.text.primary};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: ${({ theme }) => theme.customColors.text.secondary};
  min-width: 100px;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const WarningMessage = styled(Typography)`
  && {
    color: ${({ theme }) => theme.customColors.text.secondary};
    font-size: 14px;
    text-align: right;
    margin-bottom: 16px;
  }
`;

export const AntennaConflictWarning = ({
  open,
  conflicts,
  onConfirm,
  onCancel,
}: AntennaConflictWarningProps) => {
  return (
    <StyledDialog open={open} onClose={onCancel}>
      <StyledDialogTitle>
        <WarningAmberIcon sx={{ fontSize: 24 }} />
        אזהרה - התנגשות באנטנה
      </StyledDialogTitle>
      <StyledDialogContent>
        <WarningMessage>
          האנטנה שבחרת כבר מצומדת ללוויין אחר בפקודת מבצע עם זמנים חופפים. האם אתה בטוח שברצונך להמשיך?
        </WarningMessage>
        
        {conflicts.map((conflict, index) => (
          <ConflictCard key={index}>
            <ConflictTitle>
              {conflict.direction === 'transmission' ? 'שידור' : 'קליטה'}
            </ConflictTitle>
            <ConflictDetail>
              <DetailLabel>אנטנה:</DetailLabel>
              <DetailValue>{conflict.antennaName}</DetailValue>
            </ConflictDetail>
            <ConflictDetail>
              <DetailLabel>מקושרת ללוויין:</DetailLabel>
              <DetailValue>{conflict.conflictingSatelliteName}</DetailValue>
            </ConflictDetail>
            <ConflictDetail>
              <DetailLabel>בפקודה:</DetailLabel>
              <DetailValue>{conflict.operationOrderName}</DetailValue>
            </ConflictDetail>
            <ConflictDetail>
              <DetailLabel>לוויין מבוקש:</DetailLabel>
              <DetailValue>{conflict.requestedSatelliteName}</DetailValue>
            </ConflictDetail>
          </ConflictCard>
        ))}
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={onCancel}>
          ביטול
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          המשך בכל זאת
        </ConfirmButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};
