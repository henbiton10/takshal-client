import { useCallback, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import styled from 'styled-components';
import { PageLayout } from '../../shared/components/PageLayout';
import { OperationOrderCard } from './OperationOrderCard';
import { OperationOrderDetails } from './OperationOrderDetails';
import { OperationOrderHeader } from './OperationOrderHeader';
import { AllocationForm } from './AllocationForm';
import { LoadingSpinner } from '../../shared/components/ui/LoadingSpinner';
import { BigEmptyState } from '../../shared/components/ui/BigEmptyState';
import { useOperationOrderPage } from './hooks/useOperationOrderPage';
import { AddResourceButton } from '../ResourcesManagement/ResourcesManagement';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog/ConfirmDialog';
import { usePageStatus } from '../../contexts/PageStatusContext';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.mode === 'light' ? theme.customColors.background.default : '#1c2439'};
  border: 1px solid ${({ theme }) => theme.palette.mode === 'light' ? theme.customColors.border.primary : '#305088'};
  border-radius: 21px;
  padding: 0 16px;
  width: 190px;
  height: 38px;
  flex-shrink: 0;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.customColors.primary.main};
    background: ${({ theme }) => theme.palette.mode === 'light' ? theme.customColors.background.paper : '#1c2439'};
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.customColors.text.secondary};
  outline: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  text-align: right;
  direction: rtl;
  &::placeholder { color: ${({ theme }) => theme.customColors.text.placeholder}; font-weight: 600; }
