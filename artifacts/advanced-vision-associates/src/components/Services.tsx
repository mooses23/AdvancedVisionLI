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
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    name: 'Low Vision',
    description: 'Specialized evaluation and management for patients with significant visual impairment, including optical aids and adaptive strategies.',
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

        {/* NYS Commission callout */}
        <div
          className="rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ backgroundColor: '#147E93' }}
        >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl p-5 flex flex-col gap-3 border bg-card border-border/40"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(11,59,73,0.08)', color: '#0B3B49' }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="font-serif text-base md:text-lg text-primary font-medium leading-snug mb-1">
                  {service.name}
                </h3>
                <p className="text-[#0B3B49]/60 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
