#!/usr/bin/env node
/**
 * Schema validation script for /faq and /vision-checklist pages.
 *
 * Starts the API server on an ephemeral port, fetches both pages,
 * extracts every <script type="application/ld+json"> block, and
 * validates each block against the relevant schema.org spec.
 *
 * Exit 0 = all checks passed.
 * Exit 1 = one or more checks failed (details printed to stderr).
 */

import { createServer } from "http";
import { spawn } from "child_process";
import { once } from "events";

// ── helpers ──────────────────────────────────────────────────────────────────

const PASS = "✓";
const FAIL = "✗";
let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ${PASS} ${message}`);
  } else {
    console.error(`  ${FAIL} ${message}`);
    failures++;
  }
}

/** Strip HTML tags from a string. */
function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

/** Extract all JSON-LD blocks from an HTML string. */
function extractJsonLd(html) {
  const blocks = [];
  const re = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch (e) {
      console.error(`  ${FAIL} JSON-LD parse error: ${e.message}`);
      failures++;
    }
  }
  return blocks;
}

/** Fetch a URL and return the response text. */
async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── validators ───────────────────────────────────────────────────────────────

function validateFaqPage(schema) {
  console.log("\n[FAQPage]");
  assert(schema["@context"] === "https://schema.org", "@context is https://schema.org");
  assert(schema["@type"] === "FAQPage", '@type is FAQPage');

  const entities = schema.mainEntity;
  assert(Array.isArray(entities) && entities.length > 0, `mainEntity is a non-empty array (${entities?.length ?? 0} items)`);

  if (!Array.isArray(entities)) return;

  entities.forEach((q, i) => {
    const label = `Q${i + 1}`;
    assert(q["@type"] === "Question", `${label}: @type is Question`);
    assert(typeof q.name === "string" && q.name.trim().length > 0, `${label}: name is non-empty`);
    assert(q.acceptedAnswer?.["@type"] === "Answer", `${label}: acceptedAnswer @type is Answer`);
    const text = q.acceptedAnswer?.text ?? "";
    const stripped = stripTags(text);
    assert(stripped.length > 0, `${label}: acceptedAnswer.text is non-empty after stripping HTML`);
    // Must not contain raw HTML tags in the structured data text field
    assert(!/<[^>]+>/.test(text), `${label}: acceptedAnswer.text contains no HTML tags`);
  });
}

function validateBreadcrumbList(schema) {
  console.log("\n[BreadcrumbList]");
  assert(schema["@context"] === "https://schema.org", "@context is https://schema.org");
  assert(schema["@type"] === "BreadcrumbList", "@type is BreadcrumbList");

  const items = schema.itemListElement;
  assert(Array.isArray(items) && items.length === 2, `itemListElement has exactly 2 items (found ${items?.length ?? 0})`);

  if (!Array.isArray(items)) return;

  items.forEach((item, i) => {
    const expected = i + 1;
    assert(item["@type"] === "ListItem", `Item ${i}: @type is ListItem`);
    assert(item.position === expected, `Item ${i}: position is ${expected} (got ${item.position})`);
    assert(typeof item.name === "string" && item.name.trim().length > 0, `Item ${i}: name is non-empty`);
    assert(
      typeof item.item === "string" && /^https?:\/\/.+/.test(item.item),
      `Item ${i}: item is a valid absolute URL (got "${item.item}")`
    );
  });
}

function validateWebPage(schema) {
  console.log("\n[WebPage]");
  assert(schema["@context"] === "https://schema.org", "@context is https://schema.org");
  assert(schema["@type"] === "WebPage", "@type is WebPage");
  assert(typeof schema.name === "string" && schema.name.trim().length > 0, "name is non-empty");
  assert(typeof schema.description === "string" && schema.description.trim().length > 0, "description is non-empty");
  assert(
    typeof schema.url === "string" && /^https?:\/\/.+/.test(schema.url),
    `url is a valid absolute URL (got "${schema.url}")`
  );

  const pub = schema.publisher;
  assert(pub != null, "publisher is present");
  if (pub) {
    assert(
      pub["@type"] === "Organization" || pub["@type"] === "MedicalOrganization",
      `publisher @type is Organization or MedicalOrganization (got "${pub["@type"]}")`
    );
    assert(typeof pub.name === "string" && pub.name.trim().length > 0, "publisher.name is non-empty");
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Find a free port by binding temporarily.
  const tmp = createServer();
  await new Promise((resolve) => tmp.listen(0, "127.0.0.1", resolve));
  const port = tmp.address().port;
  await new Promise((resolve) => tmp.close(resolve));

  console.log(`Starting API server on port ${port} …`);

  const proc = spawn("node", ["dist/index.mjs"], {
    cwd: new URL("..", import.meta.url).pathname,
    env: { ...process.env, PORT: String(port), NODE_ENV: "test", LOG_LEVEL: "silent" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  // Wait for the server to be ready (poll with retries).
  const baseUrl = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`${baseUrl}/faq`, { signal: AbortSignal.timeout(1000) });
      if (res.ok) { ready = true; break; }
    } catch {
      // not ready yet
    }
  }

  if (!ready) {
    proc.kill();
    console.error("Server did not start in time.");
    process.exit(1);
  }

  console.log("Server ready.\n");

  try {
    // ── /faq ────────────────────────────────────────────────────────────────
    console.log("=== GET /faq ===");
    const faqHtml = await fetchText(`${baseUrl}/faq`);
    const faqBlocks = extractJsonLd(faqHtml);
    assert(faqBlocks.length >= 2, `Found ${faqBlocks.length} JSON-LD block(s) (expected ≥ 2)`);

    const faqPage = faqBlocks.find((b) => b["@type"] === "FAQPage");
    const breadcrumb = faqBlocks.find((b) => b["@type"] === "BreadcrumbList");

    assert(faqPage != null, "FAQPage block is present");
    assert(breadcrumb != null, "BreadcrumbList block is present");

    if (faqPage) validateFaqPage(faqPage);
    if (breadcrumb) validateBreadcrumbList(breadcrumb);

    // ── /vision-checklist ────────────────────────────────────────────────────
    console.log("\n=== GET /vision-checklist ===");
    const clHtml = await fetchText(`${baseUrl}/vision-checklist`);
    const clBlocks = extractJsonLd(clHtml);
    assert(clBlocks.length >= 1, `Found ${clBlocks.length} JSON-LD block(s) (expected ≥ 1)`);

    const webPage = clBlocks.find((b) => b["@type"] === "WebPage");
    assert(webPage != null, "WebPage block is present");
    if (webPage) validateWebPage(webPage);

  } finally {
    proc.kill();
  }

  // ── summary ──────────────────────────────────────────────────────────────
  console.log("\n─────────────────────────────────────────");
  if (failures === 0) {
    console.log(`${PASS} All schema checks passed.`);
    process.exit(0);
  } else {
    console.error(`${FAIL} ${failures} check(s) failed.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
