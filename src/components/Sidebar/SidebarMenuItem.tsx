import { Box, Typography, styled } from '@mui/material';

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isExpanded: boolean;
  hasWaitingForm?: boolean;
  onClick: () => void;
}

const MenuItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isExpanded',
})<{ isSelected: boolean; isExpanded: boolean }>(({ isExpanded }) => ({
  display: 'flex',
  flexDirection: isExpanded ? 'row' : 'column',
  alignItems: 'center',
  justifyContent: isExpanded ? 'flex-start' : 'center',
  gap: isExpanded ? '12px' : '4px',
  padding: isExpanded ? '4px 12px' : '4px',
  height: isExpanded ? '48px' : 'auto',
  minWidth: isExpanded ? '196px' : '48px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: '12px',
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ isSelected, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  position: 'relative',
  color: isSelected ? '#ffffff' : theme.palette.text.primary,
  backgroundColor: isSelected ? 'rgba(174, 199, 255, 0.25)' : 'transparent',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  
  [`${MenuItemContainer}:hover &`]: {
    backgroundColor: 'rgba(174, 199, 255, 0.15)',
  },
  
  '& svg': {
    fontSize: '24px',
  },
}));

const NotificationDot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-2px',
  right: '-2px',
  width: '10px',
  height: '10px',
  backgroundColor: '#3d82f6', // Premium blue
  borderRadius: '50%',
  border: `2px solid #112145`, // Dark background border for contrast
  boxShadow: '0 0 6px rgba(61, 130, 246, 0.5)',
  zIndex: 1,
}));

const LabelText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isSelected',
})<{ isExpanded: boolean; isSelected: boolean }>(({ isExpanded, isSelected, theme }) => ({
  fontFamily: 'inherit',
  fontWeight: isSelected ? 700 : 600,
  fontSize: isExpanded ? '16px' : '12px',
  lineHeight: isExpanded ? '24px' : '14px',
  letterSpacing: isExpanded ? '0.16px' : '0',
  color: isSelected ? '#ffffff' : theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  transition: 'all 0.3s ease',
}));

export default function SidebarMenuItem({ label, icon, isSelected, isExpanded, hasWaitingForm, onClick }: MenuItemProps) {
  return (
    <MenuItemContainer isSelected={isSelected} isExpanded={isExpanded} onClick={onClick}>
      <IconWrapper isSelected={isSelected}>
        {icon}
        {hasWaitingForm && !isSelected && <NotificationDot />}
      </IconWrapper>

      <LabelText isExpanded={isExpanded} isSelected={isSelected}>
        {label}
      </LabelText>
    </MenuItemContainer>
  );
}
