import { apiClient } from './client';
import { Terminal, TerminalSummary, CreateTerminalDto, UpdateTerminalDto } from './types';

export const terminalsApi = {
  getAll: async (): Promise<Terminal[]> => {
    return apiClient.get<Terminal[]>('/terminals');
  },

  getAllSummary: async (): Promise<TerminalSummary[]> => {
    return apiClient.get<TerminalSummary[]>('/terminals/summary');
  },

  getOne: async (id: number): Promise<Terminal> => {
    return apiClient.get<Terminal>(`/terminals/${id}`);
  },

  create: async (data: CreateTerminalDto): Promise<Terminal> => {
    return apiClient.post<Terminal>('/terminals', data);
  },

  update: async (id: number, data: UpdateTerminalDto): Promise<Terminal> => {
    return apiClient.put<Terminal>(`/terminals/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete(`/terminals/${id}`);
  },
};
