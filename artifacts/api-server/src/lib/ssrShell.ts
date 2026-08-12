interface SsrShellOptions {
  title: string;
  description: string;
  canonical: string;
  schemaJsons?: object[];
  bodyHtml: string;
  /** When provided, renders a visible breadcrumb nav and BreadcrumbList JSON-LD. */
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const NAP_ADDRESS = "148c Doughty Blvd, Inwood, NY 11096";
export const NAP_PHONE = "(718) 268-3937";
export const PRACTICE_NAME = "Advanced Vision Long Island";
export const SITE_URL = "https://AdvancedVisionLI.com";

// Prepended to every SSR page — signals entity identity to Google's Knowledge Graph.
const GLOBAL_SCHEMAS: object[] = [
  {
    "@context": "https://schema.org",
    // NOTE: @id must match the SPA homepage (/#organization). Verify GPS below with owner.
    "@id": `${SITE_URL}/#organization`,
    "@type": ["MedicalBusiness", "MedicalOrganization", "LocalBusiness"],
    name: PRACTICE_NAME,
    url: `${SITE_URL}/`,
    telephone: "+17182683937",
    address: {
      "@type": "PostalAddress",
      streetAddress: "148c Doughty Blvd",
      addressLocality: "Inwood",
      addressRegion: "NY",
      postalCode: "11096",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // TODO: owner should verify these coordinates match the actual entrance location.
      latitude: 40.6107,
      longitude: -73.7518,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: PRACTICE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

function schemaTag(obj: object): string {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>`;
}

function buildBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function buildBreadcrumbNav(breadcrumbs: Array<{ name: string; url: string }>): string {
  const items = breadcrumbs
    .map((crumb, i) => {
      const isLast = i === breadcrumbs.length - 1;
      if (isLast) {
        return `<li class="bc-item"><span class="bc-current" aria-current="page">${escapeHtml(crumb.name)}</span></li>`;
      }
      return `<li class="bc-item"><a href="${escapeHtml(crumb.url)}" class="bc-link">${escapeHtml(crumb.name)}</a><span class="bc-sep" aria-hidden="true">›</span></li>`;
    })
    .join("\n    ");
  return `<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="bc-list">
    ${items}
  </ol>
</nav>`;
}

export function ssrShell({ title, description, canonical, schemaJsons = [], bodyHtml, breadcrumbs }: SsrShellOptions): string {
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 1 ? [buildBreadcrumbSchema(breadcrumbs)] : [];
  const allSchemas = [...GLOBAL_SCHEMAS, ...schemaJsons, ...breadcrumbSchema];
  const schemaBlock = allSchemas.map(schemaTag).join("\n");
  const breadcrumbHtml = breadcrumbs && breadcrumbs.length > 1 ? buildBreadcrumbNav(breadcrumbs) : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content="${escapeHtml(PRACTICE_NAME)}" />
  <meta property="og:image" content="https://AdvancedVisionLI.com/images/logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="https://AdvancedVisionLI.com/images/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap" /></noscript>
  ${schemaBlock}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #0B3B49;
      --teal: #147E93;
      --coral: #e8856a;
      --coral-dark: #F4614B;
      --bg: #f5f7f6;
      --card: #ffffff;
      --text: #0B3B49;
      --text-muted: rgba(11,59,73,0.65);
    }
    body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    h1, h2, h3, h4 { font-family: 'Lora', Georgia, serif; font-weight: 500; }
    a { color: var(--teal); text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Nav */
    .site-nav { background: var(--navy); padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; min-height: 64px; }
    .site-nav .logo { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
    .site-nav .logo-mark { width: 36px; height: 36px; background: var(--coral); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .site-nav .logo-text { color: #fff; font-weight: 700; font-size: 1rem; line-height: 1.2; }
    .site-nav .logo-text small { display: block; font-size: 0.65rem; font-weight: 400; color: rgba(255,255,255,0.6); }
    .nav-links { display: flex; gap: 1.5rem; list-style: none; align-items: center; }
    .nav-links a { color: rgba(255,255,255,0.8); font-size: 0.875rem; font-weight: 500; transition: color 0.15s; }
    .nav-links a:hover { color: #fff; text-decoration: none; }
    .nav-cta { background: var(--coral); color: #fff !important; padding: 0.5rem 1.25rem; border-radius: 100px; font-weight: 600 !important; }
    .nav-cta:hover { background: var(--coral-dark); }
    @media (max-width: 600px) { .nav-links { gap: 0.75rem; } .nav-links .hide-mobile { display: none; } }

    /* Breadcrumb */
    .breadcrumb-nav { background: var(--bg); border-bottom: 1px solid rgba(11,59,73,0.08); padding: 0.5rem 1.5rem; }
    .bc-list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; list-style: none; max-width: 900px; margin: 0 auto; }
    .bc-item { display: flex; align-items: center; gap: 0.25rem; }
    .bc-link { font-size: 0.8rem; color: var(--teal); }
    .bc-link:hover { text-decoration: underline; }
    .bc-sep { font-size: 0.75rem; color: var(--text-muted); }
    .bc-current { font-size: 0.8rem; color: var(--text-muted); }

    /* Main content */
    .page-content { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
    .eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.75rem; }
    .page-title { font-size: 2.5rem; line-height: 1.15; color: var(--navy); margin-bottom: 1.25rem; }
    @media (max-width: 600px) { .page-title { font-size: 1.85rem; } }
    @media (max-width: 320px) { .page-title { font-size: 1.55rem; } }
    .lead { font-size: 1.1rem; color: var(--text-muted); max-width: 680px; margin-bottom: 2.5rem; line-height: 1.75; }
    .section-title { font-size: 1.5rem; color: var(--navy); margin: 2.5rem 0 1rem; }
    .prose p { color: var(--text-muted); margin-bottom: 1rem; }
    .prose ul { padding-left: 1.4rem; color: var(--text-muted); margin-bottom: 1rem; }
    .prose ul li { margin-bottom: 0.35rem; }
    .prose strong { color: var(--navy); }

    /* Skill cards */
    .skill-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; margin: 1.5rem 0 2rem; }
    .skill-card { background: var(--card); border-radius: 14px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .skill-card .skill-dot { width: 36px; height: 36px; border-radius: 50%; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: center; }
    .skill-card .skill-name { font-weight: 600; font-size: 0.9rem; color: var(--navy); margin-bottom: 0.2rem; }
    .skill-card .skill-def { font-size: 0.8rem; color: var(--text-muted); line-height: 1.45; }

    /* FAQ */
    .faq { margin: 2rem 0; }
    .faq-item { background: var(--card); border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    .faq-q { font-weight: 600; color: var(--navy); font-size: 1rem; margin-bottom: 0.5rem; }
    .faq-a { color: var(--text-muted); font-size: 0.93rem; line-height: 1.65; }

    /* Cause cards */
    .cause-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; margin: 1.5rem 0 2rem; }
    .cause-card { background: var(--card); border-radius: 14px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .cause-card .cause-name { font-weight: 600; font-size: 0.875rem; color: var(--navy); padding: 0.75rem 0.85rem 0.25rem; }
    .cause-card .cause-desc { font-size: 0.78rem; color: var(--text-muted); padding: 0 0.85rem 0.85rem; line-height: 1.5; }

    /* Activity pills */
    .activity-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 1.5rem; }
    .activity-pill { background: rgba(20,126,147,0.10); color: var(--teal); font-weight: 600; font-size: 0.85rem; padding: 0.4rem 1rem; border-radius: 100px; }

    /* CTA */
    .cta-box { background: var(--navy); color: #fff; border-radius: 20px; padding: 2.5rem 2rem; text-align: center; margin: 3rem 0 2rem; }
    .cta-box h2 { color: #fff; font-size: 1.6rem; margin-bottom: 0.75rem; }
    .cta-box p { color: rgba(255,255,255,0.75); margin-bottom: 1.5rem; }
    .cta-btn { display: inline-block; background: var(--coral); color: #fff; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 700; font-size: 1rem; text-decoration: none; transition: background 0.15s; }
    .cta-btn:hover { background: var(--coral-dark); text-decoration: none; }
    .cta-phone { display: block; margin-top: 0.75rem; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
    .cta-phone a { color: rgba(255,255,255,0.85); }

    /* NAP block */
    .nap-block { background: var(--card); border-radius: 16px; padding: 1.5rem 2rem; box-shadow: 0 1px 6px rgba(0,0,0,0.07); margin-bottom: 1.5rem; }
    .nap-block h2 { font-size: 1.3rem; margin-bottom: 0.75rem; }
    .nap-row { display: flex; align-items: flex-start; gap: 0.6rem; margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-muted); }
    .nap-label { font-weight: 600; color: var(--navy); min-width: 80px; }
    .nap-hours-grid { display: grid; grid-template-columns: auto 1fr; gap: 0.2rem 1rem; font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem; }

    /* Plan/access cards */
    .plan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; margin: 1.5rem 0 2rem; }
    .access-card { background: var(--card); border-radius: 14px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); min-width: 0; }

    /* Footer */
    .site-footer { background: var(--navy); color: rgba(255,255,255,0.65); padding: 2.5rem 1.5rem; }
    .footer-inner { max-width: 900px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; align-items: flex-start; }
    .footer-brand strong { color: #fff; font-weight: 700; font-size: 1rem; }
    .footer-brand p { font-size: 0.85rem; margin-top: 0.25rem; }
    .footer-brand a { color: rgba(255,255,255,0.75); }
    .footer-links { display: flex; flex-direction: column; gap: 0.35rem; }
    .footer-links a { color: rgba(255,255,255,0.65); font-size: 0.85rem; }
    .footer-links a:hover { color: #fff; }
    .footer-copy { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 0.5rem; }
  </style>
</head>
<body>

<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <a href="https://AdvancedVisionLI.com/" class="logo">
    <div class="logo-mark">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
    </div>
    <div class="logo-text">
      ${escapeHtml(PRACTICE_NAME)}
      <small>Inwood, NY</small>
    </div>
  </a>
  <ul class="nav-links">
    <li class="hide-mobile"><a href="https://AdvancedVisionLI.com/#vision-therapy">Vision Therapy</a></li>
    <li class="hide-mobile"><a href="https://AdvancedVisionLI.com/#low-vision">Low Vision</a></li>
    <li><a href="/contact" class="nav-cta">Schedule</a></li>
  </ul>
</nav>

${breadcrumbHtml}

<main>
${bodyHtml}
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <strong>${escapeHtml(PRACTICE_NAME)}</strong>
      <p>${escapeHtml(NAP_ADDRESS)}</p>
      <p><a href="tel:718-268-3937">${escapeHtml(NAP_PHONE)}</a></p>
      <p>Dr. Marcie Evans Stein, OD FABM OVDRA &nbsp;·&nbsp; Dr. Esther Moller, OD FAAO</p>
    </div>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="https://AdvancedVisionLI.com/">Home</a>
      <a href="/vision-therapy">Vision Therapy</a>
      <a href="/low-vision-care">Low Vision Care</a>
      <a href="/amblyopia">Amblyopia</a>
      <a href="/convergence-insufficiency">Convergence Insufficiency</a>
      <a href="/strabismus">Strabismus</a>
      <a href="/accommodative-dysfunction">Accommodative Dysfunction</a>
      <a href="/eye-tracking-disorder">Eye Tracking Disorder</a>
      <a href="/faq">FAQ</a>
      <a href="/contact">Contact</a>
      <span class="footer-copy">© ${new Date().getFullYear()} ${escapeHtml(PRACTICE_NAME)}. All rights reserved.</span>
      <span class="footer-copy">This website is for informational purposes only and does not constitute medical advice.</span>
    </nav>
  </div>
</footer>

</body>
</html>`;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
