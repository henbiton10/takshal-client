import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'דאשבורד',
    icon: <DashboardIcon />,
  },
  {
    id: 'resources',
    label: 'אמצעים',
    icon: <CellTowerIcon />,
  },
  {
    id: 'operations',
    label: 'פמ״ים',
    icon: <TableViewIcon />,
  },
];
