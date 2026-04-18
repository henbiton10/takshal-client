import styled from 'styled-components';

export const AppLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  direction: ltr;
`;

export const MainContent = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(181.55deg, #112145 -9.06%, #0A1122 98.39%);
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
  }
`;
