import { useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { PageLayout } from '../../shared/components/PageLayout';
import { OperationOrderCard } from './OperationOrderCard';
import { OperationOrderDetails } from './OperationOrderDetails';
import { OperationOrderHeader } from './OperationOrderHeader';
import { AllocationForm } from './AllocationForm';
import { LoadingSpinner } from '../../shared/components/ui/LoadingSpinner';
import { BigEmptyState } from '../../shared/components/ui/BigEmptyState';
import { useOperationOrderPage } from './hooks/useOperationOrderPage';
import { AddResourceButton } from '../ResourcesManagement/ResourcesManagement';

export const OperationOrderPage = () => {
  const {
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
  } = useOperationOrderPage();

  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setFormMode(null);
    fetchOrders();
  }, [fetchOrders, setViewMode, setFormMode]);

  const handleCreateNew = useCallback(() => {
    setViewMode('create');
    setFormMode('header');
    setHeaderData({});
  }, [setViewMode, setFormMode, setHeaderData]);

  const handleAddAllocation = useCallback(() => {
    setFormMode('allocation');
    setEditingAllocation(undefined);
    setParentAllocation(undefined);
  }, [setFormMode, setEditingAllocation, setParentAllocation]);

  const handleAddSubAllocation = useCallback((parent: any) => {
    setParentAllocation(parent);
    setFormMode('sub-allocation');
    setEditingAllocation(undefined);
  }, [setParentAllocation, setFormMode, setEditingAllocation]);

  const handleEditAllocation = useCallback((allocation: any) => {
    setEditingAllocation(allocation);
    setParentAllocation(undefined);
    setFormMode('allocation');
  }, [setEditingAllocation, setParentAllocation, setFormMode]);

  const renderContent = () => {
    if (loading && orders.length === 0) return <LoadingSpinner />;

    if (viewMode === 'list') {
      if (orders.length === 0) {
        return (
          <BigEmptyState
            icon={<ListAltIcon sx={{ fontSize: 48, color: '#e1eaff' }} />}
            title="טרם הוגדרו פקודות מבצע"
            subtitle="כדי להתחיל, יש ליצור פקודה חדשה."
          />
        );
      }
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
          {orders.map(order => (
            <OperationOrderCard key={order.id} order={order} onClick={() => handleOrderClick(order.id)} />
          ))}
        </div>
      );
    }

    if (viewMode === 'create' || formMode === 'header') {
      return (
        <div style={{ padding: '0 20px' }}>
          <OperationOrderHeader
            data={headerData}
            errors={headerErrors}
            onChange={setHeaderData}
            onSave={handleSaveOrder}
            onCancel={viewMode === 'create' ? handleBackToList : () => setFormMode(null)}
            saving={saving}
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
          onAddAllocation={handleAddAllocation}
          onEditAllocation={handleEditAllocation}
          onAddSubAllocation={handleAddSubAllocation}
          onRefresh={() => fetchOrderDetails(selectedOrder.id)}
        />
      );
    }

    return null;
  };

  const breadcrumbs = viewMode === 'list' ? undefined : {
    parent: 'פקודות מבצע',
    onParentClick: handleBackToList,
    current: viewMode === 'create' ? 'פקודה חדשה' : selectedOrder?.name || 'טוען...',
    onBack: handleBackToList
  };

  return (
    <PageLayout
      title={viewMode === 'list' ? "פקודות מבצע" : undefined}
      breadcrumbs={breadcrumbs}
      actions={viewMode === 'list' ? (
        <AddResourceButton onClick={handleCreateNew}>
          פקודה חדשה
          <AddIcon sx={{ fontSize: 24 }} />
        </AddResourceButton>
      ) : undefined}
    >
      {renderContent()}
    </PageLayout>
  );
};
