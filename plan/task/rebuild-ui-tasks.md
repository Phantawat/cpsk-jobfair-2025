# UI Rebuild Tasks - Two-Page Architecture

## Phase 1: Setup & File Structure ⏳

### 1.1 Update Tailwind Configuration
- [x] Open `tailwind.config.ts`
- [x] Add KU brand colors to theme.extend.colors:
  - `ku-pine: '#1B5E5E'` (KU Pine Green - teal)
  - `ku-fresh: '#A4B82E'` (KU Fresh Green - lime)
  - `ku-pine-dark: '#0F3D3D'`
  - `ku-fresh-dark: '#7A8A1F'`
- [x] Remove or keep old `ku-navy` and `ku-gold` as fallback
- [x] Test build compiles without errors

### 1.2 Create Component Directory Structure
- [x] Create `components/landing/` folder
- [x] Create `components/companies/` folder
- [x] Create `components/layout/` folder (for shared Header/Footer)

### 1.3 Backup Current Index Page
- [x] Copy `pages/index.tsx` → `pages/index.backup.tsx`
- [ ] Commit to git (safety checkpoint)

---

## Phase 2: Landing Page Implementation 🏠

### 2.1 Create Hero Component
- [x] Create `components/landing/Hero.tsx`
- [ ] Implement full-height hero section with:
  - KU 80 logo placeholder (or actual asset)
  - Event title: "KU Computer Engineering Job Fair 2025"
  - Subtitle/tagline (e.g., "Connect with Leading Tech Companies")
  - Event details: Date, Time, Location
  - Primary CTA button: "Explore Companies" → Link to `/companies`
- [ ] Add gradient background (KU Pine Green to KU Fresh Green)
- [ ] Add fade-in animation on mount
- [ ] Make responsive (mobile-first)

### 2.2 Create Stats Section Component
- [x] Create `components/landing/StatsSection.tsx`
- [ ] Accept `companies` prop from getStaticProps
- [ ] Calculate statistics:
  - Total companies count
  - Total unique positions count
  - Total employment types offered
  - Total year levels supported
- [ ] Display stats in 4 animated cards
- [ ] Add icons (optional, can use emoji or SVG)
- [ ] Add counter animation (0 → final number)
- [ ] Make responsive grid (2x2 on mobile, 4x1 on desktop)

### 2.3 Create Quick Highlights Component
- [x] Create `components/landing/QuickHighlights.tsx`
- [ ] Show top 3-5 business types with company count
- [ ] Show top 5 most common positions
- [ ] Display as cards or badges
- [ ] Add hover effects
- [ ] Make responsive

### 2.4 Create Footer Component
- [x] Create `components/layout/Footer.tsx`
- [ ] Add event organizer info (placeholder or actual)
- [ ] Add social media links (optional)
- [ ] Add copyright notice
- [ ] Use KU Pine Green background
- [ ] Make responsive

### 2.5 Build Landing Page
- [x] Open `pages/index.tsx`
- [x] Clear existing content (keep getStaticProps)
- [x] Import Hero, StatsSection, QuickHighlights, Footer
- [x] Compose landing page layout
- [x] Pass companies data to StatsSection
- [x] Test in browser (`npm run dev`)
- [x] Verify responsive design on mobile/tablet/desktop
- [ ] Check accessibility (keyboard navigation, ARIA labels)

---

## Phase 3: Companies Page Migration 🏢

### 3.1 Move Existing Components
- [x] Move `components/FiltersPanel.tsx` → `components/companies/FiltersPanel.tsx`
- [x] Move `components/CompanyCard.tsx` → `components/companies/CompanyCard.tsx`
- [x] Move `components/CompanyList.tsx` → `components/companies/CompanyList.tsx`
- [x] Move `components/CompanyModal.tsx` → `components/companies/CompanyModal.tsx`
- [x] Update all import paths in moved files (if any internal imports)

### 3.2 Create Companies Page
- [x] Create `pages/companies.tsx`
- [x] Copy all logic from `pages/index.backup.tsx`:
  - All state variables (search, filters, sort, modal, activeIndex)
  - All hooks (useDebouncedValue, useMemo, useEffect, useRef)
  - All handlers (handleSelectCompany, handleKeyDown, etc.)
  - getStaticProps function
  - filterCompanies and sortCompanies logic
- [x] Update imports to use `components/companies/` path
- [x] Keep exact same functionality (no changes to logic yet)

### 3.3 Add Navigation Back to Home
- [x] Add "← Back to Home" link at top of companies page
- [x] Use Next.js `Link` component to link to `/`
- [x] Style with KU colors
- [x] Test navigation works both directions

### 3.4 Test Companies Page
- [x] Run `npm run dev`
- [x] Navigate to http://localhost:3000/companies
- [x] Test all filters work (search, business type, employment, year level)
- [x] Test sort functionality
- [x] Test company card click → modal opens
- [x] Test modal close (Escape, overlay click, close button)
- [x] Test keyboard navigation (Arrow keys, Tab, Enter)
- [x] Verify all 37 companies load correctly
- [x] Check browser console for errors

---

## Phase 4: Brand Color Integration 🎨

