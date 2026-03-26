import { useState, useEffect, useCallback, useRef } from 'react';
import { operationOrdersApi } from '../../services/api';
import { ConnectivityValidationResult } from '../../services/api/types';

interface UseAllocationValidationParams {
  terminalId?: number;
  transmissionAntennaId?: number;
  receptionAntennaId?: number;
  operationOrderId: number;
  excludeAllocationId?: number;
}

interface UseAllocationValidationResult {
  transmissionValidation: ConnectivityValidationResult | null;
  receptionValidation: ConnectivityValidationResult | null;
  loading: boolean;
}

export const useAllocationValidation = ({
  terminalId,
  transmissionAntennaId,
  receptionAntennaId,
  operationOrderId,
  excludeAllocationId,
}: UseAllocationValidationParams): UseAllocationValidationResult => {
  const [transmissionValidation, setTransmissionValidation] =
    useState<ConnectivityValidationResult | null>(null);
  const [receptionValidation, setReceptionValidation] =
    useState<ConnectivityValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const lastTransmissionKey = useRef<string>('');
  const lastReceptionKey = useRef<string>('');

  const validateTransmission = useCallback(async () => {
    if (!terminalId || !transmissionAntennaId) {
      setTransmissionValidation(null);
      lastTransmissionKey.current = '';
      return;
    }

    const key = `${terminalId}-${transmissionAntennaId}-${operationOrderId}-${excludeAllocationId}`;
    if (key === lastTransmissionKey.current) return;
    lastTransmissionKey.current = key;

    try {
      setLoading(true);
      const result = await operationOrdersApi.validateConnectivity(
        terminalId,
        transmissionAntennaId,
        operationOrderId,
        excludeAllocationId
      );
      setTransmissionValidation(result);
    } catch (error) {
      console.error('Failed to validate transmission connectivity:', error);
      setTransmissionValidation(null);
    } finally {
      setLoading(false);
    }
  }, [terminalId, transmissionAntennaId, operationOrderId, excludeAllocationId]);

  const validateReception = useCallback(async () => {
    if (!terminalId || !receptionAntennaId) {
      setReceptionValidation(null);
      lastReceptionKey.current = '';
      return;
    }

    const key = `${terminalId}-${receptionAntennaId}-${operationOrderId}-${excludeAllocationId}`;
    if (key === lastReceptionKey.current) return;
    lastReceptionKey.current = key;

    try {
      setLoading(true);
      const result = await operationOrdersApi.validateConnectivity(
        terminalId,
        receptionAntennaId,
        operationOrderId,
        excludeAllocationId
      );
      setReceptionValidation(result);
    } catch (error) {
      console.error('Failed to validate reception connectivity:', error);
      setReceptionValidation(null);
    } finally {
      setLoading(false);
    }
  }, [terminalId, receptionAntennaId, operationOrderId, excludeAllocationId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateTransmission();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [validateTransmission]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateReception();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [validateReception]);

  return {
    transmissionValidation,
    receptionValidation,
    loading,
  };
};
