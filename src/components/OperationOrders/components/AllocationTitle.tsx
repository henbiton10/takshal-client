import { Box } from '@mui/material';

interface AllocationTitleProps {
  title: string;
  type: 'primary' | 'secondary';
}

export const AllocationTitle = ({ title, type }: AllocationTitleProps) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 2,
    justifyContent: 'flex-start'
  }}>
    <Box sx={{
      fontSize: '16px',
      fontWeight: 700,
      color: '#fafafa',
      fontFamily: 'sans-serif',
      opacity: 0.9
    }}>
      {title}
    </Box>
    <Box sx={{
      background: type === 'primary' ? 'rgba(0, 188, 125, 0.15)' : 'rgba(59, 130, 246, 0.15)',
      color: type === 'primary' ? '#0bc78d' : '#3b82f6',
      padding: '4px 16px',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: 700,
      fontFamily: 'sans-serif'
    }}>
      {type === 'primary' ? 'ראשי' : 'משני'}
    </Box>
  </Box>
);
