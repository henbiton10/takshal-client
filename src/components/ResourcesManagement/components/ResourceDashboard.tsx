import styled from 'styled-components';
import { Button, Box } from '@mui/material';
import { EntityConfig } from '../entityConfig';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  direction: rtl;
  padding: 0 8px;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 12px;
  margin-bottom: 4px;
`;

const CategoryTitle = styled.h2`
  color: #fafafa;
  font-family: 'Assistant', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
`;

const ShowAllButton = styled(Button)`
  && {
    color: #e1eaff;
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.16px;
    padding: 0;
    min-width: auto;
    opacity: 0.8;
    &:hover {
      opacity: 1;
      background: transparent;
    }
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  gap: 16px;
  width: 100%;
`;

interface ResourceDashboardProps {
  configs: EntityConfig[];
  filteredItems: Record<string, any[]>;
  onCardClick: (entityId: string, itemId: number) => void;
  onShowAll: (entityId: string) => void;
}

export const ResourceDashboard = ({
  configs,
  filteredItems,
  onCardClick,
  onShowAll,
}: ResourceDashboardProps) => {
  return (
    <DashboardContainer>
      {configs.map((config) => {
        const items = filteredItems[config.id] || [];

        return (
          <CategorySection key={config.id}>
            <CategoryHeader>
              <CategoryTitle>{config.title}</CategoryTitle>
              <ShowAllButton onClick={() => onShowAll(config.id)} variant="text">
                הצג הכל
              </ShowAllButton>
            </CategoryHeader>
            {items.length > 0 ? (
              <ItemsGrid>
                {items.slice(0, 4).map((item) => {
                  const CardComponent = config.CardComponent;
                  const getCardProps = (item: any) => {
                    if (config.id === 'satellites') return { satellite: item };
                    if (config.id === 'terminals') return { terminal: item };
                    if (config.id === 'networks') return { network: item };
                    if (config.id === 'stations') return { station: item };
                    return { item };
                  };

                  return (
                    <CardComponent
                      key={item.id}
                      {...getCardProps(item)}
                      onClick={(id: number) => onCardClick(config.id, id)}
                    />
                  );
                })}
              </ItemsGrid>
            ) : (
              <Box sx={{ padding: '24px 0', color: 'rgba(225, 234, 255, 0.4)', textAlign: 'right', fontSize: '14px' }}>
                {config.emptyMessage || 'לא נמצאו פריטים'}
              </Box>
            )}
          </CategorySection>
        );
      })}
    </DashboardContainer>
  );
};
