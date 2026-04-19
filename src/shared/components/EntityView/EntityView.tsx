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
  statusColor?: string;
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

export const formatReadinessStatus = (status: string): { text: string; color: string; icon?: React.ReactNode } => {
  if (status === 'ready') return {
    text: 'כשיר',
    color: '#63FF6A',
    icon: <StatusIconImg src={workingIcon} alt="כשיר" />
  };
  if (status === 'partly_ready') return {
    text: 'כשיר חלקית',
    color: '#FFB800',
    icon: <StatusIconImg src={halfWorkingIcon} alt="כשיר חלקית" />
  };
  if (status === 'damaged') return {
    text: 'תקול',
    color: '#FF4D4D',
    icon: <StatusIconImg src={notWorkingIcon} alt="תקול" />
  };
  return { text: status, color: '#FAFAFA' };
};

// UI Components
export const PageTitle = styled.h2`
  color: #FAFAFA;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: right;
`;

export const PageSubtitle = styled.p`
  color: #E1EAFF;
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
  background: rgba(45, 58, 89, 0.55);
  border-radius: 24px;
  padding: 20px 28px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 18px;
  direction: rtl;
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
  background: rgba(0, 166, 62, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const EntityNameText = styled.span`
  color: #FAFAFA;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
`;

export const EditButton = styled(Button)`
  && {
    background: #2e3c5a;
    color: #FAFAFA;
    border: 1px solid #305088;
    border-radius: 12px;
    padding: 10px 20px;
    text-transform: none;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    gap: 8px;
    
    &:hover {
      background: #3a4d72;
    }
  }
`;

export const SectionBox = styled.div`
  background: rgba(255, 255, 255, 0.04);
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
  color: #E1EAFF;
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
  color: #E1EAFF;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.16px;
  display: block;
  width: 100%;
  text-align: right;
  padding-right: 8px;
`;

export const FieldValuePill = styled.div<{ $statusColor?: string }>`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 8px 16px;
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  
  span {
    color: #FAFAFA;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.18px;
  }
  
  .MuiSvgIcon-root {
    color: ${props => props.$statusColor || '#FAFAFA'};
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
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  direction: rtl;
  
  .tag-label {
    color: #FAFAFA;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.18px;
  }
  
  .tag-icon {
    display: flex;
    color: rgba(225, 234, 255, 0.8);
  }
`;

export const InlineMetadataContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const InlinePill = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2px 12px;
  display: flex;
  align-items: center;
  height: 24px;
  
  span {
    color: #FAFAFA;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
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

        {sections.map((section, idx) => (
          <RenderSection key={idx} {...section} />
        ))}
      </Card>
    </div>
  );
};
