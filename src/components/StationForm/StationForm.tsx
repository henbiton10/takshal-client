import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import deleteIcon from '../../assets/delete.svg';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import styled from 'styled-components';
import { StationFormProps, StationFormData } from './types';
import {
  ORGANIZATIONAL_AFFILIATION_OPTIONS,
  READINESS_STATUS_OPTIONS,
  COMMUNICATION_TYPE_OPTIONS,
  FREQUENCY_BAND_OPTIONS,
  INITIAL_FORM_DATA,
} from './constants';
import SaveIcon from '@mui/icons-material/Save';
import {
  FormMainContainer,
  FormSection,
  FormSectionHeader,
  FormSectionTitle,
  FormFieldRow,
  FormHeaderTop,
  FormSubtitle,
  FormTitleLarge,
  FormBottomActions,
  ActionButtonsGroup,
  FormSelect,
  FormTextField,
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
  FormAddButton,
} from '../../shared/components/ui';
import { EditableNameField } from '../../shared/components/EditableNameField';
import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { stationsApi } from '../../services/api';
import { theme } from '../../theme';


const DynamicRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  direction: rtl;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.error.main};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(244, 67, 54, 0.1);
  }
`;


export const StationForm = ({ onSave, onDelete, editingStationId, initialData, onCancel }: StationFormProps) => {
  const [stations, setStations] = useState<Array<{ value: string; label: string }>>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<StationFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onTouched',
  });

  const { fields: connectivityFields, append: appendConnectivity, remove: removeConnectivity } = useFieldArray({
    control,
    name: 'connectivities',
  });

  const { fields: antennaFields, append: appendAntenna, remove: removeAntenna } = useFieldArray({
    control,
    name: 'antennas',
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationsApi.getAllSummary();
        setStations(data.map(s => ({ value: s.id.toString(), label: s.name })));
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset(INITIAL_FORM_DATA);
    }
  }, [initialData, reset]);

  const connectivities = watch('connectivities');
  const terminals = watch('terminals');
  const readinessStatus = watch('readinessStatus');

  // Filter out current station from connectivity options (can't link to itself)
  const availableStations = useMemo(() => {
    if (!editingStationId) return stations;
    return stations.filter(s => s.value !== editingStationId.toString());
  }, [stations, editingStationId]);

  // Get available communication types for a specific connectivity row
  const getAvailableCommunicationTypesForRow = useCallback((rowIndex: number) => {
    const currentConnectivity = connectivities?.[rowIndex];
    if (!currentConnectivity?.connectedStationId) {
      return COMMUNICATION_TYPE_OPTIONS;
    }

    const usedTypesForStation = (connectivities || [])
      .filter((c, idx) =>
        idx !== rowIndex &&
        c.connectedStationId?.toString() === currentConnectivity.connectedStationId?.toString()
      )
      .map(c => c.communicationType)
      .filter(Boolean);

    return COMMUNICATION_TYPE_OPTIONS.filter(opt => !usedTypesForStation.includes(opt.value));
  }, [connectivities]);

  const handleAddConnectivity = useCallback(() => {
    appendConnectivity({
      id: `temp-${Date.now()}`,
      connectedStationId: '',
      communicationType: '',
      channelCount: 1,
    });
  }, [appendConnectivity]);

  const handleAddAntenna = useCallback(() => {
    appendAntenna({
      id: `antenna-${Date.now()}`,
      size: 0,
      frequencyBand: '',
    });
  }, [appendAntenna]);

  const onSubmit = useCallback(
    async (data: StationFormData) => {
      try {
        if (onSave) {
          await onSave(data);
        }
        reset(INITIAL_FORM_DATA);
      } catch (error) {
        console.error('Error saving station:', error);
      }
    },
    [onSave, reset],
  );

  const handleReset = useCallback(() => {
    reset(INITIAL_FORM_DATA);
  }, [reset]);

  return (
    <div>
      <FormHeaderTop>
        <FormTitleLarge>{editingStationId ? 'עריכת תחנה' : 'הוספת תחנה חדשה'}</FormTitleLarge>
        <FormSubtitle>מלא את הפרטים הנדרשים בטופס</FormSubtitle>
      </FormHeaderTop>
      <FormMainContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormSection style={{ padding: '8px 24px' }}>
            <EditableNameField
              name="name"
              control={control}
              icon={StationIcon}
              placeholder="תחנה 1"
            />
          </FormSection>

          <FormSection>
            <FormSectionHeader>
              <InfoIcon sx={{ fontSize: 20, color: (theme) => theme.palette.text.secondary }} />
              <FormSectionTitle>פרטי התחנה</FormSectionTitle>
            </FormSectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <FormFieldRow>
                <FormSelect
                  name="organizationalAffiliation"
                  control={control}
                  label="שייכות ארגונית"
                  options={ORGANIZATIONAL_AFFILIATION_OPTIONS}
                  placeholder="בחר שייכות"
                  error={errors.organizationalAffiliation}
                  rules={{ required: 'שייכות ארגונית הינה שדה חובה' }}
                  required
                />
                <FormSelect
                  name="readinessStatus"
                  control={control}
                  label="סטטוס כשירות"
                  options={READINESS_STATUS_OPTIONS}
                  placeholder="בחר סטטוס כשירות"
                  error={errors.readinessStatus}
                  rules={{ required: 'סטטוס כשירות הינה שדה חובה' }}
                  required
                />
              </FormFieldRow>
              <FormTextField
                name="notes"
                control={control}
                label="הערות כלליות"
                placeholder="פרט על הסטטוס כאן..."
                error={errors.notes}
                rules={{
                  validate: (value: any) => {
                    const strValue = value?.toString() || '';
                    if (readinessStatus && readinessStatus !== 'ready' && !strValue.trim()) {
                      return 'הערות הינן שדה חובה כאשר סטטוס הכשירות אינו "כשיר"';
                    }
                    return true;
                  },
                }}
                required={readinessStatus !== 'ready' && readinessStatus !== ''}
              />
            </div>
          </FormSection>

          <FormSection>
            <FormSectionHeader>
              <LinkIcon sx={{ fontSize: 20, color: (theme) => theme.palette.text.secondary }} />
              <FormSectionTitle>קישוריות</FormSectionTitle>
            </FormSectionHeader>
            {connectivityFields.map((field, index) => (
              <DynamicRow key={field.id} style={{ alignItems: 'flex-end', gap: '12px' }}>
                <div style={{
                  color: '#e1eaff',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  paddingBottom: '6px'
                }}>
                  {index + 1}.
                </div>
                <div style={{ flex: '1', display: 'flex', gap: theme.spacing.md }}>
                  <div style={{ flex: '1' }}>
                    <FormSelect
                      name={`connectivities.${index}.connectedStationId`}
                      control={control}
                      label="תחנה מקושרת"
                      options={availableStations}
                      placeholder="בחר תחנה"
                      error={errors.connectivities?.[index]?.connectedStationId}
                      rules={{ required: 'תחנה מקושרת הינה שדה חובה' }}
                      required
                      transformValue={{
                        toField: (value) => (value === '' || value === null ? '' : value.toString()),
                        toForm: (value) => value === '' ? '' : Number(value),
                      }}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <FormSelect
                      name={`connectivities.${index}.communicationType`}
                      control={control}
                      label="סוג תקשורת"
                      options={getAvailableCommunicationTypesForRow(index)}
                      placeholder="בחר סוג"
                      error={errors.connectivities?.[index]?.communicationType}
                      rules={{ required: 'סוג תקשורת הינה שדה חובה' }}
                      required
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <FormTextField
                      name={`connectivities.${index}.channelCount`}
                      control={control}
                      label="מספר ערוצים"
                      placeholder="1"
                      type="number"
                      error={errors.connectivities?.[index]?.channelCount}
                      rules={{
                        required: 'מספר ערוצים הינה שדה חובה',
                        min: { value: 1, message: 'מספר ערוצים חייב להיות חיובי' },
                      }}
                      required
                    />
                  </div>
                </div>
                <DeleteButton type="button" onClick={() => removeConnectivity(index)} style={{ paddingBottom: '8px' }}>
                  <CloseIcon sx={{ fontSize: 20 }} />
                </DeleteButton>
              </DynamicRow>
            ))}
            <FormAddButton
              startIcon={<AddIcon />}
              onClick={handleAddConnectivity}
              type="button"
            >
              הוסף קישוריות
            </FormAddButton>
          </FormSection>

          {terminals && terminals.length > 0 && (
            <FormSection>
              <FormSectionHeader>
                <FormSectionTitle>טרמינלים</FormSectionTitle>
                <TerminalIcon sx={{ fontSize: 20, color: '#e1eaff', opacity: 0.8 }} />
              </FormSectionHeader>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', direction: 'rtl' }}>
                {terminals.map((terminal) => (
                  <div
                    key={terminal.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      height: '42px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span style={{ color: '#FAFAFA', fontSize: '18px', fontWeight: 600 }}>{terminal.name}</span>
                    <TerminalIcon sx={{ fontSize: 20, color: '#e1eaff', opacity: 0.8 }} />
                  </div>
                ))}
              </div>
            </FormSection>
          )}

          <FormSection>
            <FormSectionHeader>
              <SatelliteAltIcon sx={{ fontSize: 20, color: (theme) => theme.palette.text.secondary }} />
              <FormSectionTitle>אנטנות</FormSectionTitle>
            </FormSectionHeader>

            {antennaFields.map((field, index) => (
              <DynamicRow key={field.id} style={{ alignItems: 'flex-end', gap: '12px' }}>
                <div style={{
                  color: '#e1eaff',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  paddingBottom: '6px'
                }}>
                  {index + 1}.
                </div>
                <div style={{ flex: '1', display: 'flex', gap: theme.spacing.md }}>
                  <div style={{ flex: '1' }}>
                    <FormTextField
                      name={`antennas.${index}.size`}
                      control={control}
                      label="גודל (מטרים)"
                      placeholder="2.5"
                      type="number"
                      error={errors.antennas?.[index]?.size}
                      rules={{
                        required: 'גודל הינו שדה חובה',
                        min: { value: 0.1, message: 'גודל חייב להיות חיובי' }
                      }}
                      required
                      transformValue={{
                        toField: (value) => (value === 0 ? '' : value.toString()),
                        toForm: (value) => value === '' ? 0 : Number(value),
                      }}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <FormSelect
                      name={`antennas.${index}.frequencyBand`}
                      control={control}
                      label="תחום תדר"
                      options={FREQUENCY_BAND_OPTIONS}
                      placeholder="בחר תחום תדר"
                      error={errors.antennas?.[index]?.frequencyBand}
                      rules={{ required: 'תחום תדר הינו שדה חובה' }}
                      required
                    />
                  </div>
                </div>
                <DeleteButton type="button" onClick={() => removeAntenna(index)} style={{ paddingBottom: '8px' }}>
                  <CloseIcon sx={{ fontSize: 20 }} />
                </DeleteButton>
              </DynamicRow>
            ))}

            <FormAddButton
              startIcon={<AddIcon />}
              onClick={handleAddAntenna}
              type="button"
            >
              הוסף אנטנה
            </FormAddButton>
          </FormSection>

          <FormBottomActions>
            {editingStationId != null ? (
              <FormDeleteButton
                onClick={onDelete}
                startIcon={<img src={deleteIcon} alt="" style={{ width: '18px', height: '18px' }} />}
              >
                מחק אמצעי
              </FormDeleteButton>
            ) : (
              <div /> // Spacer to keep actions on the left
            )}
            <ActionButtonsGroup>
              {!editingStationId && (
                <FormSecondaryButton
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  נקה שדות
                </FormSecondaryButton>
              )}
              {editingStationId && onCancel && (
                <FormSecondaryButton
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  ביטול
                </FormSecondaryButton>
              )}
              <FormPrimaryButton
                variant="contained"
                type="submit"
                disabled={isSubmitting || (!!editingStationId && !isDirty)}
                startIcon={<SaveIcon />}
              >
                {isSubmitting ? 'שומר...' : 'שמור שינויים'}
              </FormPrimaryButton>
            </ActionButtonsGroup>
          </FormBottomActions>
        </form>
      </FormMainContainer>
    </div>
  );
};
