import { useState, useEffect } from 'react';
import { TextField, SxProps, InputAdornment, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError, RegisterOptions } from 'react-hook-form';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FieldLabel } from './FormLayout';

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: FieldError;
  rules?: RegisterOptions<T, Path<T>>;
  transformValue?: {
    toForm: (val: string) => any;
    toField: (val: any) => string;
  };
  inputProps?: any;
}

const textFieldStyles: SxProps<Theme> = (theme) => ({
  borderRadius: '4px',
  fontFamily: 'inherit',
  '& .MuiOutlinedInput-root': {
    height: '36px',
    backgroundColor: theme.palette.action.hover,
    borderRadius: '4px',
    color: theme.palette.text.primary,
    direction: 'rtl',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.disabled,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    fontWeight: 600,
    padding: '0 12px',
    textAlign: 'right',
    '&::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 0.6,
    },
  },
  '& .MuiFormHelperText-root': {
    margin: '4px 0 0 0',
    textAlign: 'right',
    color: theme.palette.error.main,
    backgroundColor: 'transparent !important',
  },
});

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required = false,
  multiline = false,
  rows = 1,
  error,
  type = 'text',
  transformValue,
  rules,
  inputProps: extraInputProps,
}: FormTextFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const isDateField = type === 'date';
  const isTimeField = type === 'time';
  const isPickerField = isDateField || isTimeField;

  // Use an effect to auto-launch the native picker
  useEffect(() => {
    if (isPickerField && isFocused) {
      const timer = setTimeout(() => {
        const input = document.querySelector(`input[name="${name}"]`) as any;
        if (input && input.showPicker) {
          try {
            input.showPicker();
          } catch (err) { }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isFocused, isPickerField, name]);

  return (
    <div>
      <FieldLabel $required={required}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules || (required ? { required: 'שדה חובה' } : undefined)}
        render={({ field, fieldState: { error: fieldError } }) => {
          // Switch type to 'text' when empty/unfocused to show the placeholder
          const displayType = (isPickerField && (field.value || isFocused)) ? type : 'text';

          return (
            <TextField
              {...field}
              id={`input-${name}`}
              inputProps={{
                name,
                lang: isPickerField ? 'he-IL' : undefined, /* Force Hebrew native UI */
                ...extraInputProps,
              }}
              value={transformValue ? transformValue.toField(field.value) : (field.value ?? '')}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(transformValue ? transformValue.toForm(val) : val);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              type={displayType}
              error={!!fieldError || !!error}
              helperText={fieldError?.message || error?.message}
              fullWidth
              multiline={multiline}
              rows={rows}
              placeholder={isDateField ? 'בחר תאריך' : (isTimeField ? 'בחר שעה' : placeholder)}
              variant="outlined"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: isPickerField ? (
                  <InputAdornment 
                    position="end" 
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = document.getElementById(`input-${name}`) as HTMLInputElement;
                      if (input && input.showPicker) {
                        try {
                          input.showPicker();
                        } catch (err) {
                          console.error('Failed to show picker:', err);
                        }
                      }
                    }}
                  >
                    {isDateField ? (
                      <CalendarMonthIcon sx={{ color: '#bababa', fontSize: 20 }} />
                    ) : (
                      <AccessTimeIcon sx={{ color: '#bababa', fontSize: 20 }} />
                    )}
                  </InputAdornment>
                ) : null,
                sx: {
                  '& input': {
                    textAlign: 'right !important',
                    direction: 'rtl !important',
                    marginLeft: 'auto !important', /* Force input to hit the RIGHT */
                  },
                  /* Force segments to the right in native mode */
                  '& input[type="date"], & input[type="time"]': {
                    display: 'flex !important',
                    flexDirection: 'row !important',
                    justifyContent: 'flex-start !important', /* RIGHT in RTL */
                    paddingRight: '0 !important',
                    width: 'auto !important', /* shrink to content to allow auto margin to work */
                    cursor: 'pointer',
                  },
                  '& input[type="date"]::-webkit-datetime-edit, & input[type="time"]::-webkit-datetime-edit': {
                    display: 'flex !important',
                    flexDirection: 'row-reverse !important',
                    justifyContent: 'flex-start !important',
                    width: 'auto !important',
                    direction: 'ltr !important',
                  },
                  '& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)',
                    opacity: 0,
                    cursor: 'pointer',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                  },
                },
              }}
            />
          );
        }}
      />
    </div>
  );
};
