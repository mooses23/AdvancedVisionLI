---
name: Cross-browser favicon assets
description: Reliable favicon asset and cache-busting rules for the practice website.
---

**Rule:** Use a direct PNG favicon plus an ICO fallback and Apple touch icon. When replacing a visibly cached favicon, publish it at a new URL rather than only changing the bytes behind the old URL.

**Why:** Safari continued showing the obsolete practice mark when the favicon was an SVG that referenced a separate PNG. Browser favicon caches are unusually persistent, and external images inside favicon SVGs are not handled consistently.

**How to apply:** Keep each favicon self-contained, declare the PNG, ICO, and Apple touch variants in both the homepage and shared server-rendered head, and verify the production URL after publishing.