import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Divider } from '@mui/material';
import styled from 'styled-components';
import deleteIcon from '../../../assets/delete.svg';

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
      background: #1c2439;
      border: 1px solid #305088;
      border-radius: 12px;
      width: 318px;
      padding: 24px;
      box-shadow: 0px 0px 12px 0px rgba(255, 77, 77, 0.24);
      direction: rtl;
      overflow: hidden;
      gap: 12px;
    }
    
    .MuiBackdrop-root {
      background-color: rgba(10, 17, 34, 0.85);
      backdrop-filter: blur(4px);
    }
  }
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 24px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: #fafafa;
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
    color: #cccccc;
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.14px;
  }
`;

const StyledDivider = styled(Divider)`
  && {
    border-color: #305088;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CancelButton = styled(Button)`
  && {
    background: transparent;
    color: #cccccc;
    border-radius: 10px;
    padding: 8px 12px;
    text-transform: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.16px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fafafa;
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background: #ff4d4d;
    color: #FAFAFA;
    border-radius: 10px;
    padding: 8px 12px;
    text-transform: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.16px;
    
    &:hover {
      background: #ff3333;
      box-shadow: 0 0 15px rgba(255, 77, 77, 0.4);
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
          <img src={deleteIcon} alt="מחיקה" style={{ width: '24px', height: '24px' }} />
        </IconWrapper>
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <StyledDialogContent>
          {message}
        </StyledDialogContent>
      </ContentWrapper>
      <StyledDivider />
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
