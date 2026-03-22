import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { SatelliteFormProps, SatelliteFormData } from './types';
import {
  AFFILIATION_OPTIONS,
  FREQUENCY_CONVERTER_OPTIONS,
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

export const SatelliteForm = ({ onSave, editingSatelliteId, initialData }: SatelliteFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SatelliteFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onChange',
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset(INITIAL_FORM_DATA);
    }
  }, [initialData, reset]);

  const readinessStatus = watch('readinessStatus');

  const onSubmit = useCallback(
    async (data: SatelliteFormData) => {
      try {
        if (onSave) {
          await onSave(data);
        }
        reset(INITIAL_FORM_DATA);
      } catch (error) {
        console.error('Error saving satellite:', error);
      }
    },
    [onSave, reset],
  );

  const handleReset = useCallback(() => {
    reset(INITIAL_FORM_DATA);
  }, [reset]);

  return (
    <FormContainer>
      <FormTitle>{editingSatelliteId ? 'עריכת לווין' : 'הוספת לווין חדש'}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNameField
          name="name"
          control={control}
          icon={SatelliteAltIcon}
          placeholder="לווין 1"
        />

        <FormGrid>
          <CombinedFieldWrapper>
            <CombinedFieldSection hasBorder flexBasis="20%">
              <FormSelect
                name="affiliation"
                control={control}
                label="שייכות"
                options={AFFILIATION_OPTIONS}
                placeholder="בחר שייכות"
                error={errors.affiliation}
                rules={{ required: 'שייכות הינה שדה חובה' }}
              />
            </CombinedFieldSection>

            <CombinedFieldSection flexBasis="80%">
              <FormSelect
                name="hasFrequencyConverter"
                control={control}
                label="ממיר תדר"
                options={FREQUENCY_CONVERTER_OPTIONS}
                placeholder="בחר"
                error={errors.hasFrequencyConverter}
                rules={{ required: 'ממיר תדר הינו שדה חובה' }}
                transformValue={{
                  toField: (value) => (value === null ? '' : value.toString()),
                  toForm: (value) => value === 'true',
                }}
              />
            </CombinedFieldSection>
          </CombinedFieldWrapper>

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
                />
              </CombinedFieldSection>
            </CombinedFieldWrapper>
          </FullWidthField>
        </FormGrid>

        <ButtonContainer>
          <StyledButton
            variant="outlined"
            onClick={handleReset}
            disabled={isSubmitting}
            startIcon={<DeleteOutlineIcon />}
          >
            נקה שדות
          </StyledButton>
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
