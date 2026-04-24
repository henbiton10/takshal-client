import React from 'react';
import styled, { useTheme } from 'styled-components';
import Lottie from 'lottie-react';
import satelliteLoadingData from '../../assets/satelliteLoading.json';

interface LoadingAnimationProps {
  size?: number;
  fullScreen?: boolean;
}

const LoaderContainer = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${props => props.$fullScreen ? '100vh' : '100%'};
  width: ${props => props.$fullScreen ? '100vw' : '100%'};
  position: ${props => props.$fullScreen ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  z-index: ${props => props.$fullScreen ? 9999 : 'auto'};
  background: ${props => props.$fullScreen ? props.theme.customColors.background.gradient : 'transparent'};
  gap: 16px;
`;

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 600, 
  fullScreen = true 
}) => {
  const theme = useTheme() as any;
  const isLight = theme.palette.mode === 'light';

  return (
    <LoaderContainer $fullScreen={fullScreen}>
      <Lottie
        animationData={satelliteLoadingData}
        loop={true}
        style={{ 
          width: size, 
          height: size,
          filter: isLight ? 'invert(0.8) brightness(0.8)' : 'none'
        }}
      />
    </LoaderContainer>
  );
};
