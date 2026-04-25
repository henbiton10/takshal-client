import React, { useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const flicker = keyframes`
  0%, 100% { opacity: 0.8; }
  33% { opacity: 1; }
  66% { opacity: 0.9; }
`;

const meteorShake = keyframes`
  0%, 100% { margin-top: 0; margin-left: 0; }
  50% { margin-top: -1px; margin-left: 1px; }
`;

const GlobalHideCursor = createGlobalStyle`
  html, body, * {
    cursor: none !important;
  }
`;

const FireParticle = styled.div<{ $color: string; $size: number; $zIndex: number; $blur: number }>`
  position: fixed;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${props => props.$color};
  border-radius: 50% 50% 20% 50%;
  pointer-events: none;
  z-index: ${props => props.$zIndex};
  filter: blur(${props => props.$blur}px);
  box-shadow: 0 0 ${props => props.$blur * 2}px ${props => props.$color};
  animation: ${flicker} 0.2s infinite ease-in-out;
  transform: rotate(45deg);
`;

import meteorIcon from '../../../assets/meteor.png';

const MeteorHead = styled.img`
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 1000000;
  filter: drop-shadow(0 0 10px rgba(255, 150, 0, 0.7));
  animation: ${meteorShake} 0.1s infinite linear;
  object-fit: contain;
`;

const NUM_PARTICLES = 15;
const COLORS = [
  "#ffffff", "#ffffcc", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#f44336", "#d32f2f", "#b71c1c",
];

export const MeteorCursor: React.FC<{ active: boolean }> = ({ active }) => {
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const particlesRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: NUM_PARTICLES }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
  );
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headRef = useRef<HTMLImageElement | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      let x = mousePos.current.x;
      let y = mousePos.current.y;

      if (headRef.current) {
        headRef.current.style.left = `${x - 16}px`;
        headRef.current.style.top = `${y - 16}px`;
      }

      particlesRef.current.forEach((particle, index) => {
        const el = elementsRef.current[index];
        if (el) {
          const size = 24 + index * 2;
          el.style.left = `${x - size / 2}px`;
          el.style.top = `${y - size / 2}px`;

          const scale = 1 - (index / NUM_PARTICLES) * 0.8;
          el.style.scale = scale.toString();

          particle.x = x;
          particle.y = y;

          const nextParticle = particlesRef.current[index + 1] || particlesRef.current[0];
          x += (nextParticle.x - x) * 0.7;
          y += (nextParticle.y - y) * 0.7;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <GlobalHideCursor />
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <FireParticle
          key={i}
          ref={(el) => (elementsRef.current[i] = el)}
          $color={COLORS[Math.min(i, COLORS.length - 1)]}
          $size={24 + i * 2}
          $blur={4 + i}
          $zIndex={1000000 - i}
        />
      ))}
      <MeteorHead ref={headRef} src={meteorIcon} alt="Meteor" />
    </>
  );
};
