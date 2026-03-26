import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TerminalFormProps, TerminalFormData } from './types';
import {
  FREQUENCY_BAND_OPTIONS,
  READINESS_STATUS_OPTIONS,
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
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { stationsApi } from '../../services/api';

export const TerminalForm = ({ onSave, editingTerminalId, initialData }: TerminalFormProps) => {
  const [stations, setStations] = useState<Array<{ value: string; label: string }>>([]);
  
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<TerminalFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onChange',
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

  const onSubmit = useCallback(
    async (data: TerminalFormData) => {
      try {
        if (onSave) {
          await onSave(data);
        }
        reset(INITIAL_FORM_DATA);
      } catch (error) {
        console.error('Error saving terminal:', error);
      }
    },
    [onSave, reset],
  );

  const handleReset = useCallback(() => {
    reset(INITIAL_FORM_DATA);
  }, [reset]);

  return (
    <FormContainer>
      <FormTitle>{editingTerminalId ? 'עריכת טרמינל' : 'הוספת טרמינל חדש'}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNameField
          name="name"
          control={control}
          icon={TerminalIcon}
          placeholder="טרמינל 1"
        />

        <FormGrid>
          <CombinedFieldWrapper>
            <CombinedFieldSection hasBorder flexBasis="50%">
              <FormSelect
                name="stationId"
                control={control}
                label="תחנה קרקעית"
                options={stations}
                placeholder="בחר תחנה"
                error={errors.stationId}
                rules={{ required: 'תחנה קרקעית הינה שדה חובה' }}
                required
                transformValue={{
                  toField: (value) => (value === '' || value === null ? '' : value.toString()),
                  toForm: (value) => value === '' ? '' : Number(value),
                }}
              />
            </CombinedFieldSection>

            <CombinedFieldSection flexBasis="50%">
              <FormTextField
                name="terminalType"
                control={control}
                label="סוג טרמינל"
                placeholder="הזן סוג טרמינל"
                error={errors.terminalType}
                rules={{ required: 'סוג טרמינל הינו שדה חובה' }}
                required
              />
            </CombinedFieldSection>
          </CombinedFieldWrapper>

          <FullWidthField>
            <FormSelect
              name="frequencyBand"
              control={control}
              label="תחום תדר"
              options={FREQUENCY_BAND_OPTIONS}
              placeholder="בחר תחום תדר"
              error={errors.frequencyBand}
              rules={{ required: 'תחום תדר הינו שדה חובה' }}
              required
            />
          </FullWidthField>

          <FullWidthField>
            <CombinedFieldWrapper>
              <CombinedFieldSection hasBorder flexBasis="20%">
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

              <CombinedFieldSection flexBasis="80%">
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
              </CombinedFieldSection>
            </CombinedFieldWrapper>
          </FullWidthField>
        </FormGrid>

        <ButtonContainer>
          {!editingTerminalId && (
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
