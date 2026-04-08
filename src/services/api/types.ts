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
  isDeleted: boolean;
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
  connectedStation?: { id: number; name: string };
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
  connectivityTypeId?: number;
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
  connectivityTypeId?: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface UpdateNetworkDto {
  name: string;
  terminalTypeId: number;
  connectivityTypeId?: number;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged';
  notes?: string;
}

export interface AllocationData {
  id: number;
  operationOrderId: number;
  parentAllocationId: number | null;
  orderNumber: number;
  subOrderNumber: number | null;
  terminalId: number;
  terminal?: {
    id: number;
    name: string;
    stationId: number;
    station?: { id: number; name: string };
  };
  transmissionSatelliteId: number;
  transmissionSatellite?: { id: number; name: string };
  transmissionAntennaId: number;
  transmissionAntenna?: {
    id: number;
    size: number;
    frequencyBand: string;
    stationId: number;
    station?: { id: number; name: string };
  };
  transmissionFrequency: number;
  receptionSatelliteId: number;
  receptionSatellite?: { id: number; name: string };
  receptionAntennaId: number;
  receptionAntenna?: {
    id: number;
    size: number;
    frequencyBand: string;
    stationId: number;
    station?: { id: number; name: string };
  };
  receptionFrequency: number;
  transmissionConnectivityId: number | null;
  transmissionConnectivity?: StationConnectivity | null;
  receptionConnectivityId: number | null;
  receptionConnectivity?: StationConnectivity | null;
  transmissionChannelNumber: number | null;
  receptionChannelNumber: number | null;
  tailNumber: number | null;
  notes: string | null;
  hasConflict: boolean;
  conflictIgnored: boolean;
  subAllocations?: AllocationData[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperationOrder {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  allocations?: AllocationData[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperationOrderSummary {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface CreateOperationOrderDto {
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface UpdateOperationOrderDto {
  name?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

export interface CreateAllocationDto {
  parentAllocationId?: number | null;
  terminalId: number;
  transmissionSatelliteId: number;
  transmissionAntennaId: number;
  transmissionFrequency: number;
  receptionSatelliteId: number;
  receptionAntennaId: number;
  receptionFrequency: number;
  transmissionConnectivityId?: number | null;
  receptionConnectivityId?: number | null;
  transmissionChannelNumber?: number | null;
  receptionChannelNumber?: number | null;
  tailNumber?: number | null;
  notes?: string | null;
  hasConflict?: boolean;
  conflictIgnored?: boolean;
}

export interface SubAllocationPayload extends CreateAllocationDto {
  existingId?: number;
}

export interface UpdateAllocationDto {
  terminalId?: number;
  transmissionSatelliteId?: number;
  transmissionAntennaId?: number;
  transmissionFrequency?: number;
  receptionSatelliteId?: number;
  receptionAntennaId?: number;
  receptionFrequency?: number;
  transmissionConnectivityId?: number | null;
  receptionConnectivityId?: number | null;
  transmissionChannelNumber?: number | null;
  receptionChannelNumber?: number | null;
  tailNumber?: number | null;
  notes?: string | null;
  hasConflict?: boolean;
  conflictIgnored?: boolean;
}

export interface AntennaWithStation {
  id: number;
  size: number;
  frequencyBand: string;
  stationId: number;
  stationName: string;
  displayName: string;
  isDeleted: boolean;
}

export interface ConnectivityValidationResult {
  connectivityRequired: boolean;
  availableConnectivities: Array<{
    id: number;
    stationId: number;
    connectedStationId: number;
    communicationType: string;
    channelCount: number;
  }>;
  availableChannels: Record<number, number[]>;
  error?: string;
  message?: string;
}

export interface AntennaSatelliteConflict {
  direction: 'transmission' | 'reception';
  antennaId: number;
  antennaName: string;
  conflictingSatelliteId: number;
  conflictingSatelliteName: string;
  requestedSatelliteId: number;
  requestedSatelliteName: string;
  operationOrderId: number;
  operationOrderName: string;
}

export interface AntennaSatelliteValidationResult {
  hasConflicts: boolean;
  conflicts: AntennaSatelliteConflict[];
}

export interface ChannelConflict {
  direction: 'transmission' | 'reception';
  connectivityId: number;
  channelNumber: number;
  operationOrderId: number;
  operationOrderName: string;
}

export interface ChannelValidationResult {
  hasConflicts: boolean;
  conflicts: ChannelConflict[];
}
