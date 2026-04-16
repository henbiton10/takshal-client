import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import satelliteLoadingData from '../../assets/satelliteLoading.json';
import accessDeniedData from '../../assets/accessDenied.json';
import { apiClient } from '../../services/api/client';
import { PermissionsProvider, useCompartmentalization } from '../../contexts/PermissionsContext';

// Extracted inner component that consumes the context to check specifically for the required entity
const PermissionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { entities, isLoading } = useCompartmentalization();

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2}>
        <Lottie
          animationData={satelliteLoadingData}
          loop={true}
          style={{ width: 600, height: 600 }}
        />
      </Box>
    );
  }

  // App Entry Guard: Requires READ access to 'EnterMagenElyon'
  const hasAccess = entities['EnterMagenElyon']?.Read;

  if (!hasAccess) {
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

  return <>{children}</>;
};

export const Authorization: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkLogin = async () => {
      try {
        await apiClient.get('/auth/login');
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error: any) {
        // Handle standard 401 with redirectURL (intercepted by our apiClient to match axios format)
        if (error?.response?.status === 401 && error?.response?.data?.redirectURL) {
          console.log("Redirecting for auth...", error.response.data.redirectURL);
          window.location.replace(error.response.data.redirectURL);
        } else {
          console.error('Authentication Error:', error);
          if (isMounted) {
            setAuthError('Failed to authenticate');
          }
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    checkLogin();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isCheckingAuth) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2}>
        <Lottie
          animationData={satelliteLoadingData}
          loop={true}
          style={{ width: 600, height: 600 }}
        />
      </Box>
    );
  }

  if (authError) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography color="error" variant="h6">{authError}</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) return null; // Fallback entirely if not authenticated but awaiting redirect

  return (
    <PermissionsProvider>
      <PermissionGuard>
        {children}
      </PermissionGuard>
    </PermissionsProvider>
  );
};
