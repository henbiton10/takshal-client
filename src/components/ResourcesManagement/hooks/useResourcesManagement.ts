import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { ENTITY_CONFIGS } from '../entityConfig';
import { useEntityManager } from './useEntityManager';
import { useToast } from '../../../shared/components/ui/Toast';

interface DeleteDialogState {
  open: boolean;
  entityId: string | null;
  itemId: number | null;
  itemName: string;
}

export const useResourcesManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingEntityId, setAddingEntityId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    entityId: null,
    itemId: null,
    itemName: '',
  });

  const stationsManager = useEntityManager(ENTITY_CONFIGS.stations);
  const satellitesManager = useEntityManager(ENTITY_CONFIGS.satellites);
  const terminalsManager = useEntityManager(ENTITY_CONFIGS.terminals);
  const networksManager = useEntityManager(ENTITY_CONFIGS.networks);

  const entityManagers = useMemo(() => ({
    stations: stationsManager,
    satellites: satellitesManager,
    terminals: terminalsManager,
    networks: networksManager,
  }), [stationsManager, satellitesManager, terminalsManager, networksManager]);

  const managersRef = useRef(entityManagers);
  managersRef.current = entityManagers;

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    Promise.all([
      stationsManager.fetchItems(true),
      satellitesManager.fetchItems(true),
      terminalsManager.fetchItems(true),
      networksManager.fetchItems(true),
    ]).finally(() => {
      setHasInitialized(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = useMemo(() => {
    const result: Record<string, any[]> = {};
    const query = searchQuery.trim().toLowerCase();

    Object.entries(entityManagers).forEach(([key, manager]) => {
      const activeItems = manager.items.filter((item: any) => !item.isDeleted);
      result[key] = query 
        ? activeItems.filter((item: any) => item.name?.toLowerCase().includes(query))
        : activeItems;
    });

    return result;
  }, [searchQuery, entityManagers]);

  const handleSelectEntityType = useCallback((entityId: string) => {
    setShowAddModal(false);
    setAddingEntityId(entityId);
    setSelectedCategoryId(entityId);
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) {
      manager.fetchItems(true);
      manager.switchToAddMode();
    }
  }, [entityManagers]);

  const handleShowAll = useCallback((entityId: string) => {
    setSelectedCategoryId(entityId);
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) {
      manager.resetEditState();
      manager.fetchItems();
    }
  }, [entityManagers]);

  const handleBackToDashboard = useCallback(() => {
    setSelectedCategoryId(null);
    setSearchQuery('');
    Object.values(managersRef.current).forEach(manager => {
      manager.resetEditState();
    });
  }, []);

  const handleAddClick = useCallback((sectionId: string) => {
    const manager = managersRef.current[sectionId as keyof typeof entityManagers];
    if (manager) manager.switchToAddMode();
  }, [entityManagers]);

  const createSaveHandler = useCallback((entityId: string) => {
    return async (formData: any) => {
      const manager = managersRef.current[entityId as keyof typeof entityManagers];
      if (manager) {
        try {
          const isUpdate = !!manager.selectedId;
          await manager.handleSave(formData);
          
          const config = ENTITY_CONFIGS[entityId];
          const isFeminine = config.gender === 'feminine';
          const actionTitle = isUpdate 
            ? (isFeminine ? 'עודכנה' : 'עודכן') 
            : (isFeminine ? 'נוספה' : 'נוסף');
            
          showSuccess(
            `${config.singularTitle} נשמר${isFeminine ? 'ה' : ''}`, 
            `${config.singularTitle} ${actionTitle} בהצלחה למערכת`
          );
        } catch (error) {
          showError('שגיאה בשמירה', 'לא ניתן היה לשמור את השינויים. נסה שנית מאוחר יותר.');
          throw error;
        }
      }
    };
  }, [showSuccess, showError, entityManagers]);

  const handleCardClick = useCallback((entityId: string, itemId: number) => {
    setSelectedCategoryId(entityId);
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) manager.handleCardClick(itemId);
  }, [entityManagers]);

  const handleClose = useCallback((entityId: string) => {
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) manager.resetEditState();
  }, [entityManagers]);

  const handleCancel = useCallback((entityId: string) => {
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) {
      if (!manager.selectedData) {
        manager.resetEditState();
        if (addingEntityId === entityId) setAddingEntityId(null);
      } else {
        manager.switchToViewMode();
      }
    }
  }, [addingEntityId, entityManagers]);

  const handleEditClick = useCallback((entityId: string) => {
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) manager.switchToEditMode();
  }, [entityManagers]);

  const handleDeleteClick = useCallback((entityId: string, itemId: number, itemName: string) => {
    setDeleteDialog({ open: true, entityId, itemId, itemName });
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteDialog.entityId && deleteDialog.itemId) {
      const manager = managersRef.current[deleteDialog.entityId as keyof typeof entityManagers];
      if (manager) {
        try {
          await manager.handleDelete(deleteDialog.itemId);
        } catch (error) {
          console.error('Failed to delete:', error);
        }
      }
    }
    setDeleteDialog({ open: false, entityId: null, itemId: null, itemName: '' });
  }, [deleteDialog, entityManagers]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialog({ open: false, entityId: null, itemId: null, itemName: '' });
  }, []);

  return {
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
  };
};
