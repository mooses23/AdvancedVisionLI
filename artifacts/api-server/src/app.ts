import express, { type Express } from "express";
import { ssrShell, SITE_URL } from "./lib/ssrShell";
import cors from "cors";
import pinoHttp from "pino-http";
import router, { visionTherapyRouter, lowVisionCareRouter, contactPageRouter, faqPageRouter, checklistPageRouter, conditionPagesRouter, doctorPagesRouter, sitemapRouter, visionTherapySpecialistRouter, lowVisionSpecialistRouter, insurancePageRouter, serviceAreaPagesRouter } from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const isDevelopment = process.env.NODE_ENV !== "production";

const allowedOrigins = [
  "https://advancedvisionli.com",
  "https://www.advancedvisionli.com",
  "https://advanced-vision-li.replit.app",
  process.env.ALLOWED_ORIGIN,
  process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : undefined,
].filter((origin): origin is string => Boolean(origin));

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isDevelopment || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check — Cloud Run startup probes hit GET / by default.
// Returning 200 here ensures the promote step succeeds even if the
// platform doesn't honour the custom [services.production.health.startup] path.
// v2: force fresh build after standby-build cache miss
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

// Canonical URL enforcement: redirect bare-slug paths to trailing-slash form (301).
// Covers any SSR page served from a directory index. Excludes root (/), static
// asset paths (anything with a file extension), and /api/* routes.
app.use((req, res, next) => {
  const p = req.path;
  if (p !== "/" && !p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p) && p !== "/api" && !p.startsWith("/api/")) {
    const target = req.url.replace(p, p + "/");
    return res.redirect(301, target);
  }
  next();
});

// SSR HTML pages — public, crawlable, no /api prefix
app.use(visionTherapyRouter);
app.use(lowVisionCareRouter);
app.use(contactPageRouter);
app.use(faqPageRouter);
app.use(checklistPageRouter);
app.use(conditionPagesRouter);
app.use(doctorPagesRouter);
app.use(sitemapRouter);
app.use(visionTherapySpecialistRouter);
app.use(lowVisionSpecialistRouter);
app.use(insurancePageRouter);
app.use(serviceAreaPagesRouter);

// 404 catch-all — must be registered AFTER all routes
app.use((_req, res) => {
  const html = ssrShell({
    title: "Page Not Found — Advanced Vision Long Island",
    description:
      "The page you requested could not be found. Return to the Advanced Vision Long Island homepage.",
    canonical: `${SITE_URL}/`,
    bodyHtml: `
<div class="page-content" style="text-align:center;padding:5rem 1.5rem;">
  <p class="eyebrow">404 · Not Found</p>
  <h1 class="page-title">Page not found</h1>
  <p class="lead">Sorry, we couldn't find the page you were looking for. It may have moved or the link may be incorrect.</p>
  <a href="https://AdvancedVisionLI.com/" class="cta-btn" style="display:inline-block;margin-top:1rem;">Return to Homepage</a>
</div>`,
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8").status(404).send(html);
});

export default app;
