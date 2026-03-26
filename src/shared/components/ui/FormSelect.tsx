import { FormControl, Select, MenuItem, FormHelperText, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { theme } from '../../../theme';
import { FieldLabel } from './FormLayout';

interface SelectOption {
  value: string | boolean;
  label: string;
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
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colors.border.primary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colors.border.hover,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colors.border.focused,
  },
  '& .MuiSelect-select': {
    color: theme.colors.text.white,
    padding: '8px 10px',
    fontSize: theme.typography.fontSize.sm,
  },
  '& .MuiSvgIcon-root': {
    color: theme.colors.text.white,
    fontSize: theme.typography.iconSize.sm,
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
                >
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
