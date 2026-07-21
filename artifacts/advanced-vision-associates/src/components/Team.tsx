import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TEAM = [
  {
    name: 'Dr. Marcie Evans Stein',
    credentials: 'OD, FABM, OVDRA',
    role: 'Optometrist & Founder',
    bio: 'Dr. Stein has been practicing optometry for over 40 years, first in Queens and now in Inwood. A graduate of SUNY College of Optometry, she specializes in developmental optometry and binocular vision. Known for her compassionate, patient-centered care, she is an OVDRA member and FABM Fellow dedicated to helping patients of all ages achieve their visual potential.',
    // SWAP: replace with real photo when available
    imageSrc: '/images/dr-stein.jpg',
    imageAlt: 'Dr. Marcie Evans Stein, OD',
  },
  {
    name: 'Dr. Esther Moller',
    credentials: 'OD, FAAO',
    role: 'Optometrist & Low Vision Specialist',
    bio: 'Dr. Moller is a fellowship-trained optometrist and graduate of SUNY College of Optometry, with a residency completed at the Northport VA Medical Center. A Certified Low Vision Specialist, she provides comprehensive primary eye care with focused expertise in binocular vision and low vision rehabilitation.',
    // SWAP: replace with real photo when available
    imageSrc: '/images/dr-moller.jpg',
    imageAlt: 'Dr. Esther Moller, OD',
  },
];

export default function Team() {
  const ref = useScrollAnimation();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="team" className="bg-background py-14 md:py-20 border-t border-border/40">
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="text-center mb-10">
          <p className="text-eyebrow text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Our Team
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
            Meet the Doctors
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5 max-w-4xl mx-auto">
          {TEAM.map((member, index) => {
            const isExpanded = !!expanded[index];
            return (
              <div
                key={member.name}
                className="bg-card rounded-2xl overflow-hidden p-3 md:p-5 flex flex-col gap-3 shadow-xs border border-border/40"
              >
                {/* Portrait + header row */}
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="shrink-0 w-14 h-14 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={member.imageSrc}
                      alt={member.imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Name / credentials */}
                  <div className="min-w-0">
                    <p className="text-eyebrow font-bold text-[10px] md:text-xs tracking-widest uppercase mb-0.5">
                      {member.credentials}
                    </p>
                    <h3 className="font-serif text-sm md:text-lg text-primary font-medium leading-snug mb-0.5">
                      {member.name}
                    </h3>
                    <p
                      className="text-[10px] md:text-xs font-semibold"
                      style={{ color: '#F4614B' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio + toggle */}
                <div>
                  <p
                    className={[
                      'text-[#0B3B49]/65 text-xs md:text-sm leading-relaxed transition-all duration-300',
                      isExpanded ? '' : 'line-clamp-3',
                    ].join(' ')}
                  >
                    {member.bio}
                  </p>
                  <button
                    onClick={() => toggle(index)}
                    className="mt-1 text-[10px] md:text-xs font-semibold min-h-[28px] px-0 py-1"
                    style={{ color: '#F4614B' }}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Collapse' : 'Read more'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
