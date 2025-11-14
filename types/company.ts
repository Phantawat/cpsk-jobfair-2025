/**
 * Company interface representing a job fair participant company
 */
export interface Company {
  // Basic Information
  name: string;
  businessType: string;
  logo: string | null;

  // Recruitment Details
  participationTime: string; // e.g., "9:30 - 17:00"
  startMinutes: number; // Minutes from midnight for sorting
  positions: string[]; // e.g., ["Software Engineer", "Data Analyst"]
  skills: string[]; // Required skills
  employmentTypes: string[]; // e.g., ["full-time", "part-time", "internship"]
  yearLevels: number[]; // Accepted year levels: [2, 3, 4]

  // Search optimization
  searchText: string; // Normalized lowercase text for fast searching
}

/**
 * Sort options for company list
 */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'time-earliest'
  | 'time-latest';

/**
 * Filter state for the company list
 */
export interface FilterState {
  searchQuery: string;
  selectedBusinessTypes: string[];
  positionsFilter: string;
  selectedEmploymentTypes: string[];
  selectedYearLevels: number[];
  sortOption: SortOption;
}

/**
 * Raw CSV row data before transformation
 */
export interface RawCompanyData {
  [key: string]: string | undefined;
}

/**
 * Page props for the home page
 */
export interface HomePageProps {
  companies: Company[];
}
