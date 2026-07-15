// Write to stderr immediately — before any imports — so Cloud Run captures
// output even if the bundle fails to load or crashes during initialization.
process.stderr.write("[startup] api-server process started\n");

process.on("uncaughtException", (err) => {
  process.stderr.write(`[uncaughtException] ${err.stack ?? err.message}\n`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  process.stderr.write(`[unhandledRejection] ${String(reason)}\n`);
  process.exit(1);
});

import app from "./app";
import { logger } from "./lib/logger";

// Cloud Run injects PORT; fall back to 8080 so a missing env var
// never crashes the process before we can log anything.
const port = Number(process.env["PORT"] ?? 8080);

if (Number.isNaN(port) || port <= 0) {
  process.stderr.write(`[startup] Invalid PORT value: "${process.env["PORT"]}"\n`);
  process.exit(1);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
