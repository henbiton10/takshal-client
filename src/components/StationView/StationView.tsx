import { EntityView, formatReadinessStatus, ViewSection } from '../../shared/components/EntityView';
import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import styled from 'styled-components';
import iafIcon from '../../assets/IAF.png';
import c4iIcon from '../../assets/C4I.svg';

interface StationViewProps {
  station: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const getAffiliationData = (affiliation: string): { label: string; icon?: string } => {
  if (affiliation === 'airforce') return { label: 'חה"א', icon: iafIcon };
  if (affiliation === 'tikshuv') return { label: 'אגף התקשוב', icon: c4iIcon };
  return { label: affiliation };
};

const formatCommType = (type: string): string => {
  const types: Record<string, string> = {
    fiber_optic: 'אופטי', radio: 'רדיו', satellite: 'לוויני', microwave: 'גל מיקרו',
  };
  return types[type] || type;
};

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.customColors.text.secondary};
  opacity: 0.8;
`;

export const StationView = ({ station, onEdit }: StationViewProps) => {
  const status = formatReadinessStatus(station.readinessStatus);
  const connectivities = station.connectivities || [];
  const antennas = station.antennas || [];

  const affData = getAffiliationData(station.organizationalAffiliation);

  const sections: ViewSection[] = [
    {
      title: 'פרטי התחנה',
      icon: <IconWrapper><AssignmentIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [
        { 
          label: 'שייכות ארגונית', 
          value: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {affData.icon && <img src={affData.icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />}
              <span>{affData.label}</span>
            </div>
          )
        },
        { 
          label: 'סטטוס כשירות', 
          value: status.text, 
          statusColor: status.color,
          statusIcon: status.icon
        },
        { label: 'הערות כלליות', value: station.notes || '', flex: '2' },
      ]
    }
  ];

  if (connectivities.length > 0) {
    sections.push({
      title: 'קישוריות',
      icon: <IconWrapper><LinkIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      tags: connectivities.map((c: any, index: number) => ({
        id: c.id || index,
        label: c.connectedStation?.name || 'תחנה',
        icon: <LinkIcon sx={{ fontSize: 20 }} />,
        metadata: [
          { label: formatCommType(c.communicationType) },
          { label: `${c.channelCount} ערוצים` }
        ]
      }))
    });
  } else {
    sections.push({
      title: 'קישוריות',
      icon: <IconWrapper><LinkIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [{ label: 'סטטוס קישוריות', value: 'אין קישוריות מוגדרת', fullWidth: true }]
    });
  }

  if (station.terminals && station.terminals.length > 0) {
    sections.push({
      title: 'טרמינלים',
      icon: <IconWrapper><TerminalIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      tags: station.terminals.map((t: any, index: number) => ({
        id: t.id || index,
        label: t.name || `טרמינל ${index + 1}`,
        icon: <TerminalIcon sx={{ fontSize: 20 }} />
      }))
    });
  }

  if (antennas.length > 0) {
    sections.push({
      title: 'אנטנות',
      icon: <IconWrapper><SettingsInputAntennaIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      tags: antennas.map((a: any, index: number) => ({
        id: a.id || index,
        label: `${a.size} מטר`,
        icon: <SettingsInputAntennaIcon sx={{ fontSize: 20 }} />,
        metadata: [
          { label: a.frequencyBand?.toUpperCase() || 'N/A' }
        ]
      }))
    });
  } else {
    sections.push({
      title: 'אנטנות',
      icon: <IconWrapper><SettingsInputAntennaIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [{ label: 'סטטוס אנטנות', value: 'לא הוספו אנטנות', fullWidth: true }]
    });
  }

  return (
    <EntityView
      name={station.name}
      icon={<StationIcon sx={{ fontSize: 21 }} />}
      mainTitle="צפייה בתחנה"
      subtitle="ניתן לערוך את פרטי התחנה"
      editLabel="ערוך תחנה"
      sections={sections}
      onEdit={onEdit}
    />
  );
};
