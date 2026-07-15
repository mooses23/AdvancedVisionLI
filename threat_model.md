# Threat Model

## Project Overview

Advanced Vision Associates is a static React marketing/lead-generation site for a vision-therapy practice in Inwood, NY. It is served by Vite and has a companion Express 5 API server. The site collects contact form submissions (name, phone, email, symptom checklist) and will route them to the practice's inbox. The project is not yet deployed.

**Tech stack:** React + Vite (frontend), Express 5 + TypeScript (API), PostgreSQL + Drizzle ORM (planned), pnpm workspaces, Node.js 24.

## Assets

- **Patient contact data** — name, phone number, email address, and selected symptoms submitted via the contact form. This is sensitive PII that should be transmitted securely and never logged.
- **Application secrets** — `DATABASE_URL` and any future third-party service keys (Formspree, email provider). Exposure would allow unauthorized database access or email abuse.
- **API server** — the Express application at `artifacts/api-server`; currently minimal but the planned surface for form submission and any future features.

## Trust Boundaries

- **Browser → API** — all requests cross this boundary. The API must not trust any client-supplied data without validation.
- **API → Email/Form provider** — when contact form submission is wired up (Task #40), the API will call an outbound service (Formspree or SMTP). Credentials for that service must be kept server-side.
- **Public surface** — the React site and API are entirely public-facing with no authentication. All endpoints are unauthenticated; there is no admin surface yet.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/app.ts` (Express app), `artifacts/advanced-vision-associates/index.html` (Vite SPA root)
- **Highest-risk code areas:** `artifacts/api-server/src/app.ts` (CORS, middleware), future contact-form route once Task #40 is implemented
- **Public vs. authenticated:** Everything is currently public; no auth exists
- **Dev-only areas (skip unless proven reachable):** `artifacts/mockup-sandbox/` (design canvas, `/__mockup` path)

## Threat Categories

### Spoofing / Authentication

No user authentication exists yet. Not applicable until user accounts are added.

### Tampering

The contact form performs client-side Zod validation only. Once form submission hits a backend route, server-side re-validation will be required. Prices and business logic are not present yet.

### Information Disclosure

The API server logs use `pino` with `redact` rules for `authorization`, `cookie`, and `set-cookie` headers — good practice. Ensure future form-submission logs do not capture PII (name, phone, email, symptoms). Error responses must not expose stack traces in production.

### Denial of Service

The API currently has no rate limiting. Once contact-form submission is added, the endpoint should be rate-limited to prevent spam and abuse. `express.json()` and `express.urlencoded()` have default body-size limits (100 KB) which provides some protection.

### Elevation of Privilege

No role-based access control exists. SQL injection risk will arise when database queries are added; all queries must use Drizzle's parameterized interface and must not construct raw SQL from user input.

### Security Misconfiguration

- `app.use(cors())` with no origin restriction allows any website to call the API from a visitor's browser. This should be locked to the production origin before any sensitive endpoints are added. (**Open finding: wildcard-cors-api-server-001**)
- No `helmet` middleware is present to set security headers (CSP, X-Frame-Options, etc.). Low impact now but worth adding before launch.
