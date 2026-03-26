import { StationFormData } from './types';

export const ORGANIZATIONAL_AFFILIATION_OPTIONS = [
  { value: 'airforce', label: 'חה"א' },
  { value: 'tikshuv', label: 'אגף התקשוב' },
];

export const READINESS_STATUS_OPTIONS = [
  { value: 'ready', label: 'כשיר' },
  { value: 'partly_ready', label: 'כשיר חלקית' },
  { value: 'damaged', label: 'תקול' },
];

export const COMMUNICATION_TYPE_OPTIONS = [
  { value: 'fiber_optic', label: 'סיב אופטי' },
  { value: 'radio', label: 'רדיו' },
  { value: 'satellite', label: 'לוויני' },
  { value: 'microwave', label: 'גל מיקרו' },
];

export const FREQUENCY_BAND_OPTIONS = [
  { value: 'KA', label: 'KA' },
  { value: 'KU', label: 'KU' },
];

export const INITIAL_FORM_DATA: StationFormData = {
  name: '',
  organizationalAffiliation: '',
  readinessStatus: '',
  notes: '',
  connectivities: [],
  antennas: [],
};
