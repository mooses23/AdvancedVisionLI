import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import drMollerImageSrc from '@assets/generated_images/dr-moller.jpg';
import managerImageSrc from '@assets/generated_images/staff-manager.jpg';
import coordinatorImageSrc from '@assets/generated_images/staff-coordinator.jpg';

const STAFF = [
  {
    name: "Dr. Esther Moller",
    role: "Vision Therapist",
    imageSrc: drMollerImageSrc,
    imageAlt: "Dr. Esther Moller, Vision Therapist at Advanced Vision Associates",
    isPlaceholder: false,
  },
  {
    name: "Our Office Manager", // [Staff Name]
    role: "Office Manager",
    imageSrc: managerImageSrc,
    imageAlt: "Office Manager at Advanced Vision Associates",
    isPlaceholder: true,
  },
  {
    name: "Our Patient Coordinator", // [Staff Name]
    role: "Patient Coordinator",
    imageSrc: coordinatorImageSrc,
    imageAlt: "Patient Coordinator at Advanced Vision Associates",
    isPlaceholder: true,
  },
];

export default function Staff() {
  const ref = useScrollAnimation();

  return (
    <section id="team" className="py-24 bg-background">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
            Meet Our Team
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {STAFF.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                {/* SWAP comment: ensure to replace placeholder images and names when available */}
                <img 
                  src={member.imageSrc} 
                  alt={member.imageAlt} 
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className={`text-xl font-medium mb-1 ${member.isPlaceholder ? 'text-foreground/70' : 'text-foreground'}`}>
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm tracking-wide uppercase">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
