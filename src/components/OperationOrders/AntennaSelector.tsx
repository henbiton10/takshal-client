import { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Popover from '@mui/material/Popover';
import { AntennaWithStation } from '../../services/api/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-size: 13px;
  font-weight: 500;

  .required {
    color: ${({ theme }) => theme.customColors.error.main};
    margin-right: 4px;
  }
`;

const SelectorButton = styled.div<{ $hasError?: boolean; $hasValue?: boolean }>`
  background: ${({ theme }) => theme.customColors.background.light};
  border: 1px solid
    ${(props: any) =>
      props.$hasError
        ? props.theme.customColors.error.main
        : props.$hasValue
        ? props.theme.customColors.border.focused
        : props.theme.customColors.border.primary};
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${(props: any) =>
    props.$hasValue ? props.theme.customColors.text.primary : props.theme.customColors.text.disabled};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.customColors.border.hover};
  }
`;

const SearchContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider};
`;

const StyledSearchField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: ${({ theme }) => theme.customColors.background.medium};
    border-radius: 6px;
    color: ${({ theme }) => theme.customColors.text.primary};

    fieldset {
      border-color: ${({ theme }) => theme.customColors.border.subtle};
    }

    &:hover fieldset {
      border-color: ${({ theme }) => theme.customColors.border.hover};
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.customColors.border.focused};
    }
  }

  .MuiInputBase-input {
    padding: 8px 12px;
    font-size: 13px;
    direction: rtl;
  }

  .MuiInputAdornment-root {
    color: ${({ theme }) => theme.customColors.text.disabled};
  }
`;

const OptionsList = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 8px 0;
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
    width: 100%;
  }
`;

const OptionItem = styled.div<{ $selected?: boolean; $disabled?: boolean }>`
  padding: 10px 16px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: ${(props: any) => (props.$selected ? props.theme.customColors.action.hover : 'transparent')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  &:hover {
    background: ${(props: any) => (props.$disabled ? 'transparent' : props.theme.customColors.action.hover)};
  }
`;

const OptionName = styled.span`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 14px;
`;

const OptionDetails = styled.span`
  color: ${({ theme }) => theme.customColors.text.disabled};
  font-size: 12px;
`;

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.customColors.text.disabled};
  font-size: 13px;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.customColors.error.main};
  font-size: 12px;
  margin-top: 4px;
`;

const PopoverContent = styled.div`
  width: 350px;
  background: ${({ theme }) => theme.customColors.background.default};
  border: 1px solid ${({ theme }) => theme.customColors.border.primary};
  border-radius: 8px;
  direction: rtl;
`;

interface AntennaSelectorProps {
  label: string;
  required?: boolean;
  value?: number;
  onChange: (value: number | undefined) => void;
  antennas: AntennaWithStation[];
  error?: string;
}

export const AntennaSelector = ({
  label,
  required,
  value,
  onChange,
  antennas,
  error,
}: AntennaSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedAntenna = useMemo(() => {
    return antennas.find((a) => a.id === value);
  }, [antennas, value]);

  const filteredAntennas = useMemo(() => {
    const activeAntennas = antennas.filter((a) => !a.isDeleted || a.id === value);
    if (!searchQuery.trim()) return activeAntennas;
    const query = searchQuery.toLowerCase();
    return activeAntennas.filter(
      (a) =>
        a.displayName.toLowerCase().includes(query) ||
        a.stationName.toLowerCase().includes(query) ||
        a.frequencyBand.toLowerCase().includes(query)
    );
  }, [antennas, searchQuery, value]);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setSearchQuery('');
  }, []);

  const handleSelect = useCallback(
    (antennaId: number) => {
      onChange(antennaId);
      handleClose();
    },
    [onChange, handleClose]
  );

  const isOpen = Boolean(anchorEl);

  return (
    <Container>
      <FieldLabel>
        {required && <span className="required">*</span>}
        {label}
      </FieldLabel>
      <SelectorButton
        onClick={handleOpen}
        $hasError={!!error}
        $hasValue={!!selectedAntenna}
      >
        <span>{selectedAntenna?.displayName || 'בחר אנטנה'}</span>
        <SearchIcon sx={{ fontSize: 18, color: (theme) => theme.customColors.text.disabled }} />
      </SelectorButton>
      {error && <ErrorText>{error}</ErrorText>}

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: (theme) => `0 8px 32px ${theme.customColors.border.divider}`,
            marginTop: '4px',
          },
        }}
      >
        <PopoverContent>
          <SearchContainer>
            <StyledSearchField
              fullWidth
              placeholder="חפש לפי שם תחנה, תחום תדר..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
          </SearchContainer>
          <OptionsList>
            {filteredAntennas.length === 0 ? (
              <NoResults>לא נמצאו אנטנות תואמות</NoResults>
            ) : (
              filteredAntennas.map((antenna) => (
                <OptionItem
                  key={antenna.id}
                  $selected={antenna.id === value}
                  $disabled={antenna.isDeleted}
                  onClick={() => !antenna.isDeleted && handleSelect(antenna.id)}
                >
                  <OptionName>
                    {antenna.displayName}
                    {antenna.isDeleted ? ' (נמחק)' : ''}
                  </OptionName>
                  <OptionDetails>
                    תחנה: {antenna.stationName} | תחום: {antenna.frequencyBand.toUpperCase()} | גודל:{' '}
                    {antenna.size}m
                  </OptionDetails>
                </OptionItem>
              ))
            )}
          </OptionsList>
        </PopoverContent>
      </Popover>
    </Container>
  );
};
