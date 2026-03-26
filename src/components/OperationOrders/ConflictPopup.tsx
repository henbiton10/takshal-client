import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import { AllocationData } from '../../services/api/types';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(6, 15, 35, 0.98);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    min-width: 450px;
    max-width: 600px;
    direction: rtl;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(239, 68, 68, 0.2);
`;

const WarningIconStyled = styled(WarningIcon)`
  color: #ef4444;
  font-size: 28px;
`;

const Title = styled.h2`
  color: rgba(225, 234, 255, 0.9);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const DialogContent = styled.div`
  padding: 24px;
`;

const Description = styled.p`
  color: rgba(225, 234, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const ConflictsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

const ConflictItem = styled.div`
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
`;

const ConflictTitle = styled.div`
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ConflictDetails = styled.div`
  color: rgba(225, 234, 255, 0.6);
  font-size: 13px;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
  justify-content: flex-start;
`;

const SaveAnywayButton = styled(Button)`
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: rgba(225, 234, 255, 0.7);
  padding: 8px 20px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

interface ConflictPopupProps {
  open: boolean;
  conflicts: Array<{
    allocation: AllocationData;
    type: 'transmission' | 'reception';
    message: string;
  }>;
  onSaveAnyway: () => void;
  onCancel: () => void;
}

export const ConflictPopup = ({
  open,
  conflicts,
  onSaveAnyway,
  onCancel,
}: ConflictPopupProps) => {
  return (
    <StyledDialog open={open} onClose={onCancel}>
      <DialogHeader>
        <WarningIconStyled />
        <Title>זוהו קונפליקטים בהקצאות</Title>
      </DialogHeader>
      <DialogContent>
        <Description>
          נמצאו קונפליקטים בהקצאות הבאות. האם ברצונך להמשיך בשמירה למרות הקונפליקטים?
          הקצאות עם קונפליקטים יסומנו בטבלה.
        </Description>
        <ConflictsList>
          {conflicts.map((conflict, index) => (
            <ConflictItem key={index}>
              <ConflictTitle>
                הקצאה #{conflict.allocation.orderNumber}
                {conflict.allocation.subOrderNumber
                  ? `.${conflict.allocation.subOrderNumber}`
                  : ''}
                {' - '}
                {conflict.type === 'transmission' ? 'שידור' : 'קליטה'}
              </ConflictTitle>
              <ConflictDetails>{conflict.message}</ConflictDetails>
            </ConflictItem>
          ))}
        </ConflictsList>
      </DialogContent>
      <DialogActions>
        <SaveAnywayButton onClick={onSaveAnyway}>שמור בכל זאת</SaveAnywayButton>
        <CancelButton onClick={onCancel}>ביטול</CancelButton>
      </DialogActions>
    </StyledDialog>
  );
};
