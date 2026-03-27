import { useMemo, useCallback, useState, useRef } from 'react';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridContainer = styled.div`
  width: 100%;
  direction: rtl;

  .ag-root-wrapper {
    background: #0a1628;
    border: none;
    border-radius: 8px;
    font-family: inherit;
  }

  .ag-header {
    background: #111d32;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  }

  .ag-header-cell {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    font-size: 12px;
    padding: 0 12px;
  }

  .ag-header-cell-text {
    direction: rtl;
  }

  .ag-row {
    background: #0d1a2d;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  }

  .ag-row-odd {
    background: #0a1628;
  }

  .ag-row-hover {
    background: rgba(7, 29, 63, 0.95) !important;
  }

  .ag-row-selected {
    background: rgba(59, 130, 246, 0.1) !important;
  }


  .ag-cell {
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border: none !important;
    outline: none !important;
  }

  .ag-cell-focus,
  .ag-cell-focus:focus,
  .ag-cell:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .ag-cell-inline-editing {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .ag-cell-editor {
    display: none !important;
  }

  .ag-text-field-input {
    display: none !important;
  }

  .ag-popup-editor {
    display: none !important;
  }

  .ag-input-field-input {
    display: none !important;
  }

  .sub-allocation-row {
    background: #0f1f35 !important;
  }

  .sub-allocation-row.ag-row-odd {
    background: #0c1a2e !important;
  }

  .ag-body-horizontal-scroll {
    display: none;
  }

  .ag-body-viewport {
    direction: rtl;
  }

  .ag-header-viewport {
    direction: rtl;
  }

  .ag-pinned-left-cols-container,
  .ag-pinned-left-header {
    direction: ltr;
  }

  .ag-row-focus {
    outline: none !important;
  }

  .ag-ltr .ag-cell-focus:not(.ag-cell-range-selected):focus-within,
  .ag-rtl .ag-cell-focus:not(.ag-cell-range-selected):focus-within {
    border: none !important;
    outline: none !important;
  }

  .ag-row-drag {
    color: rgba(255, 255, 255, 0.85) !important;
    cursor: grab;
    margin-left: 8px;
  }

  .ag-row-drag .ag-icon {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  .ag-row-dragging {
    opacity: 0.5;
  }

  .ag-row-drag:hover {
    color: rgba(59, 130, 246, 0.8) !important;
  }

  .ag-row-drag:hover .ag-icon {
    color: rgba(59, 130, 246, 0.8) !important;
  }
`;

const CellWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  direction: rtl;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
`;

const StatusBadge = styled.div<{ $status: 'success' | 'error' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  background: ${(props) =>
    props.$status === 'success'
      ? 'rgba(34, 197, 94, 0.15)'
      : props.$status === 'warning'
      ? 'rgba(251, 191, 36, 0.15)'
      : 'rgba(239, 68, 68, 0.15)'};
  color: ${(props) =>
    props.$status === 'success' ? '#22c55e' : props.$status === 'warning' ? '#fbbf24' : '#ef4444'};
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  direction: ltr;
`;

