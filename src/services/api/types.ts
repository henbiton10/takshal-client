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
