import React, { useState, useEffect } from "react";

interface GradientWavesProps {
  opacity?: number;
}

export const GradientWaves: React.FC<GradientWavesProps> = ({
  opacity = 0.3,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: -1 }}
    >
      {/* Wave Layer 1 - Slowest, largest */}
      <div
        className="absolute inset-0 gradient-wave-1"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(27, 94, 94, ${opacity * 0.4}) 0%, transparent 50%)`,
          filter: isMobile ? "blur(40px)" : "blur(80px)",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Wave Layer 2 - Medium speed */}
      <div
        className="absolute inset-0 gradient-wave-2"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, rgba(164, 184, 46, ${opacity * 0.35}) 0%, transparent 50%)`,
          filter: isMobile ? "blur(30px)" : "blur(60px)",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Wave Layer 3 - Faster - Desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 gradient-wave-3"
          style={{
            background: `radial-gradient(ellipse at 50% 70%, rgba(27, 94, 94, ${opacity * 0.3}) 0%, transparent 45%)`,
            filter: "blur(70px)",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      )}

      {/* Wave Layer 4 - Fastest, accent - Desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 gradient-wave-4"
          style={{
            background: `radial-gradient(ellipse at 60% 30%, rgba(164, 184, 46, ${opacity * 0.25}) 0%, transparent 40%)`,
            filter: "blur(50px)",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      )}

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .gradient-wave-1,
          .gradient-wave-2,
          .gradient-wave-3,
          .gradient-wave-4 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
