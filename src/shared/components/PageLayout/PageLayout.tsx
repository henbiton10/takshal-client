import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface BreadcrumbsConfig {
  parent: string;
  onParentClick?: () => void;
  middle?: string;
  onMiddleClick?: () => void;
  current: string;
  onBack: () => void;
}

export interface PageLayoutProps {
  title?: string;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbsConfig;
  actions?: React.ReactNode;
  children: React.ReactNode;
  contentPadding?: string;
  fullHeight?: boolean;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  direction: rtl;
  overflow: hidden;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 28px;
  border-bottom: 1px solid ${({ theme }) => theme.customColors.border.divider};
  flex-shrink: 0;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const SubtitleWrapper = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.customColors.text.secondary};
  margin-top: 4px;
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackIconButton = styled.button`
  background: ${({ theme }) => theme.customColors.primary.main};
  color: ${({ theme }) => theme.customColors.text.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.customColors.primary.hover};
  }
`;

const BreadcrumbButton = styled.button<{ $clickable?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.customColors.text.secondary};
  font-size: 24px;
  font-weight: 500;
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
  outline: none;

  &:hover {
    color: ${props => {
      if (!props.$clickable) return props.theme.customColors.text.secondary;
      return props.theme.palette.mode === 'light' 
        ? props.theme.customColors.primary.main 
        : props.theme.customColors.text.white;
    }};
    transform: ${props => props.$clickable ? 'translateY(-1px)' : 'none'};
  }

  &:active {
    transform: ${props => props.$clickable ? 'translateY(0)' : 'none'};
  }
`;

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.customColors.text.primary};
  font-size: 24px;
  font-weight: 700;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContentSection = styled.div<{ $contentPadding?: string; $fullHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding: ${(props) => props.$contentPadding || '24px'};
  overflow-y: ${(props) => props.$fullHeight ? 'hidden' : 'auto'};
  
  /* Force scrollbar to the right */
  direction: ltr;
  
  & > * {
    /* Set content back to RTL */
    direction: rtl;
    width: 100%;
  }
`;

export const PageLayout = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
  contentPadding,
  fullHeight = false,
}: PageLayoutProps) => {
  return (
    <PageContainer>
      {(breadcrumbs || title || subtitle || actions) && (
        <PageHeader>
          {breadcrumbs ? (
            <BreadcrumbsContainer>
              <BackIconButton onClick={breadcrumbs.onBack}>
                <ArrowForwardIcon sx={{ fontSize: 24 }} />
              </BackIconButton>
              <BreadcrumbButton 
                $clickable={!!breadcrumbs.onParentClick} 
                onClick={breadcrumbs.onParentClick}
                type="button"
              >
                {breadcrumbs.parent}
              </BreadcrumbButton>
              <ChevronLeftIcon sx={{ color: (theme) => theme.customColors.text.muted, fontSize: 24 }} />
              {breadcrumbs.middle && (
                <>
                  <BreadcrumbButton 
                    $clickable={!!breadcrumbs.onMiddleClick} 
                    onClick={breadcrumbs.onMiddleClick}
                    type="button"
                  >
                    {breadcrumbs.middle}
                  </BreadcrumbButton>
                  <ChevronLeftIcon sx={{ color: (theme) => theme.customColors.text.muted, fontSize: 24 }} />
                </>
              )}
              <BreadcrumbCurrent>{breadcrumbs.current}</BreadcrumbCurrent>
            </BreadcrumbsContainer>
          ) : (
            <TitleContainer>
              {title && <Title>{title}</Title>}
              {subtitle && <SubtitleWrapper>{subtitle}</SubtitleWrapper>}
            </TitleContainer>
          )}
          
          {actions && <HeaderActions>{actions}</HeaderActions>}
        </PageHeader>
      )}
      
      <ContentSection $contentPadding={contentPadding} $fullHeight={fullHeight}>
        {children}
      </ContentSection>
    </PageContainer>
  );
};
