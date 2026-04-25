import { Box, styled } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarFooter from './SidebarFooter';
import { MENU_ITEMS } from './menuItems';
import { useSidebarHover } from './useSidebarHover';
import {
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_BACKDROP_BLUR,
} from './constants';
import { SidebarProps } from './types';
import { usePageStatus } from '../../contexts/PageStatusContext';

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded, theme }) => ({
  width: isExpanded ? `${SIDEBAR_WIDTH_EXPANDED}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
  height: '100vh',
  background: isExpanded 
    ? `linear-gradient(204.53deg, ${theme.customColors.background.paper} 9.08%, ${theme.customColors.background.default} 99.47%)`
    : theme.customColors.background.paper,
  borderLeft: `1px solid ${theme.customColors.border.divider}`,
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: `blur(${SIDEBAR_BACKDROP_BLUR})`,
  padding: isExpanded ? '12px 12px' : '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  transition: `all ${SIDEBAR_TRANSITION_DURATION}ms ease`,
  overflow: 'hidden',
}));

const MenuSeparator = styled(Box)(({ theme }) => ({
  height: '1px',
  background: theme.palette.divider,
  margin: '0 8px',
}));

const MenuContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  flex: 1,
  marginTop: '12px',
});

export default function Sidebar({ selectedItem = 'operations', onItemSelect, onEasterEgg }: SidebarProps) {
  const { isExpanded, isPinned, togglePin } = useSidebarHover();
  const { statuses } = usePageStatus();

  const handleItemClick = (itemId: string) => {
    onItemSelect?.(itemId);
  };

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      className="sidebar-container"
    >
      <SidebarHeader isExpanded={isExpanded} onEasterEgg={onEasterEgg} />

      <MenuSeparator />

      <MenuContainer>
        {MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item.id}
            itemId={item.id}
            label={item.label}
            icon={item.icon}
            isSelected={selectedItem === item.id}
            isExpanded={isExpanded}
            hasWaitingForm={statuses[item.id]?.hasActiveForm}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </MenuContainer>

      <SidebarFooter isExpanded={isExpanded} isPinned={isPinned} onTogglePin={togglePin} />
    </SidebarContainer>
  );
}
