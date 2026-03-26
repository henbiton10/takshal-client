import { apiClient } from './client';
import {
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

export const operationOrdersApi = {
  async getAll(): Promise<OperationOrder[]> {
    return apiClient.get<OperationOrder[]>('/operation-orders');
  },

  async getAllSummary(): Promise<OperationOrderSummary[]> {
    return apiClient.get<OperationOrderSummary[]>('/operation-orders/summary');
  },

  async getOne(id: number): Promise<OperationOrder> {
    return apiClient.get<OperationOrder>(`/operation-orders/${id}`);
  },

  async create(data: CreateOperationOrderDto): Promise<OperationOrder> {
    return apiClient.post<OperationOrder>('/operation-orders', data);
  },

  async update(id: number, data: UpdateOperationOrderDto): Promise<OperationOrder> {
    return apiClient.put<OperationOrder>(`/operation-orders/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/operation-orders/${id}`);
  },

  async addAllocation(operationOrderId: number, data: CreateAllocationDto): Promise<AllocationData> {
    return apiClient.post<AllocationData>(`/operation-orders/${operationOrderId}/allocations`, data);
  },

  async updateAllocation(allocationId: number, data: UpdateAllocationDto): Promise<AllocationData> {
    return apiClient.put<AllocationData>(`/allocations/${allocationId}`, data);
  },

  async deleteAllocation(allocationId: number): Promise<void> {
    return apiClient.delete(`/allocations/${allocationId}`);
  },

  async addSubAllocation(parentAllocationId: number, data: CreateAllocationDto): Promise<AllocationData> {
    return apiClient.post<AllocationData>(`/allocations/${parentAllocationId}/sub-allocation`, data);
  },

  async getAntennasWithStationInfo(): Promise<AntennaWithStation[]> {
    return apiClient.get<AntennaWithStation[]>('/operation-orders/antennas');
  },

  async validateConnectivity(
    terminalId: number,
    antennaId: number,
    operationOrderId: number,
    excludeAllocationId?: number,
  ): Promise<ConnectivityValidationResult> {
    return apiClient.post<ConnectivityValidationResult>('/operation-orders/validate-connectivity', {
      terminalId,
      antennaId,
      operationOrderId,
      excludeAllocationId,
    });
  },
};
