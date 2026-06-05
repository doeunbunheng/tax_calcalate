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

## Taxes Covered

| # | Tax | Rate |
|---|-----|------|
| 1 | Salary Tax | 0%–20% |
| 2 | Prepayment Tax | 1% |
| 3 | VAT | 10% |
| 4 | Special Tax | 3%–35% |
| 5 | Withholding Tax | 4%–15% |
| 6 | Public Lighting Tax | 5% |
| 7 | Accommodation Tax | 2% |
| 8 | Dividend Tax | 15% |
| 9 | Minimum Tax | 0.1% |
| 10 | Rent & Land Tax | 10% |
| 11 | Land Transfer Tax | 4% |
| 12 | Property Tax | 0.1%–1% |
| 13 | Stamp Tax | 0.1%–1% |

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
