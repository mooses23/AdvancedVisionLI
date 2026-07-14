/** Hero — two-column layout matched to mockup */

const HERO_BG = '#C6DADA';

export default function Hero() {
  return (
    <section style={{ backgroundColor: HERO_BG, overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════
          DESKTOP (md and up)
          Nav is fixed at 72px (h-18). Text starts ~16px below nav.
      ═══════════════════════════════════════════════════ */}
      <div className="hidden md:flex" style={{ minHeight: 500 }}>

        {/* Left — copy (50% width) */}
        <div
          className="flex items-start flex-col justify-center"
          style={{
            flex: '0 0 50%',
            paddingLeft: '8%',
            paddingRight: '3%',
            paddingTop: 88,
            paddingBottom: 52,
          }}
        >
          <p
            className="font-semibold uppercase mb-3"
            style={{ fontSize: 11, letterSpacing: '0.22em', color: '#0D6F86' }}
          >
            Advanced Vision Associates · Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold mb-4"
            style={{
              fontSize: 'clamp(2.6rem, 4.2vw, 4.0rem)',
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
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: '#173140',
              opacity: 0.68,
              maxWidth: 420,
            }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-wrap" style={{ gap: 12 }}>
            <a
              href="#contact"
              className="inline-flex items-center text-white font-semibold hover:opacity-90 transition-all"
              style={{
                backgroundColor: '#F46B54',
                height: 50,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 30,
                fontSize: 15,
              }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{
                height: 50,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 30,
                border: '2px solid #0D8AA5',
                color: '#0D8AA5',
                fontSize: 15,
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right — image fills the column edge-to-edge (50% width) */}
        <div style={{ flex: '0 0 50%', overflow: 'hidden' }}>
          <img
            src="/images/hero-girl.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE (below md)
          Nav is fixed at 64px (h-16). Text starts ~8px below nav.
      ═══════════════════════════════════════════════════ */}
      <div className="md:hidden relative" style={{ minHeight: 510 }}>

        {/* Girl — right 50% */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0"
          style={{ width: '50%', overflow: 'hidden' }}
        >
          <img
            src="/images/hero-girl.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </div>

        {/* Copy — left column, paddingRight keeps text clear of image */}
        <div
          className="relative"
          style={{
            paddingLeft: 16,
            paddingRight: '52%',
            paddingTop: 72,
            paddingBottom: 28,
            zIndex: 1,
          }}
        >
          <p
            className="font-semibold uppercase mb-2"
            style={{ fontSize: 9, letterSpacing: '0.2em', color: '#0D8AA5', lineHeight: 1.6 }}
          >
            Advanced Vision Associates<br />· Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold mb-3"
            style={{ fontSize: 26, lineHeight: 1.07, color: '#163444' }}
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
              style={{
                backgroundColor: '#F46B54',
                height: 48,
                borderRadius: 30,
                fontSize: 14,
              }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{
                height: 48,
                borderRadius: 30,
                border: '2px solid #0D8AA5',
                color: '#0D8AA5',
                fontSize: 14,
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
