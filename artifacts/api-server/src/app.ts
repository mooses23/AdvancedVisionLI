import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const isDevelopment = process.env.NODE_ENV !== "production";

const allowedOrigins = [
  "https://AdvancedVisionLI.com",
  "https://www.AdvancedVisionLI.com",
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

export default app;
