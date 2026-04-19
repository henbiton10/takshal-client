import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import satelliteLoadingData from '../../assets/satelliteLoading.json';

interface LoadingAnimationProps {
  size?: number;
  fullScreen?: boolean;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 600, 
  fullScreen = true 
}) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height={fullScreen ? '100vh' : '100%'} 
      width={fullScreen ? '100vw' : '100%'}
      position={fullScreen ? 'fixed' : 'relative'}
      top={0}
      left={0}
      zIndex={fullScreen ? 9999 : 'auto'}
      bgcolor={fullScreen ? '#0A1122' : 'transparent'}
      gap={2}
    >
      <Lottie
        animationData={satelliteLoadingData}
        loop={true}
        style={{ width: size, height: size }}
      />
    </Box>
  );
};
