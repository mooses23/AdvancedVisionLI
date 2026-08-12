import { Router, type IRouter } from "express";
import { ssrShell, NAP_ADDRESS, NAP_PHONE, PRACTICE_NAME, SITE_URL } from "../lib/ssrShell";

const router: IRouter = Router();

const CANONICAL = "https://AdvancedVisionLI.com/vision-therapy";

const SCHEMA_MEDICAL_WEB_PAGE = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Vision Therapy — Advanced Vision Long Island",
  "description": "Optometric vision therapy for children and adults in Inwood, NY. We treat binocular vision disorders, convergence insufficiency, amblyopia, and learning-related vision problems.",
  "url": CANONICAL,
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Binocular Vision Disorder"
  }
};

const SCHEMA_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Vision Therapy",
  "name": "Optometric Vision Therapy",
  "description": "A personalized program of exercises and specialized lenses designed to develop, improve, or enhance a patient's visual skills for school, work, and daily life.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "areaServed": [
    { "@type": "City", "name": "Inwood, NY" },
    { "@type": "City", "name": "Long Island, NY" },
    { "@type": "City", "name": "Queens, NY" },
    { "@type": "City", "name": "Nassau County, NY" }
  ],
  "url": CANONICAL
};

const bodyHtml = `
<div class="page-content">
  <p class="eyebrow">Optometric Specialty</p>
  <h1 class="page-title">Vision Therapy for Children &amp; Adults in Inwood, NY</h1>
  <p class="lead">
    Vision therapy is a personalized, doctor-supervised program that develops, improves, or enhances a
    patient's visual skills — so they can see to work, rather than work to see.
  </p>

  <div class="prose">
    <p>
      Many vision problems go undetected by standard eye exams because they involve how the brain
      <em>processes</em> visual information, not just how clearly the eye sees a chart. At
      <strong>Advanced Vision Long Island</strong>, our doctors specialize in diagnosing and treating
      these functional and binocular vision disorders using evidence-based vision therapy.
    </p>
    <p>
      Vision therapy utilizes various exercises combined with specialized lenses to train the internal
      and external eye muscles, together with the brain. The goal is to achieve harmonious, smooth
      coordination of the two eyes — eliminating the extra effort that robs children of reading stamina
      and adults of comfortable screen time.
    </p>
  </div>

  <h2 class="section-title">Visual Skills We Develop</h2>
  <div class="skill-grid">
    <div class="skill-card">
      <div class="skill-dot" style="background:#5bbfb8;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
      <div class="skill-name">Tracking</div>
      <div class="skill-def">Smoothly follow a moving object with your eyes</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#e07060;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <div class="skill-name">Fixation</div>
      <div class="skill-def">Hold a steady gaze on a stationary object</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#5cb86a;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.62"/></svg>
      </div>
      <div class="skill-name">Focus Change</div>
      <div class="skill-def">Switch focus between near and far without blur</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#6a8fc0;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      </div>
      <div class="skill-name">Depth Perception</div>
      <div class="skill-def">Judge space between objects accurately</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#e8a840;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
      </div>
      <div class="skill-name">Visual Processing</div>
      <div class="skill-def">How our brain interprets and uses visual information</div>
    </div>
    <div class="skill-card">
      <div class="skill-dot" style="background:#e8a840;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </div>
      <div class="skill-name">Binocularity</div>
      <div class="skill-def">Coordinate both eyes smoothly together</div>
    </div>
  </div>

  <h2 class="section-title">Conditions We Treat</h2>
  <div class="prose">
    <ul>
      <li><strong>Convergence Insufficiency</strong> — eyes struggle to work together at near distances, causing eyestrain and double vision during reading</li>
      <li><strong>Amblyopia (Lazy Eye)</strong> — reduced vision in one eye due to abnormal visual development during childhood</li>
      <li><strong>Strabismus (Crossed Eyes)</strong> — eyes that point in different directions, causing misalignment and suppression</li>
      <li><strong>Binocular Vision Disorder</strong> — the two eyes fail to work as a coordinated team, leading to headaches, fatigue, and difficulty concentrating</li>
      <li><strong>Learning-Related Vision Problems</strong> — visual processing deficits that interfere with reading fluency and comprehension</li>
      <li><strong>Post-Concussion Vision Syndrome</strong> — visual symptoms following traumatic brain injury including double vision, light sensitivity, and tracking difficulty</li>
    </ul>
  </div>

  <h2 class="section-title">The Vision Therapy Process</h2>
  <div class="prose">
    <p>
      Every program begins with a comprehensive functional vision evaluation to identify exactly which visual
      skills are deficient and by how much. Dr. Marcie Evans Stein and Dr. Esther Moller then design a
      customized therapy plan that typically includes:
    </p>
    <ul>
      <li>Weekly in-office therapy sessions using specialized lenses, prisms, and instruments</li>
      <li>Home reinforcement activities between visits</li>
      <li>Progress evaluations to adjust the program as skills improve</li>
    </ul>
    <p>
      Treatment duration varies by condition and individual, but most patients complete a program in
      12–36 weeks. Results are typically lasting because vision therapy trains the brain — not just a
      temporary compensation.
    </p>
  </div>

  <div class="cta-box">
    <h2>Ready to Start?</h2>
    <p>
      Schedule a vision therapy consultation at our Inwood, NY office.
      We serve patients from throughout Long Island, Queens, and Nassau County.
    </p>
    <a href="https://AdvancedVisionLI.com/#contact" class="cta-btn">Schedule a Consultation</a>
    <span class="cta-phone">Or call us at <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>
</div>
`;

router.get("/vision-therapy", (_req, res) => {
  const html = ssrShell({
    title: "Vision Therapy Inwood NY — Advanced Vision Long Island",
    description:
      "Optometric vision therapy for children and adults in Inwood, NY. We treat binocular vision disorders, convergence insufficiency, amblyopia, and learning-related vision problems. Serving Long Island, Queens, and Nassau County.",
    canonical: CANONICAL,
    schemaJsons: [SCHEMA_MEDICAL_WEB_PAGE, SCHEMA_SERVICE],
    bodyHtml,
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy", url: `${SITE_URL}/vision-therapy` },
    ],
  });

  res
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=86400")
    .status(200)
    .send(html);
});

export default router;
