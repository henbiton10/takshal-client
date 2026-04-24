import styled from 'styled-components';
import { TooltipRenderProps } from 'react-joyride';

const TooltipContainer = styled.div`
  background: rgba(28, 36, 57, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(48, 80, 136, 0.5);
  border-radius: 16px;
  color: #e1eaff;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  direction: rtl;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const TooltipTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const TooltipContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(225, 234, 255, 0.8);
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background: #3d62b2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4d72c2;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: rgba(225, 234, 255, 0.7);
  border: 1px solid rgba(225, 234, 255, 0.3);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

const SkipButton = styled.button`
  background: transparent;
  color: rgba(225, 234, 255, 0.5);
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-right: auto;

  &:hover {
    color: #fff;
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
