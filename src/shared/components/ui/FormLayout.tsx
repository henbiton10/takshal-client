import styled from 'styled-components';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '../../../theme';

export const FormContainer = styled(Box)`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xl} ${theme.spacing.xxl};
  direction: rtl;
`;

const FormHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  direction: rtl;
`;

export const FormTitle = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 0;
  text-align: center;
  flex: 1;
  direction: rtl;
`;

const CloseButton = styled(IconButton)`
  && {
    color: rgba(225, 234, 255, 0.6);
    padding: 8px;
    
    &:hover {
      color: ${theme.colors.text.white};
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

interface FormHeaderProps {
  title: string;
  onClose?: () => void;
}

export const FormHeader = ({ title, onClose }: FormHeaderProps) => {
  return (
    <FormHeaderContainer>
      {onClose && (
        <CloseButton onClick={onClose}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </CloseButton>
      )}
      <FormTitle>{title}</FormTitle>
    </FormHeaderContainer>
  );
};

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  direction: rtl;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidthField = styled.div`
  grid-column: 1 / -1;
  direction: rtl;
`;

export const FieldWrapper = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.lg};
  padding: 14px;
  direction: rtl;
  text-align: right;
`;

export const CombinedFieldWrapper = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.lg};
  direction: rtl;
  text-align: right;
  display: flex;
  gap: 0;
`;

interface CombinedFieldSectionProps {
  hasBorder?: boolean;
  flexBasis?: string;
}

export const CombinedFieldSection = styled.div<CombinedFieldSectionProps>`
  padding: 14px;
  flex: ${props => props.flexBasis ? `1 1 ${props.flexBasis}` : '1'};
  min-width: 0;
  ${props => props.hasBorder && `
    border-left: 1px solid ${theme.colors.border.divider};
  `}
`;

interface FieldLabelProps {
  $required?: boolean;
}

export const FieldLabel = styled.label<FieldLabelProps>`
  display: block;
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.md};
  text-align: right;
  direction: rtl;
  
  &::after {
    content: '${props => props.$required ? ' *' : ''}';
    color: ${theme.colors.error.main};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
  direction: rtl;
`;
