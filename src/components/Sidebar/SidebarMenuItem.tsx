import { Box, Typography, styled } from '@mui/material';

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const MenuItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isExpanded',
})<{ isSelected: boolean; isExpanded: boolean }>(({ isSelected, isExpanded, theme }) => ({
  display: 'flex',
  flexDirection: isExpanded ? 'row-reverse' : 'column',
  alignItems: 'center',
  justifyContent: isExpanded ? 'flex-end' : 'center',
  gap: isExpanded ? '12px' : '4px',
  padding: isExpanded ? '8px 12px' : '8px',
  height: isExpanded ? '48px' : 'auto',
  minWidth: isExpanded ? '196px' : '48px',
  borderRadius: theme.customBorderRadius.xl,
  backgroundColor: isSelected ? 'rgba(174, 199, 255, 0.25)' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: isSelected ? 'rgba(174, 199, 255, 0.25)' : theme.palette.action.hover,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  flexShrink: 0,
  color: theme.palette.text.primary,
  
  '& svg': {
    fontSize: '24px',
  },
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
