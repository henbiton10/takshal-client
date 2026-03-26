import { apiClient } from './client';
import { Network, NetworkSummary, CreateNetworkDto, UpdateNetworkDto } from './types';

export const networksApi = {
  async getAll(): Promise<Network[]> {
    return apiClient.get<Network[]>('/networks');
  },

  async getAllSummary(): Promise<NetworkSummary[]> {
    return apiClient.get<NetworkSummary[]>('/networks/summary');
  },

  async getOne(id: number): Promise<Network> {
    return apiClient.get<Network>(`/networks/${id}`);
  },

  async create(data: CreateNetworkDto): Promise<Network> {
    return apiClient.post<Network>('/networks', data);
  },

  async update(id: number, data: UpdateNetworkDto): Promise<Network> {
    return apiClient.put<Network>(`/networks/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/networks/${id}`);
  },
};
