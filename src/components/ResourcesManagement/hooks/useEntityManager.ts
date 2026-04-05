import { useState, useCallback } from 'react';
import { EntityConfig } from '../entityConfig';

export type ViewMode = 'list' | 'view' | 'edit';

interface EntityState {
  items: any[];
  loading: boolean;
  selectedId: number | null;
  selectedData: any | null;
  viewMode: ViewMode;
}

export const useEntityManager = (entityConfig: EntityConfig) => {
  const [state, setState] = useState<EntityState>({
    items: [],
    loading: false,
    selectedId: null,
    selectedData: null,
    viewMode: 'list',
  });

  const fetchItems = useCallback(async (silent = false) => {
    if (!silent) {
      setState(prev => ({ ...prev, loading: true }));
    }
    try {
      const data = await entityConfig.api.getAllSummary();
      setState(prev => ({ ...prev, items: data, loading: false }));
    } catch (error) {
      console.error(`Failed to fetch ${entityConfig.title}:`, error);
      if (!silent) {
        setState(prev => ({ ...prev, loading: false }));
      }
    }
  }, [entityConfig]);

  const handleCardClick = useCallback(async (itemId: number) => {
    // If clicking on already selected item, deselect it
    if (state.selectedId === itemId) {
      setState(prev => ({
        ...prev,
        selectedId: null,
        selectedData: null,
        viewMode: 'list',
      }));
      return;
    }

    try {
      const item = await entityConfig.api.getOne(itemId);
      setState(prev => ({
        ...prev,
        selectedId: itemId,
        selectedData: item,
        viewMode: 'view',
      }));
    } catch (error) {
      console.error(`Failed to fetch ${entityConfig.title} item:`, error);
    }
  }, [entityConfig, state.selectedId]);

  const switchToEditMode = useCallback(() => {
    if (state.selectedData) {
      setState(prev => ({
        ...prev,
        viewMode: 'edit',
      }));
    }
  }, [state.selectedData]);

  const switchToViewMode = useCallback(() => {
    if (state.selectedData) {
      setState(prev => ({
        ...prev,
        viewMode: 'view',
      }));
    }
  }, [state.selectedData]);

  const switchToAddMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedId: null,
      selectedData: null,
      viewMode: 'edit',
    }));
  }, []);

  const handleSave = useCallback(async (formData: any, onSaveCallback?: (data: any) => Promise<void>) => {
    try {
      const payload = entityConfig.mapToPayload(formData);
      
      let savedEntity;
      if (state.selectedId) {
        savedEntity = await entityConfig.api.update(state.selectedId, payload);
      } else {
        savedEntity = await entityConfig.api.create(payload);
      }
      
      if (onSaveCallback) {
        await onSaveCallback(formData);
      }
      
      await fetchItems();
      
      // Fetch full entity details and stay in view mode
      const fullEntity = await entityConfig.api.getOne(savedEntity.id);
      
      setState(prev => ({
        ...prev,
        selectedId: savedEntity.id,
        selectedData: fullEntity,
        viewMode: 'view',
      }));
      
      return true;
    } catch (error) {
      console.error(`Failed to save ${entityConfig.title}:`, error);
      throw error;
    }
  }, [entityConfig, state.selectedId, fetchItems]);

  const resetEditState = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedId: null,
      selectedData: null,
      viewMode: 'list',
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      items: [],
      loading: false,
      selectedId: null,
      selectedData: null,
      viewMode: 'list',
    });
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await entityConfig.api.delete(id);
      await fetchItems();
      
      setState(prev => ({
        ...prev,
        selectedId: null,
        selectedData: null,
        viewMode: 'list',
      }));
      
      return true;
    } catch (error) {
      console.error(`Failed to delete ${entityConfig.title}:`, error);
      throw error;
    }
  }, [entityConfig, fetchItems]);

  // For backwards compatibility
  const editingId = state.viewMode === 'edit' ? state.selectedId : null;
  const editingData = state.viewMode === 'edit' && state.selectedData 
    ? entityConfig.mapToFormData(state.selectedData) 
    : null;

  return {
    items: state.items,
    loading: state.loading,
    selectedId: state.selectedId,
    selectedData: state.selectedData,
    viewMode: state.viewMode,
    editingId,
    editingData,
    fetchItems,
    handleCardClick,
    switchToEditMode,
    switchToViewMode,
    switchToAddMode,
    handleSave,
    handleDelete,
    resetEditState,
    resetAll,
  };
};
