import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { spacing as customSpacing, borderRadius as customBorderRadius } from './spacing';
import { typography as customTypography } from './typography';

// Extend the MUI theme type to include our custom tokens
declare module '@mui/material/styles' {
  interface Theme {
    customColors: typeof colors;
    customSpacing: typeof customSpacing;
    customBorderRadius: typeof customBorderRadius;
    customTypography: typeof customTypography;
  }
  interface ThemeOptions {
    customColors?: typeof colors;
    customSpacing?: typeof customSpacing;
    customBorderRadius?: typeof customBorderRadius;
    customTypography?: typeof customTypography;
  }
}

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d62b2',
      light: '#5a7eb2',
      dark: '#2d4a8c',
    },
    secondary: {
      main: '#5a7a5a',
    },
    background: {
      default: 'rgb(10, 17, 34)',
      paper: 'rgb(17, 33, 69)',
    },
    text: {
      primary: '#f2f2f2',
      secondary: '#e1eaff',
      disabled: 'rgba(225, 234, 255, 0.4)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.12)',
    }
  },
  typography: {
    fontFamily: 'Assistant, sans-serif',
  },
  // Inject custom tokens
  customColors: colors,
  customSpacing: customSpacing,
  customBorderRadius: customBorderRadius,
  customTypography: customTypography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(181.55deg, #112145 -9.06%, #0A1122 98.39%)',
          minHeight: '100vh',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(28, 40, 78, 0.8)',
          backdropFilter: 'blur(40px)',
          backgroundImage: 'none',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '8px',
        },
        list: {
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(61, 98, 178, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(61, 98, 178, 0.4)',
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(28, 40, 78, 0.8)',
        },
        option: {
          borderRadius: '8px',
          margin: '2px 8px',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          fontFamily: 'Assistant, sans-serif',
          fontWeight: 600,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3d62b2',
            },
          },
        }
      }
    }
  },
});
