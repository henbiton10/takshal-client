import { useMemo } from 'react';
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
    const colors = [
      '#3b82f6', // blue
      '#22c55e', // green
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#14b8a6', // teal
      '#f97316', // orange
    ];
    return colors[props.$index % colors.length];
  }};
`;

interface Props {
  stations: DashboardStation[];
}

export const AntennaCapabilitiesList = ({ stations }: Props) => {
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
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '20px' }}>
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
