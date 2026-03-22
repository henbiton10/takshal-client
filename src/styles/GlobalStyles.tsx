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
    color: rgba(255, 255, 255, 0.87);
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    background: linear-gradient(188.23deg, rgb(17, 33, 69) 9.06%, rgb(10, 17, 34) 98.39%);
    overflow: hidden;
    direction: rtl;
  }

  #root {
    width: 100%;
    height: 100vh;
    direction: rtl;
  }
`;

export default GlobalStyle;
