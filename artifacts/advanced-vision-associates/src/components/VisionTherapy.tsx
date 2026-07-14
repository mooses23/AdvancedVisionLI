import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { WaveDecoration, BlobTeal, BlobSand } from './Blobs';
import {
  Eye,
  Crosshair,
  RotateCcw,
  Layers,
  Maximize2,
  Link2,
  Target,
  Sparkles,
} from 'lucide-react';

const VISUAL_SKILLS = [
  {
    term: 'Tracking',
    def: 'Smoothly follow a moving object with your eyes',
    icon: Eye,
    iconBg: '#5bbfb8',
    iconColor: '#ffffff',
  },
  {
    term: 'Fixation',
    def: 'Hold a steady gaze on a stationary object',
    icon: Crosshair,
    iconBg: '#e07060',
    iconColor: '#ffffff',
  },
  {
    term: 'Focus change',
    def: 'Switch focus between near and far without blur',
    icon: RotateCcw,
    iconBg: '#5cb86a',
    iconColor: '#ffffff',
  },
  {
    term: 'Depth perception',
    def: 'Judge space between objects accurately',
    icon: Layers,
    iconBg: '#6a8fc0',
    iconColor: '#ffffff',
  },
  {
    term: 'Peripheral vision',
    def: 'Notice what\'s happening around you',
    icon: Maximize2,
    iconBg: '#e8a840',
    iconColor: '#ffffff',
  },
  {
    term: 'Binocularity',
    def: 'Coordinate both eyes smoothly together',
    icon: Link2,
    iconBg: '#e8a840',
    iconColor: '#ffffff',
  },
];

export default function VisionTherapy() {
  const ref = useScrollAnimation();

  return (
    <section
      id="vision-therapy"
      className="relative bg-background overflow-hidden py-16 md:py-24 border-t border-border/40"
    >
      {/* Background blobs */}
      <BlobTeal className="absolute -top-20 -right-16 w-[320px] h-[320px] pointer-events-none select-none opacity-60" />
      <BlobSand className="absolute bottom-0 left-0 w-[260px] h-[260px] pointer-events-none select-none opacity-50" />

      <div
        ref={ref as any}
        className="relative z-10 container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — description */}
          <div>
            <p className="text-primary/60 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              What is Vision Therapy?
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl text-primary font-medium mb-5 leading-tight"
            >
              Training the visual system,{' '}
              <em className="not-italic" style={{ color: 'hsl(var(--accent))' }}>
                not just the eye
              </em>
            </h2>

            <div className="space-y-4 text-foreground/65 text-base leading-relaxed">
              <p>
                Vision therapy works on developing, improving or enhancing a
                patient's visual skills. These skills are necessary for proper
                achievement in school, work or play.
              </p>
              <p>
                Vision therapy utilizes various exercises combined with
                specialized lenses to train the internal and external eye
                muscles, together with the brain.
              </p>
              <p className="font-semibold text-foreground/80">
                The goal is to achieve harmonious, smooth coordination of the
                two eyes — so the patient can{' '}
                <em style={{ color: 'hsl(var(--accent))' }}>
                  see to work, rather than work to see.
                </em>
              </p>
            </div>

            {/* Teal squiggly wave */}
            <WaveDecoration className="mt-6 mb-5" />

            {/* OVDRA badge */}
            <div className="inline-flex items-center gap-2.5 border border-primary/25 text-primary/75 px-4 py-2.5 rounded-full text-sm font-medium bg-primary/5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9L3 12L4.5 7.5L1 5H5.5L7 1Z" fill="hsl(185 42% 22%)" fillOpacity="0.7" />
              </svg>
              OVDRA Recognized Provider — Dr. Marcie Evans Stein, OD FABM OVDRA
            </div>
          </div>

          {/* Right — visual skills grid */}
          <div>
            <p className="text-primary/60 text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Visual Skills We Develop
            </p>
            <div className="grid grid-cols-2 gap-3">
              {VISUAL_SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.term}
                    className="flex items-start gap-3 bg-white rounded-xl px-3.5 py-3 shadow-xs"
                  >
                    {/* Colored circular icon */}
                    <div
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: skill.iconBg }}
                    >
                      <Icon
                        size={16}
                        color={skill.iconColor}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground font-semibold text-sm leading-snug">
                        {skill.term}
                      </p>
                      <p className="text-muted-foreground text-xs leading-snug mt-0.5">
                        {skill.def}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Boy-with-glasses photo — positioned below the grid, right side, overflows into Checklist */}
      <div
        className="hidden xl:block absolute pointer-events-none select-none z-20"
        style={{
          right: 0,
          bottom: '-180px',
          width: '380px',
          height: '480px',
        }}
      >
        <div className="relative w-full h-full">
          {/* Gradient mask: fades left edge and bottom */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, hsl(38 38% 96% / 0) 0%, transparent 100%), linear-gradient(to top, transparent 0%, transparent 85%, hsl(38 38% 96%) 100%)',
            }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 z-10 w-24"
            style={{
              background: 'linear-gradient(to right, hsl(38 38% 96%), transparent)',
            }}
          />
          <img
            src="/images/vt-anaglyph-boy.jpg"
            alt="Child doing vision therapy with anaglyph glasses"
            className="w-full h-full object-cover object-top rounded-tl-3xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>
    </section>
  );
}
