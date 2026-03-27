import { useCallback } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { CreateOperationOrderDto } from '../../services/api/types';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: rgba(6, 15, 35, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  direction: rtl;
`;

const HeaderTitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  color: rgba(225, 234, 255, 0.9);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const EditButton = styled(IconButton)`
  color: rgba(59, 130, 246, 0.8) !important;
  padding: 6px;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6 !important;
  }
`;

const HeaderActionButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const SaveIconButton = styled(IconButton)`
  color: white !important;
  padding: 6px;

  &:hover {
    background: rgba(34, 197, 94, 0.1);
    color: white !important;
  }

  &:disabled {
    color: rgba(34, 197, 94, 0.3) !important;
  }
`;

const CancelIconButton = styled(IconButton)`
  color: rgba(239, 68, 68, 0.8) !important;
  padding: 6px;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444 !important;
  }
`;

const FieldsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 180px;
`;

const FieldLabel = styled.label`
  color: rgba(225, 234, 255, 0.7);
  font-size: 13px;
  font-weight: 500;

  .required {
    color: #ef4444;
    margin-right: 4px;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(16, 33, 62, 0.6);
    border-radius: 6px;
    color: rgba(225, 234, 255, 0.9);

    fieldset {
      border-color: rgba(59, 130, 246, 0.3);
    }

    &:hover fieldset {
      border-color: rgba(59, 130, 246, 0.5);
    }

    &.Mui-focused fieldset {
      border-color: #3b82f6;
    }

    input {
      padding: 10px 12px;
      font-size: 14px;
      direction: rtl;
      text-align: right;

      &::placeholder {
        color: rgba(225, 234, 255, 0.4);
      }
    }

    input[type='date'],
    input[type='time'] {
      direction: ltr;
      text-align: left;
    }
  }

  .MuiInputBase-input {
    color: rgba(225, 234, 255, 0.9);
  }
`;

interface OperationOrderHeaderProps {
  data: Partial<CreateOperationOrderDto>;
  onChange: (data: Partial<CreateOperationOrderDto>) => void;
  errors?: {
    name?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
  };
  disabled?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  saving?: boolean;
}

export const OperationOrderHeader = ({
  data,
  onChange,
  errors,
  disabled = false,
  onEdit,
  onSave,
  onCancel,
  saving = false,
}: OperationOrderHeaderProps) => {
  const handleChange = useCallback(
    (field: keyof CreateOperationOrderDto) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [field]: e.target.value });
      },
    [data, onChange]
  );

  return (
    <HeaderContainer>
      <HeaderTitleRow>
        <HeaderTitle>פרטי פקודת מבצע</HeaderTitle>
        <HeaderActionButtons>
          {onEdit && (
            <EditButton onClick={onEdit}>
              <EditIcon sx={{ fontSize: 20 }} />
            </EditButton>
          )}
          {onSave && onCancel && (
            <>
              <SaveIconButton onClick={onSave} disabled={saving}>
                {saving ? (
                  <CircularProgress size={20} sx={{ color: 'rgba(34, 197, 94, 0.8)' }} />
                ) : (
                  <SaveIcon sx={{ fontSize: 20 }} />
                )}
              </SaveIconButton>
              <CancelIconButton onClick={onCancel} disabled={saving}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </CancelIconButton>
            </>
          )}
        </HeaderActionButtons>
      </HeaderTitleRow>
      <FieldsRow>
        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            שם הפקודה
          </FieldLabel>
          <StyledTextField
            fullWidth
            placeholder="הזן שם פקודת מבצע"
            value={data.name || ''}
            onChange={handleChange('name')}
            error={!!errors?.name}
            helperText={errors?.name}
            disabled={disabled}
            size="small"
          />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            תאריך התחלה
          </FieldLabel>
          <StyledTextField
            fullWidth
            type="date"
            value={data.startDate || ''}
            onChange={handleChange('startDate')}
            error={!!errors?.startDate}
            helperText={errors?.startDate}
            disabled={disabled}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            שעת התחלה
          </FieldLabel>
          <StyledTextField
            fullWidth
            type="time"
            value={data.startTime || ''}
            onChange={handleChange('startTime')}
            error={!!errors?.startTime}
            helperText={errors?.startTime}
            disabled={disabled}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            תאריך סיום
          </FieldLabel>
          <StyledTextField
            fullWidth
            type="date"
            value={data.endDate || ''}
            onChange={handleChange('endDate')}
            error={!!errors?.endDate}
            helperText={errors?.endDate}
            disabled={disabled}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>
            <span className="required">*</span>
            שעת סיום
          </FieldLabel>
          <StyledTextField
            fullWidth
            type="time"
            value={data.endTime || ''}
            onChange={handleChange('endTime')}
            error={!!errors?.endTime}
            helperText={errors?.endTime}
            disabled={disabled}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </FieldWrapper>
      </FieldsRow>
    </HeaderContainer>
  );
};
