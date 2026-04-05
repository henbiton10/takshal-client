import styled from 'styled-components';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@mui/material';
import { StationIcon } from '../ResourcesManagement/icons/StationIcon';
import { theme } from '../../theme';

interface StationViewProps {
  station: any;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const ViewContainer = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  direction: rtl;
`;

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const EntityName = styled.h2`
  color: ${theme.colors.text.white};
  font-size: 20px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const EntityIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.white};
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const EditButton = styled(Button)`
  && {
    background: ${theme.colors.background.light};
    color: ${theme.colors.text.white};
    border-radius: 20px;
    padding: 6px 16px;
    text-transform: none;
    font-size: 13px;
    gap: 8px;
    
    .MuiButton-startIcon {
      margin-right: 0;
      margin-left: 0;
    }
    
    &:hover {
      background: rgba(70, 85, 110, 0.8);
    }
  }
`;

const DeleteButton = styled(Button)`
  && {
    color: #f44336;
    border-radius: 50%;
    min-width: 40px;
    width: 40px;
    height: 40px;
    padding: 0;
    
    &:hover {
      background: rgba(244, 67, 54, 0.1);
    }
  }
`;

const CloseButton = styled(IconButton)`
  && {
    color: rgba(225, 234, 255, 0.6);
    padding: 8px;
    
    &:hover {
      color: ${theme.colors.text.white};
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Row = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const FieldCard = styled.div<{ $flex?: string }>`
  background: ${theme.colors.background.dark};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  flex: ${props => props.$flex || '1'};
  min-width: 0;
`;

const FieldLabel = styled.div`
  color: rgba(225, 234, 255, 0.6);
  font-size: 12px;
  margin-bottom: ${theme.spacing.sm};
  text-align: right;
`;

const FieldValue = styled.div`
  color: ${theme.colors.text.white};
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

const Tag = styled.div`
  background: ${theme.colors.background.medium};
  border-radius: 20px;
  padding: 8px 14px;
  color: ${theme.colors.text.white};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  direction: rtl;
`;

const TagIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.white};
`;

const SectionContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  color: rgba(225, 234, 255, 0.7);
  font-size: 13px;
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: right;
`;

const SectionContent = styled.div`
  background: ${theme.colors.background.dark};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
`;

const StatusReady = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4caf50;
`;

const StatusPartial = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ff9800;
`;

