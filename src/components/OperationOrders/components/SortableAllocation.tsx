import { Box, IconButton, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  FormSelect, 
  FormAutocomplete, 
  FormTextField 
} from '../../../shared/components/ui';
import { DynamicRow, DragHandle, ActionIconButton } from './styles';
import { AllocationTitle } from './AllocationTitle';
import { SubAllocationSection } from './SubAllocationSection';

interface SortableAllocationProps {
  field: any;
  index: number;
  control: any;
  options: any;
  getFilteredAntennas: (index: number, isSub?: boolean, subIndex?: number) => any[];
  expandedAllocations: Record<string, boolean>;
  toggleAllocation: (id: string) => void;
  expandAllocation: (id: string) => void;
  remove: (index: number) => void;
  watch: any;
}

export const SortableAllocation = ({
  field,
  index,
  control,
  options,
  getFilteredAntennas,
  expandedAllocations,
  toggleAllocation,
  expandAllocation,
  remove,
  watch
}: SortableAllocationProps) => {
  const theme = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const subCount = watch(`allocations.${index}.subAllocations`)?.length || 0;
  const isExpanded = !!expandedAllocations[field.id];
  const backendId = (field as any).id && typeof (field as any).id === 'number' ? (field as any).id : null;

  return (
    <div ref={setNodeRef} style={style}>
      <DynamicRow id={`allocation-${backendId || field.id}`} style={{ paddingRight: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <DragHandle {...attributes} {...listeners}>
            <DragIndicatorIcon sx={{ fontSize: 20 }} />
          </DragHandle>
        </Box>

        <Box sx={{ flex: 1 }}>
          <AllocationTitle title={(index + 1).toString()} type="primary" />

          <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap', width: '100%', alignItems: 'center' }}>
            <Box sx={{ minWidth: '220px', flex: '1 1 220px' }}>
              <FormSelect
                name={`allocations.${index}.terminalId`}
                control={control}
                label="טרמינל"
                options={options.terminals.map((t: any) => ({ value: t.id.toString(), label: t.name }))}
                placeholder="בחר טרמינל"
                required
                rules={{ required: 'שדה חובה' }}
                transformValue={{
                  toField: (val: any) => {
                    const id = (val && typeof val === 'object' ? (val.id || val.terminalId) : val);
                    return id?.toString() || '';
                  },
                  toForm: (val: string) => val === '' ? null : Number(val),
                }}
              />
            </Box>

            <Box sx={{ minWidth: '220px', flex: '1 1 220px' }}>
              <FormAutocomplete
                name={`allocations.${index}.tailNumbers`}
                control={control}
                label="מספרי זנב (ראשי)"
                placeholder="הזן מספרי זנב..."
                options={[]}
              />
            </Box>

            <IconButton
              onClick={() => remove(index)}
              size="medium"
              sx={{
                color: '#ef4444',
                position: 'absolute',
                top: 8,
                left: 8,
                padding: '4px',
                '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
              }}
            >
              <CloseIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 4, mb: 1.5, mt: 1, flexWrap: 'wrap' }}>
            {/* Transmission Section */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Box sx={{
                color: (theme) => theme.palette.text.secondary,
                fontSize: '13px',
                mb: 1,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: (theme as any).palette.mode === 'light' ? '#16a34a' : '#42e449' 
                }} />
                שידור
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormSelect
                  name={`allocations.${index}.transmissionSatelliteId`}
                  control={control}
                  label="לוויין"
                  options={options.satellites.map((s: any) => ({ value: s.id.toString(), label: s.name }))}
                  placeholder="לוויין"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormSelect
                  name={`allocations.${index}.transmissionAntennaId`}
                  control={control}
                  label="אנטנה"
                  options={getFilteredAntennas(index).map((a: any) => ({ value: a.id.toString(), label: a.displayName }))}
                  placeholder="אנטנה"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormTextField
                  name={`allocations.${index}.transmissionFrequency`}
                  control={control}
                  label="תדר"
                  type="number"
                  placeholder="MHz"
                  inputProps={{ step: 'any' }}
                  required
                  rules={{
                    required: 'שדה חובה',
                    validate: {
                      isNumber: (val: any) => val === null || val === undefined || !isNaN(Number(val)) || 'יש להזין מספר תקין',
                      minVal: (val: any) => !val || Number(val) >= 0.01 || 'תדר חייב להיות גדול מ-0.01'
                    }
                  }}
                  transformValue={{
                    toField: (val: any) => (val === null || val === undefined) ? '' : val.toString(),
                    toForm: (val: string) => {
                      if (val === '') return null;
                      if (val.includes('.')) return val as any;
                      const num = Number(val);
                      return isNaN(num) ? val : num;
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Reception Section */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Box sx={{
                color: (theme) => theme.palette.text.secondary,
                fontSize: '13px',
                mb: 1,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: (theme as any).palette.mode === 'light' ? '#2563eb' : '#3b82f6' 
                }} />
                קליטה
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormSelect
                  name={`allocations.${index}.receptionSatelliteId`}
                  control={control}
                  label="לוויין"
                  options={options.satellites.map((s: any) => ({ value: s.id.toString(), label: s.name }))}
                  placeholder="לוויין"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormSelect
                  name={`allocations.${index}.receptionAntennaId`}
                  control={control}
                  label="אנטנה"
                  options={getFilteredAntennas(index).map((a: any) => ({ value: a.id.toString(), label: a.displayName }))}
                  placeholder="אנטנה"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormTextField
                  name={`allocations.${index}.receptionFrequency`}
                  control={control}
                  label="תדר"
                  type="number"
                  placeholder="MHz"
                  inputProps={{ step: 'any' }}
                  required
                  rules={{
                    required: 'שדה חובה',
                    validate: {
                      isNumber: (val: any) => val === null || val === undefined || !isNaN(Number(val)) || 'יש להזין מספר תקין',
                      minVal: (val: any) => !val || Number(val) >= 0.01 || 'תדר חייב להיות גדול מ-0.01'
                    }
                  }}
                  transformValue={{
                    toField: (val: any) => (val === null || val === undefined) ? '' : val.toString(),
                    toForm: (val: string) => {
                      if (val === '') return null;
                      if (val.includes('.')) return val as any;
                      const num = Number(val);
                      return isNaN(num) ? val : num;
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            {subCount > 0 && (
              <ActionIconButton
                onClick={() => toggleAllocation(field.id)}
                title={isExpanded ? "צמצם" : "הרחב"}
                sx={{
                  background: (theme: any) => theme.customColors.background.light,
                  '&:hover': { background: (theme: any) => theme.customColors.action.hover }
                }}
              >
                <Box component="span" sx={{ fontSize: '13px', ml: 1, fontWeight: 600 }}>
                  {isExpanded ? 'צמצם הצגה' : 'הצג הקצאות משניות'}
                </Box>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ActionIconButton>
            )}
          </Box>
        </Box>
      </DynamicRow>

      <SubAllocationSection
        nestIndex={index}
        control={control}
        options={options}
        getFilteredAntennas={getFilteredAntennas}
        isExpanded={isExpanded}
        onExpand={() => expandAllocation(field.id)}
      />
    </div>
  );
};
