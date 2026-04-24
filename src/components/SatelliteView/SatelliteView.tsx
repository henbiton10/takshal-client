import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { EntityView, formatReadinessStatus, ViewSection } from '../../shared/components/EntityView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled from 'styled-components';
import israelIcon from '../../assets/israel.png';
import earthIcon from '../../assets/earth.png';

interface SatelliteViewProps {
  satellite: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const getAffiliationData = (affiliation: string): { label: string; icon?: string } => {
  if (affiliation === 'israeli') return { label: 'ישראלי', icon: israelIcon };
  if (affiliation === 'international') return { label: 'בינלאומי', icon: earthIcon };
  return { label: affiliation };
};

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.customColors.text.secondary};
  opacity: 0.8;
`;

export const SatelliteView = ({ satellite, onEdit }: SatelliteViewProps) => {
  const status = formatReadinessStatus(satellite.readinessStatus);
  const affData = getAffiliationData(satellite.affiliation);

  const sections: ViewSection[] = [
    {
      title: 'פרטי הלווין',
      icon: <IconWrapper><AssignmentIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [
        { 
          label: 'שייכות', 
          value: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {affData.icon && <img src={affData.icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />}
              <span>{affData.label}</span>
            </div>
          )
        },
        { label: 'ממיר תדר', value: satellite.hasFrequencyConverter ? 'כן' : 'לא' },
        ...(satellite.frequencyBand ? [{ label: 'תחום תדר', value: satellite.frequencyBand.toUpperCase() }] : []),
        { 
          label: 'סטטוס כשירות', 
          value: status.text, 
          statusColor: status.color,
          statusIcon: status.icon
        },
        { label: 'הערות כלליות', value: satellite.notes || '', flex: '2' },
      ]
    }
  ];

  return (
    <EntityView
      name={satellite.name}
      icon={<SatelliteAltIcon sx={{ fontSize: 21 }} />}
      mainTitle="צפייה בלווין"
      subtitle="ניתן לערוך את פרטי הלווין"
      editLabel="ערוך לווין"
      sections={sections}
      onEdit={onEdit}
    />
  );
};
