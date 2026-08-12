import { Router } from "express";
import { ssrShell, escapeHtml, NAP_ADDRESS, NAP_PHONE, PRACTICE_NAME, SITE_URL } from "../lib/ssrShell";

const router = Router();

// NAP constants imported from ssrShell — use NAP_ADDRESS, NAP_PHONE, PRACTICE_NAME
const PRACTICE_ADDRESS = NAP_ADDRESS;
const PRACTICE_PHONE = NAP_PHONE;

const WARNING_SIGNS = [
  {
    sign: "Skips or re-reads lines while reading",
    detail: "Suggests difficulty with eye tracking (oculomotor control).",
  },
  {
    sign: "Reverses letters or numbers (e.g., b/d, p/q, 6/9)",
    detail: "May indicate visual perceptual processing delays, especially beyond first grade.",
  },
  {
    sign: "Loses place when copying from the board",
    detail: "Points to poor eye teaming and visual memory.",
  },
  {
    sign: "Complains of double vision or blurry print",
    detail: "A classic sign of convergence insufficiency or accommodative dysfunction.",
  },
  {
    sign: "Avoids reading or close work",
    detail: "Often a coping strategy for children with eye strain or headaches from near tasks.",
  },
  {
    sign: "Headaches or eye strain after reading or screen time",
    detail: "Indicates the visual system is working harder than it should to maintain focus.",
  },
  {
    sign: "Covers or closes one eye when reading",
    detail: "The brain may be suppressing one eye to eliminate double vision.",
  },
  {
    sign: "Poor reading comprehension despite effort",
    detail: "When so much effort goes to seeing clearly, little is left for understanding.",
  },
  {
    sign: "Performs below apparent potential at school",
    detail: "Undetected vision problems are frequently misidentified as attention or learning disorders.",
  },
  {
    sign: "Eye turn, head tilt, or squinting",
    detail: "May signal strabismus or an accommodative problem requiring prompt evaluation.",
  },
];

