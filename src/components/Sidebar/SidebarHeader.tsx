import { Box, Typography, styled } from '@mui/material';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

interface SidebarHeaderProps {
  isExpanded: boolean;
}

const HeaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  display: 'flex',
  gap: isExpanded ? '16px' : '0',
  alignItems: 'center',
  justifyContent: isExpanded ? 'flex-start' : 'center',
  width: '100%',
  height: '52px',
  padding: isExpanded ? '0 4px 0 0' : '0',
  transition: 'all 0.3s ease',
}));

const HeaderContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  display: 'flex',
  gap: isExpanded ? '16px' : '0',
  alignItems: 'center',
  paddingBottom: '6px',
  opacity: isExpanded ? 1 : 0,
  maxWidth: isExpanded ? '176px' : '0',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
}));

const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '104px',
});

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '24px',
  color: theme.palette.text.primary,
  textAlign: 'right',
  whiteSpace: 'nowrap',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '16px',
  letterSpacing: '0.14px',
  color: theme.palette.text.secondary,
  textAlign: 'right',
  whiteSpace: 'nowrap',
}));

const LogoBackground = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: theme.palette.primary.main,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  flexShrink: 0,
}));

export default function SidebarHeader({ isExpanded }: SidebarHeaderProps) {
  return (
    <HeaderContainer isExpanded={isExpanded}>
      <LogoBackground>
        <SatelliteAltIcon />
      </LogoBackground>
      <HeaderContent isExpanded={isExpanded}>
        <TextContainer>
          <Title>תכנון תקש׳׳ל</Title>
          <Subtitle>מרכז בקרה ושליטה</Subtitle>
        </TextContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
