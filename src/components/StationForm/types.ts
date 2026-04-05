export interface ConnectivityFormData {
  id?: string;
  connectedStationId: number | '';
  communicationType: string;
  channelCount: number;
}

export interface AntennaFormData {
  id: string;
  size: number | '';
  frequencyBand: string;
}

export interface StationFormData {
  name: string;
  organizationalAffiliation: 'tikshuv' | 'airforce' | '';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged' | '';
  notes: string;
  connectivities: ConnectivityFormData[];
  antennas: AntennaFormData[];
}

export interface StationFormProps {
  onSave?: (data: StationFormData) => Promise<void>;
  editingStationId?: number | null;
  initialData?: StationFormData | null;
  onClose?: () => void;
  onCancel?: () => void;
}
