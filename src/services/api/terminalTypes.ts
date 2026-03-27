import { apiClient } from './client';

export interface TerminalType {
  id: number;
  name: string;
  createdAt: string;
}

export const terminalTypesApi = {
  async getAll(): Promise<TerminalType[]> {
    return apiClient.get<TerminalType[]>('/terminal-types');
  },

  async getAllSummary(): Promise<Array<{ id: number; name: string }>> {
    return apiClient.get<Array<{ id: number; name: string }>>('/terminal-types/summary');
  },

  async create(name: string): Promise<TerminalType> {
    return apiClient.post<TerminalType>('/terminal-types', { name });
  },
};
