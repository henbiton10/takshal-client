import { TerminalFormData } from './types';

export const FREQUENCY_BAND_OPTIONS = [
  { value: 'ka', label: 'KA' },
  { value: 'ku', label: 'KU' },
];

export const READINESS_STATUS_OPTIONS = [
  { value: 'ready', label: 'כשיר' },
  { value: 'partly_ready', label: 'כשיר חלקית' },
  { value: 'damaged', label: 'תקול' },
];

export const INITIAL_FORM_DATA: TerminalFormData = {
  name: '',
  stationId: '',
  frequencyBand: '',
  terminalType: '',
  readinessStatus: 'ready',
  notes: '',
};