`;

export const OperationOrderPage = () => {
  const { setPageStatus } = usePageStatus();
  const {
    orders, filteredOrders, searchQuery, setSearchQuery,
    selectedOrder, setSelectedOrder,
    loading, saving,
    viewMode, setViewMode,
    formMode, setFormMode,
    expandedOrderId, setExpandedOrderId,
    headerData, setHeaderData,
    editingAllocation,
    parentAllocation,
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
  } = useOperationOrderPage();

  useEffect(() => {
    const isFormActive = viewMode === 'create' || formMode !== null;
    setPageStatus('operations', isFormActive);
  }, [viewMode, formMode, setPageStatus]);

  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setFormMode(null);
    setExpandedOrderId(null);
    setSelectedOrder(null);
    fetchOrders();
  }, [fetchOrders, setViewMode, setFormMode, setExpandedOrderId, setSelectedOrder]);

  const handleCreateNew = useCallback(() => {
    const now = new Date();
    const future = new Date(now.getTime() + 10 * 60000);

    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formatTime = (d: Date) => {
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    setViewMode('create');
    setFormMode('header');
    setSelectedOrder(null);
    setExpandedOrderId(null);
    setHeaderData({
      name: '',
      startDate: formatDate(now),
      startTime: formatTime(now),
      endDate: formatDate(future),
      endTime: formatTime(future),
      allocations: []
    });
  }, [setViewMode, setFormMode, setHeaderData, setSelectedOrder, setExpandedOrderId]);

  const handleAddSubAllocation = useCallback((parent: any) => {
    setViewMode('view');
    setFormMode('header');
    setTargetAllocationId(parent.id);
  }, [setViewMode, setFormMode, setTargetAllocationId]);

  const handleEditAllocation = useCallback((allocation: any) => {
    // Instead of opening the individual AllocationForm, 
    // we go to the main order edit view and scroll to the specific allocation
    setViewMode('view');
    setFormMode('header');
    setTargetAllocationId(allocation.id);
  }, [setViewMode, setFormMode, setTargetAllocationId]);

  const renderContent = () => {
    if (loading && orders.length === 0) return <LoadingSpinner />;

    if (viewMode === 'list') {
      if (orders.length === 0) {
        return (
          <BigEmptyState
            icon={<ListAltIcon sx={{ fontSize: 48, color: (theme) => theme.customColors.text.secondary }} />}
            title="טרם הוגדרו פקודות מבצע"
            subtitle="כדי להתחיל, יש ליצור פקודה חדשה."
          />
        );
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, overflowY: 'auto', direction: 'ltr' }}>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px', direction: 'rtl' }}>
            {filteredOrders.map(order => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <OperationOrderCard
                  key={order.id}
                  order={order}
                  onClick={() => handleOrderClick(order.id)}
                  onEdit={(order) => {
                    fetchOrderDetails(order.id);
                    setViewMode('view');
                    setFormMode('header');
                  }}
                  onDelete={openDeleteDialog}
                  isExpanded={isExpanded && !!selectedOrder && selectedOrder.id === order.id}
                >
                  {isExpanded && selectedOrder && selectedOrder.id === order.id ? (
                    <OperationOrderDetails
                      order={selectedOrder}
                      onEditHeader={() => setFormMode('header')}
                      onEditAllocation={handleEditAllocation}
                      onAddSubAllocation={handleAddSubAllocation}
                      onRefresh={() => fetchOrderDetails(selectedOrder.id)}
                      onDelete={handleDeleteAllocation}
                      options={{ terminals, satellites, antennas }}
                      hideHeader={true}
                    />
                  ) : isExpanded ? (
                    <LoadingSpinner />
                  ) : null}
                </OperationOrderCard>
              );
            })}
          </div>
        </div>
      );
    }

    if (viewMode === 'create' || formMode === 'header') {
      return (
        <div style={{ padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <OperationOrderHeader
            data={headerData}
            onChange={setHeaderData}
            onSave={handleSaveOrder}
            onCancel={handleBackToList}
            saving={saving}
            options={{ terminals, satellites, antennas }}
            targetAllocationId={targetAllocationId}
            onTargetAllocationReached={() => setTargetAllocationId(null)}
          />
        </div>
      );
    }

    if (selectedOrder) {
      if (formMode === 'allocation' || formMode === 'sub-allocation') {
        const activeAllocations = selectedOrder.allocations?.filter(a => !a.isDeleted) || [];
        return (
          <AllocationForm
            operationOrderId={selectedOrder.id}
            editingAllocation={editingAllocation}
            parentAllocation={parentAllocation}
            onSave={handleSaveAllocation}
            onCancel={() => setFormMode(null)}
            existingAllocations={activeAllocations}
            currentOrderNumber={
              editingAllocation?.orderNumber ||
              activeAllocations.filter(a => !a.parentAllocationId).length + 1
            }
          />
        );
      }

      return (
        <OperationOrderDetails
          order={selectedOrder}
          onEditHeader={() => setFormMode('header')}
          onEditAllocation={handleEditAllocation}
          onAddSubAllocation={handleAddSubAllocation}
          onRefresh={() => fetchOrderDetails(selectedOrder.id)}
          onDelete={handleDeleteAllocation}
          options={{ terminals, satellites, antennas }}
        />
      );
    }

    return null;
  };

  const breadcrumbs = viewMode === 'list' ? undefined : {
    parent: 'פקודות מבצע',
    onParentClick: handleBackToList,
    current: selectedOrder ? selectedOrder.name : (viewMode === 'create' ? 'פקודה חדשה' : 'טוען...'),
    onBack: handleBackToList
  };

  return (
    <PageLayout
      title={viewMode === 'list' ? "פקודות מבצע" : undefined}
      breadcrumbs={breadcrumbs}
      fullHeight={viewMode !== 'list'}
      actions={
        <>
          <SearchContainer>
            <SearchInput
              placeholder="חיפוש"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (viewMode !== 'list') setViewMode('list');
              }}
            />
            <SearchIcon sx={{ color: (theme) => theme.customColors.text.placeholder, fontSize: 18 }} />
          </SearchContainer>
          {viewMode === 'list' && (
            <AddResourceButton onClick={handleCreateNew}>
              <AddIcon sx={{ fontSize: 24 }} />
              פקודה חדשה
            </AddResourceButton>
          )}
        </>
      }
    >
      {renderContent()}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="מחיקת פקודת מבצע"
        message="האם אתה בטוח שברצונך למחוק את פקודת המבצע? פעולה זו אינה ניתנת לביטול."
        onConfirm={handleDeleteOrder}
        onCancel={closeDeleteDialog}
      />
    </PageLayout>
  );
};
