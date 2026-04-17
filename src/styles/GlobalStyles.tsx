import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    direction: rtl;
  }

  :root {
    font-family: 'Assistant', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    direction: rtl;

    color-scheme: dark;
    color: rgba(255, 255, 255, 0.87);
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    direction: rtl;
  }

  body {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    background: linear-gradient(181.55deg, #112145 -9.06%, #0A1122 98.39%);
    overflow: hidden;
    direction: rtl;
  }

  #root {
    width: 100%;
    height: 100vh;
    direction: rtl;
  }

  /* MUI Portal containers */
  .MuiPopover-root,
  .MuiModal-root,
  .MuiMenu-root {
    direction: rtl;
  }
`;

export default GlobalStyle;
