import React, { useState } from "react";
import type { Company } from "@/types/company";
import { getCompanyLogoFilename } from "@/lib/companyLogoMap";

interface CompanyCardProps {
  company: Company;
  isActive: boolean;
  tabIndex: number;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  staggerIndex?: number;
}

export const CompanyCard = React.memo<CompanyCardProps>(
  ({ company, isActive, tabIndex, onClick, onKeyDown, staggerIndex = 0 }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Auto-flip back after 3 seconds
    React.useEffect(() => {
      if (isFlipped) {
        const timer = setTimeout(() => {
          setIsFlipped(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [isFlipped]);

    // Get initials for logo placeholder
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
    };

    const logoFilename = getCompanyLogoFilename(company.name);
    const logoUrl =
      company.logo || (logoFilename ? `/logos/${logoFilename}.png` : "");

    const handleFlipClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(!isFlipped);
    };

    const handleCardClick = (e: React.MouseEvent) => {
      // Only open modal if not clicking flip button
      if (!(e.target as HTMLElement).closest(".flip-button")) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Space or Enter to flip when focused on flip button
      if (
        (e.target as HTMLElement).classList.contains("flip-button") &&
        (e.key === " " || e.key === "Enter")
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsFlipped(!isFlipped);
        return;
      }
      // Pass other key events to parent
      onKeyDown?.(e);
    };

    return (
      <div
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
        style={{ animationDelay: `${staggerIndex * 0.1}s` }}
        className={`flip-card ${isFlipped ? "flipped" : ""} group bg-transparent rounded-2xl cursor-pointer animate-scaleIn h-full ${
          isActive ? "" : ""
        }`}
        role="button"
        aria-pressed={isActive}
      >
        <div className="flip-card-inner h-full">
          {/* FRONT SIDE */}
          <div
            className={`flip-card-front bg-white rounded-2xl border-2 p-6 transition-all duration-300 ease-out shadow-md hover:shadow-2xl glass-hover h-full flex flex-col ${
              isActive
                ? "border-ku-pine shadow-lg shadow-ku-pine/30 glass-tint-pine"
                : "border-gray-200 hover:border-ku-pine/50 hover-lift hover:glass-light"
            }`}
          >
            {/* Company Logo/Icon */}
            <div className="flex flex-col items-center text-center mb-4 flex-1">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mb-3 overflow-hidden bg-gray-800 transition-all duration-300 group-hover:shadow-md group-hover:shadow-ku-fresh/30 ${
                  isActive ? "ring-2 ring-ku-fresh" : ""
                }`}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${company.name} logo`}
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-2 bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement)
                        .parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="font-bold text-xl text-white">${getInitials(company.name)}</span>`;
                      }
                    }}
                  />
                ) : (
                  <span className="font-bold text-xl text-white">
                    {getInitials(company.name)}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-gray-800 leading-tight group-hover:text-ku-pine transition-colors duration-200">
                {company.name}
              </h3>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-3 min-h-[28px]">
              {Array.from(new Set(company.employmentTypes)).map((type, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-ku-fresh text-white text-xs font-semibold rounded-full transition-all duration-200 group-hover:bg-ku-fresh-dark group-hover:scale-105"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Flip Button */}
            <button
              className="flip-button w-full mt-2 py-1.5 text-xs text-ku-pine hover:text-ku-pine-dark font-medium flex items-center justify-center gap-1 transition-colors"
              aria-label="Show quick stats"
              onClick={handleFlipClick}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Quick Stats
            </button>
          </div>

          {/* BACK SIDE */}
          <div className="flip-card-back bg-gradient-to-br from-ku-pine to-ku-pine-dark rounded-2xl border-2 border-ku-pine p-6 shadow-2xl text-white h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold mb-4 text-ku-fresh">
                  Quick Stats
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-semibold text-white">
                      {company.positions.length} Positions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
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
                    <span className="text-sm text-white">
                      {company.participationTime}
                    </span>
                  </div>
                  {company.yearLevels.length > 0 && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="text-sm text-white">
                        Year {company.yearLevels.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CompanyCard.displayName = "CompanyCard";
