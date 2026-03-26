import { useMemo } from 'react';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ConnectivityValidationResult } from '../../services/api/types';

const Container = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$compact ? '4px' : '8px')};
  margin-top: ${(props) => (props.$compact ? '0' : '12px')};
`;

const SectionLabel = styled.div`
  color: rgba(225, 234, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ValidationMessage = styled.div<{ $type: 'error' | 'warning' | 'info' | 'success' }>`
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.$type === 'error'
      ? 'rgba(239, 68, 68, 0.1)'
      : props.$type === 'warning'
      ? 'rgba(251, 191, 36, 0.1)'
      : props.$type === 'success'
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(59, 130, 246, 0.1)'};
  color: ${(props) =>
    props.$type === 'error'
      ? '#ef4444'
      : props.$type === 'warning'
      ? '#fbbf24'
      : props.$type === 'success'
      ? '#22c55e'
      : '#3b82f6'};
  border: 1px solid
    ${(props) =>
      props.$type === 'error'
        ? 'rgba(239, 68, 68, 0.3)'
        : props.$type === 'warning'
        ? 'rgba(251, 191, 36, 0.3)'
        : props.$type === 'success'
        ? 'rgba(34, 197, 94, 0.3)'
        : 'rgba(59, 130, 246, 0.3)'};
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
  min-width: 150px;
`;

const FieldLabel = styled.label`
  color: rgba(225, 234, 255, 0.6);
  font-size: 12px;
`;

const StyledSelect = styled(Select)`
  background: rgba(16, 33, 62, 0.6);
  border-radius: 6px;
  color: rgba(225, 234, 255, 0.9);

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(59, 130, 246, 0.3);
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(59, 130, 246, 0.5);
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3b82f6;
  }

  .MuiSelect-select {
    padding: 8px 12px;
    font-size: 13px;
    text-align: right;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(225, 234, 255, 0.6);
  font-size: 13px;
`;

interface ConnectivitySelectorProps {
  validation: ConnectivityValidationResult | null;
  loading: boolean;
  selectedConnectivityId?: number;
  selectedChannelNumber?: number;
  onConnectivityChange: (id: number | undefined) => void;
  onChannelChange: (channel: number | undefined) => void;
  label: string;
  compact?: boolean;
  connectivityError?: string;
  channelError?: string;
}

export const ConnectivitySelector = ({
  validation,
  loading,
  selectedConnectivityId,
  selectedChannelNumber,
  onConnectivityChange,
  onChannelChange,
  label,
  compact = false,
  connectivityError,
  channelError,
}: ConnectivitySelectorProps) => {
  const availableChannels = useMemo(() => {
    if (!validation || !selectedConnectivityId) return [];
    const channels = validation.availableChannels[selectedConnectivityId];
    return channels || [];
  }, [validation, selectedConnectivityId]);

  const allChannelsOccupied = useMemo(() => {
    if (!validation) return false;
    return validation.availableConnectivities.every((conn) => {
      const connChannels = validation.availableChannels[conn.id] || [];
      return connChannels.length === 0;
    });
  }, [validation]);

  if (loading) {
    return (
      <Container $compact={compact}>
        {!compact && <SectionLabel>{label}</SectionLabel>}
        <LoadingWrapper>
          <CircularProgress size={16} sx={{ color: '#3b82f6' }} />
          {compact ? '...' : 'בודק קישוריות...'}
        </LoadingWrapper>
      </Container>
    );
  }

  if (!validation) {
    return null;
  }

  if (!validation.connectivityRequired) {
    return (
      <Container $compact={compact}>
        {!compact && <SectionLabel>{label}</SectionLabel>}
        <ValidationMessage $type="success" style={compact ? { padding: '6px 10px', fontSize: '12px', marginTop: '30px' } : undefined}>
          <CheckCircleIcon sx={{ fontSize: compact ? 14 : 18 }} />
          {compact ? 'אותה תחנה' : 'אותה תחנה - לא נדרשת קישוריות'}
        </ValidationMessage>
      </Container>
    );
  }

  if (validation.error === 'no_connectivity') {
    return (
      <Container $compact={compact}>
        {!compact && <SectionLabel>{label}</SectionLabel>}
        <ValidationMessage $type="error" style={compact ? { padding: '6px 10px', fontSize: '12px' } : undefined}>
          <WarningIcon sx={{ fontSize: compact ? 14 : 18 }} />
          {compact ? 'אין קישוריות' : validation.message}
        </ValidationMessage>
      </Container>
    );
  }

  if (validation.error === 'channels_full') {
    return (
      <Container $compact={compact}>
        {!compact && <SectionLabel>{label}</SectionLabel>}
        <ValidationMessage $type="warning" style={compact ? { padding: '6px 10px', fontSize: '12px' } : undefined}>
          <WarningIcon sx={{ fontSize: compact ? 14 : 18 }} />
          {compact ? 'ערוצים תפוסים' : validation.message}
        </ValidationMessage>
      <FieldsRow>
        <FieldWrapper>
          {!compact && <FieldLabel>סוג קישוריות</FieldLabel>}
          <FormControl fullWidth error={!!connectivityError}>
            <StyledSelect
              value={selectedConnectivityId || ''}
              onChange={(e) => {
                onConnectivityChange(e.target.value as number);
                onChannelChange(undefined);
              }}
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                בחר קישוריות
              </MenuItem>
              {validation.availableConnectivities.map((conn) => (
                <MenuItem key={conn.id} value={conn.id}>
                  {conn.communicationType} ({conn.channelCount} ערוצים)
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </FieldWrapper>
      </FieldsRow>
      </Container>
    );
  }

  return (
    <Container $compact={compact}>
      {!compact && (
        <SectionLabel>
          {label}
          <InfoIcon sx={{ fontSize: 16, color: 'rgba(225, 234, 255, 0.4)' }} />
        </SectionLabel>
      )}
      {compact && (
        <FieldLabel style={{ marginBottom: '2px' }}>{label}</FieldLabel>
      )}
      {allChannelsOccupied && (
        <ValidationMessage $type="error" style={compact ? { padding: '6px 10px', fontSize: '12px', marginBottom: '4px' } : { marginBottom: '8px' }}>
          <WarningIcon sx={{ fontSize: compact ? 14 : 18 }} />
          {compact ? 'כל הערוצים תפוסים' : 'כל הערוצים בכל הקישוריות הזמינות תפוסים'}
        </ValidationMessage>
      )}
      <FieldsRow>
        <FieldWrapper>
          {!compact && <FieldLabel>סוג קישוריות</FieldLabel>}
          <FormControl fullWidth error={!!connectivityError}>
            <StyledSelect
              value={selectedConnectivityId || ''}
              onChange={(e) => {
                onConnectivityChange(e.target.value as number);
                onChannelChange(undefined);
              }}
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                {compact ? 'קישוריות' : 'בחר קישוריות'}
              </MenuItem>
              {validation.availableConnectivities.map((conn) => {
                const connChannels = validation.availableChannels[conn.id] || [];
                return (
                  <MenuItem key={conn.id} value={conn.id}>
                    {conn.communicationType} ({connChannels.length}/{conn.channelCount})
                  </MenuItem>
                );
              })}
            </StyledSelect>
            {connectivityError && <FormHelperText>{connectivityError}</FormHelperText>}
          </FormControl>
        </FieldWrapper>

        {selectedConnectivityId && (
          <FieldWrapper>
            {!compact && <FieldLabel>ערוץ</FieldLabel>}
            <FormControl fullWidth error={!!channelError}>
              <StyledSelect
                value={selectedChannelNumber || ''}
                onChange={(e) => onChannelChange(e.target.value as number)}
                size="small"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {compact ? 'ערוץ' : 'בחר ערוץ'}
                </MenuItem>
                {availableChannels.map((channel) => (
                  <MenuItem key={channel} value={channel}>
                    {compact ? channel : `ערוץ ${channel}`}
                  </MenuItem>
                ))}
              </StyledSelect>
              {channelError && <FormHelperText>{channelError}</FormHelperText>}
            </FormControl>
          </FieldWrapper>
        )}
      </FieldsRow>
    </Container>
  );
};
