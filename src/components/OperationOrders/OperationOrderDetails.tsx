import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { OperationOrder, AllocationData } from '../../services/api/types';
import { OperationOrderHeader } from './OperationOrderHeader';
import { AllocationsGrid } from './AllocationsGrid';

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  color: #e1eaff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: ${props => props.$variant === 'primary' ? '#3d62b2' : props.$variant === 'danger' ? '#ef4444' : 'rgba(174, 199, 255, 0.1)'};
  color: #f5f5f5;
  &:hover {
    opacity: 0.9;
  }
`;

const AllocationsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

interface OperationOrderDetailsProps {
  order: OperationOrder;
  onEditHeader: () => void;
  onAddAllocation: () => void;
  onEditAllocation: (allocation: AllocationData) => void;
  onAddSubAllocation: (parent: AllocationData) => void;
  onRefresh: () => Promise<void>;
}

export const OperationOrderDetails = ({
  order,
  onEditHeader,
  onAddAllocation,
  onEditAllocation,
  onAddSubAllocation,
  onRefresh,
}: OperationOrderDetailsProps) => {
  const activeAllocations = order.allocations?.filter(a => !a.isDeleted) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 20px' }}>
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
      />

      <AllocationsSection>
        <SectionHeader>
          <SectionTitle>הקצאות ({activeAllocations.length})</SectionTitle>
          <ActionButton $variant="primary" onClick={onAddAllocation}>
            <AddIcon sx={{ fontSize: 20 }} />
            הוסף הקצאה
          </ActionButton>
        </SectionHeader>

        <AllocationsGrid
          allocations={activeAllocations}
          onEdit={onEditAllocation}
          onAddSubAllocation={onAddSubAllocation}
          onReorder={onRefresh}
          onDelete={onRefresh} // Simple refresh after delete for now
        />
      </AllocationsSection>
    </div>
  );
};
