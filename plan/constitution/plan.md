# KU Job Fair Next.js SPA - Implementation Plan

## Overview

A production-ready static single-page Next.js application with TypeScript and Tailwind CSS. The app loads company data from CSV at build time, provides powerful filter/sort/search capabilities, and displays company details in an accessible modal.

## Tech Stack

- **Framework**: Next.js (Pages Router) with TypeScript
- **Styling**: Tailwind CSS
- **CSV Parsing**: `csv-parse/sync` (Node build-time)
- **Export**: Static site (`output: 'export'`)
- **Testing**: Jest with `next/jest`
- **Accessibility**: ARIA-compliant modal, keyboard navigation

## Project Structure

```
cpsk-jobfair-2025/
├── data/
│   └── companies.csv              # Sample company data (≥6 rows)
├── pages/
│   └── index.tsx                  # Main page with getStaticProps
├── components/
│   ├── CompanyList.tsx            # List with keyboard navigation
│   ├── CompanyCard.tsx            # Individual company card (memoized)
│   ├── CompanyModal.tsx           # Accessible modal dialog
│   └── FiltersPanel.tsx           # Search/filter/sort controls
├── lib/
│   └── parseCsv.ts                # CSV parsing & normalization
├── types/
│   └── company.ts                 # TypeScript interfaces
├── styles/
│   └── globals.css                # Tailwind base + KU theme
├── public/
│   └── logo-placeholder.svg       # Default company logo
├── __tests__/
│   └── parseCsv.test.ts          # Unit tests for CSV parsing
├── package.json                   # Dependencies & scripts
├── next.config.js                 # Static export config
├── tailwind.config.js             # Tailwind customization
├── postcss.config.js              # PostCSS setup
├── tsconfig.json                  # TypeScript config
└── README.md                      # Setup & usage docs
```

## Implementation Steps

### 1. Project Configuration & Static Export Setup

**Files to create:**
- `package.json` - Dependencies: Next.js, React, TypeScript, Tailwind, csv-parse, Jest
- `next.config.js` - Configure `output: 'export'` and `images.unoptimized: true`
- `tsconfig.json` - Strict TypeScript with `jsx: preserve`
- `postcss.config.js` - Tailwind + Autoprefixer
- `tailwind.config.js` - Content paths, KU color theme (navy/blue + gold)
- `styles/globals.css` - Tailwind directives + custom properties
- `public/logo-placeholder.svg` - Simple SVG placeholder

**Key decisions:**
- Pages Router for stable `getStaticProps` support
- Static export ensures no runtime server needed
- Unoptimized images for export compatibility

### 2. Type Definitions & CSV Parsing

**Files to create:**
- `types/company.ts`
  - `Company` interface: name, businessType, participationTime, positions[], skills[], employmentTypes[], yearLevels[], logo?, startMinutes
  - Helper types for filters and sorting

- `lib/parseCsv.ts`
  - Use `csv-parse/sync` to parse CSV
  - Normalize fields:
    - Split comma-separated values (positions, skills, employment types, year levels)
    - Trim whitespace, deduplicate
    - Case-insensitive normalization for search
    - Parse participation time to `startMinutes` for sorting
    - Drop/ignore contact info columns (email, phone, addresses)
  - Export pure `parseCompaniesCsv(csvText: string): Company[]`

- `__tests__/parseCsv.test.ts`
  - Test CSV parsing with various formats
  - Verify normalization (trimming, arrays, deduplication)
  - Test time parsing (HH:mm, ranges, fallback to Infinity)
  - Ensure contact fields are excluded

**CSV Schema Mapping:**

Current Thai CSV → Target `companies.csv`:
- `ชื่อสถานประกอบการ` → `company_name`
- `ลักษณะงานที่สถานประกอบการทำ` → `business_type`
- `สถานประกอบการของท่านสะดวกเข้าร่วมกิจกรรมได้ตลอดทั้งวันหรือไม่` → `participation_time`
- `ตำแหน่งงานที่ต้องการรับ` → `positions`
- `ทักษะ/ความสามารถที่ต้องการ` → `skills`
- `ท่านต้องการรับพนักงานกลุ่มใด` → `employment_type`
- `หากท่านรับนิสิตฝึกงาน ต้องการรับนิสิตชั้นปีที่เท่าใดขึ้นไป` → `year_levels`
- (Ignore contact columns: email, phone, address, etc.)

### 3. Sample Data & Documentation

**Files to create:**
- `data/companies.csv`
  - Minimum 6 rows with varied data
  - Cover different business types, employment types, year levels
  - Include some with multiple positions/skills
  - Mix of full-time, part-time, internship combinations
  - Various participation times for sorting tests

- `README.md`
  - Project description
  - Tech stack overview
  - CSV schema documentation
  - Setup instructions (`npm install`)
  - Development commands (`npm run dev`)
  - Build & export process (`npm run build`, static output in `out/`)
  - Testing (`npm test`)
  - Deployment notes
  - Filter/search/sort feature explanations

