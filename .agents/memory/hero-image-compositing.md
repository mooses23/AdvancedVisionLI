---
name: Hero image compositing on teal background
description: Lessons from debugging transparent PNG compositing failures in the AVA hero section
---

## Rule
Never use a transparent PNG (or a PNG with a near-white baked background) as a hero image that needs to appear against a custom CSS background color. Generate the image with the background baked into the JPEG/PNG at generation time.

**Why:** CSS stacking-context compositing for transparent PNGs against a colored background is unreliable in the Replit preview browser (Chromium in an iframe proxy). Multiple approaches were tried and all failed: `background-color` on `<img>`, backdrop `<div>` at z:1, `isolation: isolate`, `overflow: hidden`. ImageMagick `-alpha remove` without `magick flatten` composites against white instead of the specified background color. The original "transparent" PNG turned out to be TrueColor (no alpha) with a near-white baked background anyway.

**How to apply:** When generating hero or cutout images via `generateImage`, either:
1. Describe the exact background color in the prompt (e.g. "solid mint teal rgb(198,218,218) background") and use a JPEG output — no transparency, no compositing issues.
2. If `removeBackground: true` is used, composite the result onto a colored canvas with `magick \( -size WxH xc:'#RRGGBB' \) \( image.png \) -composite output.jpg` — NOT the deprecated `convert -background -alpha remove` which defaults to white.
