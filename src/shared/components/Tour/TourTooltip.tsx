import styled from 'styled-components';
import { TooltipRenderProps } from 'react-joyride';

const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.customColors.background.glass};
  backdrop-filter: blur(40px);
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 16px;
  color: ${({ theme }) => theme.customColors.text.primary};
  padding: 24px;
  max-width: 400px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.4);
  direction: rtl;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const TooltipTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.customColors.text.primary};
`;

const TooltipContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.customColors.text.secondary};
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.customColors.primary.main};
  color: ${({ theme }) => theme.customColors.text.white};
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${({ theme }) => theme.customColors.primary.hover};
    transform: translateY(-1px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.customColors.text.secondary};
  border: 1px solid ${({ theme }) => theme.customColors.border.divider};
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.customColors.action.hover};
    color: ${({ theme }) => theme.customColors.text.primary};
    border-color: ${({ theme }) => theme.customColors.border.accent};
  }
`;

const SkipButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.customColors.text.disabled};
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-right: auto;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.customColors.text.primary};
    text-decoration: underline;
  }
`;

export const TourTooltip = ({
  index,
  step,
  backProps,
  primaryProps,
  skipProps,
  isLastStep,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <TooltipContainer {...tooltipProps}>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      
      <ButtonContainer>
        {!isLastStep && (
          <SkipButton 
            {...skipProps}
            onClick={(e) => {
              localStorage.setItem('takshal_tour_completed', 'true');
              if (skipProps.onClick) skipProps.onClick(e);
            }}
          >
            דלג על הסיור
          </SkipButton>
        )}
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {index > 0 && (
            <SecondaryButton {...backProps}>
              הקודם
            </SecondaryButton>
          )}
          <PrimaryButton 
            {...primaryProps}
            onClick={(e) => {
              if (isLastStep) {
                localStorage.setItem('takshal_tour_completed', 'true');
              }
              if (primaryProps.onClick) primaryProps.onClick(e);
            }}
          >
            {isLastStep ? 'סיום' : 'הבא'}
          </PrimaryButton>
        </div>
      </ButtonContainer>
    </TooltipContainer>
  );
};
