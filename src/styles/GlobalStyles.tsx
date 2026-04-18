import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: 'Assistant', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    direction: rtl;
    color-scheme: dark;
  }

  html {
    direction: rtl;
  }

  body {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    direction: rtl;
    /* Background handled by MuiCssBaseline in theme.ts */
  }

  #root {
    width: 100%;
    height: 100vh;
    direction: rtl;
  }

  /* MUI Portal containers - basic direction fix */
  .MuiPopover-root,
  .MuiModal-root,
  .MuiMenu-root,
  .MuiAutocomplete-popper {
    direction: rtl;
  }

  /* RTL alignment for input ornaments */
  .MuiAutocomplete-root .MuiAutocomplete-endAdornment {
    left: 9px !important;
    right: auto !important;
  }

  /* Scrollbar - matching theme.ts */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default GlobalStyle;
