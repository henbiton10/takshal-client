export interface ExternalTerminalAllocation {
  name: string;
  direction: 'UL' | 'DL' | string;
  groundStation: string;
  bandwidth_MHz: number;
  f_center_UL_MHz: number;
  f_center_DL_MHz: number;
  eirp: number;
  customer: string;
  id: string;
  channel: string;
  satellite: string;
}

export interface DashboardTerminal {
  id: number;
  name: string;
  stationId: number;
  stationName: string;
  frequencyBand: 'ka' | 'ku';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  isAllocated: boolean;
  allocations: TerminalAllocationInfo[];
}

export interface TerminalAllocationInfo {
  direction: 'transmission' | 'reception';
  frequency: number;
  satellite: string;
  antenna: string;
  antennaSize: number;
  frequencyBand: 'ka' | 'ku';
  channel: string;
  connectivity?: string;
}

export interface DashboardStation {
  id: number;
  name: string;
  organizationalAffiliation: 'airforce' | 'navy' | 'ground' | 'intelligence' | 'other';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  terminals: DashboardTerminal[];
  antennas: DashboardAntenna[];
}

export interface DashboardAntenna {
  id: number;
  size: number;
  frequencyBand: 'ka' | 'ku';
  stationId: number;
  channels: AntennaChannelStatus[];
}

export interface AntennaChannelStatus {
  channelType: string;
  used: number;
  total: number;
}

export interface DashboardSatellite {
  id: number;
  name: string;
  affiliation: 'local' | 'global';
  hasFrequencyConverter: boolean;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  allocations: SatelliteAllocation[];
}

export interface SatelliteAllocation {
  stationId: number;
  stationName: string;
  terminalId: number;
  terminalName: string;
  frequencyBand: 'ka' | 'ku';
  antennaSize: number;
  direction: 'transmission' | 'reception';
}

export interface DashboardNetwork {
  id: number;
  name: string;
  terminalTypeId: number;
  connectivityTypeId: number;
  terminals: { id: number; name: string }[];
}

export interface DashboardData {
  stations: DashboardStation[];
  satellites: DashboardSatellite[];
  networks: DashboardNetwork[];
  lastUpdated: string;
}

export interface TimeRange {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

export type ViewMode = 'full' | 'compact';
export type DashboardSection = 'stations-satellites' | 'stations-terminals' | 'antenna-connectivity' | 'networks';
