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
} from '../../shared/components/ui';
import { EditableNameField } from '../../shared/components/EditableNameField';

export const SatelliteForm = ({ onSave, onDelete, editingSatelliteId, initialData, onCancel }: SatelliteFormProps) => {
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
    <div>
      <FormHeaderTop>
        <FormTitleLarge>{editingSatelliteId ? 'עריכת לווין' : 'הוספת לווין חדש'}</FormTitleLarge>
        <FormSubtitle>מלא את הפרטים הנדרשים בטופס</FormSubtitle>
      </FormHeaderTop>
      <FormMainContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormSection style={{ padding: '8px 24px' }}>
            <EditableNameField
              name="name"
              control={control}
              icon={SatelliteAltIcon}
              placeholder="לווין 1"
            />
          </FormSection>

          <FormSection>
            <FormSectionHeader>
              <FormSectionTitle>פרטי הלווין</FormSectionTitle>
            </FormSectionHeader>
            <FormFieldRow>
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
              <FormSelect
                name="affiliation"
                control={control}
                label="שייכות"
                options={AFFILIATION_OPTIONS}
                placeholder="בחר שייכות"
                error={errors.affiliation}
                rules={{ required: 'שייכות הינה שדה חובה' }}
                required
              />
              <FormSelect
                name="hasFrequencyConverter"
                control={control}
                label="ממיר תדר"
                options={FREQUENCY_CONVERTER_OPTIONS}
                placeholder="בחר"
                error={errors.hasFrequencyConverter}
                rules={{ validate: (value: any) => value !== null && value !== '' ? true : 'ממיר תדר הינו שדה חובה' }}
                required
                transformValue={{
                  toField: (value) => (value === null ? '' : value.toString()),
                  toForm: (value) => value === 'true',
                }}
              />
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
            </FormFieldRow>
          </FormSection>

          <FormBottomActions>
            {editingSatelliteId != null ? (
              <FormDeleteButton
                onClick={onDelete}
                startIcon={<DeleteOutlineIcon />}
              >
                מחק אמצעי
              </FormDeleteButton>
            ) : (
              <div /> // Spacer to keep actions on the left
            )}
            <ActionButtonsGroup>
              {!editingSatelliteId && (
                <FormSecondaryButton
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  נקה שדות
                </FormSecondaryButton>
              )}
              {editingSatelliteId && onCancel && (
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
                disabled={!isValid || isSubmitting || !isDirty}
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
