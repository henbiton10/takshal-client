import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const GlobalShake = createGlobalStyle<{ $active: boolean }>`
  body {
    animation: ${props => props.$active ? shake : 'none'} 0.5s;
    animation-iteration-count: infinite;
  }
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

interface Meteor {
  x: number;
  y: number;
  size: number;
  speed: number;
  length: number;
  opacity: number;
}

export const MeteorShower: React.FC<{ active: boolean; onFinish: () => void }> = ({ active, onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteors = useRef<Meteor[]>([]);
  const animationFrame = useRef<number>();
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!active) return;

    setIsShaking(true);
    const timeout = setTimeout(() => {
      setIsShaking(false);
      onFinish();
    }, 5000); // Shower lasts 5 seconds

    return () => clearTimeout(timeout);
  }, [active, onFinish]);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const createMeteor = (): Meteor => ({
      x: Math.random() * canvas.width + canvas.width * 0.5, // Start from the right side
      y: Math.random() * canvas.height * -0.5, // Start above the screen
      size: Math.random() * 2 + 1,
      speed: Math.random() * 15 + 10,
      length: Math.random() * 80 + 50,
      opacity: Math.random() * 0.5 + 0.5,
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new meteors periodically
      if (Math.random() > 0.8 && meteors.current.length < 50) {
        meteors.current.push(createMeteor());
      }

      meteors.current.forEach((m, index) => {
        m.x -= m.speed;
        m.y += m.speed * 0.6; // Falling at an angle

        const gradient = ctx.createLinearGradient(
          m.x, m.y, 
          m.x + m.length, m.y - m.length * 0.6
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        gradient.addColorStop(0.2, `rgba(61, 130, 246, ${m.opacity * 0.8})`); // Meteor blue trail
        gradient.addColorStop(1, 'rgba(61, 130, 246, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.length, m.y - m.length * 0.6);
        ctx.stroke();

        // Remove meteors that go off screen
        if (m.x < -m.length || m.y > canvas.height + m.length) {
          meteors.current.splice(index, 1);
        }
      });

      animationFrame.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <GlobalShake $active={isShaking} />
      <Canvas ref={canvasRef} />
    </>
  );
};
