import { apiClient } from './client';
import { Satellite, SatelliteSummary, CreateSatelliteDto, UpdateSatelliteDto } from './types';

export const satellitesApi = {
  getAll: async (): Promise<Satellite[]> => {
    return apiClient.get<Satellite[]>('/satellites');
  },

  getAllSummary: async (): Promise<SatelliteSummary[]> => {
    return apiClient.get<SatelliteSummary[]>('/satellites/summary');
  },

  getOne: async (id: number): Promise<Satellite> => {
    return apiClient.get<Satellite>(`/satellites/${id}`);
  },

  create: async (data: CreateSatelliteDto): Promise<Satellite> => {
    return apiClient.post<Satellite>('/satellites', data);
  },

  update: async (id: number, data: UpdateSatelliteDto): Promise<Satellite> => {
    return apiClient.put<Satellite>(`/satellites/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete(`/satellites/${id}`);
  },
};
