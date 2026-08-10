import { Router } from "express";
import { ssrShell, escapeHtml } from "../lib/ssrShell";

const router = Router();

interface FaqPair {
  q: string;
  a: string;
}

const FAQS: FaqPair[] = [
  {
    q: "What is vision therapy and how does it work?",
    a: "Vision therapy is a structured program of activities — prescribed and supervised by a developmental optometrist — designed to improve the way the brain and eyes work together. Sessions typically involve lenses, prisms, and specialized exercises that train visual skills such as eye teaming, focusing, tracking, and visual processing. Over time, the brain learns more efficient visual patterns, which can significantly reduce symptoms and improve academic and athletic performance.",
  },
  {
    q: "What conditions does vision therapy treat?",
    a: "Vision therapy is effective for a wide range of functional vision disorders, including <a href='/convergence-insufficiency'>convergence insufficiency</a>, <a href='/amblyopia'>amblyopia (lazy eye)</a>, <a href='/strabismus'>strabismus (eye turns)</a>, <a href='/accommodative-dysfunction'>accommodative dysfunction (focusing problems)</a>, <a href='/eye-tracking-disorder'>oculomotor deficits (tracking problems)</a>, and visual perceptual delays. Many children diagnosed with reading difficulties, attention problems, or learning disabilities are found to have an underlying vision disorder that vision therapy can address. Our team at Advanced Vision Long Island performs a comprehensive evaluation to determine whether a functional vision problem is present.",
  },
  {
    q: "What are the signs my child might need vision therapy?",
    a: "Common warning signs include: skipping or re-reading lines, reversing letters beyond first grade, avoiding reading or homework, losing their place when copying from the board, complaints of double vision or headaches after reading, covering or closing one eye, and performing below their potential despite normal intelligence. Many of these signs are mistaken for ADHD or dyslexia. If you recognize several of these behaviors, a comprehensive visual perceptual evaluation can clarify whether a vision problem is contributing.",
  },
  {
    q: "What is the difference between an eye exam and a visual perceptual evaluation?",
    a: "A standard eye exam checks how clearly your child sees (visual acuity) and screens for eye health problems. A visual perceptual evaluation — the kind offered at Advanced Vision Long Island — goes much further: it assesses eye teaming, eye focusing, eye movement control, and the brain's ability to process and interpret what the eyes see. A child can pass a standard eye exam and still have significant functional vision problems that interfere with reading and learning.",
  },
  {
    q: "Can adults benefit from vision therapy?",
    a: "Yes. While vision therapy is often associated with children, adults can and do benefit — especially those with <a href='/convergence-insufficiency'>convergence insufficiency</a>, traumatic brain injury (TBI), concussion-related visual symptoms, stroke recovery, or acquired <a href='/strabismus'>strabismus</a>. The brain retains neuroplasticity throughout life, meaning visual skills can be retrained at any age. Many adult patients at our practice notice meaningful improvements in reading endurance, computer comfort, and depth perception.",
  },
  {
    q: "How long does a vision therapy program last?",
    a: "Program length varies depending on the diagnosis and severity of the vision disorder. Most patients complete a program in 12–36 weekly sessions, each lasting 45–60 minutes. Home reinforcement activities are assigned between sessions to accelerate progress. Your developmental optometrist will outline a personalized timeline at your initial consultation after reviewing evaluation results.",
  },
  {
    q: "What happens at a first consultation?",
    a: "Your first visit includes a detailed history interview and a comprehensive binocular vision assessment. The doctor examines how the eyes team together, how efficiently they focus and move, and how visual information is processed. Based on the findings, you receive a clear diagnosis and a personalized treatment plan. We walk you through every step — no ambiguity about what we found or why we're recommending it. You can <a href='/contact'>schedule your consultation online</a> or call us at <a href='tel:718-268-3937'>(718) 268-3937</a>.",
  },
  {
    q: "Is vision therapy covered by insurance?",
    a: "Coverage depends on your plan, the diagnosis, and the insurer. Medical insurance (not vision insurance) is more likely to cover vision therapy when it is medically necessary — for example, for convergence insufficiency, amblyopia, or strabismus. Our team will verify your benefits and provide the documentation needed to support a claim. We recommend calling the member services number on your insurance card before your first visit.",
  },
  {
    q: "What is low vision and who qualifies for low vision care?",
    a: "Low vision is a significant visual impairment that cannot be fully corrected with standard glasses, contact lenses, medication, or surgery. It often results from conditions such as macular degeneration, glaucoma, diabetic retinopathy, or retinitis pigmentosa. A person does not need to be legally blind to benefit from low vision care. Our <a href='/low-vision-care'>Low Vision Care</a> program evaluates your remaining functional vision and prescribes specialized optical devices — magnifiers, telescopes, filters, and electronic aids — to help you perform daily activities more independently.",
  },
  {
    q: "Is low vision care covered by NYS Commission for the Blind (CBVH)?",
    a: "Yes, in many cases. The New York State Commission for the Blind (CBVH) provides vocational and rehabilitation services for individuals who are legally blind, including funding for low vision evaluations and devices. Advanced Vision Long Island works with CBVH referrals. If you or a family member has been diagnosed with a condition that may qualify, contact CBVH at (866) 871-3000 to inquire about eligibility and then <a href='/contact'>contact our office</a> to coordinate your evaluation.",
  },
  {
    q: "Does vision therapy help with concussion or traumatic brain injury?",
    a: "Yes. Visual symptoms are among the most common and persistent complaints following concussion — including double vision, light sensitivity, difficulty reading, and balance problems. Neuro-optometric rehabilitation, a specialized form of vision therapy, directly targets these post-concussion visual deficits. Our doctors at Advanced Vision Long Island are trained in neuro-optometric care and have helped many patients recover functional vision after TBI.",
  },
  {
    q: "How do I get started?",
    a: "Call our office at <a href='tel:718-268-3937'>(718) 268-3937</a> or use the online scheduling link to book a consultation. We are located at 148c Doughty Blvd, Inwood, NY 11096. If you are unsure whether vision therapy is appropriate for your child or yourself, our team is happy to answer questions by phone before you commit to an appointment.",
  },
];

