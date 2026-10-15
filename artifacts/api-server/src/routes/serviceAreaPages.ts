import { Router } from "express";
import { ssrShell, escapeHtml, SITE_URL, CONTACT_URL } from "../lib/ssrShell";

const router = Router();

interface ServiceArea {
  slug: string;
  name: string;
  region: string;
  titleTag: string;
  metaDesc: string;
  h1: string;
  eyebrow: string;
  heroPara: string;
  driveTime: string;
  transitNote: string;
  accessDetail: string;
  vtAngle: string;
  lvAngle: string;
  faqs: Array<{ q: string; a: string }>;
}

const AREAS: ServiceArea[] = [
  // ---------------------------------------------------------------------------
  // FAR ROCKAWAY
  // ---------------------------------------------------------------------------
  {
    slug: "far-rockaway",
    name: "Far Rockaway",
    region: "Queens, NY",
    titleTag: "Vision Therapy Near Far Rockaway, NY | Advanced Vision Long Island",
    metaDesc:
      "Serving patients from Far Rockaway, Queens with binocular vision therapy, lazy eye treatment, convergence insufficiency care, and low vision rehabilitation. Advanced Vision Long Island is a 10-minute drive — also reachable by LIRR from Far Rockaway station.",
    h1: "Vision Therapy for Far Rockaway Families",
    eyebrow: "Serving Far Rockaway · Queens, NY",
    heroPara:
      "Advanced Vision Long Island is one of the closest developmental optometry practices to Far Rockaway. Our Inwood, NY office is a short drive over the Queens–Nassau border, and is directly accessible by LIRR from Far Rockaway station — making it one of the most convenient options for families in the Rockaways who need vision therapy or low vision care.",
    driveTime: "10–12 minutes",
    transitNote: "LIRR Far Rockaway branch — Far Rockaway station to Inwood station (~8 min)",
    accessDetail:
      "From Far Rockaway, take Rockaway Turnpike or Mott Avenue south into Inwood — approximately 10–12 minutes by car. By train, take the LIRR Far Rockaway branch from Far Rockaway station to Inwood station — about 8 minutes; our office at 148c Doughty Blvd is a short walk from the Inwood LIRR station.",
    vtAngle:
      "Far Rockaway and the broader Rockaway Peninsula have a large population of families with school-age children, a group where undiagnosed binocular vision problems frequently go undetected until they affect reading, attention, and classroom performance. Conditions like <a href="/convergence-insufficiency/" style="color:var(--teal);font-weight:600;">convergence insufficiency</a> and eye tracking disorders cause the same symptoms as ADHD and dyslexia — but they respond to vision therapy, not medication. Many children from Far Rockaway are identified as having learning difficulties before anyone has evaluated their functional vision. A comprehensive binocular vision evaluation is the next step when a child struggles in school despite passing the standard eye chart test.",
    lvAngle:
      "Far Rockaway's older adult population includes patients managing macular degeneration, glaucoma, and diabetic retinopathy — the three leading causes of low vision in adults. Dr. Esther Moller, our Certified Low Vision Specialist, conducts thorough evaluations and prescribes optical aids and adaptive strategies to help patients maintain independence. New York State CBVH services may cover evaluation and aid costs for eligible residents.",
    faqs: [
      {
        q: "Is Advanced Vision Long Island accessible from Far Rockaway without a car?",
        a: "Yes. The LIRR Far Rockaway branch runs from Far Rockaway station to Inwood station in about 8 minutes. Our office at 148c Doughty Blvd, Inwood is a short walk from the Inwood LIRR station. By car, Far Rockaway is 10–12 minutes via Rockaway Turnpike.",
      },
      {
        q: "My child failed a school vision screening in Far Rockaway — does that mean they need vision therapy?",
        a: "A failed school screening is a prompt to get a full eye exam, but it does not diagnose a binocular vision problem. Standard screenings test for refractive errors (near/farsightedness) but miss functional vision disorders — like convergence insufficiency or eye tracking problems — that most commonly affect reading and learning. A comprehensive binocular vision evaluation at our office will determine whether vision therapy is appropriate.",
      },
      {
        q: "Does insurance cover vision therapy for Far Rockaway patients?",
        a: "Coverage depends on your medical insurance plan, not your vision plan. Medical plans such as Aetna, Cigna, Emblem/GHI, and UnitedHealthcare may cover vision therapy when a qualifying diagnosis is documented. Call our office before your appointment and we will help you understand your benefits.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // HOWARD BEACH
  // ---------------------------------------------------------------------------
  {
    slug: "howard-beach",
    name: "Howard Beach",
    region: "Queens, NY",
    titleTag: "Vision Therapy Near Howard Beach, Queens | Advanced Vision Long Island",
    metaDesc:
      "Serving patients from Howard Beach, Queens with vision therapy, amblyopia treatment, convergence insufficiency care, and low vision rehabilitation. Advanced Vision Long Island is approximately 15 minutes from Howard Beach by car via Cross Bay Boulevard.",
    h1: "Vision Therapy for Howard Beach Residents",
    eyebrow: "Serving Howard Beach · Queens, NY",
    heroPara:
      "Advanced Vision Long Island serves families and adults from Howard Beach looking for developmental optometry and binocular vision care. Our Inwood, NY office is approximately 15 minutes from Howard Beach via Cross Bay Boulevard or the Belt Parkway — making it one of the most accessible specialized vision care practices for South Queens patients.",
    driveTime: "14–16 minutes",
    transitNote: "By car via Cross Bay Blvd south to Rockaway Turnpike (no direct rail service)",
    accessDetail:
      "From Howard Beach, take Cross Bay Boulevard south to Rockaway Turnpike, then continue into Inwood — approximately 14–16 minutes by car. Howard Beach does not have a direct rail connection to the Inwood LIRR station; driving is the most practical option for most patients. Street parking is available near our office at 148c Doughty Blvd.",
    vtAngle:
      "Children from Howard Beach often present to our practice after complaints of headaches during homework, avoidance of reading, or difficulty concentrating that their pediatricians and teachers have attributed to attention issues. Convergence insufficiency — a binocular vision disorder where the eyes struggle to maintain focus on near targets — causes exactly these symptoms and is reliably treatable with vision therapy. Our comprehensive binocular vision evaluation screens for convergence insufficiency, accommodative dysfunction, and eye tracking disorders before any diagnosis is assumed.",
    lvAngle:
      "For Howard Beach adults managing vision loss from macular degeneration or glaucoma, our low vision consultations focus on practical functional goals — reading, medication management, navigating familiar environments, and assessing driving timelines. Dr. Esther Moller prescribes the right optical aid for each patient's specific remaining vision and daily priorities. CBVH services are available for eligible New York State residents.",
    faqs: [
      {
        q: "How far is Advanced Vision Long Island from Howard Beach?",
        a: "By car, Howard Beach is approximately 14–16 minutes from our office at 148c Doughty Blvd, Inwood — via Cross Bay Boulevard south to Rockaway Turnpike. Howard Beach does not have a direct rail connection to Inwood; driving is the most practical option. Street parking is available near our office.",
      },
      {
        q: "Can adults get vision therapy, or is it only for children?",
        a: "Adults benefit from vision therapy for convergence insufficiency, strabismus, accommodative dysfunction, post-concussion vision changes, and other binocular vision conditions. The brain retains the ability to form new visual connections throughout life. Many adult patients from Howard Beach and the surrounding area seek treatment after years of eye strain and headaches that glasses alone never resolved.",
      },
      {
        q: "What vision therapy conditions do you treat for Howard Beach patients?",
        a: "Our vision therapy programs treat convergence insufficiency, amblyopia (lazy eye), strabismus (eye turns), accommodative dysfunction, eye tracking disorders, and post-concussion vision syndrome. Each program is individualized following a comprehensive binocular vision evaluation.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // VALLEY STREAM
  // ---------------------------------------------------------------------------
  {
    slug: "valley-stream",
    name: "Valley Stream",
    region: "Nassau County, NY",
    titleTag: "Vision Therapy Near Valley Stream, NY | Advanced Vision Long Island",
    metaDesc:
      "Serving patients from Valley Stream, Nassau County with binocular vision therapy, lazy eye treatment, convergence insufficiency care, and low vision rehabilitation. Advanced Vision Long Island is 10 minutes from Valley Stream.",
    h1: "Vision Therapy for Valley Stream Families",
    eyebrow: "Serving Valley Stream · Nassau County, NY",
    heroPara:
      "Advanced Vision Long Island is one of the most accessible developmental optometry practices for Valley Stream residents. Our Inwood, NY office is approximately 10 minutes from Valley Stream via Hook Creek Boulevard, and is within easy reach of the Valley Stream LIRR station on the Far Rockaway branch.",
    driveTime: "9–11 minutes",
    transitNote: "LIRR Far Rockaway branch — Valley Stream station to Inwood station (~8 min)",
    accessDetail:
      "From Valley Stream, take Hook Creek Boulevard south or the Southern State Parkway east to Inwood — approximately 9–11 minutes. The LIRR Far Rockaway branch runs from Valley Stream station to Inwood station in about 8 minutes; our office at 148c Doughty Blvd is a short distance from the station.",
    vtAngle:
      "Valley Stream families often encounter binocular vision therapy after a child's reading struggles go unexplained by standard evaluations. Convergence insufficiency — one of the most common and under-diagnosed vision conditions in school-age children — causes words to blur or double during reading and is frequently mistaken for dyslexia or an attention disorder. Our evidence-based vision therapy program, grounded in NIH-funded research (the Convergence Insufficiency Treatment Trial), is proven to resolve convergence insufficiency when glasses and home exercises fail. Valley Stream's academically active school environment makes early identification especially important.",
    lvAngle:
      "Valley Stream's senior population includes patients experiencing the early functional effects of macular degeneration and other age-related eye conditions. Dr. Esther Moller takes a proactive approach: seeing patients at the earliest stage of functional difficulty rather than waiting for vision loss to become severe. Early low vision rehabilitation — including appropriate magnification, lighting recommendations, and reading strategies — helps patients maintain independence significantly longer.",
    faqs: [
      {
        q: "Is there a vision therapy specialist near Valley Stream?",
        a: "Advanced Vision Long Island in Inwood, NY is approximately 10 minutes from Valley Stream. Dr. Marcie Evans Stein, OD, FABM, OVDRA, is our developmental optometrist and vision therapy specialist with over 40 years of clinical experience treating binocular vision disorders in children and adults.",
      },
      {
        q: "What is the LIRR route from Valley Stream to your office?",
        a: "Take the LIRR Far Rockaway branch from Valley Stream station to Inwood station — approximately 8 minutes. Our office at 148c Doughty Blvd, Inwood is a short walk or taxi from the Inwood LIRR station.",
      },
      {
        q: "My child passed their school eye exam but still struggles to read. Could it be a vision problem?",
        a: "School eye exams test distance acuity — whether a child can see the 20/20 line. They do not test how the eyes work together for near tasks like reading. A child can pass 20/20 and still have significant convergence insufficiency, accommodative dysfunction, or eye tracking problems that make sustained reading exhausting. A comprehensive binocular vision evaluation will identify these issues.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // FIVE TOWNS
  // ---------------------------------------------------------------------------
  {
    slug: "five-towns",
    name: "Five Towns",
    region: "Nassau County, NY",
    titleTag: "Vision Therapy Near Five Towns, NY | Advanced Vision Long Island",
    metaDesc:
      "Serving patients from the Five Towns — Cedarhurst, Lawrence, Woodmere, Hewlett, and Lynbrook — with binocular vision therapy and low vision rehabilitation. Advanced Vision Long Island is 8–12 minutes away, served by four LIRR stops.",
    h1: "Vision Therapy for Five Towns Patients",
    eyebrow: "Serving Cedarhurst · Lawrence · Woodmere · Hewlett · Lynbrook",
    heroPara:
      "Advanced Vision Long Island is the closest developmental optometry practice to the Five Towns communities of Cedarhurst, Lawrence, Woodmere, Hewlett, and Lynbrook. Our Inwood office sits at the south end of Nassau County — just 8–12 minutes from most Five Towns addresses — and is served by four LIRR stops on the Far Rockaway branch.",
    driveTime: "8–12 minutes (varies by town)",
    transitNote: "LIRR Far Rockaway branch — Cedarhurst, Lawrence, Woodmere, and Hewlett stations all reach Inwood",
    accessDetail:
      "Cedarhurst is approximately 8 minutes, Lawrence 9 minutes, Woodmere 10 minutes, Hewlett 11 minutes, and Lynbrook 12 minutes — all via Central Avenue or Peninsula Boulevard south. The LIRR Far Rockaway branch stops at Cedarhurst, Lawrence, Woodmere, and Hewlett stations, each 5–12 minutes to Inwood station.",
    vtAngle:
      "The Five Towns are home to academically active families whose children face significant near-vision demands from an early age. Binocular vision conditions like convergence insufficiency and accommodative dysfunction are particularly impactful in this environment: a child who experiences double vision, headaches, or blurring during reading cannot sustain the focus that intensive academic programs require. A comprehensive evaluation and structured vision therapy program can resolve these issues before they affect long-term academic outcomes — often in as few as 12–24 weekly sessions.",
    lvAngle:
      "The Five Towns senior community has a significant proportion of patients managing macular degeneration, often identified in its early and intermediate stages. Dr. Esther Moller takes a proactive approach to low vision care — seeing patients at the first sign of functional difficulty rather than waiting until vision loss becomes severe. Early low vision rehabilitation, including the right magnification, lighting adjustments, and reading strategies, helps Five Towns patients maintain reading, driving assessment clarity, and independence far longer. CBVH services may be available for eligible New York State residents.",
    faqs: [
      {
        q: "Which LIRR stations serve your Inwood office from the Five Towns?",
        a: "The LIRR Far Rockaway branch stops at Cedarhurst, Lawrence, Woodmere, and Hewlett stations, all connecting to Inwood station. Travel times range from 5 to 12 minutes depending on your starting station. Our office at 148c Doughty Blvd is a short walk from the Inwood LIRR station.",
      },
      {
        q: "Do you offer low vision consultations for older adults in the Five Towns?",
        a: "Yes. Dr. Esther Moller, OD, FAAO, is our Certified Low Vision Specialist. She provides comprehensive evaluations for patients with macular degeneration, glaucoma, diabetic retinopathy, and other causes of vision impairment. CBVH services are available for eligible New York residents, and our office can assist with the referral process.",
      },
      {
        q: "Does insurance cover vision therapy for Five Towns patients?",
        a: "Medical health insurance — Aetna, Cigna, Emblem/GHI, Oxford, UnitedHealthcare — may cover vision therapy when medically necessary. Vision plans like VSP and EyeMed generally do not. FSA and HSA funds are accepted. We can help you verify your benefits before your appointment.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // JAMAICA
  // ---------------------------------------------------------------------------
  {
    slug: "jamaica",
    name: "Jamaica",
    region: "Queens, NY",
    titleTag: "Vision Therapy Near Jamaica, Queens | Advanced Vision Long Island",
    metaDesc:
      "Serving patients from Jamaica, Queens with binocular vision therapy, amblyopia, convergence insufficiency, and low vision care. Advanced Vision Long Island is accessible from Jamaica via LIRR — approximately 15 minutes.",
    h1: "Vision Therapy for Jamaica, Queens Patients",
    eyebrow: "Serving Jamaica · Queens, NY",
    heroPara:
      "Advanced Vision Long Island serves patients from Jamaica and Southeast Queens. Jamaica is a major transit hub — the LIRR's Jamaica station connects directly to Inwood on the Far Rockaway branch in about 15 minutes — making our Inwood practice reachable without a car from across Queens and Brooklyn.",
    driveTime: "20–25 minutes",
    transitNote: "LIRR Far Rockaway branch — Jamaica station to Inwood station (~15 min)",
    accessDetail:
      "From Jamaica, board the LIRR Far Rockaway branch at Jamaica station and ride to Inwood station — approximately 15 minutes. Jamaica station is served by the E, J, and Z subway lines and the JFK AirTrain. By car, Jamaica is approximately 20–25 minutes from our Inwood office via the Belt Parkway or Southern State Parkway.",
    vtAngle:
      "Jamaica and Southeast Queens have a high concentration of children in large public school systems where vision screenings are brief and functional vision disorders go undetected for years. Parents often seek vision therapy after other interventions — tutoring, reading specialists, ADHD evaluations — have not resolved their child's difficulties. Binocular vision disorders, including convergence insufficiency and eye tracking problems, are among the most common and treatable causes of reading and learning struggles in school-age children. Our practice welcomes families from Jamaica who need access to specialized binocular vision care without a long commute.",
    lvAngle:
      "Jamaica's diverse adult population includes a significant number of patients managing diabetic retinopathy, a leading cause of low vision in working-age adults with diabetes. Dr. Esther Moller, our Certified Low Vision Specialist, conducts thorough evaluations and prescribes optical aids and adaptive strategies to help patients maintain functional independence, navigate workplace accommodations, and delay the impact of progressive vision loss on daily life. CBVH services are available for eligible New York State residents, and our office can assist with the referral process.",
    faqs: [
      {
        q: "Can I reach Advanced Vision Long Island from Jamaica by public transit?",
        a: "Yes. The LIRR Far Rockaway branch from Jamaica station to Inwood station takes approximately 15 minutes. Jamaica station is served by the E, J, and Z subway lines and the AirTrain, making it accessible from across Queens and Brooklyn. Our office at 148c Doughty Blvd, Inwood is a short walk from the station.",
      },
      {
        q: "My child from Jamaica was referred for vision therapy after a failed school screening — what should I expect?",
        a: "A failed school screening means your child needs a full eye exam, but does not diagnose a specific condition. We recommend a comprehensive binocular vision evaluation, which assesses how the eyes work together — convergence, accommodation, tracking, and depth perception — not just whether the child can read the 20/20 line. If a disorder is found, we will explain the diagnosis, the therapy program, session frequency, expected timeline, and insurance options before you commit to anything.",
      },
      {
        q: "Do you treat patients with diabetic retinopathy and low vision from Jamaica?",
        a: "Yes. Dr. Esther Moller specializes in low vision rehabilitation for patients with diabetic retinopathy, macular degeneration, glaucoma, and other causes of vision impairment. A low vision evaluation identifies which optical aids and adaptive strategies will help you maintain independence in daily activities. CBVH services may be available for eligible New York State residents.",
      },
    ],
  },
];

// Export slugs so sitemapRoute can import them — single source of truth.
export const SERVICE_AREA_SLUGS: string[] = AREAS.map((a) => `/vision-therapy-${a.slug}/`);

// ---------------------------------------------------------------------------
// Shared styles (injected once per page, not globally)
// ---------------------------------------------------------------------------
const areaStyles = `
<style>
  .area-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .area-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .area-hero h1 { color: #fff; font-size: 2.4rem; line-height: 1.2; margin-bottom: 1rem; }
  @media (max-width:600px) { .area-hero h1 { font-size: 1.8rem; } }
  .area-hero .lead { color: rgba(255,255,255,0.82); font-size: 1.05rem; max-width: 660px; margin: 0 auto 1.75rem; line-height: 1.75; }
  .area-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; }
  .area-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }

  .access-card { background: var(--card); border-radius: 16px; padding: 1.25rem 1.5rem; box-shadow: 0 1px 5px rgba(0,0,0,0.07); margin: 2rem 0; display: flex; flex-wrap: wrap; gap: 1rem; }
  .access-item { flex: 1; min-width: 160px; }
  .access-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.3rem; }
  .access-value { font-weight: 600; font-size: 0.93rem; color: var(--navy); line-height: 1.4; }

  .faq-accordion { background: var(--card); border-radius: 14px; margin-bottom: 0.65rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
  .faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.4rem; font-weight: 600; font-size: 0.975rem; color: var(--navy); cursor: pointer; list-style: none; user-select: none; }
  .faq-summary::-webkit-details-marker { display: none; }
  .faq-summary-text { flex: 1; }
  .faq-chevron { flex-shrink: 0; color: var(--teal); transition: transform 0.2s; }
  details[open] .faq-chevron { transform: rotate(180deg); }
  .faq-summary:hover { background: rgba(20,126,147,0.04); }
  .faq-body { padding: 0 1.4rem 1.1rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; }
</style>`;

function buildAreaSchema(area: ServiceArea): object {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: area.titleTag,
    url: `https://advancedvisionli.com/vision-therapy-${area.slug}/`,
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
      areaServed: { "@type": "Place", name: area.name },
    },
  };
}

function buildFaqSchema(area: ServiceArea): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function buildAreaBody(area: ServiceArea): string {
  const faqItems = area.faqs
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
${areaStyles}
<div class="area-hero">
  <p class="eyebrow">${escapeHtml(area.eyebrow)}</p>
  <h1>${escapeHtml(area.h1)}</h1>
  <p class="lead">${escapeHtml(area.heroPara)}</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">

  <div class="access-card">
    <div class="access-item">
      <div class="access-label">Drive time</div>
      <div class="access-value">${escapeHtml(area.driveTime)}</div>
    </div>
    <div class="access-item">
      <div class="access-label">Transit</div>
      <div class="access-value">${escapeHtml(area.transitNote)}</div>
    </div>
    <div class="access-item">
      <div class="access-label">Our address</div>
      <div class="access-value">148c Doughty Blvd<br>Inwood, NY 11096</div>
    </div>
  </div>

  <h2 class="section-title">Getting here from ${escapeHtml(area.name)}</h2>
  <div class="prose">
    <p>${escapeHtml(area.accessDetail)}</p>
  </div>

  <h2 class="section-title">Vision therapy for ${escapeHtml(area.name)} patients</h2>
  <div class="prose">
    <p>${escapeHtml(area.vtAngle)}</p>
  </div>

  <h2 class="section-title">Low vision care for ${escapeHtml(area.name)} patients</h2>
  <div class="prose">
    <p>${escapeHtml(area.lvAngle)}</p>
  </div>

  <h2 class="section-title">Frequently asked questions</h2>
  <section aria-label="Local FAQs" style="margin-top:1rem;">${faqItems}</section>

  <div class="cta-box">
    <h2>Serving ${escapeHtml(area.name)} and the surrounding area</h2>
    <p>Advanced Vision Long Island is at 148c Doughty Blvd, Inwood, NY — easily reached from ${escapeHtml(area.name)} by car or public transit. Call to schedule a binocular vision evaluation or low vision consultation.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Request an Appointment</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

// Register one route per area
for (const area of AREAS) {
  router.get(`/vision-therapy-${area.slug}`, (_req, res) => {
    const html = ssrShell({
      title: area.titleTag,
      description: area.metaDesc,
      canonical: `https://advancedvisionli.com/vision-therapy-${area.slug}/`,
      schemaJsons: [buildAreaSchema(area), buildFaqSchema(area)],
      bodyHtml: buildAreaBody(area),
      breadcrumbs: [
        { name: "Home", url: `${SITE_URL}/` },
        { name: `Vision Therapy near ${area.name}`, url: `${SITE_URL}/vision-therapy-${area.slug}/` },
      ],
    });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(html);
  });
}

export default router;
