import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import styled from 'styled-components';
import { StationFormProps, StationFormData, AntennaFormData } from './types';
import {
  ORGANIZATIONAL_AFFILIATION_OPTIONS,
  READINESS_STATUS_OPTIONS,
  COMMUNICATION_TYPE_OPTIONS,
  FREQUENCY_BAND_OPTIONS,
  INITIAL_FORM_DATA,
} from './constants';
import {
  FormContainer,
  FormTitle,
  FormGrid,
  FullWidthField,
  CombinedFieldWrapper,
  CombinedFieldSection,
  ButtonContainer,
  StyledButton,
  FormSelect,
  FormTextField,
} from '../../shared/components/ui';
import { EditableNameField } from '../../shared/components/EditableNameField';
import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import { stationsApi } from '../../services/api';
import { theme } from '../../theme';

const SectionTitle = styled.h3`
  color: ${theme.colors.text.white};
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 20px 0 12px 0;
  direction: rtl;
`;

const AddButton = styled(StyledButton)`
  && {
    margin-top: 5px;
    width: fit-content;
    align-self: flex-start;
  }
`;

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

const AntennaInputSection = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

const AntennaTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  min-height: 40px;
  direction: rtl;
`;

const AntennaTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(79, 93, 117, 0.8);
  border-radius: 24px;
  padding: 10px 18px;
  color: white;
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  direction: rtl;
`;

const RemoveTagButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const AntennaTagContent = styled.span`
  flex: 1;
  text-align: center;
`;

const AntennaIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const EmptyAntennaState = styled.div`
  text-align: center;
  padding: 16px;
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  direction: rtl;
`;

