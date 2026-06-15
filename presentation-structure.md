# Presentation Structure: Cambodia Tax Calculator

---

## Slide 1 — Title Slide
- **Project:** Cambodia Tax Calculator (ម៉ាស៊ីនគិតពន្ធកម្ពុជា)
- **Subtitle:** ITC Economy for Engineers
- **Your Name / Group**
- **Date**

---

## Slide 2 — Problem & Motivation
- Understanding Cambodia's 18+ taxes is complex for students & entrepreneurs
- No single free tool exists to calculate all taxes in one place
- Need for bilingual (EN/KH) educational resource
- **Goal:** Build an interactive, easy-to-use tax calculator for learning

---

## Slide 3 — Tech Stack
| Technology | Purpose |
|---|---|
| **React 18** | UI framework (components, hooks) |
| **Vite 5** | Build tool & dev server |
| **JavaScript (JSX)** | Development language |
| **Google Fonts** | Inter + Battambang (Khmer) |
| **GitHub Pages** | Deployment |

---

## Slide 4 — Architecture Overview
```
src/
├── main.jsx       → React entry point
├── App.jsx        → Router + 5 pages + Header/Footer
├── data.js        → All strings (EN/KH), calc functions,
│                    TAXES array, colors
└── tabs.jsx       → 18 calculator components
```
- **Hash-based routing** (no React Router)
- **Inline styles** — custom dark theme
- **No external state management** — useState + props only

---

## Slide 5 — 5 Main Pages / Routes
| Route | Page | Purpose |
|---|---|---|
| `#/` | Home | Hero, stats, featured taxes |
| `#/about` | About | Tax overview, glossary |
| `#/taxes` | All Taxes | Searchable & filterable grid |
| `#/calculator/:id` | Calculator | Select + calculate any tax |
| `#/tax/:id` | Tax Detail | Full info + live calculator |

---

## Slide 6 — All 18 Tax Calculators (1/2)

### Income Taxes
1. **Salary Tax** — 0%–20% progressive
2. **Dividend Tax** — 15%
3. **Minimum Tax** — 1% of revenue
4. **Corporate Income Tax** — 20%
5. **Natural Resource Tax** — 30%
6. **QIP Tax** — 0%–20%
7. **Insurance Tax** — 5%–20%
8. **Progressive Individual Tax** — 0%–20%
9. **Annual Tax & Prepayment** — 1%–20%

---

## Slide 7 — All 18 Tax Calculators (2/2)

### Indirect Taxes
10. **VAT** — 10%
11. **Special Tax (Excise)** — 3%–35%

### Transaction Taxes
12. **Rent & Land Tax** — 10%
13. **Stamp Tax (Land Transfer)** — 4%
14. **Property Tax** — 0.1%

### Advance & Withholding
15. **Prepayment Tax** — 1%
16. **Withholding Tax** — 4%–15%

### Sub-national
17. **Public Lighting Tax** — 5%
18. **Accommodation Tax** — 2%

---

## Slide 8 — Key Features
- ✅ **18 interactive calculators** with auto-calculation
- ✅ **Bilingual EN/KH** — instant language toggle
- ✅ **Live results** — updates as you type
- ✅ **Searchable tax grid** with category filter
- ✅ **Detail pages** with formulas, rates, examples
- ✅ **Responsive design** — mobile-friendly
- ✅ **Dark theme UI** with animations
- ✅ **100% free & open source**

---

## Slide 9 — Demo (Live)
- Show the live app: https://doeunbunheng.github.io/tax_calcalate/
- Walk through 2–3 calculators:
  1. Salary Tax (progressive brackets)
  2. VAT (input/output)
  3. Minimum Tax (simple 1% calculation)
- Show language toggle (EN ↔ KH)
- Show search/filter on All Taxes page

---

## Slide 10 — Challenges & Solutions
| Challenge | Solution |
|---|---|
| Complex tax rules for 18 types | Modular calculator per tax |
| Bilingual UI | Single `T` object with EN/KH keys |
| No design framework | Custom dark theme with inline styles |
| Deployment | GitHub Pages with gh-pages package |

---

## Slide 11 — Future Improvements
- Add tax year selector (2024, 2025 rates)
- Export计算结果 as PDF
- Add charts & visualizations
- Backend API for real-time rate updates
- PWA support (offline mode)

---

## Slide 12 — Q&A
- Thank you!
- Links:
  - GitHub: [github.com/doeunbunheng/tax_calcalate](https://github.com/doeunbunheng/tax_calcalate)
  - Live: [doeunbunheng.github.io/tax_calcalate](https://doeunbunheng.github.io/tax_calcalate/)
