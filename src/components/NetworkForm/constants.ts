import { NetworkFormData } from './types';

export const READINESS_STATUS_OPTIONS = [
  { value: 'ready', label: 'כשיר' },
  { value: 'partly_ready', label: 'כשיר חלקית' },
  { value: 'damaged', label: 'תקול' },
];

export const INITIAL_FORM_DATA: NetworkFormData = {
  name: '',
  terminalTypeId: '',
  readinessStatus: 'ready',
  notes: '',
};
