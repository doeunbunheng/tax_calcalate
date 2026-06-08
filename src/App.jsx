import { useState, useEffect, useCallback, useMemo } from "react";
import { T, TAXES, CATEGORIES, gold, gold2, navy, card, muted, white, border, red, green } from "./data.js";
import { Row, Table, OverviewTab, SalaryTab, PrepaymentTab, VATTab, SpecialTab, WHTTab, PublicLightingTab, AccommodationTab, DividendTab, MinimumTaxTab, RentLandTab, LandTransferTab, PropertyTaxTab, CorporateIncomeTaxTab, NaturalResourceTaxTab, QIPTaxTab, InsuranceTaxTab, ProgressiveIndividualTaxTab, TaxableIncomeAdjustmentTab, AnnualTaxTab } from "./tabs.jsx";

const BASE = import.meta.env.BASE_URL || "/";

// ── Router ──────────────────────────────────────────────
function useRouter() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const h = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  const navigate = useCallback((p) => { window.location.hash = p; window.scrollTo(0, 0); }, []);
  let page = "home", taxId = null, calcId = null, key = 0;
  const clean = (hash.replace("#", "") || "/").toLowerCase();
  if (clean === "/about") page = "about";
  else if (clean === "/taxes") page = "taxes";
  else if (clean.startsWith("/calculator")) { page = "calculator"; const p = clean.split("/").filter(Boolean); if (p[1]) calcId = p[1]; key = Date.now(); }
  else if (clean.startsWith("/tax/")) page = "detail", taxId = clean.replace("/tax/", "");
  else page = "home";
  return { page, taxId, calcId, key, navigate };
}

