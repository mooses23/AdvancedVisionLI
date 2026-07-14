const TESTIMONIALS = [
  {
    text: "My daughter struggled in school for years. After vision therapy here, she's a completely different student.",
    attribution: 'Parent of patient, Inwood',
  },
  {
    text: "Dr. Stein takes the time to explain everything and really listens. The results have been remarkable.",
    attribution: 'Far Rockaway parent',
  },
  {
    text: "After my concussion I couldn't read for more than a few minutes. Dr. Stein's program made a real difference.",
    attribution: 'Adult patient',
  },
];

export default function TestimonialsStrip() {
  return (
    <section id="testimonials" className="bg-white border-t border-b border-border/40 py-8">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 px-5 py-4 rounded-xl bg-secondary"
            >
              <span className="text-accent font-bold text-xl leading-none" aria-hidden="true">"</span>
              <p className="font-serif text-foreground/80 italic text-sm leading-relaxed -mt-1">
                {t.text}
              </p>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                — {t.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
