import React, { useEffect, useRef, useCallback } from 'react';
import type { Company } from '@/types/company';
import { getCompanyLogoFilename } from '@/lib/companyLogoMap';

interface CompanyModalProps {
  company: Company | null;
  onClose: () => void;
}

export const CompanyModal = React.memo<CompanyModalProps>(({ company, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const logoFilename = company ? getCompanyLogoFilename(company.name) : '';
  const logoUrl = company?.logo || (logoFilename ? `/logos/${logoFilename}.png` : '');

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!company) return;

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus the close button
    setTimeout(() => {
      const closeButton = modalRef.current?.querySelector('button[aria-label="Close modal"]') as HTMLButtonElement;
      closeButton?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap - keep focus within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusableElements) as HTMLElement[];

        if (focusableArray.length === 0) return;

        const activeElement = document.activeElement as HTMLElement;
        const focusedIndex = focusableArray.indexOf(activeElement);

        if (e.shiftKey) {
          // Shift+Tab
          if (focusedIndex <= 0) {
            e.preventDefault();
            focusableArray[focusableArray.length - 1].focus();
          }
        } else {
          // Tab
          if (focusedIndex >= focusableArray.length - 1) {
            e.preventDefault();
            focusableArray[0].focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';

      // Restore previous focus
      previousFocusRef.current?.focus();
    };
  }, [company, onClose]);

  if (!company) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 z-50 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-t-2xl md:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-name"
        aria-describedby="company-type"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 z-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-150 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center text-center pt-2">
            {/* Company Logo Placeholder */}
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3 overflow-hidden">
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
                      const initials = company.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
                      parent.innerHTML = `<span class="text-white text-2xl font-bold">${initials}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {company.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Company Name */}
            <h2 id="company-name" className="text-xl md:text-2xl font-bold text-gray-900 mb-1 leading-tight">
              {company.name}
            </h2>
            <p id="company-type" className="text-sm text-gray-500 font-medium">
              สถานประกอบการ
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Business Type */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-ku-pine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m11.581 0a2 2 0 100-4H9m11.581 4a2 2 0 100-4H9m0 16V9m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0m15-6h-2m0 0h-2m2 0a2 2 0 100-4m0 4a2 2 0 11-4 0m4 0V5m-4 4H7" />
              </svg>
              Business Type
            </h3>
            <p className="text-sm text-gray-700">{company.businessType}</p>
          </div>

          {/* Participation Time */}
          <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <svg className="w-4 h-4 text-ku-pine flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-800">
              <span className="font-semibold">Participation Time:</span> {company.participationTime}
            </span>
          </div>

          {/* Positions */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-ku-pine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Open Positions
              <span className="text-xs font-normal text-gray-500">({company.positions.length})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.positions.map((pos, i) => {
                const colors = [
                  'bg-blue-200 text-blue-800',
                  'bg-purple-200 text-purple-800',
                  'bg-pink-200 text-pink-800',
                  'bg-indigo-200 text-indigo-800',
                  'bg-teal-200 text-teal-800',
                  'bg-cyan-200 text-cyan-800',
                  'bg-rose-200 text-rose-800',
                  'bg-amber-200 text-amber-800',
                ];
                const colorClass = colors[i % colors.length];
                return (
                  <span key={i} className={`inline-flex items-center text-xs px-3 py-1.5 rounded-md font-medium ${colorClass}`}>
                    {pos}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          {company.skills.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-ku-pine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Required Skills
              </h3>
              <ul className="space-y-1.5">
                {company.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-ku-pine mt-0.5">•</span>
                    <span className="flex-1">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Employment Types & Year Levels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-ku-pine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Employment Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(company.employmentTypes.map((type) => {
                  if (type.includes('full-time') || type.includes('เต็มเวลา')) {
                    return 'Full-time';
                  } else if (type.includes('part-time') || type.includes('ไม่เต็มเวลา')) {
                    return 'Part-time';
                  } else if (type.includes('intern') || type.includes('ฝึกงาน')) {
                    return 'Internship';
                  }
                  return type;
                }))).map((displayType, i) => (
                  <span key={i} className="px-3 py-1 bg-ku-fresh text-ku-pine-dark text-xs font-medium rounded-md">
                    {displayType}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-ku-pine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Recruiting Year Levels
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.yearLevels.length > 0
                  ? company.yearLevels.map((year) => (
                      <span key={year} className="px-3 py-1 bg-ku-fresh text-ku-pine-dark text-xs font-semibold rounded-md">
                        Year {year}
                      </span>
                    ))
                  : <span className="text-xs text-gray-500">Not specified</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-ku-pine hover:bg-ku-pine-dark text-white text-sm rounded-lg font-semibold transition-all duration-150 active:scale-[0.98]"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

CompanyModal.displayName = 'CompanyModal';

