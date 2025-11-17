import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
  transitionDamping?: number;
}

export const MagneticButton = React.memo<MagneticButtonProps>(
  ({ children, onClick, className = '', magneticStrength = 0.3, transitionDamping = 0.15 }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      let animationFrameId: number;
      let currentOffset = { x: 0, y: 0 };
      let targetOffset = { x: 0, y: 0 };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from button center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        // Calculate distance
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Magnetic effect range (in pixels)
        const magneticRange = 150;

        if (distance < magneticRange) {
          // Attraction effect - button moves towards cursor
          targetOffset = {
            x: distX * magneticStrength,
            y: distY * magneticStrength,
          };
        } else {
          targetOffset = { x: 0, y: 0 };
        }
      };

      const handleMouseLeave = () => {
        targetOffset = { x: 0, y: 0 };
      };

      const animate = () => {
        // Lerp towards target offset
        currentOffset.x += (targetOffset.x - currentOffset.x) * transitionDamping;
        currentOffset.y += (targetOffset.y - currentOffset.y) * transitionDamping;

        setOffset({
          x: Math.round(currentOffset.x * 100) / 100,
          y: Math.round(currentOffset.y * 100) / 100,
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      document.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
      animationFrameId = requestAnimationFrame(animate);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
      };
    }, [magneticStrength, transitionDamping]);

    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'none', // No transition - smooth via RAF
        }}
        className={`relative transition-all duration-200 ${className}`}
      >
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
