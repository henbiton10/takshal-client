export interface NetworkFormData {
  name: string;
  terminalTypeId: number | '';
  connectivityTypeId?: number | '';
  readinessStatus: 'ready' | 'partly_ready' | 'damaged' | '';
  notes: string;
}

export interface NetworkFormProps {
  onSave?: (data: NetworkFormData) => Promise<void>;
  editingNetworkId?: number | null;
  initialData?: NetworkFormData | null;
  onClose?: () => void;
  onCancel?: () => void;
}
