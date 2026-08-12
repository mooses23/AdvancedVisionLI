import { Router, type IRouter } from "express";
import { ssrShell, SITE_URL } from "../lib/ssrShell";

const router: IRouter = Router();

const CANONICAL = "https://AdvancedVisionLI.com/low-vision-care/";

const FAQ_ITEMS = [
  {
    question: "What is low vision?",
    answer:
      "Low vision is a significant visual impairment that cannot be fully corrected with standard glasses, contact lenses, medication, or surgery. It affects a person's ability to perform everyday tasks such as reading, cooking, or watching television. Low vision does not mean total blindness — most people with low vision retain some usable sight.",
  },
  {
    question: "Does Medicare or Medicaid cover low vision care in New York?",
    answer:
      "Low vision services may be covered under Medicare Part B when medically necessary. In New York, eligible patients may also qualify for services through the NYS Commission for the Blind (CBVH), which can fund low vision evaluations and aids for qualifying individuals. We can help determine which programs apply to your situation.",
  },
  {
    question: "What low vision aids are available?",
    answer:
      "We offer a wide range of optical aids including high-powered add glasses, prism half-eye spectacles, stand magnifiers, handheld magnifiers, and dome magnifiers. We evaluate each patient's specific needs and recommend aids that maximize their remaining vision for the tasks that matter most to them.",
  },
  {
    question: "Can I still drive with low vision?",
    answer:
      "Driving with low vision depends on the degree of impairment and state regulations. New York requires a minimum visual acuity of 20/40 to drive without restrictions. Our doctors can evaluate your functional vision and, where applicable, discuss bioptic telescopes or other strategies. We always prioritize patient and public safety.",
  },
];

const SCHEMA_MEDICAL_WEB_PAGE = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Low Vision Care — Advanced Vision Long Island",
  "description":
    "Low vision specialist in Inwood, Long Island, NY. We help patients with macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss maximize their remaining sight.",
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

