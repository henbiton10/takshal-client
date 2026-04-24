import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeMode } from './types';
import { darkColors, lightColors } from './colors';
import { createCustomTheme } from './theme';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('takshal_theme_mode');
    return (saved as ThemeMode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('takshal_theme_mode', mode);
  }, [mode]);

  const getThemeConfig = () => {
    switch (mode) {
      case 'light':
        return { colors: lightColors, muiMode: 'light' as const };
      default:
        return { colors: darkColors, muiMode: 'dark' as const };
    }
  };

  const { colors, muiMode } = getThemeConfig();
  const theme = createCustomTheme(colors, muiMode);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
