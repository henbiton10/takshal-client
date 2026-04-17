import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { OperationOrderSummary } from '../../services/api/types';

const OrderCard = styled.div`
  background: rgba(174, 199, 255, 0.06);
  border: 1px solid rgba(174, 199, 255, 0.12);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: rgba(174, 199, 255, 0.1);
    transform: translateY(-2px);
    border-color: rgba(174, 199, 255, 0.25);
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OrderName = styled.h3`
  color: #e1eaff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const OrderDate = styled.span`
  color: rgba(225, 234, 255, 0.5);
  font-size: 14px;
  font-weight: 500;
`;

interface OperationOrderCardProps {
  order: OperationOrderSummary;
  onClick: () => void;
}

export const OperationOrderCard = ({ order, onClick }: OperationOrderCardProps) => {
  return (
    <OrderCard onClick={onClick}>
      <OrderInfo>
        <OrderName>{order.name}</OrderName>
        <OrderDate>
          {order.startDate} {order.startTime} - {order.endDate} {order.endTime}
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
  );
};
