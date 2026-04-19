import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const ViewHeaderWrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 20px;
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  direction: rtl;
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
  color: #fafafa;
  font-size: 16px;
  font-weight: 700;
`;

export const DynamicRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  direction: rtl;
  background: rgba(255, 255, 255, 0.04);
  padding: 12px 12px 12px 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  position: relative;
`;

export const SubRow = styled(DynamicRow)`
  margin-left: 0;
  margin-right: 40px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 8px 8px 0;
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
    border-right: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 0 0 8px 0;
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
  background: #2e3c5a;
  border: 1px solid #3d62b2;
  color: #fafafa;
  padding: 8px 16px 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 40px;
  margin-bottom: 20px;
  transition: all 0.2s;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  &:hover {
    background: #364669;
    border-color: #4d73c7;
  }
`;
