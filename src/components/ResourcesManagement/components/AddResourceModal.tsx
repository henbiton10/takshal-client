import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { ENTITY_CONFIGS_ARRAY } from '../entityConfig';

interface AddResourceModalProps {
  onClose: () => void;
  onSelect: (entityId: string) => void;
}

const ENTITY_ICON_COLORS: Record<string, string> = {
  stations: 'rgba(21, 93, 252, 0.4)',
  satellites: 'rgba(152, 16, 250, 0.4)',
  terminals: 'rgba(0, 166, 62, 0.4)',
  networks: 'rgba(245, 73, 0, 0.4)',
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #1c2439;
  border: 2px solid #305088;
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 500px;
  max-width: 90vw;
  padding: 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  direction: rtl;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: right;
`;

const Title = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  color: #e1eaff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 28px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: none;
  border-radius: 100px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  flex-shrink: 0;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const OptionButton = styled.button`
  background: rgba(29, 41, 61, 0.3);
  border: 2px solid #305088;
  border-radius: 16px;
  height: 80px;
  padding: 2px 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;
  &:hover {
    background: rgba(29, 41, 61, 0.6);
  }
`;

const OptionName = styled.span`
  color: white;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
`;

const IconBox = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const AddResourceModal = ({ onClose, onSelect }: AddResourceModalProps) => (
  <Overlay onClick={onClose}>
    <Card onClick={(e) => e.stopPropagation()}>
      <Header>
        {/* Titles first → flex-start → RIGHT in RTL */}
        <Titles>
          <Title>הוספת אמצעי חדש</Title>
          <Subtitle>בחר את סוג האמצעי שברצונך להוסיף</Subtitle>
        </Titles>
        {/* Close last → flex-end → LEFT in RTL */}
        <CloseButton onClick={onClose}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </CloseButton>
      </Header>
      <OptionList>
        {ENTITY_CONFIGS_ARRAY.map((config) => (
          <OptionButton key={config.id} onClick={() => onSelect(config.id)}>
            {/* Name first → RIGHT in RTL */}
            <OptionName>{config.singularTitle}</OptionName>
            {/* Icon last → LEFT in RTL */}
            <IconBox $color={ENTITY_ICON_COLORS[config.id] ?? 'rgba(61, 98, 178, 0.4)'}>
              {config.icon}
            </IconBox>
          </OptionButton>
        ))}
      </OptionList>
    </Card>
  </Overlay>
);
