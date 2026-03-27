import { apiClient } from './client';
import { 
  DashboardData, 
  ExternalTerminalAllocation,
  DashboardStation,
  DashboardSatellite,
  DashboardNetwork 
} from '../../components/Dashboard/types';

export const dashboardApi = {
  async getDashboardData(
    startDate?: string,
    endDate?: string,
    startTime?: string,
    endTime?: string
  ): Promise<DashboardData> {
    if (startDate && endDate && startTime && endTime) {
      return apiClient.get<DashboardData>(
        `/dashboard?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`
      );
    }
    return apiClient.get<DashboardData>('/dashboard');
  },

  async getStationsWithTerminals(): Promise<DashboardStation[]> {
    return apiClient.get<DashboardStation[]>('/dashboard/stations');
  },

  async getSatellitesWithAllocations(): Promise<DashboardSatellite[]> {
    return apiClient.get<DashboardSatellite[]>('/dashboard/satellites');
  },

  async getNetworks(): Promise<DashboardNetwork[]> {
    return apiClient.get<DashboardNetwork[]>('/dashboard/networks');
  },

  async getExternalAllocations(): Promise<ExternalTerminalAllocation[]> {
    return apiClient.get<ExternalTerminalAllocation[]>('/dashboard/external-allocations');
  },

  async getDashboardDataByTimeRange(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): Promise<DashboardData> {
    return apiClient.get<DashboardData>(
      `/dashboard?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`
    );
  },
};
