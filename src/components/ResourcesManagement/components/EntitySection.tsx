import { Box } from '@mui/material';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { ViewMode } from '../hooks/useEntityManager';

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  direction: rtl;
`;

const SideBySideContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  direction: rtl;
`;

const CardsColumn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CardsScrollContainer = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  border-right: 2px solid ${theme.colors.border.subtle};
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border.accent};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.border.accentHover};
  }
`;

const ContentContainer = styled.div`
  flex: 0 0 65%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: rgba(225, 234, 255, 0.5);
`;

const EmptyStateTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  color: rgba(225, 234, 255, 0.6);
`;

const EmptyStateSubtitle = styled.div`
  font-size: 11px;
  color: rgba(225, 234, 255, 0.4);
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
  editingData,
  onCardClick,
  onClose,
  onCancel,
  onEdit,
  onDelete,
  onSave,
}: EntitySectionProps) => {
  const { FormComponent, ViewComponent, CardComponent, emptyMessage, emptySubMessage, title } = config;

  if (loading) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center', color: '#aec7ff' }}>
        טוען {title}...
      </Box>
    );
  }

  if (items.length === 0 && viewMode === 'list') {
    return (
      <EmptyState>
        <EmptyStateTitle>{emptyMessage}</EmptyStateTitle>
        <EmptyStateSubtitle>{emptySubMessage}</EmptyStateSubtitle>
      </EmptyState>
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

  const getFormProps = () => {
    const baseProps = {
      onSave,
      initialData: editingData,
      onClose,
      onCancel: selectedId ? onCancel : undefined,
    };
    
    if (config.id === 'satellites') {
      return { ...baseProps, editingSatelliteId: selectedId };
    }
    if (config.id === 'terminals') {
      return { ...baseProps, editingTerminalId: selectedId };
    }
    if (config.id === 'networks') {
      return { ...baseProps, editingNetworkId: selectedId };
    }
    if (config.id === 'stations') {
      return { ...baseProps, editingStationId: selectedId };
    }
    return { ...baseProps, editingId: selectedId };
  };

  const renderCards = () => (
    <CardsGrid>
      {items.map((item) => (
        <CardComponent 
          key={item.id} 
          {...getCardProps(item)}
          selected={item.id === selectedId}
          onClick={onCardClick}
        />
      ))}
    </CardsGrid>
  );

  // View mode - show entity details with edit button
  if (viewMode === 'view' && selectedData) {
    return (
      <SideBySideContainer>
        <CardsColumn>
          <CardsScrollContainer>
            {renderCards()}
          </CardsScrollContainer>
        </CardsColumn>
        <ContentContainer>
          <ViewComponent {...getViewProps()} />
        </ContentContainer>
      </SideBySideContainer>
    );
  }

  // Edit mode - show form
  if (viewMode === 'edit') {
    return (
      <SideBySideContainer>
        <CardsColumn>
          <CardsScrollContainer>
            {renderCards()}
          </CardsScrollContainer>
        </CardsColumn>
        <ContentContainer>
          <FormComponent {...getFormProps()} />
        </ContentContainer>
      </SideBySideContainer>
    );
  }

  // List mode - show only cards
  if (items.length > 0) {
    return renderCards();
  }

  return null;
};
