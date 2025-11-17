import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MagneticButton } from "../ui/MagneticButton";
import { useParallax } from "@/hooks/useParallax";

// Lazy load heavy background effects for better performance
const BackgroundParticles = dynamic(
  () =>
    import("../effects/BackgroundParticles").then(
      (mod) => mod.BackgroundParticles,
    ),
  { ssr: false },
);

const InteractiveMeshGradient = dynamic(
  () =>
    import("../effects/InteractiveMeshGradient").then(
      (mod) => mod.InteractiveMeshGradient,
    ),
  { ssr: false },
);

export const Hero: React.FC = () => {
  const [parallaxRef1, { offsetY: offset1 }] = useParallax({ speed: 0.4 });
  const [parallaxRef2, { offsetY: offset2 }] = useParallax({ speed: 0.6 });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ku-pine via-ku-pine to-ku-fresh max-w-full"
      ref={parallaxRef1}
    >
      {/* Interactive Mesh Gradient (follows mouse) */}
      <InteractiveMeshGradient intensity={0.25} />

      {/* Background Particles */}
      <BackgroundParticles density="medium" />

      {/* Animated background elements with parallax effect */}
      <div
        className="absolute inset-0 opacity-10 z-0 overflow-hidden max-w-full"
        ref={parallaxRef2}
      >
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-ku-fresh rounded-full blur-3xl animate-pulseSlow"
          style={{ transform: `translateY(${offset1 * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulseSlow"
          style={{
            animationDelay: "1s",
            transform: `translateY(${offset2 * 0.3}px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* CPSK Logo with enhanced animation */}
        <div className="mb-8 animate-slideDown">
          <div className="inline-flex items-center justify-center w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full overflow-hidden bg-white shadow-2xl hover-lift">
            <img
              src="/logos/CPSK-logo.png"
              alt="CPSK Club"
              width="192"
              height="192"
              className="w-full h-full object-cover"
              {...({
                fetchpriority: "high",
              } as React.ImgHTMLAttributes<HTMLImageElement>)}
            />
          </div>
        </div>

        {/* Main Title with staggered animation */}
        <div className="animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            KU Computer Engineering
            <br />
            <span className="text-ku-fresh block mt-2">Job Fair 2025</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          New opportunities are waiting for you
        </p>

        {/* Event Details with better spacing */}
        <div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-12 text-white/85 text-sm sm:text-base animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>November 26, 2025</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>09:00 - 17:00</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            <span className="hidden sm:inline">
              Computer Engineering Building, KU
            </span>
            <span className="sm:hidden">Computer Engineering Building</span>
          </div>
        </div>

        {/* Primary CTA Button with improved styling */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <Link href="/companies">
            <MagneticButton
              magneticStrength={0.3}
              className="group relative inline-flex items-center gap-2 px-8 sm:px-12 py-3 sm:py-4 bg-ku-fresh hover:bg-ku-fresh-dark text-ku-pine-dark font-bold text-base sm:text-lg rounded-full shadow-2xl transition-all duration-300 hover:shadow-ku-fresh/50 active:scale-95"
            >
              <span>Explore Companies</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </MagneticButton>
          </Link>
        </div>

        {/* Scroll Indicator with gentle bounce */}
        <div
          className="absolute bottom-20 sm:bottom-16 left-1/2 transform -translate-x-1/2 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="animate-bounceGentle text-white/60 cursor-pointer hover:text-white/80 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
