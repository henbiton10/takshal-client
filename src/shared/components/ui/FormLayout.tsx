import styled from 'styled-components';
import { Box, Button, IconButton } from '@mui/material';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e1eaff;
  font-family: 'Assistant', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: right;
  direction: rtl;
  
  &::after {
    content: '${props => props.$required ? '*' : ''}';
    color: #fb2c36;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
  direction: rtl;
`;

// NEW FIGMA LAYOUT COMPONENTS //

export const FormMainContainer = styled.div`
  background: rgba(45, 58, 89, 0.55);
  border-radius: 24px;
  padding: 20px 28px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 18px;
  direction: rtl;
`;

export const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.04);
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
  color: #e1eaff;
  font-family: 'Assistant', sans-serif;
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
  color: #FAFAFA;
  font-family: 'Assistant', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: right;
`;

export const FormSubtitle = styled.p`
  color: #E1EAFF;
  font-family: 'Assistant', sans-serif;
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
  border-top: 1px solid #305088;
  padding-top: 17px;
  margin-top: 6px;
`;

export const FieldsNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ccc;
  font-family: 'Assistant', sans-serif;
  font-size: 16px;
  font-weight: 600;

  span {
    color: #fb2c36;
  }
`;

export const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const FormPrimaryButton = styled(Button)`
  && {
    background: linear-gradient(180deg, rgba(99, 255, 106, 0.5) 0%, rgba(66, 228, 73, 0.5) 100%);
    color: #FAFAFA;
    border-radius: 12px;
    padding: 12px 24px;
    width: 160px;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    box-shadow: 0px 10px 15px 0px rgba(13, 84, 43, 0.3), 0px 4px 6px 0px rgba(13, 84, 43, 0.3);
    border: none;
    
    &:hover {
      background: linear-gradient(180deg, rgba(99, 255, 106, 0.6) 0%, rgba(66, 228, 73, 0.6) 100%);
    }
    
    &:disabled {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.3);
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
    color: #CCC;
    padding: 12px 20px;
    width: 102px;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    border-radius: 12px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #FAFAFA;
    }
  }
`;

export const FormDeleteButton = styled(Button)`
  && {
    background: rgba(255, 77, 77, 0.21);
    border: 1px solid rgba(255, 77, 77, 0.5);
    color: #FF7878;
    border-radius: 12px;
    padding: 12px 20px;
    width: 149px;
    height: 48px;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: none;
    
    &:hover {
      background: rgba(255, 77, 77, 0.3);
      border-color: rgba(255, 77, 77, 0.7);
    }
    
    .MuiButton-startIcon {
      margin-left: 8px;
      margin-right: 0;
    }
  }
`;
export const FormAddButton = styled(Button)`
  && {
    background: #2e3c5a;
    border: 1px solid #3d62b2;
    border-radius: 12px;
    padding: 8px 12px 8px 16px; 
    color: #FAFAFA;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1);
    
    &:hover {
      background: #37486e;
      border-color: #4a75cc;
    }
    
    // In RTL, startIcon is on the right by default.
    // We want the icon on the RIGHT of the text.
    .MuiButton-startIcon {
      margin-left: 8px;
      margin-right: 0;
    }
  }
`;
