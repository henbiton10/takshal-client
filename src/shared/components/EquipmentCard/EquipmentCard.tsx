import styled from 'styled-components';
import { theme } from '../../../theme';
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

const statusColors = {
  ready: '#05df72',
  partial: '#ffb300',
  faulty: '#ff9292',
};

const CardContainer = styled.div<{ $status: ReadinessStatus; $selected?: boolean }>`
  background: linear-gradient(180deg, rgba(151, 187, 255, 0.15) 0%, rgba(105, 158, 255, 0.1) 100%);
  border-right: 4px solid ${props => statusColors[props.$status]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-height: 134px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: ${props => props.$selected ? `0 0 0 2px ${theme.colors.border.accent}` : 'none'};

  &:hover {
    background: linear-gradient(180deg, rgba(151, 187, 255, 0.2) 0%, rgba(105, 158, 255, 0.15) 100%);
    transform: translateY(-2px);
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
    if (props.$type === 'ka') return `background: rgba(255, 179, 0, 0.2); color: #ffb300; border: 1px solid rgba(255, 179, 0, 0.2);`;
    if (props.$type === 'ku') return `background: rgba(255, 255, 255, 0.6); color: #2c2c2c; border: 1px solid rgba(255, 255, 255, 0.4);`;
    return `background: rgba(225, 234, 255, 0.1); color: #e1eaff;`;
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
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
`;

const SubnameText = styled.div`
  color: #e1eaff;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(225, 234, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const ConnectivityTag = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
`;

const ConnectivityText = styled.span`
  color: #e1eaff;
  font-size: 12px;
  font-weight: 600;
`;

const StatusRow = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const StatusText = styled.div<{ $status: ReadinessStatus }>`
  color: ${props => statusColors[props.$status]};
  font-size: 14px;
  font-weight: 600;
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
            <LinkIcon sx={{ fontSize: 16, color: '#e1eaff' }} />
          ) : (
            <LinkOffIcon sx={{ fontSize: 16, color: '#e1eaff' }} />
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
