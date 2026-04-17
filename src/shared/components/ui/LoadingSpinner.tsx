import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import satelliteLoadingData from '../../../assets/satelliteLoading.json';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={fullScreen ? '100vh' : '400px'}
      width="100%"
      gap={2}
    >
      <Lottie
        animationData={satelliteLoadingData}
        loop={true}
        style={{ width: 600, height: 600 }}
      />
    </Box>
  );
};
