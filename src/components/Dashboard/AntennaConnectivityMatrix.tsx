import { useMemo } from 'react';
import styled from 'styled-components';
import { DashboardStation } from './types';

// Icons
const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MatrixContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  direction: rtl;
  background: ${props => props.theme.customColors.background.default};
`;

const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
`;


const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${props => props.theme.customColors.background.glass};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 10px;
  height: 56px;
  width: 140px;
  min-width: 140px;
  color: ${props => props.theme.palette.mode === 'dark' ? props.theme.customColors.text.white : props.theme.customColors.text.primary};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const LabelHeaderCell = styled.th`

  position: sticky;
  right: 0;
  top: 0;
  z-index: 15;
  background: ${props => props.theme.customColors.background.default};
  width: 320px;
  min-width: 320px;
`;

const DataRow = styled.tr`

  height: 56px;
  border-top: 1px solid ${props => props.theme.customColors.border.primary};
  border-bottom: 1px solid ${props => props.theme.customColors.border.primary};
  
  &:hover {
    background: ${props => props.theme.customColors.action.hover};
  }
`;

const LinkLabelCell = styled.td`
  position: sticky;
  right: 0;
  z-index: 5;
  background: ${props => props.theme.customColors.primary.main};
  backdrop-filter: blur(4px);
  border-right: 1px solid ${props => props.theme.customColors.border.primary};
  border-left: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 10px;
  text-align: center;
  width: 320px;
  min-width: 320px;


  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${props => props.theme.customColors.text.white};
    font-size: 16px;
    font-weight: 700;
    
    span {
      white-space: nowrap;
    }
    
    svg {
      color: ${props => props.theme.customColors.text.disabled};
    }
  }
`;

const StatusCell = styled.td<{ $ratio: number }>`
  border-right: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 10px;
  text-align: center;
  width: 140px;
  min-width: 140px;

  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.customColors.text.white};
  
  background: ${props => {
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    if (props.$ratio >= 0.8) return ready;
    if (props.$ratio >= 0.4) return partlyReady;
    if (props.$ratio > 0) return damaged;
    return 'transparent';
  }};
`;

interface Props {
  stations: DashboardStation[];
}

export const AntennaConnectivityMatrix = ({ stations }: Props) => {
  const channelTypes = ['RF3', 'RFI2', 'RFO'];

  // For the redesign, we'll transform the data into "Connectivity Pairs"
  // If the data isn't structured this way, we'll create a representation
  const connectivityLinks = useMemo(() => {
    // This is a simplified transformation for the redesign view
    const links: Array<{
      id: string;
      source: string;
      target: string;
      channels: { [key: string]: { used: number; total: number } };
    }> = [];

    // Grouping stations into pairs for display
    for (let i = 0; i < stations.length; i += 1) {
      const source = stations[i];
      const target = stations[(i + 1) % stations.length];

      const channelsMap: { [key: string]: { used: number; total: number } } = {};
      channelTypes.forEach(type => {
        // Mocking values based on station data for demonstration
        channelsMap[type] = {
          used: (source.id + target.id) % 8,
          total: 7
        };
      });

      links.push({
        id: `${source.id}-${target.id}`,
        source: source.name,
        target: target.name,
        channels: channelsMap
      });
    }

    return links;
  }, [stations]);

  const getRatio = (used: number, total: number) => {
    if (total === 0) return 0;
    return used / total;
  };

  return (
    <MatrixContainer>
      <Table>
        <thead>
          <tr>
            <LabelHeaderCell />
            {channelTypes.map(type => (
              <HeaderCell key={type}>{type}</HeaderCell>
            ))}
          </tr>

        </thead>
        <tbody>
          {connectivityLinks.map((link) => (
            <DataRow key={link.id}>
              <LinkLabelCell>
                <div className="content">
                  <span>{link.source}</span>
                  <LinkIcon />
                  <span>{link.target}</span>
                </div>
              </LinkLabelCell>
              {channelTypes.map(type => {
                const channel = link.channels[type];
                return (
                  <StatusCell key={type} $ratio={getRatio(channel.used, channel.total)}>
                    {channel.used}/{channel.total}
                  </StatusCell>
                );
              })}

            </DataRow>
          ))}
        </tbody>
      </Table>
    </MatrixContainer>
  );
};
