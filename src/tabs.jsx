import { useState, useEffect, useCallback } from "react";
import { T, fmt, gold, gold2, navy, card, red, green, muted, white, border } from "./data.js";
import { calcSalaryTax, calcNonResidentTax, calcPrepaymentTax, calcImportVAT, calcSpecialFirstSeller, calcSpecialReseller, calcSpecialLocal, calcWHT, calcLighting, calcAccom, calcDividend, calcMinTax, calcRent, calcLandTransfer, calcPropertyTax, calcStampTax } from "./data.js";

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
    { en: "Salary Tax",          kh: "ពន្ធលើប្រាក់បៀវត្ស",           def_en: "Monthly progressive tax withheld by employer. Residents: 0%-20% with 150,000 KHR deduction per dependant. Non-residents: flat 20%.", def_kh: "ពន្ធប្រចាំខែ ០%-២០% ។ ដក ១៥០,០០០ ៛ ក្នុង ១ ណ",      formula: lang==="en"?"Taxable = Gross − (Deps × 150,000) → Tax = Taxable × Rate − Offset":"ជាប់ពន្ធ = ប្រាក់ − (ណ × ១៥០,០០០) → ពន្ធ = ជាប់ × អត្រា" },
    { en: "Prepayment Tax",      kh: "ប្រាក់រំដោះពន្ធ",              def_en: "Monthly 1% advance credited against annual profit tax.", def_kh: "ពន្ធ ១% ប្រចាំខែ ដើម្បីរំដោះពន្ធចំណេញ",               formula: lang==="en"?"Base = Revenue / 1.1 → Tax = Base × 1%":"Base = ចំណូល / ១.១ → ពន្ធ = Base × ១%" },
    { en: "VAT",                 kh: "អាករលើតម្លៃបន្ថែម",             def_en: "10% on taxable supplies. Net VAT = Output VAT − Input VAT.", def_kh: "១០% លើការផ្គត់ផ្គង់ជាប់អាករ",                          formula: lang==="en"?"Net VAT = Output VAT − Input VAT":"VAT = Output − Input" },
    { en: "Special Tax",         kh: "អាករពិសេស",                   def_en: "Excise tax on alcohol (35%), beer (30%), cigarettes (20%), soft drinks (10%), cement (5%), services (3-10%).", def_kh: "ស្រា ៣៥%, បៀរ ៣០%, បារី ២០%, ភេសជ្ជៈ ១០%", formula: lang==="en"?"Base × Rate (3 calculation methods)":"Base × អត្រា (៣ វិធីគណនា)" },
    { en: "Withholding Tax",     kh: "ពន្ធកាត់ទុក",                  def_en: "Deducted at source: Services/Royalties/Interest 15%, Rental 10%, Fixed deposit 6%, Non-fixed 4%, Non-resident 14%.", def_kh: "កាត់ទុក: សេវា/ការប្រាក់ ១៥%, ជួល ១០%, ប្រាក់ ៦%, ៤%, ១៤%", formula: lang==="en"?"WHT = Gross × Rate":"ពន្ធ = ប្រាក់ × អត្រា" },
    { en: "Public Lighting Tax", kh: "ពន្ធភ្លើងសាធារណៈ",             def_en: "5% sub-national tax on goods. Base removes VAT and Special Tax.", def_kh: "ពន្ធ ៥% ថ្នាក់ក្រោមជាតិ",                              formula: lang==="en"?"(Sales / 1.10) / 1.05 × 5%":"(លក់ / ១.១) / ១.០៥ × ៥%" },
    { en: "Accommodation Tax",   kh: "អាករស្នាក់នៅ",                 def_en: "2% on hotel and guesthouse room charges.", def_kh: "២% លើការស្នាក់នៅ",                                            formula: lang==="en"?"Invoice / 1.10 × 2%":"វិក្កយបត្រ / ១.១ × ២%" },
    { en: "Dividend Tax",        kh: "ពន្ធភាគលាភ",                  def_en: "15% on profit distributed as dividends.", def_kh: "១៥% លើភាគលាភ",                                              formula: lang==="en"?"Dividend × 15%":"ភាគលាភ × ១៥%" },
    { en: "Minimum Tax",         kh: "ពន្ធអប្បបរមា",                 def_en: "Ensures all enterprises pay at least 0.1% of gross annual revenue.", def_kh: "ពន្ធអប្បបរមា ០.១% នៃចំណូលប្រចាំឆ្នាំ",              formula: lang==="en"?"Revenue × 0.1% (pay higher of this or Profit Tax)":"ចំណូល × ០.១%" },
    { en: "Rent & Land Tax",     kh: "ពន្ធជួលអចលនទ្រព្យ",            def_en: "10% on rental income from property and land.", def_kh: "១០% លើប្រាក់ចំណូលពីការជួលអចលនទ្រព្យ",                  formula: lang==="en"?"Rental Income × 10%":"ប្រាក់ជួល × ១០%" },
    { en: "Land Transfer Tax",   kh: "ពន្ធផ្ទេរកម្មសិទ្ធិដី",          def_en: "4% on sale price when transferring land or property ownership.", def_kh: "៤% លើតម្លៃលក់ពេលផ្ទេរកម្មសិទ្ធិ",                  formula: lang==="en"?"Sale Price × 4%":"តម្លៃ × ៤%" },
    { en: "Property Tax",        kh: "ពន្ធអចលនទ្រព្យ",               def_en: "Annual tax on property value at 0.1% to 1%.", def_kh: "ពន្ធប្រចាំឆ្នាំ ០.១% ដល់ ១% លើអចលនទ្រព្យ",          formula: lang==="en"?"Property Value × Rate (0.1%–1%)":"តម្លៃ × អត្រា (០.១%-១%)" },
    { en: "Stamp Tax",           kh: "ពន្ធប្រថាប់ត្រា",               def_en: "0.1% to 1% on official documents, contracts, and transfers.", def_kh: "០.១% ដល់ ១% លើឯកសារផ្លូវការ",                       formula: lang==="en"?"Document Value × Rate (0.1%–1%)":"តម្លៃ × អត្រា (០.១%-១%)" },
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
  const [rev, setRev] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const r = parseFloat(rev) || 0;
    if (r > 0) setResult(calcPrepaymentTax(r));
    else setResult(null);
  }, [rev]);
  return (
    <div>
      <div style={title}>{t.title}</div>
      <div style={subt}>{t.sub}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{t.formula}:</strong> {t.formulaVal}<br />
        <strong style={{ color: gold2 }}>{t.whoPays}:</strong> {t.whoPaysVal}<strong style={{ color: gold2 }}> {t.due}:</strong> {t.dueVal}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{t.calcTitle}</div>
          <label style={label}>{t.revenueLabel}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 110000000" value={rev} onChange={e=>setRev(e.target.value)} />
          <button style={btn} onClick={()=>setResult(calcPrepaymentTax(parseFloat(rev)||0))}>{t.calcBtn}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={t.revenueRow} value={fmt(parseFloat(rev))} />
            <Row label={t.baseRow} value={fmt(result.base)} />
            <Row label={t.taxRow} value={fmt(result.tax)} color="red" />
            <Row label={t.creditRow} value={fmt(result.tax)} color="green" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{T[lang].common.example}</div>
          <div style={{ fontSize: "0.82rem", color: "#B8C8DC", lineHeight: 1.9 }}>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Revenue":"ចំណូល"}:</strong> 110,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Base":"Base"}:</strong> 110,000,000 / 1.1 = 100,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Tax":"ពន្ធ"}:</strong> 100,000,000 × 1% = 1,000,000 ៛</p>
          </div>
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
        <strong style={{ color: gold2 }}>{lang==="en"?"Services":"សេវា"}:</strong> {lang==="en"?"Air tickets 10% | Leisure 10% | Telecom 3%":"ហោះហើរ ១០% | កម្សាន្ត ១០% | ទូរ ៣%"}
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
            [lang==="en"?"Air Tickets / Leisure":"ហោះ/កម្សាន្ត","10%"],[lang==="en"?"Telecommunications":"ទូរ","3%"],
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
  services:{label:"Services",label_kh:"សេវាកម្ម",rate:15},
  royalties:{label:"Royalties",label_kh:"រ. ទ្រព្យ",rate:15},
  interest:{label:"Interest on loans",label_kh:"ការប្រាក់",rate:15},
  rental:{label:"Rental income",label_kh:"ជួល",rate:10},
  fixed_dep:{label:"Fixed deposit interest",label_kh:"ប្រាក់ (ថេរ)",rate:6},
  nonfixed_dep:{label:"Non-fixed deposit interest",label_kh:"ប្រាក់ (មិនថេរ)",rate:4},
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
          <Table rows={[
            [lang==="en"?"Payment Type":"ប្រភេទ", lang==="en"?"Rate":"អត្រា"],
            [lang==="en"?"Services":"សេវា","15%"],
            [lang==="en"?"Royalties":"រ. ទ្រព្យ","15%"],
            [lang==="en"?"Interest on loans":"ការប្រាក់","15%"],
            [lang==="en"?"Rental income":"ជួល","10%"],
            [lang==="en"?"Fixed deposit":"ប្រាក់ (ថេរ)","6%"],
            [lang==="en"?"Non-fixed deposit":"ប្រាក់ (មិនថេរ)","4%"],
          ]} />
          <div style={{ fontSize: "0.7rem", color: muted, fontWeight: 700, margin: "12px 0 6px", textTransform: "uppercase" }}>{t.nonResidents}</div>
          <Table rows={[[lang==="en"?"All payments":"ទាំងអស់", "14%"]]} />
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
  return <SimpleCalcTab lang={lang}
    titleEn="Public Lighting Tax" titleKh="ពន្ធភ្លើងសាធារណៈ"
    subEn="5% sub-national tax. Base removes VAT then Special Tax." subKh="ពន្ធ ៥% ថ្នាក់ក្រោមជាតិ។"
    boxContent={(l)=><><strong style={{color:gold2}}>{l==="en"?"Formula":"រូបមន្ត"}:</strong> (Sales / 1.10) / 1.05 × 5%<br /><strong style={{color:gold2}}>{l==="en"?"Rate":"អត្រា"}:</strong> 5%</>}
    labelEn="Sales Price on Invoice (KHR)" labelKh="តម្លៃលក់ (រៀល)"
    placeholder="e.g. 10000000"
    calcFn={calcLighting}
    renderRows={(r,v,l)=><>
      <Row label={l==="en"?"Sales Price":"តម្លៃ"} value={fmt(v)} />
      <Row label={l==="en"?"Step 1: / 1.10":"ជំហាន ១: / ១.១"} value={fmt(v/1.10)} />
      <Row label={l==="en"?"Step 2: Tax Base / 1.05":"ជំហាន ២: / ១.០៥"} value={fmt(r.base)} />
      <Row label={l==="en"?"Public Lighting Tax (5%)":"ពន្ធ (៥%)"} value={fmt(r.tax)} color="red" />
    </>}
    exampleContent={(l)=><div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
      <p><strong style={{color:gold2}}>{l==="en"?"Sales":"ការលក់"}:</strong> 10,000,000 ៛</p>
      <p><strong style={{color:gold2}}>/ 1.10:</strong> 9,090,909 ៛</p>
      <p><strong style={{color:gold2}}>/ 1.05:</strong> 8,658,009 ៛ ({l==="en"?"base":"មូលដ្ឋាន"})</p>
      <p><strong style={{color:gold2}}>× 5%:</strong> 432,900 ៛</p>
    </div>}
  />;
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
export function DividendTab({ lang }) {
  return <SimpleCalcTab lang={lang}
    titleEn="Dividend Tax" titleKh="ពន្ធភាគលាភ"
    subEn="15% on profit distributed as dividends." subKh="១៥% លើភាគលាភ"
    boxContent={(l)=><><strong style={{color:gold2}}>{l==="en"?"Formula":"រូបមន្ត"}:</strong> Dividend × 15%<br /><strong style={{color:gold2}}>{l==="en"?"Rate":"អត្រា"}:</strong> 15%</>}
    labelEn="Dividend Amount (KHR)" labelKh="ចំនួនភាគលាភ (រៀល)"
    placeholder="e.g. 1000000"
    calcFn={calcDividend}
    renderRows={(r,v,l)=><>
      <Row label={l==="en"?"Dividend Amount":"ភាគលាភ"} value={fmt(v)} />
      <Row label={l==="en"?"Tax Rate":"អត្រា"} value="15%" />
      <Row label={l==="en"?"Dividend Tax":"ពន្ធ"} value={fmt(r.tax)} color="red" />
      <Row label={l==="en"?"Net to Shareholder":"ប្រាក់ទទួល"} value={fmt(r.net)} color="green" />
    </>}
    exampleContent={(l)=><div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
      <p><strong style={{color:gold2}}>{l==="en"?"Dividend":"ភាគលាភ"}:</strong> 1,000,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Tax":"ពន្ធ"}:</strong> 1,000,000 × 15% = 150,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Net":"ប្រាក់ទទួល"}:</strong> 850,000 ៛</p>
    </div>}
  />;
}

