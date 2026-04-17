import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding-top: 40px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 64px 36px;
  background: rgba(174, 199, 255, 0.06);
  border-radius: 24px;
  width: 590px;
  max-width: 90%;
`;

const IconCircle = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(174, 199, 255, 0.12);
  border-radius: 50%;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const Title = styled.h2`
  color: #e1eaff;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.36px;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  color: #f2f2f2;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
`;

interface BigEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const BigEmptyState: React.FC<BigEmptyStateProps> = ({ icon, title, subtitle }) => {
  return (
    <Wrapper>
      <Card>
        <IconCircle>
          {icon}
        </IconCircle>
        <Texts>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Texts>
      </Card>
    </Wrapper>
  );
};
