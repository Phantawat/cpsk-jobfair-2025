# Two-Page Architecture Plan - CPSK Job Fair 2025

## Overview
Redesign from single-page to professional two-page experience with modern landing page and dedicated company listing page.

---

## Page Structure

### Page 1: Landing Page (`/` - index.tsx)
**Purpose**: Professional hero landing page with brand identity and call-to-action

**Sections**:
1. **Hero Section**
   - KU 80th Anniversary branding
   - Event title: "KU Computer Engineering Job Fair 2025"
   - Subtitle/tagline
   - Event date, time, location
   - Primary CTA button → "Explore Companies" (links to /companies)
   - Background: Gradient using KU Pine Green (#1B5E5E) + KU Fresh Green (#A4B82E)

2. **Stats Overview** (Optional)
   - Total companies participating (37)
   - Total positions available
   - Employment types offered
   - Visual cards with icons

3. **Quick Highlights**
   - Featured companies or business types
   - Popular positions
   - Quick filter previews

4. **Footer**
   - Event organizer info
   - Social links
   - Contact (if applicable)

**Design Elements**:
- Full-width hero with KU 80 logo
- Modern gradient backgrounds
- Smooth animations (fade-in, slide-up)
- Responsive design (mobile-first)
- High contrast with KU brand colors

---

### Page 2: Companies Page (`/companies.tsx`)
**Purpose**: Interactive search/filter interface with company listings

**Layout**:
- **Left Sidebar** (desktop) / **Top Panel** (mobile):
  - Search bar
  - Filter controls (business type, employment, year level, positions)
  - Sort dropdown
  - Active filter chips with clear options
  - "Back to Home" link

- **Main Content Area**:
  - Results count
  - Company cards grid (responsive: 1/2/3 columns)
  - Company modal (on click)

**Design Elements**:
- Sticky filters on desktop
- Collapsible filter panel on mobile (hamburger)
- KU brand colors throughout
- Smooth transitions between pages
- Loading states

---

## Technical Implementation

### Phase 1: File Structure Setup
**New Files**:
```
pages/
  index.tsx           (NEW - Landing page)
  companies.tsx       (NEW - Rename/refactor current index.tsx)
components/
  landing/
    Hero.tsx          (NEW)
    StatsSection.tsx  (NEW)
    QuickHighlights.tsx (NEW)
  companies/          (MOVE existing components here)
    FiltersPanel.tsx  (EXISTING)
    CompanyCard.tsx   (EXISTING)
    CompanyList.tsx   (EXISTING)
    CompanyModal.tsx  (EXISTING)
```

### Phase 2: Update Tailwind Theme
**Modify `tailwind.config.ts`**:
```typescript
colors: {
  'ku-pine': '#1B5E5E',      // KU Pine Green (teal)
  'ku-fresh': '#A4B82E',     // KU Fresh Green (lime)
  'ku-pine-dark': '#0F3D3D',
  'ku-fresh-dark': '#7A8A1F',
}
```

### Phase 3: Landing Page Components
**Create Hero Section**:
- Full-height viewport hero
- KU 80 logo integration
- Animated gradient background
- Call-to-action button with hover effects
- Next.js Link to `/companies`

**Create Stats Section**:
- Calculate totals from companies data
- Display in animated cards
- Icons for visual appeal

### Phase 4: Refactor Companies Page
**Move existing logic to `/companies`**:
- Copy current `pages/index.tsx` → `pages/companies.tsx`
- Keep all filter/search/sort logic
- Keep all existing components
- Add navigation back to landing page
- Adjust styling to match new theme

### Phase 5: Navigation & Routing
**Add Navigation**:
- Header component with logo + nav links
- Smooth page transitions
- Active route highlighting

### Phase 6: Brand & Polish
**Apply KU Brand Identity**:
- Replace all navy (#1E3A8A) → KU Pine Green (#1B5E5E)
- Replace all gold (#F59E0B) → KU Fresh Green (#A4B82E)
- Add KU 80 logo assets
- Update fonts if needed (KU uses specific typefaces)
- Add microinteractions (hover, click animations)

---

## Data Flow

### Build Time
```
CSV → parseCompaniesCsv() → companies data
  ↓
getStaticProps (both pages)
  ↓
Landing page: aggregate stats
Companies page: full company array
```

### User Journey
```
1. User lands on `/` (Hero landing page)
2. Sees event info + stats + highlights
3. Clicks "Explore Companies" button
4. Navigates to `/companies`
5. Uses filters/search to find companies
6. Clicks company card → Modal opens
7. Can go back to landing via header link
```

---

## Design System

### Color Palette
```
Primary: KU Pine Green (#1B5E5E)
Secondary: KU Fresh Green (#A4B82E)
Background: White (#FFFFFF)
Surface: Gray-50 (#F9FAFB)
Text Primary: Gray-900 (#111827)
Text Secondary: Gray-600 (#4B5563)
Border: Gray-200 (#E5E7EB)
```

### Typography
```
Headings: Font-bold, larger sizes
Body: Font-normal, readable sizes
CTA Buttons: Font-semibold, uppercase tracking
```

### Spacing
```
Container max-width: 1280px
Section padding: py-12 md:py-20
Card padding: p-6
Grid gap: gap-6 md:gap-8
```

---

## Implementation Phases

### Phase 1: Setup & Structure (Day 1)
- [ ] Create new file structure
- [ ] Update Tailwind config with KU colors
- [ ] Create basic routing structure

### Phase 2: Landing Page (Day 1-2)
- [ ] Hero section with gradient
- [ ] Stats calculation and display
- [ ] Quick highlights section
- [ ] Footer component
- [ ] Responsive design

### Phase 3: Companies Page Migration (Day 2)
- [ ] Move existing index.tsx to companies.tsx
- [ ] Update imports and paths
- [ ] Add back navigation
- [ ] Test all filters/search/sort still work

### Phase 4: Brand Integration (Day 3)
- [ ] Apply KU Pine Green + Fresh Green colors
- [ ] Add KU 80 logo
- [ ] Update all components with new theme
- [ ] Add animations and transitions

### Phase 5: Polish & Testing (Day 3-4)
- [ ] Cross-browser testing
- [ ] Mobile responsive testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Update README with new structure

---

## Benefits of Two-Page Approach

✅ **Professional First Impression**: Landing page establishes brand identity
✅ **Better Marketing**: Can showcase event details, stats, highlights
✅ **Cleaner Separation**: Landing vs. functional tool
✅ **SEO Friendly**: Two pages = more content for search engines
✅ **Scalability**: Easy to add more pages (e.g., /about, /schedule)
✅ **Event Focus**: Landing page can promote date/time/location prominently

---

## Potential Challenges

⚠️ **Filter State**: Need to handle filter persistence (URL params or session storage)
⚠️ **Extra Navigation**: Users need one more click to see companies
⚠️ **Duplicate Data**: Both pages need getStaticProps
⚠️ **Testing**: More pages = more test cases

---

## Success Metrics

- Landing page load time < 2s
- Companies page fully interactive < 1s
- All existing functionality maintained (34/34 tests passing)
- Mobile responsive on all screen sizes
- Accessibility score maintains WCAG AA
- Build time < 10s

---

## Next Steps

1. Review and approve this plan
2. Create detailed component designs/wireframes (optional)
3. Begin Phase 1 implementation
4. Iterate based on feedback

---

**Estimated Timeline**: 3-4 days for full implementation
**Risk Level**: Low (existing code is stable, this is additive)
**Rollback Plan**: Keep current index.tsx as backup, test new structure in separate branch
