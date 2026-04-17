import workingIcon from '../../assets/working.svg';
import halfWorkingIcon from '../../assets/halfWorking.svg';
import notWorkingIcon from '../../assets/notWorking.svg';

export const READINESS_STATUS_OPTIONS = [
  { value: 'ready', label: 'כשיר', icon: workingIcon },
  { value: 'partly_ready', label: 'כשיר חלקית', icon: halfWorkingIcon },
  { value: 'damaged', label: 'תקול', icon: notWorkingIcon },
];

export type ReadinessStatus = 'ready' | 'partly_ready' | 'damaged';
