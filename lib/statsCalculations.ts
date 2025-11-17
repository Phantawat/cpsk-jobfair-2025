import { Company } from "@/types/company";

export interface Stat {
  label: string;
  value: number;
  icon: JSX.Element;
  suffix?: string;
}

/**
 * Calculate statistics from companies data
 */
export function calculateStats(companies: Company[]): Omit<Stat, "icon">[] {
  const totalCompanies = companies.length;

  // Count unique positions
  const allPositions = companies.flatMap((c) => c.positions);
  const uniquePositions = new Set(allPositions).size;

  // Count unique employment types
  const allEmploymentTypes = companies.flatMap((c) => c.employmentTypes);
  const uniqueEmploymentTypes = new Set(allEmploymentTypes).size;

  // Count year levels offered
  const allYearLevels = companies.flatMap((c) => c.yearLevels);
  const uniqueYearLevels = new Set(allYearLevels).size;

  return [
    {
      label: "Companies",
      value: totalCompanies,
      suffix: "+",
    },
    {
      label: "Open Positions",
      value: uniquePositions,
      suffix: "+",
    },
    {
      label: "Employment Types",
      value: uniqueEmploymentTypes,
    },
    {
      label: "Year Levels",
      value: uniqueYearLevels,
    },
  ];
}

/**
 * Extract unique positions from all companies
 */
export function extractUniquePositions(companies: Company[]): string[] {
  const positions = new Set<string>();
  companies.forEach((company) => {
    company.positions.forEach((pos) => positions.add(pos));
  });
  return Array.from(positions).sort();
}

/**
 * Extract unique employment types from all companies
 */
export function extractUniqueEmploymentTypes(companies: Company[]): string[] {
  const types = new Set<string>();
  companies.forEach((company) => {
    company.employmentTypes.forEach((type) => types.add(type));
  });
  return Array.from(types).sort();
}

/**
 * Extract unique year levels from all companies
 */
export function extractUniqueYearLevels(companies: Company[]): number[] {
  const years = new Set<number>();
  companies.forEach((company) => {
    company.yearLevels.forEach((year) => years.add(year));
  });
  return Array.from(years).sort((a, b) => a - b);
}

/**
 * Get top N most common positions
 */
export function getTopPositions(
  companies: Company[],
  limit: number = 6,
): { position: string; count: number }[] {
  const positionCounts = new Map<string, number>();

  companies.forEach((company) => {
    company.positions.forEach((position) => {
      positionCounts.set(position, (positionCounts.get(position) || 0) + 1);
    });
  });

  return Array.from(positionCounts.entries())
    .map(([position, count]) => ({ position, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