const SCHEMA_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Low Vision Care",
  "name": "Low Vision Consultation and Rehabilitation",
  "description":
    "Comprehensive low vision consultation covering distance vision, near vision, contrast sensitivity, and visual fields. We prescribe optical aids and strategies to restore independence for patients with macular degeneration, glaucoma, diabetes, and post-stroke vision loss.",
  "provider": {
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
  "areaServed": [
    { "@type": "City", "name": "Inwood, NY" },
    { "@type": "City", "name": "Long Island, NY" },
    { "@type": "City", "name": "Queens, NY" },
    { "@type": "City", "name": "Nassau County, NY" },
  ],
  "url": CANONICAL,
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

const ACTIVITIES = ["Reading", "Playing cards", "Cooking meals", "Watching TV", "Playing bingo", "Needlepoint"];

const CAUSES = [
  {
    name: "Macular Degeneration",
    description:
      "Damage to the central retina reduces sharp, detailed vision used for reading and recognizing faces.",
  },
  {
    name: "Glaucoma",
    description:
      "Elevated intraocular pressure progressively damages the optic nerve, narrowing the visual field over time.",
  },
  {
    name: "Diabetic Retinopathy",
    description:
      "Diabetic retinopathy causes blood vessels in the retina to leak or grow abnormally, blurring or blocking vision.",
  },
  {
    name: "Post-Stroke Vision Loss",
    description:
      "Stroke can damage the visual cortex or optic pathways, resulting in field loss, double vision, or processing difficulties.",
  },
];

const AIDS = [
  { name: "High Powered Add Glasses", desc: "Precision reading lenses with high magnification for near tasks" },
  { name: "Prism Half Eyes", desc: "Prismatic spectacles that shift the image for easier reading" },
  { name: "Stand Magnifier", desc: "Stable desktop lens that rests on the page for hands-free use" },
  { name: "Hand Magnifier", desc: "Portable handheld lens ideal for spotting text on the go" },
  { name: "Dome Magnifier", desc: "Curved acrylic dome that lays directly on text for wide-area clarity" },
];

const faqHtml = FAQ_ITEMS.map(
  (item) => `
  <div class="faq-item">
    <div class="faq-q">${item.question}</div>
    <div class="faq-a">${item.answer}</div>
  </div>`,
).join("");

const causesHtml = CAUSES.map(
  (c) => `
  <div class="cause-card">
    <div class="cause-name">${c.name}</div>
    <div class="cause-desc">${c.description}</div>
  </div>`,
).join("");

const activitiesHtml = ACTIVITIES.map(
  (a) => `<span class="activity-pill">${a}</span>`,
).join("");

const aidsHtml = AIDS.map(
  (a) => `
  <div class="skill-card">
    <div class="skill-name">${a.name}</div>
    <div class="skill-def">${a.desc}</div>
  </div>`,
).join("");

const bodyHtml = `
<div class="page-content">
  <p class="eyebrow">Flagship Specialty</p>
  <h1 class="page-title">Low Vision Specialist — Inwood, Long Island, NY</h1>
  <p class="lead">
    When standard glasses or contact lenses can no longer fully correct your vision, our low vision
    specialists help you maximize what you have — restoring independence for reading, driving, and daily life.
  </p>

  <div class="prose">
    <p>
      Low vision is a significant visual impairment that cannot be fully corrected by conventional means.
      At <strong>Advanced Vision Long Island</strong>, low vision care is led by
      <a href="/dr-esther-moller/"><strong>Dr. Esther Moller, OD, FAAO</strong></a> —
      a Certified Low Vision Specialist and Fellow of the American Academy of Optometry who completed
      her residency at the Northport VA Medical Center. Dr. Moller conducts thorough, task-oriented
      low vision consultations designed not just to measure what you can see —
      but to help you <em>do</em> the things that vision loss has made difficult.
    </p>
    <p>
      We evaluate your unique daily needs and match you with the optical aids and adaptive strategies
      that restore the most independence. Our practice also works with the
      <strong>NYS Commission for the Blind (CBVH)</strong>, which may fund evaluations and aids for
      qualifying New York residents.
    </p>
  </div>

  <h2 class="section-title">What Does a Low Vision Consultation Cover?</h2>
  <div class="prose">
    <p>A comprehensive low vision evaluation includes:</p>
    <ul>
      <li><strong>Distance Vision</strong> — measuring functional acuity at distance with optimal correction</li>
      <li><strong>Near Vision</strong> — determining reading acuity and the magnification needed for specific tasks</li>
      <li><strong>Contrast Sensitivity</strong> — assessing how well you distinguish objects from their background</li>
      <li><strong>Visual Fields</strong> — mapping any areas of reduced peripheral or central vision</li>
    </ul>
  </div>

  <h2 class="section-title">Common Causes of Low Vision</h2>
  <div class="cause-grid">
    ${causesHtml}
  </div>

  <h2 class="section-title">Have You Stopped…?</h2>
  <div class="prose">
    <p>Vision loss often causes people to quietly give up activities they once loved. Does this sound familiar?</p>
  </div>
  <div class="activity-grid">
    ${activitiesHtml}
  </div>
  <div class="prose">
    <p>
      <strong>Is this due to poor vision?</strong> Would you like to start again? Come see how we can
      help get back your quality of life. Many patients are surprised by how much usable vision can be
      recovered with the right combination of aids and training.
    </p>
  </div>

  <h2 class="section-title">Low Vision Aids We Prescribe</h2>
  <div class="prose">
    <p>
      Low vision aids utilize remaining vision through magnification, image shift, and contrast
      enhancement to maximize visual potential. Samples of what we offer:
    </p>
  </div>
  <div class="skill-grid">
    ${aidsHtml}
  </div>

  <div class="cta-box">
    <h2>Schedule a Low Vision Consultation</h2>
    <p>
      Our Inwood, NY office serves patients from Long Island, Queens, and Nassau County.
      Same-week appointments are often available.
    </p>
    <a href="https://AdvancedVisionLI.com/#contact" class="cta-btn">Request an Appointment</a>
    <span class="cta-phone">Or call us at <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>

  <h2 class="section-title">Frequently Asked Questions</h2>
  <div class="faq">
    ${faqHtml}
  </div>
</div>
`;

router.get("/low-vision-care", (_req, res) => {
  const html = ssrShell({
    title: "Low Vision Specialist Long Island, NY — Advanced Vision Long Island",
    description:
      "Low vision care in Inwood, Long Island, NY. We help patients with macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss maximize their remaining sight with optical aids and CBVH coverage assistance.",
    canonical: CANONICAL,
    schemaJsons: [SCHEMA_MEDICAL_WEB_PAGE, SCHEMA_SERVICE, SCHEMA_FAQ],
    bodyHtml,
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Low Vision Care", url: `${SITE_URL}/low-vision-care/` },
    ],
  });

  res
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=86400")
    .status(200)
    .send(html);
});

export default router;
