import React, { useCallback, useState } from 'react';
import type { SortOption } from '@/types/company';

interface FiltersPanelProps {
  searchQuery: string;
  positionsFilter: string;
  selectedEmploymentTypes: string[];
  selectedYearLevels: number[];
  sortOption: SortOption;
  onSearchChange: (query: string) => void;
  onPositionsFilterChange: (filter: string) => void;
  onEmploymentTypeChange: (type: string) => void;
  onYearLevelChange: (year: number) => void;
  onSortChange: (option: SortOption) => void;
  onClearFilters: () => void;
}

export const FiltersPanel = React.memo<FiltersPanelProps>(
  ({
    searchQuery,
    positionsFilter,
    selectedEmploymentTypes,
    selectedYearLevels,
    sortOption,
    onSearchChange,
    onPositionsFilterChange,
    onEmploymentTypeChange,
    onYearLevelChange,
    onSortChange,
    onClearFilters,
  }) => {
    // Accordion state management
    const [openSections, setOpenSections] = useState({
      positions: false,
      employment: false,
      yearLevel: false,
      sort: false,
    });

    const toggleSection = (section: keyof typeof openSections) => {
      setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
      <section className="mb-8" aria-label="Filters">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-ku-dark mb-4">Search & Filter</h2>

          {/* Search Input */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-xs font-medium text-gray-600 mb-2">
              Search
            </label>
            <div className="relative">
              {/* Search Icon */}
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              <input
                id="search"
                type="text"
                placeholder="Search companies, positions, or industries..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-shadow text-gray-900 placeholder:text-gray-400"
              />
              
              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Positions Filter */}
          <div className="mb-4 border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('positions')}
              className="w-full flex items-center justify-between text-left py-2 group"
              aria-expanded={openSections.positions}
            >
              <h3 className="text-sm font-semibold text-gray-900">Position Filter</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                  openSections.positions ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSections.positions && (
              <div className="mt-3 animate-in fade-in duration-200">
                <input
                  id="positions"
                  type="text"
                  placeholder="e.g., Engineer, Developer..."
                  value={positionsFilter}
                  onChange={(e) => onPositionsFilterChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-shadow text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
            )}
          </div>

          {/* Employment Type Filter */}
          <div className="mb-4 border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('employment')}
              className="w-full flex items-center justify-between text-left py-2 group"
              aria-expanded={openSections.employment}
            >
              <h3 className="text-sm font-semibold text-gray-900">Employment Type</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                  openSections.employment ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSections.employment && (
              <div className="mt-3 flex flex-col gap-2.5 animate-in fade-in duration-200">
                {['Full-time', 'Part-time', 'Internship'].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer group/item hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedEmploymentTypes.includes(type)}
                      onChange={() => onEmploymentTypeChange(type)}
                      className="w-4 h-4 text-ku-pine focus:ring-2 focus:ring-gray-200 rounded border-gray-300"
                      aria-label={type}
                    />
                    <span className="text-sm text-gray-700 group-item/hover:text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Year Level Filter */}
          <div className="mb-4 border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('yearLevel')}
              className="w-full flex items-center justify-between text-left py-2 group"
              aria-expanded={openSections.yearLevel}
            >
              <h3 className="text-sm font-semibold text-gray-900">Year Level</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                  openSections.yearLevel ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSections.yearLevel && (
              <div className="mt-3 flex flex-col gap-2.5 animate-in fade-in duration-200">
                {[1, 2, 3, 4].map((year) => (
                  <label key={year} className="flex items-center gap-2.5 cursor-pointer group/item hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedYearLevels.includes(year)}
                      onChange={() => onYearLevelChange(year)}
                      className="w-4 h-4 text-ku-pine focus:ring-2 focus:ring-gray-200 rounded border-gray-300"
                      aria-label={`Year ${year}`}
                    />
                    <span className="text-sm text-gray-700 group-item/hover:text-gray-900">Year {year}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Option */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('sort')}
              className="w-full flex items-center justify-between text-left py-2 group"
              aria-expanded={openSections.sort}
            >
              <h3 className="text-sm font-semibold text-gray-900">Sort By</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                  openSections.sort ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSections.sort && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-shadow text-sm text-gray-900 bg-white"
                >
                  <option value="name-asc">Company Name (A → Z)</option>
                  <option value="name-desc">Company Name (Z → A)</option>
                  <option value="time-earliest">Participation Time (Earliest)</option>
                  <option value="time-latest">Participation Time (Latest)</option>
                </select>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-150 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
            aria-label="Clear all filters"
          >
            Clear All Filters
          </button>
        </div>
      </section>
    );
  }
);

FiltersPanel.displayName = 'FiltersPanel';

