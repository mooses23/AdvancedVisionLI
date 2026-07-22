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
    term: 'Visual Processing',
    def: 'How our brain interprets and uses visual information',
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
            <p className="text-eyebrow text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              What is Vision Therapy?
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl text-primary font-medium mb-5 leading-tight"
            >
              Training the visual system,{' '}
              <em className="not-italic" style={{ color: '#F4614B' }}>
                not just the eye
              </em>
            </h2>

            <div className="space-y-4 text-[#0B3B49]/65 text-base leading-relaxed">
              <p>
                Vision therapy works on developing, improving or enhancing a
                patient's visual skills. These skills are necessary for proper
                achievement in school, work, play or daily living.
              </p>
              <p>
                Vision therapy utilizes various exercises combined with
                specialized lenses to train the internal and external eye
                muscles, together with the brain.
              </p>
              <p className="font-semibold text-[#0B3B49]/80">
                The goal is to achieve harmonious, smooth coordination of the
                two eyes — so the patient can{' '}
                <em style={{ color: '#F4614B' }}>
                  see to work, rather than work to see.
                </em>
              </p>
            </div>

            {/* Teal squiggly wave */}
            <WaveDecoration className="mt-6 mb-5" />
          </div>

          {/* Right — visual skills grid */}
          <div>
            <p className="text-eyebrow text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Visual Skills We Develop
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VISUAL_SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.term}
                    className="flex items-start gap-3 bg-card rounded-xl px-3.5 py-3 shadow-xs"
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
                      <p className="text-[#0B3B49] font-semibold text-sm leading-snug">
                        {skill.term}
                      </p>
                      <p className="text-[#0B3B49]/65 text-xs leading-snug mt-0.5">
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
        className="hidden xl:block absolute pointer-events-none select-none z-0"
        style={{
          right: 0,
          bottom: '-180px',
          width: '320px',
          height: '480px',
        }}
      >
        <div className="relative w-full h-full">
          {/* Gradient mask: fades left edge and bottom */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, rgba(216,228,226,0) 0%, transparent 100%), linear-gradient(to top, transparent 0%, transparent 85%, #D8E4E2 100%)',
            }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 z-10 w-24"
            style={{
              background: 'linear-gradient(to right, #D8E4E2, transparent)',
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
