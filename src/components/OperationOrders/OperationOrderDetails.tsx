import styled from 'styled-components';
import { OperationOrder, AllocationData, Terminal, SatelliteSummary, AntennaWithStation } from '../../services/api/types';
import { OperationOrderHeader } from './OperationOrderHeader';
import { AllocationsGrid } from './AllocationsGrid';

const AllocationsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

interface OperationOrderDetailsProps {
  order: OperationOrder;
  onEditHeader: () => void;
  onEditAllocation: (allocation: AllocationData) => void;
  onAddSubAllocation: (parent: AllocationData) => void;
  onDelete: (allocationId: number) => void;
  onRefresh: () => Promise<void>;
  hideHeader?: boolean;
  options: {
    terminals: Terminal[];
    satellites: SatelliteSummary[];
    antennas: AntennaWithStation[];
  };
}

export const OperationOrderDetails = ({
  order,
  onEditHeader,
  onEditAllocation,
  onAddSubAllocation,
  onDelete,
  onRefresh,
  options,
  hideHeader = false,
}: OperationOrderDetailsProps) => {
  const activeAllocations = order.allocations?.filter(a => !a.isDeleted) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: hideHeader ? '0' : '0 20px' }}>
      {!hideHeader && (
        <OperationOrderHeader
          data={{
            name: order.name,
            startDate: order.startDate,
            startTime: order.startTime,
            endDate: order.endDate,
            endTime: order.endTime,
          }}
          onChange={() => {}}
          disabled={true}
          onEdit={onEditHeader}
          options={options}
        />
      )}

      <AllocationsSection>
        <AllocationsGrid
          allocations={activeAllocations}
          onEdit={onEditAllocation}
          onAddSubAllocation={onAddSubAllocation}
          onReorder={onRefresh}
          onDelete={onDelete}
        />
      </AllocationsSection>
    </div>
  );
};
