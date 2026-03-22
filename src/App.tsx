import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyles';
import { AppLayout, MainContent } from './components/App/AppLayout';
import { theme } from './theme/theme';
import { ResourcesManagement } from './components/ResourcesManagement';
import { SatelliteFormData } from './components/SatelliteForm';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('operations');

  const handleMenuItemSelect = (itemId: string) => {
    setSelectedMenuItem(itemId);
  };

  const handleSaveSatellite = useCallback(async (data: SatelliteFormData) => {
    console.log('Saving satellite:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  const renderContent = () => {
    switch (selectedMenuItem) {
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
      <AppLayout>
        <MainContent>
          {renderContent()}
        </MainContent>
        <Sidebar 
          selectedItem={selectedMenuItem}
          onItemSelect={handleMenuItemSelect}
        />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
