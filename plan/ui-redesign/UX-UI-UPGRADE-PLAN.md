# KU Computer Engineering Job Fair 2025 - UX/UI Design Upgrade Plan

**Date:** November 15, 2025  
**Status:** Planning Phase  
**Priority:** High

---

## Overview

Comprehensive UX/UI redesign to enhance user experience, visual hierarchy, and accessibility across all pages. Current functionality is solid; this upgrade focuses on modern aesthetics, better information architecture, and improved user engagement.

---

## Current State Analysis

### ✅ What's Working Well
- Clean white background with KU brand colors (Pine #1B5E5E, Fresh #A4B82E)
- Functional filters and search
- Responsive design
- Clear call-to-action buttons
- Organized modal layout

### ⚠️ Areas for Improvement
- Homepage feels static - needs more dynamic content
- Company cards lack visual differentiation
- Filter panel could be more intuitive/collapsible on mobile
- Featured companies carousel could be more prominent
- Modal could have better visual hierarchy
- No animations/transitions for micro-interactions
- Color palette could be expanded for better visual interest
- Typography could have more hierarchy

---

## Design Principles

1. **Modern & Professional** - Keep KU brand integrity while feeling contemporary
2. **User-Centric** - Prioritize student needs and job search workflows
3. **Accessible** - WCAG 2.1 AA compliant
4. **Performance** - Smooth animations, quick interactions
5. **Responsive** - Excellent mobile experience (primary use case)
6. **Scannable** - Information easily digestible at a glance

---

## Page-by-Page Redesign Strategy

### 1. LANDING PAGE (index.tsx) - "Discovery Hub"

#### Hero Section Upgrade
- **Current:** Simple CPSK logo, motto, scroll indicator
- **Upgrade:**
  - Add animated background gradient (subtle KU colors)
  - Hero height: 70vh on desktop, 60vh on mobile
  - Animated scroll indicator (pulse effect)
  - Add animated stats counters (37 companies, X positions, X skills)
  - Parallax effect on hero assets
  - Better visual hierarchy: Logo → Title → Subtitle → CTA
  - Add animated cursor/pointer hint

#### Stats Section Redesign
- **Current:** Basic stat cards
- **Upgrade:**
  - Larger, bolder numbers with ku-fresh color
  - Icons with subtle animations
  - Hover effects with scale + shadow
  - Staggered entrance animations
  - Better spacing and visual breathing room
  - Gradient backgrounds per stat

#### Featured Companies Section
- **Current:** Horizontal carousel with logos
- **Upgrade:**
  - Larger carousel cards (logo + company name + position count)
  - Add hover states: lift effect, shadow expansion
  - Show 2-3 cards per row on desktop, smooth transitions
  - Pagination dots with animation
  - "View Company" CTA button on hover
  - Card entrance stagger animation
  - Better mobile: full-width, single carousel

#### Popular Positions Section
- **Current:** 2-column grid with titles + counts
- **Upgrade:**
  - Use small badge icons for each position
  - Add progress bars showing popularity percentage
  - Hover: highlight + expand slightly
  - Interactive: click to see companies with that position
  - Animated bar fill on load
  - Better visual hierarchy (rank number, title, count)

#### Call-to-Action Section
- **Current:** Simple text + button
- **Upgrade:**
  - Add decorative elements/illustrations
  - Button: larger, more prominent, with arrow animation on hover
  - Add trust indicators (e.g., "Trusted by X students")
  - Secondary CTA: "Explore by Filter"
  - Countdown timer (if applicable): "Job Fair starts in X days"

#### Footer
- **Current:** Basic footer
- **Upgrade:**
  - Richer company information
  - Contact/social links
  - Newsletter signup
  - Quick links to filtered views
  - Better spacing and visual separation

---

### 2. COMPANIES PAGE (companies.tsx) - "Smart Finder"

#### Header Section
- **Current:** Simple gradient header
- **Upgrade:**
  - Add breadcrumb navigation (Home > Companies)
  - Sticky header with company count dynamic update
  - Search bar more prominent, larger
  - Micro search hints/suggestions

#### Filter Panel Redesign
- **Current:** Accordion-style filters in sidebar
- **Upgrade:**
  - **Mobile:** Bottom sheet / drawer panel (swipe up from bottom)
  - **Desktop:** Side panel with better visual grouping
  - Clear section headers with icons
  - Toggle animations
  - Quick filter pills for common filters (e.g., "Internship", "Year 2")
  - Visual feedback on applied filters
  - "Reset Filters" more prominent
  - Filter counts badge (e.g., "Employment Type (3 selected)")

#### Company Cards Redesign
- **Current:** Centered logo + name + employment tags
- **Upgrade:**
  - Card structure: Logo (left) | Name + Tags (right)
  - Add company logo thumbnails (not just initials)
  - Add position count prominently ("7 Positions")
  - Add primary employment type as badge
  - Show first 2-3 positions as small tags
  - Hover effects:
    - Card lift (shadow/scale)
    - Slight background color shift
    - Reveal hidden "View Details" button
  - Active state: ku-pine border + glow effect
  - Skeleton loading states
  - Keyboard focus indicators

#### List Layout Improvements
- **Current:** Grid layout
- **Upgrade:**
  - Add toggle between Grid/List view
  - Grid: 2 columns on tablet, 3 on desktop, 1 on mobile
  - List view: Horizontal cards with more info visible
  - Smooth view transition animations
  - Lazy loading for images

#### Active Filter Display
- **Current:** Horizontal pills below search
- **Upgrade:**
  - More visual prominence
  - Better spacing and grouping by filter type
  - Animated entrance when filters applied
  - "Clear All" button: more prominent
  - Show result count: "Showing X of Y companies"

#### Empty State
- **Current:** Simple "No companies found" message
- **Upgrade:**
  - Illustration/icon
  - Helpful suggestions to refine search
  - "Popular filters" recommendation
  - "Browse all companies" button
  - Animated empty state

#### Company Count Summary
- **New Addition:**
  - "Found 12 companies matching your criteria"
  - Live update as filters change
  - Animated counter transitions

---

### 3. COMPANY MODAL (CompanyModal.tsx) - "Detailed Profile"

#### Modal Structure Redesign
- **Current:** Top header with logo, then sections below
- **Upgrade:**
  - Hero section: Large logo + gradient background
  - Sticky header with company name + close button
  - Better section organization with visual separation
  - Smooth scroll behavior
  - Animated entrance (slide from bottom on mobile, fade from center on desktop)

#### Header/Logo Section
- **Current:** Medium logo + name
- **Upgrade:**
  - Large hero background (company brand color)
  - Larger logo (1/4 screen width on mobile)
  - Gradient overlay for text contrast
  - Company name positioned over image
  - Breadcrumb: "Companies > [Company Name]"

#### Information Sections
- **Current:** Basic colored boxes
- **Upgrade:**
  - Card-based design with subtle shadows
  - Better visual hierarchy with icons
  - Icons for each section (business, time, positions, skills, employment)
  - Color coding:
    - Business Type: Blue tint
    - Time: Orange tint  
    - Positions: Green tint
    - Skills: Purple tint
    - Employment: Teal tint
  - Better spacing between sections

#### Positions Section
- **Current:** Colored tags in flex wrap
- **Upgrade:**
  - Show position count prominently
  - Improved tag design with better color variety
  - Grouped by category if possible
  - Scrollable horizontal list on mobile
  - Hover tooltip on each position (show job description if available)

#### Skills Section
- **Current:** Bullet list
- **Upgrade:**
  - Horizontal scrollable tags on mobile
  - Grid layout on desktop (2-3 columns)
  - Skill icons/badges with colors
  - Searchable: highlight if student has interest in skill
  - Better visual differentiation

#### Employment Type Section
- **Current:** Simple tags
- **Upgrade:**
  - Use icons + text
  - Color-coded by type:
    - Full-time: Blue
    - Part-time: Orange
    - Internship: Green
    - Freelance: Purple
  - Add brief description below each type

#### Year Levels Section
- **Current:** Individual badge pills
- **Upgrade:**
  - Visual progression: 2 → 3 → 4 (show as steps)
  - Better visual indication of range
  - Icons with year badges
  - Add small note: "Accepts Year 2 and above"

#### Call-to-Action Section
- **New Addition:**
  - "Learn More" button (links to company website if available)
  - "Save to Favorites" button (for future feature)
  - "Share Company" button
  - Star rating section (for future reviews)

#### Modal Footer
- **Upgrade:**
  - Navigate to previous/next company (< Company Name | Company Name >)
  - Current progress indicator (X of Y)
  - Sticky footer with CTA button

---

## Design System Upgrades

### Color Palette Expansion
**Primary Colors (existing):**
- KU Pine: #1B5E5E (primary)
- KU Fresh: #A4B82E (accent)

**Secondary Colors (add):**
- Success: #10B981 (for positive actions)
- Warning: #F59E0B (for caution)
- Info: #3B82F6 (for information)
- Error: #EF4444 (for errors)
- Neutral variants: Better grays for hierarchy

### Typography Improvements
- **Headlines:** Larger, bolder, better spacing
- **Body:** Improved line-height (1.6-1.8)
- **Labels:** Smaller, colored, more prominent
- **Hierarchy:** Better visual differentiation between sections

### Spacing & Layout
- **Consistency:** 8px grid system
- **Card padding:** Larger padding (24px instead of 16px)
- **Section gaps:** 32px-48px between major sections
- **Mobile:** Better use of vertical space

### Shadow & Depth
- **Card shadows:** Subtle, elevation-based
- **Hover shadows:** More pronounced (depth perception)
- **Layering:** Clear visual hierarchy

### Micro-interactions & Animations
- **Page transitions:** Smooth fade-in (200-300ms)
- **Button hover:** Scale + color shift
- **Card hover:** Lift effect (transform: translateY(-4px))
- **Loading states:** Skeleton screens for images/cards
- **Empty states:** Animated illustrations
- **Filter toggles:** Smooth collapse/expand
- **Counter updates:** Number animation transitions
- **Modal entrance:** Slide from bottom (mobile) / Fade center (desktop)

---

## Component Updates

### Button Styles
- **Primary:** KU Pine background, white text, larger padding
- **Secondary:** Outline style with ku-pine border
- **Hover:** All buttons have clear hover state (darker color + shadow)
- **Disabled:** Grayed out with no hover effect
- **Sizes:** Small, Medium (default), Large for different contexts

### Card Component
- **Rounded corners:** 12-16px
- **Background:** White with subtle shadows
- **Hover:** Lift effect + enhanced shadow
- **Active:** Border highlight + glow effect
- **Skeleton:** Animated placeholder while loading

### Tag/Badge Component
- **Sizes:** Small, Medium, Large
- **Variants:** Filled, Outlined, Subtle
- **Colors:** Multiple color options for categorization
- **Border-radius:** 8px

### Modal Component
- **Entrance animation:** Slide from bottom (mobile) / Fade in (desktop)
- **Backdrop:** Dark semi-transparent with blur
- **Close button:** Top-right, always visible
- **Scrolling:** Inner content scrolls, header stays sticky
- **Mobile:** Full height with top border-radius

---

## Page Transition Strategy

1. **Entry animations:** Staggered fade-in for content
2. **Exit animations:** Smooth fade-out
3. **Loading states:** Skeleton screens for better perceived performance
4. **Page transitions:** 200-300ms fade transitions
5. **Scroll behavior:** Smooth scroll to top on page change

---

## Mobile-First Approach

1. **Primary design for mobile (375px+)**
2. **Progressive enhancement for tablet (768px+)**
3. **Desktop optimization (1024px+)**
4. **Large screens (1280px+)**

### Mobile Specific Changes
- Bottom sheet filters instead of sidebar
- Full-width cards with better padding
- Larger touch targets (48px minimum)
- Simplified navigation
- Optimized images for mobile
- Horizontal scrolling for long lists

---

## Accessibility Improvements

1. **Keyboard navigation:** Full support (Tab, Enter, Arrow keys)
2. **Focus indicators:** Clear, high contrast
3. **Color contrast:** WCAG AA minimum
4. **Screen reader support:** Semantic HTML, ARIA labels
5. **Form labels:** Proper label associations
6. **Error messages:** Clear, accessible feedback
7. **Images:** Descriptive alt text

---

## Performance Considerations

1. **Image optimization:** Responsive images, lazy loading
2. **Animation performance:** GPU-accelerated transforms
3. **Bundle size:** Code splitting for modals/filters
4. **Skeleton screens:** Reduce perceived load time
5. **Smooth scrolling:** 60fps animations

---

## Implementation Priority

### Phase 1 (High Priority)
- [ ] Homepage hero redesign
- [ ] Company card visual improvements
- [ ] Filter panel mobile drawer
- [ ] Modal enter/exit animations

### Phase 2 (Medium Priority)
- [ ] Color palette expansion
- [ ] Typography improvements
- [ ] Micro-interactions
- [ ] Skeleton loading states

### Phase 3 (Lower Priority)
- [ ] List view toggle
- [ ] Advanced animations
- [ ] Additional customizations
- [ ] Performance optimizations

---

## Design Assets Needed

1. **Icons:** For sections, positions, employment types
2. **Illustrations:** Hero section, empty states
3. **Company brand colors:** Optional company-specific theming
4. **Fonts:** Consider Google Fonts (Poppins, Inter, or similar)

---

## Success Metrics

- **User engagement:** Time spent on pages
- **Conversion:** Companies visited per session
- **Mobile experience:** Mobile usability scores
- **Performance:** Page load times
- **Accessibility:** Accessibility audit scores

---

## Next Steps

1. Validate design approach with stakeholders
2. Create Figma prototypes for key pages
3. Develop component library in code
4. Implement Phase 1 features
5. User test with target audience (CS students)
6. Iterate based on feedback

