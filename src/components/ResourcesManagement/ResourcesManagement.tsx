import { useState, useCallback, useEffect } from 'react';
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
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import PublicIcon from '@mui/icons-material/Public';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import styled from 'styled-components';
import { ResourcesManagementProps } from './types';
import { SatelliteForm } from '../SatelliteForm';
import { SatelliteFormData } from '../SatelliteForm/types';
import { SatelliteCard } from '../SatelliteCard';
import { TerminalIcon } from './icons/TerminalIcon';
import { StationIcon } from './icons/StationIcon';
import { satellitesApi, SatelliteSummary } from '../../services/api';
import { theme } from '../../theme';

const Container = styled.div`
  padding: 32px 40px;
  max-width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  color: #e1eaff;
  font-size: 20px;
  font-weight: 500;
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

const SatellitesGrid = styled.div<{ hasForm: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  direction: rtl;
`;

const FormWithCardsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  direction: rtl;
`;

const CardsColumn = styled.div`
  flex: 0 0 35%;
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

const FormContainer = styled.div`
  flex: 0 0 65%;
`;

const RESOURCE_SECTIONS = [
  {
    id: 'stations',
    title: 'תחנות',
    icon: <StationIcon />,
    emptyMessage: 'לא נמצאו תחנות זמינות',
    emptySubMessage: 'תחנות חדשות יופיעו כאן ברגע שתוספנה',
  },
  {
    id: 'satellites',
    title: 'לווין',
    icon: <SatelliteAltIcon />,
    emptyMessage: 'לא נמצאו לווינים זמינים',
    emptySubMessage: 'לווינים חדשים יופיעו כאן ברגע שיוספו',
  },
  {
    id: 'terminals',
    title: 'טרמינלים',
    icon: <TerminalIcon />,
    emptyMessage: 'לא נמצאו טרמינלים זמינים',
    emptySubMessage: 'טרמינלים חדשים יופיעו כאן ברגע שיוספו',
  },
  {
    id: 'networks',
    title: 'רשת',
    icon: <PublicIcon />,
    emptyMessage: 'לא נמצאו רשתות זמינות',
    emptySubMessage: 'רשתות חדשות יופיעו כאן ברגע שתוספנה',
  },
  {
    id: 'connectivity',
    title: 'קישוריות בקרקע',
    icon: <RemoveCircleOutlineIcon />,
    emptyMessage: 'לא נמצאו קישוריות זמינות',
    emptySubMessage: 'קישוריות חדשות יופיעו כאן ברגע שתוספנה',
  },
];

