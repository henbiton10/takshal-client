import styled from 'styled-components';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { theme } from '../../theme';
import { SatelliteSummary } from '../../services/api/types';

interface SatelliteCardProps {
  satellite: SatelliteSummary;
  onClick?: (id: number) => void;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.sm};
  padding: 8px 14px;
  gap: 4px;
  border: 1px solid ${theme.colors.border.subtle};
  transition: all 0.2s;
  cursor: pointer;
  min-height: 55px;
  min-width: 160px;
  
  &:hover {
    border-color: ${theme.colors.border.accent};
    background: rgba(60, 75, 100, 0.5);
  }
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
`;

const SatelliteName = styled.div`
  color: ${theme.colors.text.white};
  font-size: 15px;
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  direction: rtl;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  width: 100%;
`;

export const SatelliteCard = ({ satellite, onClick }: SatelliteCardProps) => {
  return (
    <CardContainer onClick={() => onClick?.(satellite.id)}>
      <IconSection>
        <SatelliteAltIcon sx={{ fontSize: 20 }} />
      </IconSection>
      <SatelliteName>{satellite.name}</SatelliteName>
    </CardContainer>
  );
};
