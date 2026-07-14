/** Hero — matches desktop + mobile mockups */

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
          opacity={0.45}
        />
      ))}
    </svg>
  );
}

function SandBlob({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none" style={style}>
      <path
        d="M340,240Q300,320,230,355Q160,390,100,350Q40,310,20,240Q0,170,40,110Q80,50,160,30Q240,10,300,60Q360,110,370,175Q380,240,340,240Z"
        fill="#F2DFC3" fillOpacity="0.88"
      />
    </svg>
  );
}

function TealBlobSmall({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none" style={style}>
      <path
        d="M240,175Q210,240,155,260Q100,280,55,240Q10,200,15,140Q20,80,80,55Q140,30,200,65Q260,100,255,137Q250,175,240,175Z"
        fill="#5ABFBF" fillOpacity="0.55"
      />
    </svg>
  );
}

// Solid teal/mint background matching the mockup
const HERO_BG = '#C6DADA';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: HERO_BG }}
    >

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP  (md and up)
      ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative" style={{ height: 540, backgroundColor: '#C6DADA' }}>

        {/* Dark teal circle — top-right corner, partially clipped */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 220, height: 220,
            backgroundColor: '#4AAEB0',
            top: -70, right: -55,
            zIndex: 2,
          }}
        />

        {/* Dot grid — upper left teal area */}
        <div className="absolute pointer-events-none select-none" style={{ top: 18, left: 18, zIndex: 1 }}>
          <DotGrid cols={10} rows={10} />
        </div>

        {/* Sand blob — bottom left */}
        <SandBlob style={{ width: 210, height: 190, bottom: -30, left: -20, zIndex: 4 }} />

        {/* Small teal blob — bottom center */}
        <TealBlobSmall style={{ width: 185, height: 170, bottom: -60, left: '30%', zIndex: 4 }} />

        {/* Girl — teal background baked into PNG so no compositing issues */}
        <img
          src="/images/hero-girl-cutout.png?v=2"
          aria-hidden="true"
          alt=""
          className="absolute pointer-events-none select-none"
          style={{
            top: -100,
            right: 0,
            height: 680,
            width: 'auto',
            display: 'block',
            zIndex: 2,
          }}
        />

        {/* Content — left column
            Layout budget at 540px hero, targeting 5-line headline at ~46px:
            pt:72 + eyebrow:14 + gap:18 + h1(5×47px):235 + gap:18 + body:56 + gap:28 + btn:50 + pb:32 = 523px ✓ */}
        <div
          className="relative h-full flex items-start"
          style={{ zIndex: 10, paddingLeft: '11%', paddingTop: 72, paddingBottom: 32 }}
        >
          <div style={{ maxWidth: 540 }}>

            <p
              className="font-semibold uppercase mb-4"
              style={{ fontSize: 11, letterSpacing: '0.24em', color: '#0D6F86' }}
            >
              Advanced Vision Associates · Inwood, NY
            </p>

            <h1
              className="font-serif font-semibold mb-4"
              style={{
                fontSize: 'clamp(2.1rem, 3.6vw, 3.0rem)',
                lineHeight: 1.04,
                color: '#173140',
              }}
            >
              Did you know that a person can have{' '}
              <em className="not-italic" style={{ color: '#F46B54' }}>20/20 vision</em>{' '}
              and still have a vision problem?
            </h1>

            <p
              className="mb-7"
              style={{ fontSize: 16, lineHeight: 1.65, color: '#173140', opacity: 0.68, maxWidth: 380 }}
            >
              Vision therapy treats the functional issues that glasses alone
              can't fix — for children and adults of all ages.
            </p>

            <div className="flex flex-wrap" style={{ gap: 14 }}>
              <a
                href="#contact"
                className="inline-flex items-center text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#F46B54', height: 50, paddingLeft: 26, paddingRight: 26, borderRadius: 30, fontSize: 15 }}
              >
                Schedule a Consultation
              </a>
              <a
                href="#vision-therapy"
                className="inline-flex items-center font-medium bg-white hover:bg-white/90 transition-all"
                style={{ height: 50, paddingLeft: 26, paddingRight: 26, borderRadius: 30, border: '2px solid #0D8AA5', color: '#0D8AA5', fontSize: 15 }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE  (below md)
      ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative">

        {/* Girl PNG — right 48% of hero, cropped to show face/upper body.
            object-fit:cover + object-position pins the girl's face (68%,8%)
            so head/beads are centered in the right column at any phone width.  */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 overflow-hidden pointer-events-none"
          style={{ width: '48%', zIndex: 2, backgroundColor: '#C6DADA' }}
        >
          <img
            src="/images/hero-girl-cutout.png"
            alt=""
            className="select-none"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '68% 8%',
            }}
          />
        </div>

        {/* Dot grid — behind girl container (z:1), texture in left teal area */}
        <div className="absolute top-3 left-3 pointer-events-none select-none" style={{ zIndex: 1 }}>
          <DotGrid cols={6} rows={6} />
        </div>

        {/* Sand blob — lower left, partially clipped */}
        <SandBlob style={{ width: 140, height: 126, bottom: -20, left: -18, zIndex: 1 }} />

        {/* Teal circle blob — mid left, beside body text */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 100, height: 100,
          background: 'rgba(90,191,191,0.30)',
          bottom: '28%', left: '5%',
          zIndex: 1,
        }} />

        {/* Content — left of girl.
            paddingRight: '50%' keeps text left of the 48% girl column.        */}
        <div
          className="relative"
          style={{ zIndex: 10, paddingLeft: 20, paddingRight: '50%', paddingTop: 78, paddingBottom: 28 }}
        >
          <p
            className="font-semibold uppercase mb-3"
            style={{ fontSize: 10, letterSpacing: '0.2em', color: '#0D8AA5', lineHeight: 1.5 }}
          >
            Advanced Vision Associates<br />· Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold mb-3"
            style={{ fontSize: 24, lineHeight: 1.06, color: '#163444' }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: '#F46B54' }}>20/20 vision</em>{' '}
            and still have a vision problem?
          </h1>

          <p
            className="mb-6"
            style={{ fontSize: 14, lineHeight: 1.65, color: '#173140', opacity: 0.68 }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          {/* Full-width stacked buttons */}
          <div className="flex flex-col" style={{ gap: 10, paddingBottom: 24 }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-white font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: '#F46B54', height: 50, borderRadius: 30, fontSize: 14 }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{ height: 50, borderRadius: 30, border: '2px solid #0D8AA5', color: '#0D8AA5', fontSize: 14 }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
