import { useState, useEffect, useCallback, useMemo } from "react";
import { T, fmt, gold, gold2, navy, card, red, green, muted, white, border } from "./data.js";
import { calcSalaryTax, calcNonResidentTax, calcPrepaymentTax, calculateAdvancedPrepaymentTax, calcImportVAT, calcSpecialLocalBase, calcSpecialProducer, calcSpecialImport, calcSpecialReseller, calcWHT, calcLighting, calcAccom, calcDividend, calcMinTax, calcRent, calcLandTransfer, calcPropertyTax, calcCorporateIncomeTax, calcNaturalResourceTax, calcQIPTax, calcInsuranceTax, calcProgressiveIndividualTax, calcTaxableIncome } from "./data.js";

// ═══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════
export function Row({ label, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.82rem" }}>
      <span style={{ color: muted, fontSize: "0.8rem" }}>{label}</span>
      <span style={{ fontWeight: 600, color: color==="red"?red:color==="green"?green:color==="gold"?gold:white }}>{value}</span>
    </div>
  );
}

export function Table({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginTop: 8 }}>
      <thead>
        <tr>{rows[0].map((h,i) => <th key={i} style={{ color: gold, padding: "6px 10px", textAlign: "left", borderBottom: `1px solid ${border}`, fontWeight: 700 }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row,i) => (
          <tr key={i}>{row.map((cell,j) => (
            <td key={j} style={{ padding: "6px 10px", color: j===row.length-1?gold2:"#B8C8DC", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{cell}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Helpers ──────────────────────────────────────────────
const box = { background: "rgba(255,255,255,0.055)", border: `1px solid ${border}`, borderLeft: `5px solid ${gold}`, borderRadius: 12, padding: "14px 18px", marginBottom: 22, fontSize: "0.82rem", lineHeight: 1.8, color: "#C5D5E8" };
const calcCard = { background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))", border: `1px solid ${border}`, borderRadius: 14, padding: "20px 22px", boxShadow: "0 10px 26px rgba(0,0,0,0.18)" };
const label = { display: "block", fontSize: "0.7rem", color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, marginTop: 12 };
const input = { width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${border}`, borderRadius: 6, padding: "8px 12px", color: white, fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const select = { width: "100%", background: card, border: `1px solid ${border}`, borderRadius: 6, padding: "8px 12px", color: white, fontSize: "0.82rem", outline: "none", boxSizing: "border-box" };
const btn = { marginTop: 14, width: "100%", padding: "10px", background: `linear-gradient(135deg,${gold},#A87A20)`, border: "none", borderRadius: 6, color: navy, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" };
const resultBox = { marginTop: 12, background: "rgba(0,0,0,0.2)", border: `1px solid ${border}`, borderRadius: 8, padding: "12px 14px" };
const hint = { fontSize: "0.68rem", color: muted, marginTop: 3, fontStyle: "italic" };
const divider = { borderTop: `1px dashed ${border}`, margin: "12px 0" };
const title = { fontSize: "1.2rem", fontWeight: 700, color: gold, marginBottom: 4 };
const subt = { color: muted, fontSize: "0.82rem", marginBottom: 18, lineHeight: 1.6 };
const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };

// ═══════════════════════════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════════════════════════
export function OverviewTab({ lang }) {
  const t = T[lang].overview;
  const taxes = [
    { en: "Salary Tax",          kh: "ពន្ធលើប្រាក់បៀវត្ស",           def_en: "Monthly progressive tax withheld by employer. Residents: 0%-20% with 150,000 KHR deduction per dependant. Non-residents: flat 20%.", def_kh: "ពន្ធប្រចាំខែ ០%-២០% ។ ដក ១៥០,០០០ ៛ ក្នុង ១ ចំនួនបន្ទុក",      formula: lang==="en"?"Taxable = Gross − (Deps × 150,000) → Tax = Taxable × Rate − Offset":"ជាប់ពន្ធ = ប្រាក់ − (ចំនួនបន្ទុក × ១៥០,០០០) → ពន្ធ = ជាប់ × អត្រា" },
    { en: "Prepayment Tax",      kh: "ប្រាក់រំដោះពន្ធ",              def_en: "Monthly 1% advance credited against annual profit tax.", def_kh: "ពន្ធ ១% ប្រចាំខែ ដើម្បីរំដោះពន្ធចំណេញ",               formula: lang==="en"?"Base = Revenue / 1.1 → Tax = Base × 1%":"Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%" },
    { en: "VAT",                 kh: "អាករលើតម្លៃបន្ថែម",             def_en: "10% on taxable supplies. Net VAT = Output VAT − Input VAT.", def_kh: "១០% លើការផ្គត់ផ្គង់ជាប់អាករ",                          formula: lang==="en"?"Net VAT = Output VAT − Input VAT":"VAT = Output − Input" },
    { en: "Special Tax",         kh: "អាករពិសេស",                   def_en: "Excise tax on alcohol (35%), beer (30%), cigarettes (20%), soft drinks (10%), cement (5%), services (3-10%).", def_kh: "ស្រា ៣៥%, បៀរ ៣០%, បារី ២០%, ភេសជ្ជៈ ១០%", formula: lang==="en"?"Base × Rate (3 calculation methods)":"Base × អត្រា (៣ វិធីគណនា)" },
    { en: "Withholding Tax",     kh: "ពន្ធកាត់ទុក",                  def_en: "Deducted at source: Services/Royalties/Interest 15%, Rental 10%, Fixed deposit 6%, Non-fixed 4%, Non-resident 14%.", def_kh: "កាត់ទុក: សេវា/ការប្រាក់ ១៥%, ជួល ១០%, ប្រាក់ ៦%, ៤%, ១៤%", formula: lang==="en"?"WHT = Gross × Rate":"ពន្ធ = ប្រាក់ × អត្រា" },
    { en: "Public Lighting Tax", kh: "ពន្ធបំភ្លឺសាធារណៈ",             def_en: "5% sub-national tax on goods. Base removes VAT and Special Tax.", def_kh: "ពន្ធ ៥% ថ្នាក់ក្រោមជាតិ",                              formula: lang==="en"?"(Sales / 1.10) / 1.05 × 5%":"(លក់ / ១.១) / ១.០៥ × ៥%" },
    { en: "Accommodation Tax",   kh: "អាករស្នាក់នៅ",                 def_en: "2% on hotel and guesthouse room charges.", def_kh: "២% លើការស្នាក់នៅ",                                            formula: lang==="en"?"Invoice / 1.10 × 2%":"វិក្កយបត្រ / ១.១ × ២%" },
    { en: "Dividend Tax",        kh: "ពន្ធភាគលាភ",                  def_en: "15% on profit distributed as dividends.", def_kh: "១៥% លើភាគលាភ",                                              formula: lang==="en"?"Dividend × 15%":"ភាគលាភ × ១៥%" },
    { en: "Minimum Tax",         kh: "ពន្ធអប្បបរមា",                 def_en: "Ensures all enterprises pay at least 1% of gross annual revenue (excl. VAT).", def_kh: "ពន្ធអប្បបរមា ១% នៃចំណូល (មិនរួម VAT)",              formula: lang==="en"?"Revenue (excl. VAT) × 1% (pay higher of this or Profit Tax)":"ចំណូល (មិនរួម VAT) × ១%" },
    { en: "Rent & Land Tax",     kh: "ពន្ធជួលអចលនទ្រព្យ",            def_en: "10% on rental income from property and land.", def_kh: "១០% លើប្រាក់ចំណូលពីការជួលអចលនទ្រព្យ",                  formula: lang==="en"?"Rental Income × 10%":"ប្រាក់ជួល × ១០%" },
    { en: "Stamp Tax",   kh: "ពន្ធប្រថាប់ត្រា",          def_en: "4% on sale price when transferring land or property ownership.", def_kh: "៤% លើតម្លៃលក់ពេលផ្ទេរកម្មសិទ្ធិ",                  formula: lang==="en"?"Sale Price × 4%":"តម្លៃ × ៤%" },
    { en: "Property Tax",        kh: "ពន្ធអចលនទ្រព្យ",               def_en: "Annual tax on property value at 0.1% to 1%.", def_kh: "ពន្ធប្រចាំឆ្នាំ ០.១% ដល់ ១% លើអចលនទ្រព្យ",          formula: lang==="en"?"Property Value × Rate (0.1%–1%)":"តម្លៃ × អត្រា (០.១%-១%)" },
  ];
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {taxes.map((tx,i) => (
          <div key={i} style={{ ...calcCard, borderLeft: `4px solid ${gold}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 12, right: 14, color: "rgba(240,201,106,0.15)", fontSize: "2.2rem", fontWeight: 800 }}>{String(i+1).padStart(2,"0")}</div>
            <div style={{ color: gold2, fontWeight: 800, fontSize: "0.95rem", marginBottom: 2 }}>{tx.en}</div>
            <div style={{ color: white, fontWeight: 600, fontSize: "0.85rem", marginBottom: 10 }}>{tx.kh}</div>
            <div style={{ color: "#C5D5E8", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: 10 }}>{lang==="en"?tx.def_en:tx.def_kh}</div>
            <div style={{ background: "rgba(212,168,67,0.10)", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 12px", color: gold2, fontSize: "0.75rem" }}>
              <strong>{t.formula}:</strong> {tx.formula}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 1. SALARY TAX
// ═══════════════════════════════════════════════════════════
export function SalaryTab({ lang }) {
  const t = T[lang].salary;
  const [salary, setSalary] = useState("");
  const [resident, setRes] = useState("resident");
  const [spouse, setSpouse] = useState("0");
  const [children, setChild] = useState("");
  const [rice, setRice] = useState("");
  const [housing, setHousing] = useState("");
  const [transport, setTransport] = useState("");
  const [phone, setPhone] = useState("");
  const [medical, setMedical] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    const s = parseFloat(salary) || 0;
    if (s <= 0) { setResult(null); return; }
    const totalBenefits = (parseFloat(rice)||0)+(parseFloat(housing)||0)+(parseFloat(transport)||0)+(parseFloat(phone)||0)+(parseFloat(medical)||0)+(parseFloat(other)||0);
    const fringeTax = totalBenefits*0.20;
    if (resident==="nonresident") { const r=calcNonResidentTax(s); setResult({ type:"nr",...r,gross:s,totalBenefits,fringeTax,totalTax:r.tax+fringeTax }); }
    else { const deps=parseInt(spouse)+(parseInt(children)||0); const r=calcSalaryTax(s,deps); setResult({ type:"r",...r,gross:s,deps,totalBenefits,fringeTax,totalTax:r.tax+fringeTax }); }
  }, [salary, resident, spouse, children, rice, housing, transport, phone, medical, other]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.whoPays}:</strong> {t.whoPaysVal}<br />
        <strong style={{ color: gold2 }}>{t.resident}:</strong> {t.residentVal}<br />
        <strong style={{ color: gold2 }}>{t.nonResident}:</strong> {t.nonResidentVal} <strong style={{ color: gold2 }}>{t.due}:</strong> {t.dueVal}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>
          <label style={label}>{t.residentStatus}</label>
          <select style={select} value={resident} onChange={e=>setRes(e.target.value)}>
            <option value="resident">{t.residentOpt}</option>
            <option value="nonresident">{t.nonResidentOpt}</option>
          </select>
          <label style={label}>{t.grossSalary}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 5000000" value={salary} onChange={e=>setSalary(e.target.value)} />
          {resident==="resident" && <>
            <label style={label}>{t.nonWorkingSpouse}</label>
            <select style={select} value={spouse} onChange={e=>setSpouse(e.target.value)}>
              <option value="0">{t.noSpouse}</option>
              <option value="1">{t.yesSpouse}</option>
            </select>
            <label style={label}>{t.children}</label>
            <input className="input-focus" style={input} type="number" min="0" placeholder="0" value={children} onChange={e=>setChild(e.target.value)} />
            <div style={hint}>{t.childHint}</div>
          </>}
          <div style={divider} />
          <div style={{ color: gold2, fontSize: "0.78rem", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.benefits}</div>
          <div style={hint}>{t.benefitHint}</div>
          <label style={label}>{t.riceAllowance}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={rice} onChange={e=>setRice(e.target.value)} />
          <label style={label}>{t.housingAllowance}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={housing} onChange={e=>setHousing(e.target.value)} />
          <label style={label}>{t.transportAllowance}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={transport} onChange={e=>setTransport(e.target.value)} />
          <label style={label}>{t.phoneAllowance}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={phone} onChange={e=>setPhone(e.target.value)} />
          <label style={label}>{t.medicalAllowance}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={medical} onChange={e=>setMedical(e.target.value)} />
          <label style={label}>{t.otherBenefits}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={other} onChange={e=>setOther(e.target.value)} />
          <button style={btn} onClick={doCalc}>{t.calcBtn}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={t.grossLabel} value={fmt(result.gross)} />
            {result.totalBenefits>0 && <><Row label={lang==="en"?"Total Benefits":"អត្ថប្រយោជន៍សរុប"} value={fmt(result.totalBenefits)} /><Row label={t.fringeTaxLabel} value={fmt(result.fringeTax)} color="red" /></>}
            {result.type==="r" && result.deps>0 && <Row label={`${t.deductionLabel} (×${result.deps})`} value={"-"+fmt(result.deps*150000)} color="green" />}
            <Row label={t.taxableLabel} value={fmt(result.taxable)} />
            <Row label={lang==="en"?"Salary Tax":"ពន្ធបៀវត្ស"} value={fmt(result.tax)} color="red" />
            {result.totalBenefits>0 && <Row label={lang==="en"?"Total Tax":"ពន្ធសរុប"} value={fmt(result.totalTax)} color="red" />}
            <Row label={t.netLabel} value={fmt(result.net)} color="green" />
            <Row label={t.rateLabel} value={result.gross>0?((result.totalTax/result.gross)*100).toFixed(2)+"%":"0%"} color="gold" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.bracketsTitle}</div>
          <Table rows={[
            [lang==="en"?"Taxable Salary (KHR/month)":"ប្រាក់ជាប់ពន្ធ", lang==="en"?"Rate":"អត្រា", lang==="en"?"Formula":"រូបមន្ត"],
            ["0 - 1,500,000","0%","Tax = 0"],
            ["1,500,001 - 2,000,000","5%","S × 5% - 75,000"],
            ["2,000,001 - 8,500,000","10%","S × 10% - 175,000"],
            ["8,500,001 - 12,500,000","15%","S × 15% - 600,000"],
            [lang==="en"?"Above 12,500,000":"លើស ១២,៥០០,០០០","20%","S × 20% - 1,225,000"],
          ]} />
          <div style={divider} />
          <div style={{ color: gold2, fontSize: "0.78rem", fontWeight: 700, marginBottom: 8 }}>{lang==="en"?"Fringe Benefits (taxed at 20%)":"អត្ថប្រយោជន៍ (ពន្ធ ២០%)"}</div>
          <Table rows={[
            [lang==="en"?"Benefit Type":"ប្រភេទ", lang==="en"?"Tax Rate":"អត្រា", lang==="en"?"Note":"ចំណាំ"],
            [lang==="en"?"Rice / Food allowance":"ប្រាក់ឧបត្ថម្ភម្ហូប", "20%", lang==="en"?"Taxable":"ជាប់ពន្ធ"],
            [lang==="en"?"Housing allowance":"ប្រាក់ឧបត្ថម្ភលំនៅ", "20%", lang==="en"?"Taxable":"ជាប់ពន្ធ"],
            [lang==="en"?"Transport allowance":"ប្រាក់ឧបត្ថម្ភដឹក", "20%", lang==="en"?"Taxable":"ជាប់ពន្ធ"],
            [lang==="en"?"Phone allowance":"ប្រាក់ទូរស័ព្ទ", "20%", lang==="en"?"Taxable":"ជាប់ពន្ធ"],
            [lang==="en"?"Travel (per labor law)":"ប្រាក់ធ្វើដំណើរ", "0%", lang==="en"?"Exempt":"លើកលែង"],
            [lang==="en"?"Uniform (all staff)":"ឯកសណ្ឋាន", "0%", lang==="en"?"Exempt":"លើកលែង"],
            ["NSSF", "0%", lang==="en"?"Exempt":"លើកលែង"],
          ]} />
          <div style={hint}>{t.benefitNote}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 2. PREPAYMENT
// ═══════════════════════════════════════════════════════════
export function PrepaymentTab({ lang }) {
  const t = T[lang].prepayment;
  const [incomes, setIncomes] = useState(Array(12).fill(""));
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState(null);
  const handleIncome = (i, v) => { const c = [...incomes]; c[i] = v; setIncomes(c); };
  const monthlyResults = useMemo(() => incomes.map(v => { const r = parseFloat(v) || 0; return r > 0 ? calcPrepaymentTax(r) : null; }), [incomes]);
  const totals = useMemo(() => {
    let rev = 0, base = 0, tax = 0;
    monthlyResults.forEach((r, i) => { if (r) { rev += parseFloat(incomes[i]) || 0; base += r.base; tax += r.tax; } });
    return { rev, base, tax };
  }, [monthlyResults, incomes]);
  const doCalc = () => {
    const vals = incomes.map(v => parseFloat(v) || 0);
    const exp = parseFloat(expenses) || 0;
    const totRev = vals.reduce((s, v) => s + v, 0);
    const netProfit = (totRev / 1.10) - exp;
    setResult({
      monthly: { rev: totals.rev, base: totals.base, prepay: totals.tax },
      annual: { netProfit, incomeTax: netProfit > 0 ? netProfit * 0.20 : 0, minimumTax: totals.base * 0.01, prepayTotal: totals.tax },
    });
  };
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.formula}:</strong> {t.formulaVal}<br />
        <strong style={{ color: gold2 }}>{t.whoPays}:</strong> {t.whoPaysVal}<strong style={{ color: gold2 }}> {t.due}:</strong> {t.dueVal}
      </div>
      <div className="card-hover" style={calcCard}>
        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
          {t.monthLabels.map((ml, i) => (
            <div key={i}>
              <label style={{ ...label, marginTop: 4, fontSize: "0.6rem" }}>{ml}</label>
              <input className="input-focus" style={input} type="number" placeholder="0" value={incomes[i]} onChange={e => handleIncome(i, e.target.value)} />
            </div>
          ))}
        </div>
        <label style={label}>{t.expensesLabel}</label>
        <input className="input-focus" style={input} type="number" placeholder="0" value={expenses} onChange={e => setExpenses(e.target.value)} />
        <button style={btn} onClick={doCalc}>{t.calcBtn}</button>
        {result && totals.base > 0 && <div className="result-fade" style={{ marginTop: 16 }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: gold2, marginBottom: 10 }}>{lang==="en"?"Monthly Prepayment Breakdown":"តារាងរំដោះពន្ធប្រចាំខែ"}</div>
          <Table rows={[
            [t.monthCol, t.revenueCol, t.baseCol, t.prepaymentCol],
            ...t.monthLabels.map((ml, i) => {
              const r = monthlyResults[i];
              const val = parseFloat(incomes[i]) || 0;
              return [ml, fmt(val), r ? fmt(r.base) : "—", r ? fmt(r.tax) : "—"];
            }),
            [t.totalRow, fmt(result.monthly.rev), fmt(result.monthly.base), fmt(result.monthly.prepay)],
          ]} />
          <div style={{ borderTop: `2px solid ${gold}`, margin: "12px 0" }} />
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: gold2, marginBottom: 10 }}>{t.annualTitle}</div>
          <Row label={t.netProfit} value={fmt(result.annual.netProfit)} color={result.annual.netProfit < 0 ? "red" : "green"} />
          <Row label={lang==="en"?"Status":"ស្ថានភាព"} value={result.annual.netProfit < 0 ? t.lossStatus : t.profitStatus} color={result.annual.netProfit < 0 ? "red" : "green"} />
          {result.annual.netProfit > 0 && <Row label={t.incomeTax} value={fmt(result.annual.incomeTax)} />}
          <Row label={t.minimumTax} value={fmt(result.annual.minimumTax)} color="gold" />
          <Row label={lang==="en"?"Prepayment Credit":"ឥណទានរំដោះពន្ធ"} value={"−" + fmt(result.annual.prepayTotal)} color="green" />
          <div style={{ borderTop: `1px dashed ${border}`, margin: "8px 0" }} />
          <Row label={t.finalPayable} value={fmt(Math.max(result.annual.incomeTax, result.annual.minimumTax) - result.annual.prepayTotal)} color={Math.max(result.annual.incomeTax, result.annual.minimumTax) - result.annual.prepayTotal > 0 ? "red" : "green"} />
          <div style={{ ...hint, marginTop: 10, padding: "10px 12px", background: result.annual.netProfit < 0 ? "rgba(230,57,70,0.1)" : "rgba(39,174,96,0.1)", borderRadius: 8, border: `1px solid ${result.annual.netProfit < 0 ? red : green}`, fontSize: "0.75rem", lineHeight: 1.6 }}>
            <strong style={{ color: result.annual.netProfit < 0 ? red : green }}>{result.annual.netProfit < 0 ? t.minTaxApplied : t.profitTaxApplied}</strong>
            <div style={{ marginTop: 4, color: muted }}>{t.creditNote}</div>
          </div>
        </div>}
      </div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}:</strong><br />
        <div style={{ fontSize: "0.82rem", color: "#B8C8DC", lineHeight: 1.9, marginTop: 4 }}>
          <p>{t.exampleNote}</p>
          <p><strong style={{ color: gold2 }}>{lang==="en"?"Base":"Base"}:</strong> 110,000,000 / 1.10 = 100,000,000 ៛</p>
          <p><strong style={{ color: gold2 }}>{lang==="en"?"Prepayment Tax":"រំដោះពន្ធ"}:</strong> 100,000,000 × 1% = 1,000,000 ៛</p>
          <p><strong style={{ color: gold2 }}>{lang==="en"?"Annual Net Profit":"ប្រាក់ចំណេញសុទ្ធ"}:</strong> {lang==="en"?"Total Revenue / 1.10 − Expenses":"ចំណូលសរុប / ១.១០ − ចំណាយ"}</p>
          <p><strong style={{ color: gold2 }}>{lang==="en"?"If Loss":"បើខាតបង់"}:</strong> {lang==="en"?"Minimum Tax (1% of base) applies":"អនុវត្តពន្ធអប្បបរមា ១%"}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 3. VAT
// ═══════════════════════════════════════════════════════════
export function VATTab({ lang }) {
  const t = T[lang].vat;
  const [mode, setMode] = useState("sales");
  const [sales, setSales] = useState("");
  const [purch, setPurch] = useState("");
  const [cif, setCif] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    if (mode==="sales") { const s=parseFloat(sales)||0, p=parseFloat(purch)||0; if (s>0||p>0) setResult({ mode:"sales",s,p,outVAT:s*0.10,inVAT:p*0.10,net:s*0.10-p*0.10 }); else setResult(null); }
    else { const c=parseFloat(cif)||0; if (c>0) setResult({ mode:"import",c,vat:c*0.10,total:c*1.10 }); else setResult(null); }
  }, [mode, sales, purch, cif]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.standardRate}:</strong> 10% | <strong style={{ color: gold2 }}> {t.zero}:</strong> 0% | <strong style={{ color: gold2 }}> {t.exempt}:</strong> {lang==="en"?"food, medical, education":"ម្ហូបអាហារ ពេទ្យ ការអប់រំ"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>
          <label style={label}>{t.mode}</label>
          <select style={select} value={mode} onChange={e=>{setMode(e.target.value);setResult(null);}}>
            <option value="sales">{t.salesMode}</option>
            <option value="import">{t.importMode}</option>
          </select>
          {mode==="sales" ? <>
            <label style={label}>{t.salesLabel}</label><input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={sales} onChange={e=>setSales(e.target.value)} />
            <label style={label}>{t.purchaseLabel}</label><input className="input-focus" style={input} type="number" placeholder="e.g. 6000000" value={purch} onChange={e=>setPurch(e.target.value)} />
          </> : <>
            <label style={label}>{t.cifLabel}</label><input className="input-focus" style={input} type="number" placeholder="e.g. 1100000" value={cif} onChange={e=>setCif(e.target.value)} />
          </>}
          <button style={btn} onClick={doCalc}>{t.calcBtn}</button>
          {result && <div className="result-fade" style={resultBox}>
            {result.mode==="sales" ? <>
              <Row label={lang==="en"?"Sales (ex-VAT)":"ការលក់ (មុន VAT)"} value={fmt(result.s)} />
              <Row label="Output VAT (10%)" value={fmt(result.outVAT)} color="red" />
              <Row label={lang==="en"?"Purchase (ex-VAT)":"ការទិញ (មុន VAT)"} value={fmt(result.p)} />
              <Row label="Input VAT" value={"-"+fmt(result.inVAT)} color="green" />
              <Row label={lang==="en"?"Net VAT Payable":"VAT ត្រូវបង់"} value={fmt(result.net)} color={result.net<0?"green":"gold"} />
            </> : <>
              <Row label="CIF" value={fmt(result.c)} /><Row label="Import VAT (10%)" value={fmt(result.vat)} color="red" /><Row label={lang==="en"?"Total":"សរុប"} value={fmt(result.total)} color="gold" />
            </>}
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.ratesTitle}</div>
          <Table rows={[
            [lang==="en"?"Supply Type":"ប្រភេទ", lang==="en"?"Rate":"អត្រា"],
            [lang==="en"?"Standard goods/services":"ទំនិញ/សេវា","10%"],
            [lang==="en"?"Exports":"នាំចេញ","0%"],
            [lang==="en"?"Basic food":"ម្ហូបអាហារ",lang==="en"?"Exempt":"លើកលែង"],
            [lang==="en"?"Medical services":"ពេទ្យ",lang==="en"?"Exempt":"លើកលែង"],
            [lang==="en"?"Education":"ការអប់រំ",lang==="en"?"Exempt":"លើកលែង"],
            [lang==="en"?"International transport":"ដឹកទំនិញអន្តរជាតិ","0%"],
          ]} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. SPECIAL TAX
// ═══════════════════════════════════════════════════════════
const SP_GOODS = {
  alcohol:{label:"Alcohol / Liquor",label_kh:"គ្រឿងស្រវឹង",rate:0.35},
  beer:{label:"Beer",label_kh:"ស្រាបៀរ",rate:0.30},
  cigarette:{label:"Cigarettes",label_kh:"បារី",rate:0.20},
  cigar:{label:"Cigars",label_kh:"ស៊ីហ្គារ",rate:0.25},
  drinks:{label:"Soft Drinks",label_kh:"ភេសជ្ជៈ",rate:0.10},
  cement:{label:"Cement",label_kh:"ស៊ីម៉ង់ត៍",rate:0.05},
};
const SP_SVC = {
  air:{label:"Air Tickets",label_kh:"សំបុត្រយន្តហោះ",rate:0.10},
  leisure:{label:"Leisure / Entertainment",label_kh:"កម្សាន្ត",rate:0.10},
  telecom:{label:"Telecommunications",label_kh:"ទូរគមនាគមន៍",rate:0.03},
};
export function SpecialTab({ lang }) {
  const [type, setType] = useState("goods_first");
  const [gCat, setGCat] = useState("alcohol");
  const [sCat, setSCat] = useState("air");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    const p=parseFloat(price)||0;
    if (p<=0) { setResult(null); return; }
    if (type==="goods_local"){const r=SP_GOODS[gCat].rate;setResult({kind:"local",rate:r,...calcSpecialLocal(p,r)});}
    else if (type==="goods_first"){const r=SP_GOODS[gCat].rate;setResult({kind:"first",rate:r,...calcSpecialFirstSeller(p,r)});}
    else if (type==="goods_resell"){setResult({kind:"resell",rate:0.05,...calcSpecialReseller(p)});}
    else{const r=SP_SVC[sCat].rate;setResult({kind:"service",rate:r,base:p,tax:p*r});}
  }, [type, gCat, sCat, price]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Special Tax — អាករពិសេស":"អាករពិសេស"}</div>
      <div style={subt}>{lang==="en"?"Excise tax on specific goods and services.":"អាករលើទំនិញ និងសេវាពិសេស។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Goods":"ទំនិញ"}:</strong> {lang==="en"?"Alcohol 35% | Beer 30% | Cigarettes 20% | Drinks 10% | Cement 5%":"ស្រា ៣៥% | បៀរ ៣០% | បារី ២០% | ភេសជ្ជៈ ១០% | ស៊ីម៉ង់ ៥%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Services":"សេវា"}:</strong> {lang==="en"?"Air tickets 10% | Leisure 10% | Telecom 3%":"ហោះហើរ ១០% | កម្សាន្ត ១០% | ទូរគមនាគមន៍ ៣%"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Calculation Type":"ប្រភេទការគណនា"}</label>
          <select style={select} value={type} onChange={e=>{setType(e.target.value);setResult(null);}}>
            <option value="goods_first">{lang==="en"?"First-time seller (/ 1.10 / 1.05)":"អ្នកលក់ដំបូង (/ ១.១០ / ១.០៥)"}</option>
            <option value="goods_local">{lang==="en"?"Local manufacturer (90% base)":"អ្នកផលិតក្នុងស្រុក (90%)"}</option>
            <option value="goods_resell">{lang==="en"?"Reseller (20% of base × 5%)":"អ្នកលក់ម្តងទៀត"}</option>
            <option value="service">{lang==="en"?"Services":"សេវាកម្ម"}</option>
          </select>
          {type!=="service" && <>
            <label style={label}>{lang==="en"?"Goods Category":"ប្រភេទទំនិញ"}</label>
            <select style={select} value={gCat} onChange={e=>setGCat(e.target.value)}>
              {Object.entries(SP_GOODS).map(([k,v])=><option key={k} value={k}>{lang==="en"?v.label:v.label_kh} -- {(v.rate*100).toFixed(0)}%</option>)}
            </select>
          </>}
          {type==="service" && <>
            <label style={label}>{lang==="en"?"Service Category":"ប្រភេទសេវា"}</label>
            <select style={select} value={sCat} onChange={e=>setSCat(e.target.value)}>
              {Object.entries(SP_SVC).map(([k,v])=><option key={k} value={k}>{lang==="en"?v.label:v.label_kh} -- {(v.rate*100).toFixed(0)}%</option>)}
            </select>
          </>}
          <label style={label}>{lang==="en"?"Sales Price on Invoice (KHR)":"តម្លៃលក់ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={price} onChange={e=>setPrice(e.target.value)} />
          <button style={btn} onClick={doCalc}>{lang==="en"?"Calculate Special Tax":"គណនាអាករពិសេស"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Sales Price":"តម្លៃ"} value={fmt(parseFloat(price))} />
            <Row label={lang==="en"?"Tax Base":"មូលដ្ឋានពន្ធ"} value={fmt(result.base)} />
            <Row label={`${lang==="en"?"Special Tax":"អាករ"} (${(result.rate*100).toFixed(0)}%)`} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Schedule":"តារាងអត្រា"}</div>
          <Table rows={[
            [lang==="en"?"Goods / Service":"ទំនិញ / សេវា", lang==="en"?"Rate":"អត្រា"],
            [lang==="en"?"Alcohol / Liquor":"ស្រា","35%"],[lang==="en"?"Beer":"ស្រាបៀរ","30%"],
            [lang==="en"?"Cigarettes":"បារី","20%"],[lang==="en"?"Cigars":"ស៊ីហ្គារ","25%"],
            [lang==="en"?"Soft Drinks":"ភេសជ្ជៈ","10%"],[lang==="en"?"Cement":"ស៊ីម៉ង់ត៍","5%"],
            [lang==="en"?"Air Tickets / Leisure":"ហោះ/កម្សាន្ត","10%"],[lang==="en"?"Telecommunications":"ទូរគមនាគមន៍","3%"],
          ]} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 5. WITHHOLDING TAX
// ═══════════════════════════════════════════════════════════
const WHT_CATS = {
  services:{label:"Services",label_kh:"សេវាកម្ម",rate:15,descEn:"Payment for service providers (management, consulting, technical).",descKh:"ការទូទាត់សម្រាប់អ្នកផ្តល់សេវា ដូចជា សេវាគ្រប់គ្រង ពិគ្រោះយោបល់ បច្ចេកទេស។",example:"10,000,000 × 15% = 1,500,000"},
  royalties:{label:"Royalties",label_kh:"សួយសារ",rate:15,descEn:"Copyright, trademark, patent, software license, brand name.",descKh:"កម្មសិទ្ធិបញ្ញា ម៉ាកយីហោ ប៉ាតង់ Software License សិទ្ធិប្រើប្រាស់បច្ចេកវិទ្យា។",example:"2,000,000 × 15% = 300,000"},
  interest:{label:"Interest on loans",label_kh:"ការប្រាក់",rate:15,descEn:"Interest payment on loans (non-bank/financial institution).",descKh:"ការបង់ការប្រាក់ទៅអ្នកជាប់ពន្ធនិវាសនជន ដែលមិនមែនជាធនាគារ ឬស្ថាប័នហិរញ្ញវត្ថុក្នុងស្រុក។",example:"1,000,000 × 15% = 150,000"},
  rental:{label:"Rental income",label_kh:"ជួល",rate:10,descEn:"Rental of movable or immovable property.",descKh:"ចំណូលពីការឲ្យជួលចលនទ្រព្យ ឬអចលនទ្រព្យ ដូចជា ផ្ទះ ដី អគារ ការិយាល័យ ឡាន ឧបករណ៍។",example:"2,000,000 × 10% = 200,000"},
  fixed_dep:{label:"Fixed deposit interest",label_kh:"ការប្រាក់ គណនីបញ្ញើមានកំណត់",rate:6,descEn:"Interest from fixed deposit accounts at banks/financial institutions.",descKh:"ការប្រាក់ពីគណនីបញ្ញើមានកំណត់ រយៈពេល ៣ខែ ៦ខែ ឬ ១ឆ្នាំ។",example:"1,000,000 × 6% = 60,000"},
  savings:{label:"Savings account interest",label_kh:"ការប្រាក់ គណនីសន្សំគ្មានកំណត់",rate:4,descEn:"Interest from regular savings accounts (no fixed term).",descKh:"ការប្រាក់ពីគណនីសន្សំធម្មតា ដែលមិនមានរយៈពេលកំណត់ អាចដកប្រាក់ពេលណាក៏បាន។",example:"1,000,000 × 4% = 40,000"},
};
export function WHTTab({ lang }) {
  const t = T[lang].withholding;
  const [res, setRes] = useState("resident");
  const [cat, setCat] = useState("services");
  const [gross, setGross] = useState("");
  const [result, setResult] = useState(null);
  const effRate = res==="nonresident"?14:WHT_CATS[cat]?.rate||15;
  useEffect(() => {
    const g = parseFloat(gross) || 0;
    if (g > 0) setResult(calcWHT(g, effRate));
    else setResult(null);
  }, [gross, effRate]);
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.formula}:</strong> {t.formulaVal}<br />
        <strong style={{ color: gold2 }}>{t.net}:</strong> {t.netVal}<br />
        <strong style={{ color: gold2 }}>{t.residentRates}:</strong> {t.residentRatesVal}<br />
        <strong style={{ color: gold2 }}>{t.nonResidentRate}:</strong> {t.nonResidentRateVal}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>
          <label style={label}>{t.recipientType}</label>
          <select style={select} value={res} onChange={e=>setRes(e.target.value)}>
            <option value="resident">{t.residentOpt}</option>
            <option value="nonresident">{t.nonResidentOpt}</option>
          </select>
          {res==="resident" && <>
            <label style={label}>{t.category}</label>
            <select style={select} value={cat} onChange={e=>setCat(e.target.value)}>
              {Object.entries(WHT_CATS).map(([k,v])=><option key={k} value={k}>{lang==="en"?v.label:v.label_kh} -- {v.rate}%</option>)}
            </select>
            <div style={hint}>{lang==="en"?WHT_CATS[cat]?.descEn:WHT_CATS[cat]?.descKh}</div>
          </>}
          <label style={label}>{t.grossLabel}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={gross} onChange={e=>setGross(e.target.value)} />
          <div style={hint}>{lang==="en"?"Effective rate":"អត្រា"}: {effRate}%</div>
          <button style={btn} onClick={()=>setResult(calcWHT(parseFloat(gross)||0,effRate))}>{t.calcBtn}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Gross Payment":"ប្រាក់ទូទាត់"} value={fmt(parseFloat(gross))} />
            <Row label={lang==="en"?"WHT Rate":"អត្រា"} value={effRate+"%"} />
            <Row label={lang==="en"?"WHT Amount":"ចំនួនពន្ធ"} value={fmt(result.wht)} color="red" />
            <Row label={lang==="en"?"Net to Recipient":"ប្រាក់ទទួល"} value={fmt(result.net)} color="green" />
            <Row label={lang==="en"?"Remit to GDT":"ត្រូវបង់ GDT"} value={fmt(result.wht)} color="gold" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.rateRef}</div>
          <div style={{ fontSize: "0.7rem", color: muted, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>{t.residents}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Category":"ប្រភេទ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Example":"ឧទាហរណ៏"}</th></tr>
            </thead>
            <tbody>
              {Object.entries(WHT_CATS).map(([k,v])=>{
                const active=res==="resident"&&cat===k;
                const bg=active?"rgba(212,168,67,0.10)":"transparent";
                const bdr=active?`1px solid ${gold}`:"1px solid transparent";
                return <tr key={k} style={{background:bg,border:bdr,borderRadius:4,cursor:"pointer"}} onClick={()=>{setRes("resident");setCat(k);}}>
                  <td style={{padding:"5px 6px",borderBottom:"1px solid rgba(255,255,255,0.04)",color:"#C5D5E8"}}>
                    <div style={{fontWeight:600}}>{lang==="en"?v.label:v.label_kh}</div>
                    <div style={{fontSize:"0.62rem",color:muted}}>{lang==="en"?v.descEn:v.descKh}</div>
                  </td>
                  <td style={{padding:"5px 6px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.04)",color:gold,fontWeight:700,fontSize:"0.85rem"}}>{v.rate}%</td>
                  <td style={{padding:"5px 6px",borderBottom:"1px solid rgba(255,255,255,0.04)",color:"#B8C8DC",fontFamily:"monospace",fontSize:"0.62rem"}}>{v.example}</td>
                </tr>;
              })}
            </tbody>
          </table>
          <div style={{ fontSize: "0.7rem", color: muted, fontWeight: 700, margin: "10px 0 6px", textTransform: "uppercase" }}>{t.nonResidents}</div>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"6px 8px",background:res==="nonresident"?"rgba(212,168,67,0.10)":"transparent",border:res==="nonresident"?`1px solid ${gold}`:"1px solid transparent",borderRadius:6,cursor:"pointer"}} onClick={()=>setRes("nonresident")}>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.75rem",fontWeight:600,color:"#C5D5E8"}}>{lang==="en"?"All payments":"ទាំងអស់"}</div>
              <div style={{fontSize:"0.62rem",color:muted}}>{lang==="en"?"Flat rate for non-resident recipients":"អត្រាសម្រាប់អ្នកទទួលជាអនិវាសនជន"}</div>
            </div>
            <div style={{fontSize:"0.9rem",fontWeight:700,color:gold}}>14%</div>
            <div style={{fontSize:"0.62rem",color:"#B8C8DC",fontFamily:"monospace"}}>10,000,000 × 14% = 1,400,000</div>
          </div>
          <div style={hint}>{t.exemptions}</div>
          <div style={hint}>{t.dueNote}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SIMPLE CALC TAB HELPER
// ═══════════════════════════════════════════════════════════
function SimpleCalcTab({ lang, titleEn, titleKh, subEn, subKh, boxContent, labelEn, labelKh, placeholder, calcFn, renderRows, exampleContent }) {
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const v = parseFloat(val) || 0;
    if (v > 0) setResult(calcFn(v));
    else setResult(null);
  }, [val]);
  return (
    <div>
      <div style={title}>{lang==="en"?titleEn:titleKh}</div>
      <div style={subt}>{lang==="en"?subEn:subKh}</div>
      <div style={box}>{boxContent(lang)}</div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?labelEn:labelKh}</label>
          <input className="input-focus" style={input} type="number" placeholder={placeholder} value={val} onChange={e=>setVal(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcFn(parseFloat(val)||0))}>{lang==="en"?`Calculate ${titleEn}`:`គណនា${titleKh}`}</button>
          {result && <div className="result-fade" style={resultBox}>{renderRows(result,parseFloat(val)||0,lang)}</div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}</div>
          {exampleContent(lang)}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 6. PUBLIC LIGHTING TAX
// ═══════════════════════════════════════════════════════════
export function PublicLightingTab({ lang }) {
  const [mode, setMode] = useState("retailer");
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    const p = parseFloat(val) || 0;
    if (p > 0) setResult(calcLighting(p, mode));
    else setResult(null);
  }, [val, mode]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Public Lighting Tax":"ពន្ធបំភ្លឺសាធារណៈ"}</div>
      <div style={subt}>{lang==="en"?"5% sub-national tax on goods.":"ពន្ធ ៥% ថ្នាក់ក្រោមជាតិលើទំនិញ។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong><br />
        {lang==="en" ? <>
          <span style={{color:"#B8C8DC"}}>First Seller: Base = Invoice / 1.10 / 1.05 → Tax = Base × 5%</span><br />
          <span style={{color:"#B8C8DC"}}>Reseller: Base = (Invoice / 1.10 / 1.05) × 20% → Tax = Base × 5%</span>
        </> : <>
          <span style={{color:"#B8C8DC"}}>អ្នកលក់ដំបូង: មូលដ្ឋាន = វិក្កយបត្រ / ១.១ / ១.០៥ → ពន្ធ = មូលដ្ឋាន × ៥%</span><br />
          <span style={{color:"#B8C8DC"}}>អ្នកលក់លើកទីពីរ: មូលដ្ឋាន = (វិក្កយបត្រ / ១.១ / ១.០៥) × ២០% → ពន្ធ = មូលដ្ឋាន × ៥%</span>
        </>}
        <br /><strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> 5%
      </div>
      <div className="card-hover" style={calcCard}>
        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button style={{ padding: "6px 14px", borderRadius: 6, border: mode==="retailer" ? `2px solid ${gold}` : `1px solid ${border}`, background: mode==="retailer" ? "rgba(212,168,67,0.15)" : "transparent", color: mode==="retailer" ? gold : muted, cursor: "pointer", fontSize: "0.78rem" }} onClick={() => setMode("retailer")}>{lang==="en"?"First Seller":"អ្នកលក់ដំបូង"}</button>
          <button style={{ padding: "6px 14px", borderRadius: 6, border: mode==="producer" ? `2px solid ${gold}` : `1px solid ${border}`, background: mode==="producer" ? "rgba(212,168,67,0.15)" : "transparent", color: mode==="producer" ? gold : muted, cursor: "pointer", fontSize: "0.78rem" }} onClick={() => setMode("producer")}>{lang==="en"?"Reseller":"អ្នកលក់លើកទីពីរ"}</button>
        </div>
        <label style={label}>{lang==="en"?"Invoice Price (KHR)":"ថ្លៃវិក្កយបត្រ (រៀល)"}</label>
        <input className="input-focus" style={input} type="number" placeholder="e.g. 11550000" value={val} onChange={e => setVal(e.target.value)} />
        {result && <div className="result-fade" style={resultBox}>
          {mode === "retailer" ? <>
            <Row label={lang==="en"?"Invoice Price":"ថ្លៃវិក្កយបត្រ"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"Step 1: Remove VAT (/1.10)":"ជំហាន ១: ដក VAT (/១.១០)"} value={fmt(parseFloat(val)/1.10)} />
            <Row label={lang==="en"?"Step 2: Remove Lighting Tax (/1.05)":"ជំហាន ២: ដក (/១.០៥)"} value={fmt(result.base)} />
            <Row label={lang==="en"?"Tax Base":"មូលដ្ឋានពន្ធ"} value={fmt(result.taxableBase)} />
            <Row label={lang==="en"?"Public Lighting Tax (5%)":"ពន្ធ (៥%)"} value={fmt(result.tax)} color="red" />
          </> : <>
            <Row label={lang==="en"?"Invoice Price":"ថ្លៃវិក្កយបត្រ"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"Step 1: Remove VAT (/1.10)":"ជំហាន ១: ដក VAT (/១.១០)"} value={fmt(parseFloat(val)/1.10)} />
            <Row label={lang==="en"?"Step 2: Remove (/1.05)":"ជំហាន ២: ដក (/១.០៥)"} value={fmt(result.base)} />
            <Row label={lang==="en"?"Step 3: 20% for Reseller":"ជំហាន ៣: ២០% សម្រាប់អ្នកលក់លើកទីពីរ"} value={fmt(result.taxableBase)} />
            <Row label={lang==="en"?"Public Lighting Tax (5% × 20%)":"ពន្ធ (៥% × ២០%)"} value={fmt(result.tax)} color="red" />
          </>}
        </div>}
      </div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}:</strong><br />
        <div style={{ fontSize: "0.82rem", color: "#B8C8DC", lineHeight: 1.9, marginTop: 4 }}>
          {mode === "retailer" ? <>
            <p>{lang==="en"?"Invoice Price = 11,550,000 KHR":"ថ្លៃវិក្កយបត្រ = ១១,៥៥០,០០០ រៀល"}</p>
            <p><strong style={{ color: gold2 }}>/ 1.10:</strong> 10,500,000 ៛</p>
            <p><strong style={{ color: gold2 }}>/ 1.05:</strong> 10,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>× 5%:</strong> <strong style={{ color: red }}>500,000 ៛</strong></p>
          </> : <>
            <p>{lang==="en"?"Invoice Price = 11,550,000 KHR":"ថ្លៃវិក្កយបត្រ = ១១,៥៥០,០០០ រៀល"}</p>
            <p><strong style={{ color: gold2 }}>/ 1.10:</strong> 10,500,000 ៛</p>
            <p><strong style={{ color: gold2 }}>/ 1.05:</strong> 10,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>× 20%:</strong> 2,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>× 5%:</strong> <strong style={{ color: red }}>100,000 ៛</strong></p>
          </>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 7. ACCOMMODATION TAX
// ═══════════════════════════════════════════════════════════
export function AccommodationTab({ lang }) {
  return <SimpleCalcTab lang={lang}
    titleEn="Accommodation Tax" titleKh="អាករស្នាក់នៅ"
    subEn="2% on hotel and guesthouse charges." subKh="២% លើការស្នាក់នៅ"
    boxContent={(l)=><><strong style={{color:gold2}}>{l==="en"?"Formula":"រូបមន្ត"}:</strong> Invoice / 1.10 × 2%<br /><strong style={{color:gold2}}>{l==="en"?"Rate":"អត្រា"}:</strong> 2%</>}
    labelEn="Invoice Price Including VAT (KHR)" labelKh="តម្លៃវិក្កយបត្រ (រៀល)"
    placeholder="e.g. 1100000"
    calcFn={calcAccom}
    renderRows={(r,v,l)=><>
      <Row label={l==="en"?"Invoice (incl. VAT)":"វិក្កយបត្រ"} value={fmt(v)} />
      <Row label={l==="en"?"Tax Base (/ 1.10)":"មូលដ្ឋាន"} value={fmt(r.base)} />
      <Row label={l==="en"?"Accommodation Tax (2%)":"ពន្ធ (២%)"} value={fmt(r.tax)} color="red" />
    </>}
    exampleContent={(l)=><div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
      <p><strong style={{color:gold2}}>{l==="en"?"Invoice":"វិក្កយបត្រ"}:</strong> 1,100,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Base":"Base"}:</strong> 1,100,000 / 1.10 = 1,000,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Tax":"ពន្ធ"}:</strong> 1,000,000 × 2% = 20,000 ៛</p>
    </div>}
  />;
}

// ═══════════════════════════════════════════════════════════
// 8. DIVIDEND TAX
// ═══════════════════════════════════════════════════════════
const DIVIDEND_CASES = {
  resident_individual:{label:"Resident shareholder (company paid CIT)",label_kh:"ម្ចាស់ភាគហ៊ុននិវាសនជន (ក្រុមហ៊ុនបានបង់ CIT)",rate:0,note:"0% — no need to pay dividend tax again",note_kh:"០% — មិនចាំបាច់បង់ពន្ធភាគលាភទៀតទេ"},
  nonresident:{label:"Non-resident shareholder (no DTA)",label_kh:"ម្ចាស់ភាគហ៊ុនអនិវាសនជន (គ្មាន DTA)",rate:14,note:"14% withholding tax",note_kh:"កាត់ទុក ១៤%"},
  nonresident_dta:{label:"Non-resident shareholder (with DTA)",label_kh:"ម្ចាស់ភាគហ៊ុនអនិវាសនជន (មាន DTA)",rate:10,note:"Reduced to 10% under DTA",note_kh:"បន្ថយមក ១០% ក្រោមសន្ធិសញ្ញា DTA"},
};
export function DividendTab({ lang }) {
  const tabName = T[lang].tabs.dividend;
  const [amount, setAmount] = useState("");
  const [caseType, setCaseType] = useState("resident_individual");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const a = parseFloat(amount) || 0;
    if (a > 0) setResult(calcDividend(a, DIVIDEND_CASES[caseType].rate));
    else setResult(null);
  }, [amount, caseType]);
  const currentCase = DIVIDEND_CASES[caseType];
  return (
    <div>
      <div style={title}>{tabName}</div>
      <div style={subt}>{lang==="en"?"Dividend tax rate depends on recipient and entity type.":"អត្រាពន្ធភាគលាភអាស្រ័យលើប្រភេទអ្នកទទួល និងក្រុមហ៊ុន។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Key Concept":"គោលការណ៍"}:</strong> {lang==="en"?"Dividend tax rate depends on recipient type and entity type.":"អត្រាពន្ធភាគលាភអាស្រ័យលើប្រភេទអ្នកទទួល និងប្រភេទក្រុមហ៊ុន។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Scenario":"សេណារីយ៉ូ"}</label>
          <select style={select} value={caseType} onChange={e=>setCaseType(e.target.value)}>
            {Object.entries(DIVIDEND_CASES).map(([k,v])=><option key={k} value={k}>{lang==="en"?v.label:v.label_kh}</option>)}
          </select>
          <div style={hint}>{lang==="en"?currentCase.note:currentCase.note_kh}</div>
          <label style={label}>{lang==="en"?"Dividend Amount (KHR)":"ចំនួនភាគលាភ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={amount} onChange={e=>setAmount(e.target.value)} />
          <div style={hint}>{lang==="en"?"Rate":"អត្រា"}: {currentCase.rate}%</div>
          <button style={btn} onClick={()=>setResult(calcDividend(parseFloat(amount)||0,currentCase.rate))}>{lang==="en"?"Calculate Dividend Tax":"គណនាពន្ធភាគលាភ"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Dividend Amount":"ចំនួនភាគលាភ"} value={fmt(parseFloat(amount))} />
            <Row label={lang==="en"?"Tax Rate":"អត្រាពន្ធ"} value={currentCase.rate+"%"} />
            <Row label={lang==="en"?"Dividend Tax":"ពន្ធភាគលាភ"} value={fmt(result.tax)} color="red" />
            {currentCase.rate > 0 && <Row label={lang==="en"?"Net to Recipient":"ប្រាក់ទទួលសុទ្ធ"} value={fmt(result.net)} color="green" />}
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Scenario":"សេណារីយ៉ូ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th></tr>
            </thead>
            <tbody>
              {Object.entries(DIVIDEND_CASES).map(([k,v])=>{
                const active=caseType===k;
                const bg=active?"rgba(212,168,67,0.10)":"transparent";
                return <tr key={k} style={{background:bg,cursor:"pointer"}} onClick={()=>setCaseType(k)}>
                  <td style={{padding:"5px 6px",borderBottom:"1px solid rgba(255,255,255,0.04)",color:"#C5D5E8"}}>
                    <div style={{fontWeight:600}}>{lang==="en"?v.label:v.label_kh}</div>
                    <div style={{fontSize:"0.62rem",color:muted}}>{lang==="en"?v.note:v.note_kh}</div>
                  </td>
                  <td style={{padding:"5px 6px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.04)",color:gold,fontWeight:700,fontSize:"0.85rem"}}>{v.rate}%</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 9. MINIMUM TAX
// ═══════════════════════════════════════════════════════════
export function MinimumTaxTab({ lang }) {
  const [rev, setRev] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    const r=parseFloat(rev)||0;
    if (r<=0) { setResult(null); return; }
    const mt=calcMinTax(r);
    setResult({...mt,revenue:r});
  }, [rev]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Minimum Tax — ពន្ធអប្បបរមា":"ពន្ធអប្បបរមា"}</div>
      <div style={subt}>{lang==="en"?"1% of gross revenue (excl. VAT)":"ពន្ធ ១% នៃចំណូល (មិនរួម VAT)"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Revenue (excl. VAT) × 1%":"ចំណូល (មិនរួម VAT) × ១%"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Annual Gross Revenue (excl. VAT) (KHR)":"ចំណូលប្រចាំឆ្នាំ (មិនរួម VAT) (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 5000000" value={rev} onChange={e=>setRev(e.target.value)} />
          <button style={btn} onClick={doCalc}>{lang==="en"?"Calculate Minimum Tax":"គណនាពន្ធអប្បបរមា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Annual Revenue":"ចំណូល"} value={fmt(result.revenue)} />
            <Row label={lang==="en"?"Minimum Tax (1%)":"ពន្ធអប្បបរមា (១%)"} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}</div>
          <div style={{ fontSize: "0.82rem", color: "#B8C8DC", lineHeight: 1.9 }}>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Revenue":"ចំណូល"}:</strong> 5,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Min Tax":"ពន្ធអប្ប"}:</strong> 5,000,000 × 1% = 50,000 ៛</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 10. RENT & LAND TAX
// ═══════════════════════════════════════════════════════════
export function RentLandTab({ lang }) {
  return <SimpleCalcTab lang={lang}
    titleEn="Rent & Land Tax" titleKh="ពន្ធជួលដីនិងអចលន"
    subEn="10% on rental income from property and land." subKh="១០% លើប្រាក់ចំណូលពីការជួល"
    boxContent={(l)=><><strong style={{color:gold2}}>{l==="en"?"Formula":"រូបមន្ត"}:</strong> {l==="en"?"Rental Income × 10%":"ប្រាក់ជួល × ១០%"}</>}
    labelEn="Rental Income (KHR)" labelKh="ប្រាក់ចំណូលពីការជួល (រៀល)"
    placeholder="e.g. 2000000"
    calcFn={calcRent}
    renderRows={(r,v,l)=><>
      <Row label={l==="en"?"Rental Income":"ប្រាក់ជួល"} value={fmt(v)} />
      <Row label={l==="en"?"Tax Rate":"អត្រា"} value="10%" />
      <Row label={l==="en"?"Rent Tax":"ពន្ធ"} value={fmt(r.tax)} color="red" />
      <Row label={l==="en"?"Net to Owner":"ប្រាក់ទទួល"} value={fmt(r.net)} color="green" />
    </>}
    exampleContent={(l)=><div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
      <p><strong style={{color:gold2}}>{l==="en"?"Rent":"ជួល"}:</strong> 2,000,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Tax":"ពន្ធ"}:</strong> 2,000,000 × 10% = 200,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Net":"ទទួល"}:</strong> 1,800,000 ៛</p>
    </div>}
  />;
}

// ═══════════════════════════════════════════════════════════
// 11. LAND TRANSFER TAX
// ═══════════════════════════════════════════════════════════
export function LandTransferTab({ lang }) {
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const v = parseFloat(val) || 0;
    if (v > 0) setResult(calcLandTransfer(v));
    else setResult(null);
  }, [val]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Stamp Tax":"ពន្ធប្រថាប់ត្រា"}</div>
      <div style={subt}>{lang==="en"?"4% on sale price when transferring land/property ownership.":"៤% លើតម្លៃលក់ពេលផ្ទេរកម្មសិទ្ធិដីធ្លី ឬអចលនទ្រព្យ។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Sale Price × 4%":"តម្លៃលក់ × ៤%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"What it applies to":"អនុវត្តលើ"}:</strong> {lang==="en"?"Transfer of land, houses, buildings, and immovable property.":"ការផ្ទេរដី ផ្ទះ អគារ និងអចលនទ្រព្យផ្សេងៗ។"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Exemption":"ការលើកលែង"}:</strong> {lang==="en"?"Transfers between direct family members (spouse, children, parents).":"ការផ្ទេររវាងសមាជិកគ្រួសារផ្ទាល់ (ប្តីប្រពន្ធ កូន ឪពុកម្តាយ)។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Sale Price / Property Value (KHR)":"តម្លៃលក់ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={val} onChange={e=>setVal(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcLandTransfer(parseFloat(val)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Sale Price":"តម្លៃលក់"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"Stamp Tax (4%)":"ពន្ធប្រថាប់ត្រា (៤%)"} value={fmt(result.tax)} color="red" />
            <Row label={lang==="en"?"Total Cost":"ថ្លៃដើមសរុប"} value={fmt(parseFloat(val)+result.tax)} color="gold" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Tax Type":"ប្រភេទពន្ធ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Description":"បរិយាយ"}</th></tr>
            </thead>
            <tbody>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}><div style={{fontWeight:600}}>{lang==="en"?"Stamp Tax":"ពន្ធប្រថាប់ត្រា"}</div></td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>4%</td><td style={{padding:"5px 6px",color:muted,fontSize:"0.62rem"}}>{lang==="en"?"Charged on sale/transfer of land ownership.":"ប្រមូលលើការលក់/ផ្ទេរកម្មសិទ្ធិដីធ្លី។"}</td></tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 12. PROPERTY TAX
// ═══════════════════════════════════════════════════════════
export function PropertyTaxTab({ lang }) {
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const v = parseFloat(val) || 0;
    if (v > 0) setResult(calcPropertyTax(v));
    else setResult(null);
  }, [val]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Property Tax — ពន្ធអចលនទ្រព្យ":"ពន្ធអចលនទ្រព្យ"}</div>
      <div style={subt}>{lang==="en"?"Annual tax on immovable property in Cambodia.":"ពន្ធប្រចាំឆ្នាំលើអចលនទ្រព្យក្នុងកម្ពុជា។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"(Total Value × 80% − 100,000,000 KHR) × 0.1%":"(តម្លៃសរុប × ៨០% − ១០០,០០០,០០០ ៛) × ០.១%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> 0.1%<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Tax Base":"មូលដ្ឋានគិតពន្ធ"}:</strong> {lang==="en"?"80% of total property value (land + building), then subtract 100,000,000 KHR exemption.":"៨០% នៃតម្លៃអចលនទ្រព្យសរុប (ដី + សំណង់) ដក ១០០,០០០,០០០ ៛ ។"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Exemption":"ការលើកលែង"}:</strong> {lang==="en"?"≤ 100M KHR: no tax. Also exempt: agricultural land, government property, religious/charity, diplomatic, infrastructure, SEZ, unfinished buildings (<80%).":"≤ ១០០លាន៛: គ្មានពន្ធ។ បន្ថែម: ដីកសិកម្ម, រាជរដ្ឋាភិបាល, សាសនា/សប្បុរសធម៌, ការទូត, ហេដ្ឋា, តំបន់សេដ្ឋកិច្ចពិសេស, អគារសាងសង់ <៨០%។"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Due":"កាលបរិច្ឆេទ"}:</strong> {lang==="en"?"Annually before September 30":"ប្រចាំឆ្នាំ មុនថ្ងៃទី ៣០ ខែកញ្ញា"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Total Property Value (Land + Building, KHR)":"តម្លៃអចលនទ្រព្យសរុប (ដី+សំណង់, រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 633600000" value={val} onChange={e=>setVal(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcPropertyTax(parseFloat(val)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Total Property Value":"តម្លៃសរុប"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"80% of Value":"៨០% នៃតម្លៃ"} value={fmt(result.eightyPct)} />
            <Row label={lang==="en"?"Exemption":"ការលើកលែង"} value={"−" + fmt(result.exemption)} color="green" />
            <Row label={lang==="en"?"Taxable Base":"មូលដ្ឋានជាប់ពន្ធ"} value={fmt(result.base)} color={result.base > 0 ? gold2 : "green"} />
            <Row label={lang==="en"?"Property Tax (0.1%)":"ពន្ធអចលនទ្រព្យ (០.១%)"} value={fmt(result.tax)} color="red" />
            {result.effectiveRate > 0 && <Row label={lang==="en"?"Effective Rate":"អត្រាជាក់ស្តែង"} value={result.effectiveRate.toFixed(4)+"%"} color="gold" />}
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}</div>
          <div style={{ fontSize: "0.75rem", color: "#C5D5E8", lineHeight: 2 }}>
            <div>{lang==="en"?"Property value: 158,400$":"តម្លៃអចលនទ្រព្យ: ១៥៨,៤០០$"}</div>
            <div>{lang==="en"?"In Riel (1$ = 4,000៛): 633,600,000៛":"គិតជារៀល: ៦៣៣,៦០០,០០០៛"}</div>
            <div style={{borderTop:`1px solid ${border}`,margin:"4px 0"}} />
            <div>{lang==="en"?"80% × 633,600,000 = 506,880,000៛":"៨០% × ៦៣៣,៦០០,០០០ = ៥០៦,៨៨០,០០០៛"}</div>
            <div>{lang==="en"?"− 100,000,000 exemption = 406,880,000៛":"− ១០០,០០០,០០០ លើកលែង = ៤០៦,៨៨០,០០០៛"}</div>
            <div>{lang==="en"?"Tax = 406,880,000 × 0.1% = 406,880៛":"ពន្ធ = ៤០៦,៨៨០,០០០ × ០.១% = ៤០៦,៨៨០៛"}</div>
            <div style={{borderTop:`2px solid ${gold}`,margin:"4px 0"}} />
            <div><strong style={{color:gold2}}>{lang==="en"?"Due: Before September 30 annually":"កំណត់: មុនថ្ងៃទី ៣០ ខែកញ្ញា ប្រចាំឆ្នាំ"}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 13. CORPORATE INCOME TAX
// ═══════════════════════════════════════════════════════════
export function CorporateIncomeTaxTab({ lang }) {
  const [profit, setProfit] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const p = parseFloat(profit) || 0;
    if (p > 0) setResult(calcCorporateIncomeTax(p));
    else setResult(null);
  }, [profit]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Corporate Income Tax — ពន្ធនីតិបុគ្គល":"ពន្ធនីតិបុគ្គល"}</div>
      <div style={subt}>{lang==="en"?"20% tax on net profit of companies and legal entities.":"ពន្ធ ២០% លើប្រាក់ចំណេញសុទ្ធរបស់ក្រុមហ៊ុន។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Taxable Profit × 20%":"ប្រាក់ចំណេញជាប់ពន្ធ × ២០%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> {lang==="en"?"Standard 20% (QIP may qualify for reduced rates)":"ស្តង់ដារ ២០% (QIP អាចទទួលបានអត្រាកាត់បន្ថយ)"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Scope":"វិសាលភាព"}:</strong> {lang==="en"?"Applies to all resident companies and foreign companies with Cambodian-source income.":"អនុវត្តចំពោះក្រុមហ៊ុននិវាសនជន និងក្រុមហ៊ុនបរទេសដែលមានចំណូលពីកម្ពុជា។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Net Profit / Taxable Income (KHR)":"ប្រាក់ចំណេញសុទ្ធ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={profit} onChange={e=>setProfit(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcCorporateIncomeTax(parseFloat(profit)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Taxable Profit":"ប្រាក់ចំណេញជាប់ពន្ធ"} value={fmt(parseFloat(profit))} />
            <Row label={lang==="en"?"CIT Rate":"អត្រា"} value={result.rate+"%"} />
            <Row label={lang==="en"?"Corporate Income Tax":"ពន្ធលើប្រាក់ចំណេញ"} value={fmt(result.tax)} color="red" />
            <Row label={lang==="en"?"Net Profit After Tax":"ប្រាក់ចំណេញសុទ្ធក្រោយពន្ធ"} value={fmt(result.net)} color="green" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Entity Type":"ប្រភេទ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th></tr>
            </thead>
            <tbody>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Standard CIT":"អត្រាស្តង់ដារ"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>20%</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"QIP (Qualified Investment Project)":"គម្រោងវិនិយោគ"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>0%-20%</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Insurance":"ធានារ៉ាប់រង"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>5%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 15. NATURAL RESOURCE TAX
// ═══════════════════════════════════════════════════════════
export function NaturalResourceTaxTab({ lang }) {
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const r = parseFloat(revenue) || 0;
    if (r > 0) setResult(calcNaturalResourceTax(r));
    else setResult(null);
  }, [revenue]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Natural Resource Tax — ពន្ធធនធានធម្មជាតិ":"ពន្ធធនធានធម្មជាតិ"}</div>
      <div style={subt}>{lang==="en"?"30% tax on oil, gas, and mining revenue.":"ពន្ធ ៣០% លើចំណូលពីប្រេង ឧស្ម័ន និងរ៉ែ។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Revenue × 30%":"ចំណូល × ៣០%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> {lang==="en"?"30% on natural resource income.":"៣០% លើចំណូលធនធានធម្មជាតិ។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Revenue (KHR)":"ចំណូល (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={revenue} onChange={e=>setRevenue(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcNaturalResourceTax(parseFloat(revenue)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Revenue":"ចំណូល"} value={fmt(parseFloat(revenue))} />
            <Row label={lang==="en"?"Rate":"អត្រា"} value={result.rate+"%"} />
            <Row label={lang==="en"?"Natural Resource Tax":"ពន្ធធនធានធម្មជាតិ"} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
            <p><strong style={{color:gold2}}>{lang==="en"?"Oil & Gas":"ប្រេង និងឧស្ម័ន"}:</strong> 30%</p>
            <p><strong style={{color:gold2}}>{lang==="en"?"Mining":"រ៉ែ"}:</strong> 30%</p>
            <p><strong style={{color:gold2}}>{lang==="en"?"Other resources":"ធនធានផ្សេងៗ"}:</strong> Varies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 16. QIP TAX
// ═══════════════════════════════════════════════════════════
export function QIPTaxTab({ lang }) {
  const [projects, setProjects] = useState([{ name: "", amount: "", incentiveYears: "" }]);
  const [result, setResult] = useState(null);
  const addProject = () => setProjects([...projects, { name: "", amount: "", incentiveYears: "" }]);
  const removeProject = (i) => { if (projects.length > 1) { const c = [...projects]; c.splice(i, 1); setProjects(c); } };
  const updateProject = (i, field, val) => { const c = [...projects]; c[i][field] = val; setProjects(c); };
  const doCalc = () => {
    const parsed = projects.map(p => ({ name: p.name, amount: parseFloat(p.amount) || 0, incentiveYears: parseInt(p.incentiveYears) || 0 }));
    const r = calcQIPTax(parsed);
    setResult(r);
  };
  return (
    <div>
      <div style={title}>{lang==="en"?"QIP Tax — ពន្ធ QIP":"ពន្ធ QIP"}</div>
      <div style={subt}>{lang==="en"?"Tax for Qualified Investment Projects. 0% during tax holiday (up to 9 years), 20% after.":"ពន្ធសម្រាប់គម្រោងវិនិយោគ។ ០% អំឡុងពេលលើកលែង (រហូត ៩ឆ្នាំ), ២០% ក្រោយ។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Investment × Rate":"ទឹកប្រាក់ × អត្រា"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> {lang==="en"?"0% (within incentive period) | 20% (expired)":"០% (ក្នុងរយៈពេលលើកលែង) | ២០% (ផុតកំណត់)"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Incentive":"ការលើកទឹកចិត្ត"}:</strong> {lang==="en"?"Up to 9 years tax holiday. If incentive years remain > 0 → 0% rate.":"លើកលែងពន្ធរហូត ៩ឆ្នាំ។ បើនៅសល់ឆ្នាំលើកលែង > ០ → ០% ។"}
      </div>
      <div className="card-hover" style={calcCard}>
        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"QIP Projects":"គម្រោង QIP"}</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
          <thead>
            <tr>
              <th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Project Name":"ឈ្មោះគម្រោង"}</th>
              <th style={{color:gold,padding:"4px 6px",textAlign:"right",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Amount (KHR)":"ទឹកប្រាក់ (រៀល)"}</th>
              <th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Incentive Years":"ឆ្នាំលើកលែង"}</th>
              <th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th>
              <th style={{color:gold,padding:"4px 6px",textAlign:"right",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Tax":"ពន្ធ"}</th>
              <th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => {
              const amt = parseFloat(p.amount) || 0;
              const yrs = parseInt(p.incentiveYears) || 0;
              const rate = yrs > 0 ? 0 : (amt > 0 ? 20 : 0);
              const tax = amt * (rate / 100);
              return (
                <tr key={i}>
                  <td style={{padding:"4px 3px"}}><input className="input-focus" style={{...input,padding:"5px 6px",fontSize:"0.7rem"}} placeholder={lang==="en"?"e.g. Solar Farm":"ឧ. រោងចក្រ"} value={p.name} onChange={e=>updateProject(i,"name",e.target.value)} /></td>
                  <td style={{padding:"4px 3px"}}><input className="input-focus" style={{...input,padding:"5px 6px",fontSize:"0.7rem",textAlign:"right"}} type="number" placeholder="e.g. 10000000" value={p.amount} onChange={e=>updateProject(i,"amount",e.target.value)} /></td>
                  <td style={{padding:"4px 3px"}}><input className="input-focus" style={{...input,padding:"5px 6px",fontSize:"0.7rem",textAlign:"center"}} type="number" min="0" max="9" placeholder="0" value={p.incentiveYears} onChange={e=>updateProject(i,"incentiveYears",e.target.value)} /></td>
                  <td style={{padding:"4px 3px",textAlign:"center",color:rate===0?green:gold,fontWeight:700,fontSize:"0.75rem"}}>{amt > 0 ? rate + "%" : "—"}</td>
                  <td style={{padding:"4px 3px",textAlign:"right",color:red,fontWeight:700,fontSize:"0.75rem"}}>{amt > 0 ? fmt(tax) : "—"}</td>
                  <td style={{padding:"4px 3px",textAlign:"center"}}>
                    {projects.length > 1 && <span onClick={()=>removeProject(i)} style={{color:"rgba(230,57,70,0.7)",cursor:"pointer",fontSize:"0.9rem",fontWeight:700}}>✕</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button style={{...btn,padding:"6px 14px",fontSize:"0.72rem",marginTop:0,width:"auto"}} onClick={addProject}>{lang==="en"?"+ Add Project":"+ បន្ថែមគម្រោង"}</button>
          <button style={{...btn,padding:"6px 14px",fontSize:"0.72rem",marginTop:0,width:"auto"}} onClick={doCalc}>{lang==="en"?"Calculate Total":"គណនាសរុប"}</button>
        </div>
        {result && <div className="result-fade" style={{...resultBox,marginTop:12}}>
          {result.projects.filter(r => r.amount > 0).map((r, i) => (
            <Row key={i} label={`${r.name || (lang==="en"?"Project":"គម្រោង")+" "+(i+1)} (${r.rate}%)`} value={fmt(r.tax)} color={r.tax > 0 ? "red" : "green"} />
          ))}
          <div style={{borderTop:`2px solid ${gold}`,margin:"6px 0"}} />
          <Row label={lang==="en"?"Total QIP Tax":"ពន្ធ QIP សរុប"} value={fmt(result.totalTax)} color="red" />
        </div>}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}</div>
          <div style={{fontSize:"0.75rem",color:"#C5D5E8",lineHeight:2}}>
            <div><strong style={{color:gold2}}>{lang==="en"?"Project 1":"គម្រោង ១"}:</strong> {lang==="en"?"10,000,000 KHR, incentive 5 yrs → 0% = 0":"១០,០០០,០០០៛, លើកលែង ៥ឆ្នាំ → ០% = ០"}</div>
            <div><strong style={{color:gold2}}>{lang==="en"?"Project 2":"គម្រោង ២"}:</strong> {lang==="en"?"20,000,000 KHR, expired → 20% = 4,000,000":"២០,០០០,០០០៛, ផុតកំណត់ → ២០% = ៤,០០០,០០០"}</div>
            <div style={{borderTop:`1px solid ${border}`,margin:"4px 0"}} />
            <div><strong style={{color:gold}}>{lang==="en"?"Total = 4,000,000 KHR":"សរុប = ៤,០០០,០០០៛"}</strong></div>
          </div>
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Status":"ស្ថានភាព"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th></tr>
            </thead>
            <tbody>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Within incentive period (holiday)":"ក្នុងរយៈពេលលើកលែង"}</td><td style={{padding:"5px 6px",textAlign:"center",color:green,fontWeight:700}}>0%</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"After incentive period expires":"ក្រោយផុតកំណត់"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>20%</td></tr>
            </tbody>
          </table>
          <div style={hint}>{lang==="en"?"Up to 9 years of tax holiday for QIP.":"លើកលែងពន្ធរហូត ៩ឆ្នាំសម្រាប់ QIP ។"}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 17. INSURANCE TAX
// ═══════════════════════════════════════════════════════════
export function InsuranceTaxTab({ lang }) {
  const [type, setType] = useState("property");
  const [profit, setProfit] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const p = parseFloat(profit) || 0;
    if (p > 0) setResult(calcInsuranceTax(p, type));
    else setResult(null);
  }, [profit, type]);
  const rateLabel = type === "property" ? "5%" : "20%";
  return (
    <div>
      <div style={title}>{lang==="en"?"Insurance Tax — ពន្ធធានារ៉ាប់រង":"ពន្ធធានារ៉ាប់រង"}</div>
      <div style={subt}>{lang==="en"?"Special tax for insurance enterprises. 5% on property, 20% on life insurance.":"ពន្ធពិសេសសម្រាប់សហគ្រាសធានារ៉ាប់រង។ ៥% លើទ្រព្យ, ២០% លើជីវិត។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Gross Premium × Rate":"បុព្វលាភដុល × អត្រា"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rate":"អត្រា"}:</strong> {lang==="en"?"5% (property/risk) | 20% (life/other)":"៥% (ទ្រព្យ) | ២០% (ជីវិត)"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Insurance Type":"ប្រភេទធានារ៉ាប់រង"}</label>
          <select style={select} value={type} onChange={e=>{setType(e.target.value); setResult(null);}}>
            <option value="property">{lang==="en"?"Property / Risk Insurance":"ធានារ៉ាប់រងទ្រព្យ/ហានិភ័យ"} — 5%</option>
            <option value="life">{lang==="en"?"Life / Other Insurance":"ធានារ៉ាប់រងជីវិត/ផ្សេងៗ"} — 20%</option>
          </select>
          <label style={label}>{lang==="en"?"Gross Premium (KHR)":"បុព្វលាភដុល (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={profit} onChange={e=>setProfit(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcInsuranceTax(parseFloat(profit)||0,type))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Gross Premium":"បុព្វលាភដុល"} value={fmt(parseFloat(profit))} />
            <Row label={lang==="en"?"Type":"ប្រភេទ"} value={type==="property"?lang==="en"?"Property/Risk":"ទ្រព្យ":lang==="en"?"Life/Other":"ជីវិត"} />
            <Row label={lang==="en"?"Rate":"អត្រា"} value={rateLabel} />
            <Row label={lang==="en"?"Insurance Tax":"ពន្ធធានារ៉ាប់រង"} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Rate Reference":"តារាងអត្រា"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Type":"ប្រភេទ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Example (10M)":"ឧទាហរណ៍ (១០លាន)"}</th></tr>
            </thead>
            <tbody>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Property / Risk":"ទ្រព្យ/ហានិភ័យ"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>5%</td><td style={{padding:"5px 6px",color:muted}}>10,000,000 × 5% = 500,000 ៛</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Life / Other":"ជីវិត/ផ្សេងៗ"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>20%</td><td style={{padding:"5px 6px",color:muted}}>10,000,000 × 20% = 2,000,000 ៛</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 18. PROGRESSIVE INDIVIDUAL TAX
// ═══════════════════════════════════════════════════════════
export function ProgressiveIndividualTaxTab({ lang }) {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const i = parseFloat(income) || 0;
    if (i > 0) setResult(calcProgressiveIndividualTax(i));
    else setResult(null);
  }, [income]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Personal Enterprise Income Tax — ពន្ធសហគ្រាសឯកបុគ្គល":"ពន្ធសហគ្រាសឯកបុគ្គល"}</div>
      <div style={subt}>{lang==="en"?"Annual progressive tax on net profit for sole proprietors and personal enterprises.":"ពន្ធប្រចាំឆ្នាំលើប្រាក់ចំណេញសុទ្ធសម្រាប់សហគ្រាសឯកបុគ្គល និងក្រុមហ៊ុនឯកជន។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Definition":"សេចក្តីនិយាយសង្ខេប"}:</strong> {lang==="en"?"Tax on annual net profit of sole proprietors and personal enterprises. Rate determined by progressive brackets.":"ពន្ធសហគ្រាសឯកបុគ្គលគឺជាពន្ធដែលក្រុមហ៊ុនឯកជន ឬសហគ្រាសឯកជនបង់លើប្រាក់ចំណេញ (Profit) ដែលក្រុមហ៊ុនរកបានក្នុងមួយឆ្នាំ។ អត្រាពន្ធត្រូវបានកំណត់តាមលំដាប់ប្រាក់ចំណេញ។"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Tax = Profit × Rate − Offset (progressive brackets)":"ពន្ធ = ប្រាក់ចំណេញ × អត្រា − ការដក (តាមជាន់ថ្នាក់)"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Who pays":"អ្នកជាប់ពន្ធ"}:</strong> {lang==="en"?"Resident sole proprietors and personal enterprises. Direct tax paid to the state.":"Direct to Resident — ក្រុមហ៊ុនក្នុងប្រទេសបង់ពន្ធនេះទៅរដ្ឋ។"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Note":"ព័ត៌មានបន្ថែម"}:</strong> {lang==="en"?"If no profit or loss, Minimum Tax may apply instead.":"ប្រសិនបើក្រុមហ៊ុនមិនមានប្រាក់ចំណេញ ឬបង់ខ្វះ → អាចបង់ Minimum Tax ទៅជំនួស។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Annual Net Profit / Taxable Income (KHR)":"ប្រាក់ចំណេញសុទ្ធប្រចាំឆ្នាំ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 30000000" value={income} onChange={e=>setIncome(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcProgressiveIndividualTax(parseFloat(income)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Net Profit":"ប្រាក់ចំណេញសុទ្ធ"} value={fmt(parseFloat(income))} />
            <Row label={lang==="en"?"Bracket":"ជាន់ពន្ធ"} value={lang==="en"?"Bracket "+(result.bracket+1):"ជាន់ "+(result.bracket+1)} />
            <Row label={lang==="en"?"Rate":"អត្រា"} value={result.rate+"%"} />
            <Row label={lang==="en"?"Tax Payable":"ពន្ធដែលត្រូវបង់"} value={fmt(result.tax)} color="red" />
            <Row label={lang==="en"?"Net After Tax":"នៅសល់ក្រោយពន្ធ"} value={fmt(result.net)} color="green" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Tax Rates Table":"តារាងអត្រាពន្ធ"}</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"}}>
            <thead>
              <tr><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Taxable Profit":"ប្រាក់ចំណេញ"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"center",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Rate":"អត្រា"}</th><th style={{color:gold,padding:"4px 6px",textAlign:"left",borderBottom:`1px solid ${border}`,fontWeight:700}}>{lang==="en"?"Formula":"រូបមន្ត"}</th></tr>
            </thead>
            <tbody>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>0 – 18,000,000 ៛</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>0%</td><td style={{padding:"5px 6px",color:muted}}>P × 0%</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>18,000,001 – 24,000,000 ៛</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>5%</td><td style={{padding:"5px 6px",color:muted}}>P × 5% − 900,000</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>24,000,001 – 102,000,000 ៛</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>10%</td><td style={{padding:"5px 6px",color:muted}}>P × 10% − 2,100,000</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>102,000,001 – 150,000,000 ៛</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>15%</td><td style={{padding:"5px 6px",color:muted}}>P × 15% − 7,200,000</td></tr>
              <tr><td style={{padding:"5px 6px",color:"#C5D5E8"}}>{lang==="en"?"Above 150,000,000 ៛":"លើស 150,000,000 ៛"}</td><td style={{padding:"5px 6px",textAlign:"center",color:gold,fontWeight:700}}>20%</td><td style={{padding:"5px 6px",color:muted}}>P × 20% − 14,200,000</td></tr>
            </tbody>
          </table>
          <div style={hint}>P = {lang==="en"?"Taxable Profit (Net Profit)":"ប្រាក់ចំណេញសុទ្ធ"}</div>
          <div style={{borderTop:`1px dashed ${border}`,margin:"10px 0"}} />
          <div style={{fontSize:"0.75rem",color:"#C5D5E8",lineHeight:2}}>
            <div style={{fontWeight:700,color:gold2,marginBottom:4}}>{lang==="en"?"Example: Taxable profit = 30,000,000 ៛":"ឧទាហរណ៍: ប្រាក់ចំណេញសុទ្ធ = ៣០,០០០,០០០៛"}</div>
            <div>{lang==="en"?"Bracket: 24,000,001 – 102,000,000 → 10%":"ជាន់: ២៤,០០០,០០១ – ១០២,០០០,០០០ → ១០%"}</div>
            <div>Tax = 30,000,000 × 10% − 2,100,000</div>
            <div>Tax = 3,000,000 − 2,100,000 = <strong style={{color:red}}>900,000 ៛</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 19. TAXABLE INCOME ADJUSTMENT
// ═══════════════════════════════════════════════════════════
export function TaxableIncomeAdjustmentTab({ lang }) {
  const [accountingProfit, setAccountingProfit] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const p = parseFloat(accountingProfit) || 0;
    if (p > 0) setResult(calcTaxableIncome(p));
    else setResult(null);
  }, [accountingProfit]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Taxable Income Adjustment — ការគណនាចំណូលជាប់ពន្ធ":"ការគណនាប្រាក់ចំណូលជាប់ពន្ធ"}</div>
      <div style={subt}>{lang==="en"?"Reconcile accounting profit to taxable income by adjusting non-deductible expenses and exempt income.":"កែតម្រូវប្រាក់ចំណេញគណនេយ្យទៅជាចំណូលជាប់ពន្ធ ដោយកែតម្រូវចំណាយមិនអាចកាត់បាន និងចំណូលលើកលែង។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Accounting Profit + Disallowed Expenses - Exempt Income":"ប្រាក់ចំណេញគណនេយ្យ + ចំណាយមិនទទួលស្គាល់ - ចំណូលលើកលែង"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Key Adjustments":"ការកែតម្រូវសំខាន់ៗ"}:</strong> {lang==="en"?"Disallowed: fines, gifts, donations without proof. Exempt: capital gains from share sales.":"មិនទទួលស្គាល់: ពិន័យ កាដូ បរិច្ចាគគ្មានភស្តុតាង។ លើកលែង: ប្រាក់ចំណេញពីការលក់ភាគហ៊ុន។"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Accounting Profit (KHR)":"ប្រាក់ចំណេញគណនេយ្យ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={accountingProfit} onChange={e=>setAccountingProfit(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcTaxableIncome(parseFloat(accountingProfit)||0))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Accounting Profit":"ប្រាក់ចំណេញគណនេយ្យ"} value={fmt(parseFloat(accountingProfit))} />
            <Row label={lang==="en"?"Add: Disallowed Expenses":"បូក៖ ចំណាយមិនទទួលស្គាល់"} value={fmt(result.disallowed)} color="red" />
            <Row label={lang==="en"?"Less: Exempt Income":"ដក៖ ចំណូលលើកលែង"} value={"-"+fmt(result.exempt)} color="green" />
            <Row label={lang==="en"?"Taxable Income":"ប្រាក់ចំណូលជាប់ពន្ធ"} value={fmt(result.taxable)} color="gold" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Reference":"ឯកសារយោង"}</div>
          <div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
            <p><strong style={{color:gold2}}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong></p>
            <p>{lang==="en"?"Accounting Profit":"ប្រាក់ចំណេញគណនេយ្យ"}</p>
            <p>+ {lang==="en"?"Disallowed Expenses (fines, gifts, donations without proof, etc.)":"ចំណាយមិនទទួលស្គាល់ (ពិន័យ, កាដូ, បរិច្ចាគគ្មានភស្តុតាង។ល។)"}</p>
            <p>- {lang==="en"?"Exempt Income (capital gains from share sales, etc.)":"ចំណូលលើកលែង (ប្រាក់ចំណេញពីការលក់ភាគហ៊ុន។ល។)"}</p>
            <p><strong style={{color:gold2}}>= {lang==="en"?"Taxable Income":"ប្រាក់ចំណូលជាប់ពន្ធ"}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 20. Annual Tax & Prepayment
// ═══════════════════════════════════════════════════════════
export function AnnualTaxTab({ lang }) {
  const t = T[lang].annual;
  const [incomes, setIncomes] = useState(Array(12).fill(""));
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState(null);
  const [includeVAT, setIncludeVAT] = useState(true);

  const handleIncome = (i, v) => {
    const copy = [...incomes];
    copy[i] = v;
    setIncomes(copy);
  };

  const doCalc = () => {
    const vals = incomes.map(v => parseFloat(v) || 0);
    const exp = parseFloat(expenses) || 0;
    const r = calculateAdvancedPrepaymentTax({
      monthlyIncomes: vals,
      annualNetProfit: vals.reduce((s, v) => s + v, 0) - exp,
      includesVAT: includeVAT,
    });
    setResult(r);
  };

  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.formula}:</strong> {t.formulaVal}<br />
        <strong style={{ color: gold2 }}>{t.whoPays}:</strong> {t.whoPaysVal}<strong style={{ color: gold2 }}> {t.due}:</strong> {t.dueVal}
      </div>
      <div style={{ ...calcCard, maxWidth: 720 }}>
        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>

        <label style={label}>{t.includesVAT}</label>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button style={{ padding: "6px 14px", borderRadius: 6, border: includeVAT ? `2px solid ${gold}` : `1px solid ${border}`, background: includeVAT ? "rgba(212,168,67,0.15)" : "transparent", color: includeVAT ? gold : muted, cursor: "pointer", fontSize: "0.78rem" }} onClick={() => setIncludeVAT(true)}>{t.yesVAT}</button>
          <button style={{ padding: "6px 14px", borderRadius: 6, border: !includeVAT ? `2px solid ${gold}` : `1px solid ${border}`, background: !includeVAT ? "rgba(212,168,67,0.15)" : "transparent", color: !includeVAT ? gold : muted, cursor: "pointer", fontSize: "0.78rem" }} onClick={() => setIncludeVAT(false)}>No (revenue ex-VAT)</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
          {incomes.map((v, i) => (
            <div key={i}>
              <label style={{ ...label, marginTop: 4, fontSize: "0.65rem" }}>{t.monthLabels[i]}</label>
              <input className="input-focus" style={input} type="number" placeholder="0" value={v} onChange={e => handleIncome(i, e.target.value)} />
            </div>
          ))}
        </div>

        <label style={label}>{t.expenses}</label>
        <input className="input-focus" style={input} type="number" placeholder="0" value={expenses} onChange={e => setExpenses(e.target.value)} />

        <button style={btn} onClick={doCalc}>{t.calcBtn}</button>

        {result && !result.error && <div className="result-fade" style={resultBox}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: gold2, marginBottom: 8 }}>{t.summaryTitle}</div>
          {result.monthlyResults.map((m, i) => (
            <Row key={i} label={`${t.monthLabels[i]}: ${t.revenueCol}`} value={fmt(m.revenue)} />
          ))}
          <Row label={t.totalRevenue} value={fmt(result.summary.totalRevenue)} color="gold" />
          <Row label={t.totalBase} value={fmt(result.summary.totalBase)} />
          <div style={divider} />
          <Row label={t.netProfit} value={fmt(result.summary.annualNetProfit)} color={result.summary.annualNetProfit < 0 ? "red" : "green"} />
          <Row label={t.incomeTax} value={fmt(result.summary.incomeTax)} />
          <Row label={t.minimumTax} value={fmt(result.summary.minimumTax)} color="gold" />
          <Row label={t.prepaymentCredit} value={fmt(result.summary.totalPrepaymentTax)} color="green" />
          <div style={divider} />
          <Row label={t.netPayableEnd} value={fmt(result.summary.finalPayable)} color={result.summary.finalPayable > 0 ? "red" : "green"} />
          <div style={{ ...hint, marginTop: 8, padding: 8, background: "rgba(212,168,67,0.08)", borderRadius: 6, border: `1px solid ${border}` }}>
            {result.summary.status}
          </div>
        </div>}
        {result && result.error && <div style={{ ...resultBox, color: red }}>{result.error}</div>}
      </div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Notes":"ចំណាំ"}:</strong> {t.notes}
      </div>
    </div>
  );
}