export const ResourcesManagement = ({
  onSaveSatellite,
}: ResourcesManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['stations']));
  const [showAddForm, setShowAddForm] = useState<Record<string, boolean>>({});
  const [satellites, setSatellites] = useState<SatelliteSummary[]>([]);
  const [loadingSatellites, setLoadingSatellites] = useState(false);
  const [editingSatelliteId, setEditingSatelliteId] = useState<number | null>(null);
  const [editingSatelliteData, setEditingSatelliteData] = useState<any>(null);

  const fetchSatellites = useCallback(async () => {
    setLoadingSatellites(true);
    try {
      const data = await satellitesApi.getAllSummary();
      setSatellites(data);
    } catch (error) {
      console.error('Failed to fetch satellites:', error);
    } finally {
      setLoadingSatellites(false);
    }
  }, []);

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
      
      if (isExpanded && panel === 'satellites') {
        // Fetch satellites when expanding the satellites section
        fetchSatellites();
      } else if (!isExpanded && panel === 'satellites') {
        // Reset state when closing satellites section
        setShowAddForm((prev) => ({ ...prev, satellites: false }));
        setEditingSatelliteId(null);
        setEditingSatelliteData(null);
      }
    },
    [fetchSatellites],
  );

  const handleToggleAddForm = useCallback((sectionId: string) => {
    setShowAddForm((prev) => {
      const isCurrentlyShowing = prev[sectionId];
      
      // If form is already showing and we're in edit mode, switch to create mode
      if (isCurrentlyShowing && editingSatelliteId && sectionId === 'satellites') {
        setEditingSatelliteId(null);
        setEditingSatelliteData(null);
        return prev; // Keep form open
      }
      
      // Reset to create mode when opening form
      if (!isCurrentlyShowing) {
        setEditingSatelliteId(null);
        setEditingSatelliteData(null);
      }
      
      return {
        ...prev,
        [sectionId]: !isCurrentlyShowing,
      };
    });
  }, [editingSatelliteId]);

  const handleSatelliteCardClick = useCallback(async (satelliteId: number) => {
    try {
      const satellite = await satellitesApi.getOne(satelliteId);
      setEditingSatelliteId(satelliteId);
      setEditingSatelliteData({
        name: satellite.name,
        affiliation: satellite.affiliation,
        hasFrequencyConverter: satellite.hasFrequencyConverter,
        readinessStatus: satellite.readinessStatus,
        notes: satellite.notes || '',
      });
      setShowAddForm((prev) => ({ ...prev, satellites: true }));
    } catch (error) {
      console.error('Failed to fetch satellite:', error);
    }
  }, []);

  const handleSaveSatellite = useCallback(
    async (data: SatelliteFormData) => {
      try {
        const payload = {
          name: data.name,
          affiliation: data.affiliation as 'israeli' | 'international',
          hasFrequencyConverter: data.hasFrequencyConverter!,
          readinessStatus: data.readinessStatus as 'ready' | 'partly_ready' | 'damaged',
          notes: data.notes,
        };

        if (editingSatelliteId) {
          // Update existing satellite
          await satellitesApi.update(editingSatelliteId, payload);
        } else {
          // Create new satellite
          await satellitesApi.create(payload);
        }
        
        // Call parent callback if provided
        if (onSaveSatellite) {
          await onSaveSatellite(data);
        }
        
        // Refresh satellites list
        await fetchSatellites();
        
        // Reset edit mode
        setEditingSatelliteId(null);
        setEditingSatelliteData(null);
        
        // Close the form
        setShowAddForm((prev) => ({ ...prev, satellites: false }));
      } catch (error) {
        console.error('Failed to save satellite:', error);
        throw error;
      }
    },
    [onSaveSatellite, fetchSatellites, editingSatelliteId],
  );

  return (
    <Container>
      <Header>
        <Title>הגדרת אמצעים</Title>
      </Header>

      <SearchContainer>
        <TextField
          fullWidth
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
              borderRadius: '6px',
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
            },
            '& input::placeholder': {
              color: 'rgba(225, 234, 255, 0.4)',
              opacity: 1,
            },
          }}
        />
      </SearchContainer>

      <AccordionsContainer>
        {RESOURCE_SECTIONS.map((section) => (
          <StyledAccordion
            key={section.id}
            expanded={expandedSections.has(section.id)}
            onChange={handleAccordionChange(section.id)}
          >
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
              {expandedSections.has(section.id) && (
                <SummaryActions onClick={(e) => e.stopPropagation()}>
                  <AddHeaderButton
                    startIcon={<AddIcon />}
                    onClick={() => handleToggleAddForm(section.id)}
                  >
                    הוסף {section.title}
                  </AddHeaderButton>
                </SummaryActions>
              )}
              <SummaryContent>
                <SectionIcon>{section.icon}</SectionIcon>
                <SectionTitle>{section.title}</SectionTitle>
              </SummaryContent>
            </StyledAccordionSummary>

            {expandedSections.has(section.id) && (
              <StyledAccordionDetails>
              {section.id === 'satellites' ? (
                <>
                  {loadingSatellites ? (
                    <Box sx={{ padding: '20px', textAlign: 'center', color: '#aec7ff' }}>
                      טוען לווינים...
                    </Box>
                  ) : satellites.length === 0 && !showAddForm[section.id] ? (
                    <EmptyState>
                      <EmptyStateTitle>{section.emptyMessage}</EmptyStateTitle>
                      <EmptyStateSubtitle>{section.emptySubMessage}</EmptyStateSubtitle>
                    </EmptyState>
                  ) : showAddForm[section.id] ? (
                    <FormWithCardsContainer>
                      <FormContainer>
                        <SatelliteForm 
                          onSave={handleSaveSatellite}
                          editingSatelliteId={editingSatelliteId}
                          initialData={editingSatelliteData}
                        />
                      </FormContainer>
                      
                      <CardsColumn>
                        <CardsScrollContainer>
                          <SatellitesGrid hasForm={true}>
                            {satellites.map((satellite) => (
                              <SatelliteCard 
                                key={satellite.id} 
                                satellite={satellite}
                                onClick={handleSatelliteCardClick}
                              />
                            ))}
                          </SatellitesGrid>
                        </CardsScrollContainer>
                      </CardsColumn>
                    </FormWithCardsContainer>
                  ) : (
                    satellites.length > 0 && (
                      <SatellitesGrid hasForm={false}>
                        {satellites.map((satellite) => (
                          <SatelliteCard 
                            key={satellite.id} 
                            satellite={satellite}
                            onClick={handleSatelliteCardClick}
                          />
                        ))}
                      </SatellitesGrid>
                    )
                  )}
                </>
              ) : (
                <>
                  {!showAddForm[section.id] && (
                    <EmptyState>
                      <EmptyStateTitle>{section.emptyMessage}</EmptyStateTitle>
                      <EmptyStateSubtitle>{section.emptySubMessage}</EmptyStateSubtitle>
                    </EmptyState>
                  )}

                  {showAddForm[section.id] && (
                    <Box sx={{ padding: '20px', textAlign: 'center', color: '#aec7ff' }}>
                      טופס {section.title} בפיתוח
                    </Box>
                  )}
                </>
              )}
              </StyledAccordionDetails>
            )}
          </StyledAccordion>
        ))}
      </AccordionsContainer>
    </Container>
  );
};
