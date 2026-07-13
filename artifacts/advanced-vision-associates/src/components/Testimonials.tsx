import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: "Dr. Stein is incredibly thorough and patient. My daughter struggled in school for years before we found out it was a vision issue — not a learning disability. After vision therapy here, she's a completely different student. We're so grateful.",
    attribution: "Parent of patient, Inwood",
  },
  {
    text: "I was skeptical at first, but the results have been remarkable. Dr. Stein takes the time to explain everything clearly and really listens. Highly recommend for anyone whose child is struggling in school.",
    attribution: "Far Rockaway parent",
  },
  {
    text: "After my concussion, I had persistent double vision and couldn't read for more than a few minutes. Dr. Stein's vision therapy program made a real difference. She's the real deal.",
    attribution: "Adult patient",
  },
];

export default function Testimonials() {
  const ref = useScrollAnimation();

  return (
    <section id="testimonials" className="py-24 bg-accent/20">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
            What Patients Say
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote className="h-10 w-10 text-accent mb-6 opacity-50" />
              <p className="font-serif text-lg italic text-foreground/80 leading-relaxed mb-8">
                "{t.text}"
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                — {t.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
