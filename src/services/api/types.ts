export interface Satellite {
  id: number;
  name: string;
  affiliation: 'israeli' | 'international';
  hasFrequencyConverter: boolean;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SatelliteSummary {
  id: number;
  name: string;
}

export interface CreateSatelliteDto {
  name: string;
  affiliation: 'israeli' | 'international';
  hasFrequencyConverter: boolean;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface UpdateSatelliteDto {
  name: string;
  affiliation: 'israeli' | 'international';
  hasFrequencyConverter: boolean;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface StationConnectivity {
  id?: number;
  connectedStationId: number;
  communicationType: string;
  channelCount: number;
}

export interface StationAntenna {
  id?: number;
  size: number;
  frequencyBand: string;
}

export interface Station {
  id: number;
  name: string;
  organizationalAffiliation: 'tikshuv' | 'airforce';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  connectivities?: StationConnectivity[];
  antennas?: StationAntenna[];
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StationSummary {
  id: number;
  name: string;
}

export interface CreateStationDto {
  name: string;
  organizationalAffiliation: 'tikshuv' | 'airforce';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  connectivities?: StationConnectivity[];
  antennas?: StationAntenna[];
}

export interface UpdateStationDto {
  name: string;
  organizationalAffiliation: 'tikshuv' | 'airforce';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  connectivities?: StationConnectivity[];
  antennas?: StationAntenna[];
}

export interface Terminal {
  id: number;
  name: string;
  stationId: number;
  frequencyBand: 'ka' | 'ku';
  terminalTypeId: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TerminalSummary {
  id: number;
  name: string;
}

export interface CreateTerminalDto {
  name: string;
  stationId: number;
  frequencyBand: 'ka' | 'ku';
  terminalType: string;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface UpdateTerminalDto {
  name: string;
  stationId: number;
  frequencyBand: 'ka' | 'ku';
  terminalType: string;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface Network {
  id: number;
  name: string;
  terminalTypeId: number;
  connectivityTypeId: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NetworkSummary {
  id: number;
  name: string;
}

export interface CreateNetworkDto {
  name: string;
  terminalTypeId: number;
  connectivityTypeId: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface UpdateNetworkDto {
  name: string;
  terminalTypeId: number;
  connectivityTypeId: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}
