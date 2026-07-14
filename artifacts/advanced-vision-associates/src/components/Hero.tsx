/** Hero — clean two-column layout, no decorative artwork */

const HERO_BG = '#C6DADA';

export default function Hero() {
  return (
    <section style={{ backgroundColor: HERO_BG, overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════
          DESKTOP (md and up) — flex row: copy | image
      ═══════════════════════════════════════════════════ */}
      <div className="hidden md:flex" style={{ minHeight: 540 }}>

        {/* Left — copy */}
        <div
          className="flex items-center"
          style={{ flex: '0 0 56%', paddingLeft: '9%', paddingRight: '3%', paddingTop: 64, paddingBottom: 48 }}
        >
          <div style={{ maxWidth: 500 }}>

            <p
              className="font-semibold uppercase mb-4"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: '#0D6F86' }}
            >
              Advanced Vision Associates · Inwood, NY
            </p>

            <h1
              className="font-serif font-semibold mb-4"
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.0rem)', lineHeight: 1.05, color: '#173140' }}
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

        {/* Right — image fills the column, no transparency */}
        <div style={{ flex: '0 0 44%', overflow: 'hidden' }}>
          <img
            src="/images/hero-girl.jpg"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE (below md) — absolute image right, copy left
      ═══════════════════════════════════════════════════ */}
      <div className="md:hidden relative" style={{ minHeight: 500 }}>

        {/* Girl — right 46% */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0"
          style={{ width: '46%', overflow: 'hidden' }}
        >
          <img
            src="/images/hero-girl.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% top', display: 'block' }}
          />
        </div>

        {/* Copy */}
        <div
          className="relative"
          style={{ paddingLeft: 20, paddingRight: '50%', paddingTop: 64, paddingBottom: 28, zIndex: 1 }}
        >
          <p
            className="font-semibold uppercase mb-3"
            style={{ fontSize: 10, letterSpacing: '0.2em', color: '#0D8AA5', lineHeight: 1.5 }}
          >
            Advanced Vision Associates<br />· Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold mb-3"
            style={{ fontSize: 22, lineHeight: 1.08, color: '#163444' }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: '#F46B54' }}>20/20 vision</em>{' '}
            and still have a vision problem?
          </h1>

          <p
            className="mb-5"
            style={{ fontSize: 13, lineHeight: 1.65, color: '#173140', opacity: 0.68 }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-col" style={{ gap: 10, paddingBottom: 24 }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-white font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: '#F46B54', height: 46, borderRadius: 30, fontSize: 13 }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{ height: 46, borderRadius: 30, border: '2px solid #0D8AA5', color: '#0D8AA5', fontSize: 13 }}
            >
              Learn More
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
