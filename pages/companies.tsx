import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';

import { Company, SortOption } from '@/types/company';
import { parseCompaniesCsv } from '@/lib/parseCsv';
import { FiltersPanel } from '@/components/companies/FiltersPanel';
import { CompanyList } from '@/components/companies/CompanyList';
import { CompanyModal } from '@/components/companies/CompanyModal';

interface CompaniesPageProps {
  companies: Company[];
}

interface FilterState {
  searchQuery: string;
  selectedBusinessTypes: string[];
  positionsFilter: string;
  selectedEmploymentTypes: string[];
  selectedYearLevels: number[];
  sortOption: SortOption;
}

// Debounce hook
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Filter companies based on all filters (AND logic)
function filterCompanies(companies: Company[], filters: FilterState): Company[] {
  return companies.filter((company) => {
    // Search filter - check searchText field
    if (filters.searchQuery && !company.searchText.includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Business type filter (OR within business types)
    if (filters.selectedBusinessTypes.length > 0) {
      if (!filters.selectedBusinessTypes.some((type) =>
        company.businessType.toLowerCase().includes(type.toLowerCase())
      )) {
        return false;
      }
    }

    // Positions filter
    if (filters.positionsFilter) {
      if (!company.positions.some((pos) =>
        pos.toLowerCase().includes(filters.positionsFilter.toLowerCase())
      )) {
        return false;
      }
    }

    // Employment types filter (OR within employment types)
    if (filters.selectedEmploymentTypes.length > 0) {
      if (!company.employmentTypes.some((type) =>
        filters.selectedEmploymentTypes.some((selected) =>
          type.toLowerCase().includes(selected.toLowerCase())
        )
      )) {
        return false;
      }
    }

    // Year levels filter (OR within year levels)
    // If user selects Year 2, show companies that accept Year 2 or higher (2, 3, 4)
    if (filters.selectedYearLevels.length > 0) {
      const minSelectedYear = Math.min(...filters.selectedYearLevels);
      if (!company.yearLevels.some((year) => year >= minSelectedYear)) {
        return false;
      }
    }

    return true;
  });
}

// Sort companies
function sortCompanies(companies: Company[], sortOption: SortOption): Company[] {
  const collator = new Intl.Collator(['th', 'en']);
  const sorted = [...companies];

  switch (sortOption) {
    case 'name-asc':
      sorted.sort((a, b) => collator.compare(a.name, b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => collator.compare(b.name, a.name));
      break;
    case 'time-earliest':
      sorted.sort((a, b) => a.startMinutes - b.startMinutes);
      break;
    case 'time-latest':
      sorted.sort((a, b) => b.startMinutes - a.startMinutes);
      break;
  }

  return sorted;
}

// Extract unique values from array field
function extractUniqueValues<T>(companies: Company[], field: keyof Company): T[] {
  const values = new Set<T>();
  companies.forEach((company) => {
    const fieldValue = company[field];
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((val) => values.add(val as T));
    }
  });
  return Array.from(values).sort();
}

export default function CompaniesPage({ companies }: CompaniesPageProps) {
  // State management
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedBusinessTypes: [],
    positionsFilter: '',
    selectedEmploymentTypes: [],
    selectedYearLevels: [],
    sortOption: 'name-asc',
  });

  const [activeCompany, setActiveCompany] = useState<Company | null>(null);
  const [activeListIndex, setActiveListIndex] = useState(0);

  // Debounce search
  const debouncedSearchQuery = useDebouncedValue(filters.searchQuery, 200);

  // Extract unique values for filters
  const uniqueBusinessTypes = useMemo(() => {
    const types = new Set<string>();
    companies.forEach((company) => {
      types.add(company.businessType);
    });
    return Array.from(types).sort();
  }, [companies]);

  const uniqueEmploymentTypes = useMemo(
    () => extractUniqueValues<string>(companies, 'employmentTypes'),
    [companies]
  );

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return filterCompanies(companies, {
      ...filters,
      searchQuery: debouncedSearchQuery,
    });
  }, [companies, filters, debouncedSearchQuery]);

  // Sort companies
  const sortedCompanies = useMemo(() => {
    return sortCompanies(filteredCompanies, filters.sortOption);
  }, [filteredCompanies, filters.sortOption]);

  // Reset index when filtered results change
  useEffect(() => {
    setActiveListIndex(0);
  }, [sortedCompanies]);

  // Event handlers
  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleBusinessTypeChange = useCallback((type: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedBusinessTypes: prev.selectedBusinessTypes.includes(type)
        ? prev.selectedBusinessTypes.filter((t) => t !== type)
        : [...prev.selectedBusinessTypes, type],
    }));
  }, []);

  const handlePositionsFilterChange = useCallback((filter: string) => {
    setFilters((prev) => ({ ...prev, positionsFilter: filter }));
  }, []);

  const handleEmploymentTypeChange = useCallback((type: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedEmploymentTypes: prev.selectedEmploymentTypes.includes(type)
        ? prev.selectedEmploymentTypes.filter((t) => t !== type)
        : [...prev.selectedEmploymentTypes, type],
    }));
  }, []);

  const handleYearLevelChange = useCallback((year: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedYearLevels: prev.selectedYearLevels.includes(year)
        ? prev.selectedYearLevels.filter((y) => y !== year)
        : [...prev.selectedYearLevels, year],
    }));
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setFilters((prev) => ({ ...prev, sortOption: option }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedBusinessTypes: [],
      positionsFilter: '',
      selectedEmploymentTypes: [],
      selectedYearLevels: [],
      sortOption: 'name-asc',
    });
  }, []);

  const handleSelectCompany = useCallback((company: Company, index: number) => {
    setActiveCompany(company);
    setActiveListIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveCompany(null);
  }, []);

  const handleKeyboardNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (activeCompany) return; // Don't navigate if modal is open

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveListIndex((prev) =>
            prev < sortedCompanies.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveListIndex((prev) =>
            prev > 0 ? prev - 1 : sortedCompanies.length - 1
          );
          break;
        case 'Home':
          e.preventDefault();
          setActiveListIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveListIndex(sortedCompanies.length - 1);
          break;
        case 'Enter':
          if (sortedCompanies[activeListIndex]) {
            e.preventDefault();
            setActiveCompany(sortedCompanies[activeListIndex]);
          }
          break;
      }
    },
    [activeCompany, sortedCompanies, activeListIndex]
  );

  return (
    <>
      <Head>
        <title>Browse Companies | KU Computer Engineering Job Fair 2025</title>
        <meta name="description" content="Browse and filter participating companies at the KU Computer Engineering Job Fair 2025. Find your ideal job opportunity." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white" onKeyDown={handleKeyboardNavigation} tabIndex={0}>
        {/* Header */}
        <header className="bg-gradient-to-r from-ku-pine to-ku-pine-dark shadow-lg sticky top-0 z-20">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
            <div className="flex items-center justify-between">
              {/* Back to Home Button */}
              <Link href="/" className="flex items-center gap-2 text-white hover:text-ku-fresh transition-colors group">
                <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-semibold">Home</span>
              </Link>
              
              {/* Title */}
              <div className="text-center flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  KU Computer Engineering Job Fair
                </h1>
                <p className="text-ku-fresh text-sm md:text-base font-medium">2025</p>
              </div>
              
              {/* Spacer for balance */}
              <div className="w-[100px]"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
          {/* Search and Filters Row */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-4xl mx-auto">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <input
                  type="text"
                  placeholder="Search by company, position, skill..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine text-gray-800 placeholder:text-gray-400 text-base shadow-sm hover:border-gray-300 transition-colors"
                />
                
                {filters.searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-ku-pine transition-colors"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Inline Filters */}
            <div className="flex flex-wrap items-center gap-4 justify-center">
              {/* Business Type Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-10 py-2.5 hover:border-ku-pine focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine cursor-pointer min-w-[180px] shadow-sm"
                  value=""
                  onChange={(e) => e.target.value && handleBusinessTypeChange(e.target.value)}
                >
                  <option value="">Business Type</option>
                  {uniqueBusinessTypes.map((type) => (
                    <option key={type} value={type}>{type.substring(0, 30)}</option>
                  ))}
                </select>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ku-pine pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Positions Filter */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Positions"
                  value={filters.positionsFilter}
                  onChange={(e) => handlePositionsFilterChange(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-4 py-2.5 hover:border-ku-pine focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine min-w-[180px] shadow-sm"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ku-pine pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Employment Type Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-10 py-2.5 hover:border-ku-pine focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine cursor-pointer min-w-[180px] shadow-sm"
                  value=""
                  onChange={(e) => e.target.value && handleEmploymentTypeChange(e.target.value)}
                >
                  <option value="">Employment Type</option>
                  <option value="เต็มเวลา">Full-time</option>
                  <option value="ไม่เต็มเวลา">Part-time</option>
                  <option value="ฝึกงาน">Internship</option>
                </select>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ku-pine pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Year Level Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-10 py-2.5 hover:border-ku-pine focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine cursor-pointer min-w-[180px] shadow-sm"
                  value=""
                  onChange={(e) => e.target.value && handleYearLevelChange(Number(e.target.value))}
                >
                  <option value="">Year Level</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                </select>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ku-pine pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sortOption}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-10 py-2.5 hover:border-ku-pine focus:outline-none focus:ring-2 focus:ring-ku-pine focus:border-ku-pine cursor-pointer min-w-[220px] shadow-sm"
                >
                  <option value="name-asc">Time (Earliest First)</option>
                  <option value="name-desc">Company Name (A → Z)</option>
                  <option value="time-earliest">Company Name (Z → A)</option>
                  <option value="time-latest">Time (Latest First)</option>
                </select>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ku-pine pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.selectedBusinessTypes.length > 0 || filters.selectedEmploymentTypes.length > 0 || filters.selectedYearLevels.length > 0) && (
              <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
                {filters.selectedBusinessTypes.map((type) => (
                  <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ku-pine text-white text-xs rounded-lg shadow-sm">
                    {type.substring(0, 20)}
                    <button onClick={() => handleBusinessTypeChange(type)} className="hover:text-ku-fresh transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {filters.selectedEmploymentTypes.map((type) => (
                  <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ku-pine text-white text-xs rounded-lg shadow-sm">
                    {type}
                    <button onClick={() => handleEmploymentTypeChange(type)} className="hover:text-ku-fresh transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {filters.selectedYearLevels.map((year) => (
                  <span key={year} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ku-pine text-white text-xs rounded-lg shadow-sm">
                    Year {year}
                    <button onClick={() => handleYearLevelChange(year)} className="hover:text-ku-fresh transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <button onClick={handleClearFilters} className="text-xs text-ku-pine hover:text-ku-pine-dark transition-colors underline font-semibold">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Company List */}
          {sortedCompanies.length > 0 ? (
            <CompanyList
              companies={sortedCompanies}
              activeIndex={activeListIndex}
              onSelectCompany={(company, index) => handleSelectCompany(company, index)}
              onKeyDown={handleKeyboardNavigation}
            />
          ) : (
            <section aria-label="No Results">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-16 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xl font-semibold text-gray-800 mb-2">No companies found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-ku-pine hover:bg-ku-pine-dark text-white font-medium rounded-lg transition-all duration-150 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            </section>
          )}
        </main>

        {/* Modal */}
        <CompanyModal company={activeCompany} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<CompaniesPageProps> = async () => {
  try {
    const csvPath = path.join(process.cwd(), 'data/companies.csv');
    const csvText = fs.readFileSync(csvPath, 'utf-8');
    const companies = parseCompaniesCsv(csvText);

    return {
      props: {
        companies,
      },
    };
  } catch (error) {
    console.error('Error loading companies data:', error);
    return {
      props: {
        companies: [],
      },
    };
  }
};
