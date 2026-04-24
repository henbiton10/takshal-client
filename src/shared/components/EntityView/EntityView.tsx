import styled from 'styled-components';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import halfWorkingIcon from '../../../assets/halfWorking.svg';
import workingIcon from '../../../assets/working.svg';
import notWorkingIcon from '../../../assets/notWorking.svg';

export interface ViewField {
  label: string;
  value: string | React.ReactNode;
  fullWidth?: boolean;
  flex?: number | string;
  statusColor?: string | ((theme: any) => string);
  statusIcon?: React.ReactNode;
}

export interface TagMetadata {
  label: string;
}

export interface TagItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
  metadata?: TagMetadata[];
}

export interface ViewSection {
  title: string;
  icon?: React.ReactNode;
  fields?: ViewField[];
  tags?: TagItem[];
}

interface EntityViewProps {
  name: string;
  icon?: React.ReactNode;
  badge?: string;
  mainTitle: string;
  subtitle?: string;
  editLabel: string;
  sections: ViewSection[];
  onEdit: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

const StatusIconImg = styled.img`
  width: 24px;
  height: 24px;
`;

export const formatReadinessStatus = (status: string): { text: string; color: any; icon?: React.ReactNode } => {
  if (status === 'ready') return {
    text: 'כשיר',
    color: (theme: any) => theme.customColors.status.ready,
    icon: <StatusIconImg src={workingIcon} alt="כשיר" />
  };
  if (status === 'partly_ready') return {
    text: 'כשיר חלקית',
    color: (theme: any) => theme.customColors.status.partlyReady,
    icon: <StatusIconImg src={halfWorkingIcon} alt="כשיר חלקית" />
  };
  if (status === 'damaged') return {
    text: 'תקול',
    color: (theme: any) => theme.customColors.error.main,
    icon: <StatusIconImg src={notWorkingIcon} alt="תקול" />
  };
  return { text: status, color: (theme: any) => theme.customColors.text.primary };
};

// UI Components
export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: right;
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: right;
  letter-spacing: 0.18px;
`;

export const PageHeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 18px auto;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.customColors.background.glass};
  backdrop-filter: blur(40px);
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 24px;
  padding: 20px 28px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  direction: rtl;
  max-height: calc(100vh - 250px);
  min-height: 0;
  overflow: hidden;
`;

export const ViewScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;
  
  /* Keep scrollbar on the right side */
  direction: ltr;
  
  & > * {
    direction: rtl;
  }

  /* Custom Scrollbar for Premium Feel */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.customColors.border.divider};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.customColors.border.accent};
  }
`;


export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const EntityNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10.5px;
  background: ${({ theme }) => theme.customColors.primary.main}33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.customColors.primary.main};
`;

export const EntityNameText = styled.span`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
`;

export const EditButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.customColors.background.subtle};
    color: ${({ theme }) => theme.customColors.text.primary};
    border: 1px solid ${({ theme }) => theme.customColors.border.divider};
    border-radius: 12px;
    padding: 10px 20px;
    text-transform: none;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    gap: 8px;
    
    &:hover {
      background: ${({ theme }) => theme.customColors.action.hover};
      border-color: ${({ theme }) => theme.customColors.border.accent};
    }
  }
`;

export const SectionBox = styled.div`
  background: ${({ theme }) => theme.customColors.background.subtle};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

export const SectionLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

export const SectionLabelText = styled.span`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
`;

export const FieldsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 18px;
  flex-wrap: wrap;
`;

export const FieldColumn = styled.div<{ $flex?: number | string }>`
  flex: ${props => props.$flex || '0 0 auto'};
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  min-width: 140px;
`;

export const FieldLabelText = styled.span`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.16px;
  display: block;
  width: 100%;
  text-align: right;
  padding-right: 8px;
