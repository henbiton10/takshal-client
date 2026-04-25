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
    subtle: 'rgba(255, 255, 255, 0.04)',
    bannerInner: 'rgba(255, 255, 255, 0.08)',
    card: 'rgba(135, 173, 255, 0.35)',
    gradient: 'linear-gradient(181.55deg, #112145 -9.06%, #0A1122 98.39%)',
    glass: 'rgba(45, 58, 89, 0.55)',
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
  matrix: {
    background: '#1c2439',
    headerGlobal: 'rgba(231, 239, 255, 0.35)',
    headerLocal: 'rgba(63, 124, 255, 0.6)',
    headerResource: 'transparent',
    stationGreen: 'rgba(82, 157, 52, 0.35)',
    stationBlue: 'rgba(41, 121, 255, 0.33)',
    cellAllocated: 'linear-gradient(180deg, rgba(99, 255, 106, 0.5) 0%, rgba(66, 228, 73, 0.5) 100%)',
  },
  error: {
    main: '#ff4d4d',
    subtle: 'rgba(244, 67, 54, 0.1)',
  },
  status: {
    ready: '#05df72',
    partlyReady: 'rgba(255, 179, 0, 0.7)',
    damaged: 'rgba(255, 77, 77, 0.5)',
    allocated: '#05df72',
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
    main: '#2563eb', // More vibrant blue
    light: '#60a5fa',
    dark: '#1d4ed8',
    hover: '#1e40af',
    disabled: 'rgba(37, 99, 235, 0.1)',
  },
  secondary: {
    main: '#4b7a4b',
  },
  background: {
    default: '#eff6ff', // Tinted light blue
    paper: '#ffffff',
    dark: 'rgba(37, 99, 235, 0.12)',
    medium: 'rgba(37, 99, 235, 0.18)',
    light: 'rgba(37, 99, 235, 0.05)',
    subtle: 'rgba(37, 99, 235, 0.08)',
    bannerInner: 'rgba(255, 255, 255, 0.95)',
    card: 'rgba(37, 99, 235, 0.1)',
    gradient: 'linear-gradient(181.55deg, #eff6ff -9.06%, #dbeafe 98.39%)',
    glass: 'rgba(255, 255, 255, 0.88)',
  },
  text: {
    primary: '#0f172a', // Slate 900
    secondary: '#334155', // Slate 700
    disabled: 'rgba(15, 23, 42, 0.4)',
    white: '#ffffff',
    placeholder: 'rgba(15, 23, 42, 0.3)',
    muted: '#64748b',
  },
  border: {
    primary: '#94a3b8', // Stronger border
    hover: 'rgba(37, 99, 235, 0.4)',
    focused: 'rgba(37, 99, 235, 0.6)',
    subtle: 'rgba(37, 99, 235, 0.2)',
    divider: 'rgba(37, 99, 235, 0.15)',
    accent: 'rgba(37, 99, 235, 0.35)',
    accentHover: 'rgba(37, 99, 235, 0.55)',
  },
  error: {
    main: '#ef4444',
    subtle: 'rgba(239, 68, 68, 0.05)',
  },
  status: {
    ready: '#22c55e',
    partlyReady: 'rgba(245, 158, 11, 0.9)',
    damaged: 'rgba(239, 68, 68, 0.75)',
    allocated: '#22c55e',
    ku: '#0f172a',
    ka: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
    x: 'linear-gradient(180deg, #16a34a 0%, #15803d 100%)',
  },
  action: {
    hover: 'rgba(37, 99, 235, 0.08)',
    selected: 'rgba(37, 99, 235, 0.12)',
  },
  matrix: {
    background: '#ffffff',
    headerGlobal: 'rgba(37, 99, 235, 0.55)', // Increased opacity
    headerLocal: 'rgba(37, 99, 235, 0.85)', // Increased opacity
    headerResource: 'rgba(37, 99, 235, 0.2)',
    stationGreen: 'rgba(34, 197, 94, 0.65)', // Increased opacity
    stationBlue: 'rgba(37, 99, 235, 0.65)', // Increased opacity
    cellAllocated: 'rgba(34, 197, 94, 0.75)', // Increased opacity
  }
};

// Default export for backward compatibility if needed, but we should use darkColors as default
export const colors = darkColors;

