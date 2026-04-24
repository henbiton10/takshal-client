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
      color: (theme: any) => theme.customColors.text.primary,
      fontFamily: 'sans-serif',
    }}>
      {title}
    </Box>
    <Box sx={{
      background: (theme: any) => type === 'primary' 
        ? `${theme.customColors.status.allocated}26` // 15% opacity from gradient is tricky, but allocated is green-ish
        : `${theme.customColors.primary.main}26`,
      color: (theme: any) => type === 'primary' 
        ? (theme.palette.mode === 'light' ? '#16a34a' : '#42e449')
        : theme.customColors.primary.main,
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