// ── Theme helpers ──────────────────────────────────────
const S = {
  page: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  title: { fontSize: "1.4rem", fontWeight: 800, color: gold, marginBottom: 4 },
  sub: { color: muted, fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 },
  card: { background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))", border: `1px solid ${border}`, borderRadius: 14, padding: "20px 22px", boxShadow: "0 10px 26px rgba(0,0,0,0.18)", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" },
  taxCard: { background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))", border: `1px solid ${border}`, borderRadius: 14, padding: "18px 20px", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 6px 16px rgba(0,0,0,0.12)" },
  cTitle: { fontSize: "0.9rem", fontWeight: 700, color: gold2, marginBottom: 14 },
  label: { display: "block", fontSize: "0.7rem", color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, marginTop: 12 },
  btn: { padding: "10px 24px", background: `linear-gradient(135deg,${gold},#A87A20)`, border: "none", borderRadius: 6, color: navy, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" },
  btnOutline: { padding: "10px 24px", background: "transparent", border: `1px solid ${gold}`, borderRadius: 6, color: gold, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" },
};

const navLink = (active) => ({ padding: "8px 14px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: active ? gold : muted, background: active ? "rgba(212,168,67,0.12)" : "transparent", border: "none", borderRadius: 8, transition: "all 0.2s" });
const langBtn = (a) => ({ padding: "6px 12px", borderRadius: 20, cursor: "pointer", border: `1px solid ${a ? gold : border}`, background: a ? "rgba(212,168,67,0.2)" : "transparent", color: a ? gold : muted, fontWeight: 600, fontSize: "0.72rem", transition: "all 0.2s" });
const logoImg = { width: 60, height: 60, borderRadius: "50%", objectFit: "cover" };
const logoImgMob = { width: 40, height: 40, borderRadius: "50%", objectFit: "cover" };

const navKeys = ["home", "about", "taxes", "calculator"];
const navPath = (k) => `#/${k === "home" ? "" : k}`;

function Footer({ lang }) {
  const t = T[lang];
  return (
    <footer style={{ borderTop: `1px solid ${border}`, padding: "40px 24px 24px", marginTop: 60, background: "rgba(0,0,0,0.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 28 }}>
        <div>
          <div style={{ color: gold, fontWeight: 800, fontSize: "1.05rem", marginBottom: 8 }}>{t.appTitle}</div>
          <div style={{ color: muted, fontSize: "0.75rem", lineHeight: 1.8 }}>{t.appSub}</div>
        </div>
        <div>
          <div style={{ color: gold2, fontWeight: 700, fontSize: "0.82rem", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lang === "en" ? "Quick Links" : "តំណភ្ជាប់"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navKeys.map(k => (
              <a key={k} href={navPath(k)} style={{ color: muted, fontSize: "0.78rem", textDecoration: "none" }}>{t.nav[k]}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ color: gold2, fontWeight: 700, fontSize: "0.82rem", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lang === "en" ? "Disclaimer" : "ការបដិសេធ"}</div>
          <p style={{ color: muted, fontSize: "0.72rem", lineHeight: 1.7 }}>
            {lang === "en"
              ? "Tax rates based on current Cambodian tax law. This tool is for educational reference only. Consult a qualified tax professional for advice."
              : "អត្រាពន្ធផ្អែកលើច្បាប់ពន្ធកម្ពុជាបច្ចុប្បន្ន។ ឧបករណ៍នេះសម្រាប់ឯកសារយោងអប់រំតែប៉ុណ្ណោះ។"}
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, paddingTop: 16, borderTop: `1px solid ${border}`, color: muted, fontSize: "0.72rem" }}>
        &copy; {lang === "en" ? "2026 ITC Economy for Engineers." : "២០២៦ ITC សេដ្ឋកិច្ចសម្រាប់វិស្វករ។"}
      </div>
    </footer>
  );
}

// ── Home Page ──────────────────────────────────────────
function HomePage({ lang, navigate }) {
  const t = T[lang].home;
  const featured = TAXES.slice(0, 6);
  const [counted, setCounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setCounted(true), 200); return () => clearTimeout(t); }, []);
  const stats = [
    { label: t.stat1Label, val: "18", suffix: "" },
    { label: t.stat2Label, val: "2", suffix: "" },
    { label: t.stat3Label, val: "4", suffix: "" },
    { label: t.stat4Label, val: "100", suffix: "%" },
  ];
  return (
    <div className="page-enter">
      {/* HERO */}
      <div style={{ textAlign: "center", padding: "70px 24px 56px", background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.10) 0%, transparent 65%)", position: "relative", overflow: "hidden" }}>
        <div className="hero-glow" style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "400px", height: "200px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,168,67,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "0.72rem", color: gold, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14, position: "relative" }}>{T[lang].appSub}</div>
        <h1 style={{ fontSize: "clamp(1.6rem,4.5vw,2.6rem)", fontWeight: 800, color: white, marginBottom: 14, lineHeight: 1.15, position: "relative" }}>{t.heroTitle}</h1>
        <p style={{ fontSize: "0.9rem", color: muted, maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.7, position: "relative" }}>{t.heroSub}</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <button style={S.btn} onClick={() => navigate("#/calculator")}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 6px 20px rgba(212,168,67,0.35)" }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none" }}
          >{t.heroCta1}</button>
          <button style={S.btnOutline} onClick={() => navigate("#/about")}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)" }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)" }}
          >{t.heroCta2}</button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, maxWidth: 800, margin: "-20px auto 48px", padding: "0 24px", position: "relative" }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ ...S.card, textAlign: "center", padding: "18px 12px" }}>
            <div style={{ fontSize: "clamp(1.4rem,2.5vw,1.8rem)", fontWeight: 800, color: gold }}>
              {counted ? s.val : "0"}{s.suffix}
            </div>
            <div style={{ fontSize: "0.72rem", color: muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURED TAXES */}
      <div style={{ ...S.page, marginBottom: 48 }}>
        <h2 style={S.title}>{t.featuredTitle}</h2>
        <p style={S.sub}>{t.featuredSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {featured.map((tx) => (
            <div key={tx.id} className="card-hover" style={S.taxCard} onClick={() => navigate(`#/tax/${tx.id}`)}
              onMouseEnter={e => e.currentTarget.style.borderColor = gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "1.5rem" }}>{tx.icon}</div>
                  <div style={{ color: gold2, fontWeight: 700, fontSize: "0.9rem", marginTop: 8 }}>{lang === "en" ? tx.en : tx.kh}</div>
                  <div style={{ color: muted, fontSize: "0.72rem", marginTop: 2 }}>{tx.cat}</div>
                </div>
                <div style={{ background: "rgba(212,168,67,0.15)", padding: "4px 10px", borderRadius: 12, fontSize: "0.72rem", fontWeight: 600, color: gold }}>{tx.rate}</div>
              </div>
              <div style={{ color: "#B8C8DC", fontSize: "0.75rem", lineHeight: 1.6, marginTop: 10 }}>{lang === "en" ? tx.defEn : tx.defKh}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button style={S.btnOutline} onClick={() => navigate("#/taxes")}
            onMouseEnter={e => { e.target.style.background = "rgba(212,168,67,0.1)" }}
            onMouseLeave={e => { e.target.style.background = "transparent" }}
          >{t.viewAll}</button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ ...S.page, marginBottom: 48 }}>
        <h2 style={S.title}>{t.howTitle}</h2>
        <p style={S.sub}>{t.howSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {[
            { num: "01", title: t.step1Title, desc: t.step1Desc },
            { num: "02", title: t.step2Title, desc: t.step2Desc },
            { num: "03", title: t.step3Title, desc: t.step3Desc },
          ].map((s, i) => (
            <div key={i} className="card-hover" style={S.card}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "rgba(212,168,67,0.15)", marginBottom: 4 }}>{s.num}</div>
              <div style={{ color: gold2, fontWeight: 700, fontSize: "0.9rem", marginBottom: 6 }}>{s.title}</div>
              <div style={{ color: "#B8C8DC", fontSize: "0.8rem", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "44px 24px", background: "radial-gradient(ellipse at 50% 100%, rgba(212,168,67,0.08) 0%, transparent 60%)" }}>
        <h2 style={{ ...S.title, fontSize: "1.3rem" }}>{t.ctaTitle}</h2>
        <p style={{ color: muted, fontSize: "0.85rem", maxWidth: 500, margin: "8px auto 20px" }}>{t.ctaDesc}</p>
        <button style={S.btn} onClick={() => navigate("#/calculator")}
          onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 6px 20px rgba(212,168,67,0.35)" }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none" }}
        >{t.ctaBtn}</button>
      </div>
    </div>
  );
}

