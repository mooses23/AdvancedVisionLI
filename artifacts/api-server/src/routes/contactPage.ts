import { Router, type IRouter } from "express";
import { ssrShell, SITE_URL, CONTACT_URL } from "../lib/ssrShell";

const router: IRouter = Router();

const CANONICAL = "https://AdvancedVisionLI.com/contact/";

const SCHEMA_CONTACT_PAGE = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Advanced Vision Long Island",
  "description":
    "Contact Advanced Vision Long Island to schedule a vision therapy or low vision consultation. Located at 148c Doughty Blvd, Inwood, NY 11096.",
  "url": CANONICAL,
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Advanced Vision Long Island",
    "url": "https://AdvancedVisionLI.com",
    "telephone": "+17182683937",
    "email": "doctors@AdvancedVisionLI.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "148c Doughty Blvd",
      "addressLocality": "Inwood",
      "addressRegion": "NY",
      "postalCode": "11096",
      "addressCountry": "US",
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "09:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "09:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:00" },
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.6201,
      "longitude": -73.7543,
    },
    "hasMap": "https://maps.google.com/?q=148c+Doughty+Blvd+Inwood+NY+11096",
    "medicalSpecialty": ["Optometry", "Vision Therapy", "Low Vision Rehabilitation"],
  },
};

const bodyHtml = `
<div class="page-content">
  <p class="eyebrow">Get in Touch</p>
  <h1 class="page-title">Contact Advanced Vision Long Island</h1>
  <p class="lead">
    Schedule a vision therapy or low vision consultation — or simply ask us a question.
    We serve patients from Inwood, Long Island, Queens, and Nassau County.
  </p>

  <div class="nap-block">
    <h2>Visit or Call Us</h2>
    <div class="nap-row">
      <span class="nap-label">Address</span>
      <span>
        148c Doughty Blvd, Inwood, NY 11096
        &nbsp;—&nbsp;
        <a href="https://maps.google.com/?q=148c+Doughty+Blvd+Inwood+NY+11096" target="_blank" rel="noopener">
          Get directions
        </a>
      </span>
    </div>
    <div class="nap-row">
      <span class="nap-label">Phone</span>
      <span><a href="tel:718-268-3937">(718) 268-3937</a></span>
    </div>
    <div class="nap-row">
      <span class="nap-label">Email</span>
      <span><a href="mailto:doctors@AdvancedVisionLI.com">doctors@AdvancedVisionLI.com</a></span>
    </div>
    <div class="nap-row">
      <span class="nap-label">Doctors</span>
      <span>Dr. Marcie Evans Stein, OD FABM OVDRA &nbsp;·&nbsp; Dr. Esther Moller, OD FAAO</span>
    </div>
    <div class="nap-row" style="margin-top:0.75rem;">
      <span class="nap-label">Hours</span>
      <div class="nap-hours-grid">
        <span>Monday – Friday</span><span>9:00 AM – 5:00 PM</span>
        <span>Saturday – Sunday</span><span>Closed</span>
      </div>
    </div>
  </div>

  <div class="prose">
    <p>
      The fastest way to reach us is by phone. For new patient consultations, please mention whether
      you are inquiring about <strong>vision therapy</strong>, <strong>low vision care</strong>, or a
      general optometric examination so we can schedule the right amount of time for your visit.
    </p>
    <p>
      If you prefer to send a message, use the contact form on our
      <a href="${CONTACT_URL}">main website</a> and we will respond within
      one business day.
    </p>
  </div>

  <div class="cta-box" style="margin-top:2rem;">
    <h2>Request an Appointment</h2>
    <p>Use the contact form on our main website to describe your needs and preferred times.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Send a Message</a>
    <span class="cta-phone">Or call us directly: <a href="tel:718-268-3937">(718) 268-3937</a></span>
  </div>

  <h2 class="section-title" style="margin-top:2.5rem;">Our Services</h2>
  <div class="prose">
    <ul>
      <li><a href="/vision-therapy/"><strong>Vision Therapy</strong></a> — treatment for binocular vision disorders, convergence insufficiency, amblyopia, and learning-related vision problems</li>
      <li><a href="/low-vision-care/"><strong>Low Vision Care</strong></a> — consultation and optical aids for macular degeneration, glaucoma, diabetic retinopathy, and post-stroke vision loss</li>
    </ul>
  </div>
</div>
`;

router.get("/contact", (_req, res) => {
  const html = ssrShell({
    title: "Contact Advanced Vision Long Island — Inwood, NY",
    description:
      "Contact Advanced Vision Long Island to schedule a vision therapy or low vision consultation. Located at 148c Doughty Blvd, Inwood, NY 11096. Call (718) 268-3937.",
    canonical: CANONICAL,
    schemaJsons: [SCHEMA_CONTACT_PAGE],
    bodyHtml,
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Contact", url: `${SITE_URL}/contact/` },
    ],
  });

  res
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=86400")
    .status(200)
    .send(html);
});

export default router;