const StatusDamaged = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #f44336;
`;

const AffiliationIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const formatAffiliation = (affiliation: string): string => {
  if (affiliation === 'airforce') return 'חיל האוויר';
  if (affiliation === 'tikshuv') return 'אגף התקשוב';
  return affiliation;
};

const formatCommunicationType = (type: string): string => {
  const types: Record<string, string> = {
    fiber_optic: 'אופטי',
    radio: 'רדיו',
    satellite: 'לוויני',
    microwave: 'גל מיקרו',
  };
  return types[type] || type;
};

const formatReadinessStatus = (status: string): React.ReactNode => {
  if (status === 'ready') {
    return (
      <StatusReady>
        <CheckCircleIcon sx={{ fontSize: 18 }} />
        כשיר
      </StatusReady>
    );
  }
  if (status === 'partly_ready') {
    return (
      <StatusPartial>
        <CheckCircleIcon sx={{ fontSize: 18 }} />
        כשיר חלקית
      </StatusPartial>
    );
  }
  if (status === 'damaged') {
    return (
      <StatusDamaged>
        <CancelIcon sx={{ fontSize: 18 }} />
        תקול
      </StatusDamaged>
    );
  }
  return status;
};

export const StationView = ({ station, onEdit, onDelete, onClose }: StationViewProps) => {
  const connectivities = station.connectivities || [];
  const antennas = station.antennas || [];

  return (
    <ViewContainer>
      <ViewHeader>
        <HeaderButtons>
          <EditButton onClick={onEdit} startIcon={<EditIcon sx={{ fontSize: 18 }} />}>
            ערוך תחנה
          </EditButton>
          <DeleteButton onClick={onDelete}>
            <DeleteOutlineIcon sx={{ fontSize: 20 }} />
          </DeleteButton>
          {onClose && (
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </CloseButton>
          )}
        </HeaderButtons>
        <HeaderRight>
          <EntityName>
            {station.name}
            <EntityIcon>
              <StationIcon sx={{ fontSize: 24 }} />
            </EntityIcon>
          </EntityName>
        </HeaderRight>
      </ViewHeader>

      {/* Row 1: שייכות ארגונית + קישוריות */}
      <Row>
        <FieldCard $flex="1">
          <FieldLabel>שייכות ארגונית</FieldLabel>
          <FieldValue>
            <AffiliationIcon>
              {station.organizationalAffiliation === 'airforce' && '🦅'}
            </AffiliationIcon>
            {formatAffiliation(station.organizationalAffiliation)}
          </FieldValue>
        </FieldCard>
        <FieldCard $flex="2">
          <FieldLabel>קישוריות</FieldLabel>
          {connectivities.length > 0 ? (
            <TagsContainer>
              {connectivities.map((c: any, index: number) => (
                <Tag key={c.id || index}>
                  <TagIcon>
                    <LinkIcon sx={{ fontSize: 14 }} />
                  </TagIcon>
                  {c.connectedStation?.name || 'תחנה'}
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>|</span>
                  {formatCommunicationType(c.communicationType)}
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>|</span>
                  {c.channelCount} ערוצים
                </Tag>
              ))}
            </TagsContainer>
          ) : (
            <FieldValue style={{ color: 'rgba(225, 234, 255, 0.4)' }}>אין קישוריות</FieldValue>
          )}
        </FieldCard>
      </Row>

      {/* Row 2: סטטוס כשירות + הערות */}
      <Row>
        <FieldCard $flex="1">
          <FieldLabel>סטטוס כשירות</FieldLabel>
          <FieldValue>
            {formatReadinessStatus(station.readinessStatus)}
          </FieldValue>
        </FieldCard>
        <FieldCard $flex="2">
          <FieldLabel>הערות</FieldLabel>
          <FieldValue style={{ fontSize: '13px', lineHeight: '1.5' }}>
            {station.notes || 'אין הערות'}
          </FieldValue>
        </FieldCard>
      </Row>

      {/* Row 3: תחנות מקושרות */}
      <SectionContainer>
        <SectionTitle>תחנות מקושרות</SectionTitle>
        <SectionContent>
          {connectivities.length > 0 ? (
            <TagsContainer>
              {connectivities.map((c: any, index: number) => (
                <Tag key={c.id || index}>
                  <TagIcon>
                    <StationIcon sx={{ fontSize: 14 }} />
                  </TagIcon>
                  {c.connectedStation?.name || `תחנה ${c.connectedStationId}`}
                </Tag>
              ))}
            </TagsContainer>
          ) : (
            <FieldValue style={{ color: 'rgba(225, 234, 255, 0.4)' }}>אין תחנות מקושרות</FieldValue>
          )}
        </SectionContent>
      </SectionContainer>

      {/* Row 4: אנטנות */}
      <SectionContainer>
        <SectionTitle>אנטנות</SectionTitle>
        <SectionContent>
          {antennas.length > 0 ? (
            <TagsContainer>
              {antennas.map((a: any) => (
                <Tag key={a.id}>
                  <TagIcon>
                    <SettingsInputAntennaIcon sx={{ fontSize: 14 }} />
                  </TagIcon>
                  אנטנה {a.size} {a.frequencyBand?.toUpperCase()}
                </Tag>
              ))}
            </TagsContainer>
          ) : (
            <FieldValue style={{ color: 'rgba(225, 234, 255, 0.4)' }}>אין אנטנות</FieldValue>
          )}
        </SectionContent>
      </SectionContainer>
    </ViewContainer>
  );
};
