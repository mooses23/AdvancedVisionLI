import { Router } from "express";
import { ssrShell, escapeHtml, CONTACT_URL } from "../lib/ssrShell";

const router = Router();

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function conditionBreadcrumb(name: string, slug: string): string {
  return `
<nav aria-label="Breadcrumb" style="font-size:0.82rem; color:var(--text-muted); margin-bottom:2rem;">
  <a href="https://AdvancedVisionLI.com/">Home</a>
  <span aria-hidden="true" style="margin:0 0.4rem;">›</span>
  <a href="/vision-therapy/">Vision Therapy</a>
  <span aria-hidden="true" style="margin:0 0.4rem;">›</span>
  <span aria-current="page">${escapeHtml(name)}</span>
</nav>`;
}

function conditionCtaBox(): string {
  return `
<div class="cta-box">
  <h2>Ready to take the next step?</h2>
  <p>Schedule a comprehensive binocular vision evaluation at our Inwood, NY practice. We'll identify whether vision therapy is right for you or your child and walk you through every step of the process.</p>
  <a href="${CONTACT_URL}" class="cta-btn">Schedule a Consultation</a>
  <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-3937</a></span>
</div>
<div style="margin-top:1.5rem; text-align:center;">
  <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.6rem;">Meet our care team:</p>
  <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:0.75rem;">
    <a href="/dr-marcie-stein/" class="related-link">Dr. Marcie Evans Stein — Vision Therapy</a>
    <a href="/dr-esther-moller/" class="related-link">Dr. Esther Moller — Low Vision Care</a>
  </div>
</div>`;
}

function conditionFaqSection(faqs: Array<{ q: string; a: string }>): string {
  const items = faqs.map(({ q, a }, i) => `
    <details class="faq-accordion" ${i === 0 ? "open" : ""}>
      <summary class="faq-summary">
        <span class="faq-summary-text">${escapeHtml(q)}</span>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="faq-body"><p>${a}</p></div>
    </details>`).join("\n");
  return `<section aria-label="Frequently Asked Questions" style="margin-top:2rem;">${items}</section>`;
}

const conditionStyles = `
<style>
  .condition-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .condition-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .condition-hero h1 { color: #fff; font-size: 2.6rem; line-height: 1.15; margin-bottom: 1rem; }
  @media (max-width:600px) { .condition-hero h1 { font-size: 1.9rem; } }
  .condition-hero .lead { color: rgba(255,255,255,0.82); font-size: 1.1rem; max-width: 680px; margin: 0 auto 1.75rem; line-height: 1.75; }
  .condition-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; transition: background 0.15s; }
  .condition-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }

  .info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
  .info-card { background: var(--card); border-radius: 16px; padding: 1.25rem 1.4rem; box-shadow: 0 1px 5px rgba(0,0,0,0.07); }
  .info-card .ic-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.4rem; }
  .info-card .ic-value { font-weight: 600; color: var(--navy); font-size: 1rem; margin-bottom: 0.3rem; }
  .info-card .ic-detail { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }

  .symptom-list { list-style: none; padding: 0; margin: 1rem 0 1.75rem; }
  .symptom-list li { display: flex; align-items: flex-start; gap: 0.65rem; padding: 0.55rem 0; border-bottom: 1px solid rgba(11,59,73,0.07); font-size: 0.95rem; color: var(--text-muted); }
  .symptom-list li:last-child { border-bottom: none; }
  .symptom-icon { flex-shrink: 0; width: 22px; height: 22px; background: rgba(20,126,147,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 1px; }

  .step-list { counter-reset: steps; list-style: none; padding: 0; margin: 1rem 0 1.75rem; }
  .step-list li { counter-increment: steps; display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.1rem; }
  .step-num { flex-shrink: 0; width: 34px; height: 34px; background: var(--teal); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
  .step-body .step-title { font-weight: 600; color: var(--navy); margin-bottom: 0.2rem; }
  .step-body .step-desc { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }

  .related-links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.5rem 0 2rem; }
  .related-link { display: inline-block; background: rgba(20,126,147,0.10); color: var(--teal); font-weight: 600; font-size: 0.85rem; padding: 0.4rem 1rem; border-radius: 100px; text-decoration: none; transition: background 0.15s; }
  .related-link:hover { background: rgba(20,126,147,0.2); text-decoration: none; }

  /* FAQ accordion (mirrors faqPage) */
  .faq-accordion { background: var(--card); border-radius: 14px; padding: 0; margin-bottom: 0.65rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
  .faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.4rem; font-weight: 600; font-size: 0.975rem; color: var(--navy); cursor: pointer; list-style: none; user-select: none; }
  .faq-summary::-webkit-details-marker { display: none; }
  .faq-summary-text { flex: 1; }
  .faq-chevron { flex-shrink: 0; color: var(--teal); transition: transform 0.2s; }
  details[open] .faq-chevron { transform: rotate(180deg); }
  .faq-summary:hover { background: rgba(20,126,147,0.04); }
  .faq-body { padding: 0 1.4rem 1.1rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; }
  .faq-body a { color: var(--teal); }
</style>`;

// ---------------------------------------------------------------------------
// 1. AMBLYOPIA
// ---------------------------------------------------------------------------

