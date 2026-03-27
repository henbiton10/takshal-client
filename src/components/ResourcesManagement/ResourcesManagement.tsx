import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { ResourcesManagementProps } from './types';
import { ENTITY_CONFIGS, ENTITY_CONFIGS_ARRAY } from './entityConfig';
import { useEntityManager } from './hooks';
import { EntitySection } from './components';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { theme } from '../../theme';

const Container = styled.div`
  padding: 32px 40px;
  max-width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  color: white;
  font-size: 26px;
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const AccordionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledAccordion = styled(Accordion)`
  && {
    background: rgba(30, 45, 80, 0.4);
    border-radius: 8px;
    border: 1px solid rgba(174, 199, 255, 0.08);
    box-shadow: none;
    
    &:before {
      display: none;
    }
    
    &.Mui-expanded {
      margin: 0;
      background: rgba(30, 45, 80, 0.5);
    }
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  && {
    min-height: 56px;
    padding: 0 20px;
    
    .MuiAccordionSummary-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0;
      
      &.Mui-expanded {
        margin: 12px 0;
      }
    }
    
    .MuiAccordionSummary-expandIconWrapper {
      color: rgba(174, 199, 255, 0.6);
      
      &.Mui-expanded {
        color: #aec7ff;
      }
    }
  }
`;

const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  flex-direction: row-reverse;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
`;

const SectionTitle = styled.h3`
  color: rgba(225, 234, 255, 0.9);
  font-size: 14px;
  margin: 0;
  font-weight: 500;
`;

const SummaryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddHeaderButton = styled(Button)`
  && {
    background: #4a5569;
    color: white;
    border-radius: 16px;
    padding: 4px 12px;
    text-transform: none;
    font-weight: 500;
    font-size: 12px;
    min-width: auto;
    &:hover {
      background: #5a6579;
    }
    
    .MuiButton-startIcon {
      margin-left: 4px;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  && {
    padding: 25px;
    border-top: 1px solid rgba(174, 199, 255, 0.08);
    background: rgba(17, 33, 69, 0.3);
  }
`;

interface DeleteDialogState {
  open: boolean;
  entityId: string | null;
  itemId: number | null;
  itemName: string;
}

