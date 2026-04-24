import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const ViewHeaderWrapper = styled.div`
  background: ${({ theme }) => theme.customColors.background.glass};
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  direction: rtl;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.4);
`;

export const ViewTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ViewTitle = styled.h3`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewFieldsRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const ViewField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ViewLabel = styled.span`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
`;

export const ViewValue = styled.span`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 16px;
  font-weight: 700;
`;

export const DynamicRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  direction: rtl;
  background: ${({ theme }) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.04)'};
  padding: 12px 12px 12px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  position: relative;
`;

export const SubRow = styled(DynamicRow)`
  margin-left: 0;
  margin-right: 40px;
  background: ${({ theme }) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255, 255, 255, 0.02)'};
  border-left: 2px solid ${({ theme }) => theme.customColors.primary.main};
  border-radius: 0 12px 12px 0;
  margin-top: -8px;
  margin-bottom: 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    right: -24px;
    top: 0;
    width: 20px;
    height: 20px;
    border-right: 2px solid ${({ theme }) => theme.customColors.primary.main};
    border-bottom: 2px solid ${({ theme }) => theme.customColors.primary.main};
    border-radius: 0 0 12px 0;
  }
`;

export const ActionIconButton = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.palette.text.secondary};
    background: ${({ theme }) => theme.palette.action.hover};
    border-radius: 8px;
    padding: 6px 12px;
    
    &:hover {
      background: ${({ theme }) => theme.palette.action.selected};
      color: ${({ theme }) => theme.palette.text.primary};
    }
    
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  color: ${({ theme }) => theme.palette.text.disabled};
  display: flex;
  align-items: center;
  padding: 4px 0px;
  border-radius: 4px;
  align-self: stretch;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  
  &:active {
    cursor: grabbing;
  }
`;

export const AddSubButton = styled.button`
  background: ${({ theme }) => theme.palette.mode === 'light' ? theme.customColors.background.paper : theme.customColors.background.glass};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  color: ${({ theme }) => theme.customColors.text.primary};
  padding: 8px 16px 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 40px;
  margin-bottom: 20px;
  transition: all 0.2s;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  &:hover {
    background: ${({ theme }) => theme.customColors.action.hover};
    border-color: ${({ theme }) => theme.customColors.border.accent};
  }
`;
