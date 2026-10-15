import { Router } from "express";
import { ssrShell, escapeHtml, SITE_URL, CONTACT_URL } from "../lib/ssrShell";
import { doctorPortrait } from "../lib/doctorPortraits";

const router = Router();

const PRACTICE = {
  "@type": "MedicalOrganization",
  name: "Advanced Vision Long Island",
  url: "https://advancedvisionli.com/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "148c Doughty Blvd",
    addressLocality: "Inwood",
    addressRegion: "NY",
    postalCode: "11096",
    addressCountry: "US",
  },
  telephone: "+17182683937",
};

const doctorStyles = `
<style>
  .doctor-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .doctor-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .doctor-hero h1 { color: #fff; font-size: 2.4rem; line-height: 1.15; margin-bottom: 0.5rem; }
  @media (max-width:600px) { .doctor-hero h1 { font-size: 1.8rem; } }
  .doctor-hero .creds { color: rgba(255,255,255,0.75); font-size: 1rem; margin-bottom: 0.5rem; letter-spacing: 0.04em; }
  .doctor-hero .role { color: rgba(255,255,255,0.6); font-size: 0.875rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.75rem; }
  .doctor-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; }
  .doctor-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }

  .badge-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.25rem 0 2rem; }
  .badge { background: rgba(20,126,147,0.10); color: var(--teal); font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.9rem; border-radius: 100px; letter-spacing: 0.06em; }

  .spec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; margin: 1.25rem 0 2rem; }
  .spec-card { background: var(--card); border-radius: 14px; padding: 1rem 1.1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
  .spec-card .spec-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.3rem; }
  .spec-card .spec-value { font-weight: 600; font-size: 0.93rem; color: var(--navy); line-height: 1.45; }
</style>`;

// ---------------------------------------------------------------------------
// DR. MARCIE EVANS STEIN
// ---------------------------------------------------------------------------

const steinSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://advancedvisionli.com/#dr-stein",
  name: "Dr. Marcie Evans Stein",
  givenName: "Marcie",
  familyName: "Stein",
  honorificPrefix: "Dr.",
  honorificSuffix: "OD, FABM, OVDRA",
  url: "https://advancedvisionli.com/dr-marcie-stein/",
  description:
    "Dr. Marcie Evans Stein, OD, FABM, OVDRA, is an optometrist and founder of Advanced Vision Long Island in Inwood, NY. A graduate of SUNY College of Optometry with over 40 years of clinical experience, she specializes in developmental optometry and binocular vision therapy for children and adults. She is an OVDRA-recognized provider and Fellow of the American Board of Optometry in Binocular Vision (FABM), committed to helping patients of all ages achieve their full visual potential.",
  medicalSpecialty: [
    "Developmental Optometry",
    "Binocular Vision",
    "Vision Therapy",
    "Pediatric Optometry",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SUNY College of Optometry",
    address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "OD", name: "Doctor of Optometry" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Fellowship", name: "Fellow of the American Board of Optometry in Binocular Vision (FABM)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "OVDRA — Optometric Vision Development & Rehabilitation Association Recognized Provider" },
  ],
  worksFor: PRACTICE,
  workLocation: {
    "@type": "MedicalClinic",
    name: "Advanced Vision Long Island",
    address: {
      "@type": "PostalAddress",
      streetAddress: "148c Doughty Blvd",
      addressLocality: "Inwood",
      addressRegion: "NY",
      postalCode: "11096",
    },
  },
};

const steinPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Dr. Marcie Evans Stein, OD, FABM, OVDRA | Advanced Vision Long Island",
  url: "https://advancedvisionli.com/dr-marcie-stein/",
  mainEntity: { "@id": "https://advancedvisionli.com/#dr-stein" },
};

const steinWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://advancedvisionli.com/dr-marcie-stein/#webpage",
  url: "https://advancedvisionli.com/dr-marcie-stein/",
  name: "Dr. Marcie Evans Stein, OD, FABM, OVDRA | Advanced Vision Long Island",
  description:
    "Physician profile of Dr. Marcie Evans Stein — developmental optometrist and founder of Advanced Vision Long Island in Inwood, NY, with 40+ years of experience in binocular vision and vision therapy.",
  isPartOf: { "@id": "https://advancedvisionli.com/#website" },
  about: { "@id": "https://advancedvisionli.com/#dr-stein" },
  author: { "@id": "https://advancedvisionli.com/#organization" },
};

