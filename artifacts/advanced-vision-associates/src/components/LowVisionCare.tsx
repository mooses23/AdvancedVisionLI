const TEAL = '#147E93';
const NAVY = '#0B3B49';

/* ─── Inline SVG illustrations ─── */

function MacularSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Clear peripheral */}
      <ellipse cx="60" cy="45" rx="55" ry="40" fill="rgba(20,126,147,0.08)" stroke={TEAL} strokeWidth="1" />
      {/* Blurred / lost central area */}
      <ellipse cx="60" cy="45" rx="22" ry="20" fill="rgba(11,59,73,0.35)" />
      <ellipse cx="60" cy="45" rx="14" ry="12" fill="rgba(11,59,73,0.55)" />
      <ellipse cx="60" cy="45" rx="7" ry="6" fill="rgba(11,59,73,0.75)" />
      <text x="60" y="82" textAnchor="middle" fontSize="7" fill={NAVY} opacity="0.6" fontFamily="sans-serif">Central vision loss</text>
    </svg>
  );
}

function GlaucomaSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Dark tunnel edges */}
      <ellipse cx="60" cy="45" rx="55" ry="40" fill="rgba(11,59,73,0.65)" />
      {/* Clear tunnel */}
      <ellipse cx="60" cy="45" rx="22" ry="18" fill="rgba(20,126,147,0.15)" stroke={TEAL} strokeWidth="1" />
      <ellipse cx="60" cy="45" rx="12" ry="10" fill="rgba(20,126,147,0.25)" />
      <circle cx="60" cy="45" r="5" fill={TEAL} opacity="0.5" />
      <text x="60" y="82" textAnchor="middle" fontSize="7" fill="white" opacity="0.7" fontFamily="sans-serif">Tunnel vision</text>
    </svg>
  );
}

function DiabetesSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" aria-hidden="true">
      <ellipse cx="60" cy="45" rx="55" ry="40" fill="rgba(20,126,147,0.08)" stroke={TEAL} strokeWidth="1" />
      {/* Scattered dark spots (microaneurysms / bleeds) */}
      {[
        [45, 35, 7], [72, 30, 5], [38, 52, 6], [68, 55, 8],
        [55, 42, 4], [80, 44, 5], [48, 62, 4], [62, 38, 3],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(11,59,73,0.45)" />
      ))}
      <text x="60" y="82" textAnchor="middle" fontSize="7" fill={NAVY} opacity="0.6" fontFamily="sans-serif">Retinal hemorrhages</text>
    </svg>
  );
}

function StrokeSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" aria-hidden="true">
      <ellipse cx="60" cy="45" rx="55" ry="40" fill="rgba(20,126,147,0.08)" stroke={TEAL} strokeWidth="1" />
      {/* Left half dark = hemianopia */}
      <path d="M60 5 Q15 5 8 45 Q15 85 60 85 Z" fill="rgba(11,59,73,0.6)" />
      <line x1="60" y1="5" x2="60" y2="85" stroke={TEAL} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
      <text x="60" y="82" textAnchor="middle" fontSize="7" fill={NAVY} opacity="0.6" fontFamily="sans-serif">Visual field loss</text>
    </svg>
  );
}

function GlassesSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-4/5 h-4/5" fill="none" aria-hidden="true">
      <rect x="8" y="28" width="44" height="28" rx="10" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.1)" />
      <rect x="68" y="28" width="44" height="28" rx="10" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.1)" />
      <path d="M52 42 H68" stroke={TEAL} strokeWidth="2.5" />
      <path d="M8 42 Q4 36 2 30" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <path d="M112 42 Q116 36 118 30" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      {/* thick add power lines */}
      <line x1="26" y1="38" x2="34" y2="38" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="34" x2="30" y2="42" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="86" y1="38" x2="94" y2="38" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="34" x2="90" y2="42" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PrismGlassesSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-4/5 h-4/5" fill="none" aria-hidden="true">
      {/* half-eye shape: only bottom half of lens */}
      <path d="M8 50 Q8 28 30 28 Q52 28 52 50 Z" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.12)" />
      <path d="M68 50 Q68 28 90 28 Q112 28 112 50 Z" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.12)" />
      <path d="M8 50 H52" stroke={TEAL} strokeWidth="2.5" />
      <path d="M68 50 H112" stroke={TEAL} strokeWidth="2.5" />
      <path d="M52 39 H68" stroke={TEAL} strokeWidth="2.5" />
      {/* prism wedge */}
      <polygon points="22,44 38,44 30,35" fill={TEAL} opacity="0.35" />
      <polygon points="82,44 98,44 90,35" fill={TEAL} opacity="0.35" />
    </svg>
  );
}

