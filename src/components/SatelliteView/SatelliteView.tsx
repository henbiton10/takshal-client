import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import { EntityView, ViewSection, formatReadinessStatus } from '../../shared/components/EntityView';

interface SatelliteViewProps {
  satellite: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const formatAffiliation = (affiliation: string): string => {
  if (affiliation === 'israeli') return 'ישראלי';
  if (affiliation === 'international') return 'בינלאומי';
  return affiliation;
};

export const SatelliteView = ({ satellite, onEdit, onDelete, onClose }: SatelliteViewProps) => {
  const sections: ViewSection[] = [
    {
      fields: [
        {
          label: 'שייכות',
          value: formatAffiliation(satellite.affiliation),
        },
        {
          label: 'ממיר תדר',
          value: satellite.hasFrequencyConverter ? 'כן' : 'לא',
        },
        {
          label: 'סטטוס כשירות',
          value: formatReadinessStatus(satellite.readinessStatus),
        },
        {
          label: 'קישור למאגר',
          value: 'אין',
        },
      ],
    },
  ];

  if (satellite.notes) {
    sections.push({
      title: 'הערות',
      fields: [
        {
          label: '',
          value: satellite.notes,
          fullWidth: true,
        },
      ],
    });
  }

  return (
    <EntityView
      name={satellite.name}
      icon={<SatelliteAltIcon sx={{ fontSize: 24 }} />}
      badge={formatAffiliation(satellite.affiliation)}
      sections={sections}
      editLabel="ערוך לווין"
      onEdit={onEdit}
      onDelete={onDelete}
      onClose={onClose}
    />
  );
};