export const ResourcesManagement = ({
  onSaveStation,
  onSaveSatellite,
  onSaveTerminal,
  onSaveNetwork,
}: ResourcesManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const prevSearchQuery = useRef('');
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    entityId: null,
    itemId: null,
    itemName: '',
  });

  // Create entity managers for each entity type
  const stationsManager = useEntityManager(ENTITY_CONFIGS.stations);
  const satellitesManager = useEntityManager(ENTITY_CONFIGS.satellites);
  const terminalsManager = useEntityManager(ENTITY_CONFIGS.terminals);
  const networksManager = useEntityManager(ENTITY_CONFIGS.networks);

  const entityManagers = {
    stations: stationsManager,
    satellites: satellitesManager,
    terminals: terminalsManager,
    networks: networksManager,
  };

  // Keep a ref to access latest managers in callbacks
  const managersRef = useRef(entityManagers);
  managersRef.current = entityManagers;

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    const result: Record<string, any[]> = {};
    const query = searchQuery.trim().toLowerCase();
    
    Object.entries(entityManagers).forEach(([key, manager]) => {
      const activeItems = manager.items.filter((item: any) => !item.isDeleted);
      if (!query) {
        result[key] = activeItems;
      } else {
        result[key] = activeItems.filter((item: any) => 
          item.name?.toLowerCase().includes(query)
        );
      }
    });
    
    return result;
  }, [searchQuery, entityManagers.stations.items, entityManagers.satellites.items, entityManagers.terminals.items, entityManagers.networks.items]);

  // Fetch all items when search starts and auto-expand/collapse sections
  useEffect(() => {
    const query = searchQuery.trim();
    const prevQuery = prevSearchQuery.current.trim();
    
    if (query) {
      // Fetch items for all sections if not already loaded
      Object.values(entityManagers).forEach((manager) => {
        if (manager.items.length === 0 && !manager.loading) {
          manager.fetchItems();
        }
      });

      // Auto-expand sections with results, collapse those without
      const sectionsWithResults = new Set<string>();
      Object.entries(filteredItems).forEach(([sectionId, items]) => {
        if (items.length > 0) {
          sectionsWithResults.add(sectionId);
        }
      });
      
      setExpandedSections(sectionsWithResults);
    } else if (prevQuery && !query) {
      // Collapse all sections only when search is cleared (was searching, now not)
      setExpandedSections(new Set());
    }
    
    prevSearchQuery.current = searchQuery;
  }, [searchQuery, filteredItems]);

  // Auto-refresh expanded sections every 10 seconds (only when in list mode)
  useEffect(() => {
    const interval = setInterval(() => {
      expandedSections.forEach((sectionId) => {
        const manager = managersRef.current[sectionId as keyof typeof entityManagers];
        // Only refresh if in list mode (not editing or viewing)
        if (manager && !manager.loading && manager.viewMode === 'list') {
          manager.fetchItems(true); // silent refresh - no loading state
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [expandedSections]);

  const handleAccordionChange = useCallback(
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSections((prev) => {
        const newSet = new Set(prev);
        if (isExpanded) {
          newSet.add(panel);
        } else {
          newSet.delete(panel);
        }
        return newSet;
      });
      
      const manager = managersRef.current[panel as keyof typeof entityManagers];
      if (manager) {
        if (isExpanded) {
          manager.fetchItems();
        } else {
          manager.resetAll();
        }
      }
    },
    [],
  );

  const handleAddClick = useCallback((sectionId: string) => {
    const manager = managersRef.current[sectionId as keyof typeof entityManagers];
    if (manager) {
      manager.switchToAddMode();
    }
  }, []);

  const createSaveHandler = useCallback((entityId: string, onSaveCallback?: (data: any) => Promise<void>) => {
    return async (formData: any) => {
      const manager = managersRef.current[entityId as keyof typeof entityManagers];
      if (manager) {
        await manager.handleSave(formData, onSaveCallback);
      }
    };
  }, []);

  const handleCardClick = useCallback((entityId: string, itemId: number) => {
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) {
      manager.handleCardClick(itemId);
    }
  }, []);

  const handleEditClick = useCallback((entityId: string) => {
    const manager = managersRef.current[entityId as keyof typeof entityManagers];
    if (manager) {
      manager.switchToEditMode();
    }
  }, []);

  const handleDeleteClick = useCallback((entityId: string, itemId: number, itemName: string) => {
    setDeleteDialog({
      open: true,
      entityId,
      itemId,
      itemName,
    });
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteDialog.entityId && deleteDialog.itemId) {
      const manager = managersRef.current[deleteDialog.entityId as keyof typeof entityManagers];
      if (manager) {
        try {
          await manager.handleDelete(deleteDialog.itemId);
        } catch (error) {
          console.error('Failed to delete:', error);
        }
      }
    }
    setDeleteDialog({ open: false, entityId: null, itemId: null, itemName: '' });
  }, [deleteDialog.entityId, deleteDialog.itemId]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialog({ open: false, entityId: null, itemId: null, itemName: '' });
  }, []);

  return (
    <Container>
      <Header>
        <Title>הגדרת אמצעים</Title>
      </Header>

      <SearchContainer>
        <TextField
          placeholder="חיפוש"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(225, 234, 255, 0.4)', fontSize: '16px' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(20, 35, 65, 0.5)',
              borderRadius: '20px',
              paddingRight: '12px',
              '& fieldset': {
                borderColor: 'rgba(174, 199, 255, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(174, 199, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(174, 199, 255, 0.3)',
              },
            },
            '& input': {
              padding: '10px 0',
              fontSize: '13px',
              color: '#e1eaff',
              direction: 'rtl',
            },
            '& input::placeholder': {
              direction: 'rtl',
              color: 'rgba(225, 234, 255, 0.4)',
              opacity: 1,
              textAlign: 'right',
            },
          }}
        />
      </SearchContainer>

      <AccordionsContainer>
        {ENTITY_CONFIGS_ARRAY.map((config) => {
          const manager = entityManagers[config.id as keyof typeof entityManagers];
          const hasImplementation = !!manager;

          return (
            <StyledAccordion
              key={config.id}
              expanded={expandedSections.has(config.id)}
              onChange={handleAccordionChange(config.id)}
            >
              <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                {expandedSections.has(config.id) && (
                  <SummaryActions onClick={(e) => e.stopPropagation()}>
                    <AddHeaderButton
                      startIcon={<AddIcon />}
                      onClick={() => handleAddClick(config.id)}
                    >
                      הוסף {config.title}
                    </AddHeaderButton>
                  </SummaryActions>
                )}
                <SummaryContent>
                  <SectionIcon>{config.icon}</SectionIcon>
                  <SectionTitle>{config.title}</SectionTitle>
                </SummaryContent>
              </StyledAccordionSummary>

              {expandedSections.has(config.id) && (
                <StyledAccordionDetails>
                  {hasImplementation && manager ? (
                    <EntitySection
                      config={config}
                      items={filteredItems[config.id] || manager.items}
                      loading={manager.loading}
                      viewMode={manager.viewMode}
                      selectedId={manager.selectedId}
                      selectedData={manager.selectedData}
                      editingData={manager.editingData}
                      onCardClick={(id) => handleCardClick(config.id, id)}
                      onEdit={() => handleEditClick(config.id)}
                      onDelete={(id, name) => handleDeleteClick(config.id, id, name)}
                      onSave={createSaveHandler(
                        config.id, 
                        config.id === 'stations' ? onSaveStation :
                        config.id === 'satellites' ? onSaveSatellite : 
                        config.id === 'terminals' ? onSaveTerminal :
                        config.id === 'networks' ? onSaveNetwork : 
                        undefined
                      )}
                    />
                  ) : (
                    <Box sx={{ padding: '20px', textAlign: 'center', color: '#aec7ff' }}>
                      טופס {config.title} בפיתוח
                    </Box>
                  )}
                </StyledAccordionDetails>
              )}
            </StyledAccordion>
          );
        })}
      </AccordionsContainer>

      <ConfirmDialog
        open={deleteDialog.open}
        message={`האם אתה בטוח שברצונך למחוק את ${deleteDialog.itemName}?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Container>
  );
};
