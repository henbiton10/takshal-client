import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import deleteIcon from '../../assets/delete.svg';
import PublicIcon from '@mui/icons-material/Public';
import LanIcon from '@mui/icons-material/Lan';
import { NetworkFormProps, NetworkFormData } from './types';
import { READINESS_STATUS_OPTIONS, INITIAL_FORM_DATA } from './constants';
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
import { terminalTypesApi } from '../../services/api';

export const NetworkForm = ({ onSave, onDelete, editingNetworkId, initialData, onCancel }: NetworkFormProps) => {
  const [terminalTypes, setTerminalTypes] = useState<Array<{ value: string; label: string }>>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<NetworkFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onTouched',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const terminalTypesData = await terminalTypesApi.getAllSummary();
        setTerminalTypes(terminalTypesData.map(t => ({ value: t.id.toString(), label: t.name })));
      } catch (error) {
        console.error('Failed to fetch dropdown data:', error);
      }
    };
    fetchData();
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
    async (data: NetworkFormData) => {
      try {
        if (onSave) {
          await onSave(data);
        }
        reset(INITIAL_FORM_DATA);
      } catch (error) {
        console.error('Error saving network:', error);
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
        <FormTitleLarge>{editingNetworkId ? 'עריכת רשת' : 'הוספת רשת חדשה'}</FormTitleLarge>
        <FormSubtitle>מלא את הפרטים הנדרשים בטופס</FormSubtitle>
      </FormHeaderTop>
      <FormMainContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormSection style={{ padding: '8px 24px' }}>
            <EditableNameField
              name="name"
              control={control}
              icon={PublicIcon}
              placeholder="רשת 1"
            />
          </FormSection>

          <FormSection>
            <FormSectionHeader>
              <LanIcon sx={{ fontSize: 20, color: (theme) => theme.palette.text.secondary }} />
              <FormSectionTitle>פרטי רשת</FormSectionTitle>
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
                name="terminalTypeId"
                control={control}
                label="סוג טרמינל"
                options={terminalTypes}
                placeholder="בחר סוג טרמינל"
                error={errors.terminalTypeId}
                rules={{ required: 'סוג טרמינל הינו שדה חובה' }}
                required
                transformValue={{
                  toField: (value) => (value === '' || value === null || (typeof value === 'number' && isNaN(value)) ? '' : value.toString()),
                  toForm: (value) => {
                    if (value === '') return '';
                    const num = Number(value);
                    return isNaN(num) ? value : num;
                  },
                }}
              />
              <FormTextField
                name="notes"
                control={control}
                label="הערות"
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
            </FormFieldRow>
          </FormSection>

          <FormBottomActions>
            {editingNetworkId ? (
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
              {!editingNetworkId && (
                <FormSecondaryButton
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  נקה שדות
                </FormSecondaryButton>
              )}
              {editingNetworkId && onCancel && (
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
                disabled={isSubmitting || (!!editingNetworkId && !isDirty)}
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
