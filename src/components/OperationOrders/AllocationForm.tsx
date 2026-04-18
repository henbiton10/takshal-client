import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import deleteIcon from '../../assets/delete.svg';
import { useForm, Controller } from 'react-hook-form';
import {
  CreateAllocationDto,
  AllocationData,
  AntennaWithStation,
  SatelliteSummary,
  Terminal,
  ConnectivityValidationResult,
  SubAllocationPayload,
  AntennaSatelliteConflict,
  ChannelConflict,
} from '../../services/api/types';
import { operationOrdersApi, terminalsApi, satellitesApi } from '../../services/api';
import { AntennaSelector } from './AntennaSelector';
import { ConnectivitySelector } from './ConnectivitySelector';
import { useAllocationValidation } from './useAllocationValidation';
import { AntennaConflictWarning } from './AntennaConflictWarning';
import { ChannelConflictError } from './ChannelConflictError';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: rgba(6, 15, 35, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  direction: rtl;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
`;

const FormTitle = styled.h3`
  color: rgba(225, 234, 255, 0.9);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const AllocationTypeChip = styled(Chip) <{ $isMain?: boolean }>`
  background: ${(props) =>
    props.$isMain ? 'rgba(34, 197, 94, 0.15)' : 'rgba(59, 130, 246, 0.15)'};
  color: ${(props) => (props.$isMain ? '#22c55e' : '#3b82f6')};
  border: 1px solid
    ${(props) =>
    props.$isMain ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
  font-size: 12px;
  height: 26px;
`;

const SectionTitle = styled.h4`
  color: rgba(225, 234, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
`;

const FieldsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const FieldWrapper = styled.div<{ $flex?: number }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: ${(props) => props.$flex || 1};
  min-width: 150px;
`;

const FieldLabel = styled.label`
  color: rgba(225, 234, 255, 0.7);
  font-size: 13px;
  font-weight: 500;

  .required {
    color: #ef4444;
    margin-right: 4px;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(16, 33, 62, 0.6);
    border-radius: 6px;
    color: rgba(225, 234, 255, 0.9);

    fieldset {
      border-color: rgba(59, 130, 246, 0.3);
    }

    &:hover fieldset {
      border-color: rgba(59, 130, 246, 0.5);
    }

    &.Mui-focused fieldset {
      border-color: #3b82f6;
    }
  }

  .MuiInputBase-input {
    color: rgba(225, 234, 255, 0.9);
    padding: 10px 12px;
    font-size: 14px;
    direction: rtl;
    text-align: right;
  }
`;

const StyledSelect = styled(Select)`
  background: rgba(16, 33, 62, 0.6);
  border-radius: 6px;
  color: rgba(225, 234, 255, 0.9);

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(59, 130, 246, 0.3);
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(59, 130, 246, 0.5);
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3b82f6;
  }

  .MuiSelect-select {
    padding: 10px 12px 10px 32px !important;
    font-size: 14px;
    text-align: right;
    direction: rtl;
  }

  .MuiSelect-icon {
    left: 7px;
    right: auto;
    color: rgba(225, 234, 255, 0.7);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: rgba(16, 33, 62, 0.4);
  border-radius: 6px;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const SaveButton = styled(Button)`
  background: rgba(59, 130, 246, 0.35);
  color: white !important;
  padding: 8px 24px;
  border-radius: 20px;
  font-weight: 500;
  text-transform: none;
  border: 1px solid rgba(59, 130, 246, 0.5);

  & .MuiSvgIcon-root {
    color: inherit;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.5);
    border-color: rgba(59, 130, 246, 0.7);
  }

  &:disabled {
    background: rgba(59, 130, 246, 0.15);
    color: rgba(225, 234, 255, 0.4) !important;
  }
`;

const CancelButton = styled(Button)`
  background: rgba(51, 65, 85, 0.9);
  color: white !important;
  padding: 8px 24px;
  border: 1px solid rgba(100, 116, 139, 0.5);
  border-radius: 20px;
  text-transform: none;
  font-weight: 500;

  & .MuiSvgIcon-root {
    color: inherit;
  }

  &:hover {
    background: rgba(71, 85, 105, 1);
    border-color: rgba(148, 163, 184, 0.6);
  }
`;

const NotesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddSubButton = styled(Button)`
  background: rgba(59, 130, 246, 0.35);
  color: white !important;
  border: 1px solid rgba(59, 130, 246, 0.5);
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 20px;
  text-transform: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  & .MuiSvgIcon-root {
    color: inherit;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.5);
    border-color: rgba(59, 130, 246, 0.7);
  }
`;

const SubAllocationsContainer = styled.div`
  margin-top: 24px;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
  padding-top: 20px;
`;

const SubAllocationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SubAllocationsTitle = styled.h4`
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubAllocationCard = styled.div`
  background: rgba(16, 33, 62, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
`;

const SubAllocationCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SubAllocationNumber = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 600;
`;

const DeleteSubButton = styled(IconButton)`
  color: #ef4444;
  padding: 4px;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`;

interface SubAllocationFormData {
  id: string;
  existingId?: number;
  terminalId: number | '';
  transmissionSatelliteId: number | '';
  transmissionAntennaId: number | '';
  transmissionFrequency: number | '';
  transmissionConnectivityId: number | '';
  transmissionChannelNumber: number | '';
  receptionSatelliteId: number | '';
  receptionAntennaId: number | '';
  receptionFrequency: number | '';
  receptionConnectivityId: number | '';
  receptionChannelNumber: number | '';
  tailNumbers: number[];
}

interface AllocationFormData {
  terminalId: number | '';
  transmissionSatelliteId: number | '';
  transmissionAntennaId: number | '';
  transmissionFrequency: number | '';
  receptionSatelliteId: number | '';
  receptionAntennaId: number | '';
  receptionFrequency: number | '';
  transmissionConnectivityId: number | '';
  receptionConnectivityId: number | '';
  transmissionChannelNumber: number | '';
  receptionChannelNumber: number | '';
  tailNumbers: number[];
  notes: string;
  addNotes: boolean;
}

interface PendingChannelSelection {
  connectivityId: number;
  channelNumber: number;
  formId: string;
}

interface SubAllocationErrors {
  terminalId?: string;
  transmissionSatelliteId?: string;
  transmissionAntennaId?: string;
  transmissionFrequency?: string;
  receptionSatelliteId?: string;
  receptionAntennaId?: string;
  receptionFrequency?: string;
  transmissionConnectivityId?: string;
  transmissionChannelNumber?: string;
  receptionConnectivityId?: string;
  receptionChannelNumber?: string;
}

interface SubAllocationCardProps {
  sub: SubAllocationFormData;
  index: number;
  orderNumber?: number;
  terminals: Terminal[];
  satellites: SatelliteSummary[];
  antennas: AntennaWithStation[];
  operationOrderId: number;
  onChange: (id: string, field: keyof SubAllocationFormData, value: number | '') => void;
  onRemove: (id: string) => void;
  pendingSelections: PendingChannelSelection[];
  errors?: SubAllocationErrors;
}

const filterValidationWithPending = (
  validation: ConnectivityValidationResult | null,
  pendingSelections: PendingChannelSelection[],
  currentFormId: string
): ConnectivityValidationResult | null => {
  if (!validation) return null;

  const filteredAvailableChannels: Record<number, number[]> = {};

  for (const [connIdStr, channels] of Object.entries(validation.availableChannels)) {
    const connId = Number(connIdStr);
    const pendingForConn = pendingSelections.filter(
      (p) => p.connectivityId === connId && p.formId !== currentFormId
    );
    const usedChannels = pendingForConn.map((p) => p.channelNumber);
    filteredAvailableChannels[connId] = channels.filter((ch) => !usedChannels.includes(ch));
  }

  return {
    ...validation,
    availableChannels: filteredAvailableChannels,
  };
};

const SubAllocationCardComponent = ({
  sub,
  index,
  orderNumber,
  terminals,
  satellites,
  antennas,
  operationOrderId,
  onChange,
  onRemove,
  pendingSelections,
  errors,
}: SubAllocationCardProps) => {
  const subOrderNum = orderNumber ? `${orderNumber}.${index + 1}` : `${index + 1}`;

  const selectedTerminal = terminals.find((t) => t.id === sub.terminalId);

  const filteredAntennas = useMemo(() => {
    if (!selectedTerminal) return antennas;
    return antennas.filter(
      (a) =>
        a.frequencyBand.toLowerCase() === selectedTerminal.frequencyBand.toLowerCase() &&
        (!a.isDeleted || a.id === sub.transmissionAntennaId || a.id === sub.receptionAntennaId)
    );
  }, [antennas, selectedTerminal, sub.transmissionAntennaId, sub.receptionAntennaId]);

  const { transmissionValidation, receptionValidation, loading: validationLoading } =
    useAllocationValidation({
      terminalId: sub.terminalId || undefined,
      transmissionAntennaId: sub.transmissionAntennaId || undefined,
      receptionAntennaId: sub.receptionAntennaId || undefined,
      operationOrderId,
    });

  const isSubTxRxSynced = useMemo(() => {
    return (
      sub.transmissionSatelliteId !== '' &&
      sub.receptionSatelliteId !== '' &&
      sub.transmissionAntennaId !== '' &&
      sub.receptionAntennaId !== '' &&
      sub.transmissionConnectivityId !== '' &&
      sub.receptionConnectivityId !== '' &&
      Number(sub.transmissionSatelliteId) === Number(sub.receptionSatelliteId) &&
      Number(sub.transmissionAntennaId) === Number(sub.receptionAntennaId) &&
      Number(sub.transmissionConnectivityId) === Number(sub.receptionConnectivityId)
    );
  }, [sub]);

  const filteredTransmissionValidation = useMemo(() => {
    if (isSubTxRxSynced) {
      const withoutRx = pendingSelections.filter(p => p.formId !== `sub-rx-${sub.id}`);
      return filterValidationWithPending(transmissionValidation, withoutRx, `sub-tx-${sub.id}`);
    }
    return filterValidationWithPending(transmissionValidation, pendingSelections, `sub-tx-${sub.id}`);
  }, [transmissionValidation, pendingSelections, sub.id, isSubTxRxSynced]);

  const filteredReceptionValidation = useMemo(() => {
    if (isSubTxRxSynced) {
      const withoutTx = pendingSelections.filter(p => p.formId !== `sub-tx-${sub.id}`);
      return filterValidationWithPending(receptionValidation, withoutTx, `sub-rx-${sub.id}`);
    }
    return filterValidationWithPending(receptionValidation, pendingSelections, `sub-rx-${sub.id}`);
  }, [receptionValidation, pendingSelections, sub.id, isSubTxRxSynced]);

  return (
    <SubAllocationCard>
      <SubAllocationCardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AllocationTypeChip $isMain={false} label="משני" size="small" />
          <SubAllocationNumber>#{subOrderNum}</SubAllocationNumber>
        </div>
        <DeleteSubButton onClick={() => onRemove(sub.id)}>
          <img src={deleteIcon} alt="מחיקה" style={{ width: '18px', height: '18px' }} />
        </DeleteSubButton>
      </SubAllocationCardHeader>

      <FieldsRow>
        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            טרמינל
          </FieldLabel>
          <FormControl fullWidth error={!!errors?.terminalId}>
            <StyledSelect
              value={sub.terminalId}
              onChange={(e) => onChange(sub.id, 'terminalId', e.target.value as number)}
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר טרמינל
              </MenuItem>
              {terminals
                .filter((t) => !t.isDeleted || t.id === sub.terminalId)
                .map((t) => (
                  <MenuItem key={t.id} value={t.id} disabled={t.isDeleted}>
                    {t.name}{t.isDeleted ? ' (נמחק)' : ''}
                  </MenuItem>
                ))}
            </StyledSelect>
            {errors?.terminalId && <FormHelperText>{errors.terminalId}</FormHelperText>}
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>מספרי זנב</FieldLabel>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={sub.tailNumbers || []}
            onChange={(_, newValue) => {
              const numericValues = newValue
                .map(v => typeof v === 'string' ? Number(v.trim()) : v)
                .filter(v => !isNaN(v) && v !== 0);
              onChange(sub.id, 'tailNumbers', numericValues as any);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip key={key} variant="outlined" label={option} size="small" sx={{ '& .MuiChip-deleteIcon': { margin: '0 -4px 0 4px' } }} {...tagProps} />;
              })
            }
            renderInput={(params) => (
              <StyledTextField {...params} placeholder="מספרי זנב..." size="small" />
            )}
          />
        </FieldWrapper>
      </FieldsRow>

      <SectionTitle style={{ marginTop: '12px', fontSize: '13px' }}>שידור</SectionTitle>
      <FieldsRow>
        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            לוויין
          </FieldLabel>
          <FormControl fullWidth error={!!errors?.transmissionSatelliteId}>
            <StyledSelect
              value={sub.transmissionSatelliteId}
              onChange={(e) =>
                onChange(sub.id, 'transmissionSatelliteId', e.target.value as number)
              }
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר לוויין
              </MenuItem>
              {satellites
                .filter((sat) => !sat.isDeleted || sat.id === sub.transmissionSatelliteId)
                .map((sat) => (
                  <MenuItem key={sat.id} value={sat.id} disabled={sat.isDeleted}>
                    {sat.name}{sat.isDeleted ? ' (נמחק)' : ''}
                  </MenuItem>
                ))}
            </StyledSelect>
            {errors?.transmissionSatelliteId && (
              <FormHelperText>{errors.transmissionSatelliteId}</FormHelperText>
            )}
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            אנטנה
          </FieldLabel>
          <FormControl fullWidth error={!!errors?.transmissionAntennaId}>
            <StyledSelect
              value={sub.transmissionAntennaId}
              onChange={(e) =>
                onChange(sub.id, 'transmissionAntennaId', e.target.value as number)
              }
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר אנטנה
              </MenuItem>
              {filteredAntennas.map((ant) => (
                <MenuItem key={ant.id} value={ant.id} disabled={ant.isDeleted}>
                  {ant.displayName} ({ant.stationName}){ant.isDeleted ? ' (נמחק)' : ''}
                </MenuItem>
              ))}
            </StyledSelect>
            {errors?.transmissionAntennaId && (
              <FormHelperText>{errors.transmissionAntennaId}</FormHelperText>
            )}
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            תדר (MHz)
          </FieldLabel>
          <StyledTextField
            type="number"
            value={sub.transmissionFrequency}
            onChange={(e) =>
              onChange(
                sub.id,
                'transmissionFrequency',
                e.target.value ? Number(e.target.value) : ''
              )
            }
            placeholder="תדר"
            size="small"
            error={!!errors?.transmissionFrequency}
            helperText={errors?.transmissionFrequency}
          />
        </FieldWrapper>

        {filteredTransmissionValidation && (
          <FieldWrapper $flex={2}>
            <ConnectivitySelector
              validation={filteredTransmissionValidation}
              loading={validationLoading}
              selectedConnectivityId={sub.transmissionConnectivityId || undefined}
              selectedChannelNumber={sub.transmissionChannelNumber || undefined}
              onConnectivityChange={(id: number | undefined) =>
                onChange(sub.id, 'transmissionConnectivityId', id || '')
              }
              onChannelChange={(ch: number | undefined) =>
                onChange(sub.id, 'transmissionChannelNumber', ch || '')
              }
              label="קישוריות"
              compact
              connectivityError={errors?.transmissionConnectivityId}
              channelError={errors?.transmissionChannelNumber}
            />
          </FieldWrapper>
        )}
      </FieldsRow>

      <SectionTitle style={{ marginTop: '12px', fontSize: '13px' }}>קליטה</SectionTitle>
      <FieldsRow>
        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            לוויין
          </FieldLabel>
          <FormControl fullWidth error={!!errors?.receptionSatelliteId}>
            <StyledSelect
              value={sub.receptionSatelliteId}
              onChange={(e) =>
                onChange(sub.id, 'receptionSatelliteId', e.target.value as number)
              }
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר לוויין
              </MenuItem>
              {satellites
                .filter((sat) => !sat.isDeleted || sat.id === sub.receptionSatelliteId)
                .map((sat) => (
                  <MenuItem key={sat.id} value={sat.id} disabled={sat.isDeleted}>
                    {sat.name}{sat.isDeleted ? ' (נמחק)' : ''}
                  </MenuItem>
                ))}
            </StyledSelect>
            {errors?.receptionSatelliteId && (
              <FormHelperText>{errors.receptionSatelliteId}</FormHelperText>
            )}
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            אנטנה
          </FieldLabel>
          <FormControl fullWidth error={!!errors?.receptionAntennaId}>
            <StyledSelect
              value={sub.receptionAntennaId}
              onChange={(e) =>
                onChange(sub.id, 'receptionAntennaId', e.target.value as number)
              }
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר אנטנה
              </MenuItem>
              {filteredAntennas.map((ant) => (
                <MenuItem key={ant.id} value={ant.id} disabled={ant.isDeleted}>
                  {ant.displayName} ({ant.stationName}){ant.isDeleted ? ' (נמחק)' : ''}
                </MenuItem>
              ))}
            </StyledSelect>
            {errors?.receptionAntennaId && (
              <FormHelperText>{errors.receptionAntennaId}</FormHelperText>
            )}
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            תדר (MHz)
          </FieldLabel>
          <StyledTextField
            type="number"
            value={sub.receptionFrequency}
            onChange={(e) =>
              onChange(
                sub.id,
                'receptionFrequency',
                e.target.value ? Number(e.target.value) : ''
              )
            }
            placeholder="תדר"
            size="small"
            error={!!errors?.receptionFrequency}
            helperText={errors?.receptionFrequency}
          />
        </FieldWrapper>

        {filteredReceptionValidation && (
          <FieldWrapper $flex={2}>
            <ConnectivitySelector
              validation={filteredReceptionValidation}
              loading={validationLoading}
              selectedConnectivityId={sub.receptionConnectivityId || undefined}
              selectedChannelNumber={sub.receptionChannelNumber || undefined}
              onConnectivityChange={(id: number | undefined) =>
                onChange(sub.id, 'receptionConnectivityId', id || '')
              }
              onChannelChange={(ch: number | undefined) =>
                onChange(sub.id, 'receptionChannelNumber', ch || '')
              }
              label="קישוריות"
              compact
              connectivityError={errors?.receptionConnectivityId}
              channelError={errors?.receptionChannelNumber}
              channelDisabled={isSubTxRxSynced}
              channelSyncLabel="מסונכרן עם שידור"
            />
          </FieldWrapper>
        )}
      </FieldsRow>
    </SubAllocationCard>
  );
};

interface AllocationFormProps {
  operationOrderId: number;
  editingAllocation?: AllocationData;
  parentAllocation?: AllocationData;
  onSave: (data: CreateAllocationDto, subAllocations?: SubAllocationPayload[], removedSubAllocationIds?: number[]) => Promise<void>;
  onCancel: () => void;
  existingAllocations: AllocationData[];
  currentOrderNumber?: number;
}

export const AllocationForm = ({
  operationOrderId,
  editingAllocation,
  parentAllocation,
  onSave,
  onCancel,
  existingAllocations: _existingAllocations,
  currentOrderNumber,
}: AllocationFormProps) => {
  void _existingAllocations;
  const formRef = useRef<HTMLFormElement>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [satellites, setSatellites] = useState<SatelliteSummary[]>([]);
  const [antennas, setAntennas] = useState<AntennaWithStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subAllocations, setSubAllocations] = useState<SubAllocationFormData[]>([]);
  const [removedSubAllocationIds, setRemovedSubAllocationIds] = useState<number[]>([]);
  const [subAllocationErrors, setSubAllocationErrors] = useState<Record<string, SubAllocationErrors>>({});
  const [conflictWarning, setConflictWarning] = useState<{
    open: boolean;
    conflicts: AntennaSatelliteConflict[];
    pendingPayload: CreateAllocationDto | null;
    pendingSubPayloads: SubAllocationPayload[] | null;
  }>({ open: false, conflicts: [], pendingPayload: null, pendingSubPayloads: null });

  const [channelConflictError, setChannelConflictError] = useState<{
    open: boolean;
    conflicts: ChannelConflict[];
  }>({ open: false, conflicts: [] });

  const isMainAllocation = !parentAllocation;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AllocationFormData>({
    defaultValues: {
      terminalId: editingAllocation?.terminalId || '',
      transmissionSatelliteId: editingAllocation?.transmissionSatelliteId || '',
      transmissionAntennaId: editingAllocation?.transmissionAntennaId || '',
      transmissionFrequency: editingAllocation?.transmissionFrequency || '',
      receptionSatelliteId: editingAllocation?.receptionSatelliteId || '',
      receptionAntennaId: editingAllocation?.receptionAntennaId || '',
      receptionFrequency: editingAllocation?.receptionFrequency || '',
      transmissionConnectivityId: editingAllocation?.transmissionConnectivityId || '',
      receptionConnectivityId: editingAllocation?.receptionConnectivityId || '',
      transmissionChannelNumber: editingAllocation?.transmissionChannelNumber || '',
      receptionChannelNumber: editingAllocation?.receptionChannelNumber || '',
      tailNumbers: editingAllocation?.tailNumbers || [],
      notes: editingAllocation?.notes || '',
      addNotes: !!editingAllocation?.notes,
    },
    mode: 'onSubmit',
  });

  const watchedValues = watch();

  const { transmissionValidation, receptionValidation, loading: validationLoading } =
    useAllocationValidation({
      terminalId: watchedValues.terminalId || undefined,
      transmissionAntennaId: watchedValues.transmissionAntennaId || undefined,
      receptionAntennaId: watchedValues.receptionAntennaId || undefined,
      operationOrderId,
      excludeAllocationId: editingAllocation?.id,
    });

  const pendingSelections = useMemo<PendingChannelSelection[]>(() => {
    const selections: PendingChannelSelection[] = [];

    if (watchedValues.transmissionConnectivityId && watchedValues.transmissionChannelNumber) {
      selections.push({
        connectivityId: Number(watchedValues.transmissionConnectivityId),
        channelNumber: Number(watchedValues.transmissionChannelNumber),
        formId: 'main-tx',
      });
    }

    if (watchedValues.receptionConnectivityId && watchedValues.receptionChannelNumber) {
      selections.push({
        connectivityId: Number(watchedValues.receptionConnectivityId),
        channelNumber: Number(watchedValues.receptionChannelNumber),
        formId: 'main-rx',
      });
    }

    subAllocations.forEach((sub) => {
      if (sub.transmissionConnectivityId && sub.transmissionChannelNumber) {
        selections.push({
          connectivityId: Number(sub.transmissionConnectivityId),
          channelNumber: Number(sub.transmissionChannelNumber),
          formId: `sub-tx-${sub.id}`,
        });
      }
      if (sub.receptionConnectivityId && sub.receptionChannelNumber) {
        selections.push({
          connectivityId: Number(sub.receptionConnectivityId),
          channelNumber: Number(sub.receptionChannelNumber),
          formId: `sub-rx-${sub.id}`,
        });
      }
    });

    return selections;
  }, [watchedValues, subAllocations]);

  const isTxRxChannelSynced = useMemo(() => {
    const v = watchedValues;
    return (
      v.transmissionSatelliteId !== '' &&
      v.receptionSatelliteId !== '' &&
      v.transmissionAntennaId !== '' &&
      v.receptionAntennaId !== '' &&
      v.transmissionConnectivityId !== '' &&
      v.receptionConnectivityId !== '' &&
      Number(v.transmissionSatelliteId) === Number(v.receptionSatelliteId) &&
      Number(v.transmissionAntennaId) === Number(v.receptionAntennaId) &&
      Number(v.transmissionConnectivityId) === Number(v.receptionConnectivityId)
    );
  }, [
    watchedValues.transmissionSatelliteId, watchedValues.receptionSatelliteId,
    watchedValues.transmissionAntennaId, watchedValues.receptionAntennaId,
    watchedValues.transmissionConnectivityId, watchedValues.receptionConnectivityId,
  ]);

  const prevTxChannelRef = useRef(watchedValues.transmissionChannelNumber);
  const prevRxChannelRef = useRef(watchedValues.receptionChannelNumber);
  const prevSyncedRef = useRef(false);

  useEffect(() => {
    const txCh = watchedValues.transmissionChannelNumber;
    const rxCh = watchedValues.receptionChannelNumber;

    if (!isTxRxChannelSynced) {
      prevTxChannelRef.current = txCh;
      prevRxChannelRef.current = rxCh;
      prevSyncedRef.current = false;
      return;
    }

    const prevTx = prevTxChannelRef.current;
    const prevRx = prevRxChannelRef.current;
    const justBecameSynced = !prevSyncedRef.current;

    prevTxChannelRef.current = txCh;
    prevRxChannelRef.current = rxCh;
    prevSyncedRef.current = true;

    if (txCh === rxCh) return;

    if (justBecameSynced) {
      if (txCh) {
        setValue('receptionChannelNumber', txCh);
      } else if (rxCh) {
        setValue('transmissionChannelNumber', rxCh);
      }
      return;
    }

    const txChanged = txCh !== prevTx;
    const rxChanged = rxCh !== prevRx;

    if (txChanged) {
      setValue('receptionChannelNumber', txCh);
    } else if (rxChanged) {
      setValue('transmissionChannelNumber', rxCh);
    }
  }, [isTxRxChannelSynced, watchedValues.transmissionChannelNumber, watchedValues.receptionChannelNumber, setValue]);

  const filteredMainTransmissionValidation = useMemo(() => {
    if (isTxRxChannelSynced) {
      const withoutRx = pendingSelections.filter(p => p.formId !== 'main-rx');
      return filterValidationWithPending(transmissionValidation, withoutRx, 'main-tx');
    }
    return filterValidationWithPending(transmissionValidation, pendingSelections, 'main-tx');
  }, [transmissionValidation, pendingSelections, isTxRxChannelSynced]);

  const filteredMainReceptionValidation = useMemo(() => {
    if (isTxRxChannelSynced) {
      const withoutTx = pendingSelections.filter(p => p.formId !== 'main-tx');
      return filterValidationWithPending(receptionValidation, withoutTx, 'main-rx');
    }
    return filterValidationWithPending(receptionValidation, pendingSelections, 'main-rx');
  }, [receptionValidation, pendingSelections, isTxRxChannelSynced]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [terminalsData, satellitesData, antennasData] = await Promise.all([
          terminalsApi.getAll(),
          satellitesApi.getAllSummary(),
          operationOrdersApi.getAntennasWithStationInfo(),
        ]);
        setTerminals(terminalsData);
        setSatellites(satellitesData);
        setAntennas(antennasData);
      } catch (error) {
        console.error('Failed to fetch form data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editingAllocation?.subAllocations && editingAllocation.subAllocations.length > 0) {
      const existingSubs: SubAllocationFormData[] = editingAllocation.subAllocations
        .filter((sub) => !sub.isDeleted)
        .map((sub) => ({
          id: `existing-${sub.id}`,
          existingId: sub.id,
          terminalId: sub.terminalId || '',
          transmissionSatelliteId: sub.transmissionSatelliteId || '',
          transmissionAntennaId: sub.transmissionAntennaId || '',
          transmissionFrequency: sub.transmissionFrequency || '',
          transmissionConnectivityId: sub.transmissionConnectivityId || '',
          transmissionChannelNumber: sub.transmissionChannelNumber || '',
          receptionSatelliteId: sub.receptionSatelliteId || '',
          receptionAntennaId: sub.receptionAntennaId || '',
          receptionFrequency: sub.receptionFrequency || '',
          receptionConnectivityId: sub.receptionConnectivityId || '',
          receptionChannelNumber: sub.receptionChannelNumber || '',
          tailNumbers: sub.tailNumbers || [],
        }));
      setSubAllocations(existingSubs);
    }
  }, [editingAllocation]);

  const selectedTerminal = useMemo(() => {
    if (!watchedValues.terminalId) return null;
    return terminals.find((t) => t.id === watchedValues.terminalId);
  }, [terminals, watchedValues.terminalId]);

  const filteredTransmissionAntennas = useMemo(() => {
    if (!selectedTerminal) return antennas;
    return antennas.filter(
      (a) =>
        a.frequencyBand.toLowerCase() === selectedTerminal.frequencyBand.toLowerCase() &&
        (!a.isDeleted || a.id === watchedValues.transmissionAntennaId)
    );
  }, [antennas, selectedTerminal, watchedValues.transmissionAntennaId]);

  const filteredReceptionAntennas = useMemo(() => {
    if (!selectedTerminal) return antennas;
    return antennas.filter(
      (a) =>
        a.frequencyBand.toLowerCase() === selectedTerminal.frequencyBand.toLowerCase() &&
        (!a.isDeleted || a.id === watchedValues.receptionAntennaId)
    );
  }, [antennas, selectedTerminal, watchedValues.receptionAntennaId]);

  const handleAddSubAllocation = useCallback(() => {
    const newSub: SubAllocationFormData = {
      id: `sub-${Date.now()}`,
      terminalId: '',
      transmissionSatelliteId: '',
      transmissionAntennaId: '',
      transmissionFrequency: '',
      transmissionConnectivityId: '',
      transmissionChannelNumber: '',
      receptionSatelliteId: '',
      receptionAntennaId: '',
      receptionFrequency: '',
      receptionConnectivityId: '',
      receptionChannelNumber: '',
      tailNumbers: [],
    };
    setSubAllocations((prev) => [...prev, newSub]);
  }, []);

  const handleRemoveSubAllocation = useCallback((id: string) => {
    setSubAllocations((prev) => {
      const subToRemove = prev.find((sub) => sub.id === id);
      if (subToRemove?.existingId) {
        setRemovedSubAllocationIds((prevIds) => [...prevIds, subToRemove.existingId!]);
      }
      return prev.filter((sub) => sub.id !== id);
    });
  }, []);

  const handleSubAllocationChange = useCallback(
    (id: string, field: keyof SubAllocationFormData, value: number | '') => {
      setSubAllocations((prev) =>
        prev.map((sub) => {
          if (sub.id !== id) return sub;
          const updated = { ...sub, [field]: value };

          const synced = (
            updated.transmissionSatelliteId !== '' &&
            updated.receptionSatelliteId !== '' &&
            updated.transmissionAntennaId !== '' &&
            updated.receptionAntennaId !== '' &&
            updated.transmissionConnectivityId !== '' &&
            updated.receptionConnectivityId !== '' &&
            Number(updated.transmissionSatelliteId) === Number(updated.receptionSatelliteId) &&
            Number(updated.transmissionAntennaId) === Number(updated.receptionAntennaId) &&
            Number(updated.transmissionConnectivityId) === Number(updated.receptionConnectivityId)
          );

          if (synced) {
            if (field === 'transmissionChannelNumber') {
              updated.receptionChannelNumber = value;
            } else if (field === 'receptionChannelNumber') {
              updated.transmissionChannelNumber = value;
            }
          }

          if (field === 'transmissionAntennaId' && value && !sub.receptionAntennaId) {
            updated.receptionAntennaId = value;
          } else if (field === 'receptionAntennaId' && value && !sub.transmissionAntennaId) {
            updated.transmissionAntennaId = value;
          }

          return updated;
        })
      );

      if (subAllocationErrors[id]?.[field as keyof SubAllocationErrors]) {
        setSubAllocationErrors((prev) => {
          const subErrors = { ...prev[id] };
          delete subErrors[field as keyof SubAllocationErrors];
          if (Object.keys(subErrors).length === 0) {
            const { [id]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [id]: subErrors };
        });
      }
    },
    [subAllocationErrors]
  );

  const validateSubAllocations = useCallback((): boolean => {
    const newErrors: Record<string, SubAllocationErrors> = {};
    let hasErrors = false;

    subAllocations.forEach((sub) => {
      const errors: SubAllocationErrors = {};

      if (!sub.terminalId) {
        errors.terminalId = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.transmissionSatelliteId) {
        errors.transmissionSatelliteId = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.transmissionAntennaId) {
        errors.transmissionAntennaId = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.transmissionFrequency) {
        errors.transmissionFrequency = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.receptionSatelliteId) {
        errors.receptionSatelliteId = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.receptionAntennaId) {
        errors.receptionAntennaId = 'שדה חובה';
        hasErrors = true;
      }
      if (!sub.receptionFrequency) {
        errors.receptionFrequency = 'שדה חובה';
        hasErrors = true;
      }

      if (Object.keys(errors).length > 0) {
        newErrors[sub.id] = errors;
      }
    });

    setSubAllocationErrors(newErrors);
    return !hasErrors;
  }, [subAllocations]);

  const performSave = useCallback(
    async (payload: CreateAllocationDto, subPayloads: SubAllocationPayload[]) => {
      setSaving(true);
      try {
        await onSave(
          payload,
          subPayloads.length > 0 ? subPayloads : undefined,
          removedSubAllocationIds.length > 0 ? removedSubAllocationIds : undefined
        );
      } catch (error) {
        console.error('Failed to save allocation:', error);
      } finally {
        setSaving(false);
      }
    },
    [onSave, removedSubAllocationIds]
  );

  const handleConflictConfirm = useCallback(async () => {
    if (conflictWarning.pendingPayload) {
      const payloadWithConflict = {
        ...conflictWarning.pendingPayload,
        hasConflict: true,
        conflictIgnored: true,
      };
      await performSave(payloadWithConflict, conflictWarning.pendingSubPayloads || []);
    }
    setConflictWarning({ open: false, conflicts: [], pendingPayload: null, pendingSubPayloads: null });
  }, [conflictWarning, performSave]);

  const handleConflictCancel = useCallback(() => {
    setConflictWarning({ open: false, conflicts: [], pendingPayload: null, pendingSubPayloads: null });
  }, []);

  const handleChannelConflictClose = useCallback(() => {
    setChannelConflictError({ open: false, conflicts: [] });
  }, []);

  const onSubmit = useCallback(
    async (data: AllocationFormData) => {
      if (subAllocations.length > 0 && !validateSubAllocations()) {
        return;
      }

      const payload: CreateAllocationDto = {
        terminalId: Number(data.terminalId),
        transmissionSatelliteId: Number(data.transmissionSatelliteId),
        transmissionAntennaId: Number(data.transmissionAntennaId),
        transmissionFrequency: Number(data.transmissionFrequency),
        receptionSatelliteId: Number(data.receptionSatelliteId),
        receptionAntennaId: Number(data.receptionAntennaId),
        receptionFrequency: Number(data.receptionFrequency),
        transmissionConnectivityId: data.transmissionConnectivityId
          ? Number(data.transmissionConnectivityId)
          : null,
        receptionConnectivityId: data.receptionConnectivityId
          ? Number(data.receptionConnectivityId)
          : null,
        transmissionChannelNumber: data.transmissionChannelNumber
          ? Number(data.transmissionChannelNumber)
          : null,
        receptionChannelNumber: data.receptionChannelNumber
          ? Number(data.receptionChannelNumber)
          : null,
        tailNumbers: data.tailNumbers && data.tailNumbers.length > 0 ? data.tailNumbers : null,
        notes: data.addNotes ? data.notes : null,
        parentAllocationId: parentAllocation?.id || null,
        hasConflict:
          transmissionValidation?.error === 'channels_full' ||
          receptionValidation?.error === 'channels_full',
      };

      const subPayloads: SubAllocationPayload[] = subAllocations
        .filter((sub) => sub.terminalId && sub.transmissionSatelliteId && sub.receptionSatelliteId)
        .map((sub) => {
          const basePayload = {
            existingId: sub.existingId,
            terminalId: Number(sub.terminalId),
            transmissionSatelliteId: Number(sub.transmissionSatelliteId),
            transmissionAntennaId: Number(sub.transmissionAntennaId),
            transmissionFrequency: Number(sub.transmissionFrequency),
            transmissionConnectivityId: sub.transmissionConnectivityId
              ? Number(sub.transmissionConnectivityId)
              : null,
            transmissionChannelNumber: sub.transmissionChannelNumber
              ? Number(sub.transmissionChannelNumber)
              : null,
            receptionSatelliteId: Number(sub.receptionSatelliteId),
            receptionAntennaId: Number(sub.receptionAntennaId),
            receptionFrequency: Number(sub.receptionFrequency),
            receptionConnectivityId: sub.receptionConnectivityId
              ? Number(sub.receptionConnectivityId)
              : null,
            receptionChannelNumber: sub.receptionChannelNumber
              ? Number(sub.receptionChannelNumber)
              : null,
            tailNumbers: sub.tailNumbers && sub.tailNumbers.length > 0 ? sub.tailNumbers : null,
            notes: null,
            hasConflict: false,
          };
          if (!sub.existingId) {
            return { ...basePayload, parentAllocationId: null };
          }
          return basePayload;
        });

      setSaving(true);
      try {
        const channelValidationResult = await operationOrdersApi.validateChannel(
          operationOrderId,
          payload.transmissionConnectivityId ?? null,
          payload.transmissionChannelNumber ?? null,
          payload.receptionConnectivityId ?? null,
          payload.receptionChannelNumber ?? null,
          editingAllocation?.id
        );

        if (channelValidationResult.hasConflicts) {
          setSaving(false);
          setChannelConflictError({
            open: true,
            conflicts: channelValidationResult.conflicts,
          });
          return;
        }

        const validationResult = await operationOrdersApi.validateAntennaSatellite(
          operationOrderId,
          payload.transmissionAntennaId,
          payload.transmissionSatelliteId,
          payload.receptionAntennaId,
          payload.receptionSatelliteId,
          editingAllocation?.id
        );

        if (validationResult.hasConflicts) {
          setSaving(false);
          setConflictWarning({
            open: true,
            conflicts: validationResult.conflicts,
            pendingPayload: payload,
            pendingSubPayloads: subPayloads,
          });
          return;
        }

        await performSave(payload, subPayloads);
      } catch (error) {
        console.error('Failed to validate or save allocation:', error);
        setSaving(false);
      }
    },
    [operationOrderId, editingAllocation, parentAllocation, transmissionValidation, receptionValidation, subAllocations, validateSubAllocations, performSave]
  );

  if (loading) {
    return (
      <FormContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <CircularProgress size={32} sx={{ color: '#3b82f6' }} />
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormHeader>
        <AllocationTypeChip
          $isMain={isMainAllocation}
          label={isMainAllocation ? 'ראשי' : 'משני'}
          size="small"
        />
        <FormTitle>
          {editingAllocation
            ? 'עריכת הקצאה'
            : parentAllocation
              ? `הוספת תת-הקצאה להקצאה #${parentAllocation.orderNumber}`
              : 'הוספת הקצאה חדשה'}
        </FormTitle>
      </FormHeader>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SectionTitle>בחירת טרמינל</SectionTitle>
          <FieldsRow>
            <FieldWrapper $flex={2}>
              <FieldLabel>
                <span className="required">*</span>
                טרמינל
              </FieldLabel>
              <Controller
                name="terminalId"
                control={control}
                rules={{ required: 'שדה חובה' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.terminalId}>
                    <StyledSelect {...field} size="small" displayEmpty>
                      <MenuItem value="" disabled>
                        בחר טרמינל
                      </MenuItem>
                      {terminals
                        .filter((t) => !t.isDeleted || t.id === field.value)
                        .map((terminal) => (
                          <MenuItem key={terminal.id} value={terminal.id} disabled={terminal.isDeleted}>
                            {terminal.name}{terminal.isDeleted ? ' (נמחק)' : ''}
                          </MenuItem>
                        ))}
                    </StyledSelect>
                    {errors.terminalId && (
                      <FormHelperText>{errors.terminalId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </FieldWrapper>
            {selectedTerminal && (
              <FieldWrapper>
                <FieldLabel>תחום תדר</FieldLabel>
                <StyledTextField
                  value={selectedTerminal.frequencyBand.toUpperCase()}
                  disabled
                  size="small"
                />
              </FieldWrapper>
            )}
          </FieldsRow>
        </Section>

        <Section style={{ marginTop: '16px' }}>
          <SectionTitle>הגדרות שידור</SectionTitle>
          <FieldsRow>
            <FieldWrapper>
              <FieldLabel>
                <span className="required">*</span>
                לוויין
              </FieldLabel>
              <Controller
                name="transmissionSatelliteId"
                control={control}
                rules={{ required: 'שדה חובה' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.transmissionSatelliteId}>
                    <StyledSelect {...field} size="small" displayEmpty>
                      <MenuItem value="" disabled>
                        בחר לוויין
                      </MenuItem>
                      {satellites
                        .filter((sat) => !sat.isDeleted || sat.id === field.value)
                        .map((sat) => (
                          <MenuItem key={sat.id} value={sat.id} disabled={sat.isDeleted}>
                            {sat.name}{sat.isDeleted ? ' (נמחק)' : ''}
                          </MenuItem>
                        ))}
                    </StyledSelect>
                    {errors.transmissionSatelliteId && (
                      <FormHelperText>{errors.transmissionSatelliteId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </FieldWrapper>

            <FieldWrapper $flex={2}>
              <Controller
                name="transmissionAntennaId"
                control={control}
                rules={{ required: 'שדה חובה' }}
                render={({ field }) => (
                  <AntennaSelector
                    label="אנטנה"
                    required
                    value={field.value || undefined}
                    onChange={(val) => {
                      field.onChange(val);
                      if (val && !watchedValues.receptionAntennaId) {
                        setValue('receptionAntennaId', val);
                      }
                    }}
                    antennas={filteredTransmissionAntennas}
                    error={errors.transmissionAntennaId?.message}
                  />
                )}
              />
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>
                <span className="required">*</span>
                תדר (MHz)
              </FieldLabel>
              <Controller
                name="transmissionFrequency"
                control={control}
                rules={{
                  required: 'שדה חובה',
                  min: { value: 0.01, message: 'תדר חייב להיות חיובי' },
                }}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    type="number"
                    placeholder="הזן תדר"
                    size="small"
                    error={!!errors.transmissionFrequency}
                    helperText={errors.transmissionFrequency?.message}
                  />
                )}
              />
            </FieldWrapper>

            {transmissionValidation && (
              <FieldWrapper $flex={2}>
                <Controller
                  name="transmissionConnectivityId"
                  control={control}
                  rules={{
                    required: filteredMainTransmissionValidation?.connectivityRequired ? 'שדה חובה' : false
                  }}
                  render={({ field: connField }) => (
                    <Controller
                      name="transmissionChannelNumber"
                      control={control}
                      rules={{
                        required: filteredMainTransmissionValidation?.connectivityRequired ? 'שדה חובה' : false
                      }}
                      render={({ field: channelField }) => (
                        <ConnectivitySelector
                          validation={filteredMainTransmissionValidation}
                          loading={validationLoading}
                          selectedConnectivityId={connField.value || undefined}
                          selectedChannelNumber={channelField.value || undefined}
                          onConnectivityChange={connField.onChange}
                          onChannelChange={channelField.onChange}
                          label="קישוריות"
                          compact
                          connectivityError={errors.transmissionConnectivityId?.message}
                          channelError={errors.transmissionChannelNumber?.message}
                        />
                      )}
                    />
                  )}
                />
              </FieldWrapper>
            )}
          </FieldsRow>
        </Section>

        <Section style={{ marginTop: '16px' }}>
          <SectionTitle>הגדרות קליטה</SectionTitle>
          <FieldsRow>
            <FieldWrapper>
              <FieldLabel>
                <span className="required">*</span>
                לוויין
              </FieldLabel>
              <Controller
                name="receptionSatelliteId"
                control={control}
                rules={{ required: 'שדה חובה' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.receptionSatelliteId}>
                    <StyledSelect {...field} size="small" displayEmpty>
                      <MenuItem value="" disabled>
                        בחר לוויין
                      </MenuItem>
                      {satellites
                        .filter((sat) => !sat.isDeleted || sat.id === field.value)
                        .map((sat) => (
                          <MenuItem key={sat.id} value={sat.id} disabled={sat.isDeleted}>
                            {sat.name}{sat.isDeleted ? ' (נמחק)' : ''}
                          </MenuItem>
                        ))}
                    </StyledSelect>
                    {errors.receptionSatelliteId && (
                      <FormHelperText>{errors.receptionSatelliteId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </FieldWrapper>

            <FieldWrapper $flex={2}>
              <Controller
                name="receptionAntennaId"
                control={control}
                rules={{ required: 'שדה חובה' }}
                render={({ field }) => (
                  <AntennaSelector
                    label="אנטנה"
                    required
                    value={field.value || undefined}
                    onChange={(val) => {
                      field.onChange(val);
                      if (val && !watchedValues.transmissionAntennaId) {
                        setValue('transmissionAntennaId', val);
                      }
                    }}
                    antennas={filteredReceptionAntennas}
                    error={errors.receptionAntennaId?.message}
                  />
                )}
              />
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>
                <span className="required">*</span>
                תדר (MHz)
              </FieldLabel>
              <Controller
                name="receptionFrequency"
                control={control}
                rules={{
                  required: 'שדה חובה',
                  min: { value: 0.01, message: 'תדר חייב להיות חיובי' },
                }}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    type="number"
                    placeholder="הזן תדר"
                    size="small"
                    error={!!errors.receptionFrequency}
                    helperText={errors.receptionFrequency?.message}
                  />
                )}
              />
            </FieldWrapper>

            {receptionValidation && (
              <FieldWrapper $flex={2}>
                <Controller
                  name="receptionConnectivityId"
                  control={control}
                  rules={{
                    required: filteredMainReceptionValidation?.connectivityRequired ? 'שדה חובה' : false
                  }}
                  render={({ field: connField }) => (
                    <Controller
                      name="receptionChannelNumber"
                      control={control}
                      rules={{
                        required: filteredMainReceptionValidation?.connectivityRequired ? 'שדה חובה' : false
                      }}
                      render={({ field: channelField }) => (
                        <ConnectivitySelector
                          validation={filteredMainReceptionValidation}
                          loading={validationLoading}
                          selectedConnectivityId={connField.value || undefined}
                          selectedChannelNumber={channelField.value || undefined}
                          onConnectivityChange={connField.onChange}
                          onChannelChange={channelField.onChange}
                          label="קישוריות"
                          compact
                          connectivityError={errors.receptionConnectivityId?.message}
                          channelError={errors.receptionChannelNumber?.message}
                          channelDisabled={isTxRxChannelSynced}
                          channelSyncLabel="מסונכרן עם שידור"
                        />
                      )}
                    />
                  )}
                />
              </FieldWrapper>
            )}
          </FieldsRow>
        </Section>

        <Section style={{ marginTop: '16px' }}>
          <SectionTitle>פרטים נוספים</SectionTitle>
          <FieldsRow>
            <FieldWrapper $flex={0.05}>
              <FieldLabel>מספרי זנב</FieldLabel>
              <Controller
                name="tailNumbers"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={field.value || []}
                    onChange={(_, newValue) => {
                      const numericValues = newValue
                        .map(v => typeof v === 'string' ? Number(v.trim()) : v)
                        .filter(v => !isNaN(v) && v !== 0);
                      field.onChange(numericValues);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return <Chip key={key} variant="outlined" label={option} size="small" sx={{ '& .MuiChip-deleteIcon': { margin: '0 -4px 0 4px' } }} {...tagProps} />;
                      })
                    }
                    renderInput={(params) => (
                      <StyledTextField {...params} placeholder="מספרי זנב" size="small" />
                    )}
                  />
                )}
              />
            </FieldWrapper>
          </FieldsRow>
        </Section>

        <NotesSection style={{ marginTop: '16px' }}>
          <Controller
            name="addNotes"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      color: 'rgba(225, 234, 255, 0.5)',
                      '&.Mui-checked': { color: '#3b82f6' },
                    }}
                  />
                }
                label="הוסף הערות"
                sx={{ color: 'rgba(225, 234, 255, 0.7)', marginRight: 0 }}
              />
            )}
          />
          {watchedValues.addNotes && (
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  multiline
                  rows={3}
                  placeholder="הזן הערות..."
                  fullWidth
                />
              )}
            />
          )}
        </NotesSection>
      </form>

      {isMainAllocation && (
        <SubAllocationsContainer>
          <SubAllocationsHeader>
            <SubAllocationsTitle>
              תת-הקצאות
              {subAllocations.length > 0 && (
                <Chip
                  label={subAllocations.length}
                  size="small"
                  sx={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#3b82f6',
                    height: 20,
                    fontSize: '12px',
                  }}
                />
              )}
            </SubAllocationsTitle>
            <AddSubButton
              type="button"
              startIcon={<AddIcon />}
              onClick={handleAddSubAllocation}
            >
              הוסף תת-הקצאה
            </AddSubButton>
          </SubAllocationsHeader>

          {subAllocations.map((sub, index) => (
            <SubAllocationCardComponent
              key={sub.id}
              sub={sub}
              index={index}
              orderNumber={currentOrderNumber}
              terminals={terminals}
              satellites={satellites}
              antennas={antennas}
              operationOrderId={operationOrderId}
              onChange={handleSubAllocationChange}
              onRemove={handleRemoveSubAllocation}
              pendingSelections={pendingSelections}
              errors={subAllocationErrors[sub.id]}
            />
          ))}

          {subAllocations.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: 'rgba(225, 234, 255, 0.4)',
                padding: '20px',
                fontSize: '13px',
              }}
            >
              לחץ על "הוסף תת-הקצאה" כדי להוסיף תת-הקצאות
            </div>
          )}
        </SubAllocationsContainer>
      )}

      <ButtonsRow style={{ marginTop: '20px' }}>
        <CancelButton onClick={onCancel} disabled={saving}>
          ביטול
        </CancelButton>
        <SaveButton
          onClick={() => formRef.current?.requestSubmit()}
          disabled={saving}
        >
          {saving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'שמור'}
        </SaveButton>
      </ButtonsRow>

      <AntennaConflictWarning
        open={conflictWarning.open}
        conflicts={conflictWarning.conflicts}
        onConfirm={handleConflictConfirm}
        onCancel={handleConflictCancel}
      />

      <ChannelConflictError
        open={channelConflictError.open}
        conflicts={channelConflictError.conflicts}
        onClose={handleChannelConflictClose}
      />
    </FormContainer>
  );
};
