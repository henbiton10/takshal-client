import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import { EquipmentCard, ReadinessStatus } from '../../shared/components/EquipmentCard';

interface StationCardProps {
  station: any;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const StationCard = ({ station, selected, onClick }: StationCardProps) => {
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
    tikshuv: 'חיל הקשר',
    airforce: 'חיל האוויר',
  };

  const tags = station.antennas?.map((a: any) => a.frequencyBand) || [];
  const uniqueTags = Array.from(new Set(tags)) as string[];

  const mainConnectivity = station.connectivities?.[0];
  const connectivityText = mainConnectivity 
    ? (station.connectivities.length > 1 ? `${mainConnectivity.connectedStation?.name || 'תחנה'} +${station.connectivities.length - 1}` : mainConnectivity.connectedStation?.name || 'תחנה')
    : 'אין קישוריות';

  return (
    <EquipmentCard
      id={station.id}
      name={station.name}
      subname={affiliationMap[station.organizationalAffiliation] || 'חיל האוויר'}
      icon={<StationIcon sx={{ fontSize: 20 }} />}
      status={statusMap[station.readinessStatus] || 'ready'}
      statusText={statusTextMap[station.readinessStatus] || 'כשירות מלאה'}
      tags={uniqueTags}
      connectivity={connectivityText}
      connectivityIcon={mainConnectivity ? 'link' : 'link_off'}
      selected={selected}
      onClick={onClick}
    />
  );
};
