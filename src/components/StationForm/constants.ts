import { StationFormData } from './types';
import iafIcon from '../../assets/IAF.png';
import c4iIcon from '../../assets/C4I.svg';
import { READINESS_STATUS_OPTIONS } from '../../shared/constants/status';

export const ORGANIZATIONAL_AFFILIATION_OPTIONS = [
  { value: 'airforce', label: 'חה"א', icon: iafIcon },
  { value: 'tikshuv', label: 'אגף התקשוב', icon: c4iIcon },
];

export { READINESS_STATUS_OPTIONS };

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
  readinessStatus: 'ready',
  notes: '',
  connectivities: [],
  antennas: [],
};