### 4.1 Update FiltersPanel Component
- [x] Open `components/companies/FiltersPanel.tsx`
- [x] Replace `bg-ku-navy` → `bg-ku-pine`
- [x] Replace `text-ku-navy` → `text-ku-pine`
- [x] Replace `border-ku-navy` → `border-ku-pine`
- [x] Replace `hover:bg-ku-navy` → `hover:bg-ku-pine`
- [x] Replace `bg-ku-gold` → `bg-ku-fresh`
- [x] Replace `text-ku-gold` → `text-ku-fresh`
- [x] Test in browser

### 4.2 Update CompanyCard Component
- [x] Open `components/companies/CompanyCard.tsx`
- [x] Replace `ring-ku-gold` → `ring-ku-fresh`
- [x] Replace `bg-ku-navy` → `bg-ku-pine`
- [x] Replace `text-ku-gold` → `text-ku-fresh`
- [x] Update hover effects to use new colors
- [x] Test in browser

### 4.3 Update CompanyModal Component
- [x] Open `components/companies/CompanyModal.tsx`
- [x] Replace `bg-ku-navy` → `bg-ku-pine`
- [x] Replace `text-ku-gold` → `text-ku-fresh`
- [x] Replace `border-ku-gold` → `border-ku-fresh`
- [x] Update badge colors (employment types, year levels)
- [x] Test modal appearance

### 4.4 Update Companies Page
- [x] Open `pages/companies.tsx`
- [x] Replace any `bg-ku-navy` → `bg-ku-pine`
- [x] Replace any `text-ku-gold` → `text-ku-fresh`
- [x] Update page background if needed
- [x] Test overall page appearance

### 4.5 Add KU Logo Asset
- [x] Add KU logo to `public/` folder (using placeholder)
- [x] Update Hero component to use logo
- [x] Add alt text for accessibility
- [x] Placeholder text kept (actual logo optional)

---

## Phase 5: Enhanced Styling & Animations ✨

### 5.1 Add Gradient Backgrounds
- [ ] Hero section: Add animated gradient (pine → fresh)
- [ ] Use `bg-gradient-to-br from-ku-pine to-ku-fresh`
- [ ] Add subtle animation (optional: `animate-gradient`)
- [ ] Test gradient renders correctly

### 5.2 Add Fade-In Animations
- [ ] Install `framer-motion` or use CSS animations
- [ ] Add fade-in to Hero title (delay: 0ms)
- [ ] Add fade-in to Hero subtitle (delay: 100ms)
- [ ] Add fade-in to Hero CTA button (delay: 200ms)
- [ ] Add fade-in to Stats cards (stagger: 100ms each)
- [ ] Test animations are smooth

### 5.3 Add Hover Effects
- [ ] CTA button: Scale on hover (`hover:scale-105`)
- [ ] Company cards: Shadow increase on hover
- [ ] Filter buttons: Background color transition
- [ ] Stats cards: Lift effect on hover
- [ ] Test all hover states

### 5.4 Add Loading States
- [ ] Add loading skeleton for companies page (optional)
- [ ] Add loading spinner if needed
- [ ] Test loading states (if applicable)

### 5.5 Improve Typography
- [ ] Hero title: text-5xl md:text-6xl font-bold
- [ ] Hero subtitle: text-xl md:text-2xl font-normal
- [ ] Section headings: text-3xl md:text-4xl font-bold
- [ ] Body text: text-base md:text-lg
- [ ] Ensure proper line heights and spacing
- [ ] Test readability on all screen sizes

---

## Phase 6: Responsive Design Testing 📱

### 6.1 Mobile Testing (< 640px)
- [ ] Landing page hero displays correctly
- [ ] Stats section grid is 2x2
- [ ] Highlights section is single column
- [ ] CTA button is full-width or centered
- [ ] Companies page filters are collapsible (if implemented)
- [ ] Company cards are single column
- [ ] Modal is full-screen on mobile
- [ ] All text is readable
- [ ] No horizontal scroll

### 6.2 Tablet Testing (640px - 1024px)
- [ ] Landing page layout is balanced
- [ ] Stats section grid is 4x1 or 2x2
- [ ] Company cards are 2 columns
- [ ] Filters sidebar or top panel works
- [ ] Modal is centered or full-screen
- [ ] Navigation is accessible

### 6.3 Desktop Testing (> 1024px)
- [ ] Landing page hero is full-width
- [ ] Stats section is 4x1 grid
- [ ] Company cards are 3 columns
- [ ] Filters sidebar is sticky on left
- [ ] Modal is centered with max-width
- [ ] All spacing is appropriate
- [ ] No wasted white space

---

## Phase 7: Accessibility Audit ♿

### 7.1 Keyboard Navigation
- [ ] Tab through landing page (Hero → Stats → Highlights → Footer)
- [ ] Tab through companies page (Filters → Company cards → Modal)
- [ ] Arrow keys work in company list
- [ ] Enter opens modal
- [ ] Escape closes modal
- [ ] Focus indicators are visible
- [ ] No keyboard traps

