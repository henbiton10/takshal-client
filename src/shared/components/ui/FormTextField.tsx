import { TextField, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { theme } from '../../../theme';
import { FieldLabel } from './FormLayout';

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  rules?: object;
  multiline?: boolean;
  rows?: number;
}

const textFieldStyles: SxProps = {
  '& .MuiOutlinedInput-root': {
    color: theme.colors.text.white,
    height: '38px',
    '& fieldset': {
      borderColor: theme.colors.border.primary,
    },
    '&:hover fieldset': {
      borderColor: theme.colors.border.hover,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.colors.border.focused,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.colors.text.white,
    fontSize: theme.typography.fontSize.sm,
  },
};

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  rules,
  multiline = false,
  rows,
}: FormTextFieldProps<T>) => {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message}
            fullWidth
            multiline={multiline}
            rows={rows}
            placeholder={placeholder}
            variant="outlined"
            sx={textFieldStyles}
          />
        )}
      />
    </div>
  );
};
