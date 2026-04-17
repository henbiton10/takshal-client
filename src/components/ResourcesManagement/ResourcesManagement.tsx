import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CellTowerIcon from '@mui/icons-material/CellTower';
import styled from 'styled-components';
import { ENTITY_CONFIGS, ENTITY_CONFIGS_ARRAY } from './entityConfig';
import { useResourcesManagement } from './hooks/useResourcesManagement';
import { EntitySection, AddResourceModal, ResourceDashboard } from './components';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { PageLayout } from '../../shared/components/PageLayout';
import { LoadingSpinner } from '../../shared/components/ui/LoadingSpinner';
import { BigEmptyState } from '../../shared/components/ui/BigEmptyState';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1c2439;
  border: 1px solid #305088;
  border-radius: 21px;
  padding: 0 16px;
  width: 190px;
  height: 38px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: #e1eaff;
  outline: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  text-align: right;
  direction: rtl;
  &::placeholder { color: #e1eaff; font-weight: 600; }
`;

export const AddResourceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3d62b2;
  color: #f5f5f5;
  border: none;
  border-radius: 20px;
  padding: 8px 12px 8px 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  &:hover { background: #304f93; }
`;

export const ResourcesManagement = () => {
  const {
    searchQuery, setSearchQuery,
    hasInitialized,
    showAddModal, setShowAddModal,
    selectedCategoryId,
    deleteDialog,
    entityManagers,
    filteredItems,
    addingEntityId,
    handleSelectEntityType,
    handleShowAll,
    handleBackToDashboard,
    handleAddClick,
    createSaveHandler,
    handleCardClick,
    handleClose,
    handleCancel,
    handleEditClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useResourcesManagement();

  const activeManagerEntry = Object.entries(entityManagers).find(([_, m]) => m.viewMode === 'edit');
  const activeEntityId = activeManagerEntry ? activeManagerEntry[0] : null;
  const activeManager = activeManagerEntry ? activeManagerEntry[1] : null;

  const viewManagerEntry = Object.entries(entityManagers).find(([_, m]) => m.viewMode === 'view');
  const viewEntityId = viewManagerEntry ? viewManagerEntry[0] : null;
  const viewManager = viewManagerEntry ? viewManagerEntry[1] : null;

  const handleCancelForm = () => {
    if (activeEntityId) handleCancel(activeEntityId);
  };

  const searchAction = (
    <SearchContainer>
      <SearchInput placeholder="חיפוש" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <SearchIcon sx={{ color: '#e1eaff', fontSize: 18 }} />
    </SearchContainer>
  );

  const getPageConfig = () => {
    if (activeEntityId && activeManager) {
      const config = ENTITY_CONFIGS[activeEntityId];
      return {
        breadcrumbs: {
          parent: 'אמצעים', onParentClick: handleBackToDashboard,
          middle: config.title, onMiddleClick: () => handleShowAll(activeEntityId),
          current: activeManager.selectedData?.name || (activeManager.selectedId ? '' : 'הוספה'),
          onBack: handleCancelForm
        },
        actions: searchAction
      };
    }
    if (viewEntityId && viewManager) {
      const config = ENTITY_CONFIGS[viewEntityId];
      return {
        breadcrumbs: {
          parent: 'אמצעים', onParentClick: handleBackToDashboard,
          middle: config.title, onMiddleClick: () => handleShowAll(viewEntityId),
          current: viewManager.selectedData?.name || config.title,
          onBack: () => handleClose(viewEntityId)
        },
        actions: searchAction
      };
    }
    if (selectedCategoryId) {
      const config = ENTITY_CONFIGS[selectedCategoryId];
      return {
        breadcrumbs: {
          parent: 'אמצעים', onParentClick: handleBackToDashboard,
          current: config.title, onBack: handleBackToDashboard
        },
        actions: (
          <>
            {searchAction}
            <AddResourceButton onClick={() => handleAddClick(selectedCategoryId)}>
              הוסף {config.singularTitle}
              <AddIcon sx={{ fontSize: 24 }} />
            </AddResourceButton>
          </>
        )
      };
    }
    return {
      title: "אמצעים",
      actions: (
        <>
          {searchAction}
          <AddResourceButton onClick={() => setShowAddModal(true)}>
            הוסף אמצעי
            <AddIcon sx={{ fontSize: 24 }} />
          </AddResourceButton>
        </>
      )
    };
  };

  const renderContent = () => {
    if (!hasInitialized) return <LoadingSpinner />;
    
    if (activeEntityId && activeManager) {
      const config = ENTITY_CONFIGS[activeEntityId];
      const FormComponent = config.FormComponent;
      
      const propNameMap: Record<string, string> = {
        stations: 'editingStationId',
        satellites: 'editingSatelliteId',
        terminals: 'editingTerminalId',
        networks: 'editingNetworkId'
      };

      return (
        <FormComponent
          onSave={createSaveHandler(config.id)}
          onDelete={() => activeManager.selectedId && activeManager.selectedData && handleDeleteClick(config.id, activeManager.selectedId, activeManager.selectedData.name)}
          initialData={activeManager.editingData}
          onClose={() => handleClose(config.id)}
          onCancel={handleCancelForm}
          {...{ [propNameMap[config.id]]: activeManager.selectedId }}
        />
      );
    }

    const isEmpty = addingEntityId === null && Object.values(entityManagers).every(m => (m.items?.length || 0) === 0);
    if (isEmpty) return (
      <BigEmptyState 
        icon={<CellTowerIcon sx={{ fontSize: 48, color: '#e1eaff' }} />}
        title="טרם הוגדרו אמצעים במערכת"
        subtitle="כדי להתחיל בתכנון, יש להוסיף אמצעי."
      />
    );

    if (selectedCategoryId) {
      const config = ENTITY_CONFIGS[selectedCategoryId];
      const manager = entityManagers[selectedCategoryId as keyof typeof entityManagers];
      return (
        <EntitySection
          config={config}
          items={filteredItems[config.id] || manager.items}
          loading={manager.loading}
          viewMode={manager.viewMode}
          selectedId={manager.selectedId}
          selectedData={manager.selectedData}
          editingData={manager.editingData}
          onCardClick={(id) => handleCardClick(config.id, id)}
          onClose={() => handleClose(config.id)}
          onCancel={() => handleCancel(config.id)}
          onEdit={() => handleEditClick(config.id)}
          onDelete={(id, name) => handleDeleteClick(config.id, id, name)}
          onSave={createSaveHandler(config.id)}
        />
      );
    }

    return (
      <ResourceDashboard
        configs={ENTITY_CONFIGS_ARRAY}
        filteredItems={filteredItems}
        onCardClick={handleCardClick}
        onShowAll={handleShowAll}
      />
    );
  };

  return (
    <>
      <PageLayout {...getPageConfig()}>
        {renderContent()}
      </PageLayout>

      <ConfirmDialog
        open={deleteDialog.open}
        title={deleteDialog.entityId ? `מחיקת ${ENTITY_CONFIGS[deleteDialog.entityId].singularTitle}` : 'מחיקת אמצעי'}
        message="שים לב, מחיקת האמצעי מהמערכת תנתק אותו מאמצעים אחרים שמקושרים אליו."
        confirmText="מחק בכל זאת"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {showAddModal && <AddResourceModal onClose={() => setShowAddModal(false)} onSelect={handleSelectEntityType} />}
    </>
  );
};
