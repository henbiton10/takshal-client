import { Box, Typography, styled } from '@mui/material';
import { MENU_ITEM_SELECTED_BG, MENU_ITEM_HOVER_BG, COLORS } from './constants';

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const MenuItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isExpanded',
})<{ isSelected: boolean; isExpanded: boolean }>(({ isSelected, isExpanded }) => ({
  display: 'flex',
  flexDirection: isExpanded ? 'row-reverse' : 'column',
  alignItems: 'center',
  justifyContent: isExpanded ? 'flex-end' : 'center',
  gap: isExpanded ? '12px' : '4px',
  padding: isExpanded ? '8px 12px' : '8px',
  height: isExpanded ? '48px' : 'auto',
  minWidth: isExpanded ? '196px' : '48px',
  borderRadius: '12px',
  backgroundColor: isSelected ? MENU_ITEM_SELECTED_BG : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: isSelected ? MENU_ITEM_SELECTED_BG : MENU_ITEM_HOVER_BG,
  },
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  flexShrink: 0,
  color: COLORS.text,
  
  '& svg': {
    fontSize: '24px',
  },
});

const LabelText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isSelected',
})<{ isExpanded: boolean; isSelected: boolean }>(({ isExpanded, isSelected }) => ({
  fontFamily: 'Assistant, sans-serif',
  fontWeight: isSelected ? 700 : 600,
  fontSize: isExpanded ? '16px' : '12px',
  lineHeight: isExpanded ? '24px' : '14px',
  letterSpacing: isExpanded ? '0.16px' : '0',
  color: COLORS.white,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  transition: 'all 0.3s ease',
}));

export default function SidebarMenuItem({ label, icon, isSelected, isExpanded, onClick }: MenuItemProps) {
  return (
    <MenuItemContainer isSelected={isSelected} isExpanded={isExpanded} onClick={onClick}>
      <LabelText isExpanded={isExpanded} isSelected={isSelected}>
        {label}
      </LabelText>
      <IconWrapper>
        {icon}
      </IconWrapper>
    </MenuItemContainer>
  );
}