### 7.2 ARIA Labels & Roles
- [ ] Hero CTA button has descriptive aria-label
- [ ] Filter buttons have aria-pressed states
- [ ] Company cards have role="button" and aria-pressed
- [ ] Modal has role="dialog", aria-modal, aria-labelledby
- [ ] Search input has aria-label
- [ ] All interactive elements have proper roles

### 7.3 Screen Reader Testing (Optional)
- [ ] Test with NVDA or JAWS (Windows) or VoiceOver (Mac)
- [ ] Ensure all content is announced
- [ ] Ensure navigation is logical
- [ ] Fix any issues found

---

## Phase 8: Performance Optimization ⚡

### 8.1 Code Splitting
- [ ] Verify Next.js automatically splits pages
- [ ] Check `npm run build` output for chunk sizes
- [ ] Ensure landing page bundle is small
- [ ] Ensure companies page loads fast

### 8.2 Image Optimization
- [ ] Use Next.js `Image` component for KU logo
- [ ] Add `width` and `height` props
- [ ] Add `alt` text
- [ ] Use WebP format if possible
- [ ] Test image loads correctly

### 8.3 Static Export Verification
- [ ] Run `npm run build`
- [ ] Verify both pages generate HTML
- [ ] Check `out/` directory has:
  - `index.html` (landing page)
  - `companies.html` (companies page)
  - All assets in `_next/`
- [ ] Test static site locally
- [ ] Verify no runtime errors

---

## Phase 9: Testing & Quality Assurance ✅

### 9.1 Update Tests
- [ ] Run `npm test` to check existing tests
- [ ] Update test imports if components moved
- [ ] Add tests for new landing page components (optional)
- [ ] Ensure all 34 tests still pass
- [ ] Fix any failing tests

### 9.2 TypeScript Verification
- [ ] Run `npx tsc --noEmit`
- [ ] Fix any TypeScript errors
- [ ] Ensure all types are correct
- [ ] Verify no `any` types used unnecessarily

### 9.3 Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test in Edge
- [ ] Fix any browser-specific issues

### 9.4 Manual QA Checklist
- [ ] All links work correctly
- [ ] All buttons trigger correct actions
- [ ] All filters apply correctly
- [ ] All sort options work
- [ ] Modal opens and closes properly
- [ ] Keyboard navigation works throughout
- [ ] No console errors or warnings
- [ ] No accessibility violations
- [ ] Responsive design works on all screens
- [ ] Performance is acceptable (no lag)

---

## Phase 10: Documentation & Deployment 📚

### 10.1 Update README
- [ ] Update project description with two-page architecture
- [ ] Update screenshot/demo (if applicable)
- [ ] Update routing documentation:
  - `/` - Landing page
  - `/companies` - Company listing and filters
- [ ] Update color palette section with KU Pine/Fresh colors
- [ ] Update deployment instructions (no changes needed)
- [ ] Add new components to project structure section

### 10.2 Update Task Documentation
- [ ] Mark all tasks as completed in this file
- [ ] Create summary document (optional)
- [ ] Document any decisions or trade-offs made

### 10.3 Git Commit & Push
- [ ] Stage all changes: `git add .`
- [ ] Commit: `git commit -m "feat: implement two-page UI with KU brand colors"`
- [ ] Push to repository
- [ ] Create pull request (if using branches)

### 10.4 Build & Deploy
- [ ] Run final build: `npm run build`
- [ ] Verify build success
- [ ] Run static export: `npm run export` (if different from build)
- [ ] Deploy to hosting platform:
  - GitHub Pages, or
  - Netlify, or
  - Vercel, or
  - Other static host
- [ ] Test production site
- [ ] Verify all functionality works in production

---

## Success Criteria ✨

✅ Two pages working: `/` (landing) and `/companies` (listing)
✅ KU Pine Green (#1B5E5E) and Fresh Green (#A4B82E) applied throughout
✅ All 37 companies load and display correctly
✅ All filters, search, and sort functionality maintained
✅ Responsive design works on mobile, tablet, desktop
✅ Keyboard navigation and accessibility maintained
✅ All 34 tests passing
✅ Zero TypeScript errors
✅ Build completes successfully
✅ Static export generates both pages
✅ Documentation updated

---

## Estimated Time Breakdown

| Phase | Estimated Time |
|-------|----------------|
| Phase 1: Setup | 30 mins |
| Phase 2: Landing Page | 3-4 hours |
| Phase 3: Migration | 2-3 hours |
| Phase 4: Brand Colors | 1-2 hours |
| Phase 5: Styling | 2-3 hours |
| Phase 6: Responsive | 1-2 hours |
| Phase 7: Accessibility | 1 hour |
| Phase 8: Performance | 1 hour |
| Phase 9: Testing | 2-3 hours |
| Phase 10: Documentation | 1 hour |
| **TOTAL** | **15-22 hours** |

---

## Notes & Reminders

- Keep `pages/index.backup.tsx` until fully tested
- Test after each phase completion
- Commit frequently to git
- Use browser DevTools for responsive testing
- Use Lighthouse for performance/accessibility audits
- Ask for help if stuck on any task
- Take breaks between phases!

---

**Ready to start? Begin with Phase 1! 🚀**
