import { useState } from 'react';
import { Collapse, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import deleteIcon from '../../assets/delete.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OperationOrderSummary } from '../../services/api/types';

const OrderCard = styled.div`
  background: ${({ theme }) => theme.palette.action.hover};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.customBorderRadius.xl};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  direction: rtl;
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;
  width: 100%;
  overflow: hidden;
  
  &:hover {
    background: ${({ theme }) => theme.palette.action.selected};
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.customSpacing.xl} ${theme.customSpacing.lg}`};
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.customSpacing.sm};
`;

const OrderName = styled.h3`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.customTypography.fontSize.xl};
  font-weight: ${({ theme }) => theme.customTypography.fontWeight.bold};
  font-family: inherit;
  margin: 0;
`;

const OptionsButton = styled.div`
  color: ${({ theme }) => theme.palette.text.secondary};
  opacity: 0.8;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.customSpacing.xs};
  border-radius: 50%;
  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.palette.action.hover};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.palette.divider};
  width: 100%;
`;

const ExpandedContent = styled.div`
  width: 100%;
  padding: 16px;
`;

interface OperationOrderCardProps {
  order: OperationOrderSummary;
  onClick: () => void;
  onEdit?: (order: OperationOrderSummary) => void;
  onDelete?: (id: number) => void;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

export const OperationOrderCard = ({
  order,
  onClick,
  onEdit,
  onDelete,
  isExpanded,
  children
}: OperationOrderCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit?.(order);
    handleClose();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete?.(order.id);
    handleClose();
  };

  return (
    <OrderCard onClick={onClick}>
      <TopRow>
        <ContentGroup>
          <OrderName>{order.name}</OrderName>
          {isExpanded ? (
            <KeyboardArrowUpIcon sx={{ fontSize: 20, color: '#e1eaff' }} />
          ) : (
            <ChevronLeftIcon sx={{ fontSize: 20, color: '#e1eaff' }} />
          )}
        </ContentGroup>

        <OptionsButton onClick={handleOptionsClick}>
          <MoreVertIcon sx={{ fontSize: 20 }} />
        </OptionsButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            sx: {
              background: 'rgba(28, 40, 78, 0.7)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f2f2f2',
              borderRadius: '16px',
              padding: '12px',
              minWidth: '130px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              '& .MuiList-root': {
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }
            }
          }}
        >
          <MenuItem
            onClick={handleEdit}
            sx={{
              borderRadius: '8px',
              justifyContent: 'flex-end',
              gap: '8px',
              padding: '8px 4px 8px 8px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Assistant, sans-serif' }}>עריכה</span>
            <EditIcon sx={{ fontSize: 20 }} />
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{
              borderRadius: '8px',
              justifyContent: 'flex-end',
              gap: '8px',
              padding: '8px 4px 8px 8px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#f2f2f2', fontFamily: 'Assistant, sans-serif' }}>מחיקה</span>
            <img src={deleteIcon} alt="מחיקה" style={{ width: '20px', height: '20px' }} />
          </MenuItem>
        </Menu>
      </TopRow>

      <Collapse in={isExpanded} timeout={400} unmountOnExit={true}>
        <Divider />
        <ExpandedContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ExpandedContent>
      </Collapse>
    </OrderCard>
  );
};
