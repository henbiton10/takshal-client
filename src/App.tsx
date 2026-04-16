import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyles';
import { AppLayout, MainContent } from './components/App/AppLayout';
import { Authorization } from './components/Authorization/Authorization';
import { theme } from './theme/theme';
import { ResourcesManagement } from './components/ResourcesManagement';
import { SatelliteFormData } from './components/SatelliteForm';
import { OperationOrderPage } from './components/OperationOrders';
import { DashboardPage } from './components/Dashboard';

const STORAGE_KEY = 'takshal_selected_menu';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'operations';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedMenuItem);
  }, [selectedMenuItem]);

  const handleMenuItemSelect = (itemId: string) => {
    setSelectedMenuItem(itemId);
  };

  const handleSaveSatellite = useCallback(async (data: SatelliteFormData) => {
    console.log('Saving satellite:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'dashboard':
        return <DashboardPage />;
      case 'operations':
        return <OperationOrderPage />;
      case 'resources':
        return <ResourcesManagement onSaveSatellite={handleSaveSatellite} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Authorization>
        <AppLayout>
          <MainContent>
            {renderContent()}
          </MainContent>
          <Sidebar 
            selectedItem={selectedMenuItem}
            onItemSelect={handleMenuItemSelect}
          />
        </AppLayout>
      </Authorization>
    </ThemeProvider>
  );
}

export default App;
