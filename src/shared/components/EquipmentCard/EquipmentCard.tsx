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

const getStatusColor = (status: ReadinessStatus) => {
  switch (status) {
    case 'ready': return '#05df72'; 
    case 'partial': return '#ffb300';
    case 'faulty': return '#ff4d4d';
    default: return '#05df72';
  }
};

const CardContainer = styled.div<{ $status: ReadinessStatus; $selected?: boolean }>`
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 245, 255, 0.9) 100%)' 
    : 'linear-gradient(180deg, rgba(151, 187, 255, 0.15) 0%, rgba(105, 158, 255, 0.15) 100%)'};
  backdrop-filter: blur(20px);
  border-right: 4px solid ${props => getStatusColor(props.$status)};
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-height: 140px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-top: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-left: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider};
  box-shadow: ${props => props.$selected ? `0 0 0 2px ${props.theme.customColors.border.accent}` : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  direction: rtl;

  &:hover {
    background: ${({ theme }) => theme.palette.mode === 'light' ? 'rgba(235, 240, 255, 0.95)' : 'rgba(151, 187, 255, 0.25)'};
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
  padding: 4px 8px;
  border-radius: 33554400px;
  font-family: 'Assistant', sans-serif;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.14px;
  
  ${props => {
    const isDark = props.theme.palette.mode === 'dark';
    if (props.$type === 'ka') return `
      background: rgba(255, 179, 0, 0.2); 
      color: ${isDark ? '#ff8800' : '#d97706'}; 
      border: 1px solid rgba(255, 179, 0, 0.2);
    `;
    if (props.$type === 'ku') return `
      background: ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)'}; 
      color: ${isDark ? '#ffffff' : props.theme.customColors.text.primary}; 
      border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    `;
    return `
      background: ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.05)'}; 
      color: ${isDark ? '#e1eaff' : props.theme.customColors.text.secondary}; 
      border: none;
    `;
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
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#ffffff' : theme.customColors.text.primary};
  font-family: 'Assistant', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const SubnameText = styled.div`
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#e1eaff' : theme.customColors.text.secondary};
  font-family: 'Assistant', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(225, 234, 255, 0.2)' : 'rgba(61, 98, 178, 0.1)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#ffffff' : theme.customColors.primary.main};
`;

const ConnectivityTag = styled.div`
  background: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 33554400px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  margin-left: auto;
`;

const ConnectivityText = styled.span`
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#e1eaff' : theme.customColors.text.secondary};
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
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#e1eaff' : theme.customColors.text.secondary};
  font-family: 'Assistant', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.14px;
  text-align: right;
  line-height: 16px;
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
