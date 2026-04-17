import { TextField, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { FieldLabel } from './FormLayout';

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  rules?: object;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: 'text' | 'number' | 'email' | 'password';
  transformValue?: {
    toField: (value: any) => string;
    toForm: (value: string) => any;
  };
}

const textFieldStyles: SxProps = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  borderRadius: '4px',
  fontFamily: 'Assistant, sans-serif',
  '& .MuiOutlinedInput-root': {
    height: '36px',
    '& fieldset': {
      borderColor: '#666',
    },
    '&:hover fieldset': {
      borderColor: '#888',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aaa',
    },
  },
  '& .MuiInputBase-input': {
    color: '#bababa',
    fontSize: '16px',
    fontWeight: 600,
    padding: '0 8px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '&::placeholder': {
      color: '#bababa',
      opacity: 1,
    },
  },
};

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  rules,
  required,
  multiline = false,
  rows,
  type = 'text',
  transformValue,
}: FormTextFieldProps<T>) => {
  return (
    <div>
      <FieldLabel $required={required}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            value={transformValue ? transformValue.toField(field.value) : field.value}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(transformValue ? transformValue.toForm(val) : val);
            }}
            type={type}
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
