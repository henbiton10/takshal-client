import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d62b2',
    },
    background: {
      default: 'rgb(10, 17, 34)',
      paper: 'rgb(17, 33, 69)',
    },
    text: {
      primary: '#f2f2f2',
      secondary: '#e1eaff',
    },
  },
  typography: {
    fontFamily: 'Assistant, sans-serif',
  },
});
