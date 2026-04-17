export interface TerminalFormData {
  name: string;
  stationId: number | '';
  frequencyBand: 'ka' | 'ku' | '';
  terminalType: string;
  readinessStatus: 'ready' | 'partly_ready' | 'damaged' | '';
  notes: string;
}

export interface TerminalFormProps {
  onSave?: (data: TerminalFormData) => Promise<void>;
  onDelete?: () => void;
  editingTerminalId?: number | null;
  initialData?: TerminalFormData | null;
  onClose?: () => void;
  onCancel?: () => void;
}
