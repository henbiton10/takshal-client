import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    direction: rtl;
    color-scheme: ${props => props.theme.palette.mode};
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
    scrollbar-color: ${props => props.theme.customColors.border.divider} transparent;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${props => props.theme.customColors.border.divider};
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.customColors.border.subtle};
  }

  /* react-grid-layout styles */
  .react-grid-layout {
    position: relative;
    transition: height 200ms ease;
  }
  .react-grid-item {
    transition: all 200ms ease;
    transition-property: left, top, transform;
    transform-origin: 0 0;
  }
  .react-grid-item.cssTransforms {
    transition-property: transform;
  }
  .react-grid-item.resizing {
    z-index: 1;
    will-change: width, height;
  }
  .react-grid-item.react-draggable-dragging {
    transition: none;
    z-index: 3;
    will-change: transform;
  }
  .react-grid-item.dropping {
    visibility: hidden;
  }
  .react-grid-placeholder {
    background: ${props => props.theme.customColors.background.subtle};
    border-radius: 12px;
    z-index: 2;
    user-select: none;
  }
  .react-resizable-handle {
    position: absolute;
    z-index: 10;
    display: none; /* Hide by default */
  }

  .is-editing .react-resizable-handle {
    display: block; /* Show only in edit mode */
  }
  .react-resizable-handle-s {
    cursor: ns-resize;
    height: 10px;
    width: 100%;
    bottom: -5px;
    left: 0;
  }
  .react-resizable-handle-e {
    cursor: ew-resize;
    width: 10px;
    height: 100%;
    right: -5px;
    top: 0;
  }
  .react-resizable-handle-w {
    cursor: ew-resize;
    width: 10px;
    height: 100%;
    left: -5px;
    top: 0;
  }
  .react-resizable-handle-n {
    cursor: ns-resize;
    height: 10px;
    width: 100%;
    top: -5px;
    left: 0;
  }
  .react-resizable-handle-se { cursor: se-resize; width: 20px; height: 20px; right: 0; bottom: 0; }
  .react-resizable-handle-sw { cursor: sw-resize; width: 20px; height: 20px; left: 0; bottom: 0; }
  .react-resizable-handle-ne { cursor: ne-resize; width: 20px; height: 20px; right: 0; top: 0; }
  .react-resizable-handle-nw { cursor: nw-resize; width: 20px; height: 20px; left: 0; top: 0; }

  .is-editing .react-resizable-handle-se::after {
    content: "";
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${props => props.theme.customColors.border.subtle};
    border-bottom: 2px solid ${props => props.theme.customColors.border.subtle};
  }

  /* Show a subtle indicator on hover for border handles only in edit mode */
  .is-editing .react-grid-item:hover .react-resizable-handle {
    background: ${props => props.theme.customColors.background.dark};
  }
  
  .is-editing .react-grid-item .react-resizable-handle:hover {
    background: ${props => props.theme.customColors.background.medium} !important;
  }
`;

export default GlobalStyle;
