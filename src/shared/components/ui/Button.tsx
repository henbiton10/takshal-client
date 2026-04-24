import styled from 'styled-components';
import { Button } from '@mui/material';

interface StyledButtonProps {
  variant?: 'contained' | 'outlined';
}

export const StyledButton = styled(Button) <StyledButtonProps>`
  && {
    border-radius: ${({ theme }: any) => theme.customBorderRadius.sm};
    padding: 6px ${({ theme }: any) => theme.customSpacing.lg};
    font-size: ${({ theme }: any) => theme.customTypography.fontSize.xs};
    font-weight: ${({ theme }: any) => theme.customTypography.fontWeight.medium};
    text-transform: none;
    min-width: 80px;
    
    ${(props: any) =>
    props.variant === 'outlined' &&
    `
      border-color: ${props.theme.customColors.border.primary};
      color: ${props.theme.customColors.text.secondary};
      background: ${props.theme.customColors.background.subtle};
      
      &:hover {
        border-color: ${props.theme.customColors.border.hover};
        background: ${props.theme.customColors.action.hover};
      }
      
      .MuiButton-startIcon {
        margin-right: ${props.theme.customSpacing.sm};
        margin-left: -4px;
      }
    `}
    
    ${(props: any) =>
    props.variant === 'contained' &&
    `
      background: ${props.theme.customColors.primary.main};
      
      &:hover {
        background: ${props.theme.customColors.primary.hover};
      }
      
      &:disabled {
        background: ${props.theme.customColors.primary.disabled};
        color: ${props.theme.customColors.text.disabled};
      }
    `}
  }
`;
