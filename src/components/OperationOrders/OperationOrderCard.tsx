import { useState, useEffect } from 'react';
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

const DateTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  direction: ltr;
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 18px;
  font-weight: 700;
  font-family: inherit;
`;

const TimeText = styled.span`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 18px;
  font-weight: 600;
  font-family: inherit;
  opacity: 0.9;
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 14px;
  font-weight: 600;
  opacity: 0.6;
  margin: 0 2px;
`;

const Pipe = styled.span`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 18px;
  font-weight: 400;
  opacity: 0.3;
  margin: 0 8px;
`;

const OrderName = styled.h3`
  color: ${({ theme }) => theme.customColors.text.primary};
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

const MenuLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: sans-serif;
  color: ${({ theme }) => theme.customColors.text.primary};
`;

interface OperationOrderCardProps {
  order: OperationOrderSummary;
  onClick: () => void;
  onEdit?: (order: OperationOrderSummary) => void;
  onDelete?: (id: number) => void;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0].slice(-2);
    const month = parts[1];
    const day = parts[2];
    return `${day}.${month}.${year}`;
  }
  return dateStr;
};

export const OperationOrderCard = ({
  order,
  onClick,
  onEdit,
  onDelete,
  isExpanded,
  children
}: OperationOrderCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renderedChildren, setRenderedChildren] = useState<React.ReactNode>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isExpanded && children) {
      setRenderedChildren(children);
    }
  }, [isExpanded, children]);

  const handleExited = () => {
    setRenderedChildren(null);
  };

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
          {isExpanded ? (
            <KeyboardArrowUpIcon sx={{ fontSize: 20, color: (theme: any) => theme.customColors.text.secondary }} />
          ) : (
            <ChevronLeftIcon sx={{ fontSize: 20, color: (theme: any) => theme.customColors.text.secondary }} />
          )}
          <OrderName>{order.name}</OrderName>
          <Pipe>|</Pipe>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 4.5H12V3H1.5V4.5ZM1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23438 0.440625 1.94063C0.734375 1.64688 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64688 13.0594 1.94063C13.3531 2.23438 13.5 2.5875 13.5 3V7.25625C13.2625 7.14375 13.0187 7.05 12.7687 6.975C12.5187 6.9 12.2625 6.84375 12 6.80625V6H1.5V13.5H6.225C6.3125 13.775 6.41563 14.0375 6.53438 14.2875C6.65313 14.5375 6.79375 14.775 6.95625 15H1.5ZM11.25 15.75C10.2125 15.75 9.32813 15.3844 8.59688 14.6531C7.86563 13.9219 7.5 13.0375 7.5 12C7.5 10.9625 7.86563 10.0781 8.59688 9.34688C9.32813 8.61563 10.2125 8.25 11.25 8.25C12.2875 8.25 13.1719 8.61563 13.9031 9.34688C14.6344 10.0781 15 10.9625 15 12C15 13.0375 14.6344 13.9219 13.9031 14.6531C13.1719 15.3844 12.2875 15.75 11.25 15.75ZM12.5063 13.7812L13.0312 13.2563L11.625 11.85V9.75H10.875V12.15L12.5063 13.7812Z" fill="currentColor" style={{ opacity: 0.5 }} />
          </svg>
          <DateTimeGroup>
            <DateText>{formatDate(order.startDate)}</DateText>
            <TimeText>{order.startTime}</TimeText>
            <Separator>-</Separator>
            <DateText>{formatDate(order.endDate)}</DateText>
            <TimeText>{order.endTime}</TimeText>
          </DateTimeGroup>
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
              background: (theme) => theme.customColors.background.glass,
              backdropFilter: 'blur(40px)',
              border: (theme) => `1px solid ${theme.customColors.border.divider}`,
              color: (theme) => theme.customColors.text.primary,
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
            <MenuLabel>עריכה</MenuLabel>
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
            <MenuLabel>מחיקה</MenuLabel>
            <img src={deleteIcon} alt="מחיקה" style={{ width: '20px', height: '20px' }} />
          </MenuItem>
        </Menu>
      </TopRow>

      <Collapse 
        in={isExpanded} 
        timeout={400} 
        unmountOnExit={true}
        onExited={handleExited}
      >
        <Divider />
        <ExpandedContent onClick={(e) => e.stopPropagation()}>
          {renderedChildren || children}
        </ExpandedContent>
      </Collapse>
    </OrderCard>
  );
};
