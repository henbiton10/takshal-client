import { apiClient } from './client';
import { Station, StationSummary, CreateStationDto, UpdateStationDto } from './types';

export const stationsApi = {
  async getAll(): Promise<Station[]> {
    return apiClient.get<Station[]>('/stations');
  },

  async getAllSummary(): Promise<StationSummary[]> {
    return apiClient.get<StationSummary[]>('/stations/summary');
  },

  async getOne(id: number): Promise<Station> {
    return apiClient.get<Station>(`/stations/${id}`);
  },

  async create(data: CreateStationDto): Promise<Station> {
    return apiClient.post<Station>('/stations', data);
  },

  async update(id: number, data: UpdateStationDto): Promise<Station> {
    return apiClient.put<Station>(`/stations/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/stations/${id}`);
  },
};
