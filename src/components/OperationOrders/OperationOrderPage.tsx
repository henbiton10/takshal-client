import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  OperationOrder, 
  OperationOrderSummary,
  CreateOperationOrderDto,
  AllocationData,
  CreateAllocationDto,
  SubAllocationPayload,
} from '../../services/api/types';
import { operationOrdersApi } from '../../services/api';
import { OperationOrderHeader } from './OperationOrderHeader';
import { AllocationForm } from './AllocationForm';
import { AllocationsGrid } from './AllocationsGrid';
import { ConflictPopup } from './ConflictPopup';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog/ConfirmDialog';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  gap: 20px;
  direction: rtl;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: rgba(225, 234, 255, 0.9);
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled(Button)<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: none;
  font-size: 14px;

  & .MuiSvgIcon-root {
    color: inherit;
  }

  ${(props) => {
    if (props.$variant === 'primary') {
      return `
        background: rgba(38, 80, 148, 0.35);
        color: white !important;
        border: 1px solid rgba(59, 130, 246, 0.5);
        &:hover {
          background: rgba(59, 130, 246, 0.5);
          border-color: rgba(59, 130, 246, 0.7);
        }
        &:disabled {
          background: rgba(59, 130, 246, 0.15);
          color: rgba(225, 234, 255, 0.4) !important;
        }
      `;
    }
    if (props.$variant === 'danger') {
      return `
        background: rgba(239, 68, 68, 0.25);
        color: #ef4444 !important;
        border: 1px solid rgba(239, 68, 68, 0.4);
        &:hover {
          background: rgba(239, 68, 68, 0.35);
          border-color: rgba(239, 68, 68, 0.6);
        }
      `;
    }
    return `
      background: rgba(51, 65, 85, 0.9);
      color: white !important;
      border: 1px solid rgba(100, 116, 139, 0.5);
      &:hover {
        background: rgba(71, 85, 105, 1);
        border-color: rgba(148, 163, 184, 0.6);
      }
    `;
  }}
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderCard = styled.div<{ $selected?: boolean }>`
  padding: 16px 20px;
  background: ${(props) =>
    props.$selected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(6, 15, 35, 0.9)'};
  border: 1px solid
    ${(props) =>
      props.$selected ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(16, 33, 62, 0.6);
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OrderName = styled.span`
  color: rgba(225, 234, 255, 0.9);
  font-size: 15px;
  font-weight: 500;
`;

const OrderDate = styled.span`
  color: rgba(225, 234, 255, 0.5);
  font-size: 13px;
`;

const AllocationsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  color: rgba(225, 234, 255, 0.8);
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: rgba(225, 234, 255, 0.5);
  gap: 16px;
`;

const EmptyIcon = styled(ListIcon)`
  font-size: 48px;
  opacity: 0.5;
`;

type ViewMode = 'list' | 'create' | 'view' | 'edit';
type FormMode = 'header' | 'allocation' | 'sub-allocation' | null;

