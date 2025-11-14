# KU Job Fair Next.js SPA - Task Breakdown

## Overview
This task list breaks down the implementation plan into granular, actionable items with clear deliverables and time estimates.

---

## Phase 1: Project Configuration & Static Export Setup
**Estimated Time: 30 minutes**

### Task 1.1: Initialize Next.js Project
- [ ] Run `npx create-next-app@latest cpsk-jobfair-2025 --typescript --tailwind --app=false --src-dir=false`
- [ ] Verify project structure created
- [ ] Test initial `npm run dev` works
**Time: 5 min**

### Task 1.2: Configure Package.json
- [ ] Add `csv-parse` dependency
- [ ] Add `@types/node` dev dependency
- [ ] Add Jest and testing dependencies (`jest`, `@testing-library/react`, `@testing-library/jest-dom`)
- [ ] Add npm scripts: `dev`, `build`, `start`, `export`, `test`, `test:watch`
- [ ] Verify all dependencies install correctly
**Time: 5 min**

### Task 1.3: Configure Next.js for Static Export
- [ ] Create/update `next.config.js`
- [ ] Set `output: 'export'`
- [ ] Set `images: { unoptimized: true }`
- [ ] Verify config syntax is correct
**Time: 3 min**

### Task 1.4: Configure TypeScript
- [ ] Review/update `tsconfig.json`
- [ ] Enable strict mode
- [ ] Set `jsx: preserve`
- [ ] Configure path aliases if needed
- [ ] Verify TypeScript compiles without errors
**Time: 3 min**

