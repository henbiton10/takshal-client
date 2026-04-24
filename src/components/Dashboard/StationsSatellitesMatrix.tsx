import { useMemo } from 'react';
import styled from 'styled-components';

import { DashboardStation, DashboardSatellite } from './types';

// Asset imports
const ISRAEL_ICON = '/src/assets/israel.png';
const EARTH_ICON = '/src/assets/earth.png';
const IAF_ICON = '/src/assets/IAF.png';
const C4I_ICON = '/src/assets/C4I.svg';

const SatelliteCustomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.36263 0V1.5C13.1006 1.5 16.1126 4.512 16.1126 8.25H17.6126C17.6126 3.70275 13.9091 0 9.36263 0ZM9.36263 3V4.5C11.4424 4.5 13.1126 6.17025 13.1126 8.25H14.6126C14.6126 5.35875 12.2539 3 9.36263 3ZM2.91713 3.0705L2.40188 3.58575C-0.800625 6.78825 -0.800625 12.0083 2.40188 15.2108C5.60437 18.4132 10.8244 18.4132 14.0269 15.2108L14.5421 14.6955L14.0269 14.1562L9.90188 10.0312C10.6691 9.7965 11.2376 9.09675 11.2376 8.25C11.2376 7.21575 10.3969 6.375 9.36263 6.375C8.51588 6.375 7.81538 6.9435 7.58138 7.71075L3.45638 3.58575L2.91713 3.0705ZM3.03487 5.29725L12.3154 14.5778C9.67612 16.6725 5.89987 16.5998 3.45638 14.1562C1.01288 11.7128 0.940125 7.9365 3.03413 5.2965L3.03487 5.29725Z" fill="currentColor" />
  </svg>
);

const SatelliteHeaderIcon = () => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 23V21C15.95 21 17.6042 20.3208 18.9625 18.9625C20.3208 17.6042 21 15.95 21 14H23C23 15.25 22.7625 16.4208 22.2875 17.5125C21.8125 18.6042 21.1708 19.5542 20.3625 20.3625C19.5542 21.1708 18.6042 21.8125 17.5125 22.2875C16.4208 22.7625 15.25 23 14 23ZM14 19V17C14.8333 17 15.5417 16.7083 16.125 16.125C16.7083 15.5417 17 14.8333 17 14H19C19 15.3833 18.5125 16.5625 17.5375 17.5375C16.5625 18.5125 15.3833 19 14 19ZM5.55 22.375C5.3 22.375 5.05 22.325 4.8 22.225C4.55 22.125 4.325 21.9833 4.125 21.8L0.575 18.25C0.391667 18.05 0.25 17.825 0.15 17.575C0.05 17.325 0 17.075 0 16.825C0 16.5583 0.05 16.3042 0.15 16.0625C0.25 15.8208 0.391667 15.6083 0.575 15.425L3.75 12.25C4.13333 11.8667 4.60833 11.6708 5.175 11.6625C5.74167 11.6542 6.21667 11.8417 6.6 12.225L7.85 13.475L8.55 12.775L7.3 11.525C6.91667 11.1417 6.725 10.675 6.725 10.125C6.725 9.575 6.91667 9.10833 7.3 8.725L8.725 7.3C9.10833 6.91667 9.57917 6.725 10.1375 6.725C10.6958 6.725 11.1667 6.91667 11.55 7.3L12.8 8.55L13.5 7.85L12.25 6.6C11.8667 6.21667 11.675 5.74583 11.675 5.1875C11.675 4.62917 11.8667 4.15833 12.25 3.775L15.425 0.6C15.625 0.4 15.85 0.25 16.1 0.15C16.35 0.05 16.6 0 16.85 0C17.1 0 17.3458 0.05 17.5875 0.15C17.8292 0.25 18.05 0.4 18.25 0.6L21.8 4.15C22 4.33333 22.1458 4.54583 22.2375 4.7875C22.3292 5.02917 22.375 5.28333 22.375 5.55C22.375 5.8 22.3292 6.05 22.2375 6.3C22.1458 6.55 22 6.775 21.8 6.975L18.625 10.15C18.2417 10.5333 17.7708 10.725 17.2125 10.725C16.6542 10.725 16.1833 10.5333 15.8 10.15L14.55 8.9L13.85 9.6L15.1 10.85C15.4833 11.2333 15.6708 11.7042 15.6625 12.2625C15.6542 12.8208 15.4583 13.2917 15.075 13.675L13.675 15.075C13.2917 15.4583 12.8208 15.65 12.2625 15.65C11.7042 15.65 11.2333 15.4583 10.85 15.075L9.6 13.825L8.9 14.525L10.15 15.775C10.5333 16.1583 10.7208 16.6333 10.7125 17.2C10.7042 17.7667 10.5083 18.2417 10.125 18.625L6.95 21.8C6.76667 21.9833 6.55417 22.125 6.3125 22.225C6.07083 22.325 5.81667 22.375 5.55 22.375ZM5.55 20.4L6.6 19.35L3.05 15.8L2 16.85L5.55 20.4ZM7.675 18.275L8.725 17.225L5.175 13.675L4.125 14.725L7.675 18.275ZM12.275 13.675L13.675 12.275L10.125 8.725L8.725 10.125L12.275 13.675ZM17.225 8.725L18.275 7.675L14.725 4.125L13.675 5.175L17.225 8.725ZM19.35 6.6L20.4 5.55L16.85 2L15.8 3.05L19.35 6.6Z" fill="currentColor" />
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

