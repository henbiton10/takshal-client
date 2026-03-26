import PublicIcon from '@mui/icons-material/Public';
import { EntityCard } from '../../shared/components/EntityCard';

interface NetworkTagProps {
  network: {
    id: number;
    name: string;
  };
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const NetworkTag = ({ network, selected, onClick }: NetworkTagProps) => {
  return (
    <EntityCard
      id={network.id}
      name={network.name}
      icon={<PublicIcon sx={{ fontSize: 20 }} />}
      selected={selected}
      onClick={onClick}
    />
  );
};
