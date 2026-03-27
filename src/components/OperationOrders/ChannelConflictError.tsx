import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ChannelConflict } from '../../services/api/types';

interface ChannelConflictErrorProps {
  open: boolean;
  conflicts: ChannelConflict[];
  onClose: () => void;
}

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      background: rgb(30, 45, 70);
      border-radius: 12px;
      min-width: 500px;
      max-width: 600px;
      direction: rtl;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: #ef4444;
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

const CloseButton = styled(Button)`
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

const ConflictCard = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
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
  color: #ef4444;
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

const ErrorMessage = styled(Typography)`
  && {
    color: rgba(225, 234, 255, 0.8);
    font-size: 14px;
    text-align: right;
    margin-bottom: 16px;
  }
`;

export const ChannelConflictError = ({
  open,
  conflicts,
  onClose,
}: ChannelConflictErrorProps) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <ErrorOutlineIcon sx={{ fontSize: 24 }} />
        שגיאה - ערוץ תפוס
      </StyledDialogTitle>
      <StyledDialogContent>
        <ErrorMessage>
          הערוץ שבחרת כבר תפוס בפקודת מבצע אחרת עם זמנים חופפים. יש לבחור ערוץ אחר.
        </ErrorMessage>
        
        {conflicts.map((conflict, index) => (
          <ConflictCard key={index}>
            <ConflictTitle>
              {conflict.direction === 'transmission' ? 'שידור' : 'קליטה'}
            </ConflictTitle>
            <ConflictDetail>
              <DetailLabel>ערוץ:</DetailLabel>
              <DetailValue>{conflict.channelNumber}</DetailValue>
            </ConflictDetail>
            <ConflictDetail>
              <DetailLabel>תפוס בפקודה:</DetailLabel>
              <DetailValue>{conflict.operationOrderName}</DetailValue>
            </ConflictDetail>
          </ConflictCard>
        ))}
      </StyledDialogContent>
      <StyledDialogActions>
        <CloseButton onClick={onClose}>
          הבנתי
        </CloseButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};