const amblyopiaFaqs = [
  {
    q: "What is the difference between amblyopia and a refractive error?",
    a: "A refractive error (nearsightedness, farsightedness, astigmatism) means the eye can't focus light correctly on the retina. Amblyopia means the brain has suppressed the weaker eye so strongly that correcting the refractive error with glasses alone is not enough — the brain needs to be retrained to process the signal from that eye. Vision therapy provides that retraining.",
  },
  {
    q: "Isn't patching the standard treatment?",
    a: "Eye patching has been used for decades, but compliance is a major problem — especially with children — and patching alone does not develop binocular vision. Modern vision therapy uses dichoptic and binocular techniques that train both eyes to work together, which research shows improves outcomes beyond patching alone.",
  },
  {
    q: "Can older children or adults treat amblyopia?",
    a: "The traditional view was that amblyopia could only be treated before age 7–9, but research has since shown that the brain retains neuroplasticity well beyond that window. Adults have successfully improved visual acuity and binocular function through vision therapy. Early treatment is still better, but it is never too late to try.",
  },
  {
    q: "How many sessions does amblyopia treatment take?",
    a: "Program length depends on the severity and the patient's age. Mild cases may resolve in 12–20 sessions; more complex cases can take 24–36 or more. Your developmental optometrist will set milestones at each progress evaluation and adjust the plan accordingly.",
  },
];

const amblyopiaConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Amblyopia (Lazy Eye)",
  alternateName: ["Lazy Eye", "Amblyopia"],
  description:
    "Amblyopia, commonly called lazy eye, is a developmental vision disorder in which one eye fails to achieve normal visual acuity even with corrective lenses, because the brain has learned to suppress input from that eye.",
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Vision Therapy for Amblyopia",
    description:
      "A program of supervised visual exercises and activities designed to stimulate and retrain the weaker eye and improve binocular vision, provided by a developmental optometrist.",
  },
  signOrSymptom: [
    { "@type": "MedicalSymptom", name: "Poor depth perception" },
    { "@type": "MedicalSymptom", name: "Difficulty catching or judging moving objects" },
    { "@type": "MedicalSymptom", name: "Squinting or closing one eye" },
    { "@type": "MedicalSymptom", name: "Head tilting" },
    { "@type": "MedicalSymptom", name: "Blurry or reduced vision in one eye" },
  ],
};

const amblyopiaPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Amblyopia (Lazy Eye) Treatment — Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/amblyopia/",
  about: { "@type": "MedicalCondition", name: "Amblyopia" },
  audience: { "@type": "Patient" },
  provider: {
    "@type": "MedicalBusiness",
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

const amblyopiaBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://AdvancedVisionLI.com/" },
    { "@type": "ListItem", position: 2, name: "Vision Therapy", item: "https://AdvancedVisionLI.com/vision-therapy/" },
    { "@type": "ListItem", position: 3, name: "Amblyopia", item: "https://AdvancedVisionLI.com/amblyopia/" },
  ],
};

const amblyopiaFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: amblyopiaFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function buildAmblyopiaBody(): string {
  return `
${conditionStyles}
<div class="condition-hero">
  <p class="eyebrow">Vision Therapy · Inwood, NY</p>
  <h1>Amblyopia (Lazy Eye)<br>Treatment on Long Island</h1>
  <p class="lead">Amblyopia is the most common cause of vision loss in children — but it is treatable at any age with the right care. Our developmental optometrists help patients build strong, lasting binocular vision.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  ${conditionBreadcrumb("Amblyopia", "amblyopia")}

  <div class="info-grid">
    <div class="info-card">
      <div class="ic-label">Also called</div>
      <div class="ic-value">Lazy Eye</div>
      <div class="ic-detail">A term that describes the reduced vision, not a weak or lazy muscle.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Prevalence</div>
      <div class="ic-value">2–3 % of the population</div>
      <div class="ic-detail">The most common vision disorder in children and the leading cause of monocular vision loss.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Treatment</div>
      <div class="ic-value">Vision Therapy</div>
      <div class="ic-detail">Supervised programs that retrain the brain-eye connection and restore functional binocular vision.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Typical program</div>
      <div class="ic-value">12–36 sessions</div>
      <div class="ic-detail">Weekly in-office visits plus home reinforcement activities between sessions.</div>
    </div>
  </div>

  <h2 class="section-title">What is amblyopia?</h2>
  <div class="prose">
    <p>Amblyopia occurs when the brain and one eye fail to develop a strong working relationship during early childhood. The brain learns to favour the stronger eye and suppresses — or ignores — the signal from the weaker one. Over time, vision in the suppressed eye falls behind even when that eye is structurally healthy. Standard glasses can correct a refractive error, but they cannot undo the suppression pattern the brain has learned.</p>
    <p>The three main causes are <strong>refractive amblyopia</strong> (a significant difference in prescription between the two eyes), <strong>strabismic amblyopia</strong> (an eye turn that sends confusing images to the brain), and <strong>deprivation amblyopia</strong> (a cataract or other obstruction that blocked clear vision during a critical window).</p>
  </div>

  <h2 class="section-title">Signs and symptoms</h2>
  <ul class="symptom-list">
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Squinting or closing one eye, especially in bright light</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Head tilting to favour the stronger eye</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Poor depth perception — misjudging distances or difficulty catching objects</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Blurry or reduced clarity in one eye (even with glasses)</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Difficulty with fine motor tasks that require good depth perception</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Visible eye turn (when strabismus is the underlying cause)</li>
  </ul>

  <h2 class="section-title">How vision therapy treats amblyopia</h2>
  <div class="prose">
    <p>Vision therapy goes beyond patching. Rather than simply forcing the weaker eye to work harder, our programs use <strong>binocular and dichoptic techniques</strong> to train both eyes to coordinate simultaneously — building the eye-brain connection that amblyopia disrupts.</p>
  </div>
  <ol class="step-list">
    <li>
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Comprehensive evaluation</div>
        <div class="step-desc">We measure visual acuity, eye alignment, depth perception, binocular function, and suppression patterns to build a precise picture of your vision.</div>
      </div>
    </li>
    <li>
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Personalised therapy plan</div>
        <div class="step-desc">Activities are selected to reduce suppression, stimulate the amblyopic eye, and build simultaneous use of both eyes. Prescription lenses and prisms may be incorporated.</div>
      </div>
    </li>
    <li>
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Weekly in-office sessions</div>
        <div class="step-desc">45–60 minute visits with a trained vision therapist, guided by your developmental optometrist, with progress evaluations at regular intervals.</div>
      </div>
    </li>
    <li>
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Home reinforcement</div>
        <div class="step-desc">Daily home activities between sessions consolidate gains and accelerate progress — typically 15–20 minutes per day.</div>
      </div>
    </li>
    <li>
      <div class="step-num">5</div>
      <div class="step-body">
        <div class="step-title">Long-term stability</div>
        <div class="step-desc">Unlike patching, which can show regression, binocular vision therapy builds durable connections that maintain improvement over time.</div>
      </div>
    </li>
  </ol>

  <h2 class="section-title">Frequently asked questions</h2>
  ${conditionFaqSection(amblyopiaFaqs)}

  <h2 class="section-title">Related conditions</h2>
  <div class="related-links">
    <a href="/strabismus/" class="related-link">Strabismus (Eye Turn)</a>
    <a href="/convergence-insufficiency/" class="related-link">Convergence Insufficiency</a>
    <a href="/accommodative-dysfunction/" class="related-link">Accommodative Dysfunction</a>
    <a href="/vision-therapy/" class="related-link">Vision Therapy Overview</a>
    <a href="/faq/" class="related-link">FAQs</a>
  </div>

  ${conditionCtaBox()}
</div>`;
}

