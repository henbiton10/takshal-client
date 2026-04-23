import { Box, Typography, styled } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';


interface SidebarFooterProps {
  isExpanded: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
}

const FooterContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginTop: 'auto',
});

const Separator = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: theme.palette.divider,
}));

const CollapseButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isPinned',
})<{ isExpanded: boolean; isPinned: boolean }>(({ isExpanded, isPinned, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isExpanded ? 'space-between' : 'center',
  height: '48px',
  padding: '8px 12px',
  borderRadius: theme.customBorderRadius.xl,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isPinned ? 'rgba(174, 199, 255, 0.15)' : 'transparent',
  
  '&:hover': {
    backgroundColor: 'rgba(174, 199, 255, 0.15)',
  },
}));

const CollapseLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded, theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 600,
  fontSize: '14px',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  opacity: isExpanded ? 1 : 0,
  maxWidth: isExpanded ? '150px' : '0',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  flexShrink: 0,
  
  '& svg': {
    fontSize: '24px',
  },
}));

export default function SidebarFooter({ isExpanded, isPinned, onTogglePin }: SidebarFooterProps) {
  return (
    <FooterContainer>
      <Separator />
      <CollapseButton isExpanded={isExpanded} isPinned={isPinned} onClick={onTogglePin}>
        <CollapseLabel isExpanded={isExpanded}>
          קפל תפריט
        </CollapseLabel>
        <IconWrapper>
          <FirstPageIcon 
            sx={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.3s ease',
            }} 
          />
        </IconWrapper>

      </CollapseButton>
    </FooterContainer>
  );
}