function StandMagnifierSVG() {
  return (
    <svg viewBox="0 0 80 100" className="w-3/5 h-3/5" fill="none" aria-hidden="true">
      {/* lens */}
      <circle cx="40" cy="35" r="26" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.1)" />
      <circle cx="40" cy="35" r="18" stroke={TEAL} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      {/* magnification cross */}
      <line x1="31" y1="35" x2="49" y2="35" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="26" x2="40" y2="44" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      {/* legs */}
      <line x1="20" y1="60" x2="10" y2="88" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="60" x2="70" y2="88" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="88" x2="72" y2="88" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function HandMagnifierSVG() {
  return (
    <svg viewBox="0 0 80 100" className="w-3/5 h-3/5" fill="none" aria-hidden="true">
      <circle cx="36" cy="34" r="26" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.1)" />
      <line x1="27" y1="34" x2="45" y2="34" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="25" x2="36" y2="43" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      {/* handle */}
      <line x1="56" y1="54" x2="72" y2="88" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function DomeMagnifierSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-4/5 h-4/5" fill="none" aria-hidden="true">
      {/* dome body */}
      <path d="M10 60 Q10 15 50 15 Q90 15 90 60 Z" stroke={TEAL} strokeWidth="3" fill="rgba(20,126,147,0.12)" />
      {/* flat base */}
      <rect x="10" y="60" width="80" height="8" rx="2" stroke={TEAL} strokeWidth="2.5" fill="rgba(20,126,147,0.2)" />
      {/* text lines on page */}
      <line x1="22" y1="72" x2="78" y2="72" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* lens glare */}
      <path d="M28 30 Q38 24 48 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ─── Data ─── */

const CAUSES = [
  { name: 'Macular Degeneration', description: 'Damage to the central retina reduces sharp, detailed vision used for reading and recognizing faces.', Illustration: MacularSVG },
  { name: 'Glaucoma', description: 'Elevated intraocular pressure progressively damages the optic nerve, narrowing the visual field over time.', Illustration: GlaucomaSVG },
  { name: 'Diabetes', description: 'Diabetic retinopathy causes blood vessels in the retina to leak or grow abnormally, blurring or blocking vision.', Illustration: DiabetesSVG },
  { name: 'Post Stroke', description: 'Stroke can damage the visual cortex or optic pathways, resulting in field loss, double vision, or processing difficulties.', Illustration: StrokeSVG },
];

const AIDS = [
  { name: 'High Powered Add Glasses', label: 'Precision reading lenses with high magnification for near tasks', Illustration: GlassesSVG },
  { name: 'Prism Half Eyes', label: 'Prismatic spectacles that shift the image for easier reading', Illustration: PrismGlassesSVG },
  { name: 'Stand Magnifier', label: 'Stable desktop lens that rests on the page for hands-free use', Illustration: StandMagnifierSVG },
  { name: 'Hand Magnifier', label: 'Portable handheld lens ideal for spotting text on the go', Illustration: HandMagnifierSVG },
  { name: 'Dome Magnifier', label: 'Curved acrylic dome that lays directly on text for wide-area clarity', Illustration: DomeMagnifierSVG },
];

const ACTIVITY_QUESTIONS = ['Reading', 'Playing cards', 'Cooking meals', 'Watching TV', 'Playing bingo', 'Needlepoint'];

/* ─── Component ─── */

export default function LowVisionCare() {
  return (
    <section id="low-vision" className="py-14 md:py-20 border-t border-border/40" style={{ backgroundColor: '#f0f5f5' }}>
      <div className="container mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-eyebrow text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Flagship Specialty
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4" style={{ color: NAVY }}>
            Low Vision Care
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: `${NAVY}99` }}>
            When standard glasses or contact lenses can no longer fully correct your vision, our low vision specialists help you maximize what you have.
          </p>
        </div>

        {/* Part 1: What is a Low Vision Consultation */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-sm" style={{ backgroundColor: NAVY }}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: TEAL }}>
                Part 1
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-white mb-4 leading-snug">
                What Is a Low Vision Consultation?
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                A low vision consultation is a thorough, task-oriented exam covering distance vision, near vision, contrast sensitivity, and visual fields. The goal is not just to measure what you can see — it's to help you do the things that visual impairment has made difficult.
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                We evaluate your unique daily needs and match you with the aids and strategies that restore the most independence.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 md:p-10" style={{ backgroundColor: `${TEAL}22` }}>
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {[
                  { label: 'Distance Vision', icon: '👁️' },
                  { label: 'Near Vision', icon: '📖' },
                  { label: 'Contrast Levels', icon: '◐' },
                  { label: 'Visual Fields', icon: '◎' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/90 text-xs font-medium leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Causes */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: TEAL }}>
              Part 2
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-medium" style={{ color: NAVY }}>
              Common Causes of Low Vision
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {CAUSES.map(({ name, description, Illustration }) => (
              <div
                key={name}
                className="rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
              >
                <div
                  className="w-full aspect-[4/3] flex items-center justify-center p-4"
                  style={{ backgroundColor: 'rgba(20,126,147,0.08)' }}
                >
                  <Illustration />
                </div>
                <div className="p-4 flex flex-col gap-1 flex-grow">
                  <h4 className="font-serif text-base font-medium leading-snug" style={{ color: NAVY }}>
                    {name}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Activity Questions */}
        <div className="rounded-3xl p-8 md:p-10 mb-10" style={{ backgroundColor: TEAL }}>
          <div className="text-center mb-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Part 3 — Does this sound familiar?
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-white mb-2">
              Have you stopped…?
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
            {ACTIVITY_QUESTIONS.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <span className="text-white/60 text-sm">✓</span>
                <span className="text-white text-sm font-medium">{activity}</span>
              </div>
            ))}
          </div>
          <div className="text-center max-w-xl mx-auto">
            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-2">
              Is this due to poor vision?
            </p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Would you like to start again? Come see how we can help get back your quality of life.
            </p>
          </div>
        </div>

        {/* Part 4: Low Vision Aids */}
        <div className="mb-10">
          <div className="text-center mb-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: TEAL }}>
              Part 4
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: NAVY }}>
              Low Vision Aids
            </h3>
          </div>
          <p className="text-center text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: `${NAVY}99` }}>
            Low vision aids utilize the remaining vision through magnification, image shift, and contrast enhancement to maximize visual potential.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {AIDS.map(({ name, label, Illustration }) => (
              <div
                key={name}
                className="rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
              >
                <div
                  className="w-full aspect-square flex items-center justify-center p-4"
                  style={{ backgroundColor: 'rgba(20,126,147,0.06)' }}
                >
                  <Illustration />
                </div>
                <div className="p-4 flex flex-col gap-1 flex-grow">
                  <h4 className="font-serif text-sm font-medium leading-snug" style={{ color: NAVY }}>
                    {name}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: `${NAVY}75` }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4 italic" style={{ color: `${NAVY}60` }}>
            Samples of some of the many low vision aids available at our practice.
          </p>
        </div>

        {/* Part 5: CTA Strip */}
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: NAVY }}
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: TEAL }}>
              Ready to start again?
            </p>
            <h3 className="font-serif text-xl md:text-2xl font-medium text-white leading-snug">
              Get back your quality of life.
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Call today to book a Low Vision consultation.
            </p>
          </div>
          <a
            href="tel:718-268-3937"
            className="shrink-0 inline-flex items-center gap-2 text-white font-semibold text-base md:text-lg px-7 py-4 rounded-full transition-colors whitespace-nowrap"
            style={{ backgroundColor: TEAL }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0f6677')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (718) 268-3937
          </a>
        </div>

      </div>
    </section>
  );
}
