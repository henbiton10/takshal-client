import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
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
      background:  rgb(60, 75, 100)';
      border-radius: ${theme.borderRadius.lg};
      min-width: 400px;
      direction: rtl;
    }
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    color: ${theme.colors.text.white};
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.semiBold};
    padding: 20px 24px 16px;
    text-align: right;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 0 24px 20px;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 16px 0;
    gap: 12px;
    justify-content: flex-end;
  }
`;

const CancelButton = styled(Button)`
  && {
    background: ${theme.colors.background.light};
    color: ${theme.colors.text.white};
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    
    &:hover {
      background: rgba(70, 85, 110, 0.8);
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background: #f44336;
    color: white;
    border-radius: 20px;
    padding: 8px 24px;
    text-transform: none;
    font-size: 14px;
    
    &:hover {
      background: #d32f2f;
    }
  }
`;

export const ConfirmDialog = ({
  open,
  title = 'אישור מחיקה',
  message,
  confirmText = 'מחק',
  cancelText = 'ביטול',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <StyledDialog open={open} onClose={onCancel}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>
        <Typography sx={{ color: 'rgba(225, 234, 255, 0.8)', fontSize: '14px', textAlign: 'right' }}>
          {message}
        </Typography>
      </StyledDialogContent>
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
