export const AFFILIATION_OPTIONS = [
  { value: 'israeli', label: 'ישראלי' },
  { value: 'international', label: 'בין לאומי' },
];

export const FREQUENCY_CONVERTER_OPTIONS = [
  { value: true, label: 'כן' },
  { value: false, label: 'לא' },
];

export const READINESS_STATUS_OPTIONS = [
  { value: 'ready', label: 'כשיר' },
  { value: 'partly_ready', label: 'כשיר חלקית' },
  { value: 'damaged', label: 'תקול' },
];

export const INITIAL_FORM_DATA = {
  name: '',
  affiliation: '' as const,
  hasFrequencyConverter: null,
  readinessStatus: 'ready' as const,
  notes: '',
};
