import { ThemeColors } from './types';

export const darkColors: ThemeColors = {
  primary: {
    main: '#3d62b2',
    light: '#5a7eb2',
    dark: '#2d4a8c',
    hover: '#304f93',
    disabled: 'rgba(61, 98, 178, 0.3)',
  },
  secondary: {
    main: '#5a7a5a',
  },
  background: {
    default: 'rgb(10, 17, 34)',
    paper: 'rgb(17, 33, 69)',
    dark: 'rgba(25, 40, 70, 0.4)',
    medium: 'rgba(60, 75, 100, 0.4)',
    light: 'rgba(60, 70, 90, 0.5)',
    subtle: 'rgba(100, 110, 130, 0.4)',
    bannerInner: 'rgba(16, 33, 62, 0.62)',
    card: 'rgba(135, 173, 255, 0.35)',
    gradient: 'linear-gradient(181.55deg, #112145 -9.06%, #0A1122 98.39%)',
    glass: 'rgba(28, 40, 78, 0.8)',
  },
  text: {
    primary: '#f2f2f2',
    secondary: '#e1eaff',
    disabled: 'rgba(225, 234, 255, 0.4)',
    white: '#ffffff',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    muted: '#bababa',
  },
  border: {
    primary: '#305088',
    hover: 'rgba(255, 255, 255, 0.4)',
    focused: 'rgba(255, 255, 255, 0.5)',
    subtle: 'rgba(255, 255, 255, 0.15)',
    divider: 'rgba(255, 255, 255, 0.1)',
    accent: 'rgba(174, 199, 255, 0.3)',
    accentHover: 'rgba(174, 199, 255, 0.5)',
  },
  error: {
    main: '#ff4d4d',
    subtle: 'rgba(244, 67, 54, 0.1)',
  },
  status: {
    ready: 'linear-gradient(180deg, rgba(99, 255, 106, 0.4) 0%, rgba(66, 228, 73, 0.4) 100%)',
    partlyReady: 'rgba(255, 179, 0, 0.7)',
    damaged: 'rgba(255, 77, 77, 0.5)',
    allocated: 'linear-gradient(180deg, rgba(99, 255, 106, 0.4) 0%, rgba(66, 228, 73, 0.4) 100%)',
    ku: '#ffffff',
    ka: 'linear-gradient(180deg, #ff9900 0%, #cc7a00 100%)',
    x: 'linear-gradient(180deg, #4caf50 0%, #388e3c 100%)',
  },
  action: {
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.12)',
  }
};


export const lightColors: ThemeColors = {
  primary: {
    main: '#3d62b2',
    light: '#5a7eb2',
    dark: '#2d4a8c',
    hover: '#304f93',
    disabled: 'rgba(61, 98, 178, 0.1)',
  },
  secondary: {
    main: '#5a7a5a',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
    dark: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    light: 'rgba(0, 0, 0, 0.02)',
    subtle: 'rgba(0, 0, 0, 0.03)',
    bannerInner: 'rgba(255, 255, 255, 0.8)',
    card: 'rgba(61, 98, 178, 0.05)',
    gradient: 'linear-gradient(181.55deg, #f8fafc -9.06%, #e2e8f0 98.39%)',
    glass: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    disabled: 'rgba(30, 41, 59, 0.4)',
    white: '#ffffff',
    placeholder: 'rgba(30, 41, 59, 0.3)',
    muted: '#64748b',
  },
  border: {
    primary: '#cbd5e1',
    hover: 'rgba(0, 0, 0, 0.2)',
    focused: 'rgba(61, 98, 178, 0.5)',
    subtle: 'rgba(0, 0, 0, 0.1)',
    divider: 'rgba(0, 0, 0, 0.08)',
    accent: 'rgba(61, 98, 178, 0.2)',
    accentHover: 'rgba(61, 98, 178, 0.4)',
  },
  error: {
    main: '#dc2626',
    subtle: 'rgba(220, 38, 38, 0.05)',
  },
  status: {
    ready: 'linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(22, 163, 74, 0.4) 100%)',
    partlyReady: 'rgba(245, 158, 11, 0.7)',
    damaged: 'rgba(239, 68, 68, 0.5)',
    allocated: 'linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(22, 163, 74, 0.4) 100%)',
    ku: '#1e293b',
    ka: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
    x: 'linear-gradient(180deg, #16a34a 0%, #15803d 100%)',
  },
  action: {
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
  }
};

// Default export for backward compatibility if needed, but we should use darkColors as default
export const colors = darkColors;

