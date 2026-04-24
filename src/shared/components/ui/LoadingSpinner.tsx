import React from 'react';
import styled, { useTheme } from 'styled-components';
import Lottie from 'lottie-react';
import satelliteLoadingData from '../../../assets/satelliteLoading.json';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const SpinnerContainer = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${props => props.$fullScreen ? '100vh' : '100%'};
  width: 100%;
  gap: 16px;
  background: ${props => props.$fullScreen ? props.theme.customColors.background.gradient : 'transparent'};
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  const theme = useTheme() as any;
  const isLight = theme.palette.mode === 'light';

  return (
    <SpinnerContainer $fullScreen={fullScreen}>
      <Lottie
        animationData={satelliteLoadingData}
        loop={true}
        style={{ 
          width: 600, 
          height: 600,
          filter: isLight ? 'invert(0.8) brightness(0.8)' : 'none'
        }}
      />
    </SpinnerContainer>
  );
};
