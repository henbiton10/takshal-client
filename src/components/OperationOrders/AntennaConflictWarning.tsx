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
      background: rgb(30, 45, 70);
      border-radius: 12px;
      min-width: 500px;
      max-width: 600px;
      direction: rtl;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: #f59e0b;
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
    border-top: 1px solid rgba(174, 199, 255, 0.1);
  }
`;

const CancelButton = styled(Button)`
  && {
    background: rgba(51, 65, 85, 0.9);
    color: white;
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    border: 1px solid rgba(100, 116, 139, 0.5);
    
    &:hover {
      background: rgba(71, 85, 105, 1);
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background: rgba(245, 158, 11, 0.25);
    color: #f59e0b;
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    border: 1px solid rgba(245, 158, 11, 0.4);
    
    &:hover {
      background: rgba(245, 158, 11, 0.35);
    }
  }
`;

const ConflictCard = styled.div`
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
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
  color: #f59e0b;
  margin-bottom: 12px;
`;

const ConflictDetail = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
  color: rgba(225, 234, 255, 0.9);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: rgba(225, 234, 255, 0.6);
  min-width: 100px;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const WarningMessage = styled(Typography)`
  && {
    color: rgba(225, 234, 255, 0.8);
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
