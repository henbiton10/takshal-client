import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { CircularProgress, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LayersIcon from '@mui/icons-material/Layers';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  CreateOperationOrderDto,
  Terminal,
  SatelliteSummary,
  AntennaWithStation,
  CreateAllocationDto
} from '../../services/api/types';
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
  FormPrimaryButton,
  FormSecondaryButton,
  FormTextField,
  FormAddButton,
  FieldsNotice,
} from '../../shared/components/ui';
import { EditableNameField } from '../../shared/components/EditableNameField';

interface OperationOrderFormValues extends CreateOperationOrderDto {
  id?: number;
  allocations: Array<CreateAllocationDto & { 
    id?: number; 
    subAllocations: Array<CreateAllocationDto & { id?: number }>;
  }>;
}

import { 
  ViewHeaderWrapper, 
  ViewTitleRow, 
  ViewTitle, 
  ViewFieldsRow, 
  ViewField, 
  ViewLabel, 
  ViewValue 
} from './components/styles';
import { SortableAllocation } from './components/SortableAllocation';

interface OperationOrderHeaderProps {
  data: Partial<OperationOrderFormValues>;
  onChange: (data: Partial<OperationOrderFormValues>) => void;
  onSave?: (data: OperationOrderFormValues) => void;
  onEdit?: () => void;
  onCancel?: () => void;
  saving?: boolean;
  disabled?: boolean;
  options: {
    terminals: Terminal[];
    satellites: SatelliteSummary[];
    antennas: AntennaWithStation[];
  };
  targetAllocationId?: number | null;
  onTargetAllocationReached?: () => void;
}



const EMPTY_HEADER_DATA: OperationOrderFormValues = {
  name: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  allocations: [],
} as any;

