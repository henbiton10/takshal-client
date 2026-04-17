import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyles';
import { AppLayout, MainContent } from './components/App/AppLayout';
import { Authorization } from './components/Authorization/Authorization';
import { theme } from './theme/theme';
import { ResourcesManagement } from './components/ResourcesManagement';
import { OperationOrderPage } from './components/OperationOrders';
import { DashboardPage } from './components/Dashboard';
import { ToastProvider } from './shared/components/ui/Toast';

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

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'dashboard':
        return <DashboardPage />;
      case 'operations':
        return <OperationOrderPage />;
      case 'resources':
        return <ResourcesManagement />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <ToastProvider>
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
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
