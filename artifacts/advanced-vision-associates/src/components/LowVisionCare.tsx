import { useState } from 'react';

const TEAL = '#147E93';
const NAVY = '#0B3B49';

/* ─── Data ─── */

const CAUSES = [
  {
    name: 'Macular Degeneration',
    description: 'Damage to the central retina reduces sharp, detailed vision used for reading and recognizing faces.',
    image: '/images/lv-cause-macular.jpg',
    alt: 'Vision simulation showing macular degeneration: clear peripheral vision with a dark blurry patch obscuring the center',
  },
  {
    name: 'Glaucoma',
    description: 'Elevated intraocular pressure progressively damages the optic nerve, narrowing the visual field over time.',
    image: '/images/lv-cause-glaucoma.jpg',
    alt: 'Vision simulation showing glaucoma tunnel vision: narrow circle of clear central vision surrounded by darkness',
  },
  {
    name: 'Diabetes',
    description: 'Diabetic retinopathy causes blood vessels in the retina to leak or grow abnormally, blurring or blocking vision.',
    image: '/images/lv-cause-diabetes.jpg',
    alt: 'Vision simulation showing diabetic retinopathy: scattered dark floating spots and blotches across a normal scene',
  },
  {
    name: 'Post Stroke',
    description: 'Stroke can damage the visual cortex or optic pathways, resulting in field loss, double vision, or processing difficulties.',
    image: '/images/lv-cause-stroke.jpg',
    alt: 'Vision simulation showing hemianopia after stroke: left half of the visual field is completely lost while the right half remains clear',
  },
];

const AIDS = [
  {
    name: 'High Powered Add Glasses',
    label: 'Precision reading lenses with high magnification for near tasks',
    image: '/images/lv-aid-add-glasses.jpg',
    alt: 'High-powered add glasses with thick strong lenses designed for low vision reading',
  },
  {
    name: 'Prism Half Eyes',
    label: 'Prismatic spectacles that shift the image for easier reading',
    image: '/images/lv-aid-prism-glasses.jpg',
    alt: 'Prism half-eye glasses with half-moon frames and prismatic lenses for low vision patients',
  },
  {
    name: 'Stand Magnifier',
    label: 'Stable desktop lens that rests on the page for hands-free use',
    image: '/images/lv-aid-stand-magnifier.jpg',
    alt: 'Stand magnifier with a large lens mounted on adjustable legs, positioned above a printed page',
  },
  {
    name: 'Hand Magnifier',
    label: 'Portable handheld lens ideal for spotting text on the go',
    image: '/images/lv-aid-hand-magnifier.jpg',
    alt: 'Handheld magnifying glass with a round lens and black handle for portable low vision use',
  },
  {
    name: 'Dome Magnifier',
    label: 'Curved acrylic dome that lays directly on text for wide-area clarity',
    image: '/images/lv-aid-dome-magnifier.jpg',
    alt: 'Clear acrylic dome magnifier resting on printed text, providing wide-area magnification',
  },
];

const ACTIVITY_QUESTIONS = ['Reading', 'Playing cards', 'Cooking meals', 'Watching TV', 'Playing bingo', 'Needlepoint'];

const TABS = ['Consultation', 'Causes', 'Daily Activities', 'Aids'] as const;

/* ─── Tab Panels ─── */

function ConsultationPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-0 h-full">
      <div className="p-8 md:p-10 flex flex-col justify-center">
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
  );
}

function CausesPanel() {
  return (
    <div className="p-8 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {CAUSES.map(({ name, description, image, alt }) => (
          <div
            key={name}
            className="rounded-2xl overflow-hidden border flex flex-col"
            style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
              />
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
  );
}

function ActivitiesPanel() {
  return (
    <div className="p-8 md:p-10 flex flex-col items-center justify-center">
      <h3 className="font-serif text-2xl md:text-3xl font-medium text-white mb-2 text-center">
        Have you stopped…?
      </h3>
      <p className="text-white/65 text-xs font-semibold tracking-[0.18em] uppercase mb-6 text-center">
        Does this sound familiar?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 w-full max-w-lg">
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
      <div className="text-center max-w-xl">
        <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-2">
          Is this due to poor vision?
        </p>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          Would you like to start again? Come see how we can help get back your quality of life.
        </p>
      </div>
    </div>
  );
}

function AidsPanel() {
  return (
    <div className="p-8 md:p-10">
      <p className="text-center text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: `${NAVY}99` }}>
        Low vision aids utilize the remaining vision through magnification, image shift, and contrast enhancement to maximize visual potential.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {AIDS.map(({ name, label, image, alt }) => (
          <div
            key={name}
            className="rounded-2xl overflow-hidden border flex flex-col"
            style={{ backgroundColor: 'hsl(168 26% 94%)', borderColor: 'rgba(20,126,147,0.2)' }}
          >
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
              />
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
  );
}

/* ─── Component ─── */

export default function LowVisionCare() {
  const [activeTab, setActiveTab] = useState(0);

  // Consultation tab uses NAVY bg; Activities tab uses TEAL bg; others use light bg
  const isNavyBg = activeTab === 0;
  const isTealBg = activeTab === 2;
  const cardBg = isNavyBg ? NAVY : isTealBg ? TEAL : 'hsl(168 26% 97%)';

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

        {/* Tabbed card */}
        <div className="rounded-3xl overflow-hidden shadow-sm mb-10" style={{ backgroundColor: cardBg, transition: 'background-color 0.2s ease' }}>

          {/* Tab bar */}
          <div
            className="lv-tab-bar flex gap-1 p-2 overflow-x-auto"
            style={{ backgroundColor: 'rgba(0,0,0,0.18)', scrollbarWidth: 'none' }}
          >
            {TABS.map((label, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(i)}
                  className="shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: isActive ? TEAL : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                    border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div style={{ minHeight: '380px' }}>
            {activeTab === 0 && <ConsultationPanel />}
            {activeTab === 1 && <CausesPanel />}
            {activeTab === 2 && <ActivitiesPanel />}
            {activeTab === 3 && <AidsPanel />}
          </div>
        </div>

        {/* CTA Strip */}
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
