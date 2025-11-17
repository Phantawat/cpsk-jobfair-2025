import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  type: "circle" | "triangle" | "hexagon";
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface BackgroundParticlesProps {
  density?: "low" | "medium" | "high";
  colors?: string[];
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  density = "medium",
  colors = ["#1B5E5E", "#A4B82E"], // KU Pine and Fresh
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate particles based on density - optimized for mobile
  const particleCount = useMemo(() => {
    const counts = { low: 8, medium: 15, high: 20 };
    // Only reduce count on mobile after hydration
    if (!isMounted) return counts[density];
    const isMobile = window.innerWidth < 768;
    const isLowEnd = window.innerWidth < 640;
    // Reduce particles more aggressively on small screens
    if (isLowEnd) return Math.floor(counts[density] * 0.3);
    return isMobile ? Math.floor(counts[density] * 0.5) : counts[density];
  }, [density, isMounted]);

  const particles = useMemo<Particle[]>(() => {
    // Use seeded random for consistent SSR/client rendering
    let seed = 12345;
    const seededRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: particleCount }, (_, i) => {
      const types: Array<"circle" | "triangle" | "hexagon"> = [
        "circle",
        "triangle",
        "hexagon",
      ];
      const sizes = [8, 12, 16, 20, 24];

      return {
        id: i,
        type: types[Math.floor(seededRandom() * types.length)],
        size: sizes[Math.floor(seededRandom() * sizes.length)],
        x: seededRandom() * 100, // percentage
        y: seededRandom() * 100, // percentage
        duration: 20 + seededRandom() * 20, // 20-40s
        delay: seededRandom() * 5, // 0-5s
        opacity: 0.15 + seededRandom() * 0.25, // 0.15-0.4
        color: colors[Math.floor(seededRandom() * colors.length)],
      };
    });
  }, [particleCount, colors]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Render different shapes
  const renderShape = (particle: Particle) => {
    const shapeProps = {
      style: {
        width: particle.size,
        height: particle.size,
      },
    };

    switch (particle.type) {
      case "circle":
        return (
          <div
            {...shapeProps}
            className="rounded-full"
            style={{
              ...shapeProps.style,
              backgroundColor: particle.color,
              filter: "blur(1px)",
            }}
          />
        );

      case "triangle":
        return (
          <div
            {...shapeProps}
            style={{
              ...shapeProps.style,
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              filter: "blur(1px)",
            }}
          />
        );

      case "hexagon":
        return (
          <div
            {...shapeProps}
            style={{
              ...shapeProps.style,
              backgroundColor: particle.color,
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              filter: "blur(1px)",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Particle container with reduced motion support */}
      <div className="particles-container">
        {particles.map((particle) => {
          // Use particle id as seed for consistent random values
          const seed = particle.id * 9999;
          const seededX = Math.sin(seed) * 10;
          const seededY = Math.sin(seed + 1) * 10;
          const randomOffsetX = seededX - Math.floor(seededX / 10) * 10 - 5;
          const randomOffsetY = seededY - Math.floor(seededY / 10) * 10 - 5;

          // Simplify animations on mobile
          const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;

          return (
            <motion.div
              key={particle.id}
              className="absolute"
              initial={{
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
                opacity: particle.opacity,
                scale: 1,
              }}
              animate={
                isMobile
                  ? {
                      // Simpler animation for mobile
                      x: [
                        `${particle.x}vw`,
                        `${particle.x + randomOffsetX * 0.5}vw`,
                        `${particle.x}vw`,
                      ],
                      y: [
                        `${particle.y}vh`,
                        `${particle.y + randomOffsetY * 0.5}vh`,
                        `${particle.y}vh`,
                      ],
                      opacity: [
                        particle.opacity,
                        particle.opacity * 0.7,
                        particle.opacity,
                      ],
                    }
                  : {
                      // Full animation for desktop
                      x: [
                        `${particle.x}vw`,
                        `${particle.x + randomOffsetX}vw`,
                        `${particle.x}vw`,
                      ],
                      y: [
                        `${particle.y}vh`,
                        `${particle.y + randomOffsetY}vh`,
                        `${particle.y}vh`,
                      ],
                      opacity: [
                        particle.opacity,
                        particle.opacity * 0.5,
                        particle.opacity,
                      ],
                      scale: [1, 1.1, 1],
                      rotate:
                        particle.type === "circle" ? [0, 360, 0] : [0, 180, 0],
                    }
              }
              transition={{
                duration: isMobile
                  ? particle.duration * 1.5
                  : particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              {renderShape(particle)}
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        .particles-container {
          contain: layout style paint;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .particles-container {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .particles-container {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};
