import { Company, SortOption, FilterState } from "@/types/company";

/**
 * Filter companies based on all filters (AND logic)
 */
export function filterCompanies(
  companies: Company[],
  filters: FilterState,
): Company[] {
  return companies.filter((company) => {
    // Search filter - check searchText field
    if (
      filters.searchQuery &&
      !company.searchText.includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Positions filter
    if (filters.positionsFilter) {
      if (
        !company.positions.some((pos) =>
          pos.toLowerCase().includes(filters.positionsFilter.toLowerCase()),
        )
      ) {
        return false;
      }
    }

    // Employment types filter (OR within employment types)
    if (filters.selectedEmploymentTypes.length > 0) {
      if (
        !company.employmentTypes.some((type) =>
          filters.selectedEmploymentTypes.some((selected) =>
            type.toLowerCase().includes(selected.toLowerCase()),
          ),
        )
      ) {
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

/**
 * Sort companies based on selected sort option
 */
export function sortCompanies(
  companies: Company[],
  sortOption: SortOption,
): Company[] {
  const collator = new Intl.Collator(["th", "en"]);
  const sorted = [...companies];

  switch (sortOption) {
    case "name-asc":
      sorted.sort((a, b) => collator.compare(a.name, b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => collator.compare(b.name, a.name));
      break;
    case "time-earliest":
      sorted.sort((a, b) => a.startMinutes - b.startMinutes);
      break;
    case "time-latest":
      sorted.sort((a, b) => b.startMinutes - a.startMinutes);
      break;
  }

  return sorted;
}

/**
 * Extract unique values from array field
 */
export function extractUniqueValues<T>(
  companies: Company[],
  field: keyof Company,
): T[] {
  const values = new Set<T>();

  companies.forEach((company) => {
    const fieldValue = company[field];
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((value) => values.add(value as T));
    }
  });

  return Array.from(values);
}
