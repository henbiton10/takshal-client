import { TerminalSummary } from '../../services/api/types';
import { TerminalIcon } from '../ResourcesManagement/icons/TerminalIcon';
import { EntityCard } from '../../shared/components/EntityCard';

interface TerminalCardProps {
  terminal: TerminalSummary;
  selected?: boolean;
  onClick?: (id: number) => void;
}

export const TerminalCard = ({ terminal, selected, onClick }: TerminalCardProps) => {
  return (
    <EntityCard
      id={terminal.id}
      name={terminal.name}
      icon={<TerminalIcon style={{ fontSize: 20 }} />}
      selected={selected}
      onClick={onClick}
    />
  );
};
