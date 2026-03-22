import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyles';
import { AppLayout, MainContent } from './components/App/AppLayout';
import { theme } from './theme/theme';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('operations');

  const handleMenuItemSelect = (itemId: string) => {
    setSelectedMenuItem(itemId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <AppLayout>
        <MainContent>
          {/* Main content area - to be filled later */}
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
