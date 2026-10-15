import { Router } from "express";
import { ssrShell, escapeHtml, SITE_URL, CONTACT_URL } from "../lib/ssrShell";

const router = Router();

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://advancedvisionli.com/vision-therapy-long-island/#webpage",
  url: "https://advancedvisionli.com/vision-therapy-long-island/",
  name: "Vision Therapy on Long Island | Advanced Vision Long Island",
  description:
    "Doctor-supervised vision therapy on Long Island for children and adults — treating convergence insufficiency, lazy eye, eye teaming and focusing problems. Inwood, NY.",
  isPartOf: { "@id": "https://advancedvisionli.com/#website" },
  about: { "@type": "MedicalTherapy", name: "Vision Therapy" },
  author: { "@id": "https://advancedvisionli.com/#organization" },
  medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
};

const hubStyles = `
<style>
  .hub-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .hub-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .hub-hero h1 { color: #fff; font-size: 2.4rem; line-height: 1.15; margin-bottom: 1rem; }
  @media (max-width:600px) { .hub-hero h1 { font-size: 1.8rem; } }
  .hub-hero .lead { color: rgba(255,255,255,0.82); font-size: 1.05rem; max-width: 680px; margin: 0 auto 1.75rem; line-height: 1.75; }
  .hub-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; }
  .hub-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }
  .cond-list { list-style: none; padding: 0; margin: 1.25rem 0 2rem; display: grid; gap: 0.85rem; }
  .cond-list li { background: var(--card); border-radius: 14px; padding: 1rem 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
  .cond-list strong { color: var(--navy); }
  .cond-list p { margin: 0.25rem 0 0; font-size: 0.92rem; color: var(--text-muted); }
  .why-list { list-style: none; padding: 0; margin: 1.25rem 0 2rem; display: grid; gap: 0.85rem; }
  .why-list li { background: var(--card); border-radius: 14px; padding: 1rem 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); font-size: 0.95rem; color: var(--text-muted); }
  .why-list strong { color: var(--navy); }
  .area-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.85rem; margin: 1.25rem 0 2rem; }
  .area-card { background: var(--card); border-radius: 14px; padding: 1.1rem 1.25rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
  .area-card h3 { font-size: 1.02rem; color: var(--navy); margin-bottom: 0.35rem; }
  .area-card p { font-size: 0.9rem; color: var(--text-muted); margin: 0 0 0.5rem; }
  .area-card a { font-weight: 700; font-size: 0.9rem; }
  .steps { counter-reset: step; list-style: none; padding: 0; margin: 1.25rem 0 2rem; display: grid; gap: 0.85rem; }
  .steps li { background: var(--card); border-radius: 14px; padding: 1rem 1.25rem 1rem 3.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); position: relative; font-size: 0.93rem; color: var(--text-muted); }
  .steps li::before { counter-increment: step; content: counter(step); position: absolute; left: 1.1rem; top: 1rem; width: 1.9rem; height: 1.9rem; border-radius: 50%; background: var(--teal); color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; }
  .steps strong { color: var(--navy); display: block; margin-bottom: 0.2rem; }
</style>`;

