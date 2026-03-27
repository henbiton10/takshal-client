import { useState } from 'react';
import { IconButton, SvgIconProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface EditableNameFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  icon: React.ComponentType<SvgIconProps>;
  placeholder?: string;
  value?: string;
}

const NameFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const NameFieldWrapper = styled.div<{ isEditing: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.pill};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  min-width: ${props => props.isEditing ? '300px' : '180px'};
  max-width: 400px;
  cursor: ${props => props.isEditing ? 'text' : 'pointer'};
  border: 1px solid ${theme.colors.border.subtle};
  transition: all 0.2s;
  
  &:hover {
    background: rgba(60, 70, 90, 0.7);
  }
`;

const NameFieldIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.iconSize.md};
`;

const NameFieldInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  flex: 1;
  direction: rtl;
  text-align: center;
  
  &::placeholder {
    color: ${theme.colors.text.placeholder};
  }
`;

const NameFieldText = styled.div`
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  flex: 1;
  text-align: center;
  direction: rtl;
`;

export const EditableNameField = <T extends FieldValues>({
  name,
  control,
  icon: Icon,
  placeholder = 'הזן שם',
}: EditableNameFieldProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <NameFieldContainer>
      <NameFieldIcon>
        <Icon />
      </NameFieldIcon>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'שם הינו שדה חובה' }}
        render={({ field }) => (
          <NameFieldWrapper 
            isEditing={isEditing}
            onClick={() => !isEditing && setIsEditing(true)}
          >
            {isEditing ? (
              <NameFieldInput
                {...field}
                placeholder={placeholder}
                autoFocus
                onBlur={() => setIsEditing(false)}
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
              sx={{ color: theme.colors.text.white, padding: '4px' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </NameFieldWrapper>
        )}
      />
    </NameFieldContainer>
  );
};
