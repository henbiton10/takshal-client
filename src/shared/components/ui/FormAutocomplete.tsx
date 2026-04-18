import { useState } from 'react';
import { Autocomplete, TextField, Chip, SxProps, FormHelperText, Theme } from '@mui/material';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { FieldLabel } from './FormLayout';

interface FormAutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  options: number[];
  error?: FieldError;
  required?: boolean;
}

const autocompleteStyles: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: '4px',
  '& .MuiOutlinedInput-root': {
    padding: '2px 8px !important',
    minHeight: '36px',
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
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  }
});

export const FormAutocomplete = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  error,
  required,
}: FormAutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <FieldLabel $required={required}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => {
          const currentValues = Array.isArray(value) ? value.map(String) : [];

          const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === ' ' && inputValue.trim()) {
              event.preventDefault();
              const newValue = inputValue.trim();
              if (!currentValues.includes(newValue)) {
                // Determine if we should handle valid numbers only
                const isNumeric = options.length > 0 || (currentValues.length > 0 && typeof value[0] === 'number') || true; // Defaulting to true for tail numbers

                if (isNumeric) {
                  const num = parseInt(newValue, 10);
                  if (!isNaN(num)) {
                    onChange([...currentValues.map((v: string) => parseInt(v, 10)), num]);
                  }
                } else {
                  onChange([...currentValues, newValue]);
                }
              }
              setInputValue('');
            }
          };

          return (
            <>
              <Autocomplete
                multiple
                freeSolo
                options={options.map(String)}
                value={currentValues}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(_, newValue) => {
                  const isNumeric = options.length > 0 || (currentValues.length > 0 && typeof value[0] === 'number');
                  if (isNumeric) {
                    const numericValues = newValue.map(v => parseInt(v, 10)).filter(v => !isNaN(v));
                    onChange(numericValues);
                  } else {
                    onChange(newValue);
                  }
                }}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        label={option}
                        {...tagProps}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(61, 98, 178, 0.3)',
                          color: '#ffffff',
                          border: '1px solid rgba(61, 98, 178, 0.5)',
                          height: '24px',
                          margin: '2px',
                          '& .MuiChip-deleteIcon': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            margin: '0 -4px 0 4px', 
                            '&:hover': { color: '#ffffff' },
                            fontSize: '16px',
                          },
                          '& .MuiChip-label': {
                            paddingLeft: '8px',
                            paddingRight: '8px',
                          }
                        }}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={currentValues.length === 0 ? placeholder : ''}
                    sx={autocompleteStyles}
                    error={!!fieldError || !!error}
                    onKeyDown={handleKeyDown}
                  />
                )}
              />
              {(fieldError || error) && (
                <FormHelperText sx={(theme) => ({ textAlign: 'right', direction: 'rtl', color: theme.palette.error.main })}>
                  {fieldError?.message || error?.message}
                </FormHelperText>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
