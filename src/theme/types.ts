export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    hover: string;
    disabled: string;
  };
  secondary: {
    main: string;
  };
  background: {
    default: string;
    paper: string;
    dark: string;
    medium: string;
    light: string;
    subtle: string;
    bannerInner: string;
    card: string;
    gradient: string;
    glass: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    white: string;
    placeholder: string;
    muted: string;
  };
  border: {
    primary: string;
    hover: string;
    focused: string;
    subtle: string;
    divider: string;
    accent: string;
    accentHover: string;
  };
  error: {
    main: string;
    subtle: string;
  };
  status: {
    ready: string;
    partlyReady: string;
    damaged: string;
    allocated: string;
    ku: string;
    ka: string;
    x: string;
  };
  action: {
    hover: string;
    selected: string;
  };
  matrix: {
    background: string;
    headerGlobal: string;
    headerLocal: string;
    headerResource: string;
    stationGreen: string;
    stationBlue: string;
    cellAllocated: string;
  };
}

export type ThemeMode = 'dark' | 'light';
