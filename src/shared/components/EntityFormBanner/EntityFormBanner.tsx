import styled from 'styled-components';
import { Box, SvgIconProps } from '@mui/material';
import { theme } from '../../../theme';

interface EntityFormBannerProps {
  title: string;
  icon: React.ComponentType<SvgIconProps>;
}

const BannerContainer = styled(Box)`
  width: 30%;
  background: ${theme.colors.background.medium};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxxl} ${theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxl};
  direction: rtl;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.bannerInner};
  width: 100%;
  border-radius: ${theme.borderRadius.xl};
  gap: 14px;
`;

const BannerIcon = styled.div`
  color: ${theme.colors.text.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerTitle = styled.h2`
  color: ${theme.colors.text.white};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semiBold};
  margin: 0;
  text-align: center;
`;

export const EntityFormBanner = ({ title, icon: Icon }: EntityFormBannerProps) => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerIcon>
          <Icon sx={{ fontSize: parseInt(theme.typography.iconSize.lg) }} />
        </BannerIcon>
        <BannerTitle>{title}</BannerTitle>
      </BannerContent>
    </BannerContainer>
  );
};
