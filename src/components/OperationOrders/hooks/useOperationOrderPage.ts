import { useState, useCallback, useEffect } from 'react';
import { operationOrdersApi } from '../../../services/api';
import { 
  OperationOrder, 
  OperationOrderSummary, 
  CreateOperationOrderDto,
  CreateAllocationDto,
  SubAllocationPayload,
  AllocationData
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
  const { showSuccess, showError } = useToast();

  const [headerData, setHeaderData] = useState<Partial<CreateOperationOrderDto>>({});
  const [headerErrors, setHeaderErrors] = useState<{ name?: string; startDate?: string; startTime?: string; endDate?: string; endTime?: string }>({});
  const [editingAllocation, setEditingAllocation] = useState<AllocationData | undefined>(undefined);
  const [parentAllocation, setParentAllocation] = useState<AllocationData | undefined>(undefined);

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
        name: data.name,
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
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
  }, [fetchOrders]);

  const handleOrderClick = useCallback((id: number) => {
    fetchOrderDetails(id);
    setViewMode('view');
  }, [fetchOrderDetails]);

  const validateHeader = useCallback(() => {
    const errors: any = {};
    if (!headerData.name) errors.name = 'שדה חובה';
    if (!headerData.startDate) errors.startDate = 'שדה חובה';
    if (!headerData.startTime) errors.startTime = 'שדה חובה';
    if (!headerData.endDate) errors.endDate = 'שדה חובה';
    if (!headerData.endTime) errors.endTime = 'שדה חובה';
    
    setHeaderErrors(errors);
    return Object.keys(errors).length === 0;
  }, [headerData]);

  const handleSaveOrder = useCallback(async () => {
    if (!validateHeader()) return;

    setSaving(true);
    try {
      if (viewMode === 'create' || !selectedOrder) {
        const newOrder = await operationOrdersApi.create(headerData as CreateOperationOrderDto);
        await fetchOrders();
        await fetchOrderDetails(newOrder.id);
        setViewMode('view');
        setFormMode(null);
        showSuccess('פקודת מבצע נשמרה', 'פקודת המבצע נוספה בהצלחה למערכת');
      } else {
        await operationOrdersApi.update(selectedOrder.id, headerData);
        await fetchOrderDetails(selectedOrder.id);
        setFormMode(null);
        showSuccess('פקודת מבצע נשמרה', 'פקודת המבצע עודכנה בהצלחה במערכת');
      }
    } catch (error) {
      console.error('Failed to save order:', error);
      showError('שגיאה בשמירת פקודה', 'לא ניתן היה לשמור את פקודת המבצע. נסה שנית מאוחר יותר.');
    } finally {
      setSaving(false);
    }
  }, [headerData, viewMode, selectedOrder, validateHeader, fetchOrders, fetchOrderDetails, showSuccess, showError]);

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

  return {
    orders, selectedOrder,
    loading, saving,
    viewMode, setViewMode,
    formMode, setFormMode,
    headerData, setHeaderData,
    headerErrors,
    editingAllocation, setEditingAllocation,
    parentAllocation, setParentAllocation,
    handleOrderClick,
    handleSaveOrder,
    handleSaveAllocation,
    fetchOrders,
    fetchOrderDetails
  };
};