export const StationForm = ({ onSave, editingStationId, initialData }: StationFormProps) => {
  const [stations, setStations] = useState<Array<{ value: string; label: string }>>([]);
  const [showAntennaInput, setShowAntennaInput] = useState(false);
  const [antennaSize, setAntennaSize] = useState<number | ''>('');
  const [antennaFrequency, setAntennaFrequency] = useState('');
  const [editingAntennaId, setEditingAntennaId] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<StationFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onChange',
  });

  const { fields: connectivityFields, append: appendConnectivity, remove: removeConnectivity } = useFieldArray({
    control,
    name: 'connectivities',
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

  const readinessStatus = watch('readinessStatus');
  const antennas = watch('antennas');
  const connectivities = watch('connectivities');

  // Filter out current station from connectivity options (can't link to itself)
  const baseAvailableStations = useMemo(() => {
    if (!editingStationId) return stations;
    return stations.filter(s => s.value !== editingStationId.toString());
  }, [stations, editingStationId]);

  // Get available stations for a specific connectivity row (excluding already selected stations)
  const getAvailableStationsForRow = useCallback((rowIndex: number) => {
    const selectedStationIds = (connectivities || [])
      .map((c, idx) => idx !== rowIndex ? c.connectedStationId?.toString() : null)
      .filter(Boolean);
    
    return baseAvailableStations.filter(s => !selectedStationIds.includes(s.value));
  }, [baseAvailableStations, connectivities]);

  const handleAddConnectivity = useCallback(() => {
    appendConnectivity({
      id: `temp-${Date.now()}`,
      connectedStationId: '',
      communicationType: '',
      channelCount: 1,
    });
  }, [appendConnectivity]);

  const handleAddAntenna = useCallback(() => {
    if (antennaSize && antennaFrequency) {
      if (editingAntennaId) {
        // Update existing antenna
        const newAntennas = (antennas || []).map((ant) =>
          ant.id === editingAntennaId
            ? { ...ant, size: antennaSize, frequencyBand: antennaFrequency }
            : ant
        );
        setValue('antennas', newAntennas, { shouldDirty: true, shouldValidate: true });
        setEditingAntennaId(null);
      } else {
        // Add new antenna
        const newAntennas = [...(antennas || []), {
          id: `antenna-${Date.now()}`,
          size: antennaSize,
          frequencyBand: antennaFrequency,
        }];
        setValue('antennas', newAntennas, { shouldDirty: true, shouldValidate: true });
      }
      setAntennaSize('');
      setAntennaFrequency('');
    }
  }, [antennaSize, antennaFrequency, antennas, setValue, editingAntennaId]);

  const handleEditAntenna = useCallback((antenna: AntennaFormData) => {
    setAntennaSize(antenna.size);
    setAntennaFrequency(antenna.frequencyBand);
    setEditingAntennaId(antenna.id);
    setShowAntennaInput(true);
  }, []);

  const handleRemoveAntenna = useCallback((id: string) => {
    const newAntennas = (antennas || []).filter((ant) => ant.id !== id);
    setValue('antennas', newAntennas, { shouldDirty: true, shouldValidate: true });
  }, [antennas, setValue]);

  const onSubmit = useCallback(
    async (data: StationFormData) => {
      try {
        if (onSave) {
          await onSave(data);
        }
        reset(INITIAL_FORM_DATA);
        setAntennaSize('');
        setAntennaFrequency('');
        setShowAntennaInput(false);
      } catch (error) {
        console.error('Error saving station:', error);
      }
    },
    [onSave, reset],
  );

  const handleReset = useCallback(() => {
    reset(INITIAL_FORM_DATA);
    setAntennaSize('');
    setAntennaFrequency('');
    setShowAntennaInput(false);
    setEditingAntennaId(null);
  }, [reset]);

  return (
    <FormContainer>
      <FormTitle>{editingStationId ? 'עריכת תחנה' : 'הוספת תחנה חדשה'}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNameField
          name="name"
          control={control}
          icon={StationIcon}
          placeholder="תחנה 1"
        />

        <FormGrid>
          <CombinedFieldWrapper>
            <CombinedFieldSection hasBorder flexBasis="50%">
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
            </CombinedFieldSection>

            <CombinedFieldSection flexBasis="50%">
              <FormSelect
                name="readinessStatus"
                control={control}
                label="סטטוס כשירות"
                options={READINESS_STATUS_OPTIONS}
                placeholder="בחר סטטוס כשירות"
                error={errors.readinessStatus}
                rules={{ required: 'סטטוס כשירות הינו שדה חובה' }}
                required
              />
            </CombinedFieldSection>
          </CombinedFieldWrapper>

          <FullWidthField>
            <FormTextField
              name="notes"
              control={control}
              label="הערות"
              placeholder="פרט על הסטטוס כאן..."
              error={errors.notes}
              rules={{
                validate: (value: string) => {
                  if (readinessStatus && readinessStatus !== 'ready' && !value.trim()) {
                    return 'הערות הינן שדה חובה כאשר סטטוס הכשירות אינו "כשיר"';
                  }
                  return true;
                },
              }}
              required={readinessStatus !== 'ready' && readinessStatus !== ''}
            />
          </FullWidthField>
        </FormGrid>

        <SectionTitle>קישוריות</SectionTitle>
        {connectivityFields.map((field, index) => (
          <DynamicRow key={field.id}>
            <div style={{ flex: '1', display: 'flex', gap: theme.spacing.md }}>
              <div style={{ flex: '1' }}>
                <FormSelect
                  name={`connectivities.${index}.connectedStationId`}
                  control={control}
                  label="תחנה מקושרת"
                  options={getAvailableStationsForRow(index)}
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
                  options={COMMUNICATION_TYPE_OPTIONS}
                  placeholder="בחר סוג"
                  error={errors.connectivities?.[index]?.communicationType}
                  rules={{ required: 'סוג תקשורת הינו שדה חובה' }}
                  required
                />
              </div>
              <div style={{ flex: '0 0 120px' }}>
                <FormTextField
                  name={`connectivities.${index}.channelCount`}
                  control={control}
                  label="מספר ערוצים"
                  placeholder="1"
                  type="number" 
                  error={errors.connectivities?.[index]?.channelCount}
                  rules={{ 
                    required: 'מספר ערוצים הינו שדה חובה',
                    min: { value: 1, message: 'מספר ערוצים חייב להיות חיובי' },
                  }}
                  required
                />
              </div>
            </div>
            <DeleteButton type="button" onClick={() => removeConnectivity(index)}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </DeleteButton>
          </DynamicRow>
        ))}
        <AddButton
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddConnectivity}
          type="button"
        >
          הוסף קישוריות
        </AddButton>

        <SectionTitle>אנטנות</SectionTitle>
        
        {antennas && antennas.length > 0 && (
          <AntennaTagsContainer>
            {antennas.map((antenna) => (
              <AntennaTag 
                key={antenna.id} 
                onClick={() => handleEditAntenna(antenna)}
                style={{ cursor: 'pointer' }}
              >
                <RemoveTagButton 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAntenna(antenna.id);
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </RemoveTagButton>
                <AntennaTagContent>
                  {antenna.size} {antenna.frequencyBand}
                </AntennaTagContent>
                <AntennaIcon>
                  <SettingsInputAntennaIcon sx={{ fontSize: 20 }} />
                </AntennaIcon>
              </AntennaTag>
            ))}
          </AntennaTagsContainer>
        )}
        
        <AntennaInputSection>
          {(!antennas || antennas.length === 0) && !showAntennaInput && (
            <EmptyAntennaState>לא הוספו אנטנות</EmptyAntennaState>
          )}
          
          {showAntennaInput && (
            <DynamicRow>
              <div style={{ flex: '1' }}>
                <input
                  type="number"
                  placeholder="גודל אנטנה (2.5)"
                  value={antennaSize}
                  onChange={(e) => setAntennaSize(e.target.value ? Number(e.target.value) : '')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: theme.colors.background.dark,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: theme.borderRadius.sm,
                    color: theme.colors.text.white,
                    fontSize: '13px',
                    direction: 'rtl',
                  }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <select
                  value={antennaFrequency}
                  onChange={(e) => setAntennaFrequency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: theme.colors.background.dark,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: theme.borderRadius.sm,
                    color: theme.colors.text.white,
                    fontSize: '13px',
                    direction: 'rtl',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">בחר תחום תדר</option>
                  {FREQUENCY_BAND_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <AddButton
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handleAddAntenna}
                type="button"
                disabled={!antennaSize || !antennaFrequency}
                sx={{ gap: '8px', minWidth: 'auto', padding: '8px 16px' }}
              >
                {editingAntennaId ? 'עדכן' : 'הוסף'}
              </AddButton>
            </DynamicRow>
          )}
          
          <AddButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowAntennaInput(true)}
            type="button"
          >
            הוסף אנטנה
          </AddButton>
        </AntennaInputSection>

        <ButtonContainer>
          {!editingStationId && (
            <StyledButton
              variant="outlined"
              onClick={handleReset}
              disabled={isSubmitting}
              startIcon={<DeleteOutlineIcon />}
            >
              נקה שדות
            </StyledButton>
          )}
          <StyledButton
            variant="contained"
            type="submit"
            disabled={!isValid || isSubmitting || !isDirty}
          >
            {isSubmitting ? 'שומר...' : 'שמירה'}
          </StyledButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};
