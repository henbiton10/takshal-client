import { Box } from '@mui/material';
import styled from 'styled-components';
import { ViewMode } from '../hooks/useEntityManager';
import { BigEmptyState } from '../../../shared/components/ui/BigEmptyState';

const ColumnContainer = styled.div`
  column-width: 350px;
  column-gap: 20px;
  width: 100%;
  direction: rtl;
  
  & > * {
    break-inside: avoid;
    margin-bottom: 20px;
  }
`;

interface EntitySectionProps {
  config: any;
  items: any[];
  loading: boolean;
  viewMode: ViewMode;
  selectedId: number | null;
  selectedData: any;
  editingData: any;
  onCardClick: (id: number) => void;
  onClose: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: (id: number, name: string) => void;
  onSave: (data: any) => Promise<void>;
}

export const EntitySection = ({
  config,
  items,
  loading,
  viewMode,
  selectedId,
  selectedData,
  onCardClick,
  onClose,
  onEdit,
  onDelete,
}: EntitySectionProps) => {
  const { ViewComponent, CardComponent, emptyMessage, emptySubMessage, title } = config;

  if (loading) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center', color: '#aec7ff', width: '100%', display: 'flex', justifyContent: 'center' }}>
        טוען {title}...
      </Box>
    );
  }

  if (items.length === 0 && viewMode === 'list') {
    return (
      <BigEmptyState 
        icon={config.icon}
        title={emptyMessage}
        subtitle={emptySubMessage}
      />
    );
  }

  const getCardProps = (item: any) => {
    if (config.id === 'satellites') return { satellite: item };
    if (config.id === 'terminals') return { terminal: item };
    if (config.id === 'networks') return { network: item };
    if (config.id === 'stations') return { station: item };
    return { item };
  };

  const getViewProps = () => {
    const handleDelete = () => {
      if (selectedData?.id && selectedData?.name) {
        onDelete(selectedData.id, selectedData.name);
      }
    };
    
    if (config.id === 'satellites') return { satellite: selectedData, onEdit, onDelete: handleDelete, onClose };
    if (config.id === 'terminals') return { terminal: selectedData, onEdit, onDelete: handleDelete, onClose };
    if (config.id === 'networks') return { network: selectedData, onEdit, onDelete: handleDelete, onClose };
    if (config.id === 'stations') return { station: selectedData, onEdit, onDelete: handleDelete, onClose };
    return { data: selectedData, onEdit, onDelete: handleDelete, onClose };
  };

  const renderCards = () => {
    return (
      <ColumnContainer>
        {items.map((item) => (
          <CardComponent 
            key={item.id} 
            {...getCardProps(item)}
            selected={item.id === selectedId}
            onClick={onCardClick}
          />
        ))}
      </ColumnContainer>
    );
  };

  // View mode - show entity details full page
  if (viewMode === 'view' && selectedData) {
    return <ViewComponent {...getViewProps()} />;
  }

  // List mode - show only cards
  if (items.length > 0) {
    return renderCards();
  }

  return null;
};
