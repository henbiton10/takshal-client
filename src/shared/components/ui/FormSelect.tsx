import { FormControl, Select, MenuItem, FormHelperText, SxProps, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { FieldLabel } from './FormLayout';

interface SelectOption {
  value: string | boolean | null;
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
  disabled?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  transformValue?: {
    toForm: (value: string) => any;
    toField: (value: any) => string;
  };
}

const selectStyles: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: '4px',
  height: '36px',
  fontFamily: 'inherit',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.disabled,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
  },
  '& .MuiSelect-select': {
    color: theme.palette.text.secondary,
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
    color: theme.palette.text.disabled,
    left: '7px',
    right: 'auto',
  },
});

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  rules,
  required,
  disabled,
  value: propsValue,
  onChange: propsOnChange,
  transformValue,
}: FormSelectProps<T>) => {
  return (
    <div>
      <FieldLabel $required={required}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value: controllerValue, onChange, ...field }, fieldState: { error: fieldError } }) => {
          const value = propsValue !== undefined ? propsValue : controllerValue;
          return (
            <FormControl fullWidth error={!!fieldError || !!error} disabled={disabled}>
              <Select
                {...field}
                disabled={disabled}
                value={transformValue ? transformValue.toField(value) : (value ?? '')}
                onChange={(e) => {
                  const newValue = transformValue 
                    ? transformValue.toForm(e.target.value as string)
                    : e.target.value;
                  onChange(newValue);
                  if (propsOnChange) {
                    propsOnChange(newValue);
                  }
                }}
                displayEmpty
                sx={selectStyles}
                error={!!fieldError || !!error}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      backgroundColor: (theme: any) => theme.customColors.background.glass,
                      backdropFilter: 'blur(10px)',
                      border: (theme: any) => `1px solid ${theme.customColors.border.divider}`,
                      '& .MuiMenuItem-root': {
                        padding: '8px 16px',
                      }
                    }
                  }
                }}
                renderValue={(selected) => {
                  if (!selected || selected === '') {
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
              {(fieldError || error) && (
                <FormHelperText sx={{ textAlign: 'right', direction: 'rtl', margin: '4px 0 0 0' }}>
                  {(fieldError?.message || error?.message) as string}
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
    </div>
  );
};
