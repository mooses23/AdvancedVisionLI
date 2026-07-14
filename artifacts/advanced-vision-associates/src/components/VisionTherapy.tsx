import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import cutoutSrc from '@assets/generated_images/cutout-glasses-girl.png';

const VISUAL_SKILLS = [
  { term: 'Tracking', def: 'Smoothly follow a slow-moving object with your eyes' },
  { term: 'Fixation', def: 'Hold a steady gaze on a stationary object' },
  { term: 'Focus change', def: 'Quickly switch focus between near and far without blur' },
  { term: 'Depth perception', def: 'Judge the space between objects; move without clumsiness' },
  { term: 'Peripheral vision', def: 'Notice what\'s happening around you while focused on a task' },
  { term: 'Binocularity', def: 'Coordinate both eyes smoothly for maximum visual information' },
  { term: 'Maintaining attention', def: 'Stay on a visual task without losing concentration' },
  { term: 'Visualization', def: 'Form mental images and manipulate them to synthesize new ones' },
];

export default function VisionTherapy() {
  const ref = useScrollAnimation();

  return (
    <section id="vision-therapy" className="relative bg-secondary overflow-hidden py-20 md:py-28">
      {/* Decorative circle */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      <div
        ref={ref as any}
        className="relative z-10 container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left — definition */}
          <div>
            <p className="text-white/60 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              What is Vision Therapy?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium mb-8 leading-tight">
              Training the visual system,{' '}
              <em>not just the eye</em>
            </h2>

            <div className="space-y-5 text-white/80 text-base leading-relaxed">
              <p>
                Vision therapy works on developing, improving or enhancing a patient's visual skills.
                These skills are necessary for proper achievement in school, work or play.
              </p>
              <p>
                Vision therapy utilizes various exercises combined with specialized lenses to train
                the internal and external eye muscles, together with the brain.
              </p>
              <p className="font-semibold text-white">
                The goal is to achieve harmonious, smooth coordination of the two eyes and to gain
                the ability to hold and change focus when necessary — so the patient can{' '}
                <em>see to work, rather than work to see.</em>
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 bg-white/15 border border-white/20 text-white px-5 py-3 rounded-full text-sm font-medium">
              ✓&nbsp; OVDRA Recognized Provider — Dr. Marcie Evans Stein, OD FABM OVDRA
            </div>
          </div>

          {/* Right — visual skills */}
          <div className="relative">
            <p className="text-white/60 text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Visual Skills We Develop
            </p>
            <ul className="space-y-0 divide-y divide-white/15">
              {VISUAL_SKILLS.map((skill) => (
                <li key={skill.term} className="py-3.5 flex gap-4 items-baseline">
                  <span className="text-white font-semibold shrink-0 w-36 text-sm md:text-base">
                    {skill.term}
                  </span>
                  <span className="text-white/70 text-sm leading-snug">{skill.def}</span>
                </li>
              ))}
            </ul>

            {/* Cutout — bleeds off the right edge on large screens */}
            <div
              className="hidden xl:block absolute -bottom-28 -right-16 pointer-events-none select-none"
              style={{ height: '340px' }}
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
