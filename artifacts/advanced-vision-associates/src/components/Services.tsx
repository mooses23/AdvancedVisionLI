import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="4" />
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      </svg>
    ),
    name: 'Comprehensive Eye Exam',
    description: 'Full evaluation of visual acuity, eye health, and binocular function for patients of all ages.',
    lowVision: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    name: 'Visual Perceptual Evaluation',
    description: 'Assessment of how the brain interprets visual information, often linked to learning and reading challenges.',
    lowVision: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    name: 'Vision Therapy',
    description: 'Individualized, doctor-supervised program to improve eye teaming, tracking, and focusing skills.',
    lowVision: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    name: 'Low Vision Evaluation',
    description: 'Specialized exam for patients with significant visual impairment to maximize remaining functional vision.',
    lowVision: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M8 12h.01M16 12h.01" />
        <path d="M6 18v2M18 18v2" />
      </svg>
    ),
    name: 'Low Vision Device Training',
    description: 'Hands-on guidance using optical and electronic aids — magnifiers, telescopes, and screen technology — to restore independence.',
    lowVision: true,
  },
];

export default function Services() {
  const ref = useScrollAnimation();

  return (
    <section id="services" className="bg-background py-14 md:py-20 border-t border-border/40">
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-eyebrow text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
            Our Services
          </h2>
        </div>

        {/* NYS Commission callout — must catch the eye immediately */}
        <div
          className="rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ backgroundColor: '#147E93' }}
        >
          {/* Badge icon */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm md:text-base leading-snug">
              We are contracted with the Commission for the Blind of New York State
            </p>
            <p className="text-white/80 text-xs md:text-sm mt-1 leading-relaxed">
              NYS residents with visual impairment may be eligible for services covered through CBVH — at no cost to you.
            </p>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className={[
                'rounded-2xl p-5 flex flex-col gap-3 border',
                service.lowVision
                  ? 'bg-card border-[#147E93]/40'
                  : 'bg-card border-border/40',
              ].join(' ')}
            >
              {/* Icon + optional Low Vision badge */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: service.lowVision
                      ? 'rgba(20,126,147,0.12)'
                      : 'rgba(11,59,73,0.08)',
                    color: service.lowVision ? '#147E93' : '#0B3B49',
                  }}
                >
                  {service.icon}
                </div>
                {service.lowVision && (
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: 'rgba(20,126,147,0.12)', color: '#147E93' }}
                  >
                    Low Vision
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-base md:text-lg text-primary font-medium leading-snug mb-1">
                  {service.name}
                </h3>
                <p className="text-[#0B3B49]/60 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
                {service.lowVision && (
                  <a
                    href="#low-vision"
                    className="inline-block mt-2 text-xs font-medium transition-colors"
                    style={{ color: '#147E93' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0f6677')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#147E93')}
                  >
                    See Low Vision details ↓
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
