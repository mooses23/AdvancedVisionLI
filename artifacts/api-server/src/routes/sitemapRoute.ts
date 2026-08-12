import { Router } from "express";
import { SERVICE_AREA_SLUGS } from "./serviceAreaPages";

const router = Router();

const BASE = "https://AdvancedVisionLI.com";

// All public SSR URLs. Update this list whenever a new SSR route is added.
// Service area slugs are imported from serviceAreaPages.ts — single source of truth.
const SSR_URLS = [
  "/",
  "/vision-therapy/",
  "/low-vision-care/",
  "/contact/",
  "/faq/",
  "/vision-checklist/",
  "/amblyopia/",
  "/convergence-insufficiency/",
  "/strabismus/",
  "/accommodative-dysfunction/",
  "/eye-tracking-disorder/",
  "/dr-marcie-stein/",
  "/dr-esther-moller/",
  "/vision-therapy-specialist/",
  "/low-vision-specialist/",
  "/vision-therapy-insurance/",
  ...SERVICE_AREA_SLUGS,
];

router.get("/sitemap.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = SSR_URLS.map(
    (path) => `
  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(xml);
});

export default router;
