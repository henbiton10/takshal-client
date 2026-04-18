import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const slideIn = keyframes`
  from {
    transform: translateY(100%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(100%) scale(0.95);
    opacity: 0;
  }
`;

const ToastWrapper = styled.div<{ $isExiting: boolean; $type: 'success' | 'error' }>`
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 10000;
  background: #283045;
  border: 1px solid ${props => props.$type === 'success' ? '#63ff6a' : '#ff4d4d'};
  border-radius: 12px;
  padding: 24px;
  min-width: 420px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 24px;
  animation: ${props => props.$isExiting ? slideOut : slideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  direction: rtl;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  flex: 1;
`;

const Title = styled.p`
  color: #e1eaff;
  font-family: 'Assistant', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: #bababa;
  font-family: 'Assistant', sans-serif;
  font-weight: 700;
  font-size: 14px;
  margin: 0;
  letter-spacing: 0.14px;
  line-height: 1.2;
`;

const IconContainer = styled.div<{ $type: 'success' | 'error' }>`
  background: ${props => props.$type === 'success' ? 'rgba(82, 157, 52, 0.35)' : 'rgba(255, 77, 77, 0.25)'};
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$type === 'success' ? '#63ff6a' : '#ff4d4d'};
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #e1eaff;
  transition: all 0.2s;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

interface ToastProps {
  title: string;
  subtitle: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ title, subtitle, type = 'success', onClose, duration = 4000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 400); // Match animation duration
  };

  return (
    <ToastWrapper $isExiting={isExiting} $type={type}>
      <ContentWrapper>
        <IconContainer $type={type}>
          {type === 'success' ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
          ) : (
            <ErrorOutlineIcon sx={{ fontSize: 24 }} />
          )}
        </IconContainer>

        <TextContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TextContainer>
      </ContentWrapper>

      <CloseButton onClick={handleClose}>
        <CloseIcon sx={{ fontSize: 16 }} />
      </CloseButton>
    </ToastWrapper>
  );
};
