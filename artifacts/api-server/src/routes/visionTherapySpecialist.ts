import { Router, type IRouter } from "express";
import { ssrShell, SITE_URL } from "../lib/ssrShell";

const router: IRouter = Router();

const CANONICAL = "https://AdvancedVisionLI.com/vision-therapy-specialist/";

const SCHEMA_MEDICAL_WEB_PAGE = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Vision Therapy Specialist in Inwood, NY | Advanced Vision Long Island",
  "description":
    "Dr. Marcie Evans Stein is a fellowship-trained vision therapy specialist at Advanced Vision Long Island in Inwood, NY. OVDRA-recognized with 40+ years of experience treating children and adults.",
  "url": CANONICAL,
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient",
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Binocular Vision Disorder",
  },
};

const SCHEMA_PHYSICIAN = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://AdvancedVisionLI.com/#dr-stein",
  "name": "Dr. Marcie Evans Stein, OD FABM OVDRA",
  "description":
    "Fellowship-trained developmental optometrist and OVDRA-recognized vision therapy specialist with over 40 years of experience treating binocular vision disorders, convergence insufficiency, amblyopia, and learning-related vision problems in children and adults.",
  "medicalSpecialty": ["Developmental Optometry", "Binocular Vision", "Vision Therapy", "Pediatric Optometry"],
  "url": "https://AdvancedVisionLI.com/dr-marcie-stein/",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Advanced Vision Long Island",
    "url": "https://AdvancedVisionLI.com",
    "telephone": "+17182683937",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "148c Doughty Blvd",
      "addressLocality": "Inwood",
      "addressRegion": "NY",
      "postalCode": "11096",
      "addressCountry": "US",
    },
  },
};

