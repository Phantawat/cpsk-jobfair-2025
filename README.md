# KU Computer Engineering Job Fair 2025

A modern, accessible single-page application (SPA) for the Kasetsart University Computer Engineering Job Fair 2025. Built with Next.js, React, TypeScript, and Tailwind CSS, this application enables students to search, filter, and explore job opportunities from participating companies.

## 🌟 Features

- **Advanced Search**: Real-time, debounced search across company names, business types, positions, and skills
- **Multi-filter System**: Filter companies by business type, positions, employment type, and year level
- **Smart Sorting**: Sort companies alphabetically (A→Z or Z→A) or by participation time (earliest to latest)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible UI**: Full keyboard navigation, screen reader support, and ARIA compliance
- **Company Details Modal**: Beautiful modal interface displaying comprehensive company information
- **Static Export**: Fully self-contained static site deployable to GitHub Pages, Netlify, or Vercel

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.0.0](https://nextjs.org/) with Pages Router
- **Language**: [TypeScript 5.5.2](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 3.4.4](https://tailwindcss.com/) with KU-branded colors
- **Testing**: [Jest 29.7.0](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest)
- **CSV Parsing**: [csv-parse 5.5.5](https://csv.js.org/)
- **Node.js**: v18+ recommended

## 📋 CSV Schema

The application loads company data from `data/companies.csv` at build time. The CSV must have the following columns:

```
name              string         Company name (required)
businessType      string         Type of business/industry (required)
participationTime string         Time format "HH:mm-HH:mm" e.g. "09:30-17:00" (required)
positions         string         Semicolon-separated list of job positions (required)
skills            string         Semicolon-separated list of required skills (required)
employmentTypes   string         Semicolon-separated employment types (required)
                                 Valid: "Full-time", "Part-time", "Internship", "Freelancer"
yearLevels        string         Semicolon-separated year levels (required)
                                 Valid: "1", "2", "3", "4"
logo              string         URL to company logo (optional)
```

### Example Row

```csv
Collective Wisdom,Software as a Service (SaaS),13:00-17:00,Front-end Developer; Data Scientist; QA Engineer,Code Writing; Code Reading,Part-time,4,https://example.com/logo.png
```

### Important Notes

- **Date/Time Format**: Use 24-hour time format (HH:mm). Example: `09:30-17:00`
- **Array Fields**: Use semicolon (`;`) as separator for lists (positions, skills, employment types, year levels)
- **UTF-8 Encoding**: CSV file must be UTF-8 encoded
- **Contact Information**: Do NOT include email addresses, phone numbers, or physical addresses in any field (automatically filtered for security)
- **Logo URLs**: Can be absolute or relative paths to `public/` directory

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or later
- npm v9 or later (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cpsk-jobfair-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update company data** (optional)
   - Edit `data/companies.csv` to add/modify company information
   - Ensure CSV follows the schema specified above

4. **Start development server**
   ```bash
   npm run dev
   ```
   - Application runs on [http://localhost:3000](http://localhost:3000)
   - Hot-reload enabled for live development

## 📦 Available Scripts

### Development

```bash
npm run dev              # Start development server with hot-reload
```

### Building

```bash
npm run build            # Build for production (outputs to .next/)
npm run start            # Start production server
npm run export           # Build static site (outputs to out/)
```

### Testing

```bash
npm test                 # Run all unit tests
npm test:watch          # Run tests in watch mode (re-run on file changes)
```

## 📱 Deployment

The application is built as a **static site** and can be deployed to any static hosting platform.

### Deployment Steps

1. **Build the static site**
   ```bash
   npm run export
   ```
   This creates an `out/` directory with all static files.

2. **Deploy to hosting platform**

#### GitHub Pages

```bash
# Build static site
npm run export

# Copy contents of out/ to gh-pages branch
git add out
git commit -m "Deploy static site"
git subtree push --prefix out origin gh-pages
```

#### Netlify

```bash
# Connect your repository to Netlify
# Set build command: npm run export
# Set publish directory: out
# Deploy button will trigger automatic builds
```

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
# Select "Export" when prompted for build output
```

#### Self-hosted (Apache/Nginx)

```bash
npm run export
# Upload contents of out/ directory to your web server
```

## 🎨 Design System

### KU Colors

- **Primary**: Navy Blue (`#1E3A8A`)
- **Secondary**: Bright Blue (`#1E40AF`)
- **Accent**: Gold (`#F59E0B`)
- **Dark Text**: (`#111827`)
- **Light Background**: (`#F9FAFB`)

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: ≥ 1024px (xl, 2xl)

## ♿ Accessibility Features

- ✅ Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- ✅ Screen reader support (ARIA labels, roles, descriptions)
- ✅ Focus indicators (visible focus rings on all interactive elements)
- ✅ Color contrast meets WCAG AA standard
- ✅ Reduced motion support (`prefers-reduced-motion`)
- ✅ Modal focus trap (keyboard focus trapped within modal)
- ✅ Semantic HTML throughout

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between interactive elements |
| `Shift + Tab` | Navigate backwards |
| `↑/↓` | Navigate company list items |
| `Home/End` | Jump to first/last company in list |
| `Enter` | Open company details modal |
| `Escape` | Close modal |

## 🔒 Security & Privacy

- **No External API Calls**: All data is loaded at build time from local CSV
- **Contact Info Protection**: Email addresses, phone numbers, and addresses are automatically excluded
- **No Tracking**: No analytics or tracking cookies
- **HTTPS Ready**: Static export suitable for HTTPS hosting

## 🐛 Troubleshooting

### Port Already in Use

```bash
# If port 3000 is already in use:
npm run dev -- -p 3001
```

### CSV File Not Found

```
Error: ENOENT: no such file or directory, open 'data/companies.csv'
```

**Solution**: Ensure `data/companies.csv` exists in the project root with proper CSV format.

### CSV Parsing Error

```
Error: Invalid CSV format
```

**Solution**:
- Verify CSV has Unix line endings (not Windows CRLF)
- Check that all semicolon-separated values are properly quoted if they contain special characters
- Ensure UTF-8 encoding (not UTF-16 or other)
- Use a CSV validator tool to check syntax

### Build Fails with TypeScript Error

```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### Tests Failing After CSV Update

The test suite includes sample CSV parsing tests. If you modify the CSV schema:

1. Review `__tests__/parseCsv.test.ts`
2. Update tests to match new schema
3. Run `npm test` to verify all tests pass

## 📚 Project Structure

```
cpsk-jobfair-2025/
├── data/
│   └── companies.csv               # Company data (build-time)
├── pages/
│   ├── _app.tsx                    # Next.js app wrapper
│   └── index.tsx                   # Home page (main UI)
├── components/
│   ├── FiltersPanel.tsx            # Search & filter controls
│   ├── CompanyList.tsx             # List of companies
│   ├── CompanyCard.tsx             # Individual company card
│   └── CompanyModal.tsx            # Company details modal
├── lib/
│   └── parseCsv.ts                 # CSV parsing utility
├── types/
│   └── company.ts                  # TypeScript type definitions
├── styles/
│   └── globals.css                 # Global Tailwind styles
├── public/
│   └── logo-placeholder.svg        # Company logo placeholder
├── __tests__/
│   └── parseCsv.test.ts            # Unit tests (34 tests)
├── next.config.js                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── jest.config.js                  # Jest test configuration
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## 🧪 Testing

The project includes 34 comprehensive unit tests covering:

- CSV parsing with various formats
- Data normalization (trimming, deduplication)
- Time parsing (multiple time formats)
- Year level extraction
- Search text creation
- Contact information filtering
- Edge cases and error handling
- Thai language support

Run tests:
```bash
npm test              # Run once
npm test:watch       # Watch mode
```

## 🤝 Contributing

To add/modify company data:

1. Edit `data/companies.csv`
2. Follow the CSV schema defined above
3. Run `npm run build` to regenerate static site
4. Test locally with `npm run dev`

To update the UI:

1. Modify components in `components/`
2. Run `npm run dev` for hot-reload
3. Test keyboard navigation and screen reader
4. Run `npm test` to ensure no regressions

## 📄 License

This project is provided for Kasetsart University Computer Engineering Job Fair 2025.

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review existing GitHub issues
3. Contact the development team

## 🎓 About KU Computer Engineering

Kasetsart University Computer Engineering program aims to produce graduates with strong technical skills and practical experience in computer science and engineering.

---

**Built with ❤️ for KU Computer Engineering Job Fair 2025**

*Last updated: November 2025*
