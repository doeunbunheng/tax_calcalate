// ═══════════════════════════════════════════════════════════
// STRINGS
// ═══════════════════════════════════════════════════════════
export const T = {
  en: {
    appTitle: "Cambodia Tax Calculator",
    appSub: "ITC Economy for Engineers | 13 Tax Calculators",
    taxes13: "13 Taxes",
    tabs: {
      overview: "Overview", salary: "Salary Tax", prepayment: "Prepayment Tax",
      vat: "VAT", special: "Special Tax", withholding: "Withholding Tax",
      lighting: "Public Lighting Tax", accommodation: "Accommodation Tax",
      dividend: "Dividend Tax", minimum: "Minimum Tax", rent: "Rent & Land Tax",
      landtransfer: "Land Transfer Tax", property: "Property Tax", stamp: "Stamp Tax",
    },
    nav: { home: "Home", about: "About Taxes", allTaxes: "All Taxes", calculator: "Calculator" },
    home: {
      heroTitle: "Cambodia Tax Calculator",
      heroSub: "Your comprehensive guide to all 13 taxes in the Kingdom of Cambodia. Calculate, understand, and comply with Cambodian tax law.",
      heroCta1: "Start Calculating",
      heroCta2: "Learn About Taxes",
      stat1Label: "Tax Calculators", stat1Val: "13",
      stat2Label: "Languages", stat2Val: "2",
      stat3Label: "Tax Categories", stat3Val: "4",
      stat4Label: "Free to Use", stat4Val: "100%",
      featuredTitle: "Popular Tax Calculators",
      featuredSub: "Quick access to the most commonly used tax calculators",
      viewAll: "View All Taxes",
      howTitle: "How It Works",
      howSub: "Three simple steps to calculate your taxes",
      step1Title: "Choose a Tax", step1Desc: "Select from 13 different tax types covering income, indirect, transaction, and advance taxes.",
      step2Title: "Enter Values", step2Desc: "Input your financial data including income, expenses, and applicable deductions.",
      step3Title: "Get Results", step3Desc: "Instantly see your tax liability, effective rate, and net amount with detailed breakdowns.",
      ctaTitle: "Ready to Calculate?",
      ctaDesc: "Use our professional tax calculators to compute your Cambodian tax obligations accurately.",
      ctaBtn: "Open Calculator",
    },
    about: {
      title: "About Cambodia Tax System",
      sub: "Understanding the 13 taxes administered by the General Department of Taxation (GDT)",
      overviewTitle: "Tax System Overview",
      overviewP1: "The Kingdom of Cambodia operates under a modern tax system administered by the General Department of Taxation (GDT) under the Ministry of Economy and Finance. The system includes 13 major taxes that businesses and individuals must understand and comply with.",
      overviewP2: "Cambodia's tax system is designed to generate revenue for public services while promoting economic growth. Tax rates are generally competitive within the ASEAN region, making Cambodia an attractive destination for investment.",
      catTitle: "Tax Categories",
      catSub: "The 13 taxes are organized into 4 main categories",
      cat1Title: "Income Taxes",
      cat1Desc: "Taxes on personal and business income, including salary tax, dividend tax, and minimum tax requirements.",
      cat2Title: "Indirect Taxes",
      cat2Desc: "Taxes on goods and services, including VAT, special excise taxes, public lighting tax, and accommodation tax.",
      cat3Title: "Transaction Taxes",
      cat3Desc: "Taxes on property and asset transactions, including land transfer tax, property tax, stamp tax, and rental income tax.",
      cat4Title: "Advance & Withholding",
      cat4Desc: "Taxes deducted at source or paid in advance, including prepayment tax and withholding tax on various payments.",
      howTitle: "How to Use This Calculator",
      howSteps: [
        { title: "Select a Tax", desc: "Navigate to the specific tax you want to calculate from the All Taxes page or the navigation menu." },
        { title: "Choose Your Status", desc: "Select whether you are a resident or non-resident, as this affects tax rates and deductions." },
        { title: "Enter Financial Data", desc: "Input your income, expenses, or transaction values in the provided fields." },
        { title: "Review Results", desc: "View your calculated tax amount, effective rate, and detailed breakdown of the computation." },
      ],
      glossaryTitle: "Tax Glossary",
      glossary: [
        { term: "Resident", def: "A person who resides in Cambodia for more than 182 days in a tax year." },
        { term: "Non-Resident", def: "A person who does not meet the residency threshold; typically pays flat tax rates." },
        { term: "Tax Base", def: "The amount on which tax is calculated, after exemptions and deductions." },
        { term: "Withholding Tax", def: "Tax deducted by the payer before making payment to the recipient." },
        { term: "VAT", def: "Value Added Tax — 10% on most goods and services in Cambodia." },
        { term: "GDT", def: "General Department of Taxation — the main tax authority in Cambodia." },
        { term: "Progressive Tax", def: "Tax rate increases as the taxable amount increases (used for salary tax)." },
        { term: "Prepayment Tax", def: "Monthly 1% advance payment toward annual profit tax." },
      ],
    },
    allTaxes: {
      title: "All 13 Tax Calculators",
      sub: "Browse and access all available tax calculators",
      searchPlaceholder: "Search taxes...",
      noResults: "No taxes found matching your search.",
      categoryAll: "All",
      categoryIncome: "Income Tax",
      categoryIndirect: "Indirect Tax",
      categoryTransaction: "Transaction Tax",
      categoryAdvance: "Advance & Withholding",
    },
    calculator: {
      title: "Tax Calculator",
      sub: "Select a tax from the sidebar to start calculating",
      selectTax: "Select a Tax",
    },
    detail: {
      backToAll: "Back to All Taxes",
      overview: "Overview",
      whoPays: "Who Pays",
      rate: "Rate",
      due: "Due Date",
      formula: "Formula",
      liveCalc: "Live Calculator",
      prevTax: "Previous Tax",
      nextTax: "Next Tax",
    },
    common: {
      calculator: "Calculator",
      example: "Example",
      rate: "Rate",
      formula: "Formula",
      taxRate: "Tax Rate",
      taxAmount: "Tax Amount",
      netAmount: "Net Amount",
      total: "Total",
      due: "Due",
      whoPayS: "Who pays",
    },
    salary: {
      title: "Salary Tax Calculator", sub: "Calculate progressive tax on monthly salary with dependant and fringe benefit deductions.",
      whoPays: "Who Pays", whoPaysVal: "Employers withhold from employee salary.",
      resident: "Resident", residentVal: "0%–20% progressive. Deduct 150,000 KHR per dependant.",
      nonResident: "Non-Resident", nonResidentVal: "Flat 20% — no deductions.",
      due: "Due", dueVal: "20th of following month.",
      calcTitle: "Salary Tax Calculator",
      residentStatus: "Resident Status",
      residentOpt: "Resident — Progressive Rate", nonResidentOpt: "Non-Resident — Flat 20%",
      grossSalary: "Gross Monthly Salary (KHR)",
      nonWorkingSpouse: "Non-Working Spouse", noSpouse: "No", yesSpouse: "Yes",
      children: "Number of Children (under 14)", childHint: "150,000 KHR deduction per dependant.",
      benefits: "Fringe Benefits (taxed at 20%)", benefitHint: "Enter the monthly amount for each benefit type.",
      riceAllowance: "Rice / Food Allowance",
      housingAllowance: "Housing Allowance",
      transportAllowance: "Transport Allowance",
      phoneAllowance: "Phone Allowance",
      medicalAllowance: "Medical Allowance",
      otherBenefits: "Other Benefits",
      calcBtn: "Calculate Salary Tax",
      grossLabel: "Gross Salary", deductionLabel: "Dependant Deduction",
      taxableLabel: "Taxable Salary",
      netLabel: "Net Salary After Tax", rateLabel: "Effective Tax Rate",
      bracketsTitle: "Tax Brackets (Resident)",
      fringeTaxLabel: "Fringe Benefits Tax",
      benefitNote: "Travel (per labor law), Uniform (all staff), and NSSF contributions are exempt from fringe benefit tax.",
    },
    prepayment: {
      title: "Prepayment Tax Calculator", sub: "Monthly 1% advance payment toward annual profit tax.",
      formula: "Formula", formulaVal: "Base = Revenue / 1.1 → Tax = Base × 1%",
      whoPays: "Who Pays", whoPaysVal: "Enterprises registered for VAT.",
      due: "Due", dueVal: "1st–20th of following month.",
      calcTitle: "Prepayment Tax", revenueLabel: "Total Revenue Including VAT (KHR)",
      calcBtn: "Calculate", revenueRow: "Revenue (incl. VAT)",
      baseRow: "Tax Base (/ 1.10)", taxRow: "Prepayment Tax (1%)",
      creditRow: "Credit Against Profit Tax",
    },
    vat: {
      title: "VAT Calculator", sub: "Value Added Tax — 10% on taxable supplies.",
      standardRate: "Standard Rate", zero: "Zero", exempt: "Exempt",
      calcTitle: "VAT Calculator",
      mode: "Calculation Mode",
      salesMode: "Sales & Purchases", importMode: "Import (CIF + VAT)",
      salesLabel: "Total Sales (ex-VAT)", purchaseLabel: "Total Purchases (ex-VAT)",
      cifLabel: "CIF Value (KHR)", calcBtn: "Calculate VAT",
      ratesTitle: "VAT Rate Reference",
    },
    withholding: {
      title: "Withholding Tax Calculator", sub: "Tax deducted at source on various payments.",
      formula: "Formula", formulaVal: "WHT = Gross × Rate",
      net: "Net", netVal: "Recipient receives Gross − WHT.",
      residentRates: "Resident Rates", residentRatesVal: "Services/Royalties/Interest 15%, Rental 10%, Fixed deposit 6%, Non-fixed 4%.",
      nonResidentRate: "Non-Resident Rate", nonResidentRateVal: "Flat 14% on all payments.",
      calcTitle: "WHT Calculator",
      recipientType: "Recipient Type", residentOpt: "Resident", nonResidentOpt: "Non-Resident",
      category: "Payment Category",
      grossLabel: "Gross Payment Amount (KHR)", calcBtn: "Calculate WHT",
      rateRef: "Rate Reference",
      residents: "Residents", nonResidents: "Non-Residents",
      exemptions: "Exempt: insurance premiums, interest on NSSF, qualifying bonds.",
      dueNote: "Due: 15th of following month. File monthly return.",
    },
  },
  kh: {
    appTitle: "ម៉ាស៊ីនគិតពន្ធកម្ពុជា",
    appSub: "ITC សេដ្ឋកិច្ចសម្រាប់វិស្វករ | ម៉ាស៊ីនគិតពន្ធ ១៣ ប្រភេទ",
    taxes13: "ពន្ធ ១៣",
    tabs: {
      overview: "ទិដ្ឋភាពទូទៅ", salary: "ពន្ធបៀវត្ស", prepayment: "ប្រាក់រំដោះពន្ធ",
      vat: "អាករ VAT", special: "អាករពិសេស", withholding: "ពន្ធកាត់ទុក",
      lighting: "ពន្ធភ្លើងសាធារណៈ", accommodation: "អាករស្នាក់នៅ",
      dividend: "ពន្ធភាគលាភ", minimum: "ពន្ធអប្បបរមា", rent: "ពន្ធជួលដី",
      landtransfer: "ពន្ធផ្ទេរដី", property: "ពន្ធអចលនទ្រព្យ", stamp: "ពន្ធប្រថាប់ត្រា",
    },
    nav: { home: "ទំព័រដើម", about: "អំពីពន្ធ", allTaxes: "ពន្ធទាំងអស់", calculator: "ម៉ាស៊ីនគិតពន្ធ" },
    home: {
      heroTitle: "ម៉ាស៊ីនគិតពន្ធកម្ពុជា",
      heroSub: "មគ្គុទ្ទេសក៍ពេញលេញសម្រាប់ពន្ធទាំង ១៣ នៅព្រះរាជាណាចក្រកម្ពុជា។ គណនា យល់ និងអនុវត្តច្បាប់ពន្ធកម្ពុជា។",
      heroCta1: "ចាប់ផ្ដើមគណនា",
      heroCta2: "សិក្សាអំពីពន្ធ",
      stat1Label: "ម៉ាស៊ីនគិតពន្ធ", stat1Val: "១៣",
      stat2Label: "ភាសា", stat2Val: "២",
      stat3Label: "ប្រភេទពន្ធ", stat3Val: "៤",
      stat4Label: "ឥតគិតថ្លៃ", stat4Val: "១០០%",
      featuredTitle: "ម៉ាស៊ីនគិតពន្ធពេញនិយម",
      featuredSub: "ចូលដំណើរការរហ័សទៅម៉ាស៊ីនគិតពន្ធដែលប្រើប្រាស់ញឹកញាប់បំផុត",
      viewAll: "មើលពន្ធទាំងអស់",
      howTitle: "របៀបដំណើរការ",
      howSub: "ជំហាន ៣ យ៉ាងសម្រាប់គណនាពន្ធរបស់អ្នក",
      step1Title: "ជ្រើសរើសពន្ធ", step1Desc: "ជ្រើសរើសពីប្រភេទពន្ធផ្សេងៗគ្នា ១៣ រួមមានពន្ធលើចំណូល ពន្ធប្រយោដន និងពន្ធបង់ជាមុន។",
      step2Title: "បញ្ចូលទឹកប្រាក់", step2Desc: "បញ្ចូលទិន្នន័យហិរញ្ញវត្ថុរបស់អ្នករួមមានចំណូល ចំណាយ និងការដកលើកលែង។",
      step3Title: "ទទួលលទ្ធផល", step3Desc: "មើលភ្លាមៗពន្ធដែលត្រូវបង់ អត្រាពន្ធជាក់ស្តែង និងចំនួនសុទ្ធជាមួយការបំបែកលម្អិត។",
      ctaTitle: "ត្រៀមគណនាហើយឬនៅ?",
      ctaDesc: "ប្រើម៉ាស៊ីនគិតពន្ធវិជ្ជាជីវៈរបស់យើងដើម្បីគណនាកាតព្វកិច្ចពន្ធកម្ពុជារបស់អ្នក។",
      ctaBtn: "បើកម៉ាស៊ីនគិតពន្ធ",
    },
    about: {
      title: "អំពីប្រព័ន្ធពន្ធកម្ពុជា",
      sub: "យល់ដឹងពីពន្ធទាំង ១៣ ដែលគ្រប់គ្រងដោយអគ្គនាយកដ្ឋានពន្ធនិងអាករ",
      overviewTitle: "ទិដ្ឋភាពទូទៅនៃប្រព័ន្ធពន្ធ",
      overviewP1: "ព្រះរាជាណាចក្រកម្ពុជាប្រើប្រាស់ប្រព័ន្ធពន្ធទំនើបដែលគ្រប់គ្រងដោយអគ្គនាយកដ្ឋានពន្ធនិងអាករ (GDT) ក្រោមក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ។ ប្រព័ន្ធនេះរួមមានពន្ធធំ ១៣ ប្រភេទដែលធុរកិច្ច និងបុគ្គលត្រូវយល់ដឹង និងអនុវត្ត។",
      overviewP2: "ប្រព័ន្ធពន្ធកម្ពុជាត្រូវបានរចនាឡើងដើម្បីបង្កើតចំណូលសម្រាប់សេវាសាធារណៈ ខណៈពេលផ្សព្វផ្សាយកំណើនសេដ្ឋកិច្ច។ អត្រាពន្ធជាទូទៅមានការប្រកួតប្រជែងក្នុងតំបន់អាស៊ាន។",
      catTitle: "ប្រភេទពន្ធ",
      catSub: "ពន្ធទាំង ១៣ ត្រូវបានរៀបចំជា ៤ ប្រភេទសំខាន់",
      cat1Title: "ពន្ធលើចំណូល",
      cat1Desc: "ពន្ធលើចំណូលបុគ្គល និងអាជីវកម្ម រួមមានពន្ធបៀវត្ស ពន្ធភាគលាភ និងពន្ធអប្បបរមា។",
      cat2Title: "ពន្ធប្រយោដន",
      cat2Desc: "ពន្ធលើទំនិញ និងសេវា រួមមាន VAT អាករពិសេស ពន្ធភ្លើងសាធារណៈ និងអាករស្នាក់នៅ។",
      cat3Title: "ពន្ធលើប្រតិបត្តិការ",
      cat3Desc: "ពន្ធលើអចលនទ្រព្យ និងប្រតិបត្តិការសកម្មភាព រួមមានពន្ធផ្ទេរដី ពន្ធអចលនទ្រព្យ ពន្ធប្រថាប់ត្រា និងពន្ធលើប្រាក់ជួល។",
      cat4Title: "ពន្ធបង់ជាមុន និងកាត់ទុក",
      cat4Desc: "ពន្ធដែលកាត់នៅប្រភព ឬបង់ជាមុន រួមមានប្រាក់រំដោះពន្ធ និងពន្ធកាត់ទុក។",
      howTitle: "របៀបប្រើប្រាស់ម៉ាស៊ីនគិតពន្ធនេះ",
      howSteps: [
        { title: "ជ្រើសរើសពន្ធ", desc: "រុញទៅពន្ធដែលអ្នកចង់គណនាពីទំព័រពន្ធទាំងអស់ ឬម៉ឺនុយ។" },
        { title: "ជ្រើសរើសស្ថានភាព", desc: "ជ្រើសរើសថាអ្នកជានិវាសនជន ឬអនិវាសនជន ព្រោះវាប៉ះពាល់អត្រា និងការដកលើកលែង។" },
        { title: "បញ្ចូលទិន្នន័យ", desc: "បញ្ចូលចំណូល ចំណាយ ឬតម្លៃប្រតិបត្តិការក្នុងវាលដែលផ្តល់។" },
        { title: "ពិនិត្យមើលលទ្ធផល", desc: "មើលចំនួនពន្ធដែលគណនាបាន អត្រាពន្ធ និងការបំបែកលម្អិតនៃការគណនា។" },
      ],
      glossaryTitle: "វចនានុក្រមពន្ធ",
      glossary: [
        { term: "និវាសនជន", def: "បុគ្គលដែលស្នាក់នៅកម្ពុជាលើសពី ១៨២ ថ្ងៃក្នុងឆ្នាំពន្ធ។" },
        { term: "អនិវាសនជន", def: "បុគ្គលដែលមិនបំពេញលក្ខណៈសម្បត្តិស្នាក់នៅ; ជាទូទៅបង់អត្រាពន្ធថេរ។" },
        { term: "មូលដ្ឋានពន្ធ", def: "ចំនួនដែលពន្ធគណនាលើ បន្ទាប់ពីការលើកលែង និងការដក។" },
        { term: "ពន្ធកាត់ទុក", def: "ពន្ធដែលអ្នកបង់ប្រាក់កាត់ទុកមុនពេលផ្តល់ប្រាក់។" },
        { term: "VAT", def: "អាករលើតម្លៃបន្ថែម — ១០% លើទំនិញ និងសេវាភាគច្រើននៅកម្ពុជា។" },
        { term: "GDT", def: "អគ្គនាយកដ្ឋានពន្ធនិងអាករ — ស្ថាប័នពន្ធរបស់រដ្ឋាភិបាលកម្ពុជា។" },
        { term: "ពន្ធជាន់ថ្នាក់", def: "អត្រាពន្ធកើនឡើងនៅពេលចំនួនជាប់ពន្ធកើនឡើង (ប្រើសម្រាប់ពន្ធបៀវត្ស)។" },
        { term: "ប្រាក់រំដោះពន្ធ", def: "ការបង់ជាមុនប្រចាំខែ ១% សម្រាប់ពន្ធចំណេញប្រចាំឆ្នាំ។" },
      ],
    },
    allTaxes: {
      title: "ម៉ាស៊ីនគិតពន្ធទាំង ១៣",
      sub: "រុករក និងចូលដំណើរការម៉ាស៊ីនគិតពន្ធទាំងអស់",
      searchPlaceholder: "ស្វែងរកពន្ធ...",
      noResults: "រកមិនឃើញពន្ធដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
      categoryAll: "ទាំងអស់",
      categoryIncome: "ពន្ធលើចំណូល",
      categoryIndirect: "ពន្ធប្រយោដន",
      categoryTransaction: "ពន្ធលើប្រតិបត្តិការ",
      categoryAdvance: "ពន្ធបង់ជាមុន និងកាត់ទុក",
    },
    calculator: {
      title: "ម៉ាស៊ីនគិតពន្ធ",
      sub: "ជ្រើសរើសពន្ធពីរបារចំហៀងដើម្បីចាប់ផ្ដើមគណនា",
      selectTax: "ជ្រើសរើសពន្ធ",
    },
    detail: {
      backToAll: "ត្រឡប់ទៅពន្ធទាំងអស់",
      overview: "ទិដ្ឋភាពទូទៅ",
      whoPays: "អ្នកបង់ពន្ធ",
      rate: "អត្រា",
      due: "កាលបរិច្ឆេទ",
      formula: "រូបមន្ត",
      liveCalc: "ម៉ាស៊ីនគិតពន្ធផ្ទាល់",
      prevTax: "ពន្ធមុន",
      nextTax: "ពន្ធបន្ទាប់",
    },
    common: {
      calculator: "ម៉ាស៊ីនគិតពន្ធ",
      example: "ឧទាហរណ៍",
      rate: "អត្រា",
      formula: "រូបមន្ត",
      taxRate: "អត្រាពន្ធ",
      taxAmount: "ចំនួនពន្ធ",
      netAmount: "ចំនួនសុទ្ធ",
      total: "សរុប",
      due: "កាលបរិច្ឆេទ",
      whoPayS: "អ្នកបង់ពន្ធ",
    },
    salary: {
      title: "ម៉ាស៊ីនគិតពន្ធបៀវត្ស", sub: "គណនាពន្ធបៀវត្សតាមជាន់ថ្នាក់ ជាមួយការដកណ និងអត្ថប្រយោជន៍។",
      whoPays: "អ្នកបង់", whoPaysVal: "និយោជកកាត់ទុកពីប្រាក់ខែនិយោជិត។",
      resident: "និវាសនជន", residentVal: "០%–២០% តាមជាន់ថ្នាក់។ ដក ១៥០,០០០ ក្នុងម្នាក់។",
      nonResident: "អនិវាសនជន", nonResidentVal: "អត្រាថេរ ២០% គ្មានការដក។",
      due: "កាលបរិច្ឆេទ", dueVal: "ថ្ងៃទី ២០ នៃខែបន្ទាប់។",
      calcTitle: "ម៉ាស៊ីនគិតពន្ធបៀវត្ស",
      residentStatus: "ស្ថានភាពនិវាសនជន",
      residentOpt: "និវាសនជន — អត្រាតាមជាន់", nonResidentOpt: "អនិវាសនជន — ២០%",
      grossSalary: "ប្រាក់ខែសរុប (រៀល)",
      nonWorkingSpouse: "ប្តី/ប្រពន្ធគ្មានការងារ", noSpouse: "ទេ", yesSpouse: "បាទ/ចាស",
      children: "ចំនួនកូន (អាយុក្រោម ១៤ ឆ្នាំ)", childHint: "ដក ១៥០,០០០ រៀល ក្នុងម្នាក់។",
      benefits: "អត្ថប្រយោជន៍ (ពន្ធ ២០%)", benefitHint: "បញ្ចូលចំនួនប្រចាំខែសម្រាប់ប្រភេទនីមួយៗ។",
      riceAllowance: "ប្រាក់ឧបត្ថម្ភម្ហូប",
      housingAllowance: "ប្រាក់ឧបត្ថម្ភលំនៅ",
      transportAllowance: "ប្រាក់ឧបត្ថម្ភដឹកជញ្ជូន",
      phoneAllowance: "ប្រាក់ទូរស័ព្ទ",
      medicalAllowance: "ប្រាក់ពេទ្យ",
      otherBenefits: "អត្ថប្រយោជន៍ផ្សេង",
      calcBtn: "គណនាពន្ធបៀវត្ស",
      grossLabel: "ប្រាក់ខែសរុប", deductionLabel: "ការដកអ្នកនៅក្នុងបន្ទុក",
      taxableLabel: "ប្រាក់ជាប់ពន្ធ",
      netLabel: "ប្រាក់ខែសុទ្ធ", rateLabel: "អត្រាពន្ធជាក់ស្តែង",
      bracketsTitle: "តារាងពន្ធ (និវាសនជន)",
      fringeTaxLabel: "ពន្ធអត្ថប្រយោជន៍",
      benefitNote: "ប្រាក់ធ្វើដំណើរ ឯកសណ្ឋាន និង NSSF មិនជាប់ពន្ធអត្ថប្រយោជន៍ទេ។",
    },
    prepayment: {
      title: "ម៉ាស៊ីនគិតប្រាក់រំដោះពន្ធ", sub: "ការបង់ជាមុន ១% ប្រចាំខែសម្រាប់ពន្ធចំណេញ។",
      formula: "រូបមន្ត", formulaVal: "Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%",
      whoPays: "អ្នកបង់", whoPaysVal: "សហគ្រាសដែលបានចុះ VAT ។",
      due: "កាលបរិច្ឆេទ", dueVal: "ថ្ងៃទី ១–២០ នៃខែបន្ទាប់។",
      calcTitle: "ប្រាក់រំដោះពន្ធ", revenueLabel: "ចំណូលសរុបរួមទាំង VAT (រៀល)",
      calcBtn: "គណនា", revenueRow: "ចំណូល (រួម VAT)",
      baseRow: "មូលដ្ឋាន (/ ១.១០)", taxRow: "ពន្ធ (១%)",
      creditRow: "ឥណទានទល់នឹងពន្ធចំណេញ",
    },
    vat: {
      title: "ម៉ាស៊ីនគិត VAT", sub: "អាករលើតម្លៃបន្ថែម — ១០% លើការផ្គត់ផ្គង់។",
      standardRate: "អត្រាស្តង់ដា", zero: "សូន្យ", exempt: "លើកលែង",
      calcTitle: "ម៉ាស៊ីនគិត VAT",
      mode: "របៀបគណនា",
      salesMode: "លក់ និង ទិញ", importMode: "នាំចូល (CIF + VAT)",
      salesLabel: "លក់សរុប (មុន VAT)", purchaseLabel: "ទិញសរុប (មុន VAT)",
      cifLabel: "តម្លៃ CIF (រៀល)", calcBtn: "គណនា VAT",
      ratesTitle: "តារាងអត្រា VAT",
    },
    withholding: {
      title: "ម៉ាស៊ីនគិតពន្ធកាត់ទុក", sub: "ពន្ធកាត់ទុកនៅប្រភពលើការទូទាត់ផ្សេងៗ។",
      formula: "រូបមន្ត", formulaVal: "WHT = ប្រាក់ × អត្រា",
      net: "សុទ្ធ", netVal: "អ្នកទទួលទទួលបាន Gross − WHT ។",
      residentRates: "អត្រានិវាសនជន", residentRatesVal: "សេវា ១៥%, ជួល ១០%, ប្រាក់ថេរ ៦%, មិនថេរ ៤%។",
      nonResidentRate: "អត្រាអនិវាសនជន", nonResidentRateVal: "១៤% លើគ្រប់ការទូទាត់។",
      calcTitle: "ម៉ាស៊ីនគិត WHT",
      recipientType: "ប្រភេទអ្នកទទួល", residentOpt: "និវាសនជន", nonResidentOpt: "អនិវាសនជន",
      category: "ប្រភេទការទូទាត់",
      grossLabel: "ប្រាក់ទូទាត់សរុប (រៀល)", calcBtn: "គណនា WHT",
      rateRef: "តារាងអត្រា",
      residents: "និវាសនជន", nonResidents: "អនិវាសនជន",
      exemptions: "លើកលែង: បុព្វលាភធានារ៉ាប់រង NSSF និងសញ្ញាប័ណ្ណគុណភាព។",
      dueNote: "កំណត់: ថ្ងៃទី ១៥ នៃខែបន្ទាប់។",
    },
  },
};

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════
export const navy = "#0B1E3D";
export const card = "#162E55";
export const gold = "#D4A843";
export const gold2 = "#F0C96A";
export const red = "#E63946";
export const green = "#27AE60";
export const muted = "#7A9CC4";
export const white = "#F0F4FF";
export const border = "rgba(212,168,67,0.2)";

