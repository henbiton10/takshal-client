import { useMemo } from 'react';
import styled from 'styled-components';
import { DashboardStation } from './types';

const MatrixContainer = styled.div`
  overflow-x: auto;
  direction: rtl;
`;

const CompactView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AntennaRow = styled.div<{ $index: number }>`
  display: flex;
  align-items: center;
  gap: 0;
`;

const AntennaLabel = styled.div<{ $index: number }>`
  min-width: 180px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  background: ${props => {
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    return colors[props.$index % colors.length];
  }};
  border-radius: 4px 0 0 4px;
  white-space: nowrap;
`;

const ChannelsContainer = styled.div`
  display: flex;
  gap: 2px;
  flex: 1;
`;

const ChannelCell = styled.div<{ $usage: number }>`
  flex: 1;
  min-width: 50px;
  padding: 8px;
  text-align: center;
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.$usage > 0.7 ? '#1f2937' : 'white'};
  background: ${props => {
    if (props.$usage >= 0.8) return '#22c55e';
    if (props.$usage >= 0.5) return '#eab308';
    if (props.$usage >= 0.3) return '#f97316';
    if (props.$usage > 0) return '#ef4444';
    return '#4b5563';
  }};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
`;

const HeaderRow = styled.tr`
  background: rgba(30, 45, 80, 0.5);
`;

const ColumnHeader = styled.th`
  padding: 8px 12px;
  text-align: center;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(174, 199, 255, 0.1);
`;

const DataRow = styled.tr`
  &:nth-child(even) {
    background: rgba(20, 35, 65, 0.2);
  }
`;

const AntennaLabelCell = styled.td<{ $index: number }>`
  padding: 8px 12px;
  text-align: right;
  font-size: 11px;
  font-weight: 500;
  color: white;
  background: ${props => {
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    return colors[props.$index % colors.length];
  }};
  min-width: 180px;
  white-space: nowrap;
`;

const UsageCell = styled.td<{ $usage: number }>`
  padding: 8px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.$usage > 0.7 ? '#1f2937' : 'white'};
  background: ${props => {
    if (props.$usage >= 0.8) return '#22c55e';
    if (props.$usage >= 0.5) return '#eab308';
    if (props.$usage >= 0.3) return '#f97316';
    if (props.$usage > 0) return '#ef4444';
    return '#4b5563';
  }};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const StationInfoCell = styled.td`
  padding: 8px 12px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(30, 45, 80, 0.3);
  text-align: right;
  white-space: nowrap;
`;

interface Props {
  stations: DashboardStation[];
  showFullView?: boolean;
}

export const AntennaConnectivityMatrix = ({ stations, showFullView = false }: Props) => {
  const channelTypes = ['RF3', 'RF12', 'RFO'];

  const allAntennas = useMemo(() => {
    const antennas: Array<{
      id: number;
      label: string;
      stationId: number;
      stationName: string;
      channels: { [key: string]: { used: number; total: number } };
    }> = [];

    stations.forEach(station => {
      station.antennas.forEach((antenna) => {
        const channelsMap: { [key: string]: { used: number; total: number } } = {};
        antenna.channels.forEach(ch => {
          channelsMap[ch.channelType] = { used: ch.used, total: ch.total };
        });

        antennas.push({
          id: antenna.id,
          label: `אנטנה ${station.name} ${antenna.size}`,
          stationId: station.id,
          stationName: station.name,
          channels: channelsMap,
        });
      });
    });

    return antennas;
  }, [stations]);

  const formatUsage = (used: number, total: number) => {
    return `${used}/${total}`;
  };

  const getUsageRatio = (used: number, total: number) => {
    if (total === 0) return 0;
    return used / total;
  };

  if (!showFullView) {
    return (
      <MatrixContainer>
        <CompactView>
          {allAntennas.slice(0, 8).map((antenna, idx) => (
            <AntennaRow key={antenna.id} $index={idx}>
              <AntennaLabel $index={idx}>{antenna.label}</AntennaLabel>
              <ChannelsContainer>
                {channelTypes.map(type => {
                  const channel = antenna.channels[type] || { used: 0, total: 7 };
                  return (
                    <ChannelCell
                      key={type}
                      $usage={getUsageRatio(channel.used, channel.total)}
                    >
                      {formatUsage(channel.used, channel.total)}
                    </ChannelCell>
                  );
                })}
              </ChannelsContainer>
            </AntennaRow>
          ))}
        </CompactView>
      </MatrixContainer>
    );
  }

  const stationGroups = useMemo(() => {
    const groups: { [key: string]: typeof allAntennas } = {};
    allAntennas.forEach(antenna => {
      if (!groups[antenna.stationName]) {
        groups[antenna.stationName] = [];
      }
      groups[antenna.stationName].push(antenna);
    });
    return groups;
  }, [allAntennas]);

  return (
    <MatrixContainer>
      <Table>
        <thead>
          <HeaderRow>
            <ColumnHeader></ColumnHeader>
            <ColumnHeader colSpan={channelTypes.length}>ערוצים</ColumnHeader>
            <ColumnHeader></ColumnHeader>
          </HeaderRow>
          <HeaderRow>
            <ColumnHeader></ColumnHeader>
            {channelTypes.map(type => (
              <ColumnHeader key={type}>{type}</ColumnHeader>
            ))}
            <ColumnHeader>תחנה</ColumnHeader>
          </HeaderRow>
        </thead>
        <tbody>
          {Object.entries(stationGroups).map(([stationName, antennas]) => (
            antennas.map((antenna, idx) => (
              <DataRow key={antenna.id}>
                <AntennaLabelCell $index={idx}>{antenna.label}</AntennaLabelCell>
                {channelTypes.map(type => {
                  const channel = antenna.channels[type] || { used: 0, total: 7 };
                  return (
                    <UsageCell
                      key={type}
                      $usage={getUsageRatio(channel.used, channel.total)}
                    >
                      {formatUsage(channel.used, channel.total)}
                    </UsageCell>
                  );
                })}
                {idx === 0 && (
                  <StationInfoCell rowSpan={antennas.length}>
                    {stationName}
                  </StationInfoCell>
                )}
              </DataRow>
            ))
          ))}
        </tbody>
      </Table>
    </MatrixContainer>
  );
};
