import { useState } from 'react';
import { IconButton, SvgIconProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface EditableNameFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  icon: React.ComponentType<SvgIconProps>;
  placeholder?: string;
  value?: string;
}

const NameFieldOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NameFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  direction: rtl;
`;

const NameFieldWrapper = styled.div<{ isEditing: boolean; hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.hasError 
    ? props.theme.customColors.error.subtle 
    : props.theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.04)' 
      : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid ${props => props.hasError ? props.theme.customColors.error.main : props.theme.customColors.border.divider};
  border-radius: 12px;
  padding: 0 12px;
  height: 42px;
  min-width: 220px;
  cursor: ${props => props.isEditing ? 'text' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.hasError 
      ? props.theme.customColors.error.subtle 
      : props.theme.customColors.action.hover};
    border-color: ${props => props.hasError ? props.theme.customColors.error.main : props.theme.customColors.border.accent};
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.customColors.error.main};
  font-size: 12px;
  font-weight: 600;
  text-align: right;
  margin-right: 54px;
  direction: rtl;
`;

const NameFieldIcon = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.hasError ? props.theme.customColors.error.main + '33' : props.theme.customColors.primary.main + '33'};
  color: ${props => props.hasError ? props.theme.customColors.error.main : props.theme.customColors.primary.main};
  width: 42px;
  height: 42px;
  border-radius: 10.5px;
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    font-size: 21px;
  }
`;

const NameFieldInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.customColors.text.primary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  flex: 1;
  direction: rtl;
  text-align: right;
  padding: 0;
  
  &::placeholder {
    color: ${({ theme }) => theme.customColors.text.disabled};
  }
`;

const NameFieldText = styled.div`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  flex: 1;
  text-align: right;
  direction: rtl;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EditableNameField = <T extends FieldValues>({
  name,
  control,
  icon: Icon,
  placeholder = 'הזן שם',
}: EditableNameFieldProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'שם הינו שדה חובה' }}
      render={({ field, fieldState: { error } }) => (
        <NameFieldOuter>
          <NameFieldContainer>
            <NameFieldIcon hasError={!!error}>
              <Icon />
            </NameFieldIcon>
            <NameFieldWrapper 
              isEditing={isEditing}
              hasError={!!error}
              onClick={() => !isEditing && setIsEditing(true)}
            >
              {isEditing ? (
                <NameFieldInput
                  {...field}
                  value={field.value ?? ''}
                  placeholder={placeholder}
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setIsEditing(false);
                    }
                  }}
                />
              ) : (
                <NameFieldText>
                  {field.value || placeholder}
                </NameFieldText>
              )}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                sx={{ color: (theme: any) => theme.customColors.text.secondary, padding: '4px' }}
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </NameFieldWrapper>
          </NameFieldContainer>
          {error && <ErrorText>{error.message}</ErrorText>}
        </NameFieldOuter>
      )}
    />
  );
};