const HeaderRow = styled.tr`
  height: 56px;
`;

const CategoryHeader = styled.th<{ $type: 'local' | 'global' }>`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${props => props.$type === 'local' ? props.theme.customColors.primary.main : props.theme.customColors.background.subtle};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 10px;
  text-align: center;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: ${props => props.$type === 'local' 
      ? props.theme.customColors.text.white 
      : (props.theme.palette.mode === 'dark' ? props.theme.customColors.text.white : props.theme.customColors.text.primary)};
    font-size: 18px;
    font-weight: 700;

    img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }
`;

const SatelliteHeaderCell = styled.th`
  position: sticky;
  top: 56px;
  z-index: 10;
  background: ${props => props.theme.customColors.background.glass};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 8px;
  min-width: 140px;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${props => props.theme.palette.mode === 'dark' ? props.theme.customColors.text.white : props.theme.customColors.text.primary};
    font-size: 16px;
    font-weight: 700;

    svg {
      font-size: 20px;
      color: ${props => props.theme.palette.mode === 'dark' ? props.theme.customColors.text.secondary : props.theme.customColors.text.muted};
    }
  }
`;

const CornerCell = styled.th<{ $top?: string }>`
  position: sticky;
  right: 0;
  top: ${props => props.$top || '0'};
  z-index: 20;
  background: ${props => props.theme.customColors.background.default};
  width: 320px;
  min-width: 320px;
`;

const DataRow = styled.tr`
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.customColors.border.primary};

  &:hover {
    background: ${props => props.theme.customColors.action.hover};
  }
`;

const StationCell = styled.td`
  position: sticky;
  right: 0;
  z-index: 5;
  background: ${props => props.theme.customColors.primary.main};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 0 16px;
  color: ${props => props.theme.customColors.text.white};
  font-size: 18px;
  font-weight: 700;

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }
`;

const BattalionBadge = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

const AllocationCell = styled.td<{ $hasAllocation: boolean }>`
  border: 1px solid ${props => props.theme.customColors.border.primary};
  padding: 10px;
  text-align: center;
  background: ${props => props.$hasAllocation ? `linear-gradient(180deg, ${props.theme.customColors.status.ready} 0%, ${props.theme.customColors.status.ready} 100%)` : 'transparent'};
  width: 140px;
  min-width: 140px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const AllocationBadge = styled.div<{ $band: string }>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  min-width: 110px;
  background: ${props => {
    const { ku, ka, x } = props.theme.customColors.status;
    switch (props.$band.toUpperCase()) {
      case 'KU': return ku;
      case 'KA': return ka;
      case 'X': return x;
      default: return ku;
    }
  }};
  color: ${props => props.$band.toUpperCase() === 'KU' ? (props.theme.palette.mode === 'dark' ? '#000' : '#fff') : '#fff'};
  font-size: 16px;
  font-weight: 700;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    width: 20px;
    height: 20px;
  }
`;


