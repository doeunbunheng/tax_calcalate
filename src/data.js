// ═══════════════════════════════════════════════════════════
// STRINGS
// ═══════════════════════════════════════════════════════════
export const T = {
  en: {
    appTitle: "Cambodia Tax Calculator",
    appSub: "ITC Economy for Engineers | 18 Tax Calculators",
    taxes18: "18 Taxes",
    tabs: {
      overview: "Overview", salary: "Salary Tax",       prepayment: "Tax Per Month",
      vat: "VAT", special: "Special Tax", withholding: "Withholding Tax",
      lighting: "Public Lighting Tax", accommodation: "Accommodation Tax",
      dividend: "Dividend Tax", minimum: "Minimum Tax", rent: "Rent & Land Tax",
      landtransfer: "Stamp Tax", property: "Property Tax",
      annual: "Annual Tax & Prepayment",
    },
    nav: { home: "Home", about: "About Taxes", allTaxes: "All Taxes", calculator: "Calculator" },
    home: {
      heroTitle: "Cambodia Tax Calculator",
      heroSub: "Your comprehensive guide to all 18 taxes in the Kingdom of Cambodia. Calculate, understand, and comply with Cambodian tax law.",
      heroCta1: "Start Calculating",
      heroCta2: "Learn About Taxes",
      stat1Label: "Tax Calculators", stat1Val: "18",
      stat2Label: "Languages", stat2Val: "2",
      stat3Label: "Tax Categories", stat3Val: "4",
      stat4Label: "Free to Use", stat4Val: "100%",
      featuredTitle: "Popular Tax Calculators",
      featuredSub: "Quick access to the most commonly used tax calculators",
      viewAll: "View All Taxes",
      howTitle: "How It Works",
      howSub: "Three simple steps to calculate your taxes",
      step1Title: "Choose a Tax", step1Desc: "Select from 18 different tax types covering income, indirect, transaction, and advance taxes.",
      step2Title: "Enter Values", step2Desc: "Input your financial data including income, expenses, and applicable deductions.",
      step3Title: "Get Results", step3Desc: "Instantly see your tax liability, effective rate, and net amount with detailed breakdowns.",
      ctaTitle: "Ready to Calculate?",
      ctaDesc: "Use our professional tax calculators to compute your Cambodian tax obligations accurately.",
      ctaBtn: "Open Calculator",
    },
    about: {
      title: "About Cambodia Tax System",
      sub: "Understanding the 18 taxes administered by the General Department of Taxation (GDT)",
      overviewTitle: "Tax System Overview",
      overviewP1: "The Kingdom of Cambodia operates under a modern tax system administered by the General Department of Taxation (GDT) under the Ministry of Economy and Finance. The system includes 18 major taxes that businesses and individuals must understand and comply with.",
      overviewP2: "Cambodia's tax system is designed to generate revenue for public services while promoting economic growth. Tax rates are generally competitive within the ASEAN region, making Cambodia an attractive destination for investment.",
      catTitle: "Tax Categories",
      catSub: "The 18 taxes are organized into 4 main categories",
      cat1Title: "Income Taxes",
      cat1Desc: "Taxes on personal and business income, including salary tax, dividend tax, and minimum tax requirements.",
      cat2Title: "Indirect Taxes",
      cat2Desc: "Taxes on goods and services, including VAT, special excise taxes, public lighting tax, and accommodation tax.",
      cat3Title: "Transaction Taxes",
      cat3Desc: "Taxes on property and asset transactions, including land transfer tax, property tax, and rental income tax.",
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
      title: "All 18 Tax Calculators",
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
      title: "Tax Per Month Calculator", sub: "Monthly 1% advance payment toward annual profit tax.",
      formula: "Formula", formulaVal: "Base = Revenue / 1.1 → Tax = Base × 1%",
      whoPays: "Who Pays", whoPaysVal: "Enterprises registered for VAT.",
      due: "Due", dueVal: "1st–20th of following month.",
      calcTitle: "Tax Per Month",
      monthLabels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      monthCol: "Month", revenueCol: "Revenue (incl. VAT)", baseCol: "Base (/1.10)",
      prepaymentCol: "Tax (1%)",
      calcBtn: "Calculate",
      exampleNote: "If monthly revenue = 11,000,000 KHR (incl. VAT):",
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
    annual: {
      title: "Annual Tax & Prepayment Calculator",
      sub: "Calculate annual tax liability with monthly income inputs, expenses, and minimum tax logic.",
      formula: "Formula", formulaVal: "Annual Net Profit = Total Revenue − Total Expenses → Tax = Max(Income Tax, Minimum Tax) − Prepayment Credits",
      whoPays: "Who Pays", whoPaysVal: "Enterprises subject to annual profit tax and prepayment tax.",
      due: "Due", dueVal: "Annual filing. Prepayment due 1st–20th of following month.",
      calcTitle: "Annual Tax & Prepayment Calculator",
      includesVAT: "Include VAT in Revenue",
      yesVAT: "Yes (revenue includes 10% VAT)",
      revenue: "Monthly Revenue (KHR)",
      expenses: "Annual Expenses (KHR)",
      monthLabels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      calcBtn: "Calculate Annual Tax",
      monthCol: "Month", revenueCol: "Revenue", baseCol: "Base (/1.10)",
      prepaymentCol: "Prepayment (1%)",
      summaryTitle: "Annual Summary",
      totalRevenue: "Total Revenue",
      totalBase: "Total Base",
      netProfit: "Annual Net Profit",
      incomeTax: "Income Tax (20% of profit)",
      minimumTax: "Minimum Tax (1% of base)",
      finalTax: "Final Tax Payable",
      prepaymentCredit: "Less: Prepayment Credits",
      netPayableEnd: "Net Payable at Year-End",
      statusLoss: "Company has loss. Income tax = 0. Minimum tax applies.",
      statusIncomeHigher: "Income tax is higher than minimum tax.",
      statusMinHigher: "Minimum tax is higher than income tax.",
      notes: "If annual net profit is negative, you only pay Minimum Tax (1% of total base).",
    },
  },
  kh: {
    appTitle: "ម៉ាស៊ីនគិតពន្ធកម្ពុជា",
    appSub: "ITC សេដ្ឋកិច្ចសម្រាប់វិស្វករ | ម៉ាស៊ីនគិតពន្ធ ១៨ ប្រភេទ",
    taxes18: "ពន្ធ ១៨",
    tabs: {
      overview: "ទិដ្ឋភាពទូទៅ", salary: "ពន្ធបៀវត្ស",       prepayment: "ពន្ធប្រចាំខែ",
      vat: "អាករ VAT", special: "អាករពិសេស", withholding: "ពន្ធកាត់ទុក",
      lighting: "ពន្ធបំភ្លឺសាធារណៈ", accommodation: "អាករស្នាក់នៅ",
      dividend: "ពន្ធភាគលាភ", minimum: "ពន្ធអប្បបរមា", rent: "ពន្ធជួលដី",
      landtransfer: "ពន្ធប្រថាប់ត្រា", property: "ពន្ធអចលនទ្រព្យ",
      annual: "ពន្ធប្រចាំឆ្នាំ និងរំដោះពន្ធ",
    },
    nav: { home: "ទំព័រដើម", about: "អំពីពន្ធ", allTaxes: "ពន្ធទាំងអស់", calculator: "ម៉ាស៊ីនគិតពន្ធ" },
    home: {
      heroTitle: "ម៉ាស៊ីនគិតពន្ធកម្ពុជា",
      heroSub: "មគ្គុទ្ទេសក៍ពេញលេញសម្រាប់ពន្ធទាំង ១៨ នៅព្រះរាជាណាចក្រកម្ពុជា។ គណនា យល់ និងអនុវត្តច្បាប់ពន្ធកម្ពុជា។",
      heroCta1: "ចាប់ផ្ដើមគណនា",
      heroCta2: "សិក្សាអំពីពន្ធ",
      stat1Label: "ម៉ាស៊ីនគិតពន្ធ", stat1Val: "១៨",
      stat2Label: "ភាសា", stat2Val: "២",
      stat3Label: "ប្រភេទពន្ធ", stat3Val: "៤",
      stat4Label: "ឥតគិតថ្លៃ", stat4Val: "១០០%",
      featuredTitle: "ម៉ាស៊ីនគិតពន្ធពេញនិយម",
      featuredSub: "ចូលដំណើរការរហ័សទៅម៉ាស៊ីនគិតពន្ធដែលប្រើប្រាស់ញឹកញាប់បំផុត",
      viewAll: "មើលពន្ធទាំងអស់",
      howTitle: "របៀបដំណើរការ",
      howSub: "ជំហាន ៣ យ៉ាងសម្រាប់គណនាពន្ធរបស់អ្នក",
      step1Title: "ជ្រើសរើសពន្ធ", step1Desc: "ជ្រើសរើសពីប្រភេទពន្ធផ្សេងៗគ្នា ១៨ រួមមានពន្ធលើចំណូល ពន្ធប្រយោល និងពន្ធបង់ជាមុន។",
      step2Title: "បញ្ចូលទឹកប្រាក់", step2Desc: "បញ្ចូលទិន្នន័យហិរញ្ញវត្ថុរបស់អ្នករួមមានចំណូល ចំណាយ និងការដកលើកលែង។",
      step3Title: "ទទួលលទ្ធផល", step3Desc: "មើលភ្លាមៗពន្ធដែលត្រូវបង់ អត្រាពន្ធជាក់ស្តែង និងចំនួនសុទ្ធជាមួយការបំបែកលម្អិត។",
      ctaTitle: "ត្រៀមគណនាហើយឬនៅ?",
      ctaDesc: "ប្រើម៉ាស៊ីនគិតពន្ធវិជ្ជាជីវៈរបស់យើងដើម្បីគណនាកាតព្វកិច្ចពន្ធកម្ពុជារបស់អ្នក។",
      ctaBtn: "បើកម៉ាស៊ីនគិតពន្ធ",
    },
    about: {
      title: "អំពីប្រព័ន្ធពន្ធកម្ពុជា",
      sub: "យល់ដឹងពីពន្ធទាំង ១៨ ដែលគ្រប់គ្រងដោយអគ្គនាយកដ្ឋានពន្ធនិងអាករ",
      overviewTitle: "ទិដ្ឋភាពទូទៅនៃប្រព័ន្ធពន្ធ",
      overviewP1: "ព្រះរាជាណាចក្រកម្ពុជាប្រើប្រាស់ប្រព័ន្ធពន្ធទំនើបដែលគ្រប់គ្រងដោយអគ្គនាយកដ្ឋានពន្ធនិងអាករ (GDT) ក្រោមក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ។ ប្រព័ន្ធនេះរួមមានពន្ធធំ ១៨ ប្រភេទដែលធុរកិច្ច និងបុគ្គលត្រូវយល់ដឹង និងអនុវត្ត។",
      overviewP2: "ប្រព័ន្ធពន្ធកម្ពុជាត្រូវបានរចនាឡើងដើម្បីបង្កើតចំណូលសម្រាប់សេវាសាធារណៈ ខណៈពេលផ្សព្វផ្សាយកំណើនសេដ្ឋកិច្ច។ អត្រាពន្ធជាទូទៅមានការប្រកួតប្រជែងក្នុងតំបន់អាស៊ាន។",
      catTitle: "ប្រភេទពន្ធ",
      catSub: "ពន្ធទាំង ១៨ ត្រូវបានរៀបចំជា ៤ ប្រភេទសំខាន់",
      cat1Title: "ពន្ធលើចំណូល",
      cat1Desc: "ពន្ធលើចំណូលបុគ្គល និងអាជីវកម្ម រួមមានពន្ធបៀវត្ស ពន្ធភាគលាភ និងពន្ធអប្បបរមា។",
      cat2Title: "ពន្ធប្រយោល",
      cat2Desc: "ពន្ធលើទំនិញ និងសេវា រួមមាន VAT អាករពិសេស ពន្ធបំភ្លឺសាធារណៈ និងអាករស្នាក់នៅ។",
      cat3Title: "ពន្ធលើប្រតិបត្តិការ",
      cat3Desc: "ពន្ធលើអចលនទ្រព្យ និងប្រតិបត្តិការសកម្មភាព រួមមានពន្ធប្រថាប់ត្រា ពន្ធអចលនទ្រព្យ និងពន្ធលើប្រាក់ជួល។",
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
      title: "ម៉ាស៊ីនគិតពន្ធទាំង ១៨",
      sub: "រុករក និងចូលដំណើរការម៉ាស៊ីនគិតពន្ធទាំងអស់",
      searchPlaceholder: "ស្វែងរកពន្ធ...",
      noResults: "រកមិនឃើញពន្ធដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
      categoryAll: "ទាំងអស់",
      categoryIncome: "ពន្ធលើចំណូល",
      categoryIndirect: "ពន្ធប្រយោល",
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
      title: "ម៉ាស៊ីនគិតពន្ធបៀវត្ស",       sub: "គណនាពន្ធបៀវត្សតាមជាន់ថ្នាក់ ជាមួយការដកចំនួនបន្ទុក និងអត្ថប្រយោជន៍។",
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
      title: "ម៉ាស៊ីនគិតពន្ធប្រចាំខែ", sub: "ការបង់ជាមុន ១% ប្រចាំខែសម្រាប់ពន្ធចំណេញ។",
      formula: "រូបមន្ត", formulaVal: "Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%",
      whoPays: "អ្នកបង់", whoPaysVal: "សហគ្រាសដែលបានចុះ VAT ។",
      due: "កាលបរិច្ឆេទ", dueVal: "ថ្ងៃទី ១–២០ នៃខែបន្ទាប់។",
      calcTitle: "ពន្ធប្រចាំខែ",
      monthLabels: ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
      monthCol: "ខែ", revenueCol: "ចំណូល (រួម VAT)", baseCol: "មូលដ្ឋាន (/១.១០)",
      prepaymentCol: "ពន្ធ (១%)",
      calcBtn: "គណនា",
      exampleNote: "ប្រសិនបើចំណូលប្រចាំខែ = ១១,០០០,០០០ រៀល (រួម VAT):",
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
    annual: {
      title: "ម៉ាស៊ីនគិតពន្ធប្រចាំឆ្នាំ និងរំដោះពន្ធ",
      sub: "គណនាពន្ធប្រចាំឆ្នាំដោយបញ្ចូលចំណូលប្រចាំខែ ចំណាយ និងពន្ធអប្បបរមា។",
      formula: "រូបមន្ត", formulaVal: "ប្រាក់ចំណេញ = ចំណូលសរុប − ចំណាយសរុប → ពន្ធ = Max(ពន្ធចំណេញ, ពន្ធអប្បបរមា) − ឥណទាន",
      whoPays: "អ្នកបង់", whoPaysVal: "សហគ្រាសដែលត្រូវបង់ពន្ធចំណេញ និងរំដោះពន្ធ។",
      due: "កាលបរិច្ឆេទ", dueVal: "ប្រចាំឆ្នាំ។ រំដោះពន្ធ ថ្ងៃទី ១–២០ បន្ទាប់ពីចុងខែ។",
      calcTitle: "ម៉ាស៊ីនគិតពន្ធប្រចាំឆ្នាំ",
      includesVAT: "រួម VAT ក្នុងចំណូល",
      yesVAT: "បាទ/ចាស (ចំណូលរួម VAT ១០%)",
      revenue: "ចំណូលប្រចាំខែ (រៀល)",
      expenses: "ចំណាយប្រចាំឆ្នាំ (រៀល)",
      monthLabels: ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
      calcBtn: "គណនាពន្ធប្រចាំឆ្នាំ",
      monthCol: "ខែ", revenueCol: "ចំណូល", baseCol: "មូលដ្ឋាន (/១.១០)",
      prepaymentCol: "រំដោះពន្ធ (១%)",
      summaryTitle: "សង្ខេបប្រចាំឆ្នាំ",
      totalRevenue: "ចំណូលសរុប",
      totalBase: "មូលដ្ឋានសរុប",
      netProfit: "ប្រាក់ចំណេញសុទ្ធ",
      incomeTax: "ពន្ធចំណេញ (២០%)",
      minimumTax: "ពន្ធអប្បបរមា (១%)",
      finalTax: "ពន្ធដែលត្រូវបង់",
      prepaymentCredit: "ដក៖ ឥណទានរំដោះពន្ធ",
      netPayableEnd: "ត្រូវបង់ចុងឆ្នាំ",
      statusLoss: "ក្រុមហ៊ុនខាតបង់។ ពន្ធចំណេញ = ០។ អនុវត្តពន្ធអប្បបរមា។",
      statusIncomeHigher: "ពន្ធចំណេញខ្ពស់ជាងពន្ធអប្បបរមា។",
      statusMinHigher: "ពន្ធអប្បបរមាខ្ពស់ជាងពន្ធចំណេញ។",
      notes: "ប្រសិនបើប្រាក់ចំណេញសុទ្ធអវិជ្ជមាន អ្នកបង់តែពន្ធអប្បបរមា ១% នៃមូលដ្ឋានសរុប។",
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
export function calcLighting(p, mode = "retailer") { const base = (p/1.10)/1.05; const taxableBase = mode === "producer" ? base * 0.20 : base; return { base, taxableBase, tax: taxableBase * 0.05 }; }
export function calcAccom(p)               { const base = p/1.10; return { base, tax: base*0.02 }; }
export function calcDividend(a, rate = 0.15) { const tax = a * (rate / 100); return { tax, net: a - tax }; }
export function calcMinTax(r)              { return { tax: r*0.01 }; }
export function calcRent(i)                { const tax = i*0.10; return { tax, net: i-tax }; }
export function calcLandTransfer(v)        { return { tax: v*0.04 }; }
export function calcPropertyTax(v) {
  const base = v * 0.8 - 100000000;
  const tax = base > 0 ? base * 0.001 : 0;
  const effectiveRate = v > 0 ? (tax / v) * 100 : 0;
  return { base: Math.max(0, base), exemption:100000000, eightyPct: v*0.8, tax, effectiveRate };
}

export function calculateAdvancedPrepaymentTax({
  monthlyIncomes,
  annualNetProfit,
  incomeTaxRate = 0.20,
  includesVAT = true
}) {
  if (!Array.isArray(monthlyIncomes) || monthlyIncomes.length === 0) {
    return { error: "Please input monthly incomes" };
  }
  const profit = Number(annualNetProfit);
  if (isNaN(profit)) {
    return { error: "Annual net profit must be a valid number" };
  }
  const monthlyResults = monthlyIncomes.map((income, index) => {
    const revenue = Number(income);
    if (isNaN(revenue) || revenue < 0) {
      return { month: index + 1, error: "Invalid monthly income" };
    }
    const base = includesVAT ? revenue / 1.10 : revenue;
    const prepaymentTax = base * 0.01;
    return { month: index + 1, revenue, base, prepaymentTax };
  });
  const hasError = monthlyResults.some(item => item.error);
  if (hasError) {
    return { error: "Some monthly income values are invalid", monthlyResults };
  }
  const totalRevenue = monthlyResults.reduce((sum, item) => sum + item.revenue, 0);
  const totalBase = monthlyResults.reduce((sum, item) => sum + item.base, 0);
  const totalPrepaymentTax = monthlyResults.reduce((sum, item) => sum + item.prepaymentTax, 0);
  const incomeTax = profit > 0 ? profit * incomeTaxRate : 0;
  const minimumTax = totalBase * 0.01;
  const finalTaxBeforeCredit = Math.max(incomeTax, minimumTax);
  const finalPayable = finalTaxBeforeCredit - totalPrepaymentTax;
  let status = "";
  if (profit < 0) {
    status = "Company has loss, so income tax is 0. Minimum tax applies.";
  } else if (incomeTax > minimumTax) {
    status = "Income tax is higher than minimum tax.";
  } else {
    status = "Minimum tax is higher than income tax.";
  }
  return {
    monthlyResults,
    summary: {
      totalRevenue, totalBase, annualNetProfit: profit,
      incomeTaxRate: incomeTaxRate * 100 + "%", incomeTax, minimumTax,
      totalPrepaymentTax, finalTaxBeforeCredit, finalPayable, status
    }
  };
}
export function calculateAnnualNetProfit(monthlyIncomes, annualExpenses, includesVAT = true) {
  const incomes = monthlyIncomes.map(v => parseFloat(v) || 0);
  const expenses = parseFloat(annualExpenses) || 0;
  const totalRevenue = incomes.reduce((s, v) => s + v, 0);
  const netProfit = totalRevenue - expenses;
  return calculateAdvancedPrepaymentTax({ monthlyIncomes: incomes, annualNetProfit: netProfit, includesVAT });
}
export function calcSpecialLocalBase(p, r) { const base = (p/1.10)/(1+r); return { base, tax: base*r }; }
export function calcSpecialProducer(p, r) { const base = 0.90*(p/1.10/(1+r)); return { base, tax: base*r }; }
export function calcSpecialImport(cif, duty, r) { const base = cif + (parseFloat(duty)||0); return { base, tax: base*r }; }
export function calcCorporateIncomeTax(p) { const tax = p*0.20; return { tax, rate:20, net: p-tax }; }
export function calcNaturalResourceTax(p) { const tax = p*0.30; return { tax, rate:30 }; }
export function calcQIPTax(projects) {
  const GROUP_YEARS = { 1: 9, 2: 6, 3: 3 };
  const results = (projects || []).map(p => {
    const amount = parseFloat(p.amount) || 0;
    const group = parseInt(p.group) || 2;
    const currentYear = parseInt(p.currentYear) || 1;
    const holidayYears = GROUP_YEARS[group] || 6;
    const transitionStart = holidayYears + 1;
    const transitionEnd = holidayYears + 6;
    let rate, phase;
    if (currentYear <= holidayYears) {
      rate = 0;
      phase = "holiday";
    } else if (currentYear <= transitionStart + 1) {
      rate = 5;   // 25% of 20%
      phase = "transition_early";
    } else if (currentYear <= transitionStart + 3) {
      rate = 10;  // 50% of 20%
      phase = "transition_mid";
    } else if (currentYear <= transitionEnd) {
      rate = 15;  // 75% of 20%
      phase = "transition_late";
    } else {
      rate = 20;
      phase = "full";
    }
    const tax = amount * (rate / 100);
    const minTaxExempt = p.minTaxExempt === true;
    const prepayExempt = p.prepayExempt === true;
    return { name: p.name || "", amount, group, currentYear, holidayYears, phase, rate, tax, minTaxExempt, prepayExempt };
  });
  const totalTax = results.reduce((s, r) => s + r.tax, 0);
  return { projects: results, totalTax };
}
export function calcInsuranceTax(g, t) { const rate = t==="property"?0.05:0.20; return { tax: g*rate, rate:rate*100 }; }
export function calcProgressiveIndividualTax(p) {
  let tax, bracket;
  if (p<=18000000) { tax=0; bracket=0; }
  else if (p<=24000000) { tax=p*0.05-900000; bracket=1; }
  else if (p<=102000000) { tax=p*0.10-2100000; bracket=2; }
  else if (p<=150000000) { tax=p*0.15-7200000; bracket=3; }
  else { tax=p*0.20-14200000; bracket=4; }
  return { tax: Math.max(0, tax), bracket, rate: bracket===0?0:bracket===1?5:bracket===2?10:bracket===3?15:20, net: p - Math.max(0, tax) };
}
export function calcTaxableIncome(accountingProfit, nonDeductible, taxableNotRecorded, deductibleNotRecorded, nonTaxableRecorded) {
  const taxable = accountingProfit + (nonDeductible||0) + (taxableNotRecorded||0) - (deductibleNotRecorded||0) - (nonTaxableRecorded||0);
  return { taxable: Math.max(0, taxable), disallowed: nonDeductible||0, exempt: nonTaxableRecorded||0 };
}

export const fmt = (n) => Math.round(n || 0).toLocaleString("en-US") + " ៛";

export const TAXES = [
  { id: "salary", en: "Salary Tax", kh: "ពន្ធលើប្រាក់បៀវត្ស", cat: "income", icon: "", rate: "0%–20%", due: "20th of following month", formulaEn: "Taxable = Gross − (Deps × 150,000) → Tax = Taxable × Rate − Offset", formulaKh: "ជាប់ពន្ធ = ប្រាក់ − (ចំនួនបន្ទុក × ១៥០,០០០) → ពន្ធ = ជាប់ × អត្រា", defEn: "Monthly progressive tax withheld by employer.", defKh: "ពន្ធលើប្រាក់បៀវត្ស គឺជាពន្ធដែលគិតលើប្រាក់ខែប្រចាំខែរបស់និយោជិត។ និយោជកត្រូវកាត់ពន្ធនេះពីប្រាក់ខែរបស់និយោជិត ហើយបង់ជូនពន្ធដារ។ ពន្ធនេះគិតតាមអត្រាកំណើនជាថ្នាក់ៗ។" },
  { id: "prepayment", en: "Tax Per Month", kh: "ពន្ធប្រចាំខែ", cat: "advance", icon: "", rate: "1%", due: "1st–20th of following month", formulaEn: "Base = Revenue / 1.1 → Tax = Base × 1%", formulaKh: "Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%", defEn: "Monthly 1% advance credited against annual profit tax.", defKh: "ពន្ធប្រចាំខែ គឺជាពន្ធដែលសហគ្រាសត្រូវបង់ជាមុនជារៀងរាល់ខែ ដោយគណនាលើផលរបរប្រចាំខែមិនរួមបញ្ចូល VAT។ ពន្ធនេះមិនមែនជា VAT ទេ ប៉ុន្តែជាប្រាក់បង់មុនសម្រាប់កាត់កងជាមួយពន្ធលើប្រាក់ចំណូលប្រចាំឆ្នាំនៅចុងឆ្នាំ។" },
  { id: "vat", en: "VAT", kh: "អាករលើតម្លៃបន្ថែម", cat: "indirect", icon: "", rate: "10%", due: "20th of following month", formulaEn: "Net VAT = Output VAT − Input VAT", formulaKh: "VAT = Output − Input", defEn: "10% on taxable supplies.", defKh: "VAT ឬ អាករលើតម្លៃបន្ថែម គឺជាអាករដែលគិតលើការលក់ទំនិញ និងសេវាកម្ម។ អត្រាស្តង់ដារគឺ ១០%។ សម្រាប់អាជីវកម្មដែលបានចុះបញ្ជី VAT អាចមាន Output VAT ពេលលក់ និង Input VAT ពេលទិញ។" },
  { id: "special", en: "Special Tax", kh: "អាករពិសេស", cat: "indirect", icon: "", rate: "3%–35%", due: "20th of following month", formulaEn: "Base × Rate", formulaKh: "Base × អត្រា", defEn: "Excise tax on alcohol, beer, cigarettes, drinks, cement, services.", defKh: "អាករពិសេស គឺជាអាករបន្ថែមដែលគិតលើទំនិញ ឬសេវាកម្មពិសេសមួយចំនួន ដូចជា ស្រា បៀរ បារី ស៊ីហ្គា ភេសជ្ជៈ ស៊ីម៉ង់ត៍ សេវាកម្សាន្ត និងទូរគមនាគមន៍។ អត្រាអាករខុសគ្នាតាមប្រភេទទំនិញ។" },
  { id: "withholding", en: "Withholding Tax", kh: "ពន្ធកាត់ទុក", cat: "advance", icon: "", rate: "4%–15%", due: "15th of following month", formulaEn: "WHT = Gross × Rate", formulaKh: "ពន្ធ = ប្រាក់ × អត្រា", defEn: "Deducted at source on various payments.", defKh: "ពន្ធកាត់ទុក គឺជាពន្ធដែលអ្នកបង់ប្រាក់ត្រូវកាត់ទុកពីប្រាក់សរុប មុនពេលបង់ទៅឱ្យអ្នកទទួលប្រាក់។ បន្ទាប់មក អ្នកបង់ប្រាក់ត្រូវយកពន្ធដែលបានកាត់ទុកនោះទៅបង់ជូនពន្ធដារ។" },
  { id: "lighting", en: "Public Lighting Tax", kh: "ពន្ធបំភ្លឺសាធារណៈ", cat: "indirect", icon: "", rate: "5%", due: "20th of following month", formulaEn: "First Seller: Inv/1.10/1.05×5% | Reseller: (Inv/1.10/1.05)×20%×5%", formulaKh: "អ្នកលក់ដំបូង: ថ្លៃ/១.១/១.០៥×៥% | អ្នកលក់លើកទីពីរ: (ថ្លៃ/១.១/១.០៥)×២០%×៥%", defEn: "5% sub-national tax.", defKh: "អាករសម្រាប់បំភ្លឺសាធារណៈ គឺជាអាករដែលគិតលើទំនិញ ឬសេវាកម្មមួយចំនួនដែលមានអាករបន្ថែម ដូចជា ស្រា បៀរ ឬភេសជ្ជៈខ្លះៗ។ អត្រាអាករគឺ ៥%។" },
  { id: "accommodation", en: "Accommodation Tax", kh: "អាករស្នាក់នៅ", cat: "indirect", icon: "", rate: "2%", due: "20th of following month", formulaEn: "Invoice / 1.10 × 2%", formulaKh: "វិក្កយបត្រ / ១.១ × ២%", defEn: "2% on hotel and guesthouse charges.", defKh: "អាករស្នាក់នៅ គឺជាអាករដែលគិតលើសេវាស្នាក់នៅ ដូចជា សណ្ឋាគារ ផ្ទះសំណាក់ ឬកន្លែងស្នាក់នៅផ្សេងៗ។ វាគណនាលើតម្លៃសេវាស្នាក់នៅមិនរួម VAT។ អត្រា ២%។" },
  { id: "dividend", en: "Dividend Tax", kh: "ពន្ធភាគលាភ", cat: "income", icon: "", rate: "0%–20%", due: "When distributed", formulaEn: "Dividend × Rate", formulaKh: "ភាគលាភ × អត្រា", defEn: "Tax on profit distributed as dividends.", defKh: "ភាគលាភ គឺជាប្រាក់ ឬទ្រព្យសម្បត្តិដែលក្រុមហ៊ុនចែកឲ្យម្ចាស់ភាគហ៊ុន បន្ទាប់ពីក្រុមហ៊ុនមានប្រាក់ចំណេញ។ ពន្ធភាគលាភ គឺជាពន្ធដែលពាក់ព័ន្ធនឹងការចែកប្រាក់ចំណេញទៅម្ចាស់ភាគហ៊ុន។" },
  { id: "minimum", en: "Minimum Tax", kh: "ពន្ធអប្បបរមា", cat: "income", icon: "", rate: "1%", due: "Annual filing", formulaEn: "Revenue (excl. VAT) × 1%", formulaKh: "ចំណូលមិនរួម VAT × ១%", defEn: "Ensures enterprises pay at least 1% of annual turnover.", defKh: "ពន្ធអប្បបរមា គឺជាពន្ធដែលគណនាលើផលរបរប្រចាំឆ្នាំមិនរួម VAT។ វាត្រូវបានប្រើសម្រាប់ប្រៀបធៀបជាមួយពន្ធលើប្រាក់ចំណូល។ អត្រាគឺ ១% នៃផលរបរប្រចាំឆ្នាំមិនរួម VAT។" },
  { id: "rent", en: "Rent & Land Tax", kh: "ពន្ធជួលដីនិងអចលន", cat: "transaction", icon: "", rate: "10%", due: "Monthly", formulaEn: "Rental Income × 10%", formulaKh: "ប្រាក់ជួល × ១០%", defEn: "10% on rental income.", defKh: "ពន្ធឈ្នួលផ្ទះ និងដី គឺជាពន្ធដែលគិតលើប្រាក់ចំណូលពីការជួលផ្ទះ ដី អគារ ឬអចលនទ្រព្យផ្សេងៗ។ ជាទូទៅ វាត្រូវបានគិតក្នុងអត្រា ១០% លើប្រាក់ជួល។" },
  { id: "landtransfer", en: "Stamp Tax", kh: "ពន្ធប្រថាប់ត្រា", cat: "transaction", icon: "", rate: "4%", due: "At transfer", formulaEn: "Sale Price × 4%", formulaKh: "តម្លៃ × ៤%", defEn: "4% stamp duty on land/property transfer.", defKh: "ពន្ធប្រថាប់ត្រា គឺជាពន្ធដែលត្រូវបង់នៅពេលមានការផ្ទេរកម្មសិទ្ធិដីពីម្ចាស់ចាស់ទៅម្ចាស់ថ្មី។ ជាទូទៅអ្នកទិញ ឬអ្នកទទួលកម្មសិទ្ធិថ្មីជាអ្នកបង់ពន្ធនេះ។" },
  { id: "property", en: "Property Tax", kh: "ពន្ធអចលនទ្រព្យ", cat: "transaction", icon: "", rate: "0.1%", due: "September 30", formulaEn: "(Total Value × 80% − 100M KHR) × 0.1%", formulaKh: "(តម្លៃ × ៨០% − ១០០លាន) × ០.១%", defEn: "Annual tax on immovable property. Base = 80% of value − 100M KHR exemption.", defKh: "ពន្ធលើអចលនទ្រព្យ គឺជាពន្ធប្រចាំឆ្នាំលើអចលនវត្ថុដូចជា ដី និងអគារ។ មូលដ្ឋានគិតពន្ធ = ៨០% នៃតម្លៃសរុប − ១០០លានរៀល។" },

  { id: "corporate", en: "Corporate Income Tax", kh: "ពន្ធនីតិបុគ្គល", cat: "income", icon: "", rate: "20%", due: "Annual filing", formulaEn: "Taxable Income × 20%", formulaKh: "ចំណូលជាប់ពន្ធ × ២០%", defEn: "Tax on net profit of companies.", defKh: "ពន្ធលើប្រាក់ចំណូលនីតិបុគ្គល គឺជាពន្ធដែលគណនាលើប្រាក់ចំណេញជាប់ពន្ធរបស់ក្រុមហ៊ុន ឬនីតិបុគ្គល។ ប្រាក់ចំណេញជាប់ពន្ធអាចខុសពីប្រាក់ចំណេញក្នុងគណនេយ្យ ព្រោះត្រូវមានការកែតម្រូវតាមច្បាប់ពន្ធ។" },
  { id: "naturalresource", en: "Natural Resource Tax", kh: "ពន្ធធនធានធម្មជាតិ", cat: "income", icon: "", rate: "30%", due: "Annual filing", formulaEn: "Revenue × 30%", formulaKh: "ចំណូល × ៣០%", defEn: "Tax on oil, gas, and mining revenue.", defKh: "ពន្ធលើប្រាក់ចំណូលធនធានធម្មជាតិ គឺជាពន្ធលើប្រាក់ចំណូលពីអាជីវកម្មធនធានធម្មជាតិ ដូចជា ប្រេងកាត ឧស្ម័នធម្មជាតិ រ៉ែមាស ត្បូងមានតម្លៃ ឬធនធានធម្មជាតិផ្សេងៗ។ អត្រាពន្ធគឺ ៣០%។" },
  { id: "qip", en: "QIP Tax", kh: "ពន្ធ QIP", cat: "income", icon: "", rate: "0%–20%", due: "Per QIP schedule", formulaEn: "Profit × QIP Rate", formulaKh: "ប្រាក់ចំណេញ × អត្រា QIP", defEn: "Tax for Qualified Investment Projects.", defKh: "QIP មានន័យថា គម្រោងវិនិយោគមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់។ សម្រាប់គម្រោង QIP ដែលស្ថិតក្នុងរយៈពេលលើកលែងពន្ធ អត្រាពន្ធលើប្រាក់ចំណូលអាចជា ០%។" },
  { id: "insurance", en: "Insurance Tax", kh: "ពន្ធធានារ៉ាប់រង", cat: "income", icon: "", rate: "5%–20%", due: "Monthly/Quarterly", formulaEn: "Premium × 5% or 20%", formulaKh: "បុព្វលាភ × ៥% ឬ ២០%", defEn: "Special tax for insurance enterprises.", defKh: "ពន្ធលើសហគ្រាសធានារ៉ាប់រង គឺជាពន្ធសម្រាប់ក្រុមហ៊ុនធានារ៉ាប់រង។ សម្រាប់ធានារ៉ាប់រងលើទ្រព្យសម្បត្តិ ឬហានិភ័យ អត្រា ៥% លើបុព្វលាភធានារ៉ាប់រងដុល។ សម្រាប់ធានារ៉ាប់រងជីវិត ឬសកម្មភាពផ្សេងៗ ប្រើអត្រា ២០%។" },
  { id: "progressive", en: "Personal Enterprise Income Tax", kh: "ពន្ធសហគ្រាសឯកបុគ្គល", cat: "income", icon: "", rate: "0%–20%", due: "Annual filing", formulaEn: "Profit × Rate − Offset (progressive brackets)", formulaKh: "ប្រាក់ចំណេញ × អត្រា − ការដក (តាមជាន់ថ្នាក់)", defEn: "Annual progressive tax on net profit of sole proprietors and personal enterprises.", defKh: "ពន្ធសហគ្រាសឯកបុគ្គលគឺជាពន្ធដែលក្រុមហ៊ុនឯកជន ឬសហគ្រាសឯកជនបង់លើប្រាក់ចំណេញ (Profit) ដែលក្រុមហ៊ុនរកបានក្នុងមួយឆ្នាំ។ អត្រាពន្ធត្រូវបានកំណត់តាមស្ដង់ដារ និងតាមលំដាប់ប្រាក់ចំណេញ។" },
  { id: "taxadjustment", en: "Taxable Income Adjustment", kh: "ការគណនាចំណូលជាប់ពន្ធ", cat: "income", icon: "", rate: "—", due: "Before filing", formulaEn: "Accounting Profit +/− Adjustments", formulaKh: "ប្រាក់ចំណេញ ± កែតម្រូវ", defEn: "Reconcile accounting to taxable income.", defKh: "ការគណនាប្រាក់ចំណូលជាប់ពន្ធ គឺជាដំណើរការកែតម្រូវប្រាក់ចំណេញតាមគណនេយ្យ ដើម្បីរកប្រាក់ចំណូលដែលត្រូវយកទៅគណនាពន្ធ។ ចំណាយខ្លះមិនអាចកាត់កងបាន ហើយចំណូលខ្លះមិនជាប់ពន្ធ ដូច្នេះត្រូវកែតម្រូវមុនគណនាពន្ធ។" },
  { id: "annual", en: "Annual Tax & Prepayment", kh: "ពន្ធប្រចាំឆ្នាំ និងរំដោះពន្ធ", cat: "income", icon: "", rate: "1%–20%", due: "Annual filing", formulaEn: "Net Profit × 20% or Base × 1%", formulaKh: "ចំណេញ × ២០% ឬ Base × ១%", defEn: "Annual profit tax with minimum tax floor and monthly prepayment credit.", defKh: "ពន្ធប្រចាំឆ្នាំ រួមបញ្ចូលការគណនាពន្ធលើប្រាក់ចំណេញសុទ្ធ និងពន្ធអប្បបរមា។ ប្រសិនបើក្រុមហ៊ុនមានប្រាក់ចំណេញ ត្រូវបង់ពន្ធ ២០% នៃប្រាក់ចំណេញ។ ប្រសិនបើក្រុមហ៊ុនខាតបង់ ត្រូវបង់តែពន្ធអប្បបរមា ១% នៃផលរបរ។" },
];

export const CATEGORIES = [
  { id: "all", en: "All Taxes", kh: "ពន្ធទាំងអស់", icon: "" },
  { id: "income", en: "Income Tax", kh: "ពន្ធលើចំណូល", icon: "" },
  { id: "indirect", en: "Indirect Tax", kh: "ពន្ធប្រយោល", icon: "" },
  { id: "transaction", en: "Transaction Tax", kh: "ពន្ធលើប្រតិបត្តិការ", icon: "" },
  { id: "advance", en: "Advance & Withholding", kh: "ពន្ធបង់ជាមុន និងកាត់ទុក", icon: "" },
];