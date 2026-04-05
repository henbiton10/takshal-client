import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@mui/material';
import { theme } from '../../../theme';

export interface ViewField {
  label: string;
  value: string | React.ReactNode;
  fullWidth?: boolean;
}

export interface ViewSection {
  title?: string;
  fields: ViewField[];
}

export interface TagItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
}

export interface ViewTagSection {
  title: string;
  tags: TagItem[];
}

interface EntityViewProps {
  name: string;
  icon: React.ReactNode;
  badge?: string;
  sections: ViewSection[];
  tagSections?: ViewTagSection[];
  editLabel: string;
  onEdit: () => void;
  onDelete?: () => void;
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

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
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

const Badge = styled.span`
  background: #1976D2;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: ${theme.typography.fontWeight.medium};
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

const FieldsGrid = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const FieldCard = styled.div<{ $fullWidth?: boolean }>`
  background: ${theme.colors.background.dark};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  flex: ${props => props.$fullWidth ? '1 1 100%' : '1 1 auto'};
  min-width: ${props => props.$fullWidth ? '100%' : '120px'};
`;

const FieldLabel = styled.div<{ $fullWidth?: boolean }>`
  color: rgba(225, 234, 255, 0.5);
  font-size: 11px;
  margin-bottom: 4px;
  text-align: ${props => props.$fullWidth ? 'right' : 'center'};
`;

const FieldValue = styled.div<{ $fullWidth?: boolean }>`
  color: ${theme.colors.text.white};
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: ${props => props.$fullWidth ? 'right' : 'center'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$fullWidth ? 'flex-start' : 'center'};
  gap: 6px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const Tag = styled.div`
  background: ${theme.colors.background.dark};
  border-radius: 20px;
  padding: 8px 16px;
  color: ${theme.colors.text.white};
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.white};
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

export const formatReadinessStatus = (status: string): React.ReactNode => {
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

export const EntityView = ({
  name,
  icon,
  badge,
  sections,
  tagSections,
  editLabel,
  onEdit,
  onDelete,
  onClose,
}: EntityViewProps) => {
  return (
    <ViewContainer>
      <ViewHeader>
        <HeaderLeft>
          <EditButton onClick={onEdit} startIcon={<EditIcon sx={{ fontSize: 18 }} />}>
            {editLabel}
          </EditButton>
          {onDelete && (
            <DeleteButton onClick={onDelete}>
              <DeleteOutlineIcon sx={{ fontSize: 20 }} />
            </DeleteButton>
          )}
          {onClose && (
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </CloseButton>
          )}
        </HeaderLeft>
        <HeaderRight>
          <EntityName>
            {name}
            <EntityIcon>{icon}</EntityIcon>
          {badge && <Badge>{badge}</Badge>}
          </EntityName>
        </HeaderRight>
      </ViewHeader>

      {sections.map((section, sectionIndex) => (
        <SectionContainer key={sectionIndex}>
          {section.title && <SectionTitle>{section.title}</SectionTitle>}
          <FieldsGrid>
            {section.fields.map((field, fieldIndex) => (
              <FieldCard key={fieldIndex} $fullWidth={field.fullWidth}>
                <FieldLabel $fullWidth={field.fullWidth}>{field.label}</FieldLabel>
                <FieldValue $fullWidth={field.fullWidth}>{field.value}</FieldValue>
              </FieldCard>
            ))}
          </FieldsGrid>
        </SectionContainer>
      ))}

      {tagSections?.map((tagSection, index) => (
        <SectionContainer key={`tags-${index}`}>
          <SectionTitle>{tagSection.title}</SectionTitle>
          <TagsContainer>
            {tagSection.tags.map((tag) => (
              <Tag key={tag.id}>
                {tag.icon && <TagIcon>{tag.icon}</TagIcon>}
                {tag.label}
              </Tag>
            ))}
          </TagsContainer>
        </SectionContainer>
      ))}
    </ViewContainer>
  );
};
