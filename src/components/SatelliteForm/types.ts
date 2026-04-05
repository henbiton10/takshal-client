export interface SatelliteFormData {
  name: string;
  affiliation: 'israeli' | 'international' | '';
  hasFrequencyConverter: boolean | null;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged' | '';
  notes: string;
}

export interface SatelliteFormProps {
  onSave?: (data: SatelliteFormData) => Promise<void>;
  editingSatelliteId?: number | null;
  initialData?: SatelliteFormData;
  onClose?: () => void;
  onCancel?: () => void;
}
