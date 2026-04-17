import israelIcon from '../../assets/israel.png';
import earthIcon from '../../assets/earth.png';
import { READINESS_STATUS_OPTIONS } from '../../shared/constants/status';

export const AFFILIATION_OPTIONS = [
  { value: 'israeli', label: 'ישראלי', icon: israelIcon },
  { value: 'international', label: 'בין לאומי', icon: earthIcon },
];

export const FREQUENCY_CONVERTER_OPTIONS = [
  { value: true, label: 'כן' },
  { value: false, label: 'לא' },
];

export { READINESS_STATUS_OPTIONS };

export const INITIAL_FORM_DATA = {
  name: '',
  affiliation: '' as const,
  hasFrequencyConverter: null,
  readinessStatus: 'ready' as const,
  notes: '',
};
