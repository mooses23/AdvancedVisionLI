import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import drSteinImageSrc from '@assets/generated_images/dr-stein.jpg';
import drMollerImageSrc from '@assets/generated_images/dr-moller.jpg';

const TEAM = [
  {
    name: 'Dr. Marcie Evans Stein',
    credentials: 'OD FABM OVDRA',
    role: 'Optometrist & Founder',
    bio: 'Dr. Stein has been practicing optometry in Inwood and Far Rockaway for over 40 years. As an OVDRA-recognized developmental optometrist, she is known for her patient, thorough approach — especially with children, for whom vision therapy can be life-changing.',
    imageSrc: drSteinImageSrc,
    imageAlt: 'Dr. Marcie Evans Stein, OD',
  },
  {
    name: 'Dr. Esther Moller',
    credentials: 'OD FAAO',
    role: 'Vision Therapist',
    bio: 'Dr. Moller brings deep expertise in vision therapy and binocular vision rehabilitation. She works closely with each patient to design and guide personalized therapy programs from start to finish.',
    imageSrc: drMollerImageSrc,
    imageAlt: 'Dr. Esther Moller, OD',
  },
];

export default function Team() {
  const ref = useScrollAnimation();

  return (
    <section id="team" className="bg-accent py-20 md:py-28">
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="text-center mb-14">
          <p className="text-accent-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Our Team
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-accent-foreground font-medium">
            Meet the Doctors
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {/* SWAP: replace with real photo when available */}
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <p className="text-primary font-bold text-xs tracking-widest uppercase mb-1">
                  {member.credentials}
                </p>
                <h3 className="font-serif text-xl text-foreground font-medium mb-0.5">
                  {member.name}
                </h3>
                <p className="text-secondary text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
