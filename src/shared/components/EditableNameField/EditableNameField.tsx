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
  background: ${props => props.hasError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.12)'};
  border: 1px solid ${props => props.hasError ? 'rgba(239, 68, 68, 0.4)' : 'transparent'};
  border-radius: 12px;
  padding: 0 12px;
  height: 42px;
  min-width: 220px;
  cursor: ${props => props.isEditing ? 'text' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.18)'};
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  text-align: right;
  margin-right: 54px; /* Keeping the offset to match input start, but ensured alignment */
  direction: rtl;
`;

const NameFieldIcon = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.hasError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 166, 62, 0.4)'};
  color: white;
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
  color: #fafafa;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  flex: 1;
  direction: rtl;
  text-align: right;
  padding: 0;
  
  &::placeholder {
    color: rgba(225, 234, 255, 0.4);
  }
`;

const NameFieldText = styled.div`
  color: #fafafa;
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
                sx={{ color: 'rgba(255, 255, 255, 0.7)', padding: '4px' }}
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
