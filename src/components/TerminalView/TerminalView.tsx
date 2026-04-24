import { EntityView, formatReadinessStatus, ViewSection } from '../../shared/components/EntityView';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled from 'styled-components';

interface TerminalViewProps {
  terminal: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.customColors.text.secondary};
  opacity: 0.8;
`;

export const TerminalView = ({ terminal, onEdit }: TerminalViewProps) => {
  const status = formatReadinessStatus(terminal.readinessStatus);

  const sections: ViewSection[] = [
    {
      title: 'פרטי הטרמינל',
      icon: <IconWrapper><AssignmentIcon sx={{ fontSize: 20 }} /></IconWrapper>,
      fields: [
        { 
          label: 'סטטוס כשירות', 
          value: status.text, 
          statusColor: status.color,
          statusIcon: status.icon
        },
        { label: 'תחום תדר', value: terminal.frequencyBand?.toUpperCase() || 'לא מוגדר' },
        { label: 'סוג טרמינל', value: terminal.terminalType?.name || 'לא מוגדר' },
        { label: 'תחנה קרקעית', value: terminal.station?.name || 'לא משויך' },
        { label: 'הערות כלליות', value: terminal.notes || '', flex: '2' },
      ]
    }
  ];

  return (
    <EntityView
      name={terminal.name}
      icon={<TerminalIcon style={{ fontSize: 21 }} />}
      mainTitle="צפייה בטרמינל"
      subtitle="ניתן לערוך את פרטי הטרמינל"
      editLabel="ערוך טרמינל"
      sections={sections}
      onEdit={onEdit}
    />
  );
};
