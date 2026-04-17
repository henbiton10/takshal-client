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
  SIDEBAR_GRADIENT,
  SIDEBAR_BORDER_COLOR,
  SIDEBAR_BACKDROP_BLUR,
} from './constants';
import { SidebarProps } from './types';

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  width: isExpanded ? `${SIDEBAR_WIDTH_EXPANDED}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
  height: '100vh',
  background: SIDEBAR_GRADIENT,
  borderLeft: `1px solid ${SIDEBAR_BORDER_COLOR}`,
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: `blur(${SIDEBAR_BACKDROP_BLUR})`,
  padding: isExpanded ? '12px 12px' : '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  transition: `all ${SIDEBAR_TRANSITION_DURATION}ms ease`,
  overflow: 'hidden',
}));

const MenuSeparator = styled(Box)({
  height: '1px',
  background: 'rgba(255, 255, 255, 0.12)',
  margin: '0 8px',
});

const MenuContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  flex: 1,
  marginTop: '12px',
});

export default function Sidebar({ selectedItem = 'operations', onItemSelect }: SidebarProps) {
  const { isExpanded, isPinned, handleMouseEnter, handleMouseLeave, togglePin } = useSidebarHover();

  const handleItemClick = (itemId: string) => {
    onItemSelect?.(itemId);
  };

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader isExpanded={isExpanded} />

      <MenuSeparator />

      <MenuContainer>
        {MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isSelected={selectedItem === item.id}
            isExpanded={isExpanded}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </MenuContainer>

      <MenuSeparator />

      <SidebarFooter isExpanded={isExpanded} isPinned={isPinned} onTogglePin={togglePin} />
    </SidebarContainer>
  );
}
