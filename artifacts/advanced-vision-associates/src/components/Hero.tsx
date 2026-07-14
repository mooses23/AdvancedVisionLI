/** Hero — pixel-perfect rebuild matching design audit (desktop + mobile) */

function DotGrid({ cols = 10, rows = 10 }: { cols?: number; rows?: number }) {
  const gap = 18;
  const r = 2;
  return (
    <svg
      width={cols * gap + 4}
      height={rows * gap + 4}
      viewBox={`0 0 ${cols * gap + 4} ${rows * gap + 4}`}
      aria-hidden="true"
      className="pointer-events-none select-none"
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <circle
          key={i}
          cx={(i % cols) * gap + r + 2}
          cy={Math.floor(i / cols) * gap + r + 2}
          r={r}
          fill="white"
          opacity={0.70}
        />
      ))}
    </svg>
  );
}

// ─── shared blob paths ──────────────────────────────────────────────────────

function SandBlob({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none" style={style}>
      <path
        d="M340,240Q300,320,230,355Q160,390,100,350Q40,310,20,240Q0,170,40,110Q80,50,160,30Q240,10,300,60Q360,110,370,175Q380,240,340,240Z"
        fill="#F2DFC3" fillOpacity="0.82"
      />
    </svg>
  );
}

function TealBlobBottom({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 480 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none" style={style}>
      <path
        d="M380,260Q340,340,265,375Q190,410,120,370Q50,330,30,250Q10,170,60,105Q110,40,200,25Q290,10,355,75Q420,140,420,200Q420,260,380,260Z"
        fill="#7ECFCF" fillOpacity="0.55"
      />
    </svg>
  );
}

function TealBlobCorner({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none" style={style}>
      <path
        d="M310,200Q280,280,210,330Q140,380,80,330Q20,280,10,200Q0,120,60,70Q120,20,210,20Q300,20,340,90Q380,160,310,200Z"
        fill="#7ECFCF" fillOpacity="0.45"
      />
    </svg>
  );
}

// ─── hero ────────────────────────────────────────────────────────────────────