export const OperationOrderHeader = ({
  data,
  onChange,
  onSave,
  onEdit,
  onCancel,
  saving = false,
  disabled = false,
  options,
  targetAllocationId,
  onTargetAllocationReached,
}: OperationOrderHeaderProps) => {
  const [expandedAllocations, setExpandedAllocations] = useState<Record<string, boolean>>({});
  
  const lastParentDataRef = useRef<Partial<OperationOrderFormValues>>(data);

  const { control, handleSubmit, watch, reset, getValues, formState: { isDirty } } = useForm<OperationOrderFormValues>({
    defaultValues: data as OperationOrderFormValues,
  });

  const { fields: allocationFields, append: appendAllocation, move: moveAllocation, remove: removeAllocation } = useFieldArray({
    control: control as any,
    name: 'allocations',
  });

  const toggleAllocation = (fieldId: string) => {
    setExpandedAllocations(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  const expandAllocation = (fieldId: string) => {
    setExpandedAllocations(prev => {
      if (prev[fieldId]) return prev;
      return {
        ...prev,
        [fieldId]: true
      };
    });
  };

  const handleAddAllocation = () => {
    appendAllocation({
      terminalId: '' as any,
      transmissionSatelliteId: '' as any,
      transmissionAntennaId: '' as any,
      transmissionFrequency: '' as any,
      receptionSatelliteId: '' as any,
      receptionAntennaId: '' as any,
      receptionFrequency: '' as any,
      tailNumbers: [],
      subAllocations: [],
    } as any);
  };

  useEffect(() => {
    const isSame =
      data.name === lastParentDataRef.current.name &&
      data.startDate === lastParentDataRef.current.startDate &&
      data.startTime === lastParentDataRef.current.startTime &&
      data.endDate === lastParentDataRef.current.endDate &&
      data.endTime === lastParentDataRef.current.endTime &&
      JSON.stringify((data as any).allocations) === JSON.stringify((lastParentDataRef.current as any).allocations);

    if (!isSame) {
      lastParentDataRef.current = data;
      reset(data as OperationOrderFormValues);
    }
  }, [data, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      const isSameAsParent =
        value.name === lastParentDataRef.current.name &&
        value.startDate === lastParentDataRef.current.startDate &&
        value.startTime === lastParentDataRef.current.startTime &&
        value.endDate === lastParentDataRef.current.endDate &&
        value.endTime === lastParentDataRef.current.endTime &&
        JSON.stringify((value as any).allocations) === JSON.stringify((lastParentDataRef.current as any).allocations);

      if (!isSameAsParent) {
        lastParentDataRef.current = value as OperationOrderFormValues;
        onChange(value as Partial<OperationOrderFormValues>);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  // Handle scrolling and auto-expansion for target allocation
  useEffect(() => {
    if (targetAllocationId && !disabled && allocationFields.length > 0) {
      let parentFieldId: string | null = null;

      const allocations = getValues('allocations' as any);
      if (!allocations) return;

      for (let i = 0; i < (allocations as any[]).length; i++) {
        const parent = allocations[i];
        if ((parent as any).id === targetAllocationId) break;

        const subMatch = (parent as any).subAllocations?.find((sub: any) => sub.id === targetAllocationId);
        if (subMatch) {
          parentFieldId = allocationFields[i].id;
          break;
        }
      }

      if (parentFieldId && !expandedAllocations[parentFieldId]) {
        expandAllocation(parentFieldId);
        return;
      }
    }
  }, [targetAllocationId, allocationFields, expandedAllocations, disabled, getValues]);

  useEffect(() => {
    if (targetAllocationId && !disabled) {
      const element = document.getElementById(`allocation-${targetAllocationId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.transition = 'background 0.3s';
        element.style.background = 'rgba(59, 130, 246, 0.2)';
        setTimeout(() => {
          element.style.background = '';
          if (onTargetAllocationReached) onTargetAllocationReached();
        }, 1500);
      }
    }
  }, [targetAllocationId, disabled, onTargetAllocationReached]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = allocationFields.findIndex((f) => f.id === active.id);
      const newIndex = allocationFields.findIndex((f) => f.id === over.id);
      moveAllocation(oldIndex, newIndex);
    }
  };

  const getFilteredAntennas = (index: number, isSub?: boolean, subIndex?: number) => {
    const w = watch as any;
    const terminalId = isSub 
      ? w(`allocations.${index}.subAllocations.${subIndex}.terminalId`)
      : w(`allocations.${index}.terminalId`);
    
    if (!terminalId) return options.antennas;
    
    const selectedTerminal = options.terminals.find(t => t.id.toString() === terminalId.toString());
    if (!selectedTerminal) return options.antennas;
    
    return options.antennas.filter(a => 
      a.frequencyBand.toLowerCase() === selectedTerminal.frequencyBand.toLowerCase()
    );
  };

  if (disabled) {
    return (
      <ViewHeaderWrapper>
        <ViewTitleRow>
          <ViewTitle>
            <AssignmentIcon sx={{ fontSize: 20 }} />
            פרטי פקודת מבצע: {data.name}
          </ViewTitle>
          {onEdit && (
            <IconButton onClick={onEdit} sx={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}>
              <EditIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </ViewTitleRow>
        <ViewFieldsRow>
          <ViewField>
            <ViewLabel>תאריך התחלה</ViewLabel>
            <ViewValue>{data.startDate || '-'}</ViewValue>
          </ViewField>
          <ViewField>
            <ViewLabel>שעת התחלה</ViewLabel>
            <ViewValue>{data.startTime || '-'}</ViewValue>
          </ViewField>
          <div style={{ width: '20px' }} />
          <ViewField>
            <ViewLabel>תאריך סיום</ViewLabel>
            <ViewValue>{data.endDate || '-'}</ViewValue>
          </ViewField>
          <ViewField>
            <ViewLabel>שעת סיום</ViewLabel>
            <ViewValue>{data.endTime || '-'}</ViewValue>
          </ViewField>
        </ViewFieldsRow>
      </ViewHeaderWrapper>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormHeaderTop>
        <FormTitleLarge>{data.id ? 'עריכת פקודת מבצע' : 'הוספת פקודת מבצע חדשה'}</FormTitleLarge>
        <FormSubtitle>מלא את הפרטים הנדרשים בטופס</FormSubtitle>
      </FormHeaderTop>

      <FormMainContainer>
        <FormSection style={{ padding: '8px 24px' }}>
          <EditableNameField
            name="name"
            control={control as any}
            icon={AssignmentIcon}
            placeholder="הזן שם פקודת מבצע..."
          />
        </FormSection>

        <FormSection>
          <FormSectionHeader>
            <DateRangeIcon sx={{ color: (theme) => theme.palette.common.white }} />
            <FormSectionTitle>זמני הפעילות</FormSectionTitle>
          </FormSectionHeader>
          <FieldsNotice>יש להגדיר את חלון הזמן המדויק לביצוע המשימה.</FieldsNotice>
          
          <FormFieldRow>
            <FormTextField
              name="startDate"
              control={control as any}
              label="תאריך התחלה"
              type="date"
              required
              rules={{ 
                required: 'שדה חובה',
              }}
            />
            <FormTextField
              name="startTime"
              control={control as any}
              label="שעת התחלה"
              type="time"
              required
              rules={{ 
                required: 'שדה חובה',
              }}
            />
            <FormTextField
              name="endDate"
              control={control as any}
              label="תאריך סיום"
              type="date"
              required
              rules={{ 
                required: 'שדה חובה',
                validate: (value: string) => {
                  const startDate = watch('startDate');
                  const startTime = watch('startTime');
                  const endTime = watch('endTime');
                  if (!startDate || !startTime || !value || !endTime) return true;
                  
                  const start = new Date(`${startDate}T${startTime}`);
                  const end = new Date(`${value}T${endTime}`);
                  return end >= start || 'תאריך הסיום חייב להיות אחרי תאריך ההתחלה';
                }
              }}
            />
            <FormTextField
              name="endTime"
              control={control as any}
              label="שעת סיום"
              type="time"
              required
              rules={{ 
                required: 'שדה חובה',
                validate: (value: string) => {
                  const startDate = watch('startDate');
                  const startTime = watch('startTime');
                  const endDate = watch('endDate');
                  if (!startDate || !startTime || !endDate || !value) return true;
                  
                  const start = new Date(`${startDate}T${startTime}`);
                  const end = new Date(`${endDate}T${value}`);
                  return end >= start || 'שעת הסיום חייבת להיות אחרי שעת ההתחלה';
                }
              }}
            />
          </FormFieldRow>
        </FormSection>

        <FormSection>
          <FormSectionHeader>
            <LayersIcon sx={{ color: (theme) => theme.palette.common.white }} />
            <FormSectionTitle>הקצאות ומשאבים ({allocationFields.length})</FormSectionTitle>
          </FormSectionHeader>
          <FieldsNotice>נהל את רשימת ההקצאות עבור פקודה זו. ניתן לשנות את סדר ההקצאות בגרירה.</FieldsNotice>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={allocationFields.map(f => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allocationFields.map((field, index) => (
                  <SortableAllocation
                    key={field.id}
                    field={field}
                    index={index}
                    control={control as any}
                    options={options}
                    getFilteredAntennas={getFilteredAntennas}
                    expandedAllocations={expandedAllocations}
                    toggleAllocation={toggleAllocation}
                    expandAllocation={expandAllocation}
                    remove={removeAllocation}
                    watch={watch as any}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <FormAddButton
            type="button"
            onClick={handleAddAllocation}
            sx={{ mt: 2, borderStyle: 'dashed', background: 'rgba(59, 130, 246, 0.03)' }}
          >
            <AddIcon />
            הוסף הקצאה ראשית חדשה
          </FormAddButton>
        </FormSection>

        <FormBottomActions>
          <div /> {/* Spacer */}
          <ActionButtonsGroup>
            {!data.id && (
              <FormSecondaryButton 
                onClick={() => reset(EMPTY_HEADER_DATA)}
                disabled={saving}
              >
                נקה שדות
              </FormSecondaryButton>
            )}
            {data.id && onCancel && (
              <FormSecondaryButton onClick={onCancel} disabled={saving}>
                ביטול
              </FormSecondaryButton>
            )}
            <FormPrimaryButton
              onClick={handleSubmit((data) => onSave?.(data))}
              disabled={saving || (!!data.id && !isDirty)}
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            >
              {saving ? 'שומר...' : 'שמור פקודה'}
            </FormPrimaryButton>
          </ActionButtonsGroup>
        </FormBottomActions>
      </FormMainContainer>
    </div>
  );
};
