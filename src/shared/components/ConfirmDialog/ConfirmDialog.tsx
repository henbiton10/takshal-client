import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styled from 'styled-components';
import { theme } from '../../../theme';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      background: #1C2439;
      border: 1px solid #305088;
      border-radius: 12px;
      min-width: 440px;
      box-shadow: 0px 0px 12px 0px rgba(255, 77, 77, 0.24);
      direction: rtl;
      overflow: hidden;
    }
  }
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 12px;
  text-align: center;
`;

const IconWrapper = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(255, 77, 77, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    font-size: 24px;
    color: #FF4D4D;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: #FAFAFA;
    font-family: 'Assistant', sans-serif;
    font-size: 18px;
    font-weight: 700;
    padding: 0;
    margin-bottom: 4px;
    text-align: center;
    line-height: 24px;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 0;
    margin-bottom: 12px;
    color: #CCC;
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.14px;
  }
`;

const Separator = styled(Box)`
  width: 100%;
  height: 1px;
  background: #305088;
  margin-top: 12px;
`;

const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 12px 24px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CancelButton = styled(Button)`
  && {
    background: transparent;
    color: #CCC;
    border-radius: 10px;
    padding: 8px 12px;
    text-transform: none;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.16px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #FAFAFA;
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background: rgba(255, 77, 77, 0.8);
    color: #FAFAFA;
    border-radius: 10px;
    padding: 8px 12px;
    text-transform: none;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.16px;
    
    &:hover {
      background: rgba(255, 77, 77, 0.9);
    }
  }
`;

export const ConfirmDialog = ({
  open,
  title = 'אישור מחיקה',
  message,
  confirmText = 'מחק בכל זאת',
  cancelText = 'בטל',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <StyledDialog open={open} onClose={onCancel}>
      <ContentWrapper>
        <IconWrapper>
          <DeleteOutlineIcon />
        </IconWrapper>
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <StyledDialogContent>
          {message}
        </StyledDialogContent>
      </ContentWrapper>
      <Separator />
      <StyledDialogActions>
        <CancelButton onClick={onCancel}>
          {cancelText}
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          {confirmText}
        </ConfirmButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};
