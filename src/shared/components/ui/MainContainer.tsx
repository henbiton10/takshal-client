import styled from 'styled-components';
import { Box } from '@mui/material';
import { theme } from '../../../theme';

export const MainContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.xl};
  width: 100%;
  direction: rtl;
`;
