import PublicIcon from '@mui/icons-material/Public';
import { EntityView, ViewSection, formatReadinessStatus } from '../../shared/components/EntityView';

interface NetworkViewProps {
  network: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

export const NetworkView = ({ network, onEdit, onDelete, onClose }: NetworkViewProps) => {
  const sections: ViewSection[] = [
    {
      fields: [
        {
          label: 'סוג טרמינל',
          value: network.terminalType?.name || 'לא מוגדר',
        },
        {
          label: 'סטטוס כשירות',
          value: formatReadinessStatus(network.readinessStatus),
        },
      ],
    },
  ];

  if (network.notes) {
    sections.push({
      title: 'הערות',
      fields: [
        {
          label: '',
          value: network.notes,
          fullWidth: true,
        },
      ],
    });
  }

  return (
    <EntityView
      name={network.name}
      icon={<PublicIcon sx={{ fontSize: 24 }} />}
      sections={sections}
      editLabel="ערוך רשת"
      onEdit={onEdit}
      onDelete={onDelete}
      onClose={onClose}
    />
  );
};