`;

export const FieldValuePill = styled.div<{ $statusColor?: any }>`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 12px;
  padding: 8px 16px;
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.palette.mode === 'light' 
    ? 'inset 0 1px 2px rgba(0,0,0,0.02)' 
    : 'none'};
  
  span {
    color: ${({ theme }) => theme.customColors.text.primary};
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.18px;
  }
  
  .MuiSvgIcon-root {
    font-size: 20px;
    color: ${props => typeof props.$statusColor === 'function' ? props.$statusColor(props.theme) : (props.$statusColor || props.theme.customColors.text.primary)};
  }
`;

// New Tag-based components
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  justify-content: flex-start;
`;

export const DataTag = styled.div`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 12px;
  height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  direction: rtl;
  box-shadow: ${({ theme }) => theme.palette.mode === 'light' 
    ? '0 2px 4px rgba(0,0,0,0.02)' 
    : 'none'};
  
  .tag-label {
    color: ${({ theme }) => theme.customColors.text.primary};
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.18px;
  }
  
  .tag-icon {
    display: flex;
    color: ${({ theme }) => theme.customColors.primary.main};
    opacity: 0.9;
    font-size: 20px;
  }
`;

export const InlineMetadataContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const InlinePill = styled.div`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 12px;
  padding: 2px 12px;
  display: flex;
  align-items: center;
  height: 24px;
  
  span {
    color: ${({ theme }) => theme.customColors.text.secondary};
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.16px;
    white-space: nowrap;
  }
`;

const RenderSection = ({ title, icon, fields, tags }: ViewSection) => {
  return (
    <SectionBox>
      <SectionLabelRow>
        {icon}
        <SectionLabelText>{title}</SectionLabelText>
      </SectionLabelRow>

      {fields && fields.length > 0 && (
        <FieldsRow>
          {fields
            .filter((field) => {
              if (field.value === null || field.value === undefined) return false;
              if (typeof field.value === 'string' && field.value.trim() === '') return false;
              return true;
            })
            .map((field, i) => (
              <FieldColumn
                key={i}
                $flex={field.fullWidth ? '1 1 100%' : (field.flex || '1')}
              >
                <FieldLabelText>{field.label}</FieldLabelText>
                <FieldValuePill $statusColor={field.statusColor}>
                  {field.statusIcon && field.statusIcon}
                  <span>{field.value}</span>
                </FieldValuePill>
              </FieldColumn>
            ))}
        </FieldsRow>
      )}

      {tags && tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag) => (
            <DataTag key={tag.id}>
              {tag.icon && <div className="tag-icon">{tag.icon}</div>}
              <span className="tag-label">{tag.label}</span>
              {tag.metadata && tag.metadata.length > 0 && (
                <InlineMetadataContainer>
                  {tag.metadata.map((meta, idx) => (
                    <InlinePill key={idx}>
                      <span>{meta.label}</span>
                    </InlinePill>
                  ))}
                </InlineMetadataContainer>
              )}
            </DataTag>
          ))}
        </TagsContainer>
      )}
    </SectionBox>
  );
};

export const EntityView = ({
  name,
  icon,
  mainTitle,
  subtitle,
  editLabel,
  sections,
  onEdit,
}: EntityViewProps) => {
  return (
    <div style={{ direction: 'rtl' }}>
      <PageHeaderArea>
        <PageTitle>{mainTitle}</PageTitle>
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </PageHeaderArea>

      <Card>
        <CardHeader>
          <EntityNameRow>
            {icon && <IconCircle>{icon}</IconCircle>}
            <EntityNameText>{name}</EntityNameText>
          </EntityNameRow>
          <EditButton
            onClick={onEdit}
            startIcon={<EditIcon sx={{ fontSize: 24 }} />}
          >
            {editLabel}
          </EditButton>
        </CardHeader>

        <ViewScrollContainer>
          {sections.map((section, idx) => (
            <RenderSection key={idx} {...section} />
          ))}
        </ViewScrollContainer>
      </Card>

    </div>
  );
};
