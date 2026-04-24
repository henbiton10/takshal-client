import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { DashboardStation } from './types';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  direction: rtl;
`;

const AntennaRow = styled.div<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${props => {
    const { primary, secondary, status, error } = props.theme.customColors;
    const colors = [
      primary.main,
      status.ready,
      secondary.main,
      error.main,
      status.ka,
      status.x,
      primary.light,
      status.partlyReady,
    ];
    return colors[props.$index % colors.length];
  }};
`;

interface Props {
  stations: DashboardStation[];
}

export const AntennaCapabilitiesList = ({ stations }: Props) => {
  const theme = useTheme();
  const allAntennas = useMemo(() => {
    const antennas: Array<{ id: number; label: string; index: number }> = [];
    let index = 0;
    
    stations.forEach(station => {
      station.antennas.forEach((_, antennaIdx) => {
        antennas.push({
          id: index,
          label: `אנטנה ${antennaIdx + 1}`,
          index: index,
        });
        index++;
      });
    });

    return antennas.slice(0, 8);
  }, [stations]);

  if (allAntennas.length === 0) {
    return (
      <ListContainer>
        <div style={{ textAlign: 'center', color: theme.customColors.text.disabled, padding: '20px' }}>
          אין אנטנות להצגה
        </div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {allAntennas.map((antenna) => (
        <AntennaRow key={antenna.id} $index={antenna.index}>
          {antenna.label}
        </AntennaRow>
      ))}
    </ListContainer>
  );
};
