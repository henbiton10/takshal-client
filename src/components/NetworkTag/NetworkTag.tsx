import PublicIcon from '@mui/icons-material/Public';
import { EquipmentCard, ReadinessStatus } from '../../shared/components/EquipmentCard';

interface NetworkTagProps {
  network: any;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const NetworkTag = ({ network, selected, onClick }: NetworkTagProps) => {
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

  return (
    <EquipmentCard
      id={network.id}
      name={network.name}
      subname={network.terminalType?.name || 'עציץ'}
      icon={<PublicIcon sx={{ fontSize: 20 }} />}
      status={statusMap[network.readinessStatus] || 'ready'}
      statusText={statusTextMap[network.readinessStatus] || 'כשירות מלאה'}
      selected={selected}
      onClick={onClick}
    />
  );
};
