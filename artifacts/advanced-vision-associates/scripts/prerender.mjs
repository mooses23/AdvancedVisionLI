/**
 * Pre-render all SSR pages as static HTML files so Replit's static file
 * handler serves the correct title/canonical/meta for each page in production.
 *
 * Run after `vite build`. Writes dist/public/<route>/index.html for every
 * page served by the API server.
 *
 * The static handler's "/*" → "/index.html" fallback only fires when no
 * matching static file exists, so these pre-rendered files take priority.
 */

import { spawn, execSync } from 'node:child_process';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist/public');
const workspaceRoot = path.resolve(__dirname, '../../..');
const apiServerDir = path.resolve(__dirname, '../../api-server');
const apiServerDist = path.resolve(apiServerDir, 'dist/index.mjs');

// ---------------------------------------------------------------------------
// Ensure the API server is compiled
// ---------------------------------------------------------------------------
try {
  await access(apiServerDist);
  console.log('API server already built — skipping build step.');
} catch {
  console.log('Building API server for prerender...');
  execSync('pnpm --filter @workspace/api-server run build', {
    stdio: 'inherit',
    cwd: workspaceRoot,
  });
}

// ---------------------------------------------------------------------------
// Start the API server on an ephemeral port
// ---------------------------------------------------------------------------
const PORT = 19876;

const server = spawn('node', [apiServerDist], {
  env: { ...process.env, PORT: String(PORT), NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false,
});

server.stdout.on('data', () => {}); // drain stdout
server.stderr.on('data', (chunk) => {
  // Only surface real errors, not the normal startup log
  const msg = chunk.toString();
  if (msg.includes('Error') || msg.includes('error')) process.stderr.write(msg);
});

server.on('error', (err) => {
  console.error('Failed to start API server for prerender:', err.message);
  process.exit(1);
});

// Poll until the server responds
await new Promise((resolve, reject) => {
  const deadline = Date.now() + 20_000;
  const poll = async () => {
    if (Date.now() > deadline) {
      reject(new Error('API server did not start within 20 s'));
      return;
    }
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.ok) { resolve(undefined); return; }
    } catch {
      // not ready yet
    }
    setTimeout(poll, 250);
  };
  setTimeout(poll, 500);
});

console.log(`API server ready on :${PORT} — prerendering pages…`);

// ---------------------------------------------------------------------------
// Routes to prerender  ← keep in sync with sitemapRoute.ts
// ---------------------------------------------------------------------------
const ROUTES = [
  'vision-therapy',
  'low-vision-care',
  'contact',
  'faq',
  'vision-checklist',
  'amblyopia',
  'convergence-insufficiency',
  'strabismus',
  'accommodative-dysfunction',
  'eye-tracking-disorder',
  'dr-marcie-stein',
  'dr-esther-moller',
  'vision-therapy-specialist',
  'low-vision-specialist',
  'vision-therapy-insurance',
  'vision-therapy-long-island',
  'vision-therapy-for-children',
  'vision-therapy-far-rockaway',
  'vision-therapy-howard-beach',
  'vision-therapy-valley-stream',
  'vision-therapy-five-towns',
  'vision-therapy-jamaica',
];

// ---------------------------------------------------------------------------
// Fetch & write each page
// ---------------------------------------------------------------------------
let ok = 0;
let fail = 0;

for (const route of ROUTES) {
  const url = `http://localhost:${PORT}/${route}`;
  try {
    const r = await fetch(url);
    if (!r.ok) {
      console.warn(`  ✗ /${route} → HTTP ${r.status}`);
      fail++;
      continue;
    }
    const html = await r.text();
    const outDir = path.join(distDir, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
    console.log(`  ✓ /${route}`);
    ok++;
  } catch (err) {
    console.warn(`  ✗ /${route} → ${err.message}`);
    fail++;
  }
}

// ---------------------------------------------------------------------------
// Shutdown
// ---------------------------------------------------------------------------
server.kill('SIGTERM');

if (fail > 0) {
  console.error(`\nPrerender finished with ${fail} failure(s). Check logs above.`);
  process.exit(1);
} else {
  console.log(`\nPrerender complete — ${ok} page(s) written to dist/public/.`);
}
