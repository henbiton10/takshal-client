import { apiClient } from './client';

export interface ConnectivityType {
  id: number;
  name: string;
  createdAt: string;
}

export const connectivityTypesApi = {
  async getAll(): Promise<ConnectivityType[]> {
    return apiClient.get<ConnectivityType[]>('/connectivity-types');
  },

  async getAllSummary(): Promise<Array<{ id: number; name: string }>> {
    return apiClient.get<Array<{ id: number; name: string }>>('/connectivity-types/summary');
  },
};
