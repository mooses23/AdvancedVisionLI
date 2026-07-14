import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import cutoutSrc from '@assets/generated_images/cutout-glasses-girl.png';

const VISUAL_SKILLS = [
  { term: 'Tracking', def: 'Smoothly follow a moving object with your eyes' },
  { term: 'Fixation', def: 'Hold a steady gaze on a stationary object' },
  { term: 'Focus change', def: 'Switch focus between near and far without blur' },
  { term: 'Depth perception', def: 'Judge space between objects accurately' },
  { term: 'Peripheral vision', def: 'Notice what\'s happening around you' },
  { term: 'Binocularity', def: 'Coordinate both eyes smoothly together' },
  { term: 'Attention', def: 'Stay on a visual task without losing focus' },
  { term: 'Visualization', def: 'Form and manipulate mental images' },
];

export default function VisionTherapy() {
  const ref = useScrollAnimation();

  return (
    <section id="vision-therapy" className="relative bg-white overflow-hidden py-14 md:py-20 border-t border-border/40">
      <div
        ref={ref as any}
        className="relative z-10 container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — definition */}
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              What is Vision Therapy?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-6 leading-tight">
              Training the visual system,{' '}
              <em className="text-primary not-italic">not just the eye</em>
            </h2>

            <div className="space-y-4 text-foreground/75 text-base leading-relaxed">
              <p>
                Vision therapy works on developing, improving or enhancing a patient's visual skills.
                These skills are necessary for proper achievement in school, work or play.
              </p>
              <p>
                Vision therapy utilizes various exercises combined with specialized lenses to train
                the internal and external eye muscles, together with the brain.
              </p>
              <p className="font-semibold text-foreground">
                The goal is to achieve harmonious, smooth coordination of the two eyes — so the patient can{' '}
                <em style={{ color: 'hsl(var(--primary))' }}>see to work, rather than work to see.</em>
              </p>
            </div>

            <div className="mt-7 inline-flex items-center gap-3 bg-primary/8 border border-primary/20 text-primary px-5 py-3 rounded-full text-sm font-medium">
              ✓&nbsp; OVDRA Recognized Provider — Dr. Marcie Evans Stein, OD FABM OVDRA
            </div>
          </div>

          {/* Right — visual skills 2×4 grid */}
          <div className="relative">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Visual Skills We Develop
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
              {VISUAL_SKILLS.map((skill) => (
                <div
                  key={skill.term}
                  className="bg-secondary rounded-xl px-4 py-3"
                >
                  <p className="text-foreground font-semibold text-sm mb-0.5">{skill.term}</p>
                  <p className="text-muted-foreground text-xs leading-snug">{skill.def}</p>
                </div>
              ))}
            </div>

            {/* Cutout — bleeds off the right edge on large screens */}
            <div
              className="hidden xl:block absolute -bottom-20 -right-16 pointer-events-none select-none"
              style={{ height: '280px' }}
            >
              <img
                src={cutoutSrc}
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain object-bottom drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