// ═══════════════════════════════════════════════════════════
// 9. MINIMUM TAX
// ═══════════════════════════════════════════════════════════
export function MinimumTaxTab({ lang }) {
  const [rev, setRev] = useState("");
  const [pt, setPt] = useState("");
  const [result, setResult] = useState(null);
  const doCalc = useCallback(() => {
    const r=parseFloat(rev)||0;
    if (r<=0) { setResult(null); return; }
    const p=parseFloat(pt)||0;
    const mt=calcMinTax(r);
    setResult({...mt,revenue:r,profitTax:p,finalTax:Math.max(mt.tax,p),applicable:mt.tax>p});
  }, [rev, pt]);
  useEffect(() => { doCalc(); }, [doCalc]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Minimum Tax — ពន្ធអប្បបរមា":"ពន្ធអប្បបរមា"}</div>
      <div style={subt}>{lang==="en"?"0.1% of gross revenue. Pay higher of Minimum Tax or Profit Tax.":"ពន្ធ ០.១% នៃចំណូល។ បង់ចំនួនខ្ពស់ជាងពន្ធចំណេញ។"}</div>
      <div style={box}>
        <strong style={{ color: gold2 }}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Revenue × 0.1%":"ចំណូល × ០.១%"}<br />
        <strong style={{ color: gold2 }}>{lang==="en"?"Rule":"ច្បាប់"}:</strong> {lang==="en"?"Pay MAX(Minimum Tax, Profit Tax)":"បង់ MAX(ពន្ធអប្បបរមា, ពន្ធចំណេញ)"}
      </div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Calculator":"ម៉ាស៊ីនគិតពន្ធ"}</div>
          <label style={label}>{lang==="en"?"Annual Gross Revenue (KHR)":"ចំណូលប្រចាំឆ្នាំ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 5000000" value={rev} onChange={e=>setRev(e.target.value)} />
          <label style={label}>{lang==="en"?"Actual Profit Tax (optional)":"ពន្ធចំណេញជាក់ស្ដែង (ស្រេចចិត្ត)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="0" value={pt} onChange={e=>setPt(e.target.value)} />
          <button style={btn} onClick={doCalc}>{lang==="en"?"Calculate Minimum Tax":"គណនាពន្ធអប្បបរមា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Annual Revenue":"ចំណូល"} value={fmt(result.revenue)} />
            <Row label={lang==="en"?"Minimum Tax (0.1%)":"ពន្ធអប្បបរមា"} value={fmt(result.tax)} color="red" />
            {result.profitTax>0 && <>
              <Row label={lang==="en"?"Profit Tax":"ពន្ធចំណេញ"} value={fmt(result.profitTax)} />
              <Row label={lang==="en"?"Tax to Pay (higher)":"ពន្ធត្រូវបង់"} value={fmt(result.finalTax)} color="gold" />
              <Row label={lang==="en"?"Minimum Tax Applies?":"ពន្ធអប្បបរមាអនុវត្ត?"} value={result.applicable?(lang==="en"?"YES":"បាទ/ចាស"):(lang==="en"?"NO":"ទេ")} color={result.applicable?"red":"green"} />
            </>}
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: gold2, marginBottom: 14 }}>{lang==="en"?"Example":"ឧទាហរណ៍"}</div>
          <div style={{ fontSize: "0.82rem", color: "#B8C8DC", lineHeight: 1.9 }}>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Revenue":"ចំណូល"}:</strong> 5,000,000 ៛</p>
            <p><strong style={{ color: gold2 }}>{lang==="en"?"Min Tax":"ពន្ធអប្ប"}:</strong> 5,000,000 × 0.1% = 5,000 ៛</p>
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
  return <SimpleCalcTab lang={lang}
    titleEn="Land Transfer Tax" titleKh="ពន្ធផ្ទេរកម្មសិទ្ធិដី"
    subEn="4% on sale price when transferring land ownership." subKh="៤% លើតម្លៃ"
    boxContent={(l)=><><strong style={{color:gold2}}>{l==="en"?"Formula":"រូបមន្ត"}:</strong> {l==="en"?"Sale Price × 4%":"តម្លៃ × ៤%"}</>}
    labelEn="Sale Price / Property Value (KHR)" labelKh="តម្លៃ (រៀល)"
    placeholder="e.g. 10000000"
    calcFn={calcLandTransfer}
    renderRows={(r,v,l)=><>
      <Row label={l==="en"?"Sale Price":"តម្លៃ"} value={fmt(v)} />
      <Row label={l==="en"?"Tax Rate":"អត្រា"} value="4%" />
      <Row label={l==="en"?"Land Transfer Tax":"ពន្ធ"} value={fmt(r.tax)} color="red" />
      <Row label={l==="en"?"Total Cost":"ចំណាយសរុប"} value={fmt(v+r.tax)} color="gold" />
    </>}
    exampleContent={(l)=><div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
      <p><strong style={{color:gold2}}>{l==="en"?"Sale price":"តម្លៃ"}:</strong> 10,000,000 ៛</p>
      <p><strong style={{color:gold2}}>{l==="en"?"Tax":"ពន្ធ"}:</strong> 10,000,000 × 4% = 400,000 ៛</p>
    </div>}
  />;
}

// ═══════════════════════════════════════════════════════════
// 12. PROPERTY TAX
// ═══════════════════════════════════════════════════════════
export function PropertyTaxTab({ lang }) {
  const [val, setVal] = useState("");
  const [rate, setRate] = useState("0.5");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const v = parseFloat(val) || 0;
    if (v > 0) setResult(calcPropertyTax(v, parseFloat(rate)));
    else setResult(null);
  }, [val, rate]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Property Tax — ពន្ធអចលនទ្រព្យ":"ពន្ធអចលនទ្រព្យ"}</div>
      <div style={subt}>{lang==="en"?"Annual tax on property. Rate: 0.1% to 1%.":"ពន្ធប្រចាំឆ្នាំ ០.១% ដល់ ១%"}</div>
      <div style={box}><strong style={{color:gold2}}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Property Value × Rate":"តម្លៃ × អត្រា"}</div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <label style={label}>{lang==="en"?"Property Value (KHR)":"តម្លៃ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 10000000" value={val} onChange={e=>setVal(e.target.value)} />
          <label style={label}>{lang==="en"?"Tax Rate":"អត្រាពន្ធ"}</label>
          <select style={select} value={rate} onChange={e=>setRate(e.target.value)}>
            <option value="0.1">0.1%</option>
            <option value="0.5">0.5%</option>
            <option value="1.0">1.0%</option>
          </select>
          <button style={btn} onClick={()=>setResult(calcPropertyTax(parseFloat(val)||0,parseFloat(rate)))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Property Value":"តម្លៃ"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"Rate":"អត្រា"} value={rate+"%"} />
            <Row label={lang==="en"?"Property Tax":"ពន្ធ"} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
            <p><strong style={{color:gold2}}>{lang==="en"?"Value":"តម្លៃ"}:</strong> 10,000,000 ៛ | {lang==="en"?"Rate":"អត្រា"}: 0.5%</p>
            <p><strong style={{color:gold2}}>{lang==="en"?"Tax":"ពន្ធ"}:</strong> 10,000,000 × 0.5% = 50,000 ៛</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 13. STAMP TAX
// ═══════════════════════════════════════════════════════════
export function StampTaxTab({ lang }) {
  const [val, setVal] = useState("");
  const [rate, setRate] = useState("0.5");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const v = parseFloat(val) || 0;
    if (v > 0) setResult(calcStampTax(v, parseFloat(rate)));
    else setResult(null);
  }, [val, rate]);
  return (
    <div>
      <div style={title}>{lang==="en"?"Stamp Tax — ពន្ធប្រថាប់ត្រា":"ពន្ធប្រថាប់ត្រា"}</div>
      <div style={subt}>{lang==="en"?"0.1% to 1% on official documents.":"០.១% ដល់ ១% លើឯកសារ"}</div>
      <div style={box}><strong style={{color:gold2}}>{lang==="en"?"Formula":"រូបមន្ត"}:</strong> {lang==="en"?"Document Value × Rate":"ឯកសារ × អត្រា"}</div>
      <div style={grid}>
        <div className="card-hover" style={calcCard}>
          <label style={label}>{lang==="en"?"Document Value (KHR)":"តម្លៃឯកសារ (រៀល)"}</label>
          <input className="input-focus" style={input} type="number" placeholder="e.g. 5000000" value={val} onChange={e=>setVal(e.target.value)} />
          <label style={label}>{lang==="en"?"Tax Rate":"អត្រាពន្ធ"}</label>
          <select style={select} value={rate} onChange={e=>setRate(e.target.value)}>
            <option value="0.1">0.1%</option>
            <option value="0.5">0.5%</option>
            <option value="1.0">1.0%</option>
          </select>
          <button style={btn} onClick={()=>setResult(calcStampTax(parseFloat(val)||0,parseFloat(rate)))}>{lang==="en"?"Calculate":"គណនា"}</button>
          {result && <div className="result-fade" style={resultBox}>
            <Row label={lang==="en"?"Document Value":"តម្លៃ"} value={fmt(parseFloat(val))} />
            <Row label={lang==="en"?"Rate":"អត្រា"} value={rate+"%"} />
            <Row label={lang==="en"?"Stamp Tax":"ពន្ធ"} value={fmt(result.tax)} color="red" />
          </div>}
        </div>
        <div className="card-hover" style={calcCard}>
          <div style={{fontSize:"0.82rem",color:"#B8C8DC",lineHeight:1.9}}>
            <p><strong style={{color:gold2}}>{lang==="en"?"Contract":"កិច្ចសន្យា"}:</strong> 5,000,000 ៛ | {lang==="en"?"Rate":"អត្រា"}: 0.5%</p>
            <p><strong style={{color:gold2}}>{lang==="en"?"Tax":"ពន្ធ"}:</strong> 5,000,000 × 0.5% = 25,000 ៛</p>
          </div>
        </div>
      </div>
    </div>
  );
}
