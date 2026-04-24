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
  background: ${({ theme }) => theme.customColors.background.gradient};
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
  }
`;
