import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { EquipmentCard, ReadinessStatus } from '../../shared/components/EquipmentCard';

interface SatelliteCardProps {
  satellite: any;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const SatelliteCard = ({ satellite, selected, onClick }: SatelliteCardProps) => {
  const statusMap: Record<string, ReadinessStatus> = {
    ready: 'ready',
    partly_ready: 'partial',
    damaged: 'faulty',
  };

  const statusTextMap: Record<string, string> = {
    ready: 'כשירות מלאה',
    partly_ready: 'כשירות חלקית',
    damaged: 'תקול',
  };

  const affiliationMap: Record<string, string> = {
    israeli: 'ישראלי',
    international: 'בינלאומי',
  };

  return (
    <EquipmentCard
      id={satellite.id}
      name={satellite.name}
      subname={affiliationMap[satellite.affiliation] || 'ישראלי'}
      icon={<SatelliteAltIcon sx={{ fontSize: 20 }} />}
      status={statusMap[satellite.readinessStatus] || 'ready'}
      statusText={statusTextMap[satellite.readinessStatus] || 'כשירות מלאה'}
      tags={satellite.hasFrequencyConverter ? ['CONV'] : (satellite.frequencyBand ? [satellite.frequencyBand.toUpperCase()] : [])}
      selected={selected}
      onClick={onClick}
    />
  );
};
