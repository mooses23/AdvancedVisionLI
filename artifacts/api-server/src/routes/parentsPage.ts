import { Router } from "express";
import { ssrShell, SITE_URL, CONTACT_URL } from "../lib/ssrShell";

const router = Router();

const parentsSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://advancedvisionli.com/vision-therapy-for-children/#webpage",
  url: "https://advancedvisionli.com/vision-therapy-for-children/",
  name: "Is Vision Therapy Right for My Child? | Advanced Vision Long Island",
  description:
    "Wondering if vision therapy can help your child? Learn what the first visit looks like, what therapy feels like for kids, and when to schedule an evaluation. Inwood, NY.",
  isPartOf: { "@id": "https://advancedvisionli.com/#website" },
  about: { "@type": "MedicalTherapy", name: "Vision Therapy" },
  author: { "@id": "https://advancedvisionli.com/#organization" },
  medicalAudience: { "@type": "ParentAudience", audienceType: "Parent" },
};

const parentsStyles = `
<style>
  .parents-hero { background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); padding: 3rem 1.5rem 3.5rem; text-align: center; }
  .parents-hero .eyebrow { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
  .parents-hero h1 { color: #fff; font-size: 2.4rem; line-height: 1.15; margin-bottom: 1rem; }
  @media (max-width:600px) { .parents-hero h1 { font-size: 1.8rem; } }
  .parents-hero .lead { color: rgba(255,255,255,0.82); font-size: 1.05rem; max-width: 660px; margin: 0 auto 1.75rem; line-height: 1.75; }
  .parents-hero .hero-cta { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; }
  .parents-hero .hero-cta:hover { background: var(--coral-dark); text-decoration: none; }
</style>`;

function buildParentsBody(): string {
  return `
${parentsStyles}
<div class="parents-hero">
  <p class="eyebrow">For Parents · Inwood, NY</p>
  <h1>Is Vision Therapy Right for My Child?</h1>
  <p class="lead">If your child is bright but struggling in school, the problem may not be attention or effort — it may be how their eyes work together. Here is what to know, and what happens next.</p>
  <a href="${CONTACT_URL}" class="hero-cta">Ask Us a Question</a>
</div>

<div class="page-content">
  <div class="prose">
    <p>If your child is bright but struggling — losing their place while reading, getting headaches during homework, avoiding reading altogether, or tiring quickly during close work — it is easy to assume the problem is attention, effort, or learning style. Often, though, the real issue is functional: their eyes are not teaming, tracking, or focusing the way reading demands.</p>
    <p>Here is the reassuring part: these are skills, and skills can be trained. That is what vision therapy does.</p>
  </div>

  <h2 class="section-title">What the first visit looks like</h2>
  <div class="prose">
    <p>There is nothing scary about it. At the first visit, one of our doctors spends unhurried time with your child, playing what feel like games: following a moving target, switching focus between near and far, and reading short passages while we watch how their eyes work together. You stay with your child the whole time, and we explain everything we find in plain language before you leave.</p>
    <p>If we identify a functional vision problem, we will tell you honestly whether vision therapy is likely to help — and if it is not the right answer, we will tell you that too, and point you toward what is.</p>
  </div>

  <h2 class="section-title">What therapy itself feels like for kids</h2>
  <div class="prose">
    <p>Most children actually enjoy their sessions. The exercises look like games and puzzles, often using special lenses, prisms, and computer-guided activities. Sessions are one-on-one, always supervised by our doctors, and paced to your child's age and stamina.</p>
    <p>Between visits, short guided activities at home keep the progress moving. And at set milestones, we re-test — so you are never guessing whether it is working. You will see it in the reading, the homework time, and the headaches that stop showing up.</p>
  </div>

  <h2 class="section-title">A gentle next step</h2>
  <div class="prose">
    <p>You do not need to be sure. If anything on the <a href="/vision-checklist/">symptom checklist</a> sounded familiar, that is reason enough for a conversation. Call us at <strong>(718) 268-3937</strong> — we will answer your questions honestly, and if an evaluation makes sense, we will schedule it at a time that works around school.</p>
    <p><em><a href="/dr-marcie-stein/">Dr. Marcie Evans Stein</a> has guided children through vision therapy for over 40 years.</em></p>
  </div>

  <div class="cta-box">
    <h2>Start with a conversation</h2>
    <p>No referral needed to talk to us. Tell us what you're seeing at home or in school, and we'll give you an honest read on whether a functional vision evaluation makes sense.</p>
    <a href="${CONTACT_URL}" class="cta-btn">Contact Us</a>
    <span class="cta-phone">or call <a href="tel:718-268-3937">(718) 268-EYES (3937)</a></span>
  </div>

</div>`;
}

router.get("/vision-therapy-for-children", (_req, res) => {
  const html = ssrShell({
    title: "Is Vision Therapy Right for My Child? | Advanced Vision Long Island",
    description:
      "Wondering if vision therapy can help your child? Learn what the first visit looks like, what therapy feels like for kids, and when to schedule an evaluation. Inwood, NY.",
    canonical: "https://advancedvisionli.com/vision-therapy-for-children/",
    schemaJsons: [parentsSchema],
    bodyHtml: buildParentsBody(),
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Vision Therapy for Children", url: `${SITE_URL}/vision-therapy-for-children/` },
    ],
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(html);
});

export default router;
