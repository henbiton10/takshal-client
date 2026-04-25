import { createTheme } from '@mui/material/styles';
import { ThemeColors } from './types';
import { spacing as customSpacing, borderRadius as customBorderRadius } from './spacing';
import { typography as customTypography } from './typography';

// Extend the MUI theme type to include our custom tokens
declare module '@mui/material/styles' {
  interface Theme {
    customColors: ThemeColors;
    customSpacing: typeof customSpacing;
    customBorderRadius: typeof customBorderRadius;
    customTypography: typeof customTypography;
  }
  interface ThemeOptions {
    customColors?: ThemeColors;
    customSpacing?: typeof customSpacing;
    customBorderRadius?: typeof customBorderRadius;
    customTypography?: typeof customTypography;
  }
}

export const createCustomTheme = (colors: ThemeColors, mode: 'light' | 'dark' = 'dark') => {
  return createTheme({
    direction: 'rtl',
    palette: {
      mode,
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
      },
      secondary: {
        main: colors.secondary.main,
      },
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
      divider: colors.border.divider,
      action: {
        hover: colors.action.hover,
        selected: colors.action.selected,
      }
    },
    typography: {
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
            background: colors.background.gradient,
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
            backgroundColor: colors.background.glass,
            backdropFilter: 'blur(40px)',
            backgroundImage: 'none',
            borderRadius: '16px',
            border: `1px solid ${colors.border.divider}`,
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
              backgroundColor: colors.action.hover,
            },
            '&.Mui-selected': {
              backgroundColor: colors.primary.disabled,
              '&:hover': {
                backgroundColor: 'rgba(61, 98, 178, 0.4)', // Slightly harder to parameterize without more tokens
              },
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.background.glass,
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
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 600,
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
              '& fieldset': {
                borderColor: colors.border.subtle,
              },
              '&:hover fieldset': {
                borderColor: colors.border.hover,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary.main,
              },
            },
          }
        }
      }
    },
  });
};

import { darkColors } from './colors';
export const theme = createCustomTheme(darkColors);
