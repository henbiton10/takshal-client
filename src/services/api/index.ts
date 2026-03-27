export { apiClient } from './client';
export { satellitesApi } from './satellites';
export { terminalsApi } from './terminals';
export { stationsApi } from './stations';
export { networksApi } from './networks';
export { terminalTypesApi, type TerminalType } from './terminalTypes';
export { connectivityTypesApi, type ConnectivityType } from './connectivityTypes';
export { operationOrdersApi } from './operationOrders';
export { dashboardApi } from './dashboard';
export type { 
  Satellite, 
  SatelliteSummary, 
  CreateSatelliteDto, 
  UpdateSatelliteDto,
  Terminal,
  TerminalSummary,
  CreateTerminalDto,
  UpdateTerminalDto,
  Station,
  StationSummary,
  CreateStationDto,
  UpdateStationDto,
  StationConnectivity,
  StationAntenna,
  Network,
  NetworkSummary,
  CreateNetworkDto,
  UpdateNetworkDto,
  OperationOrder,
  OperationOrderSummary,
  CreateOperationOrderDto,
  UpdateOperationOrderDto,
  AllocationData,
  CreateAllocationDto,
  UpdateAllocationDto,
  AntennaWithStation,
  ConnectivityValidationResult,
} from './types';