const StatusDot = styled.div<{ $status: 'work' | 'half' | 'not' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: ${props => {
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    switch (props.$status) {
      case 'work': return `0px 0px 6px 0px ${ready}`;
      case 'half': return `0px 0px 6px 0px ${partlyReady}`;
      case 'not': return `0px 0px 6px 0px ${damaged}`;
      default: return 'none';
    }
  }};
  background: ${props => {
    const { ready, partlyReady, damaged } = props.theme.customColors.status;
    switch (props.$status) {
      case 'work': return ready;
      case 'half': return partlyReady;
      case 'not': return damaged;
      default: return ready;
    }
  }};
`;




interface Props {
  stations: DashboardStation[];
  satellites: DashboardSatellite[];
}

export const StationsSatellitesMatrix = ({ stations, satellites }: Props) => {
  const localSatellites = useMemo(() => satellites.filter(s => s.affiliation === 'local'), [satellites]);
  const globalSatellites = useMemo(() => satellites.filter(s => s.affiliation === 'global'), [satellites]);


  const getSatStatus = (satId: number) => {
    if (satId % 4 === 0) return 'not';
    if (satId % 3 === 0) return 'half';
    return 'work';
  };

  const getStationAllocations = (stationId: number, satelliteId: number) => {
    const satellite = satellites.find(s => s.id === satelliteId);
    if (!satellite) return [];
    return satellite.allocations.filter(a => a.stationId === stationId);
  };

  const getAffiliationIcon = (affiliation: string) => {
    const aff = affiliation.toLowerCase();
    if (aff === 'tikshuv' || aff === 'intelligence') return C4I_ICON;
    return IAF_ICON;
  };

  return (
    <MatrixContainer>
      <Table>
        <thead>
          <HeaderRow>
            <CornerCell $top="0" />
            <CategoryHeader $type="local" colSpan={localSatellites.length}>
              <div className="content">
                <img src={ISRAEL_ICON} alt="ישראלי" />
                ישראלי
              </div>
            </CategoryHeader>
            <CategoryHeader $type="global" colSpan={globalSatellites.length}>
              <div className="content">
                <img src={EARTH_ICON} alt="עולמי" />
                עולמי
              </div>
            </CategoryHeader>
          </HeaderRow>

          <HeaderRow>
            <CornerCell $top="56px" />
            {localSatellites.map(sat => (
              <SatelliteHeaderCell key={sat.id}>
                <div className="content">
                  <SatelliteHeaderIcon />
                  {sat.name}
                  <StatusDot $status={getSatStatus(sat.id)} />
                </div>
              </SatelliteHeaderCell>
            ))}
            {globalSatellites.map(sat => (
              <SatelliteHeaderCell key={sat.id}>
                <div className="content">
                  <SatelliteHeaderIcon />
                  {sat.name}
                  <StatusDot $status={getSatStatus(sat.id)} />
                </div>
              </SatelliteHeaderCell>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {stations.map(station => (
            <DataRow key={station.id}>
              <StationCell>
                <div className="content">
                  <BattalionBadge>
                    <img src={getAffiliationIcon(station.organizationalAffiliation)} alt={station.organizationalAffiliation} />
                  </BattalionBadge>
                  {station.name}
                </div>
              </StationCell>

              {localSatellites.map(sat => (
                <AllocationCell
                  key={sat.id}
                  $hasAllocation={getStationAllocations(station.id, sat.id).length > 0}
                >
                  <BadgeContainer>
                    {getStationAllocations(station.id, sat.id).map((alloc, idx) => (
                      <AllocationBadge key={idx} $band={alloc.frequencyBand}>
                        <span>{alloc.antennaSize} {alloc.frequencyBand.toUpperCase()}</span>
                        <SatelliteCustomIcon />
                      </AllocationBadge>

                    ))}
                  </BadgeContainer>

                </AllocationCell>
              ))}

              {globalSatellites.map(sat => (
                <AllocationCell
                  key={sat.id}
                  $hasAllocation={getStationAllocations(station.id, sat.id).length > 0}
                >
                  <BadgeContainer>
                    {getStationAllocations(station.id, sat.id).map((alloc, idx) => (
                      <AllocationBadge key={idx} $band={alloc.frequencyBand}>
                        <span>{alloc.antennaSize} {alloc.frequencyBand.toUpperCase()}</span>
                        <SatelliteCustomIcon />
                      </AllocationBadge>

                    ))}
                  </BadgeContainer>

                </AllocationCell>
              ))}
            </DataRow>
          ))}
        </tbody>
      </Table>
    </MatrixContainer>
  );
};
