import styled from 'styled-components';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FormContainer = styled(Box)`
  background: ${({ theme }) => theme.customColors.background.paper};
  border-radius: ${({ theme }) => theme.customBorderRadius.md};
  padding: ${({ theme }) => `${theme.customSpacing.xl} ${theme.customSpacing.xxl}`};
  direction: rtl;
`;

const FormHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.customSpacing.xl};
  direction: rtl;
`;

export const FormTitle = styled.h1`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: ${({ theme }) => theme.customTypography.fontSize.xl};
  font-weight: ${({ theme }) => theme.customTypography.fontWeight.medium};
  margin: 0;
  text-align: center;
  flex: 1;
  direction: rtl;
`;

const CloseButton = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.customColors.text.disabled};
    padding: 8px;
    
    &:hover {
      color: ${({ theme }) => theme.customColors.text.primary};
      background: ${({ theme }) => theme.customColors.action.hover};
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
  gap: ${({ theme }) => theme.customSpacing.lg};
  margin-bottom: ${({ theme }) => theme.customSpacing.lg};
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
  background: ${({ theme }) => theme.customColors.background.paper};
  border-radius: ${({ theme }) => theme.customBorderRadius.lg};
  padding: 14px;
  direction: rtl;
  text-align: right;
`;

export const CombinedFieldWrapper = styled.div`
  background: ${({ theme }) => theme.customColors.background.paper};
  border-radius: ${({ theme }) => theme.customBorderRadius.lg};
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
    border-left: 1px solid ${props.theme.customColors.border.divider};
  `}
`;

interface FieldLabelProps {
  $required?: boolean;
}

export const FieldLabel = styled.label<FieldLabelProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: right;
  direction: rtl;
  
  &::after {
    content: '${props => props.$required ? '*' : ''}';
    color: ${({ theme }) => theme.customColors.error.main};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.customSpacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.customSpacing.xl};
  direction: rtl;
`;

// NEW FIGMA LAYOUT COMPONENTS //

export const FormMainContainer = styled.div`
  background: ${({ theme }) => theme.customColors.background.glass};
  backdrop-filter: blur(40px);
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 24px;
  padding: 20px 28px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  max-height: 100%;
  min-height: 0;
  overflow: hidden;
  direction: rtl;
`;

export const FormScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 4px 0;
  
  /* Keep scrollbar on the right side */
  direction: ltr;
  
  & > * {
    direction: rtl;
  }

  /* Custom Scrollbar for Premium Feel */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.customColors.border.divider};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.customColors.border.subtle};
  }
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.customColors.background.subtle};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  direction: rtl;
`;

export const FormSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const FormSectionTitle = styled.h3`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 24px;
`;

export const FormFieldRow = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 200px;
  }
`;

export const FormHeaderTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 18px auto;
  direction: rtl;
`;

export const FormTitleLarge = styled.h2`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-family: inherit;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: right;
`;

export const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: right;
  letter-spacing: 0.18px;
`;

export const FormBottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.customColors.border.divider};
  padding-top: 17px;
  margin-top: auto;
  flex-shrink: 0;
`;

export const FieldsNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.customColors.text.disabled};
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;

  span {
    color: ${({ theme }) => theme.customColors.error.main};
  }
`;

export const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const FormPrimaryButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.status.ready};
    color: ${({ theme }) => theme.customColors.text.white};
    border-radius: 12px;
    padding: 12px 24px;
    min-width: 160px;
    white-space: nowrap;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.2);
    border: none;
    
    &:hover {
      background: ${({ theme }) => theme.customColors.status.ready};
      opacity: 0.9;
    }
    
    &:disabled {
      background: ${({ theme }) => theme.customColors.primary.disabled};
      color: ${({ theme }) => theme.customColors.text.disabled};
      box-shadow: none;
    }
    
    .MuiButton-startIcon {
      margin-left: 8px;
      margin-right: 0;
    }
  }
`;

export const FormSecondaryButton = styled(Button)`
  && {
    color: ${({ theme }) => theme.customColors.text.secondary};
    padding: 12px 20px;
    min-width: 102px;
    white-space: nowrap;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    border-radius: 12px;
    
    &:hover {
      background: ${({ theme }) => theme.customColors.action.hover};
      color: ${({ theme }) => theme.customColors.text.primary};
    }
  }
`;

export const FormDeleteButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.error.subtle};
    border: 1px solid ${({ theme }) => theme.customColors.error.main};
    color: ${({ theme }) => theme.customColors.error.main};
    border-radius: 12px;
    padding: 12px 20px;
    min-width: 149px;
    white-space: nowrap;
    height: 48px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    
    &:hover {
      background: ${({ theme }) => theme.customColors.error.subtle};
      opacity: 0.8;
    }
    
    .MuiButton-startIcon {
      margin-left: 8px;
      margin-right: 0;
    }
  }
`;

export const FormAddButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.background.subtle};
    border: 1px solid ${({ theme }) => theme.customColors.border.divider};
    border-radius: 12px;
    padding: 8px 16px 8px 12px;
    color: ${({ theme }) => theme.customColors.text.primary};
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: ${({ theme }) => theme.customColors.action.hover};
      border-color: ${({ theme }) => theme.customColors.border.accent};
    }
    
    .MuiButton-startIcon {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;
