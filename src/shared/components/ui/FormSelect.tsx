import { FormControl, Select, MenuItem, FormHelperText, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { theme } from '../../../theme';
import { FieldLabel } from './FormLayout';

interface SelectOption {
  value: string | boolean;
  label: string;
  icon?: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: FieldError;
  rules?: object;
  required?: boolean;
  transformValue?: {
    toForm: (value: string) => any;
    toField: (value: any) => string;
  };
}

const selectStyles: SxProps = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  borderRadius: '4px',
  height: '36px',
  fontFamily: 'Assistant, sans-serif',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#666',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#888',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#aaa',
  },
  '& .MuiSelect-select': {
    color: '#bababa',
    padding: '0 12px 0 32px !important',
    fontSize: '16px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '100%',
    textAlign: 'right',
    direction: 'rtl',
  },
  '& .MuiSelect-icon': {
    color: '#bababa',
    left: '7px',
    right: 'auto',
  },
};

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  rules,
  required,
  transformValue,
}: FormSelectProps<T>) => {
  return (
    <div>
      <FieldLabel $required={required}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange, ...field } }) => (
          <FormControl fullWidth error={!!error}>
            <Select
              {...field}
              value={transformValue ? transformValue.toField(value) : (value ?? '')}
              onChange={(e) => {
                const newValue = transformValue 
                  ? transformValue.toForm(e.target.value)
                  : e.target.value;
                onChange(newValue);
              }}
              displayEmpty
              sx={selectStyles}
              renderValue={(selected) => {
                if (selected === '') {
                  return <span style={{ opacity: 0.6 }}>{placeholder}</span>;
                }
                const option = options.find(o => String(o.value) === String(selected));
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {option?.icon && <img src={option.icon} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />}
                    <span>{option?.label || selected}</span>
                  </div>
                );
              }}
            >
              {placeholder && (
                <MenuItem value="" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem 
                  key={String(option.value)} 
                  value={String(option.value)}
                  sx={{ gap: '8px' }}
                >
                  {option.icon && <img src={option.icon} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />}
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};
