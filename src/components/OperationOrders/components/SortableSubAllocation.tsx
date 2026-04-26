import { Box, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  FormSelect, 
  FormAutocomplete, 
  FormTextField 
} from '../../../shared/components/ui';
import { SubRow, DragHandle } from './styles';
import { AllocationTitle } from './AllocationTitle';

interface SortableSubAllocationProps {
  field: any;
  index: number;
  nestIndex: number;
  control: any;
  options: any;
  getFilteredAntennas: (index: number, isSub?: boolean, subIndex?: number) => any[];
  remove: (index: number) => void;
}

export const SortableSubAllocation = ({
  field,
  index,
  nestIndex,
  control,
  options,
  getFilteredAntennas,
  remove,
}: SortableSubAllocationProps) => {
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

  const backendId = (field as any).id && typeof (field as any).id === 'number' ? (field as any).id : null;

  return (
    <div ref={setNodeRef} style={style}>
      <SubRow id={`allocation-${backendId || field.id}`} style={{ paddingRight: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <DragHandle {...attributes} {...listeners}>
            <DragIndicatorIcon sx={{ fontSize: 20 }} />
          </DragHandle>
        </Box>

        <Box sx={{ flex: 1 }}>
          <AllocationTitle title={`${nestIndex + 1}.${index + 1}`} type="secondary" />

          <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap', width: '100%', alignItems: 'center' }}>
            <Box sx={{ minWidth: '220px', flex: '1 1 220px' }}>
              <FormSelect
                name={`allocations.${nestIndex}.subAllocations.${index}.terminalId`}
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
                name={`allocations.${nestIndex}.subAllocations.${index}.tailNumbers`}
                control={control}
                label="מספרי זנב (משני)"
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

          <Box sx={{ display: 'flex', gap: 4, mb: 2, mt: 1, flexWrap: 'wrap' }}>
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
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#42e449' }} />
                שידור
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormSelect
                  name={`allocations.${nestIndex}.subAllocations.${index}.transmissionSatelliteId`}
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
                  name={`allocations.${nestIndex}.subAllocations.${index}.transmissionAntennaId`}
                  control={control}
                  label="אנטנה"
                  options={getFilteredAntennas(nestIndex, true, index).map((a: any) => ({ value: a.id.toString(), label: a.displayName }))}
                  placeholder="אנטנה"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormTextField
                  name={`allocations.${nestIndex}.subAllocations.${index}.transmissionFrequency`}
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
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                קליטה
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormSelect
                  name={`allocations.${nestIndex}.subAllocations.${index}.receptionSatelliteId`}
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
                  name={`allocations.${nestIndex}.subAllocations.${index}.receptionAntennaId`}
                  control={control}
                  label="אנטנה"
                  options={getFilteredAntennas(nestIndex, true, index).map((a: any) => ({ value: a.id.toString(), label: a.displayName }))}
                  placeholder="אנטנה"
                  required
                  rules={{ required: 'שדה חובה' }}
                  transformValue={{
                    toField: (val: any) => val?.toString() || '',
                    toForm: (val: string) => Number(val),
                  }}
                />
                <FormTextField
                  name={`allocations.${nestIndex}.subAllocations.${index}.receptionFrequency`}
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
        </Box>
      </SubRow>
    </div>
  );
};
