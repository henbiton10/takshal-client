import styled from 'styled-components';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

export type ReadinessStatus = 'ready' | 'partial' | 'faulty';

interface EquipmentCardProps {
  id: number;
  name: string;
  subname?: string;
  icon: React.ReactNode;
  status: ReadinessStatus;
  statusText: string;
  tags?: string[];
  connectivity?: string;
  connectivityIcon?: 'link' | 'link_off';
  onClick?: (id: number) => void;
  selected?: boolean;
}

const getStatusColor = (theme: any, status: ReadinessStatus) => {
  switch (status) {
    case 'ready': return theme.customColors.status.ready; 
    case 'partial': return theme.customColors.status.partlyReady;
    case 'faulty': return theme.customColors.status.damaged;
    default: return theme.customColors.status.ready;
  }
};

const CardContainer = styled.div<{ $status: ReadinessStatus; $selected?: boolean }>`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : theme.customColors.background.glass};
  backdrop-filter: blur(20px);
  border-right: 4px solid ${props => getStatusColor(props.theme, props.$status)};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-height: 134px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-top: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-left: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider};
  box-shadow: ${props => props.$selected ? `0 0 0 2px ${props.theme.customColors.border.accent}` : '0 4px 20px rgba(0, 0, 0, 0.1)'};

  &:hover {
    background: ${({ theme }) => theme.customColors.action.hover};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.div<{ $type?: 'ka' | 'ku' | 'white' }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  
  ${props => {
    const { status: statusColors, background, text, border } = props.theme.customColors;
    if (props.$type === 'ka') return `background: ${statusColors.ka}33; color: ${statusColors.ka}; border: 1px solid ${statusColors.ka}33;`;
    if (props.$type === 'ku') return `
      background: ${props.theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}; 
      color: ${text.primary}; 
      border: 1px solid ${border.divider};
    `;
    return `background: ${background.subtle}; color: ${text.secondary}; border: 1px solid ${border.divider};`;
  }}
`;

const InfoGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  text-align: right;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameText = styled.div`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
`;

const SubnameText = styled.div`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : theme.customColors.background.subtle};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.customColors.primary.main};
`;

const ConnectivityTag = styled.div`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? theme.customColors.background.paper 
    : theme.customColors.background.light};
  border-radius: 20px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  box-shadow: ${({ theme }) => theme.palette.mode === 'light' 
    ? '0 1px 2px rgba(0,0,0,0.02)' 
    : 'none'};
`;

const ConnectivityText = styled.span`
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-size: 13px;
  font-weight: 600;
`;

const StatusRow = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const StatusText = styled.div<{ $status: ReadinessStatus }>`
  color: ${props => getStatusColor(props.theme, props.$status)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
  text-align: right;
`;

export const EquipmentCard = ({
  id,
  name,
  subname,
  icon,
  status,
  statusText,
  tags = [],
  connectivity,
  connectivityIcon,
  onClick,
  selected
}: EquipmentCardProps) => {
  return (
    <CardContainer $status={status} $selected={selected} onClick={() => onClick?.(id)}>
      <TopRow>
        <InfoGroup>
          <IconContainer>{icon}</IconContainer>
          <TextContent>
            <NameText>{name}</NameText>
            {subname && <SubnameText>{subname}</SubnameText>}
          </TextContent>
        </InfoGroup>
        <TagGroup>
          {tags.map((tag, i) => (
            <Tag key={i} $type={tag.toLowerCase() === 'ka' ? 'ka' : tag.toLowerCase() === 'ku' ? 'ku' : 'white'}>
              {tag}
            </Tag>
          ))}
        </TagGroup>
      </TopRow>

      {connectivity && (
        <ConnectivityTag>
          {connectivityIcon === 'link' ? (
            <LinkIcon sx={{ fontSize: 16 }} />
          ) : (
            <LinkOffIcon sx={{ fontSize: 16 }} />
          )}
          <ConnectivityText>{connectivity}</ConnectivityText>
        </ConnectivityTag>
      )}

      <StatusRow>
        <StatusText $status={status}>{statusText}</StatusText>
      </StatusRow>
    </CardContainer>
  );
};
