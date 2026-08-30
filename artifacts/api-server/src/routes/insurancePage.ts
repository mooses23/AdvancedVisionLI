import { Router } from "express";
import { ssrShell, escapeHtml, SITE_URL, CONTACT_URL } from "../lib/ssrShell";

const router = Router();

const insuranceFaqs = [
  {
    q: "Does health insurance cover vision therapy?",
    a: "Some medical health insurance plans — including Aetna, Cigna, UnitedHealthcare, Emblem Health, and GHI — may cover vision therapy when it is medically necessary. Vision therapy is billed under medical diagnosis codes, not routine vision codes. Coverage depends on your specific plan and whether the documented diagnosis qualifies under the plan's medical necessity criteria. VSP, EyeMed, and Davis Vision are vision insurance plans that typically do not cover vision therapy.",
  },
  {
    q: "How do I find out if my insurance covers vision therapy?",
    a: "Call the member services number on the back of your medical insurance card — not your vision plan card. Ask: 'Does my plan cover vision therapy or orthoptic training? What diagnosis codes are required? Do I need a referral or prior authorization?' Our office can assist with the pre-authorization process once you have a diagnosis from your evaluation.",
  },
  {
    q: "Does Medicare cover vision therapy?",
    a: "Original Medicare (Parts A and B) does not cover routine vision care, but it may cover vision therapy when it is associated with a neurological condition, traumatic brain injury, or stroke — situations where the visual system is affected by a covered medical diagnosis. Medicare Advantage plans vary; some include vision therapy benefits. Call your plan's member services line to confirm coverage before scheduling.",
  },
  {
    q: "Does Medicaid cover vision therapy in New York?",
    a: "New York Medicaid provides some coverage for optometric services. Coverage for vision therapy specifically depends on the managed care plan and the documented medical diagnosis. Our practice accepts select Medicaid managed care plans. Call our office to confirm whether your specific plan is accepted before scheduling.",
  },
  {
    q: "What is CBVH and how does it help low vision patients?",
    a: "CBVH stands for the New York State Commission for the Blind and Visually Handicapped. New York State residents with significant vision impairment may qualify for CBVH services, which can cover low vision evaluations, optical aids (magnifiers, telescopes, prism lenses), and rehabilitation services at little or no cost to the patient. Eligibility is based on visual acuity and visual field measurements. Our practice works with CBVH-referred patients. Ask our office about a referral.",
  },
  {
    q: "What if my insurance doesn't cover vision therapy?",
    a: "Our office provides a detailed superbill — an itemized receipt with diagnosis and procedure codes — that you can submit to your insurer for possible out-of-network reimbursement. Many patients receive partial reimbursement this way even when their plan does not directly cover in-network vision therapy. FSA (Flexible Spending Account) and HSA (Health Savings Account) funds are also accepted for vision therapy services and evaluations, as these typically qualify as medical expenses.",
  },
  {
    q: "Does insurance cover the initial binocular vision evaluation?",
    a: "A comprehensive binocular vision evaluation is often billed separately from ongoing therapy sessions. Some medical plans cover the initial evaluation when submitted with appropriate diagnosis codes. We recommend calling your insurer before your first appointment to ask whether a binocular vision evaluation is a covered benefit under your plan and whether a referral is needed.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: insuranceFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Does Insurance Cover Vision Therapy? | Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/vision-therapy-insurance/",
  about: { "@type": "MedicalTherapy", name: "Vision Therapy" },
  audience: { "@type": "Patient" },
  provider: {
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

function buildBody(): string {
  const faqItems = insuranceFaqs
    .map(
      ({ q, a }, i) => `
    <details class="faq-accordion" ${i === 0 ? "open" : ""}>
      <summary class="faq-summary">
        <span class="faq-summary-text">${escapeHtml(q)}</span>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="faq-body"><p>${a}</p></div>
    </details>`
    )
    .join("\n");

  return `
<style>
  .ins-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .ins-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .ins-hero h1 { color: #fff; font-size: 2.4rem; line-height: 1.2; margin-bottom: 1rem; }
  @media (max-width:600px) { .ins-hero h1 { font-size: 1.8rem; } }
  .ins-hero .lead { color: rgba(255,255,255,0.82); font-size: 1.05rem; max-width: 660px; margin: 0 auto 1.75rem; line-height: 1.75; }
  .ins-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; }
  .ins-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }

  .bluf { background: var(--card); border-left: 4px solid var(--teal); border-radius: 0 14px 14px 0; padding: 1.25rem 1.5rem; margin: 2rem 0; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .bluf p { color: var(--navy); font-weight: 500; font-size: 1rem; margin: 0; line-height: 1.65; }

  .plan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0.75rem; margin: 1.5rem 0 2rem; }
  .plan-card { background: var(--card); border-radius: 14px; padding: 1.1rem 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
  .plan-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 0.4rem; }
  .plan-name { font-weight: 600; font-size: 0.93rem; color: var(--navy); margin-bottom: 0.25rem; }
  .plan-note { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; }
  .label-may { color: var(--teal); }
  .label-no  { color: #b45309; }

  .steps-box { background: var(--card); border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 5px rgba(0,0,0,0.07); margin: 1.5rem 0 2rem; }
  .steps-box h3 { font-size: 1.05rem; color: var(--navy); margin-bottom: 1rem; font-family: 'Inter', system-ui, sans-serif; font-weight: 600; }
  .ins-step { display: flex; gap: 1rem; margin-bottom: 1rem; }
  .ins-step:last-child { margin-bottom: 0; }
  .ins-step-num { flex-shrink: 0; width: 30px; height: 30px; background: var(--teal); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; margin-top: 2px; }
  .ins-step-body { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }
  .ins-step-body strong { color: var(--navy); }

  .faq-accordion { background: var(--card); border-radius: 14px; margin-bottom: 0.65rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
  .faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.4rem; font-weight: 600; font-size: 0.975rem; color: var(--navy); cursor: pointer; list-style: none; user-select: none; }
  .faq-summary::-webkit-details-marker { display: none; }
  .faq-summary-text { flex: 1; }
  .faq-chevron { flex-shrink: 0; color: var(--teal); transition: transform 0.2s; }
  details[open] .faq-chevron { transform: rotate(180deg); }
  .faq-summary:hover { background: rgba(20,126,147,0.04); }
  .faq-body { padding: 0 1.4rem 1.1rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; }
</style>

<div class="ins-hero">
  <p class="eyebrow">Insurance &amp; Coverage · Inwood, NY</p>
  <h1>Does Insurance Cover Vision Therapy?</h1>
  <p class="lead">A plain-language guide to insurance coverage for vision therapy and low vision care — which plans may help, what to ask your insurer, and what to do if your plan says no.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Call for a Benefits Check</a>
</div>

<div class="page-content">

  <div class="bluf">
    <p><strong>Bottom line:</strong> Medical health insurance (Aetna, Cigna, Emblem/GHI, UnitedHealthcare) may cover vision therapy when a qualifying medical diagnosis — convergence insufficiency, amblyopia, strabismus — is documented. Vision plans (VSP, EyeMed, Davis Vision) almost never do. FSA and HSA funds can be used regardless of plan. CBVH covers low vision care for eligible New York State residents at little or no cost.</p>
  </div>

  <h2 class="section-title">How different plan types typically respond</h2>
  <div class="plan-grid">
    <div class="plan-card">
      <div class="plan-label label-may">May cover</div>
      <div class="plan-name">Medical health insurance</div>
      <div class="plan-note">Aetna, Cigna, Emblem/GHI, UnitedHealthcare, Oxford. Billed under medical diagnosis + procedure codes. Coverage depends on your plan and a qualifying diagnosis.</div>
    </div>
    <div class="plan-card">
      <div class="plan-label label-no">Rarely covers</div>
      <div class="plan-name">Vision plans</div>
      <div class="plan-note">VSP, EyeMed, Davis Vision, Superior Vision. These plans cover exams, glasses, and contacts — not medically necessary therapy programs.</div>
    </div>
    <div class="plan-card">
      <div class="plan-label label-may">May cover</div>
      <div class="plan-name">Medicare</div>
      <div class="plan-note">Original Medicare covers vision therapy only when linked to a neurological or medical diagnosis (TBI, stroke). Medicare Advantage plans vary.</div>
    </div>
    <div class="plan-card">
      <div class="plan-label label-may">May cover</div>
      <div class="plan-name">NY Medicaid</div>
      <div class="plan-note">Coverage varies by managed care plan. Our office accepts select plans. Call us to confirm yours before scheduling.</div>
    </div>
    <div class="plan-card">
      <div class="plan-label label-may">Free for eligible NY residents</div>
      <div class="plan-name">CBVH</div>
      <div class="plan-note">NY Commission for the Blind and Visually Handicapped. Low vision evaluations and optical aids at no cost for eligible patients. Ask our office about a referral.</div>
    </div>
    <div class="plan-card">
      <div class="plan-label label-may">Always accepted</div>
      <div class="plan-name">FSA / HSA</div>
      <div class="plan-note">Flexible Spending Accounts and Health Savings Accounts cover vision therapy as a qualified medical expense. No prior authorization needed.</div>
    </div>
  </div>

  <h2 class="section-title">What to ask your insurer before your appointment</h2>
  <div class="steps-box">
    <h3>Call the member services number on the back of your <em>medical</em> insurance card — not your vision card — and ask:</h3>
    <div class="ins-step">
      <div class="ins-step-num">1</div>
      <div class="ins-step-body"><strong>Is vision therapy or orthoptic training a covered benefit under my plan?</strong> Note the representative's name and a call reference number.</div>
    </div>
    <div class="ins-step">
      <div class="ins-step-num">2</div>
      <div class="ins-step-body"><strong>What diagnosis codes qualify for coverage?</strong> Common codes include H51.11 (convergence insufficiency), H53.031 (amblyopia), H50.00 (strabismus). Your optometrist provides the exact codes after evaluation.</div>
    </div>
    <div class="ins-step">
      <div class="ins-step-num">3</div>
      <div class="ins-step-body"><strong>Do I need a referral or prior authorization?</strong> HMO plans often require a PCP referral. PPO plans typically do not.</div>
    </div>
    <div class="ins-step">
      <div class="ins-step-num">4</div>
      <div class="ins-step-body"><strong>Is Advanced Vision Long Island an in-network provider?</strong> Out-of-network benefits may still reimburse a portion — ask what percentage applies out of network.</div>
    </div>
    <div class="ins-step">
      <div class="ins-step-num">5</div>
      <div class="ins-step-body"><strong>Is there a visit limit or annual dollar cap?</strong> Some plans cover a set number of therapy visits per calendar year.</div>
    </div>
  </div>

  <h2 class="section-title">If your plan doesn't cover vision therapy</h2>
  <div class="prose">
    <p>Our office provides a detailed <strong>superbill</strong> — an itemized receipt with diagnosis codes and procedure codes — that you can submit to your insurer for possible out-of-network reimbursement. Many patients receive partial reimbursement this way even when their plan does not directly pay for in-network vision therapy.</p>
    <p><strong>FSA and HSA funds</strong> cover vision therapy sessions, the initial evaluation, and prescribed optical aids. These funds are accepted at our office and do not require prior authorization from your insurer.</p>
    <p>If cost is a barrier, ask our office about payment arrangements. We are committed to making vision care accessible and will work with families to find a workable solution.</p>
  </div>

  <h2 class="section-title">Frequently asked questions about vision therapy coverage</h2>
  <section aria-label="Insurance FAQs" style="margin-top:1rem;">${faqItems}</section>

  <div class="cta-box">
    <h2>We'll help you check your benefits</h2>
    <p>Call our Inwood, NY office and our team will help you understand your coverage options before your first appointment. We have experience navigating medical insurance billing for vision therapy and low vision care.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Contact Our Office</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

router.get("/vision-therapy-insurance", (_req, res) => {
  const html = ssrShell({
    title: "Does Insurance Cover Vision Therapy? | Advanced Vision Long Island",
    description:
      "A plain-language guide to vision therapy insurance coverage in New York. Learn which medical plans may cover treatment, what to ask your insurer, how CBVH helps low vision patients, and how FSA/HSA funds work.",
    canonical: "https://AdvancedVisionLI.com/vision-therapy-insurance/",
    schemaJsons: [faqSchema, pageSchema],
    bodyHtml: buildBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy Insurance", url: `${SITE_URL}/vision-therapy-insurance/` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(html);
});

export default router;
