import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PublicIcon from '@mui/icons-material/Public';
import { NetworkFormProps, NetworkFormData } from './types';
import { READINESS_STATUS_OPTIONS, INITIAL_FORM_DATA } from './constants';
import {
  FormContainer,
  FormHeader,
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
import { terminalTypesApi, connectivityTypesApi } from '../../services/api';
import { mapConnectivityTypeToLabel } from './utils';

export const NetworkForm = ({ onSave, editingNetworkId, initialData, onClose, onCancel }: NetworkFormProps) => {
  const [terminalTypes, setTerminalTypes] = useState<Array<{ value: string; label: string }>>([]);
  const [connectivityTypes, setConnectivityTypes] = useState<Array<{ value: string; label: string }>>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<NetworkFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [terminalTypesData, connectivityTypesData] = await Promise.all([
          terminalTypesApi.getAllSummary(),
          connectivityTypesApi.getAllSummary(),
        ]);
        
        setTerminalTypes(terminalTypesData.map(t => ({ value: t.id.toString(), label: t.name })));
        setConnectivityTypes(connectivityTypesData.map(c => ({ 
          value: c.id.toString(), 
          label: mapConnectivityTypeToLabel(c.name) 
        })));
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
    <FormContainer>
      <FormHeader 
        title={editingNetworkId ? 'עריכת רשת' : 'הוספת רשת חדשה'}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNameField
          name="name"
          control={control}
          icon={PublicIcon}
          placeholder="רשת 1"
        />

        <FormGrid>
          <CombinedFieldWrapper>
            <CombinedFieldSection hasBorder flexBasis="50%">
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
                  toField: (value) => (value === '' || value === null ? '' : value.toString()),
                  toForm: (value) => value === '' ? '' : Number(value),
                }}
              />
            </CombinedFieldSection>

            <CombinedFieldSection flexBasis="50%">
              <FormSelect
                name="connectivityTypeId"
                control={control}
                label="סוג קישוריות"
                options={connectivityTypes}
                placeholder="בחר סוג קישוריות"
                error={errors.connectivityTypeId}
                rules={{ required: 'סוג קישוריות הינו שדה חובה' }}
                required
                transformValue={{
                  toField: (value) => (value === '' || value === null ? '' : value.toString()),
                  toForm: (value) => value === '' ? '' : Number(value),
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
          {!editingNetworkId && (
            <StyledButton
              variant="outlined"
              onClick={handleReset}
              disabled={isSubmitting}
              startIcon={<DeleteOutlineIcon />}
            >
              נקה שדות
            </StyledButton>
          )}
          {editingNetworkId && onCancel && (
            <StyledButton
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              ביטול
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
