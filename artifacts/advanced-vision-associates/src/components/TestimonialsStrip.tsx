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
    <section id="testimonials" className="bg-secondary py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/15 border border-white/20 rounded-2xl px-6 py-5 flex flex-col gap-3"
            >
              <p className="font-serif text-white/90 italic text-sm leading-relaxed">
                "{t.text}"
              </p>
              <p className="text-white/55 text-xs font-semibold uppercase tracking-wide">
                — {t.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