const OrderCell = styled.div<{ $isSubAllocation?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

const ExpandIcon = styled.span<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.2s;
  transform: ${(props) => (props.$expanded ? 'rotate(0deg)' : 'rotate(90deg)')};
`;

const OrderNumber = styled.span<{ $isSubAllocation?: boolean }>`
  color: ${(props) => (props.$isSubAllocation ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.85)')};
  margin-right: ${(props) => (props.$isSubAllocation ? '24px' : '0')};
`;

interface FlattenedAllocation extends AllocationData {
  displayOrder: string;
  isSubAllocation: boolean;
  hasChildren: boolean;
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
  onEdit: (allocation: AllocationData) => void;
  onDelete: (allocationId: number) => void;
  onAddSubAllocation: (parentAllocation: AllocationData) => void;
  onReorder: () => Promise<void>;
}

export const AllocationsGrid = ({
  allocations,
  onEdit,
  onDelete,
  onReorder,
}: AllocationsGridProps) => {
  const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());
  const gridRef = useRef<GridApi<FlattenedAllocation> | null>(null);

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

    const processAllocation = (
      allocation: AllocationData,
      isSubAllocation: boolean = false,
      parentId?: number
    ) => {
      const orderDisplay = allocation.subOrderNumber
        ? `${allocation.orderNumber}.${allocation.subOrderNumber}`
        : `${allocation.orderNumber}`;

      const hasChildren =
        allocation.subAllocations && allocation.subAllocations.filter((s) => !s.isDeleted).length > 0;

      const isParentCollapsed = parentId !== undefined && collapsedIds.has(parentId);

      if (!isParentCollapsed) {
        result.push({
          ...allocation,
          displayOrder: orderDisplay,
          isSubAllocation,
          hasChildren: hasChildren || false,
        });
      }

      if (allocation.subAllocations && allocation.subAllocations.length > 0 && !collapsedIds.has(allocation.id)) {
        allocation.subAllocations
          .filter((sub) => !sub.isDeleted)
          .sort((a, b) => (a.subOrderNumber || 0) - (b.subOrderNumber || 0))
          .forEach((sub) => processAllocation(sub, true, allocation.id));
      }
    };

    allocations
      .filter((a) => !a.isDeleted && !a.parentAllocationId)
      .sort((a, b) => a.orderNumber - b.orderNumber)
      .forEach((a) => processAllocation(a));

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
        {data.isSubAllocation && (
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 11 }}>משני</span>
        )}
      </OrderCell>
    );
  }, [collapsedIds, toggleCollapse]);

  const TerminalCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const data = params.data;
    if (!data) return null;

    const terminalName = data.terminal?.name || '-';

    return (
      <CellWithIcon>
        <IconWrapper>
          <LinkIcon sx={{ fontSize: 16 }} />
        </IconWrapper>
        <span>{terminalName}</span>
      </CellWithIcon>
    );
  }, []);

  const SatelliteCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const value = params.value;
    if (!value) return '-';

    return (
      <CellWithIcon>
        <IconWrapper>
          <SatelliteAltIcon sx={{ fontSize: 16 }} />
        </IconWrapper>
        <span>{value}</span>
      </CellWithIcon>
    );
  }, []);

  const AntennaCellRenderer = useCallback((params: ICellRendererParams<FlattenedAllocation>) => {
    const value = params.value;
    if (!value) return '-';

    return (
      <CellWithIcon>
        <IconWrapper>
          <SettingsInputAntennaIcon sx={{ fontSize: 16 }} />
        </IconWrapper>
        <span>{value}</span>
      </CellWithIcon>
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
          <CheckCircleIcon sx={{ fontSize: 14 }} />
          ישיר
        </StatusBadge>
      );
    }

    const txConnType = data.transmissionConnectivity?.communicationType;
    const rxConnType = data.receptionConnectivity?.communicationType;
    
    if (txConnType || rxConnType) {
      const displayType = getHebrewCommunicationType(txConnType || rxConnType || '');
      return (
        <StatusBadge $status="warning">
          <LinkIcon sx={{ fontSize: 14 }} />
          {displayType}
        </StatusBadge>
      );
    }

    return (
      <StatusBadge $status="error">
        <ErrorIcon sx={{ fontSize: 14 }} />
        אין ערוצים
      </StatusBadge>
    );
  }, []);

  const ActionsCellRenderer = useCallback(
    (params: ICellRendererParams<FlattenedAllocation>) => {
      const data = params.data;
      if (!data) return null;

      if (data.isSubAllocation) {
        return null;
      }

      return (
        <ActionsCell>
          <IconButton
            size="small"
            onClick={() => onDelete(data.id)}
            sx={{
              color: 'rgba(239, 68, 68, 0.7)',
              padding: '4px',
              '&:hover': { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' },
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(data)}
            sx={{
              color: 'rgba(59, 130, 246, 0.7)',
              padding: '4px',
              '&:hover': { color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' },
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </ActionsCell>
      );
    },
    [onEdit, onDelete]
  );

  const columnDefs = useMemo<ColDef<FlattenedAllocation>[]>(
    () => [
      {
        headerName: '# מספר הקצאה',
        field: 'displayOrder',
        width: 120,
        pinned: 'right',
        cellRenderer: OrderCellRenderer,
        rowDrag: true,
      },
      {
        headerName: 'טרמינל מקור',
        width: 130,
        cellRenderer: TerminalCellRenderer,
      },
      {
        headerName: 'לוויין שידור',
        valueGetter: (params) => params.data?.transmissionSatellite?.name || '',
        width: 110,
        cellRenderer: SatelliteCellRenderer,
      },
      {
        headerName: 'אנטנת שידור',
        valueGetter: (params) => {
          const antenna = params.data?.transmissionAntenna;
          if (!antenna) return '';
          return `אנטנה ${antenna.id}`;
        },
        width: 110,
        cellRenderer: AntennaCellRenderer,
      },
      {
        headerName: 'תדר שידור',
        field: 'transmissionFrequency',
        width: 90,
        valueFormatter: (params) => (params.value ? `${params.value}` : '-'),
      },
      {
        headerName: 'לוויין קליטה',
        valueGetter: (params) => params.data?.receptionSatellite?.name || '',
        width: 110,
        cellRenderer: SatelliteCellRenderer,
      },
      {
        headerName: 'אנטנת קליטה',
        valueGetter: (params) => {
          const antenna = params.data?.receptionAntenna;
          if (!antenna) return '';
          return `אנטנה ${antenna.id}`;
        },
        width: 110,
        cellRenderer: AntennaCellRenderer,
      },
      {
        headerName: 'תדר קליטה',
        field: 'receptionFrequency',
        width: 90,
        valueFormatter: (params) => (params.value ? `${params.value}` : '-'),
      },
      {
        headerName: 'מספר זנב',
        valueGetter: (params) => params.data?.tailNumber || '-',
        width: 90,
      },
      {
        headerName: 'קישוריות',
        flex: 1,
        minWidth: 110,
        cellRenderer: ConnectivityCellRenderer,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'פעולות',
        width: 80,
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
      filter: false,
      resizable: true,
      suppressMovable: true,
      editable: false,
    }),
    []
  );

  const getRowClass = useCallback((params: { data?: FlattenedAllocation }) => {
    if (params.data?.isSubAllocation) {
      return 'sub-allocation-row';
    }
    return '';
  }, []);

  const getRowHeight = useCallback(() => 48, []);

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
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '14px',
            background: '#0a1628',
            borderRadius: 8,
          }}
        >
          אין הקצאות להצגה
        </div>
      </GridContainer>
    );
  }

  return (
    <GridContainer style={{ height: Math.min(500, 56 + flattenedData.length * 48) }}>
      <AgGridReact<FlattenedAllocation>
        key={gridKey}
        rowData={flattenedData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        enableRtl={true}
        animateRows={true}
        getRowClass={getRowClass}
        getRowHeight={getRowHeight}
        headerHeight={44}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        suppressCellFocus={true}
        rowDragManaged={false}
        onRowDragEnd={handleRowDragEnd}
      />
    </GridContainer>
  );
};
