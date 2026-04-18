import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import deleteIcon from '../../assets/delete.svg';
import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import styled from 'styled-components';
import { TerminalFormProps, TerminalFormData } from './types';
import {
  FREQUENCY_BAND_OPTIONS,
  READINESS_STATUS_OPTIONS,
  INITIAL_FORM_DATA,
} from './constants';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
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
  FieldLabel,
} from '../../shared/components/ui';
import { EditableNameField } from '../../shared/components/EditableNameField';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { stationsApi, terminalTypesApi } from '../../services/api';

interface TerminalTypeOption {
  id: number | null;
  name: string;
  inputValue?: string;
}

const filter = createFilterOptions<TerminalTypeOption>();

const StyledAutocomplete = styled(Autocomplete<TerminalTypeOption, false, false, true>)`
  /* Globally handled in GlobalStyles.tsx */
`;

const FieldError = styled.span`
  color: #ef4444;
  font-size: 11px;
  margin-top: 4px;
  display: block;
  text-align: right;
`;

const AddNewOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-weight: 500;
`;

export const TerminalForm = ({ onSave, onDelete, editingTerminalId, initialData, onCancel }: TerminalFormProps) => {
  const [stations, setStations] = useState<Array<{ value: string; label: string }>>([]);
  const [terminalTypes, setTerminalTypes] = useState<TerminalTypeOption[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TerminalFormData>({
    defaultValues: initialData || INITIAL_FORM_DATA,
    mode: 'onTouched',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stationsData, typesData] = await Promise.all([
          stationsApi.getAllSummary(),
          terminalTypesApi.getAllSummary(),
        ]);
        setStations(stationsData.map(s => ({ value: s.id.toString(), label: s.name })));
        setTerminalTypes(typesData.map(t => ({ id: t.id, name: t.name })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
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
    <div>
      <FormHeaderTop>
        <FormTitleLarge>{editingTerminalId ? 'עריכת טרמינל' : 'הוספת טרמינל חדש'}</FormTitleLarge>
        <FormSubtitle>מלא את הפרטים הנדרשים בטופס</FormSubtitle>
      </FormHeaderTop>
      <FormMainContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormSection style={{ padding: '8px 24px' }}>
            <EditableNameField
              name="name"
              control={control}
              icon={TerminalIcon}
              placeholder="טרמינל 1"
            />
          </FormSection>

          <FormSection>
            <FormSectionHeader>
              <InfoIcon sx={{ fontSize: 20, color: (theme) => theme.palette.text.secondary }} />
              <FormSectionTitle>פרטי טרמינל</FormSectionTitle>
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

              <div style={{ flex: 1, minWidth: 200 }}>
                <FieldLabel $required>סוג טרמינל</FieldLabel>
                <Controller
                  name="terminalType"
                  control={control}
                  rules={{ required: 'סוג טרמינל הינו שדה חובה' }}
                  render={({ field }) => (
                    <StyledAutocomplete
                      freeSolo
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={terminalTypes}
                      value={terminalTypes.find(t => t.name === field.value) || (field.value ? { id: null, name: field.value } : null)}
                      onChange={async (_event, newValue) => {
                        if (typeof newValue === 'string') {
                          field.onChange(newValue);
                        } else if (newValue && newValue.inputValue) {
                          try {
                            const created = await terminalTypesApi.create(newValue.inputValue);
                            setTerminalTypes(prev => [...prev, { id: created.id, name: created.name }]);
                            field.onChange(created.name);
                          } catch (error) {
                            console.error('Failed to create terminal type:', error);
                          }
                        } else if (newValue) {
                          field.onChange(newValue.name);
                        } else {
                          field.onChange('');
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        const isExisting = options.some((option) => inputValue === option.name);
                        if (inputValue !== '' && !isExisting) {
                          filtered.push({
                            id: null,
                            name: inputValue,
                            inputValue,
                          });
                        }
                        return filtered;
                      }}
                      getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        return option.name;
                      }}
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props;
                        if (option.inputValue) {
                          return (
                            <li key={key} {...otherProps}>
                              <AddNewOption>
                                <AddIcon sx={{ fontSize: 18 }} />
                                הוסף "{option.inputValue}"
                              </AddNewOption>
                            </li>
                          );
                        }
                        return <li key={key} {...otherProps}>{option.name}</li>;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="בחר או הזן סוג טרמינל"
                          error={!!errors.terminalType}
                          sx={{
                            '& .MuiInputBase-root': {
                              direction: 'rtl',
                            },
                          }}
                        />
                      )}
                      slotProps={{
                        paper: {
                          sx: {
                            background: 'rgba(20, 40, 80, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(174, 199, 255, 0.15)',
                            borderRadius: '8px',
                            '& .MuiAutocomplete-listbox': {
                              padding: '4px',
                              '& .MuiAutocomplete-option': {
                                color: 'white',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                direction: 'rtl',
                                '&:hover': {
                                  background: 'rgba(174, 199, 255, 0.1)',
                                },
                                '&.Mui-focused': {
                                  background: 'rgba(174, 199, 255, 0.15)',
                                },
                              },
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
                {errors.terminalType && (
                  <FieldError>{errors.terminalType.message}</FieldError>
                )}
              </div>
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
            {editingTerminalId != null ? (
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
              {!editingTerminalId && (
                <FormSecondaryButton
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  נקה שדות
                </FormSecondaryButton>
              )}
              {editingTerminalId && onCancel && (
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
                disabled={isSubmitting || (!!editingTerminalId && !isDirty)}
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
