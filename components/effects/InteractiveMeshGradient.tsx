import React, { useState, useEffect, useCallback, useRef } from "react";

interface InteractiveMeshGradientProps {
  colors?: string[];
  intensity?: number;
}

export const InteractiveMeshGradient: React.FC<
  InteractiveMeshGradientProps
> = ({
  colors = ["#1B5E5E", "#A4B82E"], // KU Pine and Fresh
  intensity = 0.3,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();
  const targetPosition = useRef({ x: 50, y: 50 });
  const currentPosition = useRef({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUpdate = useRef<number>(0);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth lerp (linear interpolation) for natural movement
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Animate position smoothly with throttling
  const animate = useCallback(() => {
    const now = Date.now();
    // Throttle updates to 30fps on mobile, 60fps on desktop
    const throttleMs = isMobile ? 33 : 16;

    if (now - lastUpdate.current < throttleMs) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    lastUpdate.current = now;
    currentPosition.current.x = lerp(
      currentPosition.current.x,
      targetPosition.current.x,
      isMobile ? 0.05 : 0.1,
    );
    currentPosition.current.y = lerp(
      currentPosition.current.y,
      targetPosition.current.y,
      isMobile ? 0.05 : 0.1,
    );

    setMousePosition({
      x: currentPosition.current.x,
      y: currentPosition.current.y,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [isMobile]);

  // Handle mouse move with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    targetPosition.current = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  }, []);

  // Auto-animate when not hovering (figure-8 pattern)
  useEffect(() => {
    let autoAnimFrame: number;

    if (!isHovering) {
      let time = 0;
      const autoAnimate = () => {
        time += 0.01;
        targetPosition.current = {
          x: 50 + Math.sin(time) * 20,
          y: 50 + Math.sin(time * 2) * 15,
        };
        autoAnimFrame = requestAnimationFrame(autoAnimate);
      };
      autoAnimate();
    }

    return () => {
      if (autoAnimFrame) cancelAnimationFrame(autoAnimFrame);
    };
  }, [isHovering]);

  // Setup and cleanup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable on mobile or touch devices for performance
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && !isMobile) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (!isTouchDevice && !isMobile) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => setIsHovering(false));
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, animate, isMobile]);

  // Don't render on mobile for better performance
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Interactive gradient that follows cursor */}
      <div
        className="absolute w-full h-full transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
            ${colors[0]}${Math.round(intensity * 255)
              .toString(16)
              .padStart(2, "0")} 0%,
            ${colors[1]}${Math.round(intensity * 0.5 * 255)
              .toString(16)
              .padStart(2, "0")} 30%,
            transparent 60%)`,
          filter: "blur(60px)",
          opacity: isHovering ? 1 : 0.7,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Secondary gradient for depth */}
      <div
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%,
            ${colors[1]}${Math.round(intensity * 0.4 * 255)
              .toString(16)
              .padStart(2, "0")} 0%,
            transparent 50%)`,
          filter: "blur(80px)",
          opacity: 0.6,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Hide on reduced motion */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