router.get("/amblyopia", (_req, res) => {
  const html = ssrShell({
    title: "Amblyopia (Lazy Eye) Treatment | Advanced Vision Long Island — Inwood, NY",
    description:
      "Treating amblyopia (lazy eye) with vision therapy in Inwood, NY. Advanced Vision Long Island offers binocular, evidence-based programs for children and adults. Schedule a comprehensive evaluation today.",
    canonical: "https://AdvancedVisionLI.com/amblyopia/",
    schemaJsons: [amblyopiaConditionSchema, amblyopiaPageSchema, amblyopiaBreadcrumbSchema, amblyopiaFaqSchema],
    bodyHtml: buildAmblyopiaBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

// ---------------------------------------------------------------------------
// 2. CONVERGENCE INSUFFICIENCY
// ---------------------------------------------------------------------------

const ciFaqs = [
  {
    q: "How is convergence insufficiency diagnosed?",
    a: "Diagnosis requires specific clinical tests: near point of convergence (NPC), positive fusional vergence (PFV) at near, and the Convergence Insufficiency Symptom Survey (CISS). A standard eye exam rarely catches CI — it requires a binocular vision evaluation by a developmental optometrist.",
  },
  {
    q: "Is convergence insufficiency the same as ADHD or a reading problem?",
    a: "No, but it is frequently mistaken for both. CI symptoms — difficulty concentrating, losing place while reading, re-reading lines — closely mimic attention and reading disorders. A 2016 study found CI in up to 15 % of children referred for learning problems. Treating CI often leads to dramatic improvements in reading fluency and classroom performance.",
  },
  {
    q: "Do glasses or reading glasses fix convergence insufficiency?",
    a: "Standard glasses do not treat CI. Reading glasses or prisms may reduce strain temporarily, but they do not retrain the convergence system. The CITT (Convergence Insufficiency Treatment Trial) — a large NIH-funded study — found that office-based vision therapy was significantly more effective than home exercises or prism glasses alone.",
  },
  {
    q: "How long is a CI vision therapy program?",
    a: "Most patients with convergence insufficiency see significant improvement in 12–24 weekly sessions. The CITT study used a 12-week protocol with measurable results. Severity, age, and home exercise compliance all influence the timeline.",
  },
  {
    q: "Can convergence insufficiency come back after treatment?",
    a: "Relapse is possible if the convergence system is not adequately consolidated, which is why our programs include a maintenance phase. Adults under sustained near-visual demand (long work-from-home hours, heavy screen use) are more prone to recurrence — periodic check-ins help catch early changes.",
  },
];

const ciConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Convergence Insufficiency",
  alternateName: ["CI", "Convergence Disorder"],
  description:
    "Convergence insufficiency is a binocular vision disorder in which the eyes have difficulty working together for sustained near-vision tasks, causing eyestrain, double vision, headaches, and reading difficulties.",
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Office-Based Vision Therapy for Convergence Insufficiency",
    description:
      "A supervised in-office program of vergence exercises and activities that strengthen the convergence system and reduce symptoms, proven effective by the NIH Convergence Insufficiency Treatment Trial.",
  },
  signOrSymptom: [
    { "@type": "MedicalSymptom", name: "Double vision during near work" },
    { "@type": "MedicalSymptom", name: "Eyestrain or eye fatigue" },
    { "@type": "MedicalSymptom", name: "Headaches after reading" },
    { "@type": "MedicalSymptom", name: "Words appearing to move or swim on the page" },
    { "@type": "MedicalSymptom", name: "Difficulty concentrating on reading" },
  ],
};

const ciPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Convergence Insufficiency Treatment — Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/convergence-insufficiency/",
  about: { "@type": "MedicalCondition", name: "Convergence Insufficiency" },
  audience: { "@type": "Patient" },
  provider: {
    "@type": "MedicalBusiness",
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

const ciBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://AdvancedVisionLI.com/" },
    { "@type": "ListItem", position: 2, name: "Vision Therapy", item: "https://AdvancedVisionLI.com/vision-therapy/" },
    { "@type": "ListItem", position: 3, name: "Convergence Insufficiency", item: "https://AdvancedVisionLI.com/convergence-insufficiency/" },
  ],
};

const ciFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ciFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function buildCiBody(): string {
  return `
${conditionStyles}
<div class="condition-hero">
  <p class="eyebrow">Vision Therapy · Inwood, NY</p>
  <h1>Convergence Insufficiency<br>Specialist on Long Island</h1>
  <p class="lead">CI is one of the most under-diagnosed causes of reading struggles, headaches, and screen fatigue in children and adults. Our evidence-based vision therapy program is proven to work.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  ${conditionBreadcrumb("Convergence Insufficiency", "convergence-insufficiency")}

  <div class="info-grid">
    <div class="info-card">
      <div class="ic-label">Prevalence</div>
      <div class="ic-value">~5 % of the population</div>
      <div class="ic-detail">Up to 15 % among children referred for reading and attention problems.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Gold-standard treatment</div>
      <div class="ic-value">Office-Based Vision Therapy</div>
      <div class="ic-detail">Proven superior in the NIH-funded Convergence Insufficiency Treatment Trial (CITT).</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Typical program</div>
      <div class="ic-value">12–24 sessions</div>
      <div class="ic-detail">Weekly in-office visits with home reinforcement between sessions.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Who it affects</div>
      <div class="ic-value">All ages</div>
      <div class="ic-detail">Common in school-age children; also prevalent in adults with heavy near-vision demand.</div>
    </div>
  </div>

  <h2 class="section-title">What is convergence insufficiency?</h2>
  <div class="prose">
    <p>When you read or work at a screen, your eyes must turn inward (converge) to maintain a single, clear image. Convergence insufficiency (CI) is a condition where the convergence system is weak or inefficient — the eyes struggle to sustain that inward turn, causing them to drift outward. The result is a constant, exhausting effort to keep print from doubling or blurring.</p>
    <p>Because CI shows up as difficulty reading and concentrating, not as an obvious eye turn, it is routinely missed during standard vision screenings and pediatric eye exams. Children with CI are frequently misdiagnosed with <strong>ADHD, dyslexia, or a learning disability</strong> — when the primary problem is a treatable vision disorder.</p>
  </div>

  <h2 class="section-title">Common symptoms</h2>
  <ul class="symptom-list">
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Words that blur, double, or seem to move on the page</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Headaches or eye fatigue during or after reading</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Re-reading the same line or losing place frequently</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Difficulty concentrating on near tasks after a short time</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Closing or covering one eye to read more comfortably</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Digital eye strain and screen fatigue disproportionate to screen time</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Avoidance of reading, homework, or any sustained near work</li>
  </ul>

  <h2 class="section-title">How vision therapy treats CI</h2>
  <div class="prose">
    <p>The NIH-funded <strong>Convergence Insufficiency Treatment Trial (CITT)</strong> found that office-based vision therapy was significantly more effective than pencil push-ups, home exercises, or prism glasses for treating convergence insufficiency. Our program follows an evidence-based protocol:</p>
  </div>
  <ol class="step-list">
    <li>
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Binocular vision evaluation</div>
        <div class="step-desc">We measure near point of convergence, fusional vergence ranges, and symptom severity using validated clinical tools, including the CISS questionnaire.</div>
      </div>
    </li>
    <li>
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Vergence training</div>
        <div class="step-desc">Structured activities — including Brock string, vectograms, and computer-based binocular vision exercises — build convergence amplitude and stamina progressively.</div>
      </div>
    </li>
    <li>
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Antisuppression work</div>
        <div class="step-desc">Many CI patients suppress one eye to avoid double vision. Antisuppression techniques restore simultaneous binocular input, making convergence more stable.</div>
      </div>
    </li>
    <li>
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Automaticity and stamina</div>
        <div class="step-desc">The final phase transitions from deliberate effort to automatic, effortless convergence — so reading and screen work become comfortable and sustainable.</div>
      </div>
    </li>
  </ol>

  <h2 class="section-title">Frequently asked questions</h2>
  ${conditionFaqSection(ciFaqs)}

  <h2 class="section-title">Related conditions</h2>
  <div class="related-links">
    <a href="/amblyopia/" class="related-link">Amblyopia (Lazy Eye)</a>
    <a href="/strabismus/" class="related-link">Strabismus (Eye Turn)</a>
    <a href="/accommodative-dysfunction/" class="related-link">Accommodative Dysfunction</a>
    <a href="/eye-tracking-disorder/" class="related-link">Eye Tracking Disorder</a>
    <a href="/vision-therapy/" class="related-link">Vision Therapy Overview</a>
    <a href="/faq/" class="related-link">FAQs</a>
  </div>

  ${conditionCtaBox()}
</div>`;
}

router.get("/convergence-insufficiency", (_req, res) => {
  const html = ssrShell({
    title: "Convergence Insufficiency Treatment | Advanced Vision Long Island — Inwood, NY",
    description:
      "Convergence insufficiency specialist in Inwood, NY. Evidence-based vision therapy proven by the NIH CITT study. Treating children and adults with reading difficulties, headaches, and screen fatigue caused by CI.",
    canonical: "https://AdvancedVisionLI.com/convergence-insufficiency/",
    schemaJsons: [ciConditionSchema, ciPageSchema, ciBreadcrumbSchema, ciFaqSchema],
    bodyHtml: buildCiBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

// ---------------------------------------------------------------------------
// 3. STRABISMUS
// ---------------------------------------------------------------------------

const strabismusFaqs = [
  {
    q: "Is surgery the only option for strabismus?",
    a: "No. Surgery addresses the cosmetic appearance of the eye turn by adjusting the length of the extraocular muscles, but it does not retrain the brain to use both eyes together. Many patients see the eye drift back after surgery. Vision therapy, sometimes combined with surgery when needed, builds the binocular function that makes the correction durable.",
  },
  {
    q: "Can strabismus be treated without surgery?",
    a: "Yes — especially for intermittent (part-time) strabismus and for cases where the primary goal is binocular function rather than cosmesis. Our developmental optometrists will evaluate whether vision therapy alone, or in combination with surgery or prisms, is the right approach for your specific presentation.",
  },
  {
    q: "What types of strabismus respond best to vision therapy?",
    a: "Intermittent exotropia (outward drift), convergence insufficiency-type exotropia, and small-angle esotropia respond well to vision therapy. Large-angle constant strabismus may require surgery first, followed by vision therapy to consolidate binocular function. Your evaluation will clarify which pathway is appropriate.",
  },
  {
    q: "Does treating strabismus also treat amblyopia?",
    a: "The two conditions often co-exist. Strabismus frequently causes amblyopia in the turned eye because the brain suppresses that eye to prevent double vision. A comprehensive treatment plan addresses both: vision therapy to restore eye alignment and binocular function, with amblyopia treatment to improve acuity in the weaker eye simultaneously.",
  },
];

const strabismusConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Strabismus",
  alternateName: ["Eye Turn", "Crossed Eyes", "Wall Eye", "Exotropia", "Esotropia"],
  description:
    "Strabismus is a condition in which the eyes do not align properly. One eye may turn inward (esotropia), outward (exotropia), upward (hypertropia), or downward (hypotropia), either constantly or intermittently.",
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Vision Therapy for Strabismus",
    description:
      "A structured program of activities designed to retrain the brain to use both eyes together, reduce suppression, and develop stable binocular vision — often in conjunction with prisms or surgery when indicated.",
  },
  signOrSymptom: [
    { "@type": "MedicalSymptom", name: "Visible eye turn (one eye deviates from straight-ahead gaze)" },
    { "@type": "MedicalSymptom", name: "Double vision" },
    { "@type": "MedicalSymptom", name: "Head tilting or turning to compensate" },
    { "@type": "MedicalSymptom", name: "Closing one eye in bright light or when concentrating" },
    { "@type": "MedicalSymptom", name: "Poor depth perception" },
  ],
};

const strabismusPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Strabismus (Eye Turn) Treatment — Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/strabismus/",
  about: { "@type": "MedicalCondition", name: "Strabismus" },
  audience: { "@type": "Patient" },
  provider: {
    "@type": "MedicalBusiness",
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

const strabismusBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://AdvancedVisionLI.com/" },
    { "@type": "ListItem", position: 2, name: "Vision Therapy", item: "https://AdvancedVisionLI.com/vision-therapy/" },
    { "@type": "ListItem", position: 3, name: "Strabismus", item: "https://AdvancedVisionLI.com/strabismus/" },
  ],
};

const strabismusFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: strabismusFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function buildStrabismusBody(): string {
  return `
${conditionStyles}
<div class="condition-hero">
  <p class="eyebrow">Vision Therapy · Inwood, NY</p>
  <h1>Strabismus (Eye Turn)<br>Treatment on Long Island</h1>
  <p class="lead">Strabismus is more than a cosmetic concern — it disrupts depth perception, reading, and the brain's ability to use both eyes together. Vision therapy rebuilds that connection from the ground up.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  ${conditionBreadcrumb("Strabismus", "strabismus")}

  <div class="info-grid">
    <div class="info-card">
      <div class="ic-label">Also called</div>
      <div class="ic-value">Crossed / Wall Eye</div>
      <div class="ic-detail">Esotropia (inward turn), exotropia (outward), hypertropia (upward), hypotropia (downward).</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Prevalence</div>
      <div class="ic-value">~4 % of the population</div>
      <div class="ic-detail">Affects children and adults; often coexists with amblyopia.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Treatment</div>
      <div class="ic-value">Vision Therapy ± Surgery</div>
      <div class="ic-detail">Surgery corrects alignment; vision therapy builds lasting binocular function.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Typical program</div>
      <div class="ic-value">24–48 sessions</div>
      <div class="ic-detail">Depends on angle, type (constant vs. intermittent), and prior treatment history.</div>
    </div>
  </div>

  <h2 class="section-title">What is strabismus?</h2>
  <div class="prose">
    <p>In strabismus, one or both eyes point in a different direction from their intended target. The misalignment can be constant or intermittent, and it can alternate between eyes. Because the brain receives two conflicting images, it typically responds by suppressing the turned eye — which, over time, can lead to amblyopia (lazy eye) in that eye.</p>
    <p>Strabismus is not simply a muscle problem. While the extraocular muscles control where the eye points, it is the brain that coordinates their movement. This is why surgery — which physically adjusts the muscle — does not automatically restore binocular vision. Vision therapy addresses the neural component that surgery cannot.</p>
  </div>

  <h2 class="section-title">Signs and symptoms</h2>
  <ul class="symptom-list">
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Visible eye turn — one eye drifts inward, outward, up, or down</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Double vision (may be constant or only under fatigue or stress)</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Head tilting or turning to achieve a clearer image</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Squinting or closing one eye, especially outdoors</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Reduced or absent depth perception</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Poor reading performance when amblyopia accompanies the turn</li>
  </ul>

  <h2 class="section-title">Vision therapy approach</h2>
  <div class="prose">
    <p>Our strabismus programs are built around re-establishing <strong>binocular vision</strong> — the ability to use both eyes simultaneously to perceive a single, three-dimensional image. This is a neurological skill that requires training, not just a mechanical correction.</p>
  </div>
  <ol class="step-list">
    <li>
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Full binocular vision evaluation</div>
        <div class="step-desc">We measure the angle of deviation, eye dominance, suppression depth, stereopsis (depth perception), and accommodative function to guide the treatment plan.</div>
      </div>
    </li>
    <li>
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Antisuppression and sensory fusion</div>
        <div class="step-desc">We train the brain to accept and integrate input from the turned eye, reducing suppression that leads to amblyopia and monocular visual function.</div>
      </div>
    </li>
    <li>
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Motor fusion and vergence control</div>
        <div class="step-desc">Activities develop precise motor commands to align the eyes, expand the range of comfortable binocular vision, and reduce the frequency and angle of the deviation.</div>
      </div>
    </li>
    <li>
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Stereopsis and depth perception</div>
        <div class="step-desc">As alignment and fusion stabilise, we develop stereoscopic depth perception — the full three-dimensional visual experience that strabismus suppresses.</div>
      </div>
    </li>
  </ol>

  <h2 class="section-title">Frequently asked questions</h2>
  ${conditionFaqSection(strabismusFaqs)}

  <h2 class="section-title">Related conditions</h2>
  <div class="related-links">
    <a href="/amblyopia/" class="related-link">Amblyopia (Lazy Eye)</a>
    <a href="/convergence-insufficiency/" class="related-link">Convergence Insufficiency</a>
    <a href="/accommodative-dysfunction/" class="related-link">Accommodative Dysfunction</a>
    <a href="/vision-therapy/" class="related-link">Vision Therapy Overview</a>
    <a href="/faq/" class="related-link">FAQs</a>
  </div>

  ${conditionCtaBox()}
</div>`;
}

router.get("/strabismus", (_req, res) => {
  const html = ssrShell({
    title: "Strabismus (Eye Turn) Treatment | Advanced Vision Long Island — Inwood, NY",
    description:
      "Strabismus specialist in Inwood, NY. Vision therapy to rebuild binocular function and depth perception after eye turns — for children and adults. Schedule a comprehensive evaluation at Advanced Vision Long Island.",
    canonical: "https://AdvancedVisionLI.com/strabismus/",
    schemaJsons: [strabismusConditionSchema, strabismusPageSchema, strabismusBreadcrumbSchema, strabismusFaqSchema],
    bodyHtml: buildStrabismusBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

// ---------------------------------------------------------------------------
// 4. ACCOMMODATIVE DYSFUNCTION
// ---------------------------------------------------------------------------

const accommFaqs = [
  {
    q: "Is accommodative dysfunction the same as needing reading glasses?",
    a: "Not exactly. Age-related reading glasses (presbyopia) compensate for a natural loss of lens flexibility after age 40. Accommodative dysfunction in children and young adults is a functional problem — the focusing system works but is slow, inaccurate, or fatiguing — and can be retrained through vision therapy.",
  },
  {
    q: "What is accommodative infacility?",
    a: "Accommodative infacility is a specific type of accommodative dysfunction where the focusing system is too slow to switch between near and far targets efficiently. Children with infacility struggle to copy from the board, shift focus during reading, or follow fast-moving text — often leading to headaches and avoidance behaviors.",
  },
  {
    q: "How does vision therapy improve focusing?",
    a: "Lens and prism flippers, stereoscope activities, and computer-based programs are used to exercise the ciliary muscle and the neural pathways controlling accommodation. The goal is to make the focusing response faster, more accurate, and sustainable over long working periods.",
  },
];

const accommConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Accommodative Dysfunction",
  alternateName: ["Focusing Disorder", "Accommodative Infacility", "Accommodative Insufficiency", "Accommodative Excess"],
  description:
    "Accommodative dysfunction is a group of focusing disorders in which the eye's ability to change focus (accommodate) between near and far targets is imprecise, slow, or fatiguing, causing symptoms during near work and transitions between distances.",
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Vision Therapy for Accommodative Dysfunction",
    description:
      "Lens flip and vergence exercises that train the ciliary muscle and neural accommodative reflex to respond accurately and efficiently for sustained near work and distance transitions.",
  },
};

const accommPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Accommodative Dysfunction Treatment — Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/accommodative-dysfunction/",
  about: { "@type": "MedicalCondition", name: "Accommodative Dysfunction" },
  audience: { "@type": "Patient" },
  provider: {
    "@type": "MedicalBusiness",
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

const accommBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://AdvancedVisionLI.com/" },
    { "@type": "ListItem", position: 2, name: "Vision Therapy", item: "https://AdvancedVisionLI.com/vision-therapy/" },
    { "@type": "ListItem", position: 3, name: "Accommodative Dysfunction", item: "https://AdvancedVisionLI.com/accommodative-dysfunction/" },
  ],
};

const accommFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: accommFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function buildAccommBody(): string {
  return `
${conditionStyles}
<div class="condition-hero">
  <p class="eyebrow">Vision Therapy · Inwood, NY</p>
  <h1>Accommodative Dysfunction<br>Treatment on Long Island</h1>
  <p class="lead">When the eyes struggle to shift focus quickly and accurately — from board to book, from desk to screen — every school day becomes exhausting. Vision therapy retrains the focusing system for lasting comfort.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  ${conditionBreadcrumb("Accommodative Dysfunction", "accommodative-dysfunction")}

  <div class="info-grid">
    <div class="info-card">
      <div class="ic-label">Also called</div>
      <div class="ic-value">Focusing Disorder</div>
      <div class="ic-detail">Types include insufficiency (can't sustain near focus), excess (over-converges), and infacility (slow to shift).</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Who it affects</div>
      <div class="ic-value">School-age children & adults</div>
      <div class="ic-detail">Common in students and professionals with high near-vision demand; often presents after COVID or concussion.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Treatment</div>
      <div class="ic-value">Vision Therapy</div>
      <div class="ic-detail">Lens flipper exercises, vergence training, and accommodative facility activities.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Typical program</div>
      <div class="ic-value">12–20 sessions</div>
      <div class="ic-detail">Often resolves faster than vergence disorders; progress is measurable within weeks.</div>
    </div>
  </div>

  <h2 class="section-title">What is accommodative dysfunction?</h2>
  <div class="prose">
    <p>Accommodation is the eye's ability to change the power of its lens to keep objects in focus at different distances. When you look up from a book to the whiteboard, your eyes adjust in milliseconds. Accommodative dysfunction means that adjustment is slow, inaccurate, or unsustainable — so every near-to-far or far-to-near shift requires extra effort, causing fatigue and blurriness.</p>
    <p>There are three main types: <strong>accommodative insufficiency</strong> (cannot maintain focus at near), <strong>accommodative excess</strong> (over-focuses and causes spasm), and <strong>accommodative infacility</strong> (too slow to shift focus). All three respond well to vision therapy.</p>
  </div>

  <h2 class="section-title">Common symptoms</h2>
  <ul class="symptom-list">
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Blurry vision that clears after a moment of blinking</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Difficulty copying from the board — blur when looking up and back down</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Headaches centered around the forehead or eyes, especially after school</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Eye fatigue or aching after 20–30 minutes of near work</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Reluctance to read or avoidance of sustained near tasks</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Slow reading pace despite adequate decoding ability</li>
  </ul>

  <h2 class="section-title">Vision therapy for accommodative dysfunction</h2>
  <div class="prose">
    <p>Vision therapy provides structured, progressive exercise for the focusing system. Just as physical therapy rehabilitates a weak or injured muscle, accommodative therapy exercises the ciliary muscle and the neural pathways that control lens power.</p>
  </div>
  <ol class="step-list">
    <li>
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Accommodative evaluation</div>
        <div class="step-desc">We measure amplitude of accommodation, accommodative facility (speed), lag, and spasm patterns to pinpoint your specific type and severity.</div>
      </div>
    </li>
    <li>
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Lens flipper therapy</div>
        <div class="step-desc">Plus and minus lens flippers demand rapid, accurate focus changes — building speed and accuracy in the accommodative reflex over successive sessions.</div>
      </div>
    </li>
    <li>
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Vergence-accommodation integration</div>
        <div class="step-desc">Accommodation and convergence are neurologically linked. We train both systems together so focusing and eye teaming remain coordinated under real-world demand.</div>
      </div>
    </li>
    <li>
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Stamina and transfer to daily life</div>
        <div class="step-desc">Late-stage activities replicate classroom and workplace demands — long-duration near work, rapid distance switching — to build the endurance needed for full-day comfort.</div>
      </div>
    </li>
  </ol>

  <h2 class="section-title">Frequently asked questions</h2>
  ${conditionFaqSection(accommFaqs)}

  <h2 class="section-title">Related conditions</h2>
  <div class="related-links">
    <a href="/convergence-insufficiency/" class="related-link">Convergence Insufficiency</a>
    <a href="/eye-tracking-disorder/" class="related-link">Eye Tracking Disorder</a>
    <a href="/amblyopia/" class="related-link">Amblyopia (Lazy Eye)</a>
    <a href="/vision-therapy/" class="related-link">Vision Therapy Overview</a>
    <a href="/faq/" class="related-link">FAQs</a>
  </div>

  ${conditionCtaBox()}
</div>`;
}

router.get("/accommodative-dysfunction", (_req, res) => {
  const html = ssrShell({
    title: "Accommodative Dysfunction Treatment | Advanced Vision Long Island — Inwood, NY",
    description:
      "Treating accommodative dysfunction (focusing disorders) with vision therapy in Inwood, NY. Help for children and adults with blurry near vision, focus fatigue, and difficulty copying from the board.",
    canonical: "https://AdvancedVisionLI.com/accommodative-dysfunction/",
    schemaJsons: [accommConditionSchema, accommPageSchema, accommBreadcrumbSchema, accommFaqSchema],
    bodyHtml: buildAccommBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

// ---------------------------------------------------------------------------
// 5. EYE TRACKING DISORDER
// ---------------------------------------------------------------------------

const trackingFaqs = [
  {
    q: "Is eye tracking disorder the same as dyslexia?",
    a: "No — but they share many surface symptoms, and children with oculomotor dysfunction are often misidentified as dyslexic. True dyslexia is a phonological processing disorder. Eye tracking disorder is a visual-motor problem that can make reading equally difficult but responds to vision therapy rather than reading instruction alone. A binocular vision evaluation can differentiate them.",
  },
  {
    q: "What does 'poor tracking' look like in a classroom?",
    a: "A child with tracking problems may frequently lose their place while reading, use a finger to track across the page, skip words or whole lines, read slowly despite phonics knowledge, struggle to copy from the board accurately, and have inconsistent performance across subjects depending on how much near reading is required.",
  },
  {
    q: "Can tracking problems be improved with practice?",
    a: "Yes — with targeted, supervised practice. Generic reading exercises do not directly train the oculomotor system. Vision therapy uses specific saccadic and pursuit training activities that progressively challenge and improve the precision and speed of eye movements.",
  },
];

const trackingConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Eye Tracking Disorder",
  alternateName: ["Oculomotor Dysfunction", "Saccadic Dysfunction", "Pursuit Deficiency", "Tracking Problems"],
  description:
    "Eye tracking disorder (oculomotor dysfunction) is a condition in which the precise, coordinated eye movements required for reading — saccades to jump between words and pursuit movements to follow a moving target — are inaccurate or fatiguing, disrupting reading fluency and comprehension.",
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Vision Therapy for Oculomotor Dysfunction",
    description:
      "Structured saccadic and pursuit training activities that improve the accuracy, speed, and endurance of reading eye movements.",
  },
};

const trackingPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Eye Tracking Disorder Treatment — Advanced Vision Long Island",
  url: "https://AdvancedVisionLI.com/eye-tracking-disorder/",
  about: { "@type": "MedicalCondition", name: "Eye Tracking Disorder" },
  audience: { "@type": "Patient" },
  provider: {
    "@type": "MedicalBusiness",
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

const trackingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://AdvancedVisionLI.com/" },
    { "@type": "ListItem", position: 2, name: "Vision Therapy", item: "https://AdvancedVisionLI.com/vision-therapy/" },
    { "@type": "ListItem", position: 3, name: "Eye Tracking Disorder", item: "https://AdvancedVisionLI.com/eye-tracking-disorder/" },
  ],
};

const trackingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trackingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function buildTrackingBody(): string {
  return `
${conditionStyles}
<div class="condition-hero">
  <p class="eyebrow">Vision Therapy · Inwood, NY</p>
  <h1>Eye Tracking Disorder<br>Treatment on Long Island</h1>
  <p class="lead">When a child loses their place, skips words, or reads with a finger — it is not laziness or dyslexia. It is often an eye tracking problem. Vision therapy trains the oculomotor system for accurate, effortless reading.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  ${conditionBreadcrumb("Eye Tracking Disorder", "eye-tracking-disorder")}

  <div class="info-grid">
    <div class="info-card">
      <div class="ic-label">Also called</div>
      <div class="ic-value">Oculomotor Dysfunction</div>
      <div class="ic-detail">Covers saccadic (word-to-word) and pursuit (following moving targets) deficits.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Who it affects</div>
      <div class="ic-value">School-age children primarily</div>
      <div class="ic-detail">Frequently identified during reading assessments; also affects athletes and concussion patients.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Often mistaken for</div>
      <div class="ic-value">Dyslexia / ADHD</div>
      <div class="ic-detail">Symptoms overlap significantly; binocular vision evaluation differentiates them.</div>
    </div>
    <div class="info-card">
      <div class="ic-label">Typical program</div>
      <div class="ic-value">12–24 sessions</div>
      <div class="ic-detail">Saccadic and pursuit training with progressive difficulty; results are measurable with standardized tests.</div>
    </div>
  </div>

  <h2 class="section-title">What is an eye tracking disorder?</h2>
  <div class="prose">
    <p>Reading requires two distinct types of eye movement: <strong>saccades</strong> — rapid jumps from one word to the next — and <strong>pursuits</strong> — smooth movements that follow a moving object. Both must be precise, well-coordinated between the two eyes, and sustainable over the length of a reading session.</p>
    <p>In eye tracking disorder, saccades are over- or under-shooting their targets, pursuits are jerky rather than smooth, or both systems fatigue quickly. The result: the child's eyes land in the wrong place on the page, losing the word they were aimed at. The brain compensates by using the finger as a guide, re-reading lines, or — when compensation fails — simply avoiding reading altogether.</p>
  </div>

  <h2 class="section-title">Signs and symptoms</h2>
  <ul class="symptom-list">
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Frequently loses place while reading — skips words or whole lines</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Uses a finger or pencil to track text</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Re-reads the same line multiple times without realising it</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Moves head rather than eyes when reading across a line</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Inconsistent copying from board — slow, with frequent errors</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Reads slowly relative to phonics and comprehension ability</li>
    <li><span class="symptom-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Difficulty following a ball in sports (pursuit deficits)</li>
  </ul>

  <h2 class="section-title">Vision therapy for eye tracking</h2>
  <ol class="step-list">
    <li>
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Oculomotor evaluation</div>
        <div class="step-desc">Standardized tests — including NSUCO oculomotor testing and DEM (Developmental Eye Movement) — objectively measure saccadic accuracy, pursuit quality, and fixation stability.</div>
      </div>
    </li>
    <li>
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Saccadic training</div>
        <div class="step-desc">Hart Chart drills, Saccadic Fixator activities, and computer-based saccade programs train the eyes to jump accurately and efficiently between targets of increasing complexity.</div>
      </div>
    </li>
    <li>
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Pursuit training</div>
        <div class="step-desc">Marsden ball, rotator, and computer pursuit tasks progressively develop smooth, accurate following movements needed for reading and sports performance.</div>
      </div>
    </li>
    <li>
      <div class="step-num">4</div>
      <div class="step-body">
        <div class="step-title">Integration with reading</div>
        <div class="step-desc">Visual-motor gains are transferred to actual text through speed-reading activities, paragraph tracking, and timed oral reading, ensuring the skill generalises to the classroom.</div>
      </div>
    </li>
  </ol>

  <h2 class="section-title">Frequently asked questions</h2>
  ${conditionFaqSection(trackingFaqs)}

  <h2 class="section-title">Related conditions</h2>
  <div class="related-links">
    <a href="/convergence-insufficiency/" class="related-link">Convergence Insufficiency</a>
    <a href="/accommodative-dysfunction/" class="related-link">Accommodative Dysfunction</a>
    <a href="/amblyopia/" class="related-link">Amblyopia (Lazy Eye)</a>
    <a href="/vision-therapy/" class="related-link">Vision Therapy Overview</a>
    <a href="/faq/" class="related-link">FAQs</a>
  </div>

  ${conditionCtaBox()}
</div>`;
}

router.get("/eye-tracking-disorder", (_req, res) => {
  const html = ssrShell({
    title: "Eye Tracking Disorder Treatment | Advanced Vision Long Island — Inwood, NY",
    description:
      "Treating eye tracking disorders (oculomotor dysfunction) in Inwood, NY. Vision therapy for children who lose their place while reading, skip words, or struggle with reading fluency. Advanced Vision Long Island.",
    canonical: "https://AdvancedVisionLI.com/eye-tracking-disorder/",
    schemaJsons: [trackingConditionSchema, trackingPageSchema, trackingBreadcrumbSchema, trackingFaqSchema],
    bodyHtml: buildTrackingBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

export default router;
