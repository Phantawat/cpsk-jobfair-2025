import { parse } from 'csv-parse/sync';
import { Company, RawCompanyData } from '@/types/company';

/**
 * Whitelist of allowed CSV columns mapping Thai names to English fields
 * This ensures we only process company information and exclude contact details
 */
const COLUMN_MAPPING: Record<string, string> = {
  // Thai column names -> English field names (for raw Thai CSV)
  'ชื่อสถานประกอบการ': 'company_name',
  'ลักษณะงานที่สถานประกอบการทำ': 'business_type',
  'สถานประกอบการของท่านสะดวกเข้าร่วมกิจกรรมได้ตลอดทั้งวันหรือไม่': 'participation_time',
  'ตำแหน่งงานที่ต้องการรับ': 'positions',
  'ทักษะ/ความสามารถที่ต้องการ': 'skills',
  'ท่านต้องการรับพนักงานกลุ่มใด': 'employment_type',
  'หากท่านรับนิสิตฝึกงาน ต้องการรับนิสิตชั้นปีที่เท่าใดขึ้นไป': 'year_levels',
  'logo': 'logo',

  // English column names (for pre-transformed CSV)
  'name': 'company_name',
  'businessType': 'business_type',
  'participationTime': 'participation_time',
  'positions': 'positions',
  'skills': 'skills',
  'employmentTypes': 'employment_type',
  'yearLevels': 'year_levels',
};

// Columns to exclude (contact information and metadata)
const EXCLUDED_PATTERNS = [
  'email',
  'phone',
  'telephone',
  'contact',
  'address',
  'location',
  'ที่อยู่',
  'อีเมล',
  'เบอร์โทร',
  'ติดต่อ',
  'ชื่อ-นามสกุล',
  'ผู้ประสานงาน',
  'coordinator',
  'timestamp',
  'เวลา',
  'วันที่',
];

/**
 * Helper: Normalize a single text item
 * - Removes extra whitespace
 * - Normalizes line breaks
 * - Removes leading dashes/bullets
 */
function normalizeTextItem(item: string): string {
  return item
    .replace(/\n+/g, ' ') // Replace line breaks with spaces
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .replace(/^[-•\s]+/, '') // Remove leading dashes, bullets, spaces
    .replace(/[-•\s]+$/, '') // Remove trailing dashes, bullets, spaces
    .trim();
}

/**
 * Helper: Split and normalize array fields
 * - Splits by comma, semicolon, or newline
 * - Trims whitespace and normalizes format
 * - Removes empty values and duplicates
 * - Removes leading dashes/bullets
 */
export function splitAndNormalize(value: string | undefined): string[] {
  if (!value || typeof value !== 'string') return [];

  return (
    value
      .split(/[,;\n]/)
      .map((item) => normalizeTextItem(item))
      .filter((item) => item.length > 0)
      // Deduplicate case-insensitively
      .reduce((acc: string[], item) => {
        const lowerItem = item.toLowerCase();
        if (!acc.some((existing) => existing.toLowerCase() === lowerItem)) {
          acc.push(item);
        }
        return acc;
      }, [])
  );
}

/**
 * Helper: Parse year levels from text
 * Handles formats like: "2; 3; 4", "Year 2; Year 3; Year 4", "2,3,4", etc.
 */
export function parseYearLevels(value: string | undefined): number[] {
  if (!value || typeof value !== 'string') return [];

  // Extract all numbers from the text
  const numbers = value.match(/\d+/g) || [];
  const years = new Set<number>();

  numbers.forEach((num) => {
    const year = parseInt(num, 10);
    if (year >= 1 && year <= 4) {
      years.add(year);
    }
  });

  // Return sorted unique array (don't fill in ranges)
  return Array.from(years).sort((a, b) => a - b);
}

/**
 * Helper: Parse participation time to minutes from midnight
 * Handles formats: "HH:mm", "H:mm", "HH.mm", "HH:mm - HH:mm", etc.
 * Returns Infinity if parsing fails (will appear at end of sorted list)
 */
export function parseParticipationTime(value: string | undefined): number {
  if (!value || typeof value !== 'string') return Infinity;

  // Match first time token: HH:mm, H:mm, HH.mm, etc.
  const timeMatch = value.match(/(\d{1,2})[:.](\d{2})/);
  if (!timeMatch) return Infinity;

  try {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);

    // Validate time
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return Infinity;
    }

    return hours * 60 + minutes;
  } catch {
    return Infinity;
  }
}

/**
 * Helper: Create normalized search text
 * Concatenates and lowercases all searchable fields
 */
export function createSearchText(
  name: string,
  businessType: string,
  positions: string[],
  skills: string[]
): string {
  const parts = [
    name,
    businessType,
    positions.join(' '),
    skills.join(' '),
  ];

  return parts
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .trim();
}

/**
 * Helper: Check if column should be excluded
 */
function isExcludedColumn(columnName: string): boolean {
  const lowerName = columnName.toLowerCase();
  return EXCLUDED_PATTERNS.some((pattern) =>
    lowerName.includes(pattern.toLowerCase())
  );
}

/**
 * Helper: Transform raw CSV data to Company object
 */
function transformRowToCompany(rawData: RawCompanyData): Company | null {
  // Normalize column names
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(rawData)) {
    const mappedKey = COLUMN_MAPPING[key] || key;
    if (!isExcludedColumn(mappedKey)) {
      normalized[mappedKey] = value;
    }
  }

  // Extract required fields
  const name = (normalized.company_name || '').trim();
  const businessType = (normalized.business_type || '').trim();
  const participationTime = (normalized.participation_time || '').trim();

  // Validate required fields
  if (!name || !businessType) {
    return null; // Skip rows with missing required data
  }

  const positions = splitAndNormalize(normalized.positions);
  const skills = splitAndNormalize(normalized.skills);
  const employmentTypes = splitAndNormalize(normalized.employment_type);
  const yearLevels = parseYearLevels(normalized.year_levels);

  const startMinutes = parseParticipationTime(participationTime);

  const searchText = createSearchText(name, businessType, positions, skills);

  return {
    name,
    businessType,
    participationTime,
    positions,
    skills,
    employmentTypes,
    yearLevels,
    logo: normalized.logo && normalized.logo.trim() ? normalized.logo.trim() : null,
    startMinutes,
    searchText,
  };
}

/**
 * Main parser: Convert CSV text to Company array
 * @param csvText Raw CSV file content as string
 * @returns Array of parsed Company objects
 */
export function parseCompaniesCsv(csvText: string): Company[] {
  if (!csvText || typeof csvText !== 'string') {
    console.warn('CSV text is empty or invalid');
    return [];
  }

  try {
    // Parse CSV with proper options
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true, // Handle BOM if present
    }) as RawCompanyData[];

    const companies: Company[] = [];
    const warnings: string[] = [];

    records.forEach((row, index) => {
      // Check for unexpected columns (excluding mapped ones and excluded ones)
      const rowKeys = Object.keys(row);
      const unexpectedKeys = rowKeys.filter(
        (key) =>
          !COLUMN_MAPPING[key] &&
          !isExcludedColumn(key) &&
          (row[key] || '') !== ''
      );

      if (unexpectedKeys.length > 0 && index === 0) {
        warnings.push(`Unexpected columns found: ${unexpectedKeys.join(', ')}`);
      }

      const company = transformRowToCompany(row);
      if (company) {
        companies.push(company);
      }
    });

    if (warnings.length > 0) {
      console.warn('CSV parsing warnings:', warnings.join('\n'));
    }

    console.log(`Parsed ${companies.length} companies from CSV`);
    return companies;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}
