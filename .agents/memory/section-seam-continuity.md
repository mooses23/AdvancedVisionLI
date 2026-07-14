---
name: Section seam continuity
description: Why matching background colors is not enough to make two page sections flow together
---

# Section seam continuity

Matching two adjacent sections' background colors does NOT remove a visible seam when either section clips decorative content at its edge.

**Why:** On this site the Hero and Signs sections share one background color, yet the user still saw a "strong cut-off line" between them. Cause: the hero had `overflow: hidden` with bottom-anchored decorations (blobs at negative bottom offsets) and a person photo anchored to `bottom: 0` — all guillotined along one horizontal line at the section boundary. Several aligned cut edges read as a line even on identical backgrounds.

**How to apply:** When two sections must flow together, check every element touching the boundary. Each shape/photo must either (a) complete naturally before the edge, (b) continue across the junction, or (c) fade out via a gradient-to-background band layered above the decorations but below interactive content. Echoing the same shape language just below the junction strengthens the continuity. Also: a fixed-height hero + overflow hidden clips CONTENT (buttons) at intermediate widths — prefer minHeight so text can grow. Verify with screenshots spanning the junction at phone/tablet/desktop, not per-section shots.
