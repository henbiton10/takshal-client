import { TerminalFormData } from './types';
import { READINESS_STATUS_OPTIONS } from '../../shared/constants/status';

export const FREQUENCY_BAND_OPTIONS = [
  { value: 'ka', label: 'KA' },
  { value: 'ku', label: 'KU' },
];

export { READINESS_STATUS_OPTIONS };

export const INITIAL_FORM_DATA: TerminalFormData = {
  name: '',
  stationId: '',
  frequencyBand: '',
  terminalType: '',
  readinessStatus: 'ready',
  notes: '',
};
