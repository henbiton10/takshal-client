import styled from 'styled-components';
import { Button } from '@mui/material';
import { theme } from '../../../theme';

interface StyledButtonProps {
  variant?: 'contained' | 'outlined';
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    border-radius: ${theme.borderRadius.sm};
    padding: 6px ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    text-transform: none;
    min-width: 80px;
    
    ${(props) =>
      props.variant === 'outlined' &&
      `
      border-color: ${theme.colors.border.accent};
      color: ${theme.colors.text.secondary};
      background: ${theme.colors.background.subtle};
      
      &:hover {
        border-color: ${theme.colors.border.accentHover};
        background: rgba(100, 110, 130, 0.6);
      }
      
      .MuiButton-startIcon {
        margin-left: ${theme.spacing.sm};
        margin-right: -4px;
      }
    `}
    
    ${(props) =>
      props.variant === 'contained' &&
      `
      background: ${theme.colors.primary.main};
      
      &:hover {
        background: ${theme.colors.primary.hover};
      }
      
      &:disabled {
        background: ${theme.colors.primary.disabled};
        color: ${theme.colors.text.disabled};
      }
    `}
  }
`;
