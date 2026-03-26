import styled from 'styled-components';
import { theme } from '../../../theme';

interface EntityCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: (id: number) => void;
}

const CardContainer = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.$selected ? 'rgba(16, 33, 62, 0.62)' : theme.colors.background.medium};
  border-radius: ${theme.borderRadius.sm};
  padding: 8px 14px;
  gap: 4px;
  border: 1px solid ${props => props.$selected ? theme.colors.border.accent : theme.colors.border.subtle};
  transition: all 0.2s;
  cursor: pointer;
  min-height: 55px;
  min-width: 130px;
  
  &:hover {
    border-color: ${theme.colors.border.accent};
    background: ${props => props.$selected ? 'rgba(16, 33, 62, 0.62)' : 'rgba(60, 75, 100, 0.5)'};
  }
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
`;

const EntityName = styled.div`
  color: ${theme.colors.text.white};
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  text-align: center;
  direction: rtl;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const EntityCard = ({ id, name, icon, selected, onClick }: EntityCardProps) => {
  return (
    <CardContainer $selected={selected} onClick={() => onClick?.(id)}>
      <IconSection>{icon}</IconSection>
      <EntityName>{name}</EntityName>
    </CardContainer>
  );
};