// ═══════════════════════════════════════════════════════════
// CALC FUNCTIONS
// ═══════════════════════════════════════════════════════════
export function calcSalaryTax(salary, deps) {
  const taxable = Math.max(0, salary - deps * 150000);
  let tax = 0;
  if      (taxable <= 1500000)  tax = 0;
  else if (taxable <= 2000000)  tax = taxable * 0.05  - 75000;
  else if (taxable <= 8500000)  tax = taxable * 0.10  - 175000;
  else if (taxable <= 12500000) tax = taxable * 0.15  - 600000;
  else                          tax = taxable * 0.20  - 1225000;
  return { taxable, tax: Math.max(0, tax), net: salary - Math.max(0, tax) };
}
export function calcNonResidentTax(salary) { const tax = salary * 0.20; return { tax, net: salary - tax }; }
export function calcPrepaymentTax(rev)     { const base = rev / 1.1; return { base, tax: base * 0.01 }; }
export function calcSalesVAT(p)            { return { vat: p * 0.10, total: p * 1.10 }; }
export function calcImportVAT(cif)         { return { vat: cif * 0.10, total: cif * 1.10 }; }
export function calcSpecialFirstSeller(p, r)  { const base = (p/1.10)/1.05; return { base, tax: base*r }; }
export function calcSpecialReseller(p)        { const base = ((p/1.10)/1.05)*0.20; return { base, tax: base*0.05 }; }
export function calcSpecialLocal(p, r)        { const base = 0.90*(p/1.10/(1+r)); return { base, tax: base*r }; }
export function calcWHT(g, r)              { const wht = g*(r/100); return { wht, net: g-wht }; }
export function calcLighting(p)            { const base = (p/1.10)/1.05; return { base, tax: base*0.05 }; }
export function calcAccom(p)               { const base = p/1.10; return { base, tax: base*0.02 }; }
export function calcDividend(a)            { const tax = a*0.15; return { tax, net: a-tax }; }
export function calcMinTax(r)              { return { tax: r*0.001 }; }
export function calcRent(i)                { const tax = i*0.10; return { tax, net: i-tax }; }
export function calcLandTransfer(v)        { return { tax: v*0.04 }; }
export function calcPropertyTax(v, r)      { return { tax: v*(r/100) }; }
export function calcStampTax(v, r)         { return { tax: v*(r/100) }; }