const bodyHtml = `
<div class="page-content">
  <p class="eyebrow">Specialist Profile · Inwood, NY</p>
  <h1 class="page-title">Vision Therapy Specialist in Inwood, NY</h1>
  <p class="lead">
    A vision therapy specialist holds advanced fellowship training beyond a standard optometry degree —
    with clinical expertise in diagnosing and treating binocular vision disorders, convergence
    insufficiency, amblyopia, strabismus, and learning-related vision problems.
  </p>

  <div class="prose">
    <p>
      At <strong>Advanced Vision Long Island</strong>, that specialist is
      <strong>Dr. Marcie Evans Stein, OD FABM OVDRA</strong> — one of a small number of optometrists
      in the New York metropolitan area recognized by the Optometric Vision Development and Rehabilitation
      Association (OVDRA) for advanced competency in vision therapy. With more than
      <strong>40 years of clinical experience</strong>, Dr. Stein has helped thousands of children and
      adults build the visual skills they need to read, learn, and function comfortably.
    </p>
  </div>

  <h2 class="section-title">What Makes a Vision Therapy Specialist?</h2>
  <div class="skill-grid">
    <div class="skill-card">
      <div class="skill-dot" style="background:#5bbfb8;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="skill-name">Fellowship Training</div>
      <div class="skill-def">Post-doctoral clinical training in vision development and rehabilitation beyond the OD degree</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#e07060;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </div>
      <div class="skill-name">OVDRA Recognition</div>
      <div class="skill-def">Peer-reviewed credential verifying advanced expertise in optometric vision development and rehabilitation</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#6a8fc0;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="skill-name">Patient Population</div>
      <div class="skill-def">Clinical experience with both pediatric and adult patients across a full spectrum of binocular vision conditions</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#5cb86a;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.62"/></svg>
      </div>
      <div class="skill-name">Ongoing Education</div>
      <div class="skill-def">Continuing clinical education in the latest evidence-based vision therapy protocols and instrumentation</div>
    </div>
  </div>

  <h2 class="section-title">Dr. Marcie Evans Stein, OD FABM OVDRA</h2>
  <div class="prose">
    <p>
      Dr. Stein earned her Doctor of Optometry degree and subsequently pursued advanced fellowship
      training in vision therapy and binocular vision, achieving both the <strong>FABM</strong>
      (Fellow of the Academy of Behavioral Medicine) and <strong>OVDRA</strong> (Optometric Vision
      Development and Rehabilitation Association) designations. These credentials place her among a
      select group of developmental optometrists who have demonstrated clinical mastery in vision
      therapy through peer review and advanced examination.
    </p>
    <p>
      Over a career spanning more than <strong>40 years</strong>, Dr. Stein has developed a
      particular focus on children who struggle in school due to undetected vision problems — including
      convergence insufficiency, tracking disorders, and visual processing deficits — as well as adults
      who experience chronic headaches, screen fatigue, or double vision. She co-founded
      Advanced Vision Long Island with Dr. Esther Moller to bring specialist-level vision therapy
      to the Inwood and Long Island communities.
    </p>
    <p>
      Dr. Stein supervises every vision therapy program at the practice, designing individualized
      treatment plans and conducting progress evaluations to ensure each patient's program adapts
      as their skills develop.
    </p>
  </div>

  <h2 class="section-title">Conditions Treated</h2>
  <div class="prose">
    <ul>
      <li><strong>Convergence Insufficiency</strong> — the leading cause of reading-related eyestrain, headaches, and difficulty concentrating in children and adults</li>
      <li><strong>Amblyopia (Lazy Eye)</strong> — reduced vision in one eye corrected through binocular vision therapy rather than patching alone</li>
      <li><strong>Strabismus (Eye Turn)</strong> — misaligned eyes treated with vision therapy, sometimes in conjunction with surgical care</li>
      <li><strong>Accommodative Dysfunction</strong> — difficulty shifting focus between near and far distances, often presenting as blurred vision after reading</li>
      <li><strong>Eye Tracking Disorder</strong> — erratic eye movements that disrupt reading fluency and sports performance</li>
      <li><strong>Learning-Related Vision Problems</strong> — visual processing and binocular deficits that masquerade as reading or attention disorders</li>
      <li><strong>Post-Concussion Vision Syndrome</strong> — visual symptoms following traumatic brain injury, including double vision, light sensitivity, and tracking difficulty</li>
    </ul>
  </div>

  <h2 class="section-title">Who We Serve</h2>
  <div class="prose">
    <p>
      Our vision therapy practice serves patients of <strong>all ages</strong> — from children as young
      as 4 or 5 who are first showing signs of a binocular vision problem, to school-age children whose
      reading struggles have gone unexplained, to adults managing screen-heavy careers or recovering
      from head injury. Every program begins with a comprehensive functional vision evaluation and
      is tailored to the individual's specific deficits, goals, and schedule.
    </p>
    <p>
      We see patients from Inwood, Long Island, Queens, Nassau County, and the broader New York
      metropolitan area.
    </p>
  </div>

  <h2 class="section-title">Our Full Care Team</h2>
  <div class="prose">
    <p>
      Advanced Vision Long Island is a two-doctor practice. Alongside Dr. Stein's vision therapy
      specialty, <a href="/dr-esther-moller/"><strong>Dr. Esther Moller, OD, FAAO</strong></a> —
      a Certified Low Vision Specialist with a residency at the Northport VA Medical Center —
      provides comprehensive low vision rehabilitation for patients with macular degeneration,
      glaucoma, diabetic retinopathy, and post-stroke vision loss. Whether you are seeking vision
      therapy or low vision care, both specialties are available at our Inwood, NY office.
    </p>
  </div>

  <div class="cta-box">
    <h2>Schedule a Vision Therapy Consultation</h2>
    <p>
      A comprehensive functional vision evaluation is the first step. Dr. Stein will identify which
      visual skills need development and walk you through a personalized treatment plan.
    </p>
    <a href="https://AdvancedVisionLI.com/#contact" class="cta-btn">Request a Consultation</a>
    <span class="cta-phone">Or call us at <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>
</div>
`;

router.get("/vision-therapy-specialist", (_req, res) => {
  const html = ssrShell({
    title: "Vision Therapy Specialist in Inwood, NY | Advanced Vision Long Island",
    description:
      "Dr. Marcie Evans Stein is an OVDRA-recognized vision therapy specialist at Advanced Vision Long Island in Inwood, NY. Fellowship-trained with 40+ years of experience treating binocular vision disorders, convergence insufficiency, and amblyopia in children and adults.",
    canonical: CANONICAL,
    schemaJsons: [SCHEMA_MEDICAL_WEB_PAGE, SCHEMA_PHYSICIAN],
    bodyHtml,
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy", url: `${SITE_URL}/vision-therapy/` },
      { name: "Vision Therapy Specialist", url: `${SITE_URL}/vision-therapy-specialist/` },
    ],
  });

  res
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=86400")
    .status(200)
    .send(html);
});

export default router;
