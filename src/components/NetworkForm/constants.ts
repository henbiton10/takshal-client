import { NetworkFormData } from './types';
import { READINESS_STATUS_OPTIONS } from '../../shared/constants/status';

export { READINESS_STATUS_OPTIONS };

export const INITIAL_FORM_DATA: NetworkFormData = {
  name: '',
  terminalTypeId: '',
  readinessStatus: 'ready',
  notes: '',
};
