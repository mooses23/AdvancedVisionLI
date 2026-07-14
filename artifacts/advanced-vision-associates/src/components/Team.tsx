import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TEAM = [
  {
    name: 'Dr. Marcie Evans Stein',
    credentials: 'OD FABM OVDRA',
    role: 'Optometrist & Founder',
    initials: 'MS',
    bio: 'Dr. Stein has been practicing optometry in Inwood and Far Rockaway for over 40 years. As an OVDRA-recognized developmental optometrist, she is known for her patient, thorough approach — especially with children, for whom vision therapy can be life-changing.',
    // Drop dr-stein.jpg into public/images/ to replace the placeholder
    imageSrc: '/images/dr-stein.jpg',
    imageAlt: 'Dr. Marcie Evans Stein, OD',
  },
  {
    name: 'Dr. Esther Moller',
    credentials: 'OD FAAO',
    role: 'Vision Therapist',
    initials: 'EM',
    bio: 'Dr. Moller brings deep expertise in vision therapy and binocular vision rehabilitation. She works closely with each patient to design and guide personalized therapy programs from start to finish.',
    // Drop dr-moller.jpg into public/images/ to replace the placeholder
    imageSrc: '/images/dr-moller.jpg',
    imageAlt: 'Dr. Esther Moller, OD',
  },
];

function PortraitPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: 'hsl(185 30% 88%)' }}
    >
      <span
        className="font-serif text-2xl font-medium"
        style={{ color: 'hsl(185 42% 30%)' }}
      >
        {initials}
      </span>
    </div>
  );
}

export default function Team() {
  const ref = useScrollAnimation();

  return (
    <section id="team" className="bg-background py-14 md:py-20 border-t border-border/40">
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="text-center mb-10">
          <p className="text-primary/60 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Our Team
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
            Meet the Doctors
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl overflow-hidden p-5 flex items-start gap-5 shadow-xs border border-border/40"
            >
              {/* Portrait — placeholder until real photo is dropped in */}
              <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted">
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Hide broken img and show placeholder sibling
                    (e.target as HTMLImageElement).style.display = 'none';
                    const placeholder = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                {/* Shown only if image fails to load */}
                <div
                  className="w-full h-full items-center justify-center"
                  style={{ display: 'none', background: 'hsl(185 30% 88%)' }}
                >
                  <span
                    className="font-serif text-2xl font-medium"
                    style={{ color: 'hsl(185 42% 30%)' }}
                  >
                    {member.initials}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-primary/60 font-bold text-xs tracking-widest uppercase mb-0.5">
                  {member.credentials}
                </p>
                <h3 className="font-serif text-lg text-primary font-medium leading-snug mb-0.5">
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
