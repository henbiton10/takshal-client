import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { SatelliteSummary } from '../../services/api/types';
import { EntityCard } from '../../shared/components/EntityCard';

interface SatelliteCardProps {
  satellite: SatelliteSummary;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const SatelliteCard = ({ satellite, selected, onClick }: SatelliteCardProps) => {
  return (
    <EntityCard
      id={satellite.id}
      name={satellite.name}
      icon={<SatelliteAltIcon sx={{ fontSize: 20 }} />}
      selected={selected}
      onClick={onClick}
    />
  );
};
