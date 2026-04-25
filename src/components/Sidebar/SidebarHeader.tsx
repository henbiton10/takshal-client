import { Box, Typography, styled } from '@mui/material';
import meteorLogo from '../../assets/Meteor-logo.svg';

interface SidebarHeaderProps {
  isExpanded: boolean;
  onEasterEgg?: () => void;
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

const LogoImage = styled('img')({
  width: '42px',
  height: '42px',
  borderRadius: '12px',
  flexShrink: 0,
  objectFit: 'contain',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:active': {
    transform: 'scale(0.9)',
  },
});

import { useState } from 'react';

export default function SidebarHeader({ isExpanded, onEasterEgg }: SidebarHeaderProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 7) {
      onEasterEgg?.();
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }
    
    // Reset click count after 2 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <HeaderContainer isExpanded={isExpanded}>
      <LogoImage 
        src={meteorLogo} 
        alt="Meteor Logo" 
        onClick={handleLogoClick}
      />
      <HeaderContent isExpanded={isExpanded}>
        <TextContainer>
          <Title>מטאור</Title>
          <Subtitle>תכנון תקש״ל</Subtitle>
        </TextContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
