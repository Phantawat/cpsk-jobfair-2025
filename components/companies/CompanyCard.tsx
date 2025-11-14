import React from 'react';
import type { Company } from '@/types/company';
import { getCompanyLogoFilename } from '@/lib/companyLogoMap';

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
    // Get initials for logo placeholder
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    };

    const logoFilename = getCompanyLogoFilename(company.name);
    const logoUrl = company.logo || (logoFilename ? `/logos/${logoFilename}.png` : '');

    return (
      <div
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        style={{ animationDelay: `${staggerIndex * 0.1}s` }}
        className={`group bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ease-out shadow-md hover:shadow-2xl animate-scaleIn ${
          isActive
            ? 'border-ku-pine shadow-lg shadow-ku-pine/30 scale-[1.02]'
            : 'border-gray-200 hover:border-ku-pine/50 hover-lift'
        }`}
        role="button"
        aria-pressed={isActive}
      >
        {/* Company Logo/Icon */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mb-3 overflow-hidden bg-gray-800 transition-all duration-300 group-hover:shadow-md group-hover:shadow-ku-fresh/30 ${
            isActive ? 'ring-2 ring-ku-fresh' : ''
          }`}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${company.name} logo`}
                className="w-full h-full object-contain p-2 bg-white"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="font-bold text-xl text-white">${getInitials(company.name)}</span>`;
                  }
                }}
              />
            ) : (
              <span className="font-bold text-xl text-white">{getInitials(company.name)}</span>
            )}
          </div>
          <h3 className="text-base font-bold text-gray-800 leading-tight group-hover:text-ku-pine transition-colors duration-200">{company.name}</h3>
        </div>

        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {company.employmentTypes.slice(0, 2).map((type, i) => {
            let displayType = type;
            if (type.includes('full-time') || type.includes('เต็มเวลา')) {
              displayType = 'Full-time';
            } else if (type.includes('part-time') || type.includes('ไม่เต็มเวลา')) {
              displayType = 'Part-time';
            } else if (type.includes('intern') || type.includes('ฝึกงาน')) {
              displayType = 'Internship';
            } else if (type.includes('freelancer') || type.includes('อาชีพอิสระ')) {
              displayType = 'Freelance';
            }
            return (
              <span
                key={i}
                className="px-2.5 py-1 bg-ku-fresh text-ku-pine-dark text-xs font-medium rounded-full transition-all duration-200 group-hover:bg-ku-fresh-dark group-hover:scale-105"
              >
                {displayType}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
);

CompanyCard.displayName = 'CompanyCard';

