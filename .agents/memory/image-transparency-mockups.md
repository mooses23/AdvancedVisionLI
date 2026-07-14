---
name: Image transparency & mockup matching
description: Rules for layering subject cutouts over CSS backgrounds and sampling colors from design mockups.
---

## Verify real alpha before layering a "transparent" image

**Rule:** Before compositing a PNG over a CSS background, prove it has genuine transparency: `magick img.png -alpha extract -format "%[min] %[max]" info:` — min must be 0. An alpha *channel* can exist while being 100% opaque everywhere (min=max=65535), meaning the background is baked into the pixels.

**Why:** A long debugging saga blamed CSS compositing for a visible seam/checkerboard, when every "transparent" asset (including user uploads exported as PNG) was actually fully opaque with white/teal baked in. CSS can never fix that; only true background removal can. An earlier memory claiming "CSS compositing is unreliable" was wrong and got corrected here.

**How to apply:** When a hero/subject image must sit on a colored section: run background removal (removeImageBackground callback), verify alpha min=0 and transparent corners, `-trim +repage` the margins, then layer it over ONE CSS background color. A seam is then impossible by construction. Never solve a seam by matching the image's baked-in background color to CSS — sRGB rendering differences make it visibly mismatch.

## Sample mockup colors at actual file resolution

**Rule:** Mockup image files are often larger than their displayed size (e.g. 1.5×/1.78×). Scale display coordinates to actual pixels before sampling with `%[pixel:u.p{x,y}]`, and sample flat color areas away from edges/text antialiasing.

**Why:** Sampling at display coordinates on a scaled file returns colors from the wrong spot (antialiased blends, neighboring shapes), which produced wrong hero colors at first (#C6DADA instead of the true #D8E4E2).

**How to apply:** `magick identify` the mockup first, compute scale = actual/display, multiply coordinates, then sample. Cross-check 2-3 spots per region and distrust samples near shape boundaries.