function buildFaqBody(): string {
  const accordionItems = FAQS.map(
    ({ q, a }, i) => `
    <details class="faq-accordion" ${i === 0 ? "open" : ""}>
      <summary class="faq-summary">
        <span class="faq-summary-text">${escapeHtml(q)}</span>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="faq-body">
        <p>${a}</p>
      </div>
    </details>`
  ).join("\n");

  return `
<div class="page-content">
  <p class="eyebrow">Patient Resources</p>
  <h1 class="page-title">Vision Therapy FAQs</h1>
  <p class="lead">Plain-English answers to the questions patients ask most often — from first symptoms to insurance, treatment length, and what to expect on your first visit.</p>

  <div class="cta-box" style="margin-top:0; margin-bottom:2.5rem; padding:1.75rem 2rem;">
    <p style="margin-bottom:0.5rem; font-size:1rem;">Ready to find out if vision therapy is right for you or your child?</p>
    <a href="/contact" class="cta-btn">Schedule a Consultation</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>

  <nav aria-label="Breadcrumb" style="font-size:0.82rem; color:var(--text-muted); margin-bottom:2rem;">
    <a href="https://AdvancedVisionLI.com/">Home</a>
    <span aria-hidden="true" style="margin:0 0.4rem;">›</span>
    <span aria-current="page">FAQ</span>
  </nav>

  <section aria-label="Frequently Asked Questions">
    ${accordionItems}
  </section>

  <p style="margin-top:1.5rem; font-size:0.85rem; color:var(--text-muted);">
    More information: <a href="/vision-therapy">Vision Therapy</a> &nbsp;·&nbsp; <a href="/low-vision-care">Low Vision Care</a>
  </p>

  <div class="cta-box">
    <h2>Still have questions?</h2>
    <p>Our team is happy to answer by phone — or you can book a no-pressure consultation and we'll walk through everything in person.</p>
    <a href="/contact" class="cta-btn">Schedule a Consultation</a>
    <span class="cta-phone">Call us: <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>
</div>

<style>
  /* FAQ accordion */
  .faq-accordion {
    background: var(--card);
    border-radius: 14px;
    padding: 0;
    margin-bottom: 0.65rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .faq-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.1rem 1.4rem;
    font-weight: 600;
    font-size: 0.975rem;
    color: var(--navy);
    cursor: pointer;
    list-style: none;
    user-select: none;
  }
  .faq-summary::-webkit-details-marker { display: none; }
  .faq-summary-text { flex: 1; }
  .faq-chevron {
    flex-shrink: 0;
    color: var(--teal);
    transition: transform 0.2s;
  }
  details[open] .faq-chevron {
    transform: rotate(180deg);
  }
  .faq-summary:hover { background: rgba(20,126,147,0.04); }
  .faq-body {
    padding: 0 1.4rem 1.1rem;
    color: var(--text-muted);
    font-size: 0.92rem;
    line-height: 1.7;
  }
  .faq-body a { color: var(--teal); }
</style>
`;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a.replace(/<[^>]+>/g, ""),
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://AdvancedVisionLI.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://AdvancedVisionLI.com/faq",
    },
  ],
};

router.get("/faq", (_req, res) => {
  const html = ssrShell({
    title: "Vision Therapy FAQs | Advanced Vision Long Island",
    description:
      "Answers to the most common questions about vision therapy, low vision care, insurance coverage, treatment length, and what to expect at your first consultation — Advanced Vision Long Island, Inwood NY.",
    canonical: "https://AdvancedVisionLI.com/faq",
    schemaJsons: [faqSchema, breadcrumbSchema],
    bodyHtml: buildFaqBody(),
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

// /resources → /faq (301 redirect)
router.get("/resources", (_req, res) => {
  res.redirect(301, "/faq");
});

export default router;
