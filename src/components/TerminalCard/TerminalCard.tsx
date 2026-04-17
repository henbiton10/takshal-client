import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { EquipmentCard, ReadinessStatus } from '../../shared/components/EquipmentCard';

interface TerminalCardProps {
  terminal: any;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const TerminalCard = ({ terminal, selected, onClick }: TerminalCardProps) => {
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
      id={terminal.id}
      name={terminal.name}
      subname={terminal.station?.name || 'תחנה'}
      icon={<TerminalIcon style={{ fontSize: 20 }} />}
      status={statusMap[terminal.readinessStatus] || 'ready'}
      statusText={statusTextMap[terminal.readinessStatus] || 'כשירות מלאה'}
      tags={terminal.frequencyBand ? [terminal.frequencyBand] : []}
      selected={selected}
      onClick={onClick}
    />
  );
};