### 4. Main Page with Build-Time Data Loading

**File to create:**
- `pages/index.tsx`
  
**Implementation details:**
- `getStaticProps`:
  - Read `data/companies.csv` using `fs.readFileSync(path.join(process.cwd(), 'data/companies.csv'))`
  - Parse with `lib/parseCsv.ts`
  - Return as props: `{ props: { companies } }`

- Page component state:
  - Search query (debounced 200ms)
  - Filter state: businessTypes[], positionsFilter (text), employmentTypes[], yearLevels[]
  - Sort option: enum/string
  - Active company for modal (or null)
  - Active list index for keyboard navigation

- Derived state (useMemo):
  - Filtered companies (AND logic across all filters)
  - Sorted companies (via Intl.Collator for names, startMinutes for time)
  - Match count

- Layout:
  - Header with KU Job Fair branding
  - FiltersPanel component
  - Match count display
  - CompanyList component
  - CompanyModal (conditionally rendered)
  - Empty state when no matches

### 5. UI Components & Accessibility

**Files to create:**

#### `components/FiltersPanel.tsx`
- Search input (text)
- Business type multi-select dropdown/checkboxes
- Position filter (text input or multi-select)
- Employment type checkboxes (full-time, part-time, internship)
- Year level multi-select (1, 2, 3, 4)
- Sort dropdown (name A→Z/Z→A, time earliest→latest/latest→earliest)
- Clear filters button
- Responsive layout (stack on mobile)

#### `components/CompanyList.tsx`
- Receives filtered/sorted companies array
- Renders CompanyCard for each company
- Implements roving tabindex pattern
- Keyboard navigation:
  - ArrowDown: next item
  - ArrowUp: previous item
  - Home: first item
  - End: last item
  - Enter: open modal for active item
- Maintains active index state
- Scrolls active item into view
- Props: companies[], onSelectCompany()

#### `components/CompanyCard.tsx`
- Wrapped in React.memo for performance
- Display:
  - Company logo (or placeholder)
  - Company name (headline)
  - Business type (subtitle)
  - Tags for employment types
  - Position count badge
- Hover/focus styles
- Click handler to open modal
- Accessible (focusable, clear focus ring)

