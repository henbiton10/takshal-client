export const colors = {
  primary: {
    main: '#5a7a5a',
    hover: '#6a8a6a',
    disabled: 'rgba(90, 122, 90, 0.3)',
  },
  background: {
    dark: 'rgba(25, 40, 70, 0.4)',
    medium: 'rgba(60, 75, 100, 0.4)',
    light: 'rgba(60, 70, 90, 0.5)',
    subtle: 'rgba(100, 110, 130, 0.4)',
    bannerInner: 'rgba(16, 33, 62, 0.62)',
    card: 'rgba(135, 173, 255, 0.35)'
  },
  text: {
    primary: 'rgba(225, 234, 255, 0.95)',
    secondary: 'rgba(225, 234, 255, 0.8)',
    disabled: 'rgba(225, 234, 255, 0.3)',
    white: '#ffffff',
    placeholder: 'rgba(255, 255, 255, 0.5)',
  },
  border: {
    primary: 'rgba(255, 255, 255, 0.23)',
    hover: 'rgba(255, 255, 255, 0.4)',
    focused: 'rgba(255, 255, 255, 0.5)',
    subtle: 'rgba(255, 255, 255, 0.15)',
    divider: 'rgba(255, 255, 255, 0.1)',
    accent: 'rgba(174, 199, 255, 0.3)',
    accentHover: 'rgba(174, 199, 255, 0.5)',
  },
  error: {
    main: '#ff4d4d',
  },
  status: {
    ready: 'linear-gradient(180deg, rgba(99, 255, 106, 0.4) 0%, rgba(66, 228, 73, 0.4) 100%)',
    partlyReady: 'rgba(255, 179, 0, 0.7)',
    damaged: 'rgba(255, 77, 77, 0.5)',
    allocated: 'linear-gradient(180deg, rgba(99, 255, 106, 0.4) 0%, rgba(66, 228, 73, 0.4) 100%)',
    ku: '#ffffff',
    ka: 'linear-gradient(180deg, #ff9900 0%, #cc7a00 100%)',
    x: 'linear-gradient(180deg, #4caf50 0%, #388e3c 100%)',

  }
} as const;

