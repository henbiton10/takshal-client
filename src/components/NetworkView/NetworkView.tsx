import PublicIcon from '@mui/icons-material/Public';
import { EntityView, formatReadinessStatus, ViewSection } from '../../shared/components/EntityView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled from 'styled-components';

interface NetworkViewProps {
  network: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.customColors.text.secondary};
  opacity: 0.8;
`;

export const NetworkView = ({ network, onEdit }: NetworkViewProps) => {
  const status = formatReadinessStatus(network.readinessStatus);

  const sections: ViewSection[] = [
    {
      title: 'פרטי הרשת',
      icon: <IconWrapper><AssignmentIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [
        { label: 'סוג טרמינל', value: network.terminalType?.name || 'לא מוגדר' },
        { 
          label: 'סטטוס כשירות', 
          value: status.text, 
          statusColor: status.color,
          statusIcon: status.icon
        },
        { label: 'הערות כלליות', value: network.notes || '', fullWidth: true },
      ]
    }
  ];

  return (
    <EntityView
      name={network.name}
      icon={<PublicIcon sx={{ fontSize: 21 }} />}
      mainTitle="צפייה ברשת"
      subtitle="ניתן לערוך את פרטי הרשת"
      editLabel="ערוך רשת"
      sections={sections}
      onEdit={onEdit}
    />
  );
};