#### `components/CompanyModal.tsx`
- ARIA attributes:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby` (company name)
  - `aria-describedby` (business type)
- Focus management:
  - Store previous focus on open
  - Move focus to modal
  - Trap focus (Tab cycling)
  - Restore focus on close
- Close mechanisms:
  - Escape key
  - Overlay click
  - Close button
- Display full company details:
  - Logo (large)
  - Company name
  - Business type
  - Participation time
  - List of positions
  - Required skills (as chips)
  - Employment types (as badges)
  - Accepted year levels
- Responsive:
  - Desktop: centered modal with overlay
  - Mobile: full-screen slide-in panel from bottom
- Respects `prefers-reduced-motion`
- Body scroll lock when open
- Safe area padding for mobile notches

### 6. Final Polish & Verification

**Tasks:**
- Add npm scripts in `package.json`:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `export`: `next build` (handles export via config)
  - `test`: `jest`
  - `test:watch`: `jest --watch`

- Ensure no contact information rendered:
  - Audit components for leaked fields
  - Verify CSV parser drops contact columns

- Sorting implementation:
  - Use `Intl.Collator` with locales `['th', 'en']` for proper Thai/English name sorting
  - Parse participation time to numeric minutes for reliable sorting
  - Stable sort (preserve original order for ties)

- Validate static build:
  - Run `npm run build`
  - Verify `out/` directory created
  - Test locally with `npx serve out`
  - Check all pages load without errors
  - Verify filters, search, sort work correctly

- Update README with:
  - Where to place CSV file
  - CSV column requirements
  - How to add company logos
  - Deployment tips (GitHub Pages, Netlify, Vercel)

## Key Features

### Search
- Single search box
- Searches across: company name, positions, skills, business type
- Case-insensitive substring matching
- 200ms debounced for performance
- Shows match count

### Filters (AND Logic)
1. **Business Type**: Multi-select from available types
2. **Positions**: Text filter or multi-select from available positions
3. **Employment Type**: Checkboxes for full-time, part-time, internship
4. **Year Levels**: Multi-select for years 1-4+

### Sorting Options
- Company name (A→Z)
- Company name (Z→A)
- Participation time (earliest→latest)
- Participation time (latest→earliest)
- Default: Company name A→Z

### UX Details
- Match count display
- Empty state with friendly message
- Clear all filters button
- Keyboard-accessible throughout
- Focus management
- Loading states (if needed)
- Smooth animations (respecting motion preferences)

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Focus indicators
- Screen reader friendly
- High contrast support
- Mobile touch targets (min 44x44px)

### Performance Optimizations
- Debounced search (200ms)
- Memoized filtered results
- React.memo on CompanyCard
- Stable keys for list items
- Avoid unnecessary re-renders
- Efficient event handlers
- (Optional) Virtual scrolling for large lists

## Design Guidelines

### KU Job Fair Visual Identity
- **Primary Colors**: Deep navy/blue (#1E3A8A or similar)
- **Accent Colors**: Gold/amber (#F59E0B or similar)
- **Typography**: Clean sans-serif (Inter, system fonts)
- **Layout**: Card-based with rounded corners
- **Shadows**: Subtle, layered depth
- **Spacing**: Generous whitespace
- **Tags/Chips**: Rounded, colorful, readable
- **Overall Feel**: Professional yet energetic, university event aesthetic

### Component Styling
- Cards: Rounded (8-12px), subtle shadow, hover lift effect
- Buttons: Solid for primary actions, outline for secondary
- Inputs: Clear borders, focus states, adequate padding
- Modal: Large on desktop, full-screen on mobile, smooth transitions
- Tags: Small rounded pills with varied colors per category
- Header: Bold branding with KU colors

## Testing Strategy

### Unit Tests (Jest)
- CSV parsing logic (`lib/parseCsv.ts`)
  - Valid CSV with all fields
  - Missing fields (empty arrays/strings)
  - Malformed data
  - Time parsing edge cases
  - Contact field exclusion
  - Array normalization (trim, dedupe)

### Manual Testing Checklist
- [ ] CSV loads at build time
- [ ] All companies display correctly
- [ ] Search filters as expected
- [ ] Each filter works independently
- [ ] Combined filters use AND logic
- [ ] Sort options work correctly
- [ ] Modal opens/closes properly
- [ ] Keyboard navigation works
- [ ] Escape closes modal
- [ ] Focus management correct
- [ ] Responsive on mobile
- [ ] No contact info displayed
- [ ] Empty state appears when no matches
- [ ] Performance acceptable (no lag on typing)
- [ ] Static export builds successfully
- [ ] Exported site works offline

## Edge Cases & Considerations

### Data Quality
- **Missing fields**: Handle gracefully with empty arrays/strings
- **Inconsistent formats**: Normalize during parsing
- **Duplicate companies**: Keep all or dedupe by name
- **Invalid time formats**: Fall back to unsortable (end of list)
- **Contact info leakage**: Whitelist only expected columns

### Parsing Challenges
- **Time formats**: Support HH:mm, H:mm, HH.mm, ranges, Thai characters
- **Array fields**: Handle commas, semicolons, mixed separators
- **Encoding**: Ensure UTF-8 support for Thai characters
- **Special characters**: Preserve in display, normalize for search
- **Empty/null values**: Convert to empty arrays/strings

### Performance
- **Large datasets**: Consider virtualization if >100 companies
- **Search latency**: 200ms debounce balances responsiveness and performance
- **Memory**: Memoization prevents recalculation on each render
- **Initial load**: Static site loads instantly

### Accessibility
- **Screen readers**: Test with NVDA/JAWS/VoiceOver
- **Keyboard only**: Verify all functionality accessible
- **Focus visible**: Ensure clear focus indicators
- **Color contrast**: Meet WCAG AA standards
- **Motion sensitivity**: Respect `prefers-reduced-motion`

### Browser Compatibility
- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Feature support**: Use standard APIs (avoid experimental features)
- **Polyfills**: Only if necessary for critical features

## Future Enhancements (Out of Scope)

- Advanced search (fuzzy matching, synonyms)
- Save filter preferences to localStorage
- Export filtered results to CSV
- Company comparison feature
- Favorites/bookmarking
- Analytics integration
- Internationalization (Thai/English toggle)
- Backend API integration
- Real-time data updates
- User authentication
- Application submission forms

## Success Criteria

✅ **Functional**
- Builds successfully with `npm run build`
- Exports to static site in `out/`
- CSV parsed correctly at build time
- All filters work with AND logic
- Search is debounced and responsive
- Sorting works for all options
- Modal opens/closes correctly
- Keyboard navigation functional

✅ **Performance**
- No lag when typing in search
- Smooth scrolling and animations
- Static site loads quickly
- Lighthouse score >90

✅ **Accessibility**
- Keyboard accessible throughout
- Screen reader friendly
- ARIA attributes correct
- Focus management proper
- WCAG AA compliant

✅ **Quality**
- TypeScript compiles without errors
- Tests pass
- No console errors
- Responsive on mobile and desktop
- Code is clean and documented

✅ **Security/Privacy**
- No contact information displayed
- No sensitive data in client bundle
- No external API calls (static only)

## Timeline Estimate

1. **Setup & Config** (30 min): Package.json, configs, Tailwind
2. **Types & Parsing** (45 min): Company types, CSV parser, tests
3. **Sample Data** (30 min): CSV with example rows, README
4. **Main Page** (60 min): getStaticProps, state, memoization
5. **Components** (90 min): Filters, List, Card, Modal
6. **Polish & Test** (45 min): Scripts, verification, fixes

**Total: ~5 hours**

---

*This plan ensures a production-ready, accessible, performant Next.js static site that meets all specified requirements.*