const GIRL_URL = "url('/images/hero-girl-cutout.png')";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#F7F5F2' }}
    >

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP  (md and up)
      ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative" style={{ height: 660 }}>

        {/* Layer 2 — soft aqua wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(112deg, rgba(221,238,238,0.52) 0%, rgba(221,238,238,0.74) 100%)',
            zIndex: 1,
          }}
        />

        {/* Layer 3 — large translucent circles (15–40% opacity, pale aqua) */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 620, height: 620, background: 'rgba(221,238,238,0.28)',
          top: -120, right: '12%', zIndex: 1,
        }} />
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 360, height: 360, background: 'rgba(221,238,238,0.22)',
          bottom: -90, left: '40%', zIndex: 1,
        }} />
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 240, height: 240, background: 'rgba(255,255,255,0.18)',
          top: '28%', left: '20%', zIndex: 1,
        }} />

        {/* ── Girl cutout — background-image div (no iOS Safari compositing bug) ──
            PNG: 1536×1024 (ratio 1.5). Div ratio: 1320/880 = 1.5 → no distortion.
            top: 0 anchors her head near the hero top, bottom body overflows + is
            clipped. right: 0 with width 1320 puts left edge at -40px (off-screen,
            transparent, clipped). Background-color ≈ blended hero teal fills the
            transparent PNG regions (around the string, above head, etc.).          */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            right: 0,
            width: 1320,
            height: 880,
            backgroundColor: '#E2EDEB',   // ≈ #F7F5F2 base + 65% #DDEEEE wash
            backgroundImage: GIRL_URL,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',  // fills div exactly — no distortion (both 1.5 ratio)
            zIndex: 3,
          }}
        />

        {/* Layer 4 blobs — z:4 so they sit above the girl div but don't
            overlap the opaque girl pixels (they're in the corners/edges) */}
        <SandBlob style={{ width: 300, height: 270, bottom: -10, left: -10, zIndex: 4 }} />
        <TealBlobBottom style={{ width: 380, height: 340, bottom: -120, left: '28%', zIndex: 4 }} />
        <TealBlobCorner style={{ width: 260, height: 300, top: -30, right: -30, zIndex: 4 }} />

        {/* Layer 5 — dot grid upper right */}
        <div className="absolute top-3 right-3 pointer-events-none select-none" style={{ zIndex: 5 }}>
          <DotGrid cols={10} rows={10} />
        </div>

        {/* Layer 6 — lighting (brighter left / slightly darker right) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.16) 0%, transparent 42%, rgba(0,0,0,0.03) 100%)',
            zIndex: 5,
          }}
        />

        {/* Main content */}
        <div
          className="relative container mx-auto px-10 flex items-center h-full"
          style={{ zIndex: 10 }}
        >
          <div style={{ maxWidth: 540, paddingTop: 96, paddingBottom: 48 }}>

            <p
              className="font-semibold uppercase mb-6"
              style={{ fontSize: 11, letterSpacing: '0.25em', color: '#0D8AA5' }}
            >
              Advanced Vision Associates · Inwood, NY
            </p>

            <h1
              className="font-serif font-semibold mb-5"
              style={{
                fontSize: 'clamp(2.8rem, 5.3vw, 4.3rem)',
                lineHeight: 0.95,
                color: '#173140',
              }}
            >
              Did you know that a person can have{' '}
              <em className="not-italic" style={{ color: '#F46B54' }}>20/20 vision</em>{' '}
              and still have a vision problem?
            </h1>

            <p
              className="mb-9"
              style={{ fontSize: 18, lineHeight: 1.62, color: '#173140', opacity: 0.65, maxWidth: 400 }}
            >
              Vision therapy treats the functional issues that glasses alone
              can't fix — for children and adults of all ages.
            </p>

            <div className="flex flex-wrap" style={{ gap: 20 }}>
              <a
                href="#contact"
                className="inline-flex items-center text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#F46B54', height: 56, paddingLeft: 28, paddingRight: 28, borderRadius: 30, fontSize: 16 }}
              >
                Schedule a Consultation
              </a>
              <a
                href="#vision-therapy"
                className="inline-flex items-center font-medium bg-white hover:bg-white/90 transition-all"
                style={{ height: 56, paddingLeft: 28, paddingRight: 28, borderRadius: 30, border: '2px solid #0D8AA5', color: '#0D8AA5', fontSize: 16 }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE  (below md)
          Audit spec: girl overlaps headline side-by-side (NOT stacked),
          shoulder at ~58%, head near top, bottom cropped below elbows.
          Buttons stack full-width vertically.
      ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative" style={{ minHeight: 820 }}>

        {/* Layer 2 — aqua wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(148deg, rgba(221,243,242,0.55) 0%, rgba(221,238,238,0.78) 100%)',
            zIndex: 1,
          }}
        />

        {/* Layer 3 — large circle top-left */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 280, height: 280, background: 'rgba(221,238,238,0.18)',
          top: -60, left: -60, zIndex: 2,
        }} />

        {/* Layer 4 — small teal blob lower center */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 160, height: 160, background: 'rgba(114,212,214,0.22)',
          bottom: '38%', left: '28%', zIndex: 2,
        }} />

        {/* Layer 5 — sand blob left */}
        <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ width: 200, height: 185, bottom: '33%', left: -15, zIndex: 2 }}>
          <path
            d="M240,170Q210,230,155,255Q100,280,55,245Q10,210,10,155Q10,100,55,65Q100,30,165,30Q230,30,255,90Q280,150,240,170Z"
            fill="#F3D8AA" fillOpacity="0.72"
          />
        </svg>

        {/* Layer 6 (mobile-only) — turquoise vertical panel right ~23% */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ right: 0, width: '23%', backgroundColor: '#71D5D5', opacity: 0.28, zIndex: 2 }}
        />

        {/* Layer 7 — dot grid upper right */}
        <div className="absolute top-2 right-2 pointer-events-none select-none" style={{ zIndex: 3 }}>
          <DotGrid cols={8} rows={8} />
        </div>

        {/* Layer 8 — lighting gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.14) 0%, transparent 55%)',
            zIndex: 3,
          }}
        />

        {/* Girl cutout — overlapping right side, beside headline.
            PNG 1536×1024.  Rendered at 750×500 (ratio preserved).
            bg-position '-270px 0' shows original x≈554–1278,
            placing the girl's face at ~68–72% from screen left. */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            right: 0,
            width: 280,
            height: 520,
            backgroundColor: '#C2DADA',
            backgroundImage: GIRL_URL,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '750px auto',  // renders PNG at 750×500px
            backgroundPosition: '-270px 0', // shows rendered x=270–550 → orig x≈554–1128
            zIndex: 4,
          }}
        />

        {/* Content column — left of girl, z:10 */}
        <div
          className="relative"
          style={{ zIndex: 10, paddingLeft: 28, paddingRight: 28, paddingTop: 84 }}
        >
          <p
            className="font-semibold uppercase mb-4"
            style={{ fontSize: 11, letterSpacing: '0.25em', color: '#0D8AA5', lineHeight: 1.4 }}
          >
            Advanced Vision Associates · Inwood, NY
          </p>

          {/* Headline constrained so it stays left of the girl (≈53% of 390px ≈ 207px) */}
          <h1
            className="font-serif font-semibold mb-4"
            style={{ fontSize: 31, lineHeight: 0.93, color: '#163444', maxWidth: 205 }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: '#F46B54' }}>20/20 vision</em>{' '}
            and still have a vision problem?
          </h1>

          <p
            className="mb-7"
            style={{ fontSize: 16, lineHeight: 1.62, color: '#173140', opacity: 0.65, maxWidth: 205 }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          {/* Stacked full-width buttons (90% wide) */}
          <div className="flex flex-col" style={{ gap: 12, paddingBottom: 60 }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-white font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: '#F46B54', height: 58, width: '90%', borderRadius: 30, fontSize: 16 }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{ height: 58, width: '90%', borderRadius: 30, border: '2px solid #0D8AA5', color: '#0D8AA5', fontSize: 16 }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
