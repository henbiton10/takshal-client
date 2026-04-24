import { useMemo, useCallback, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  ICellRendererParams,
  GridApi,
  RowDragEndEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import { AllocationData } from '../../services/api/types';
import { operationOrdersApi } from '../../services/api';
import deleteIcon from '../../assets/delete.svg';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog/ConfirmDialog';

import { AG_GRID_LOCALE_HE } from '../../shared/utils/gridLocale';

import workingIcon from '../../assets/working.svg';
import orangeAlertIcon from '../../assets/orangeAlert.svg';
import redAlertIcon from '../../assets/redAlert.svg';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridContainer = styled.div`
  width: 100%;
  direction: rtl;

  &.ag-theme-alpine-dark, &.ag-theme-alpine {
    --ag-header-column-separator-display: block !important;
    --ag-header-column-separator-color: transparent !important;
    --ag-header-column-separator-width: 2px !important;
    --ag-header-column-separator-height: 50% !important;
    
    background-color: transparent !important;
    background: transparent !important;
    border: none !important;
    color: ${({ theme }) => theme.customColors.text.primary} !important;

    /* Styling the actual resize handle */
    .ag-header-cell-resize {
      opacity: 1 !important;
      z-index: 10 !important;
    }
    
    .ag-header-cell-resize::after {
      content: '' !important;
      background-color: ${({ theme }) => theme.customColors.border.divider} !important;
      width: 2px !important;
      height: 60% !important;
      top: 20% !important;
      display: block !important;
      visibility: visible !important;
      z-index: 11 !important;
    }
    
    .ag-header-cell-resize:hover::after {
      background-color: ${({ theme }) => theme.customColors.primary.main} !important;
      width: 4px !important;
    }

    --ag-background-color: transparent !important;
    --ag-header-background-color: transparent !important;
    --ag-odd-row-background-color: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'} !important;
    --ag-header-foreground-color: ${({ theme }) => theme.customColors.text.primary} !important;
    --ag-foreground-color: ${({ theme }) => theme.customColors.text.primary} !important;
    --ag-secondary-foreground-color: ${({ theme }) => theme.customColors.text.secondary} !important;
    --ag-row-hover-color: ${({ theme }) => theme.customColors.action.hover} !important;
    --ag-selected-row-background-color: ${({ theme }) => theme.customColors.action.selected} !important;
    --ag-row-border-color: ${({ theme }) => theme.customColors.border.divider} !important;
    --ag-border-color: ${({ theme }) => theme.customColors.border.divider} !important;
    
    /* Target every single container layer of the grid */
    .ag-root-wrapper,
    .ag-root-wrapper-body,
    .ag-root,
    .ag-body,
    .ag-body-viewport,
    .ag-body-horizontal-scroll,
    .ag-header,
    .ag-header-row,
    .ag-pinned-left-cols-container,
    .ag-pinned-right-cols-container,
    .ag-center-cols-container,
    .ag-center-cols-viewport,
    .ag-center-cols-clipper,
    .ag-header-viewport,
    .ag-header-container,
    .ag-row-odd,
    .ag-row-even {
      background-color: transparent !important;
      background: transparent !important;
      border: none !important;
    }

    .ag-header {
      background-color: transparent !important;
      height: 60px !important;
      color: ${({ theme }) => theme.customColors.text.primary} !important;
    }

    .ag-row {
      background-color: transparent !important;
      background: transparent !important;
      border: none !important;
      overflow: hidden !important; 
    }

    .ag-header-cell-text {
      color: ${({ theme }) => theme.customColors.text.primary} !important;
      font-weight: 700;
    }

    .ag-cell {
      color: ${({ theme }) => theme.customColors.text.primary} !important;
      border: none !important;
      background: transparent !important;
      display: flex;
      align-items: center;
      pointer-events: auto !important;
    }

    /* Card-style grouping */
    .allocation-group-row {
      background-color: ${({ theme }) => theme.customColors.action.hover} !important;
      border: none !important;
    }

    .is-first-in-group {
      border-top-left-radius: ${({ theme }) => theme.customBorderRadius.xl} !important;
      border-top-right-radius: ${({ theme }) => theme.customBorderRadius.xl} !important;
    }

    .is-last-in-group {
      border-bottom-left-radius: ${({ theme }) => theme.customBorderRadius.xl} !important;
      border-bottom-right-radius: ${({ theme }) => theme.customBorderRadius.xl} !important;
      height: 64px !important;
    }

    .has-children-divider {
      border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider} !important;
    }

    /* Filter Icons Styling */
    .ag-header-cell-menu-button {
      color: ${({ theme }) => theme.customColors.text.secondary} !important;
      opacity: 0.5 !important;
      visibility: visible !important;
      width: 20px !important;
      
      &:hover {
        opacity: 1 !important;
      }
    }

    /* Target all possible icon containers and elements */
    .ag-header-icon,
    .ag-header-cell-menu-button .ag-icon,
    .ag-header-cell-menu-button .ag-icon::before,
    .ag-icon-filter,
    .ag-icon-filter::before,
    .ag-icon-menu,
    .ag-icon-menu::before,
    .ag-icon {
      color: ${({ theme }) => theme.customColors.text.primary} !important;
      fill: ${({ theme }) => theme.customColors.text.primary} !important;
      font-size: 20px !important;
      font-weight: bold !important;
      display: inline-block !important;
    }
  }

  }

  /* Filter Menu Fixes */
  .ag-popup {
    z-index: 1000 !important;
  }

  .ag-filter-wrapper {
    background-color: ${({ theme }) => theme.customColors.background.paper} !important;
    border: 1px solid ${({ theme }) => theme.customColors.border.divider} !important;
    padding: 8px !important;
    border-radius: 8px !important;
  }

  .ag-filter-filter, 
  .ag-filter-body, 
  .ag-filter-select {
    background-color: ${({ theme }) => theme.customColors.background.paper} !important;
    color: ${({ theme }) => theme.customColors.text.primary} !important;
  }

  .ag-filter-condition {
    color: ${({ theme }) => theme.customColors.text.primary} !important;
  }

  .ag-input-field-input {
     background-color: ${({ theme }) => theme.customColors.background.subtle} !important;
     border: 1px solid ${({ theme }) => theme.customColors.border.divider} !important;
     color: ${({ theme }) => theme.customColors.text.primary} !important;
     border-radius: 4px !important;
     padding: 4px 10px 4px 30px !important;
     direction: rtl !important;
     text-align: right !important;
  }

  .ag-input-field-input::placeholder {
     color: #ffffff !important;
     opacity: 0.8 !important;
  }

  .ag-text-field-input-wrapper {
    display: flex !important;
    direction: ltr !important; /* Move ::before to the left */
    align-items: center !important;
  }

  .ag-text-field-input-wrapper::before {
    color: #ffffff !important;
    filter: brightness(0) invert(1) !important;
    margin-left: 8px !important;
    margin-right: 4px !important;
    opacity: 0.8 !important;
  }

  /* Keep input text flowing from right for Hebrew */
  .ag-text-field-input-wrapper .ag-input-field-input {
    direction: rtl !important;
    text-align: right !important;
    flex: 1 !important;
    padding-left: 0 !important;
  }

  .ag-picker-field-wrapper {
     background-color: ${({ theme }) => theme.customColors.background.subtle} !important;
     border: 1px solid ${({ theme }) => theme.customColors.border.divider} !important;
     color: ${({ theme }) => theme.customColors.text.primary} !important;
  }

  .ag-set-filter-item, .ag-menu-option {
    color: ${({ theme }) => theme.customColors.text.primary} !important;
    &:hover {
      background-color: ${({ theme }) => theme.customColors.action.hover} !important;
    }
  }

  .ag-icon-filter, .ag-icon-search, .ag-icon-menu {
    color: #ffffff !important;
  }

  .ag-row-drag,
  .ag-row-drag .ag-icon-grip,
  .ag-row-drag .ag-icon-grip::before {
    color: #ffffff !important;
    opacity: 1 !important;
  }
`;



const StatusBadge = styled.div<{ $status: 'success' | 'error' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  height: 28px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  background: ${({ theme }) => theme.customColors.background.subtle};
  
  ${(props) => {
    const { status: statusColors, error } = props.theme.customColors;
    switch (props.$status) {
      case 'success':
        return `
          border: 1px solid ${props.theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.8)' : '#22c55e'};
          color: ${props.theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.9)' : '#16a34a'};
        `;
      case 'warning':
        return `
          border: 1px solid ${statusColors.partlyReady};
          color: ${props.theme.palette.mode === 'dark' ? statusColors.partlyReady : '#d97706'};
        `;
      case 'error':
        return `
          border: 1px solid ${error.main};
          color: ${error.main};
        `;
    }
  }}
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  direction: rtl;
  height: 100%;
`;

const GridActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 0 12px;
  gap: 8px;
`;

const DeleteGridButton = styled(GridActionButton)`
  background: ${({ theme }) => theme.customColors.error.subtle};
  color: ${({ theme }) => theme.customColors.error.main};
  
  &:hover {
    background: ${({ theme }) => theme.customColors.error.main}33;
  }
`;


const OrderCell = styled.div<{ $isSubAllocation?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

const AllocationTypeBadge = styled.div<{ $type: 'main' | 'sub' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  height: 24px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  
  ${(props) => {
    const { primary, text, background } = props.theme.customColors;
    return props.$type === 'main'
      ? `
        background: ${primary.main}26;
        color: ${props.theme.palette.mode === 'dark' ? '#00bc7d' : primary.main};
      `
      : `
        background: ${background.subtle};
        color: ${text.secondary};
      `;
  }}
`;

const GridChip = styled.div`
  background: ${({ theme }) => theme.customColors.background.subtle};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 12px;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.customColors.action.hover};
    border-color: ${({ theme }) => theme.customColors.border.accent};
  }
`;

const ChipIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.customColors.primary.main};
  opacity: 0.9;
`;

const ExpandIcon = styled.span<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.customColors.text.secondary};
  transition: transform 0.2s;
  transform: ${(props) => (props.$expanded ? 'rotate(0deg)' : 'rotate(90deg)')};
`;

const OrderNumber = styled.span<{ $isSubAllocation?: boolean }>`
  color: ${({ theme, $isSubAllocation }) => $isSubAllocation ? theme.customColors.text.disabled : theme.customColors.text.primary};
  margin-right: ${(props) => (props.$isSubAllocation ? '24px' : '0')};
  font-weight: 700;
`;

interface FlattenedAllocation extends AllocationData {
  displayOrder: string;
  isSubAllocation: boolean;
  hasChildren: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  parentSortValues?: Record<string, string>;
}

const getHebrewCommunicationType = (type: string): string => {
  const mapping: Record<string, string> = {
    'fiber_optic': 'סיב אופטי',
    'radio': 'רדיו',
    'satellite': 'לוויני',
    'microwave': 'גל מיקרו',
  };
  return mapping[type] || type;
};

interface AllocationsGridProps {
  allocations: AllocationData[];
  onDelete: (allocationId: number) => void;
  onAddSubAllocation: (parentAllocation: AllocationData) => void;
  onReorder: () => Promise<void>;
}

export const AllocationsGrid = ({
  allocations,
  onDelete,
  onReorder,
}: AllocationsGridProps) => {
  const theme = useTheme() as any;
  const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; allocationId: number | null }>({
    open: false,
    allocationId: null,
  });
  const gridRef = useRef<GridApi<FlattenedAllocation> | null>(null);

  const handleDeleteClick = useCallback((id: number) => {
    setDeleteConfirmation({ open: true, allocationId: id });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmation.allocationId !== null) {
      onDelete(deleteConfirmation.allocationId);
    }
    setDeleteConfirmation({ open: false, allocationId: null });
  }, [deleteConfirmation, onDelete]);

  const toggleCollapse = useCallback((allocationId: number) => {
    setCollapsedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(allocationId)) {
        newSet.delete(allocationId);
      } else {
        newSet.add(allocationId);
      }
      return newSet;
    });
    setTimeout(() => {
      gridRef.current?.refreshCells({ force: true });
    }, 0);
  }, []);

  const groupComparator = useCallback((field: string) => (valueA: any, valueB: any, nodeA: any, nodeB: any) => {
    const dataA = nodeA.data as FlattenedAllocation;
    const dataB = nodeB.data as FlattenedAllocation;

    if (!dataA || !dataB) return 0;

    // 1. Get the values that determine the GROUP order (always based on Parent's value)
    const groupValA = dataA.isSubAllocation ? (dataA as any).parentSortValues?.[field] : valueA;
    const groupValB = dataB.isSubAllocation ? (dataB as any).parentSortValues?.[field] : valueB;

    // 2. If the rows belong to different groups (based on parent value), sort by that value
    if (groupValA !== groupValB) {
      if (groupValA === null || groupValA === undefined) return -1;
      if (groupValB === null || groupValB === undefined) return 1;
      return groupValA > groupValB ? 1 : -1;
    }

    // 3. If they are in the same group, or the parent values are identical,
    // ensure parent (isSubAllocation: false) is always above subs
    if (dataA.isSubAllocation !== dataB.isSubAllocation) {
      return dataA.isSubAllocation ? 1 : -1;
    }

    // 4. If both are sub-allocations in the same group, sort by subOrderNumber
    if (dataA.isSubAllocation && dataB.isSubAllocation) {
      return (dataA.subOrderNumber || 0) - (dataB.subOrderNumber || 0);
    }

    return 0;
  }, []);

  const handleRowDragEnd = useCallback(
    async (event: RowDragEndEvent<FlattenedAllocation>) => {
      const draggedNode = event.node;
      const overNode = event.overNode;

      if (!draggedNode || !overNode || !draggedNode.data || !overNode.data) return;

      const draggedData = draggedNode.data;
      const overData = overNode.data;

      const isDraggedSub = draggedData.isSubAllocation;
      const isOverSub = overData.isSubAllocation;

      if (isDraggedSub && !isOverSub) {
        return;
      }

      if (isDraggedSub && isOverSub) {
        if (draggedData.parentAllocationId !== overData.parentAllocationId) {
          return;
        }
      }

      if (!isDraggedSub && isOverSub) {
        return;
      }

      const updates: Array<{ id: number; orderNumber: number; subOrderNumber: number | null }> = [];

      if (isDraggedSub) {
        const parentId = draggedData.parentAllocationId;
        const siblings = allocations
          .find((a) => a.id === parentId)
          ?.subAllocations?.filter((s) => !s.isDeleted)
          .sort((a, b) => (a.subOrderNumber || 0) - (b.subOrderNumber || 0)) || [];

        const draggedIndex = siblings.findIndex((s) => s.id === draggedData.id);
        const overIndex = siblings.findIndex((s) => s.id === overData.id);

        if (draggedIndex === -1 || overIndex === -1) return;

        const reordered = [...siblings];
        const [removed] = reordered.splice(draggedIndex, 1);
        reordered.splice(overIndex, 0, removed);

        reordered.forEach((sub, index) => {
          updates.push({
            id: sub.id,
            orderNumber: sub.orderNumber,
            subOrderNumber: index + 1,
          });
        });
      } else {
        const mainAllocations = allocations
          .filter((a) => !a.isDeleted && !a.parentAllocationId)
          .sort((a, b) => a.orderNumber - b.orderNumber);

        const draggedIndex = mainAllocations.findIndex((a) => a.id === draggedData.id);
        const overIndex = mainAllocations.findIndex((a) => a.id === overData.id);

        if (draggedIndex === -1 || overIndex === -1) return;

        const reordered = [...mainAllocations];
        const [removed] = reordered.splice(draggedIndex, 1);
        reordered.splice(overIndex, 0, removed);

        reordered.forEach((alloc, index) => {
          updates.push({
            id: alloc.id,
            orderNumber: index + 1,
            subOrderNumber: null,
          });

          if (alloc.subAllocations && alloc.subAllocations.length > 0) {
            alloc.subAllocations
              .filter((s) => !s.isDeleted)
              .forEach((sub) => {
                updates.push({
                  id: sub.id,
                  orderNumber: index + 1,
                  subOrderNumber: sub.subOrderNumber,
                });
              });
          }
        });
      }

      try {
        await operationOrdersApi.reorderAllocations(updates);
        await onReorder();
      } catch (error) {
        console.error('Failed to reorder allocations:', error);
      }
    },
    [allocations, onReorder]
  );

  const flattenedData = useMemo((): FlattenedAllocation[] => {
    const result: FlattenedAllocation[] = [];

    const mainAllocations = allocations
      .filter((a) => !a.isDeleted && !a.parentAllocationId)
      .sort((a, b) => a.orderNumber - b.orderNumber);

    mainAllocations.forEach((parent) => {
      const visibleSubs =
        parent.subAllocations && !collapsedIds.has(parent.id)
          ? parent.subAllocations
            .filter((s) => !s.isDeleted)
            .sort((a, b) => (a.subOrderNumber || 0) - (b.subOrderNumber || 0))
          : [];

      const hasVisibleSubs = visibleSubs.length > 0;

      // Add parent
      result.push({
        ...parent,
        displayOrder: `${parent.orderNumber}`,
        isSubAllocation: false,
        hasChildren: hasVisibleSubs || (parent.subAllocations?.length || 0) > 0,
        isFirstInGroup: true,
        isLastInGroup: !hasVisibleSubs,
      });

      // Add subs
      visibleSubs.forEach((sub, idx) => {
        result.push({
          ...sub,
          displayOrder: `${parent.orderNumber}.${sub.subOrderNumber}`,
          isSubAllocation: true,
          hasChildren: false,
          isFirstInGroup: false,
          isLastInGroup: idx === visibleSubs.length - 1,
          // Attach parent data for sorting logic
          parentSortValues: {
            displayOrder: String(parent.orderNumber),
            terminal: parent.terminal?.name || '',
            transmissionSatellite: parent.transmissionSatellite?.name || '',
            transmissionAntenna: parent.transmissionAntenna?.station?.name || '',
            frequencyRange: String(parent.transmissionFrequency || ''),
          }
        });
      });
    });

    return result;
  }, [allocations, collapsedIds]);

  const OrderCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const data = params.data;
    if (!data) return null;

    const isExpanded = !collapsedIds.has(data.id);

    return (
      <OrderCell>
        {!data.isSubAllocation && data.hasChildren && (
          <ExpandIcon
            $expanded={isExpanded}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse(data.id);
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 18 }} />
          </ExpandIcon>
        )}
        {!data.isSubAllocation && !data.hasChildren && (
          <span style={{ width: 18 }} />
        )}
        <OrderNumber $isSubAllocation={data.isSubAllocation}>
          {data.isSubAllocation ? `${data.displayOrder}` : `${data.displayOrder}.`}
        </OrderNumber>
        <AllocationTypeBadge $type={data.isSubAllocation ? 'sub' : 'main'}>
          {data.isSubAllocation ? 'משני' : 'ראשי'}
        </AllocationTypeBadge>
      </OrderCell>
    );
  }, [collapsedIds, toggleCollapse]);

  const TerminalCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const data = params.data;
    if (!data) return null;

    const terminalName = data.terminal?.name || '-';
    if (terminalName === '-') return '-';

    return (
      <GridChip>
        <ChipIcon>
          <LinkIcon sx={{ fontSize: 16 }} />
        </ChipIcon>
        <span>{terminalName}</span>
      </GridChip>
    );
  }, []);

  const SatelliteCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const value = params.value;
    if (!value || value === '-') return '-';

    return (
      <GridChip>
        <ChipIcon>
          <SatelliteAltIcon sx={{ fontSize: 16 }} />
        </ChipIcon>
        <span>{value}</span>
      </GridChip>
    );
  }, []);

  const AntennaCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const value = params.value;
    if (!value || value === '-') return '-';

    return (
      <GridChip>
        <ChipIcon>
          <SettingsInputAntennaIcon sx={{ fontSize: 16 }} />
        </ChipIcon>
        <span>{value}</span>
      </GridChip>
    );
  }, []);

  const ConnectivityCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const data = params.data;
    if (!data) return null;

    const terminalStationId = data.terminal?.stationId;
    const txAntennaStationId = data.transmissionAntenna?.stationId;
    const rxAntennaStationId = data.receptionAntenna?.stationId;

    const isSameStation =
      terminalStationId === txAntennaStationId &&
      terminalStationId === rxAntennaStationId;

    if (isSameStation) {
      return (
        <StatusBadge $status="success">
          <img src={workingIcon} width={16} height={16} alt="" />
          <span>ישיר</span>
        </StatusBadge>
      );
    }

    const txConnType = data.transmissionConnectivity?.communicationType;
    const rxConnType = data.receptionConnectivity?.communicationType;

    if (txConnType || rxConnType) {
      const displayType = getHebrewCommunicationType(txConnType || rxConnType || '');
      return (
        <StatusBadge $status="warning">
          <img src={orangeAlertIcon} width={16} height={16} alt="" />
          <span>{displayType}</span>
        </StatusBadge>
      );
    }

    return (
      <StatusBadge $status="error">
        <img src={redAlertIcon} width={16} height={16} alt="" />
        <span>אין ערוצים</span>
      </StatusBadge>
    );
  }, []);

  const ActionsCellRenderer = useCallback(
    (params: ICellRendererParams<FlattenedAllocation>) => {
      const data = params.data;
      if (!data) return null;

      const context = params.context;
      const onDeleteClick = context?.onDeleteClick;

      return (
        <ActionsCell>
          <DeleteGridButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onDeleteClick) onDeleteClick(data.id);
            }}
          >
            <img src={deleteIcon} alt="מחיקה" style={{ width: '20px', height: '20px', pointerEvents: 'none' }} />
          </DeleteGridButton>
        </ActionsCell>
      );
    },
    []
  );

  const columnDefs = useMemo<ColDef<FlattenedAllocation>[]>(
    () => [
      {
        field: 'displayOrder',
        headerName: '# מספר הקצאה',
        cellRenderer: OrderCellRenderer,
        comparator: groupComparator('displayOrder'),
        minWidth: 100,
      },
      {
        headerName: 'טרמינל מקור',
        cellRenderer: TerminalCellRenderer,
        comparator: groupComparator('terminal'),
        minWidth: 120,
      },
      {
        headerName: 'לוויין שידור',
        valueGetter: (params: any) => params.data?.transmissionSatellite?.name || '',
        cellRenderer: SatelliteCellRenderer,
        comparator: groupComparator('transmissionSatellite'),
        minWidth: 100,
      },
      {
        headerName: 'אנטנת שידור',
        valueGetter: (params: any) => {
          const antenna = params.data?.transmissionAntenna;
          if (!antenna) return '';
          const stationName = antenna.station?.name || '';
          return `${stationName} ${antenna.size}מ' ${(antenna.frequencyBand || '').toUpperCase()}`;
        },
        cellRenderer: AntennaCellRenderer,
        comparator: groupComparator('transmissionAntenna'),
        minWidth: 140,
      },
      {
        headerName: 'תחום תדר',
        valueGetter: (params: any) => String(params.data?.transmissionFrequency || ''),
        comparator: groupComparator('frequencyRange'),
        minWidth: 100,
      },
      {
        headerName: 'תדר שידור',
        field: 'transmissionFrequency',
        valueFormatter: (params: any) => (params.value ? `${params.value}` : '-'),
        minWidth: 90,
      },
      {
        headerName: 'לוויין קליטה',
        valueGetter: (params: any) => params.data?.receptionSatellite?.name || '',
        cellRenderer: SatelliteCellRenderer,
        minWidth: 100,
      },
      {
        headerName: 'אנטנת קליטה',
        valueGetter: (params: any) => {
          const antenna = params.data?.receptionAntenna;
          if (!antenna) return '';
          const stationName = antenna.station?.name || '';
          return `${stationName} ${antenna.size}מ' ${(antenna.frequencyBand || '').toUpperCase()}`;
        },
        cellRenderer: AntennaCellRenderer,
        minWidth: 140,
      },
      {
        headerName: 'תדר קליטה',
        field: 'receptionFrequency',
        valueFormatter: (params: any) => (params.value ? `${params.value}` : '-'),
        minWidth: 90,
      },
      {
        headerName: 'מספרי זנב',
        valueGetter: (params: any) => (params.data?.tailNumbers && params.data.tailNumbers.length > 0) ? params.data.tailNumbers.join(', ') : '-',
        minWidth: 110,
      },
      {
        headerName: 'קישוריות',
        cellRenderer: ConnectivityCellRenderer,
        sortable: false,
        filter: 'agTextColumnFilter',
        minWidth: 130,
      },
      {
        headerName: 'פעולות',
        width: 160,
        cellRenderer: ActionsCellRenderer,
        sortable: false,
        filter: false,
      },
    ],
    [
      OrderCellRenderer,
      TerminalCellRenderer,
      SatelliteCellRenderer,
      AntennaCellRenderer,
      ConnectivityCellRenderer,
      ActionsCellRenderer,
    ]
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
      editable: false,
      floatingFilter: false, // Don't show the filter bar below the header
    }),
    []
  );

  const getRowClass = useCallback((params: { data?: FlattenedAllocation }) => {
    const classes = ['allocation-group-row'];
    if (params.data?.isSubAllocation) classes.push('sub-allocation-row');
    if (params.data?.isFirstInGroup) classes.push('is-first-in-group');
    if (params.data?.isLastInGroup) classes.push('is-last-in-group');
    if (!params.data?.isSubAllocation && params.data?.hasChildren) classes.push('has-children-divider');
    return classes;
  }, []);

  const getRowHeight = useCallback((params: { data?: FlattenedAllocation }) => {
    if (params.data?.isLastInGroup) {
      return 76; // 64 + 12 gap
    }
    return 64;
  }, []);

  const gridKey = useMemo(() => {
    return Array.from(collapsedIds).sort().join(',');
  }, [collapsedIds]);

  if (flattenedData.length === 0) {
    return (
      <GridContainer style={{ height: 200 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: theme.customColors.text.disabled,
            fontSize: '14px',
            background: 'transparent',
            borderRadius: 8,
            border: `1px dashed ${theme.customColors.border.divider}`,
          }}
        >
          אין הקצאות להצגה
        </div>
      </GridContainer>
    );
  }

  return (
    <GridContainer
      className={theme.palette.mode === 'dark' || theme.palette.mode === 'midnight' ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
      style={{ height: Math.min(650, 64 + flattenedData.length * 64 + (allocations.length * 12)) }}
    >
      <AgGridReact<FlattenedAllocation>
        containerStyle={{ background: 'transparent' }}
        key={gridKey}
        rowData={flattenedData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        context={{
          onDeleteClick: handleDeleteClick,
        }}
        enableRtl={true}
        localeText={AG_GRID_LOCALE_HE}
        animateRows={true}
        getRowClass={getRowClass}
        getRowHeight={getRowHeight}
        headerHeight={44}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        suppressCellFocus={true}
        rowDragManaged={false}
        onRowDragEnd={handleRowDragEnd}
        autoSizeStrategy={{
          type: 'fitCellContents'
        }}
      />
      <ConfirmDialog
        open={deleteConfirmation.open}
        title="מחיקת הקצאה"
        message="שים לב, מחיקת הקצאה תשפיע על הפ׳׳מ שהוספת."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmation({ open: false, allocationId: null })}
      />
    </GridContainer>
  );
};