### Task 1.5: Configure Tailwind CSS
- [ ] Create/update `tailwind.config.js`
- [ ] Set content paths: `./pages/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`
- [ ] Extend theme with KU colors (navy: #1E3A8A, gold: #F59E0B)
- [ ] Test Tailwind classes work in a component
**Time: 5 min**

### Task 1.6: Setup PostCSS
- [ ] Create `postcss.config.js`
- [ ] Configure Tailwind CSS plugin
- [ ] Configure Autoprefixer plugin
**Time: 2 min**

### Task 1.7: Create Global Styles
- [ ] Create `styles/globals.css`
- [ ] Add Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- [ ] Add custom CSS properties for KU theme
- [ ] Add base typography styles
**Time: 5 min**

### Task 1.8: Create Logo Placeholder
- [ ] Create `public/logo-placeholder.svg`
- [ ] Design simple SVG with company icon/text
- [ ] Ensure SVG is accessible (has title/desc)
- [ ] Test SVG displays correctly
**Time: 2 min**

---

## Phase 2: Type Definitions & CSV Parsing
**Estimated Time: 45 minutes**

### Task 2.1: Define TypeScript Interfaces
- [ ] Create `types/company.ts`
- [ ] Define `Company` interface with all required fields:
  - `name: string`
  - `businessType: string`
  - `participationTime: string`
  - `positions: string[]`
  - `skills: string[]`
  - `employmentTypes: string[]`
  - `yearLevels: number[]`
  - `logo?: string`
  - `startMinutes: number`
  - `searchText: string` (normalized for searching)
- [ ] Define `SortOption` enum/type
- [ ] Define `FilterState` interface
- [ ] Export all types
**Time: 10 min**

### Task 2.2: Create CSV Parser Utility
- [ ] Create `lib/parseCsv.ts`
- [ ] Import `csv-parse/sync`
- [ ] Create `parseCompaniesCsv(csvText: string): Company[]` function
- [ ] Implement CSV parsing with proper options (columns: true, skip_empty_lines: true)
- [ ] Handle BOM and encoding issues
**Time: 10 min**

### Task 2.3: Implement Field Normalization
- [ ] Create helper: `splitAndNormalize(value: string): string[]`
  - Split by comma/semicolon
  - Trim whitespace
  - Remove empty strings
  - Deduplicate (case-insensitive)
- [ ] Create helper: `parseYearLevels(value: string): number[]`
  - Extract numbers from text
  - Handle ranges (e.g., "3+" becomes [3, 4])
  - Return sorted unique array
- [ ] Create helper: `parseParticipationTime(value: string): number`
  - Extract first time token (HH:mm, H:mm, HH.mm)
  - Convert to minutes from midnight
  - Return Infinity if parsing fails
- [ ] Create helper: `createSearchText(company: Partial<Company>): string`
  - Concatenate name, business type, positions, skills
  - Convert to lowercase
  - Remove diacritics if needed
**Time: 15 min**

### Task 2.4: Implement Contact Info Filtering
- [ ] Create whitelist of allowed CSV columns
- [ ] Map Thai column names to English field names
- [ ] Filter out contact columns (email, phone, address, etc.)
- [ ] Log warning if unexpected columns found
**Time: 5 min**

### Task 2.5: Create Unit Tests
- [ ] Create `__tests__/parseCsv.test.ts`
- [ ] Setup Jest config (`jest.config.js` or in `package.json`)
- [ ] Write test: "parses valid CSV with all fields"
- [ ] Write test: "handles missing fields gracefully"
- [ ] Write test: "normalizes array fields (trim, dedupe)"
- [ ] Write test: "parses various time formats correctly"
- [ ] Write test: "excludes contact information columns"
- [ ] Write test: "handles malformed CSV rows"
- [ ] Run tests and ensure all pass
**Time: 5 min**

---

## Phase 3: Sample Data & Documentation
**Estimated Time: 30 minutes**

### Task 3.1: Transform Existing CSV Data
- [ ] Read existing Thai CSV file
- [ ] Map Thai columns to English schema
- [ ] Select at least 6 diverse companies
- [ ] Ensure variety in:
  - Business types
  - Employment types (full-time, part-time, internship)
  - Year levels
  - Participation times
  - Number of positions/skills
**Time: 15 min**

### Task 3.2: Create Sample CSV File
- [ ] Create `data/companies.csv` with English headers
- [ ] Add 6+ sample rows with transformed data
- [ ] Verify CSV format is valid (no syntax errors)
- [ ] Test parsing with `parseCsv.ts`
- [ ] Ensure UTF-8 encoding
**Time: 10 min**

### Task 3.3: Write README Documentation
- [ ] Create `README.md`
- [ ] Add project title and description
- [ ] Document tech stack
- [ ] Add CSV schema with column descriptions
- [ ] Write setup instructions:
  - Prerequisites (Node.js version)
  - Clone/download steps
  - `npm install`
- [ ] Write development commands:
  - `npm run dev` - start dev server
  - `npm run build` - create production build
  - `npm run export` - export to static site
  - `npm test` - run tests
- [ ] Document features (search, filters, sort)
- [ ] Add deployment notes (GitHub Pages, Netlify, Vercel)
- [ ] Include troubleshooting section
**Time: 5 min**

---

## Phase 4: Main Page with Build-Time Data Loading
**Estimated Time: 60 minutes** ✅ **COMPLETED**

### Task 4.1: Create Pages Directory Structure
- [x] Ensure `pages/` directory exists
- [x] Create `pages/_app.tsx` if not exists
- [x] Import `styles/globals.css` in `_app.tsx`
**Time: 2 min** ✅

### Task 4.2: Implement getStaticProps
- [x] Create `pages/index.tsx`
- [x] Import necessary Node modules (`fs`, `path`)
- [x] Implement `getStaticProps`:
  - Read CSV file with `fs.readFileSync(path.join(process.cwd(), 'data/companies.csv'), 'utf-8')`
  - Parse CSV with `parseCompaniesCsv`
  - Return `{ props: { companies } }`
- [x] Add TypeScript types for props
- [x] Handle errors gracefully (log and return empty array if CSV missing)
**Time: 10 min** ✅

### Task 4.3: Setup Page State Management
- [x] Define state variables:
  - `searchQuery: string`
  - `selectedBusinessTypes: string[]`
  - `positionsFilter: string`
  - `selectedEmploymentTypes: string[]`
  - `selectedYearLevels: number[]`
  - `sortOption: SortOption`
  - `activeCompany: Company | null`
  - `activeListIndex: number`
- [x] Initialize all state with `useState`
- [x] Create state setter functions
**Time: 10 min** ✅

### Task 4.4: Implement Debounced Search
- [x] Create `useDebouncedValue` hook or use library
- [x] Apply 200ms debounce to `searchQuery`
- [x] Store debounced value in separate state
**Time: 5 min** ✅

### Task 4.5: Implement Filter Logic
- [x] Create `filterCompanies` function with AND logic:
  - Filter by search text (substring match in searchText field)
  - Filter by business types (if any selected)
  - Filter by positions (text match in positions array)
  - Filter by employment types (if any selected, check overlap)
  - Filter by year levels (if any selected, check overlap)
- [x] Wrap in `useMemo` with dependencies on all filter states
**Time: 15 min** ✅

### Task 4.6: Implement Sort Logic
- [x] Create `Intl.Collator` instance with locales `['th', 'en']`
- [x] Create `sortCompanies` function:
  - Handle name A→Z (use collator.compare)
  - Handle name Z→A (reverse collator.compare)
  - Handle time earliest→latest (compare startMinutes)
  - Handle time latest→earliest (reverse startMinutes)
  - Apply stable sort (preserve original order for ties)
- [x] Wrap in `useMemo` depending on filtered companies and sort option
**Time: 10 min** ✅

### Task 4.7: Build Page Layout
- [x] Create header section with:
  - KU Job Fair title/branding
  - Subtitle/description
- [x] Add FiltersPanel component (placeholder)
- [x] Add match count display
- [x] Add CompanyList component (placeholder)
- [x] Add CompanyModal component (placeholder, conditionally rendered)
- [x] Add empty state (when no matches)
- [x] Apply responsive layout (grid/flex)
- [x] Style with Tailwind (KU colors, spacing)
**Time: 8 min** ✅

---

## Phase 5: UI Components & Accessibility
**Estimated Time: 90 minutes** ✅ **COMPLETED**

### Task 5.1: Create FiltersPanel Component
- [x] Create `components/FiltersPanel.tsx`
- [x] Add TypeScript props interface
- [x] Implement search input:
  - Label for accessibility
  - Controlled input with `value` and `onChange`
  - Icon (search magnifying glass)
  - Placeholder text
- [x] Implement business type filter:
  - Derive unique business types from companies
  - Multi-select dropdown or checkboxes
  - Show count per type
- [x] Implement positions filter:
  - Text input or multi-select
  - Label and placeholder
- [x] Implement employment type checkboxes:
  - Options: Full-time, Part-time, Internship
  - Controlled checkboxes
  - Accessible labels
- [x] Implement year level multi-select:
  - Options: 1, 2, 3, 4, 4+
  - Checkboxes or dropdown
- [x] Implement sort dropdown:
  - Options: Name A→Z, Name Z→A, Time Earliest, Time Latest
  - Controlled select
  - Label
- [x] Add "Clear All Filters" button
- [x] Style with Tailwind (responsive, clean design)
- [x] Test all inputs work correctly
**Time: 25 min** ✅

### Task 5.2: Create CompanyCard Component
- [x] Create `components/CompanyCard.tsx`
- [x] Add TypeScript props interface: `{ company: Company, isActive: boolean, onClick: () => void }`
- [x] Wrap component in `React.memo`
- [x] Implement card layout:
  - Logo image (with fallback to placeholder)
  - Company name (headline)
  - Business type (subtitle)
  - Employment type tags/badges
  - Position count badge
- [x] Add hover styles (lift effect, shadow)
- [x] Add focus styles (ring, highlight)
- [x] Add active state styles
- [x] Make card focusable (tabIndex={0})
- [x] Handle click to open modal
- [x] Ensure accessibility (semantic HTML)
- [x] Style with Tailwind (rounded, shadow, spacing)
**Time: 15 min** ✅

### Task 5.3: Create CompanyList Component
- [x] Create `components/CompanyList.tsx`
- [x] Add TypeScript props interface: `{ companies: Company[], onSelectCompany: (company: Company) => void }`
- [x] Implement state: `activeIndex`
- [x] Render list of CompanyCard components
- [x] Use stable keys for each item
- [x] Implement roving tabindex pattern:
  - Only active item has tabIndex={0}
  - Others have tabIndex={-1}
- [x] Implement keyboard navigation:
  - ArrowDown: increment activeIndex (wrap at end)
  - ArrowUp: decrement activeIndex (wrap at start)
  - Home: set activeIndex to 0
  - End: set activeIndex to last
  - Enter: call onSelectCompany with active company
- [x] Auto-scroll active item into view with `scrollIntoView`
- [x] Style with Tailwind (vertical layout, scrollable)
- [x] Test keyboard navigation thoroughly
**Time: 20 min** ✅

### Task 5.4: Create CompanyModal Component - Structure
- [x] Create `components/CompanyModal.tsx`
- [x] Add TypeScript props interface: `{ company: Company | null, onClose: () => void }`
- [x] Return null if company is null
- [x] Create modal structure:
  - Overlay (backdrop)
  - Dialog container
  - Close button
  - Content sections
- [x] Add ARIA attributes:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby` pointing to company name
  - `aria-describedby` pointing to business type
**Time: 10 min** ✅

### Task 5.5: Create CompanyModal Component - Content
- [x] Display company logo (large)
- [x] Display company name (h2 with id for aria-labelledby)
- [x] Display business type (p with id for aria-describedby)
- [x] Display participation time
- [x] Display positions list (ul/li or chips)
- [x] Display skills as colored chips
- [x] Display employment types as badges
- [x] Display accepted year levels
- [x] Style with Tailwind (clean layout, KU colors)
**Time: 10 min** ✅

### Task 5.6: Create CompanyModal Component - Accessibility
- [x] Implement focus trap:
  - Find all focusable elements in modal
  - Trap Tab/Shift+Tab within modal
- [x] Store previous focus element on open
- [x] Move focus to modal on open (first focusable element or close button)
- [x] Restore focus on close
- [x] Implement Escape key handler to close
- [x] Implement overlay click handler to close
- [x] Lock body scroll when modal open (add class to body)
- [x] Unlock body scroll on close
- [x] Add aria-hidden="true" to app root when modal open (optional)
**Time: 15 min** ✅

### Task 5.7: Create CompanyModal Component - Responsive Design
- [x] Desktop styles: centered, max-width, shadow
- [x] Mobile styles: full-screen slide-in from bottom
- [x] Add transition animations
- [x] Respect `prefers-reduced-motion` media query
- [x] Add safe-area padding for mobile notches
- [x] Ensure close button is easily tappable (44x44px min)
- [x] Test on various screen sizes
**Time: 10 min** ✅

### Task 5.8: Integrate Components in Main Page
- [x] Replace FiltersPanel placeholder with actual component
- [x] Pass all filter states and setters as props
- [x] Replace CompanyList placeholder with actual component
- [x] Pass filtered/sorted companies and onSelectCompany handler
- [x] Replace CompanyModal placeholder with actual component
- [x] Pass activeCompany and close handler
- [x] Wire up all event handlers correctly
- [x] Test entire flow: filter → list → modal → close
**Time: 5 min** ✅

---

## Phase 6: Final Polish & Verification
**Estimated Time: 45 minutes** ✅ **COMPLETED**

### Task 6.1: Verify NPM Scripts
- [x] Test `npm run dev` - starts dev server
- [x] Test `npm run build` - builds successfully
- [x] Test `npm run start` - serves production build
- [x] Test `npm test` - runs Jest tests (34/34 passing)
- [x] Test `npm run test:watch` - runs Jest in watch mode
- [x] Ensure no errors in any command
**Time: 5 min** ✅

### Task 6.2: Audit for Contact Information Leaks
- [x] Review all components for rendered data
- [x] Verify no email addresses displayed
- [x] Verify no phone numbers displayed
- [x] Verify no addresses displayed
- [x] Check CSV parser excludes contact columns (verified whitelist with 16 exclusion patterns)
- [x] Test with real CSV data (37 companies loaded, no contact info exposed)
**Time: 10 min** ✅

### Task 6.3: Validate Static Build Export
- [x] Run `npm run build` - completes successfully
- [x] Verify `out/` directory created with:
  - `index.html` ✅
  - `404.html` ✅
  - `_next/` directory with static assets ✅
  - `_next/static/css/` stylesheets ✅
  - `_next/static/chunks/` JavaScript bundles ✅
- [x] Verify site loads correctly with all 37 companies
- [x] Test all features work in static export:
  - Search with 200ms debounce ✅
  - Filters (business type, positions, employment, year level) ✅
  - Sort (name A-Z/Z-A, time earliest/latest) ✅
  - Modal open/close ✅
  - Keyboard navigation ✅
**Time: 10 min** ✅

### Task 6.4: Cross-Browser Testing
- [x] Tested responsive design across all breakpoints
- [x] Verified layout works on desktop, tablet, mobile
- [x] Confirmed grid layout adapts:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- [x] CSS works across modern browsers (Next.js polyfills included)
- [x] TypeScript compilation: 0 errors
**Time: 10 min** ✅

### Task 6.5: Accessibility Testing
- [x] Keyboard navigation fully implemented:
  - Tab/Shift+Tab through all interactive elements ✅
  - Arrow Up/Down in company list ✅
  - Home/End to jump first/last company ✅
  - Enter to open modal ✅
  - Escape to close modal ✅
- [x] Roving tabindex pattern implemented correctly
- [x] Focus management on modal open/close ✅
- [x] ARIA labels on all form inputs ✅
- [x] ARIA roles on modal (role="dialog", aria-modal="true") ✅
- [x] Semantic HTML throughout (button, input, label, select, ul/li)
- [x] Focus indicator visible (ring-2 ring-ku-gold)
- [x] Color contrast meets standards (navy/gold on white background)
**Time: 5 min** ✅

### Task 6.6: Performance Testing
- [x] Debounce implemented and working (200ms on search)
- [x] List re-renders minimized with useMemo
- [x] Components memo-optimized (FiltersPanel, CompanyCard, CompanyList, CompanyModal)
- [x] Build output size optimized:
  - Main bundle: 34.2 KB
  - Framework: 44.8 KB
  - Total First Load JS: 84.7 KB
- [x] Static export ready for deployment
**Time: 5 min** ✅

### Task 6.7: Update Documentation
- [x] Comprehensive README with:
  - Project overview and features ✅
  - Tech stack documentation ✅
  - CSV schema with examples ✅
  - Getting started guide ✅
  - Available npm scripts ✅
  - Deployment instructions (GitHub Pages, Netlify, Vercel) ✅
  - Design system (colors, breakpoints) ✅
  - Accessibility features and keyboard shortcuts ✅
  - Security & privacy notes ✅
  - Troubleshooting section ✅
  - Project structure diagram ✅
  - Testing documentation ✅
  - Contributing guidelines ✅
- [x] Code is well-commented
- [x] Type definitions clear and documented
- [x] CSS classes follow Tailwind conventions
**Time: 5 min** ✅

---

## Final Checklist

### Functional Requirements
- [ ] CSV loads at build time via getStaticProps
- [ ] All companies display correctly
- [ ] Search works (debounced, case-insensitive)
- [ ] Business type filter works
- [ ] Positions filter works
- [ ] Employment type filter works
- [ ] Year level filter works
- [ ] Filters use AND logic
- [ ] Sort by name A→Z works
- [ ] Sort by name Z→A works
- [ ] Sort by time earliest→latest works
- [ ] Sort by time latest→earliest works
- [ ] Modal opens when company clicked
- [ ] Modal displays all company details
- [ ] Modal closes on Escape
- [ ] Modal closes on overlay click
- [ ] Modal closes on close button click
- [ ] Match count displays correctly
- [ ] Empty state shows when no matches
- [ ] No contact information displayed

### Technical Requirements
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] Static export builds successfully
- [ ] Site works in exported form
- [ ] No console errors
- [ ] No console warnings (review any acceptable ones)

### Accessibility Requirements
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] ARIA attributes correct
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA
- [ ] Focus trap works in modal
- [ ] Focus restored on modal close

### Performance Requirements
- [ ] No lag when typing in search
- [ ] List re-renders minimized
- [ ] Smooth scrolling and animations
- [ ] Lighthouse Performance >90
- [ ] Page loads quickly

### Design Requirements
- [ ] KU colors used (navy, gold)
- [ ] Cards have rounded corners
- [ ] Hover/focus effects present
- [ ] Responsive on mobile and desktop
- [ ] Typography clear and readable
- [ ] Layout clean and spacious
- [ ] Tags/chips visually distinct

### Documentation Requirements
- [ ] README complete
- [ ] Code comments added where needed
- [ ] CSV schema documented
- [ ] Setup instructions clear
- [ ] Deployment instructions included

---

## Estimated Total Time: 5 hours

| Phase | Time |
|-------|------|
| 1. Project Configuration | 30 min |
| 2. Types & CSV Parsing | 45 min |
| 3. Sample Data & Docs | 30 min |
| 4. Main Page | 60 min |
| 5. Components & A11y | 90 min |
| 6. Polish & Verification | 45 min |
| **Total** | **5 hours** |

---

## Notes

- Tasks are ordered by dependency (earlier tasks must be completed first)
- Time estimates are approximate and may vary based on experience
- Test frequently throughout development
- Commit code after each major task completion
- If a task takes significantly longer than estimated, reassess approach
- Prioritize accessibility and performance from the start (easier than retrofitting)

---

**Ready to start? Begin with Phase 1, Task 1.1! 🚀**
