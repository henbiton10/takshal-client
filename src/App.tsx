import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyles';
import { AppLayout, MainContent } from './components/App/AppLayout';
import { Authorization } from './components/Authorization/Authorization';
import { theme } from './theme/theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ResourcesManagement } from './components/ResourcesManagement';
import { OperationOrderPage } from './components/OperationOrders';
import { DashboardPage } from './components/Dashboard';
import { ToastProvider } from './shared/components/ui/Toast';
import { SocketProvider } from './contexts/SocketContext';
import { PageStatusProvider } from './contexts/PageStatusContext';
import { TourProvider } from './shared/components/Tour/TourProvider';
import { MeteorShower } from './shared/components/EasterEggs/MeteorShower';
import { useKonami } from './shared/components/EasterEggs/useKonami';
import styled from 'styled-components';

const STORAGE_KEY = 'takshal_selected_menu';

const PageWrapper = styled.div<{ $isVisible: boolean }>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

function App() {
  const [showMeteor, setShowMeteor] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'operations';
  });

  useKonami(() => {
    setShowMeteor(true);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedMenuItem);
  }, [selectedMenuItem]);

  const handleMenuItemSelect = (itemId: string) => {
    setSelectedMenuItem(itemId);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <MeteorShower active={showMeteor} onFinish={() => setShowMeteor(false)} />
        <ToastProvider>
          <TourProvider>
            <PageStatusProvider>
              <SocketProvider>
                <Authorization>
                  <AppLayout>
                    <MainContent>
                      <PageWrapper $isVisible={selectedMenuItem === 'dashboard'}>
                        <DashboardPage />
                      </PageWrapper>
                      <PageWrapper $isVisible={selectedMenuItem === 'operations'}>
                        <OperationOrderPage />
                      </PageWrapper>
                      <PageWrapper $isVisible={selectedMenuItem === 'resources'}>
                        <ResourcesManagement />
                      </PageWrapper>
                    </MainContent>
                    <Sidebar 
                      selectedItem={selectedMenuItem}
                      onItemSelect={handleMenuItemSelect}
                    />
                  </AppLayout>
                </Authorization>
              </SocketProvider>
            </PageStatusProvider>
          </TourProvider>
        </ToastProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