function buildHubBody(): string {
  return `
${hubStyles}
<div class="hub-hero">
  <p class="eyebrow">Vision Therapy · Long Island, NY</p>
  <h1>Vision Therapy on Long Island</h1>
  <p class="lead">A child can have 20/20 eyesight and still struggle to read. When the problem is not how clearly the eyes see but how well they work together, glasses alone cannot fix it — and that is exactly what vision therapy treats.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Schedule an Evaluation</a>
</div>

<div class="page-content">
  <div class="prose">
    <p>At Advanced Vision Long Island in Inwood, NY, vision therapy is a doctor-supervised program of guided exercises and specialized lenses that retrains the visual system: how the eyes team, track, and focus, and how the brain interprets what the eyes take in. We work with children and adults from across Long Island, Queens, and the surrounding communities.</p>
  </div>

  <h2 class="section-title">What vision therapy treats</h2>
  <div class="prose">
    <p>Vision therapy addresses functional vision problems — the coordination and processing skills that standard eye exams do not always catch:</p>
  </div>
  <ul class="cond-list">
    <li><strong><a href="/convergence-insufficiency/">Convergence insufficiency</a></strong><p>Difficulty turning the eyes inward together for reading and close work, often causing eye strain, double vision, or loss of place.</p></li>
    <li><strong><a href="/amblyopia/">Amblyopia ("lazy eye")</a></strong><p>Reduced vision in one eye that needs active treatment beyond patching alone.</p></li>
    <li><strong><a href="/strabismus/">Strabismus (eye turn)</a></strong><p>Misalignment of the eyes affecting depth perception and comfortable single vision.</p></li>
    <li><strong><a href="/accommodative-dysfunction/">Accommodative dysfunction</a></strong><p>Focusing problems that make switching between near and far vision blurry or fatiguing.</p></li>
    <li><strong><a href="/eye-tracking-disorder/">Eye tracking disorders</a></strong><p>Difficulty following a line of text or a moving object smoothly.</p></li>
    <li><strong>Visual processing difficulties</strong><p>Trouble making sense of visual information, often mistaken for attention or learning problems. If several of these sound familiar in your child, our <a href="/vision-checklist/">parent symptom checklist</a> — sourced from OVDRA — is a good first step.</p></li>
  </ul>

  <h2 class="section-title">Why families across Long Island choose our practice</h2>
  <ul class="why-list">
    <li><strong>40+ years of experience.</strong> <a href="/dr-marcie-stein/">Dr. Marcie Evans Stein</a> has practiced developmental optometry for over four decades and is an OVDRA-recognized provider.</li>
    <li><strong>Doctor-supervised, individualized care.</strong> Every program is designed and overseen by our doctors — never a one-size-fits-all set of exercises.</li>
    <li><strong>Two specialists under one roof.</strong> Dr. Stein focuses on developmental optometry and binocular vision disorders; <a href="/dr-esther-moller/">Dr. Esther Moller, OD, FAAO</a>, is a Certified Low Vision Specialist whose expertise covers binocular vision and <a href="/low-vision-care/">low vision rehabilitation</a>.</li>
    <li><strong>All ages welcome.</strong> We treat school-age children, teens, and adults — including adults recovering visual comfort after concussion or living with long-standing eye teaming problems.</li>
    <li><strong>Accessible care.</strong> We are contracted with the Commission for the Blind of New York State, and vision therapy may be covered by medical insurance — we will help you navigate your benefits.</li>
  </ul>

  <h2 class="section-title">Areas we serve</h2>
  <div class="area-grid">
    <div class="area-card"><h3>Five Towns</h3><p>Right here in the Five Towns: families from Cedarhurst, Hewlett, Woodmere, and Lawrence reach our Inwood office in minutes.</p><a href="/vision-therapy-five-towns/">Vision therapy for Five Towns families →</a></div>
    <div class="area-card"><h3>Far Rockaway &amp; the Rockaways</h3><p>A short drive or bus ride from the Rockaway peninsula, with appointment times that work around the school day.</p><a href="/vision-therapy-far-rockaway/">Vision therapy near Far Rockaway →</a></div>
    <div class="area-card"><h3>Howard Beach</h3><p>Convenient for Queens families in Howard Beach, Ozone Park, and Lindenwood seeking a developmental optometrist.</p><a href="/vision-therapy-howard-beach/">Vision therapy near Howard Beach →</a></div>
    <div class="area-card"><h3>Valley Stream</h3><p>Serving Valley Stream, Elmont, and Franklin Square with full vision therapy and low vision services.</p><a href="/vision-therapy-valley-stream/">Vision therapy near Valley Stream →</a></div>
    <div class="area-card"><h3>Jamaica &amp; greater Queens</h3><p>Patients travel from Jamaica, St. Albans, and Springfield Gardens for specialized binocular vision care not available at a standard optical shop.</p><a href="/vision-therapy-jamaica/">Vision therapy near Jamaica →</a></div>
    <div class="area-card"><h3>Nassau &amp; Suffolk Counties</h3><p>Located right in Nassau County, we're a practical choice for families across western Nassau and reachable for eastern Nassau and Suffolk patients seeking a dedicated vision therapy practice.</p><a href="/vision-therapy/">About our vision therapy program →</a></div>
  </div>

  <h2 class="section-title">What to expect</h2>
  <ol class="steps">
    <li><strong>A comprehensive evaluation.</strong>Beyond a standard eye exam, we assess eye teaming, tracking, focusing, and visual processing to pinpoint exactly which skills need work. <a href="/vision-therapy/">Learn about our evaluations</a>.</li>
    <li><strong>A personalized program.</strong>Your doctor designs a sequence of in-office therapy sessions using guided exercises and therapeutic lenses, tailored to your diagnosis and goals.</li>
    <li><strong>Progress you can measure.</strong>We re-evaluate at set milestones so you can see the gains — steadier reading, less eye strain, more comfortable close work.</li>
    <li><strong>Support between visits.</strong>Most programs include guided home activities that reinforce what is accomplished in the office. Have questions first? Our <a href="/faq/">FAQs</a> cover candidacy, session length, and insurance.</li>
  </ol>

  <div class="cta-box">
    <h2>Take the first step</h2>
    <p>If you or your child is working harder than you should have to just to see comfortably, a functional vision evaluation can give you answers. We serve patients throughout Long Island, Queens, the Five Towns, and the Rockaways.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Request an Appointment</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

router.get("/vision-therapy-long-island", (_req, res) => {
  const html = ssrShell({
    title: "Vision Therapy on Long Island | Advanced Vision Long Island",
    description:
      "Doctor-supervised vision therapy on Long Island for children and adults — treating convergence insufficiency, lazy eye, eye teaming and focusing problems. Inwood, NY. Call (718) 268-3937.",
    canonical: "https://advancedvisionli.com/vision-therapy-long-island/",
    schemaJsons: [hubSchema],
    bodyHtml: buildHubBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy on Long Island", url: `${SITE_URL}/vision-therapy-long-island/` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(html);
});

export default router;
