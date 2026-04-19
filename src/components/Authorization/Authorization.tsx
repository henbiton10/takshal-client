import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import accessDeniedData from '../../assets/accessDenied.json';
import { PermissionsProvider, useCompartmentalization } from '../../contexts/PermissionsContext';
import { LoadingAnimation } from '../../shared/components/LoadingAnimation';
import { InitializationProvider, useInitialization } from '../../contexts/InitializationContext';

// Extracted inner component that consumes the context to check specifically for the required entity
const PermissionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { entities, isLoading: isPermissionsLoading } = useCompartmentalization();
  const { isAppReady } = useInitialization();

  const hasAccess = !isPermissionsLoading && entities['EnterMagenElyon']?.Read;
  const showLoader = isPermissionsLoading || !isAppReady;

  // Handle access denied state
  if (!isPermissionsLoading && !hasAccess) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Lottie
          animationData={accessDeniedData}
          loop={true}
          style={{ width: 400, height: 400 }}
        />
        <Typography color="error" variant="h5" sx={{ mt: -2, fontWeight: 'bold' }}>אין הרשאות</Typography>
      </Box>
    );
  }

  return (
    <Box key="permissions-guard-root">
      {/* Container for children to keep them in a stable tree position */}
      <Box key="app-children-container" style={{ display: isPermissionsLoading ? 'none' : 'block' }}>
        {!isPermissionsLoading && children}
      </Box>
      
      {/* The loader stays at the same relative position and key */}
      {showLoader && <LoadingAnimation key="unified-app-loader" />}
    </Box>
  );
};

export const Authorization: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <InitializationProvider>
      <PermissionsProvider>
        <PermissionGuard>
          {children}
        </PermissionGuard>
      </PermissionsProvider>
    </InitializationProvider>
  );
};