export const fmt = (n) => Math.round(n || 0).toLocaleString("en-US") + " ៛";

// ═══════════════════════════════════════════════════════════
// TAX METADATA
// ═══════════════════════════════════════════════════════════
export const TAXES = [
  { id: "salary", en: "Salary Tax", kh: "ពន្ធលើប្រាក់បៀវត្ស", cat: "income", icon: "", rate: "0%–20%", due: "20th of following month", formulaEn: "Taxable = Gross − (Deps × 150,000) → Tax = Taxable × Rate − Offset", formulaKh: "ជាប់ពន្ធ = ប្រាក់ − (ណ × ១៥០,០០០) → ពន្ធ = ជាប់ × អត្រា", defEn: "Monthly progressive tax withheld by employer. Residents: 0%–20% with dependant deductions. Non-residents: flat 20%.", defKh: "ពន្ធប្រចាំខែ ០%–២០%។ ដក ១៥០,០០០ ៛ ក្នុង ១ ណ។ អនិវាសនជន ២០% ថេរ។" },
  { id: "prepayment", en: "Prepayment Tax", kh: "ប្រាក់រំដោះពន្ធ", cat: "advance", icon: "", rate: "1%", due: "1st–20th of following month", formulaEn: "Base = Revenue / 1.1 → Tax = Base × 1%", formulaKh: "Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%", defEn: "Monthly 1% advance credited against annual profit tax.", defKh: "ពន្ធ ១% ប្រចាំខែ ដើម្បីរំដោះពន្ធចំណេញ។" },
  { id: "vat", en: "VAT", kh: "អាករលើតម្លៃបន្ថែម", cat: "indirect", icon: "", rate: "10%", due: "20th of following month", formulaEn: "Net VAT = Output VAT − Input VAT", formulaKh: "VAT = Output − Input", defEn: "10% on taxable supplies. Net VAT = Output VAT minus Input VAT.", defKh: "១០% លើការផ្គត់ផ្គង់ជាប់អាករ។ VAT សុទ្ធ = Output − Input។" },
  { id: "special", en: "Special Tax", kh: "អាករពិសេស", cat: "indirect", icon: "", rate: "3%–35%", due: "20th of following month", formulaEn: "Base × Rate (3 calculation methods)", formulaKh: "Base × អត្រា (៣ វិធីគណនា)", defEn: "Excise tax on alcohol (35%), beer (30%), cigarettes (20%), soft drinks (10%), cement (5%), services (3–10%).", defKh: "ស្រា ៣៥%, បៀរ ៣០%, បារី ២០%, ភេសជ្ជៈ ១០%, ស៊ីម៉ង់ ៥%, សេវា ៣%–១០%។" },
  { id: "withholding", en: "Withholding Tax", kh: "ពន្ធកាត់ទុក", cat: "advance", icon: "", rate: "4%–15%", due: "15th of following month", formulaEn: "WHT = Gross × Rate", formulaKh: "ពន្ធ = ប្រាក់ × អត្រា", defEn: "Deducted at source: Services/Royalties/Interest 15%, Rental 10%, Fixed deposit 6%, Non-fixed 4%, Non-resident 14%.", defKh: "កាត់ទុក: សេវា/ការប្រាក់ ១៥%, ជួល ១០%, ប្រាក់ ៦%, ៤%, ១៤%។" },
  { id: "lighting", en: "Public Lighting Tax", kh: "ពន្ធភ្លើងសាធារណៈ", cat: "indirect", icon: "", rate: "5%", due: "20th of following month", formulaEn: "(Sales / 1.10) / 1.05 × 5%", formulaKh: "(លក់ / ១.១) / ១.០៥ × ៥%", defEn: "5% sub-national tax on goods. Base removes VAT and Special Tax.", defKh: "ពន្ធ ៥% ថ្នាក់ក្រោមជាតិ។ មូលដ្ឋានដក VAT និងអាករពិសេស។" },
  { id: "accommodation", en: "Accommodation Tax", kh: "អាករស្នាក់នៅ", cat: "indirect", icon: "", rate: "2%", due: "20th of following month", formulaEn: "Invoice / 1.10 × 2%", formulaKh: "វិក្កយបត្រ / ១.១ × ២%", defEn: "2% on hotel and guesthouse room charges.", defKh: "២% លើការស្នាក់នៅ។" },
  { id: "dividend", en: "Dividend Tax", kh: "ពន្ធភាគលាភ", cat: "income", icon: "", rate: "15%", due: "When distributed", formulaEn: "Dividend × 15%", formulaKh: "ភាគលាភ × ១៥%", defEn: "15% on profit distributed as dividends.", defKh: "១៥% លើភាគលាភ។" },
  { id: "minimum", en: "Minimum Tax", kh: "ពន្ធអប្បបរមា", cat: "income", icon: "", rate: "0.1%", due: "Annual filing", formulaEn: "Revenue × 0.1% (pay higher of this or Profit Tax)", formulaKh: "ចំណូល × ០.១% (បង់ខ្ពស់ជាងពន្ធចំណេញ)", defEn: "Ensures all enterprises pay at least 0.1% of gross annual revenue.", defKh: "ពន្ធអប្បបរមា ០.១% នៃចំណូលប្រចាំឆ្នាំ។" },
  { id: "rent", en: "Rent & Land Tax", kh: "ពន្ធជួលដីនិងអចលន", cat: "transaction", icon: "", rate: "10%", due: "Monthly", formulaEn: "Rental Income × 10%", formulaKh: "ប្រាក់ជួល × ១០%", defEn: "10% on rental income from property and land.", defKh: "១០% លើប្រាក់ចំណូលពីការជួល។" },
  { id: "landtransfer", en: "Land Transfer Tax", kh: "ពន្ធផ្ទេរកម្មសិទ្ធិដី", cat: "transaction", icon: "", rate: "4%", due: "At transfer", formulaEn: "Sale Price × 4%", formulaKh: "តម្លៃ × ៤%", defEn: "4% on sale price when transferring land or property ownership.", defKh: "៤% លើតម្លៃលក់ពេលផ្ទេរកម្មសិទ្ធិ។" },
  { id: "property", en: "Property Tax", kh: "ពន្ធអចលនទ្រព្យ", cat: "transaction", icon: "", rate: "0.1%–1%", due: "Annual", formulaEn: "Property Value × Rate (0.1%–1%)", formulaKh: "តម្លៃ × អត្រា (០.១%–១%)", defEn: "Annual tax on property value at 0.1% to 1%.", defKh: "ពន្ធប្រចាំឆ្នាំ ០.១% ដល់ ១% លើអចលនទ្រព្យ។" },
  { id: "stamp", en: "Stamp Tax", kh: "ពន្ធប្រថាប់ត្រា", cat: "transaction", icon: "", rate: "0.1%–1%", due: "At execution", formulaEn: "Document Value × Rate (0.1%–1%)", formulaKh: "តម្លៃ × អត្រា (០.១%–១%)", defEn: "0.1% to 1% on official documents, contracts, and transfers.", defKh: "០.១% ដល់ ១% លើឯកសារផ្លូវការ។" },
];

export const CATEGORIES = [
  { id: "all", en: "All Taxes", kh: "ពន្ធទាំងអស់", icon: "" },
  { id: "income", en: "Income Tax", kh: "ពន្ធលើចំណូល", icon: "" },
  { id: "indirect", en: "Indirect Tax", kh: "ពន្ធប្រយោដន", icon: "" },
  { id: "transaction", en: "Transaction Tax", kh: "ពន្ធលើប្រតិបត្តិការ", icon: "" },
  { id: "advance", en: "Advance & Withholding", kh: "ពន្ធបង់ជាមុន និងកាត់ទុក", icon: "" },
];
