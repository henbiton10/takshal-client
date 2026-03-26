import { EntityView, ViewSection, formatReadinessStatus } from '../../shared/components/EntityView';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { StationIcon } from '../ResourcesManagement/icons/StationIcon';

interface TerminalViewProps {
  terminal: any;
  onEdit: () => void;
  onDelete: () => void;
}

export const TerminalView = ({ terminal, onEdit, onDelete }: TerminalViewProps) => {
  const sections: ViewSection[] = [
    {
      fields: [
        {
          label: 'תחנה קרקעית',
          value: (
            <>
              {terminal.station?.name || 'לא משויך'}
              <StationIcon sx={{ fontSize: 16 }} />
            </>
          ),
        },
        {
          label: 'סוג טרמינל',
          value: terminal.terminalType || 'לא מוגדר',
        },
        {
          label: 'תחום תדר',
          value: terminal.frequencyBand?.toUpperCase() || 'לא מוגדר',
        },
        {
          label: 'סטטוס כשירות',
          value: formatReadinessStatus(terminal.readinessStatus),
        },
      ],
    },
  ];

  if (terminal.notes) {
    sections.push({
      title: 'הערות',
      fields: [
        {
          label: '',
          value: terminal.notes,
          fullWidth: true,
        },
      ],
    });
  }

  return (
    <EntityView
      name={terminal.name}
      icon={<TerminalIcon style={{ fontSize: 24 }} />}
      sections={sections}
      editLabel="ערוך טרמינל"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};