function buildChecklistBody(): string {
  const items = WARNING_SIGNS.map(
    ({ sign, detail }, i) => `
    <div class="checklist-item">
      <div class="check-box" aria-hidden="true">
        <span class="check-num">${i + 1}</span>
      </div>
      <div class="check-content">
        <p class="check-sign">${escapeHtml(sign)}</p>
        <p class="check-detail">${escapeHtml(detail)}</p>
      </div>
    </div>`
  ).join("\n");

  return `
<div class="page-content checklist-page">

  <!-- Print header (hidden on screen, visible on print) -->
  <div class="print-header">
    <div class="print-logo-row">
      <div class="print-logo-mark" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
      <div>
        <strong>${escapeHtml(PRACTICE_NAME)}</strong>
        <span class="print-tagline">Developmental Optometry · Low Vision Care</span>
      </div>
    </div>
    <div class="print-contact">
      <span>${escapeHtml(PRACTICE_ADDRESS)}</span>
      <span>${escapeHtml(PRACTICE_PHONE)}</span>
    </div>
  </div>

  <!-- Screen eyebrow -->
  <p class="eyebrow no-print">Patient Checklist</p>
  <h1 class="page-title">10 Signs Your Child May Have a Vision Problem</h1>
  <p class="lead">
    Many vision disorders go undetected because children pass a standard 20/20 eye chart test.
    These functional signs point to deeper issues with eye teaming, tracking, and visual processing —
    all of which are treatable with vision therapy.
  </p>

  <p class="bring-note">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <strong>Bring this checklist to your appointment.</strong> Check off any signs you recognise in your child and share it with the doctor.
  </p>

  <section class="checklist-section" aria-label="Warning signs checklist">
    ${items}
  </section>

  <div class="cta-print-row no-print">
    <a href="#" onclick="window.print(); return false;" class="print-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
      Save as PDF / Print
    </a>
    <a href="/contact" class="cta-btn">Schedule an Evaluation</a>
  </div>

  <div class="cta-box no-print">
    <h2>Recognise several of these signs?</h2>
    <p>A comprehensive visual perceptual evaluation can determine whether a functional vision problem is present — and whether vision therapy can help.</p>
    <a href="/contact" class="cta-btn">Schedule a Consultation</a>
    <span class="cta-phone">Call <a href="tel:718-268-3937">${escapeHtml(PRACTICE_PHONE)}</a></span>
  </div>

  <!-- Print footer -->
  <div class="print-footer">
    <p>${escapeHtml(PRACTICE_NAME)} &nbsp;·&nbsp; ${escapeHtml(PRACTICE_ADDRESS)} &nbsp;·&nbsp; ${escapeHtml(PRACTICE_PHONE)}</p>
    <p>AdvancedVisionLI.com &nbsp;·&nbsp; Symptom list sourced from OVDRA (covd.org) &nbsp;·&nbsp; For informational purposes only — not medical advice.</p>
  </div>
</div>

<style>
  /* ── Checklist layout ── */
  .checklist-section { margin: 1.5rem 0 2rem; display: flex; flex-direction: column; gap: 0.65rem; }
  .checklist-item { display: flex; gap: 1rem; align-items: flex-start; background: var(--card); border-radius: 14px; padding: 1rem 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .check-box { flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; background: var(--navy); display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .check-num { color: #fff; font-weight: 700; font-size: 0.875rem; }
  .check-content { flex: 1; }
  .check-sign { font-weight: 600; font-size: 0.975rem; color: var(--navy); margin-bottom: 0.2rem; }
  .check-detail { font-size: 0.83rem; color: var(--text-muted); line-height: 1.55; }

  /* Bring-note callout */
  .bring-note { display: flex; align-items: flex-start; gap: 0.6rem; background: rgba(20,126,147,0.08); border-left: 3px solid var(--teal); border-radius: 0 10px 10px 0; padding: 0.85rem 1rem; font-size: 0.88rem; color: var(--navy); margin-bottom: 1.75rem; line-height: 1.5; }
  .bring-note svg { flex-shrink: 0; margin-top: 2px; color: var(--teal); }

  /* Print/CTA row */
  .cta-print-row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin: 1.75rem 0 0; }
  .print-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.4rem; border: 2px solid var(--navy); border-radius: 100px; font-weight: 600; font-size: 0.9rem; color: var(--navy); text-decoration: none; transition: background 0.15s; }
  .print-btn:hover { background: var(--navy); color: #fff; text-decoration: none; }

  /* ── Print styles ── */
  .print-header { display: none; }
  .print-footer { display: none; }

  @media print {
    /* Hide nav, footer, screen-only elements */
    .site-nav, .site-footer, .no-print { display: none !important; }

    body { background: #fff; color: #000; font-size: 11pt; }
    .page-content { padding: 0; max-width: 100%; }
    .page-title { font-size: 18pt; color: #000; }
    .lead { font-size: 10pt; color: #333; }

    /* Show print header */
    .print-header {
      display: block;
      border-bottom: 2px solid #0B3B49;
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .print-logo-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.3rem; }
    .print-logo-mark { width: 30px; height: 30px; background: #0B3B49; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
    .print-logo-row strong { font-size: 13pt; color: #0B3B49; }
    .print-tagline { display: block; font-size: 8pt; color: #555; }
    .print-contact { font-size: 8.5pt; color: #555; display: flex; gap: 1.5rem; }

    /* Checklist items — clean for print */
    .checklist-item { box-shadow: none; border: 1px solid #ddd; border-radius: 6px; padding: 0.6rem 0.9rem; break-inside: avoid; }
    .check-box { background: #0B3B49; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .check-sign { font-size: 10.5pt; color: #000; }
    .check-detail { font-size: 9pt; color: #444; }
    .bring-note { background: #f0f7f8; border-color: #147E93; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 9.5pt; }
    .eyebrow { display: none; }

    /* Print footer */
    .print-footer {
      display: block;
      border-top: 1px solid #ccc;
      margin-top: 1.5rem;
      padding-top: 0.6rem;
      font-size: 8pt;
      color: #666;
    }
    .print-footer p { margin-bottom: 0.2rem; }
  }
</style>
`;
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "10 Signs Your Child May Have a Vision Problem — Patient Checklist",
  description:
    "A printable checklist of the 10 key warning signs of a functional vision problem in children, from Advanced Vision Long Island.",
  url: "https://AdvancedVisionLI.com/vision-checklist",
  specialty: "Vision Therapy",
  publisher: {
    "@type": "MedicalOrganization",
    name: "Advanced Vision Long Island",
    address: {
      "@type": "PostalAddress",
      streetAddress: "148c Doughty Blvd",
      addressLocality: "Inwood",
      addressRegion: "NY",
      postalCode: "11096",
    },
    telephone: "+17182683937",
  },
};

router.get("/vision-checklist", (_req, res) => {
  const html = ssrShell({
    title: "Vision Problem Warning Signs — Printable Checklist | Advanced Vision Long Island",
    description:
      "10 key warning signs of a functional vision problem in children. Print this checklist and bring it to your appointment at Advanced Vision Long Island, Inwood NY.",
    canonical: "https://AdvancedVisionLI.com/vision-checklist",
    schemaJsons: [webPageSchema],
    bodyHtml: buildChecklistBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy", url: `${SITE_URL}/vision-therapy` },
      { name: "Symptom Checklist", url: `${SITE_URL}/vision-checklist` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

export default router;
