# Cambodia Tax Calculator

A comprehensive single-page application for calculating all 13 taxes in the Kingdom of Cambodia. Built with React + Vite for **ITC Economy for Engineers**.

## Features

- **13 Tax Calculators** — Salary, Prepayment, VAT, Special Tax, Withholding, Public Lighting, Accommodation, Dividend, Minimum, Rent & Land, Land Transfer, Property, Stamp
- **Dual Language** — English & Khmer (ភាសាខ្មែរ)
- **Instant Results** — Auto-calculation on every input change
- **Home Page** — Hero section, stats, featured tax cards, how-it-works guide
- **About Page** — Tax system overview, categories, how-to-use guide, glossary
- **All Taxes Page** — Searchable, filterable grid of all 13 taxes
- **Tax Detail Pages** — Full definition, rate tables, formula, live calculator, prev/next navigation
- **Responsive Design** — Mobile-friendly with hamburger menu
- **Animations** — Page transitions, card hover effects, staggered stat reveals

##  Tax Calculators Included

### National Taxes (ថវិការថ្នាក់ជាតិ)

| # | Tax Name | Khmer | Rate | Formula |
|---|----------|-------|------|---------|
| 1 | Salary Tax | ពន្ធលើប្រាក់បៀវត្ស | 0% – 20% | Progressive brackets − dependant deductions |
| 2 | Prepayment Tax | ប្រាក់រំដោះពន្ធ | 1% | Revenue ÷ 1.1 × 1% |
| 3 | VAT | អាករលើតម្លៃបន្ថែម | 10% | Output VAT − Input VAT |
| 4 | Special Tax | អាករពិសេស | 3% – 35% | Tax Base × Rate (3 methods) |
| 5 | Withholding Tax | ពន្ធកាត់ទុក | 4% – 15% | Gross Payment × Rate |
| 6 | Dividend Tax | ពន្ធលទ្ធផល | 15% | Dividend Amount × 15% |
| 7 | Minimum Tax | ពន្ធអប្បបរមា | 0.1% | Annual Revenue × 0.1% |
| 8 | Rent and Land Tax | ពន្ធអាជីវកម្មនិងដី | 10% | Rental Income × 10% |
| 9 | Land Transfer Tax | ពន្ធបំលែងដី | 4% | Sale Price × 4% |
| 10 | Property Tax | ពន្ធអចលនទ្រព្យ | 0.1% – 1% | Property Value × Rate |
| 11 | Stamp Tax | ពន្ធស្លាកសម្គាល់ | 0.1% – 1% | Document Value × Rate |

### Sub-national Taxes (ថវិការថ្នាក់ក្រោមជាតិ)

| # | Tax Name | Khmer | Rate | Formula |
|---|----------|-------|------|---------|
| 12 | Public Lighting Tax | ពន្ធអំពីភ្លើងសាធារណៈ | 5% | (Sales ÷ 1.10) ÷ 1.05 × 5% |
| 13 | Accommodation Tax | អាករលើការស្នាក់នៅ | 2% | Invoice ÷ 1.10 × 2% |

---
## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool and dev server
- **JavaScript (JSX)** — No TypeScript, no CSS framework
- **Hash Router** — Client-side routing via `window.location.hash`

## Project Structure

```
├── public/
│   ├── logo_GDOT.png
│   └── logo_ITC.png
├── src/
│   ├── App.jsx      — Router, pages (Home, About, All Taxes, Calculator, Detail), Header, Footer
│   ├── data.js      — Strings (EN/KH), calc functions, tax metadata, theme constants
│   ├── tabs.jsx     — All 13 calculator tab components, shared Row/Table components
│   └── main.jsx     — React entry point
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

- **GitHub Pages:** [https://doeunbunheng.github.io/tax_calcalate/](https://doeunbunheng.github.io/tax_calcalate/)
- **Vercel:** [https://tax-calcalate.vercel.app/](https://tax-calcalate.vercel.app/)

### Deploy Commands

```bash
# GitHub Pages
npm run deploy

# Vercel
vercel --prod
```

## Disclaimer

Tax rates are based on current Cambodian tax law. This tool is for educational reference only. Consult a qualified tax professional for advice.

## License

MIT
