import { Router, type IRouter } from "express";
import { ssrShell, SITE_URL } from "../lib/ssrShell";

const router: IRouter = Router();

const CANONICAL = "https://AdvancedVisionLI.com/low-vision-specialist";

const SCHEMA_MEDICAL_WEB_PAGE = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Low Vision Specialist in Inwood, NY | Advanced Vision Long Island",
  "description":
    "Dr. Esther Moller is a Certified Low Vision Specialist at Advanced Vision Long Island in Inwood, NY. Fellowship-trained with residency at the Northport VA, helping patients maximize remaining sight.",
  "url": CANONICAL,
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient",
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Low Vision",
  },
};

const SCHEMA_PHYSICIAN = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://AdvancedVisionLI.com/#dr-moller",
  "name": "Dr. Esther Moller, OD FAAO",
  "description":
    "Certified Low Vision Specialist and Fellow of the American Academy of Optometry. Completed her low vision residency at the Northport VA Medical Center. Dr. Moller prescribes optical aids and adaptive strategies to help patients with macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss maintain independence.",
  "medicalSpecialty": ["Low Vision Rehabilitation", "Binocular Vision", "Comprehensive Optometry"],
  "url": "https://AdvancedVisionLI.com/dr-esther-moller",
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
  <h1 class="page-title">Low Vision Specialist in Inwood, NY</h1>
  <p class="lead">
    A Certified Low Vision Specialist holds advanced clinical training in evaluating and rehabilitating
    patients whose vision cannot be fully corrected by standard glasses, contact lenses, medication, or
    surgery — helping them maximize the sight they have to maintain independence in daily life.
  </p>

  <div class="prose">
    <p>
      At <strong>Advanced Vision Long Island</strong>, low vision specialist care is led by
      <strong>Dr. Esther Moller, OD FAAO</strong> — a Fellow of the American Academy of Optometry
      who completed a dedicated low vision residency at the
      <strong>Northport VA Medical Center</strong>. Dr. Moller brings fellowship-level training and
      VA-forged clinical depth to every low vision consultation, with a focus on maximizing each
      patient's functional vision for the tasks that matter most to them.
    </p>
  </div>

  <h2 class="section-title">What a Certified Low Vision Specialist Does</h2>
  <div class="skill-grid">
    <div class="skill-card">
      <div class="skill-dot" style="background:#5bbfb8;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
      <div class="skill-name">Functional Vision Assessment</div>
      <div class="skill-def">Measuring distance acuity, near acuity, contrast sensitivity, and visual fields to build a complete picture of usable vision</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#e07060;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </div>
      <div class="skill-name">Optical Aid Prescribing</div>
      <div class="skill-def">Selecting and fitting magnifiers, high-powered spectacles, prism half-eyes, and telescopic lenses matched to each patient's tasks</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#6a8fc0;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="skill-name">Adaptive Strategy Training</div>
      <div class="skill-def">Teaching lighting optimization, eccentric viewing, reading techniques, and daily-life strategies to maximize independence</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#5cb86a;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="skill-name">Benefits Navigation</div>
      <div class="skill-def">Helping qualifying patients access NYS Commission for the Blind (CBVH) funding for evaluations and low vision aids</div>
    </div>
  </div>

  <h2 class="section-title">Dr. Esther Moller, OD FAAO</h2>
  <div class="prose">
    <p>
      Dr. Moller earned her Doctor of Optometry degree and completed a
      <strong>low vision residency at the Northport VA Medical Center</strong> — one of the nation's
      leading clinical training sites for low vision rehabilitation. There, she worked extensively with
      veterans experiencing vision loss from a wide range of causes, developing the diagnostic and
      prescriptive skills that define specialist-level low vision practice.
    </p>
    <p>
      She holds the <strong>FAAO</strong> designation — Fellow of the American Academy of Optometry —
      a peer-reviewed credential recognizing exceptional achievement in clinical optometry. This places
      her among the top tier of optometrists in the United States with demonstrated advanced clinical
      competency.
    </p>
    <p>
      At Advanced Vision Long Island, Dr. Moller conducts comprehensive low vision evaluations and
      personally prescribes each patient's optical aid regimen. Her approach is always task-centered:
      understanding what activities the patient most wants to regain, and building a rehabilitation
      plan around those specific goals.
    </p>
  </div>

  <h2 class="section-title">Conditions We Evaluate</h2>
  <div class="prose">
    <ul>
      <li><strong>Macular Degeneration (AMD)</strong> — progressive damage to the central retina reducing the sharp vision needed for reading and recognizing faces</li>
      <li><strong>Glaucoma</strong> — optic nerve damage that narrows the visual field over time, often leaving peripheral vision intact but reducing useful overall function</li>
      <li><strong>Diabetic Retinopathy</strong> — retinal damage from diabetes causing blurring, dark spots, or field loss</li>
      <li><strong>Post-Stroke Vision Loss</strong> — field defects, double vision, or processing difficulties resulting from stroke affecting the visual cortex or optic pathways</li>
      <li><strong>Retinitis Pigmentosa</strong> — inherited retinal disease causing progressive peripheral vision loss and difficulty in low-light conditions</li>
      <li><strong>Other Causes</strong> — any condition that leaves a patient with significant visual impairment that standard correction cannot fully resolve</li>
    </ul>
  </div>

  <h2 class="section-title">Low Vision Aids &amp; Strategies Offered</h2>
  <div class="prose">
    <p>
      Every low vision prescription is matched to the individual. Dr. Moller evaluates each patient's
      functional vision and daily tasks, then selects the combination of aids and strategies most
      likely to restore meaningful independence. Options include:
    </p>
    <ul>
      <li><strong>High-Powered Add Glasses</strong> — precision spectacles with high magnification for sustained near tasks such as reading, medication labels, and needlepoint</li>
      <li><strong>Prism Half-Eye Spectacles</strong> — prismatic lenses that shift the image to take advantage of healthier retinal areas</li>
      <li><strong>Stand Magnifiers</strong> — stable desktop lenses that rest on the page for hands-free reading over longer sessions</li>
      <li><strong>Handheld Magnifiers</strong> — portable lenses ideal for spotting prices, menus, and text on the go</li>
      <li><strong>Dome Magnifiers</strong> — wide-area acrylic lenses that lay directly on the page for comfortable spot reading</li>
      <li><strong>Lighting Optimization &amp; Eccentric Viewing</strong> — non-optical strategies that often produce dramatic improvements in functional vision without additional hardware</li>
    </ul>
  </div>

  <h2 class="section-title">CBVH &amp; Benefits Assistance</h2>
  <div class="prose">
    <p>
      Our practice works with the <strong>New York State Commission for the Blind (CBVH)</strong>,
      which may fund low vision evaluations and optical aids for qualifying New York residents.
      Dr. Moller's team can help determine eligibility and assist with the referral process, making
      specialist low vision care accessible to more patients.
    </p>
  </div>

  <div class="cta-box">
    <h2>Request a Low Vision Consultation</h2>
    <p>
      If standard glasses are no longer enough, Dr. Moller can evaluate your functional vision and
      recommend a personalized plan to maximize your independence. We serve patients from
      Inwood, Long Island, Queens, and Nassau County.
    </p>
    <a href="https://AdvancedVisionLI.com/#contact" class="cta-btn">Request a Consultation</a>
    <span class="cta-phone">Or call us at <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>
</div>
`;

router.get("/low-vision-specialist", (_req, res) => {
  const html = ssrShell({
    title: "Low Vision Specialist in Inwood, NY | Advanced Vision Long Island",
    description:
      "Dr. Esther Moller is a Certified Low Vision Specialist (OD FAAO) at Advanced Vision Long Island in Inwood, NY. Fellowship-trained with residency at the Northport VA, she prescribes optical aids and adaptive strategies for patients with macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss.",
    canonical: CANONICAL,
    schemaJsons: [SCHEMA_MEDICAL_WEB_PAGE, SCHEMA_PHYSICIAN],
    bodyHtml,
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Low Vision Care", url: `${SITE_URL}/low-vision-care` },
      { name: "Low Vision Specialist", url: `${SITE_URL}/low-vision-specialist` },
    ],
  });

  res
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=86400")
    .status(200)
    .send(html);
});

export default router;
