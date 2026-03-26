import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import { EntityCard } from '../../shared/components/EntityCard';

interface StationCardProps {
  station: {
    id: number;
    name: string;
  };
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const StationCard = ({ station, selected, onClick }: StationCardProps) => {
  return (
    <EntityCard
      id={station.id}
      name={station.name}
      icon={<StationIcon sx={{ fontSize: 20 }} />}
      selected={selected}
      onClick={onClick}
    />
  );
};
