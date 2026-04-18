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
  color: rgba(225, 234, 255, 0.7);
  font-size: 13px;
  font-weight: 500;

  .required {
    color: #ef4444;
    margin-right: 4px;
  }
`;

const SelectorButton = styled.div<{ $hasError?: boolean; $hasValue?: boolean }>`
  background: rgba(16, 33, 62, 0.6);
  border: 1px solid
    ${(props) =>
      props.$hasError
        ? '#ef4444'
        : props.$hasValue
        ? 'rgba(59, 130, 246, 0.5)'
        : 'rgba(59, 130, 246, 0.3)'};
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${(props) =>
    props.$hasValue ? 'rgba(225, 234, 255, 0.9)' : 'rgba(225, 234, 255, 0.4)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.7);
  }
`;

const SearchContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
`;

const StyledSearchField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(16, 33, 62, 0.8);
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
  }

  .MuiInputBase-input {
    padding: 8px 12px;
    font-size: 13px;
    direction: rtl;
  }

  .MuiInputAdornment-root {
    color: rgba(225, 234, 255, 0.5);
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
  background: ${(props) => (props.$selected ? 'rgba(59, 130, 246, 0.2)' : 'transparent')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  &:hover {
    background: ${(props) => (props.$disabled ? 'transparent' : 'rgba(59, 130, 246, 0.1)')};
  }
`;

const OptionName = styled.span`
  color: rgba(225, 234, 255, 0.9);
  font-size: 14px;
`;

const OptionDetails = styled.span`
  color: rgba(225, 234, 255, 0.5);
  font-size: 12px;
`;

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: rgba(225, 234, 255, 0.5);
  font-size: 13px;
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const PopoverContent = styled.div`
  width: 350px;
  background: rgba(6, 15, 35, 0.98);
  border: 1px solid rgba(59, 130, 246, 0.3);
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
        <SearchIcon sx={{ fontSize: 18, color: 'rgba(225, 234, 255, 0.5)' }} />
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
