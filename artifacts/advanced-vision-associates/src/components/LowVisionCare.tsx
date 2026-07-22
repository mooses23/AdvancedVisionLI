import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TEAL = '#147E93';
const NAVY = '#0B3B49';

/* ─── Cause icons (SVG fallbacks) ─── */
function EyeIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    </svg>
  );
}

const CAUSES = [
  {
    name: 'Macular Degeneration',
    description: 'Damage to the central retina reduces sharp, detailed vision used for reading and recognizing faces.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Macular_Degeneration.png/960px-Macular_Degeneration.png',
    imageAlt: 'Macular degeneration eye illustration',
  },
  {
    name: 'Glaucoma',
    description: 'Elevated intraocular pressure progressively damages the optic nerve, narrowing the visual field over time.',
    imageUrl: 'https://eyeillustrations.com/wp-content/uploads/2021/09/co3606-800x800.jpg',
    imageAlt: 'Glaucoma optic nerve illustration',
  },
  {
    name: 'Diabetes',
    description: 'Diabetic retinopathy causes blood vessels in the retina to leak or grow abnormally, blurring or blocking vision.',
    imageUrl: 'https://eyeillustrations.com/wp-content/uploads/2021/09/co3501.jpg',
    imageAlt: 'Diabetic retinopathy retina illustration',
  },
  {
    name: 'Post Stroke',
    description: 'Stroke can damage the visual cortex or optic pathways, resulting in field loss, double vision, or processing difficulties.',
    imageUrl: null, // use SVG fallback
    imageAlt: 'Post-stroke vision loss',
  },
];

const AIDS = [
  {
    name: 'High Powered Add Glasses',
    label: 'Precision reading lenses with high magnification for near tasks',
    imageUrl: 'https://chadwickoptical.com/wp-content/uploads/2026/05/low-vision-solutions-high-powered-readers.jpg',
    imageAlt: 'High powered add reading glasses',
  },
  {
    name: 'Prism Half Eyes',
    label: 'Prismatic spectacles that shift the image for easier reading',
    imageUrl: 'https://cnibsmartlife.ca/cdn/shop/products/SPE4201401100.jpg?v=1597437835',
    imageAlt: 'Prism half eye spectacles',
  },
  {
    name: 'Stand Magnifier',
    label: 'Stable desktop lens that rests on the page for hands-free use',
    imageUrl: 'https://cdn11.bigcommerce.com/s-j599icwg8d/images/stencil/1280x1280/products/120/2240/7400-30__50541.1623952684.jpg?c=1',
    imageAlt: 'Stand magnifier low vision aid',
  },
  {
    name: 'Hand Magnifier',
    label: 'Portable handheld lens ideal for spotting text on the go',
    imageUrl: 'https://www.lowvisionsupply.com/cdn/shop/products/BiconvexHand-heldMagnifier2x1500x1500_9cc3292b-3004-4f5a-af88-9b5dd53d5573.png?v=1706795292',
    imageAlt: 'Handheld magnifier for reading',
  },
  {
    name: 'Dome Magnifier',
    label: 'Curved acrylic dome that lays directly on text for wide-area clarity',
    imageUrl: 'https://www.optelec.ca/en/wp-content/uploads/sites/12/2024/05/power-dome-magnifier.jpg',
    imageAlt: 'Dome magnifier low vision aid',
  },
];

const ACTIVITY_QUESTIONS = [
  'Reading',
  'Playing cards',
  'Cooking meals',
  'Watching TV',
  'Playing bingo',
  'Needlepoint',
];

export default function LowVisionCare() {
  const ref = useScrollAnimation();

  return (
    <section id="low-vision" className="py-14 md:py-20 border-t border-border/40" style={{ backgroundColor: '#f0f5f5' }}>
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
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

        {/* ─── Part 1: What is a Low Vision Consultation ─── */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-sm" style={{ backgroundColor: NAVY }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Text left */}
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
            {/* Visual right */}
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

        {/* ─── Part 2: Causes ─── */}
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
            {CAUSES.map((cause) => (
              <div
                key={cause.name}
                className="rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
              >
                {/* Image or SVG fallback */}
                <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'rgba(20,126,147,0.08)' }}>
                  {cause.imageUrl ? (
                    <img
                      src={cause.imageUrl}
                      alt={cause.imageAlt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:${TEAL}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="12" cy="12" r="4"/><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/></svg></div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      {/* Post-stroke visual field loss illustration */}
                      <svg viewBox="0 0 120 90" className="w-3/4 h-3/4" fill="none">
                        <ellipse cx="60" cy="45" rx="50" ry="38" fill="rgba(20,126,147,0.12)" stroke={TEAL} strokeWidth="1.5" />
                        <path d="M60 45 Q45 30 30 25 Q20 22 15 28 Q12 34 20 42 Q30 52 45 55 Q55 57 60 45Z" fill="rgba(11,59,73,0.25)" />
                        <circle cx="60" cy="45" r="5" fill={TEAL} opacity="0.7" />
                        <text x="60" y="78" textAnchor="middle" fontSize="8" fill={NAVY} opacity="0.7" fontFamily="sans-serif">Visual field loss</text>
                      </svg>
                    </div>
                  )}
                </div>
                {/* Text */}
                <div className="p-4 flex flex-col gap-1 flex-grow">
                  <h4 className="font-serif text-base font-medium leading-snug" style={{ color: NAVY }}>
                    {cause.name}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
                    {cause.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Part 3: Activity Questions ─── */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-10"
          style={{ backgroundColor: TEAL }}
        >
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

        {/* ─── Part 4: Low Vision Aids ─── */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {AIDS.map((aid) => (
              <div
                key={aid.name}
                className="rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
              >
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(20,126,147,0.06)' }}>
                  <img
                    src={aid.imageUrl}
                    alt={aid.imageAlt}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:${TEAL}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>`;
                      }
                    }}
                  />
                </div>
                {/* Text */}
                <div className="p-4 flex flex-col gap-1 flex-grow">
                  <h4 className="font-serif text-sm font-medium leading-snug" style={{ color: NAVY }}>
                    {aid.name}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: `${NAVY}75` }}>
                    {aid.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4 italic" style={{ color: `${NAVY}60` }}>
            Samples of some of the many low vision aids available at our practice.
          </p>
        </div>

        {/* ─── Part 5: CTA Strip ─── */}
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