export const OperationOrderPage = () => {
  const [orders, setOrders] = useState<OperationOrderSummary[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OperationOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [formMode, setFormMode] = useState<FormMode>(null);
  
  const [headerData, setHeaderData] = useState<Partial<CreateOperationOrderDto>>({});
  const [headerErrors, setHeaderErrors] = useState<{ name?: string; date?: string; time?: string }>({});
  
  const [editingAllocation, setEditingAllocation] = useState<AllocationData | undefined>();
  const [parentAllocation, setParentAllocation] = useState<AllocationData | undefined>();
  
  const [conflictPopup, setConflictPopup] = useState<{
    open: boolean;
    conflicts: Array<{ allocation: AllocationData; type: 'transmission' | 'reception'; message: string }>;
  }>({ open: false, conflicts: [] });
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: 'order' | 'allocation';
    id: number;
    name: string;
  }>({ open: false, type: 'order', id: 0, name: '' });

  const fetchOrders = useCallback(async () => {
    try {
      const data = await operationOrdersApi.getAllSummary();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderDetails = useCallback(async (orderId: number) => {
    try {
      const data = await operationOrdersApi.getOne(orderId);
      setSelectedOrder(data);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateNew = useCallback(() => {
    setViewMode('create');
    setFormMode('header');
    setHeaderData({});
    setSelectedOrder(null);
  }, []);

  const handleSelectOrder = useCallback(
    async (order: OperationOrderSummary) => {
      await fetchOrderDetails(order.id);
      setViewMode('view');
      setFormMode(null);
    },
    [fetchOrderDetails]
  );

  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setSelectedOrder(null);
    setFormMode(null);
    setHeaderData({});
    setEditingAllocation(undefined);
    setParentAllocation(undefined);
  }, []);

  const validateHeader = useCallback((): boolean => {
    const errors: { name?: string; date?: string; time?: string } = {};
    
    if (!headerData.name?.trim()) {
      errors.name = 'שם פקודת מבצע הינו שדה חובה';
    }
    if (!headerData.date) {
      errors.date = 'תאריך הינו שדה חובה';
    }
    if (!headerData.time) {
      errors.time = 'שעה הינה שדה חובה';
    }
    
    setHeaderErrors(errors);
    return Object.keys(errors).length === 0;
  }, [headerData]);

  const handleSaveOrder = useCallback(async () => {
    if (!validateHeader()) return;
    
    setSaving(true);
    try {
      if (viewMode === 'create') {
        const newOrder = await operationOrdersApi.create(headerData as CreateOperationOrderDto);
        await fetchOrders();
        await fetchOrderDetails(newOrder.id);
        setViewMode('view');
        setFormMode(null);
      } else if (selectedOrder) {
        await operationOrdersApi.update(selectedOrder.id, headerData);
        await fetchOrders();
        await fetchOrderDetails(selectedOrder.id);
        setViewMode('view');
        setFormMode(null);
      }
    } catch (error) {
      console.error('Failed to save order:', error);
    } finally {
      setSaving(false);
    }
  }, [viewMode, headerData, selectedOrder, validateHeader, fetchOrders, fetchOrderDetails]);

  const handleAddAllocation = useCallback(() => {
    setFormMode('allocation');
    setEditingAllocation(undefined);
    setParentAllocation(undefined);
  }, []);

  const handleEditAllocation = useCallback((allocation: AllocationData) => {
    setFormMode('allocation');
    setEditingAllocation(allocation);
    setParentAllocation(undefined);
  }, []);

  const handleAddSubAllocation = useCallback((parent: AllocationData) => {
    setFormMode('sub-allocation');
    setEditingAllocation(undefined);
    setParentAllocation(parent);
  }, []);

  const handleSaveAllocation = useCallback(
    async (data: CreateAllocationDto, subAllocations?: SubAllocationPayload[], removedSubAllocationIds?: number[]) => {
      if (!selectedOrder) return;

      try {
        let parentId: number | undefined;

        if (editingAllocation) {
          await operationOrdersApi.updateAllocation(editingAllocation.id, data);
          parentId = editingAllocation.id;
        } else if (parentAllocation) {
          await operationOrdersApi.addSubAllocation(parentAllocation.id, data);
        } else {
          const newAllocation = await operationOrdersApi.addAllocation(selectedOrder.id, data);
          parentId = newAllocation.id;
        }

        if (removedSubAllocationIds && removedSubAllocationIds.length > 0) {
          const deletePromises = removedSubAllocationIds.map((id) =>
            operationOrdersApi.deleteAllocation(id)
          );
          await Promise.all(deletePromises);
        }

        if (subAllocations && subAllocations.length > 0 && parentId) {
          const subPromises = subAllocations.map((subData) => {
            if (subData.existingId) {
              return operationOrdersApi.updateAllocation(subData.existingId, subData);
            } else {
              return operationOrdersApi.addSubAllocation(parentId!, subData);
            }
          });
          await Promise.all(subPromises);
        }

        await fetchOrderDetails(selectedOrder.id);
        setFormMode(null);
        setEditingAllocation(undefined);
        setParentAllocation(undefined);
      } catch (error) {
        console.error('Failed to save allocation:', error);
        throw error;
      }
    },
    [selectedOrder, editingAllocation, parentAllocation, fetchOrderDetails]
  );

  const handleCancelAllocationForm = useCallback(() => {
    setFormMode(null);
    setEditingAllocation(undefined);
    setParentAllocation(undefined);
  }, []);

  const handleDeleteAllocation = useCallback((allocationId: number) => {
    const allocation = selectedOrder?.allocations?.find((a) => a.id === allocationId);
    if (allocation) {
      setDeleteDialog({
        open: true,
        type: 'allocation',
        id: allocationId,
        name: `#${allocation.orderNumber}${allocation.subOrderNumber ? `.${allocation.subOrderNumber}` : ''}`,
      });
    }
  }, [selectedOrder]);

  const handleReorderAllocations = useCallback(async () => {
    if (selectedOrder) {
      await fetchOrderDetails(selectedOrder.id);
    }
  }, [selectedOrder, fetchOrderDetails]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteDialog.type === 'allocation') {
        await operationOrdersApi.deleteAllocation(deleteDialog.id);
        if (selectedOrder) {
          await fetchOrderDetails(selectedOrder.id);
        }
      } else if (deleteDialog.type === 'order') {
        await operationOrdersApi.delete(deleteDialog.id);
        await fetchOrders();
        handleBackToList();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleteDialog({ open: false, type: 'order', id: 0, name: '' });
    }
  }, [deleteDialog, selectedOrder, fetchOrderDetails, fetchOrders, handleBackToList]);

  const handleDeleteOrder = useCallback(() => {
    if (selectedOrder) {
      setDeleteDialog({
        open: true,
        type: 'order',
        id: selectedOrder.id,
        name: selectedOrder.name,
      });
    }
  }, [selectedOrder]);

  const existingAllocations = useMemo(() => {
    return selectedOrder?.allocations?.filter((a) => !a.isDeleted) || [];
  }, [selectedOrder]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <CircularProgress size={40} sx={{ color: '#3b82f6' }} />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (viewMode === 'list') {
    return (
      <PageContainer>
        <PageHeader>
          <Title>פקודות מבצע</Title>
          <HeaderActions>
            <ActionButton $variant="primary" onClick={handleCreateNew}>
              <AddIcon sx={{ fontSize: 20 }} />
              פקודה חדשה
            </ActionButton>
          </HeaderActions>
        </PageHeader>

        <ContentSection>
          {orders.length === 0 ? (
            <EmptyState>
              <EmptyIcon />
              <span>אין פקודות מבצע</span>
              <ActionButton $variant="primary" onClick={handleCreateNew}>
                <AddIcon sx={{ fontSize: 20 }} />
                יצירת פקודה ראשונה
              </ActionButton>
            </EmptyState>
          ) : (
            <OrdersList>
              {orders.map((order) => (
                <OrderCard key={order.id} onClick={() => handleSelectOrder(order)}>
                  <OrderInfo>
                    <OrderName>{order.name}</OrderName>
                    <OrderDate>
                      {order.date} | {order.time}
                    </OrderDate>
                  </OrderInfo>
                  <ArrowBackIcon
                    sx={{
                      fontSize: 20,
                      color: 'rgba(225, 234, 255, 0.4)',
                      transform: 'rotate(180deg)',
                    }}
                  />
                </OrderCard>
              ))}
            </OrdersList>
          )}
        </ContentSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <Title>
          {viewMode === 'create' ? 'יצירת פקודת מבצע חדשה' : selectedOrder?.name || ''}
        </Title>
        <HeaderActions>
          <ActionButton $variant="secondary" onClick={handleBackToList}>
            <ListIcon sx={{ fontSize: 20 }} />
            חזרה לרשימה
          </ActionButton>
          {viewMode === 'view' && selectedOrder && (
            <ActionButton
              $variant="danger"
              onClick={handleDeleteOrder}
            >
              מחק פקודה
            </ActionButton>
          )}
        </HeaderActions>
      </PageHeader>

      <ContentSection>
        {(viewMode === 'create' || formMode === 'header') && (
          <OperationOrderHeader
            data={headerData}
            onChange={setHeaderData}
            errors={headerErrors}
            disabled={saving}
            onSave={handleSaveOrder}
            onCancel={() => {
              setFormMode(null);
              if (viewMode === 'edit') {
                setViewMode('view');
              }
            }}
            saving={saving}
          />
        )}

        {viewMode === 'view' && selectedOrder && formMode !== 'header' && (
          <OperationOrderHeader
            data={{
              name: selectedOrder.name,
              date: selectedOrder.date,
              time: selectedOrder.time,
            }}
            onChange={() => {}}
            disabled={true}
            onEdit={() => {
              setHeaderData({
                name: selectedOrder.name,
                date: selectedOrder.date,
                time: selectedOrder.time,
              });
              setViewMode('edit');
              setFormMode('header');
            }}
          />
        )}

        {(viewMode === 'view' || viewMode === 'edit') && selectedOrder && (
          <AllocationsSection>
            <SectionHeader>
              <SectionTitle>הקצאות ({existingAllocations.length})</SectionTitle>
              {formMode !== 'allocation' && formMode !== 'sub-allocation' && (
                <ActionButton $variant="primary" onClick={handleAddAllocation}>
                  <AddIcon sx={{ fontSize: 20 }} />
                  הוסף הקצאה
                </ActionButton>
              )}
            </SectionHeader>

            {(formMode === 'allocation' || formMode === 'sub-allocation') && (
              <AllocationForm
                operationOrderId={selectedOrder.id}
                editingAllocation={editingAllocation}
                parentAllocation={parentAllocation}
                onSave={handleSaveAllocation}
                onCancel={handleCancelAllocationForm}
                existingAllocations={existingAllocations}
                currentOrderNumber={
                  editingAllocation?.orderNumber ||
                  existingAllocations.filter((a) => !a.parentAllocationId).length + 1
                }
              />
            )}

            <AllocationsGrid
              allocations={existingAllocations}
              onEdit={handleEditAllocation}
              onDelete={handleDeleteAllocation}
              onAddSubAllocation={handleAddSubAllocation}
              onReorder={handleReorderAllocations}
            />
          </AllocationsSection>
        )}
      </ContentSection>

      <ConflictPopup
        open={conflictPopup.open}
        conflicts={conflictPopup.conflicts}
        onSaveAnyway={() => {
          setConflictPopup({ open: false, conflicts: [] });
        }}
        onCancel={() => setConflictPopup({ open: false, conflicts: [] })}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        title={deleteDialog.type === 'order' ? 'מחיקת פקודת מבצע' : 'מחיקת הקצאה'}
        message={`האם אתה בטוח שברצונך למחוק את ${
          deleteDialog.type === 'order' ? 'פקודת המבצע' : 'ההקצאה'
        } "${deleteDialog.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ open: false, type: 'order', id: 0, name: '' })}
      />
    </PageContainer>
  );
};