// ── About Page ─────────────────────────────────────────
function AboutPage({ lang, navigate }) {
  const t = T[lang].about;
  const cats = [
    { icon: "💰", title: t.cat1Title, desc: t.cat1Desc, filter: "income" },
    { icon: "🧾", title: t.cat2Title, desc: t.cat2Desc, filter: "indirect" },
    { icon: "🏠", title: t.cat3Title, desc: t.cat3Desc, filter: "transaction" },
    { icon: "🏦", title: t.cat4Title, desc: t.cat4Desc, filter: "advance" },
  ];
  return (
    <div className="page-enter" style={S.page}>
      <div style={{ padding: "40px 0" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: gold, marginBottom: 6 }}>{t.title}</h1>
        <p style={{ color: muted, fontSize: "0.85rem", marginBottom: 32, lineHeight: 1.6 }}>{t.sub}</p>
        <div style={{ ...S.card, marginBottom: 28 }}>
          <div style={S.cTitle}>{t.overviewTitle}</div>
          <p style={{ color: "#B8C8DC", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: 10 }}>{t.overviewP1}</p>
          <p style={{ color: "#B8C8DC", fontSize: "0.82rem", lineHeight: 1.8 }}>{t.overviewP2}</p>
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: gold, marginBottom: 4 }}>{t.catTitle}</h2>
        <p style={S.sub}>{t.catSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 32 }}>
          {cats.map((c, i) => (
            <div key={i} className="card-hover" style={{ ...S.card, cursor: "pointer" }} onClick={() => navigate(`#/taxes?cat=${c.filter}`)}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: gold2, fontWeight: 700, fontSize: "0.88rem", marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: "#B8C8DC", fontSize: "0.78rem", lineHeight: 1.7 }}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ ...S.card, marginBottom: 28 }}>
          <div style={S.cTitle}>{t.howTitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {t.howSteps.map((s, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${gold}`, paddingLeft: 14 }}>
                <div style={{ color: gold, fontWeight: 700, fontSize: "0.75rem", marginBottom: 4 }}>{`0${i + 1}`}</div>
                <div style={{ color: gold2, fontWeight: 600, fontSize: "0.82rem", marginBottom: 4 }}>{s.title}</div>
                <div style={{ color: "#B8C8DC", fontSize: "0.75rem", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: gold, marginBottom: 14 }}>{t.glossaryTitle}</h2>
        <Table rows={[
          [lang === "en" ? "Term" : "ពាក្យ", lang === "en" ? "Definition" : "និយមន័យ"],
          ...t.glossary.map(g => [g.term, g.def]),
        ]} />
      </div>
    </div>
  );
}

// ── All Taxes Page ──────────────────────────────────────
function AllTaxesPage({ lang, navigate }) {
  const t = T[lang].allTaxes;
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    let list = TAXES;
    if (filter !== "all") list = list.filter(tx => tx.cat === filter);
    if (search) { const s = search.toLowerCase(); list = list.filter(tx => tx.en.toLowerCase().includes(s) || tx.kh.includes(s)); }
    return list;
  }, [filter, search]);
  return (
    <div className="page-enter" style={S.page}>
      <div style={{ padding: "32px 0" }}>
        <h1 style={S.title}>{t.title}</h1>
        <p style={S.sub}>{t.sub}</p>
        <input className="input-focus" style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.06)", border: `1px solid ${border}`, borderRadius: 8, padding: "10px 14px", color: white, fontSize: "0.85rem", outline: "none", marginBottom: 16 }} type="text" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} style={{ padding: "6px 16px", borderRadius: 20, cursor: "pointer", border: `1px solid ${filter === c.id ? gold : border}`, background: filter === c.id ? "rgba(212,168,67,0.2)" : "transparent", color: filter === c.id ? gold : muted, fontWeight: 600, fontSize: "0.78rem", transition: "all 0.2s" }} onClick={() => setFilter(c.id)}>
              {c.icon} {lang === "en" ? c.en : c.kh}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: muted }}>{t.noResults}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {filtered.map(tx => (
              <div key={tx.id} className="card-hover" style={S.taxCard} onClick={() => navigate(`#/tax/${tx.id}`)}
                onMouseEnter={e => e.currentTarget.style.borderColor = gold}
                onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "1.5rem" }}>{tx.icon}</div>
                    <div style={{ color: gold2, fontWeight: 700, fontSize: "0.9rem", marginTop: 8 }}>{lang === "en" ? tx.en : tx.kh}</div>
                    <div style={{ color: muted, fontSize: "0.7rem", marginTop: 2 }}>{CATEGORIES.find(c => c.id === tx.cat) ? (lang === "en" ? CATEGORIES.find(c => c.id === tx.cat).en : CATEGORIES.find(c => c.id === tx.cat).kh) : tx.cat}</div>
                  </div>
                  <div style={{ background: "rgba(212,168,67,0.15)", padding: "4px 10px", borderRadius: 12, fontSize: "0.72rem", fontWeight: 600, color: gold }}>{tx.rate}</div>
                </div>
                <div style={{ color: "#B8C8DC", fontSize: "0.75rem", lineHeight: 1.6, marginTop: 10 }}>{lang === "en" ? tx.defEn : tx.defKh}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Calculator Page ──────────────────────────────────────
const TAX_COMPONENTS = {
  salary: SalaryTab, prepayment: PrepaymentTab, vat: VATTab, special: SpecialTab,
  withholding: WHTTab, lighting: PublicLightingTab, accommodation: AccommodationTab,
  dividend: DividendTab, minimum: MinimumTaxTab, rent: RentLandTab,
  landtransfer: LandTransferTab, property: PropertyTaxTab,
  corporate: CorporateIncomeTaxTab, naturalresource: NaturalResourceTaxTab,
  qip: QIPTaxTab, insurance: InsuranceTaxTab,
  progressive: ProgressiveIndividualTaxTab, taxadjustment: TaxableIncomeAdjustmentTab,
  annual: AnnualTaxTab,
};

function CalculatorPage({ lang, navigate, calcId }) {
  const t = T[lang].calculator;
  const [selected, setSelected] = useState(calcId || "salary");
  const Comp = TAX_COMPONENTS[selected];
  useEffect(() => { if (calcId) setSelected(calcId); }, [calcId]);

  return (
    <div className="page-enter" style={{ display: "flex", gap: 24, padding: "24px 24px 40px", maxWidth: 1400, margin: "0 auto", flexWrap: "wrap" }}>
      <div style={{ width: "clamp(160px,25vw,240px)", minWidth: 160, flexShrink: 0, ...S.card, padding: "14px 16px", height: "fit-content", position: "sticky", top: 80 }}>
        <div style={{ color: gold, fontWeight: 700, fontSize: "0.82rem", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.selectTax}</div>
        {TAXES.map(tx => (
          <div key={tx.id} style={{ padding: "8px 12px", cursor: "pointer", borderRadius: 8, background: selected === tx.id ? "rgba(212,168,67,0.15)" : "transparent", color: selected === tx.id ? gold : muted, fontWeight: selected === tx.id ? 700 : 500, fontSize: "0.78rem", marginBottom: 2, display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}
            onClick={() => { setSelected(tx.id); navigate(`#/calculator/${tx.id}`); }}>
            <span style={{ fontSize: "1rem" }}>{tx.icon}</span>
            <span>{lang === "en" ? tx.en : tx.kh}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={S.title}>{T[lang].tabs[selected] || t.title}</h1>
        <p style={S.sub}>{t.sub}</p>
        {Comp && <Comp lang={lang} />}
      </div>
    </div>
  );
}

// ── Tax Detail Page ──────────────────────────────────────
function TaxDetailPage({ lang, navigate, taxId }) {
  const d = T[lang].detail;
  const tax = TAXES.find(tx => tx.id === taxId);
  const idx = TAXES.findIndex(tx => tx.id === taxId);
  const prev = idx > 0 ? TAXES[idx - 1] : null;
  const next = idx < TAXES.length - 1 ? TAXES[idx + 1] : null;
  const Comp = TAX_COMPONENTS[taxId];
  if (!tax || !Comp) {
    return <div className="page-enter" style={{ textAlign: "center", padding: 60, color: muted }}>
      <div style={{ fontSize: "2rem", marginBottom: 10 }}>⚠️</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: gold, marginBottom: 6 }}>{lang === "en" ? "Tax not found" : "រកមិនឃើញពន្ធ"}</div>
      <button style={S.btnOutline} onClick={() => navigate("#/taxes")}>{d.backToAll}</button>
    </div>;
  }
  return (
    <div className="page-enter" style={{ padding: "24px 24px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: "0.8rem" }}>
        <span onClick={() => navigate("#/")} style={{ color: gold, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>{T[lang].nav.home}</span>
        <span style={{ color: muted }}>›</span>
        <span onClick={() => navigate("#/taxes")} style={{ color: gold, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>{T[lang].nav.allTaxes}</span>
        <span style={{ color: muted }}>›</span>
        <span style={{ color: white }}>{lang === "en" ? tax.en : tax.kh}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, marginBottom: 32 }}>
        <div className="card-hover" style={S.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: "2rem" }}>{tax.icon}</span>
            <div>
              <div style={{ color: gold2, fontWeight: 800, fontSize: "1.1rem" }}>{lang === "en" ? tax.en : tax.kh}</div>
              <div style={{ color: muted, fontSize: "0.75rem" }}>{CATEGORIES.find(c => c.id === tax.cat) ? (lang === "en" ? CATEGORIES.find(c => c.id === tax.cat).en : CATEGORIES.find(c => c.id === tax.cat).kh) : ""}</div>
            </div>
          </div>
          <div style={{ background: "rgba(212,168,67,0.10)", border: `1px solid ${border}`, borderRadius: 8, padding: "12px 16px", color: "#C5D5E8", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: 14 }}>
            {lang === "en" ? tax.defEn : tax.defKh}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><div style={{ fontSize: "0.65rem", color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.rate}</div><div style={{ color: gold, fontWeight: 700, fontSize: "0.9rem" }}>{tax.rate}</div></div>
            <div><div style={{ fontSize: "0.65rem", color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.due}</div><div style={{ color: white, fontSize: "0.82rem" }}>{tax.due}</div></div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: "0.65rem", color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{d.formula}</div>
            <div style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${border}`, borderRadius: 6, padding: "10px 14px", color: gold2, fontSize: "0.8rem", fontFamily: "monospace" }}>{lang === "en" ? tax.formulaEn : tax.formulaKh}</div>
          </div>
        </div>

        <div className="card-hover" style={S.card}>
          <div style={S.cTitle}>{lang === "en" ? "Quick Actions" : "សកម្មភាពរហ័ស"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={S.btn} onClick={() => navigate(`#/calculator/${tax.id}`)}
              onMouseEnter={e => { e.target.style.transform = "scale(1.02)" }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)" }}
            >{lang === "en" ? `Open ${tax.en} Calculator` : `បើកម៉ាស៊ីនគិតពន្ធ ${tax.kh}`}</button>
            <div style={{ display: "flex", gap: 10 }}>
              {prev && <button style={{ ...S.btnOutline, flex: 1 }} onClick={() => navigate(`#/tax/${prev.id}`)}
                onMouseEnter={e => { e.target.style.background = "rgba(212,168,67,0.1)" }}
                onMouseLeave={e => { e.target.style.background = "transparent" }}
              >← {lang === "en" ? prev.en : prev.kh}</button>}
              {next && <button style={{ ...S.btnOutline, flex: 1 }} onClick={() => navigate(`#/tax/${next.id}`)}
                onMouseEnter={e => { e.target.style.background = "rgba(212,168,67,0.1)" }}
                onMouseLeave={e => { e.target.style.background = "transparent" }}
              >{lang === "en" ? next.en : next.kh} →</button>}
            </div>
          </div>
          {tax.id === "salary" && <div style={{ marginTop: 14 }}>
            <Table rows={[[lang==="en"?"Bracket":"ជាន់ថ្នាក់", lang==="en"?"Rate":"អត្រា"],["0 - 1,500,000","0%"],["1,500,001 - 2,000,000","5%"],["2,000,001 - 8,500,000","10%"],["8,500,001 - 12,500,000","15%"],["Above 12,500,000","20%"]]} />
          </div>}
          {tax.id === "vat" && <div style={{ marginTop: 14 }}>
            <Table rows={[[lang==="en"?"Supply Type":"ប្រភេទ", lang==="en"?"Rate":"អត្រា"],["Standard","10%"],["Exports","0%"],[lang==="en"?"Exempt supplies":"ការលើកលែង",lang==="en"?"Exempt":"លើកលែង"]]} />
          </div>}
          {tax.id === "special" && <div style={{ marginTop: 14 }}>
            <Table rows={[[lang==="en"?"Goods/Service":"ទំនិញ/សេវា", "Rate"],["Alcohol","35%"],["Beer","30%"],["Cigarettes","20%"],["Drinks","10%"],["Cement","5%"],["Services","3-10%"]]} />
          </div>}
          {tax.id === "withholding" && <div style={{ marginTop: 14 }}>
            <Table rows={[[lang==="en"?"Type":"ប្រភេទ","Rate"],["Services","15%"],["Royalties","15%"],["Interest","15%"],["Rental","10%"],["Fixed dep.","6%"],["Non-fixed","4%"]]} />
          </div>}
        </div>
      </div>

      <div className="card-hover" style={S.card}>
        <div style={S.cTitle}>{d.liveCalc}</div>
        <Comp lang={lang} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
        {prev ? (
          <div className="card-hover" style={{ ...S.taxCard, flex: 1 }} onClick={() => navigate(`#/tax/${prev.id}`)}>
            <div style={{ fontSize: "0.65rem", color: muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>← {d.prevTax}</div>
            <div style={{ color: gold2, fontWeight: 700 }}>{prev.icon} {lang === "en" ? prev.en : prev.kh}</div>
          </div>
        ) : <div style={{ flex: 1 }} />}
        {next ? (
          <div className="card-hover" style={{ ...S.taxCard, flex: 1, textAlign: "right" }} onClick={() => navigate(`#/tax/${next.id}`)}>
            <div style={{ fontSize: "0.65rem", color: muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{d.nextTax} →</div>
            <div style={{ color: gold2, fontWeight: 700 }}>{next.icon} {lang === "en" ? next.en : next.kh}</div>
          </div>
        ) : <div style={{ flex: 1 }} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
const pageGrad = "linear-gradient(180deg,#071A33 0%,#0B1E3D 60%,#08172B 100%)";
const appStyle = { fontFamily: "'Khmer OS Siemreap','Segoe UI',sans-serif", background: pageGrad, minHeight: "100vh", color: white };

export default function CambodiaTaxCalculator() {
  const { page, taxId, calcId, navigate } = useRouter();
  const [lang, setLang] = useState(() => { try { return localStorage.getItem("taxLang") || "en"; } catch { return "en"; } });
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem("taxLang", lang); } catch {} }, [lang]);
  const toggleLang = () => setLang(l => l === "en" ? "kh" : "en");

  const pageKey = `${page}-${taxId || ""}-${calcId || ""}`;

  return (
    <div style={appStyle}>
      {/* HEADER */}
      <header style={{ background: "linear-gradient(135deg,#102448,#0B1E3D)", borderBottom: `2px solid ${gold}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 6px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "10px 24px 4px", position: "relative", flexWrap: "wrap" }}>
          {/* HAMBURGER */}
          <button style={{ position: "absolute", left: 12, top: 10, background: "none", border: "none", color: gold, fontSize: "1.4rem", cursor: "pointer", display: "none", zIndex: 10, padding: "4px 8px" }}
            className="mobile-only" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? "✕" : "☰"}
          </button>
          <img src={BASE + "logo_GDOT.png"} alt="GDT" style={logoImg} onError={e => e.target.style.display="none"} className="logo-lg" />
          <img src={BASE + "logo_GDOT.png"} alt="GDT" style={logoImgMob} onError={e => e.target.style.display="none"} className="logo-sm" />
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { navigate("#/"); setMenuOpen(false); }}>
            <div style={{ color: muted, fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.2 }}>ព្រះរាជាណាចក្រកម្ពុជា ជាតិសាសនាព្រះមហាក្សត្រ</div>
            <div style={{ color: gold, fontWeight: 700, fontSize: "0.95rem" }}>{T[lang].appTitle}</div>
            <div style={{ color: muted, fontSize: "0.7rem" }}>{T[lang].appSub}</div>
          </div>
          <img src={BASE + "logo_ITC.png"} alt="ITC" style={{ ...logoImg, background: "white" }} onError={e => e.target.style.display="none"} className="logo-lg" />
          <img src={BASE + "logo_ITC.png"} alt="ITC" style={{ ...logoImgMob, background: "white" }} onError={e => e.target.style.display="none"} className="logo-sm" />
          <div style={{ position: "absolute", right: 12, top: 6, display: "flex", gap: 4, alignItems: "center" }}>
            <span className="desktop-only" style={{ background: "rgba(212,168,67,0.12)", border: `1px solid ${border}`, color: gold, padding: "2px 8px", borderRadius: 20, fontSize: "0.62rem", fontWeight: 700, whiteSpace: "nowrap" }}>{T[lang].taxes18}</span>
            <button style={langBtn(lang === "en")} onClick={() => setLang("en")}>EN</button>
            <button style={langBtn(lang === "kh")} onClick={() => setLang("kh")}>KH</button>
          </div>
        </div>
        {/* DESKTOP NAV */}
        <nav className="desktop-only" style={{ display: "flex", justifyContent: "center", gap: 2, padding: "0 12px 6px", flexWrap: "wrap" }}>
          {navKeys.map(key => (
            <button key={key} style={navLink(page === key || (key === "home" && page === "home"))} onClick={() => navigate(navPath(key))}>
              {T[lang].nav[key]}
            </button>
          ))}
        </nav>
        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="mobile-nav" style={{ padding: "6px 16px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navKeys.map(key => (
              <button key={key} style={{ ...navLink(page === key || (key === "home" && page === "home")), textAlign: "left", padding: "10px 14px", fontSize: "0.85rem" }} onClick={() => { navigate(navPath(key)); setMenuOpen(false); }}>
                {T[lang].nav[key]}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <div key={pageKey}>
        {page === "home" && <HomePage lang={lang} navigate={navigate} />}
        {page === "about" && <AboutPage lang={lang} navigate={navigate} />}
        {page === "taxes" && <AllTaxesPage lang={lang} navigate={navigate} />}
        {page === "calculator" && <CalculatorPage lang={lang} navigate={navigate} calcId={calcId} />}
        {page === "detail" && <TaxDetailPage lang={lang} navigate={navigate} taxId={taxId} />}
      </div>

      <Footer lang={lang} />
    </div>
  );
}
