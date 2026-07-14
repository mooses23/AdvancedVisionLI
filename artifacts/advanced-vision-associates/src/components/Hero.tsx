/** Hero — pixel-perfect rebuild matching the design audit */

// Dot grid decoration (upper-right corner)
function DotGrid() {
  const cols = 9;
  const rows = 11;
  const gap = 18;
  const r = 2;
  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * gap + r + 2}
          cy={row * gap + r + 2}
          r={r}
          fill="white"
          opacity={0.75}
        />
      );
    }
  }
  return (
    <svg
      width={cols * gap + 4}
      height={rows * gap + 4}
      viewBox={`0 0 ${cols * gap + 4} ${rows * gap + 4}`}
      aria-hidden="true"
      className="absolute top-3 right-3 pointer-events-none select-none hidden md:block"
      style={{ zIndex: 2 }}
    >
      {dots}
    </svg>
  );
}

// Sand blob (bottom-left)
function BlobSandHero() {
  return (
    <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute -bottom-10 -left-10 pointer-events-none select-none"
      style={{ width: 300, height: 270, zIndex: 1 }}>
      <path
        d="M340,240Q300,320,230,355Q160,390,100,350Q40,310,20,240Q0,170,40,110Q80,50,160,30Q240,10,300,60Q360,110,370,175Q380,240,340,240Z"
        fill="#d4b898" fillOpacity="0.65"
      />
    </svg>
  );
}

// Teal blob (bottom-center, cut off)
function BlobTealBottom() {
  return (
    <svg viewBox="0 0 480 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{ width: 380, height: 340, bottom: -120, left: '28%', zIndex: 1 }}>
      <path
        d="M380,260Q340,340,265,375Q190,410,120,370Q50,330,30,250Q10,170,60,105Q110,40,200,25Q290,10,355,75Q420,140,420,200Q420,260,380,260Z"
        fill="#7ecac3" fillOpacity="0.55"
      />
    </svg>
  );
}

// Teal blob (far right, cut off)
function BlobTealRight() {
  return (
    <svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="absolute pointer-events-none select-none hidden md:block"
      style={{ width: 260, height: 300, top: -30, right: -30, zIndex: 1 }}>
      <path
        d="M310,200Q280,280,210,330Q140,380,80,330Q20,280,10,200Q0,120,60,70Q120,20,210,20Q300,20,340,90Q380,160,310,200Z"
        fill="#7ecac3" fillOpacity="0.50"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 650, backgroundColor: '#B8D2D2' }}
    >
      {/* ── Solid fill to ensure consistent colour behind transparent PNG ── */}
      <div className="absolute inset-0" style={{ backgroundColor: '#B8D2D2', zIndex: 0 }} />

      {/* ── Layer 2: Soft aqua-wash gradient (slightly lighter on left) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.03) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Layer 3: Large translucent circles ── */}
      {/* Big pale circle — behind girl, centre-right */}
      <div
        className="absolute rounded-full pointer-events-none select-none"
        style={{
          width: 540,
          height: 540,
          background: 'rgba(255,255,255,0.20)',
          top: -80,
          right: '16%',
          zIndex: 1,
        }}
      />
      {/* Medium pale circle — lower-centre */}
      <div
        className="absolute rounded-full pointer-events-none select-none"
        style={{
          width: 340,
          height: 340,
          background: 'rgba(255,255,255,0.16)',
          bottom: -90,
          left: '42%',
          zIndex: 1,
        }}
      />
      {/* Small pale circle — mid left (adds subtle depth) */}
      <div
        className="absolute rounded-full pointer-events-none select-none"
        style={{
          width: 220,
          height: 220,
          background: 'rgba(255,255,255,0.14)',
          top: '38%',
          left: '25%',
          zIndex: 1,
        }}
      />

      {/* ── Layer 4: Organic blobs (sand + teal) ── */}
      <BlobSandHero />
      <BlobTealBottom />
      <BlobTealRight />

      {/* ── Layer 5: White dot grid — upper right ── */}
      <DotGrid />

      {/* ── Layer 6: Lighting gradient (slightly darker right / behind girl) ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(to right, transparent 45%, rgba(0,0,0,0.04) 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Girl cutout — right side (desktop only) ── */}
      <img
        src="/images/hero-girl-cutout.png"
        alt="Teenager doing Brock string vision therapy exercise"
        className="absolute bottom-0 pointer-events-none select-none hidden md:block"
        style={{
          right: -8,
          height: '106%',
          width: 'auto',
          zIndex: 3,
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative container mx-auto px-6 md:px-10 flex items-center"
        style={{ minHeight: 650, zIndex: 10 }}
      >
        <div style={{ maxWidth: 540, paddingTop: 80, paddingBottom: 40 }}>

          {/* Eyebrow */}
          <p
            className="font-semibold uppercase mb-6"
            style={{
              fontSize: 11,
              letterSpacing: '0.25em',
              color: '#0D8AA5',
            }}
          >
            Advanced Vision Associates · Inwood, NY
          </p>

          {/* Headline */}
          <h1
            className="font-serif font-semibold mb-5"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.55rem)',
              lineHeight: 0.95,
              color: '#173140',
            }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: '#F46B54' }}>
              20/20 vision
            </em>{' '}
            and still have a vision problem?
          </h1>

          {/* Mobile-only photo */}
          <div
            className="block md:hidden -mx-6 mb-6 overflow-hidden"
            style={{ height: 260 }}
          >
            <img
              src="/images/hero-girl-cutout.png"
              alt="Teenager doing Brock string vision therapy exercise"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'right top' }}
            />
          </div>

          {/* Subtext */}
          <p
            className="mb-9"
            style={{
              fontSize: 18,
              lineHeight: 1.62,
              color: '#173140',
              opacity: 0.65,
              maxWidth: 400,
            }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap" style={{ gap: 20 }}>
            {/* Primary — coral pill */}
            <a
              href="#contact"
              className="inline-flex items-center text-white font-semibold hover:opacity-90 active:scale-95 transition-all"
              style={{
                backgroundColor: '#F46B54',
                height: 56,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 30,
                fontSize: 16,
              }}
            >
              Schedule a Consultation
            </a>

            {/* Secondary — white fill, teal border + text */}
            <a
              href="#vision-therapy"
              className="inline-flex items-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{
                height: 56,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 30,
                border: '2px solid #0D8AA5',
                color: '#0D8AA5',
                fontSize: 16,
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