function buildSteinBody(): string {
  return `
${doctorStyles}
<div class="doctor-hero">
  ${doctorPortrait(SITE_URL, "stein", true)}
  <p class="eyebrow">Developmental Optometry · Inwood, NY</p>
  <h1>Dr. Marcie Evans Stein</h1>
  <p class="creds">OD, FABM, OVDRA</p>
  <p class="role">Optometrist &amp; Founder — Advanced Vision Long Island</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule a Consultation</a>
</div>

<div class="page-content">

  <p class="eyebrow" style="margin-top:0;">About Dr. Stein</p>
  <div class="badge-row">
    <span class="badge">OD</span>
    <span class="badge">FABM</span>
    <span class="badge">OVDRA Recognized Provider</span>
    <span class="badge">40+ Years in Practice</span>
    <span class="badge">SUNY College of Optometry</span>
  </div>

  <div class="prose">
    <p>Dr. Marcie Evans Stein is the founder of Advanced Vision Long Island, an optometry practice in Inwood, NY specializing in developmental optometry and binocular vision therapy. With more than 40 years of clinical experience, she has dedicated her career to identifying and treating the functional vision problems that standard eye exams miss.</p>
    <p>Dr. Stein earned her Doctor of Optometry degree from <strong>SUNY College of Optometry</strong> in New York City. She holds fellowship status through the American Board of Optometry in Binocular Vision <strong>(FABM)</strong> — a credential recognizing advanced clinical competence in binocular vision evaluation and vision therapy — and is a recognized provider of the <strong>Optometric Vision Development &amp; Rehabilitation Association (OVDRA)</strong>.</p>
    <p>Her practice serves patients of all ages, from young children showing early signs of visual dysfunction to adults experiencing reading fatigue, headaches, or persistent eye-strain that glasses alone have not resolved.</p>
  </div>

  <h2 class="section-title">Areas of Specialization</h2>
  <div class="spec-grid">
    <div class="spec-card">
      <div class="spec-label">Primary Specialty</div>
      <div class="spec-value">Developmental Optometry</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Clinical Focus</div>
      <div class="spec-value">Binocular Vision &amp; Vision Therapy</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Patient Population</div>
      <div class="spec-value">Children &amp; Adults of All Ages</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Conditions Treated</div>
      <div class="spec-value">Amblyopia, Strabismus, <a href="/convergence-insufficiency/" style="color:var(--teal);">Convergence Insufficiency</a>, Accommodative Disorders</div>
    </div>
  </div>

  <h2 class="section-title">Education &amp; Credentials</h2>
  <div class="prose">
    <ul>
      <li><strong>Doctor of Optometry (OD)</strong> — SUNY College of Optometry, New York, NY</li>
      <li><strong>FABM</strong> — Fellow, American Board of Optometry in Binocular Vision</li>
      <li><strong>OVDRA Recognized Provider</strong> — Optometric Vision Development &amp; Rehabilitation Association</li>
    </ul>
  </div>

  <h2 class="section-title">About Advanced Vision Long Island</h2>
  <div class="prose">
    <p>Advanced Vision Long Island is an optometry practice at 148c Doughty Blvd, Inwood, NY 11096, offering comprehensive primary eye care, developmental vision evaluations, vision therapy, and low vision rehabilitation. Dr. Stein founded the practice after more than a decade in Queens, bringing evidence-based binocular vision care to the South Shore of Long Island.</p>
  </div>

  <div class="cta-box">
    <h2>Schedule a Vision Evaluation</h2>
    <p>Dr. Stein and the team at Advanced Vision Long Island offer comprehensive binocular vision evaluations for children and adults. If you or your child experiences headaches, reading difficulty, or persistent eye strain, we can help.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Request an Appointment</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

router.get("/dr-marcie-stein", (_req, res) => {
  const html = ssrShell({
    title: "Dr. Marcie Evans Stein, OD, FABM, OVDRA | Advanced Vision Long Island",
    description:
      "Dr. Marcie Evans Stein is a developmental optometrist and founder of Advanced Vision Long Island in Inwood, NY. FABM Fellow and OVDRA recognized provider with 40+ years of experience in binocular vision and vision therapy.",
    canonical: "https://advancedvisionli.com/dr-marcie-stein/",
    schemaJsons: [steinSchema, steinPageSchema, steinWebPageSchema],
    bodyHtml: buildSteinBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Dr. Marcie Evans Stein", url: `${SITE_URL}/dr-marcie-stein/` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(html);
});

// ---------------------------------------------------------------------------
// DR. ESTHER MOLLER
// ---------------------------------------------------------------------------

const mollerSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://advancedvisionli.com/#dr-moller",
  name: "Dr. Esther Moller",
  givenName: "Esther",
  familyName: "Moller",
  honorificPrefix: "Dr.",
  honorificSuffix: "OD, FAAO",
  url: "https://advancedvisionli.com/dr-esther-moller/",
  description:
    "Dr. Esther Moller, OD, FAAO, is a fellowship-trained optometrist and Certified Low Vision Specialist at Advanced Vision Long Island in Inwood, NY. A graduate of SUNY College of Optometry, she completed her residency at the Northport VA Medical Center. She is a Fellow of the American Academy of Optometry (FAAO) and provides comprehensive primary eye care with focused expertise in low vision rehabilitation and binocular vision.",
  medicalSpecialty: [
    "Low Vision Rehabilitation",
    "Binocular Vision",
    "Comprehensive Optometry",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SUNY College of Optometry",
    address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "OD", name: "Doctor of Optometry" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Fellowship", name: "Fellow of the American Academy of Optometry (FAAO)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Residency", name: "Residency — Northport VA Medical Center, NY" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "Certified Low Vision Specialist" },
  ],
  worksFor: PRACTICE,
  workLocation: {
    "@type": "MedicalClinic",
    name: "Advanced Vision Long Island",
    address: {
      "@type": "PostalAddress",
      streetAddress: "148c Doughty Blvd",
      addressLocality: "Inwood",
      addressRegion: "NY",
      postalCode: "11096",
    },
  },
};

const mollerPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Dr. Esther Moller, OD, FAAO | Low Vision Specialist — Advanced Vision Long Island",
  url: "https://advancedvisionli.com/dr-esther-moller/",
  mainEntity: { "@id": "https://advancedvisionli.com/#dr-moller" },
};

const mollerWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://advancedvisionli.com/dr-esther-moller/#webpage",
  url: "https://advancedvisionli.com/dr-esther-moller/",
  name: "Dr. Esther Moller, OD, FAAO | Low Vision Specialist — Advanced Vision Long Island",
  description:
    "Physician profile of Dr. Esther Moller — Certified Low Vision Specialist and FAAO Fellow at Advanced Vision Long Island in Inwood, NY, specializing in low vision rehabilitation and binocular vision.",
  isPartOf: { "@id": "https://advancedvisionli.com/#website" },
  about: { "@id": "https://advancedvisionli.com/#dr-moller" },
  author: { "@id": "https://advancedvisionli.com/#organization" },
};

function buildMollerBody(): string {
  return `
${doctorStyles}
<div class="doctor-hero">
  ${doctorPortrait(SITE_URL, "moller", true)}
  <p class="eyebrow">Low Vision Rehabilitation · Inwood, NY</p>
  <h1>Dr. Esther Moller</h1>
  <p class="creds">OD, FAAO</p>
  <p class="role">Optometrist &amp; Low Vision Specialist — Advanced Vision Long Island</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule a Consultation</a>
</div>

<div class="page-content">

  <p class="eyebrow" style="margin-top:0;">About Dr. Moller</p>
  <div class="badge-row">
    <span class="badge">OD</span>
    <span class="badge">FAAO</span>
    <span class="badge">Certified Low Vision Specialist</span>
    <span class="badge">Northport VA Residency</span>
    <span class="badge">SUNY College of Optometry</span>
  </div>

  <div class="prose">
    <p>Dr. Esther Moller is a fellowship-trained optometrist and Certified Low Vision Specialist at Advanced Vision Long Island in Inwood, NY. She provides comprehensive primary eye care with a focused clinical emphasis on low vision rehabilitation — helping patients with conditions such as macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss regain functional independence.</p>
    <p>Dr. Moller earned her Doctor of Optometry degree from <strong>SUNY College of Optometry</strong> in New York City and completed a competitive residency at the <strong>Northport VA Medical Center</strong> on Long Island — a program known for its depth in low vision and binocular vision care. She holds fellowship status in the <strong>American Academy of Optometry (FAAO)</strong>, a distinction awarded for contributions to the science and practice of optometry.</p>
    <p>As a Certified Low Vision Specialist, Dr. Moller conducts thorough low vision evaluations and prescribes a range of optical and non-optical aids — from high-powered add glasses and prism half-eyes to stand magnifiers and hand magnifiers — tailored to each patient's remaining vision and daily goals.</p>
  </div>

  <h2 class="section-title">Areas of Specialization</h2>
  <div class="spec-grid">
    <div class="spec-card">
      <div class="spec-label">Primary Specialty</div>
      <div class="spec-value">Low Vision Rehabilitation</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Clinical Focus</div>
      <div class="spec-value">Binocular Vision &amp; Comprehensive Eye Care</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Patient Population</div>
      <div class="spec-value">Adults with Vision Impairment from Eye Disease or Injury</div>
    </div>
    <div class="spec-card">
      <div class="spec-label">Conditions Treated</div>
      <div class="spec-value">Macular Degeneration, Glaucoma, Diabetic Retinopathy, Post-Stroke Vision Loss</div>
    </div>
  </div>

  <h2 class="section-title">Education &amp; Credentials</h2>
  <div class="prose">
    <ul>
      <li><strong>Doctor of Optometry (OD)</strong> — SUNY College of Optometry, New York, NY</li>
      <li><strong>Residency</strong> — Northport VA Medical Center, Northport, NY (Low Vision &amp; Binocular Vision)</li>
      <li><strong>FAAO</strong> — Fellow, American Academy of Optometry</li>
      <li><strong>Certified Low Vision Specialist</strong></li>
    </ul>
  </div>

  <h2 class="section-title">Low Vision Services at Advanced Vision Long Island</h2>
  <div class="prose">
    <p>A low vision evaluation with Dr. Moller is a thorough, task-oriented exam covering distance vision, near vision, contrast sensitivity, and visual fields. The goal is not just to measure what you can see — it is to help you do the things that visual impairment has made difficult, from reading and cooking to watching television and recognizing faces.</p>
    <p>Following evaluation, Dr. Moller prescribes and fits optical aids from a comprehensive range, and works with each patient on adaptive strategies to maximize the independence that remaining vision can support.</p>
  </div>

  <div class="cta-box">
    <h2>Request a Low Vision Evaluation</h2>
    <p>If standard glasses or contact lenses can no longer fully correct your vision, Dr. Moller can help. Advanced Vision Long Island offers comprehensive low vision consultations at our Inwood, NY office.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Request an Appointment</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

router.get("/dr-esther-moller", (_req, res) => {
  const html = ssrShell({
    title: "Dr. Esther Moller, OD, FAAO | Low Vision Specialist — Advanced Vision Long Island",
    description:
      "Dr. Esther Moller is a Certified Low Vision Specialist and FAAO Fellow at Advanced Vision Long Island in Inwood, NY. Fellowship-trained, with a residency at the Northport VA Medical Center, she specializes in low vision rehabilitation and comprehensive eye care.",
    canonical: "https://advancedvisionli.com/dr-esther-moller/",
    schemaJsons: [mollerSchema, mollerPageSchema, mollerWebPageSchema],
    bodyHtml: buildMollerBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Dr. Esther Moller", url: `${SITE_URL}/dr-esther-moller/` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(html);
});

export default router;
