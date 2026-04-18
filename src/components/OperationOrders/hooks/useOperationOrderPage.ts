import { useState, useCallback, useEffect, useMemo } from 'react';
import { operationOrdersApi, terminalsApi, satellitesApi } from '../../../services/api';
import {
  OperationOrder,
  OperationOrderSummary,
  CreateOperationOrderDto,
  CreateAllocationDto,
  SubAllocationPayload,
  AllocationData,
  Terminal,
  SatelliteSummary,
  AntennaWithStation
} from '../../../services/api/types';
import { useToast } from '../../../shared/components/ui/Toast';

export type ViewMode = 'list' | 'create' | 'view';
export type FormMode = 'header' | 'allocation' | 'sub-allocation' | null;

export const useOperationOrderPage = () => {
  const [orders, setOrders] = useState<OperationOrderSummary[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OperationOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const { showSuccess, showError } = useToast();
  const [headerData, setHeaderData] = useState<Partial<CreateOperationOrderDto> & { id?: number; allocations?: any[] }>({});
  const [editingAllocation, setEditingAllocation] = useState<AllocationData | undefined>(undefined);
  const [parentAllocation, setParentAllocation] = useState<AllocationData | undefined>(undefined);
  const [targetAllocationId, setTargetAllocationId] = useState<number | null>(null);

  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [satellites, setSatellites] = useState<SatelliteSummary[]>([]);
  const [antennas, setAntennas] = useState<AntennaWithStation[]>([]);

  const fetchMetadata = useCallback(async () => {
    try {
      const [tData, sData, aData] = await Promise.all([
        terminalsApi.getAll(),
        satellitesApi.getAllSummary(),
        operationOrdersApi.getAntennasWithStationInfo()
      ]);
      setTerminals(tData);
      setSatellites(sData);
      setAntennas(aData);
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await operationOrdersApi.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      showError('שגיאה', 'לא ניתן היה לטעון פקודות מבצע');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchOrderDetails = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await operationOrdersApi.getOne(id);
      setSelectedOrder(data);
      setHeaderData({
        id: data.id,
        name: data.name,
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
        allocations: (data.allocations || [])
          .filter(alc => !alc.parentAllocationId) // Only root allocations
          .map(alc => ({
            id: alc.id,
            terminalId: alc.terminal?.id || alc.terminalId,
            transmissionSatelliteId: alc.transmissionSatellite?.id || alc.transmissionSatelliteId,
            transmissionAntennaId: alc.transmissionAntenna?.id || alc.transmissionAntennaId,
            transmissionFrequency: alc.transmissionFrequency ? Number(alc.transmissionFrequency) : null,
            receptionSatelliteId: alc.receptionSatellite?.id || alc.receptionSatelliteId,
            receptionAntennaId: alc.receptionAntenna?.id || alc.receptionAntennaId,
            receptionFrequency: alc.receptionFrequency ? Number(alc.receptionFrequency) : null,
            tailNumbers: alc.tailNumbers || [],
            subAllocations: (alc.subAllocations || []).map(sub => ({
              id: sub.id,
              terminalId: sub.terminal?.id || sub.terminalId,
              transmissionSatelliteId: sub.transmissionSatellite?.id || sub.transmissionSatelliteId,
              transmissionAntennaId: sub.transmissionAntenna?.id || sub.transmissionAntennaId,
              transmissionFrequency: sub.transmissionFrequency ? Number(sub.transmissionFrequency) : null,
              receptionSatelliteId: sub.receptionSatellite?.id || sub.receptionSatelliteId,
              receptionAntennaId: sub.receptionAntenna?.id || sub.receptionAntennaId,
              receptionFrequency: sub.receptionFrequency ? Number(sub.receptionFrequency) : null,
              tailNumbers: sub.tailNumbers || [],
            }))
          })) as any
      });
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      showError('שגיאה', 'לא ניתן היה לטעון את פרטי הפקודה');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchOrders();
    fetchMetadata();
  }, [fetchOrders, fetchMetadata]);

  const handleOrderClick = useCallback(async (id: number) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null);
      setSelectedOrder(null);
    } else {
      setExpandedOrderId(id);
      await fetchOrderDetails(id);
    }
  }, [expandedOrderId, fetchOrderDetails]);


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

  const handleDeleteOrder = useCallback(async () => {
    if (!orderToDelete) return;
    try {
      await operationOrdersApi.delete(orderToDelete);
      await fetchOrders();
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
      showSuccess('נמחק', 'פקודת המבצע נמחקה בהצלחה');
    } catch (error) {
      console.error('Failed to delete order:', error);
      showError('שגיאה', 'לא ניתן היה למחוק את פקודת המבצע');
    }
  }, [orderToDelete, fetchOrders, showSuccess, showError]);

  const openDeleteDialog = useCallback((id: number) => {
    setOrderToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setOrderToDelete(null);
    setDeleteDialogOpen(false);
  }, []);

  const handleSaveOrder = useCallback(async (formData: any) => {
    // Basic validation for header
    if (!formData.name || !formData.startDate || !formData.startTime) {
      showError('שגיאה', 'יש למלא את כל שדות החובה של הפקודה');
      return;
    }

    setSaving(true);
    try {
      let orderId: number;
      if (viewMode === 'create' || !selectedOrder) {
        const hData = {
          name: formData.name,
          startDate: formData.startDate,
          startTime: formData.startTime,
          endDate: formData.endDate,
          endTime: formData.endTime
        };
        const newOrder = await operationOrdersApi.create(hData as CreateOperationOrderDto);
        orderId = newOrder.id;
      } else {
        // Only update header fields
        const { name, startDate, startTime, endDate, endTime } = formData;
        await operationOrdersApi.update(selectedOrder.id, {
          name,
          startDate,
          startTime,
          endDate,
          endTime
        });
        orderId = selectedOrder.id;
      }

      // Save allocations if any
      if (formData.allocations && formData.allocations.length > 0) {
        const reorderPayload: Array<{ id: number; orderNumber: number; subOrderNumber: number | null }> = [];
        
        for (let i = 0; i < formData.allocations.length; i++) {
          const alc = formData.allocations[i];
          // Clean up the allocation data for the API
          const cleanAlc = {
            terminalId: Number(alc.terminalId),
            transmissionSatelliteId: Number(alc.transmissionSatelliteId),
            transmissionAntennaId: Number(alc.transmissionAntennaId),
            transmissionFrequency: Number(alc.transmissionFrequency),
            receptionSatelliteId: Number(alc.receptionSatelliteId),
            receptionAntennaId: Number(alc.receptionAntennaId),
            receptionFrequency: Number(alc.receptionFrequency),
            transmissionConnectivityId: alc.transmissionConnectivityId ? Number(alc.transmissionConnectivityId) : null,
            receptionConnectivityId: alc.receptionConnectivityId ? Number(alc.receptionConnectivityId) : null,
            transmissionChannelNumber: alc.transmissionChannelNumber ? Number(alc.transmissionChannelNumber) : null,
            receptionChannelNumber: alc.receptionChannelNumber ? Number(alc.receptionChannelNumber) : null,
            tailNumbers: alc.tailNumbers || [],
            notes: alc.notes || null,
          };

          let primaryId: number;
          // If it's a new allocation (no id), add it
          if (!alc.id) {
            const newAlc = await operationOrdersApi.addAllocation(orderId, cleanAlc as any);
            primaryId = newAlc.id;
          } else {
            await operationOrdersApi.updateAllocation(alc.id, cleanAlc as any);
            primaryId = alc.id;
          }
          
          reorderPayload.push({ id: primaryId, orderNumber: i + 1, subOrderNumber: null });

          // Handle sub-allocations
          if (alc.subAllocations && alc.subAllocations.length > 0) {
            for (let j = 0; j < alc.subAllocations.length; j++) {
              const sub = alc.subAllocations[j];
              const cleanSub = {
                terminalId: Number(sub.terminalId || cleanAlc.terminalId),
                transmissionSatelliteId: Number(sub.transmissionSatelliteId),
                transmissionAntennaId: Number(sub.transmissionAntennaId),
                transmissionFrequency: Number(sub.transmissionFrequency),
                receptionSatelliteId: Number(sub.receptionSatelliteId),
                receptionAntennaId: Number(sub.receptionAntennaId),
                receptionFrequency: Number(sub.receptionFrequency),
                transmissionConnectivityId: sub.transmissionConnectivityId ? Number(sub.transmissionConnectivityId) : null,
                receptionConnectivityId: sub.receptionConnectivityId ? Number(sub.receptionConnectivityId) : null,
                transmissionChannelNumber: sub.transmissionChannelNumber ? Number(sub.transmissionChannelNumber) : null,
                receptionChannelNumber: sub.receptionChannelNumber ? Number(sub.receptionChannelNumber) : null,
                tailNumbers: sub.tailNumbers || [],
              };

              let subId: number;
              if (sub.id) {
                await operationOrdersApi.updateAllocation(sub.id, cleanSub as any);
                subId = sub.id;
              } else {
                const newSub = await operationOrdersApi.addSubAllocation(primaryId, cleanSub as any);
                subId = newSub.id;
              }
              
              reorderPayload.push({ id: subId, orderNumber: i + 1, subOrderNumber: j + 1 });
            }
          }
        }
        
        // Persist the UI order to the database
        await operationOrdersApi.reorderAllocations(reorderPayload);
      }

      await fetchOrders();
      if (orderId) await fetchOrderDetails(orderId);

      setViewMode('list');
      setFormMode(null);
      showSuccess('נשמר בהצלחה', 'פקודת המבצע וההקצאות נשמרו');
    } catch (error) {
      console.error('Failed to save order:', error);
      showError('שגיאה בשמירה', 'לא ניתן היה לשמור את השינויים');
    } finally {
      setSaving(false);
    }
  }, [viewMode, selectedOrder, fetchOrders, fetchOrderDetails, showSuccess, showError]);

  const handleDeleteAllocation = useCallback(
    async (allocationId: number) => {
      if (!selectedOrder) return;
      try {
        await operationOrdersApi.deleteAllocation(allocationId);
        await fetchOrderDetails(selectedOrder.id);
        showSuccess('נמחק', 'הקצאה נמחקה בהצלחה');
      } catch (error) {
        console.error('Failed to delete allocation:', error);
        showError('שגיאה', 'לא ניתן היה למחוק את ההקצאה');
      }
    },
    [selectedOrder, fetchOrderDetails, showSuccess, showError]
  );

  const handleSaveAllocation = useCallback(
    async (data: CreateAllocationDto, subAllocations?: SubAllocationPayload[], removedSubAllocationIds?: number[]) => {
      if (!selectedOrder) return;

      try {
        let parentId: number;
        if (editingAllocation) {
          await operationOrdersApi.updateAllocation(editingAllocation.id, data);
          parentId = editingAllocation.id;
        } else if (parentAllocation) {
          await operationOrdersApi.addSubAllocation(parentAllocation.id, data);
          parentId = 0;
        } else {
          const newAllocation = await operationOrdersApi.addAllocation(selectedOrder.id, data);
          parentId = newAllocation.id;
        }

        if (parentId && subAllocations && subAllocations.length > 0) {
          for (const sub of subAllocations) {
            if (sub.existingId && typeof sub.existingId === 'number') {
              await operationOrdersApi.updateAllocation(sub.existingId, sub);
            } else {
              await operationOrdersApi.addSubAllocation(parentId, sub);
            }
          }
        }

        if (removedSubAllocationIds && removedSubAllocationIds.length > 0) {
          for (const id of removedSubAllocationIds) {
            await operationOrdersApi.deleteAllocation(id);
          }
        }

        await fetchOrderDetails(selectedOrder.id);
        setFormMode(null);
        setEditingAllocation(undefined);
        setParentAllocation(undefined);

        const isUpdate = !!editingAllocation;
        showSuccess(
          'הקצאה נשמרה',
          `הקצאה ${isUpdate ? 'עודכנה' : 'נוספה'} בהצלחה לפקודת המבצע`
        );
      } catch (error) {
        console.error('Failed to save allocation:', error);
        showError('שגיאה בשמירת הקצאה', 'לא ניתן היה לשמור את ההקצאה. נסה שנית מאוחר יותר.');
        throw error;
      }
    },
    [selectedOrder, editingAllocation, parentAllocation, fetchOrderDetails, showSuccess, showError]
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter(order => order.name?.toLowerCase().includes(query));
  }, [searchQuery, orders]);

  return {
    orders, filteredOrders, searchQuery, setSearchQuery,
    selectedOrder, setSelectedOrder,
    loading, saving,
    viewMode, setViewMode,
    formMode, setFormMode,
    expandedOrderId, setExpandedOrderId,
    headerData, setHeaderData,
    editingAllocation, setEditingAllocation,
    parentAllocation, setParentAllocation,
    handleOrderClick,
    handleDeleteOrder,
    handleDeleteAllocation,
    deleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleSaveOrder,
    handleSaveAllocation,
    fetchOrders,
    fetchOrderDetails,
    targetAllocationId, setTargetAllocationId,
    terminals,
    satellites,
    antennas
  };
};
