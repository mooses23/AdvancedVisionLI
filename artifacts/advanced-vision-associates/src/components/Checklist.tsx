'use client';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import cutoutSrc from '@assets/generated_images/cutout-bat-tracking.png';

const SYMPTOMS = [
  'Difficulty copying from the board',
  'Distance blur after near activities',
  'Repeats lines when reading',
  'Reverses letters',
  'Avoids reading',
  'Poor reading comprehension',
  'Misaligns digits in columns',
  'Poor stamina in visual tasks',
  'Eye turn (one eye drifts)',
  'Covers or closes one eye',
  'Double vision complaints',
  'Eye strain or headache complaints',
  'Eye rubbing / tearing',
  'Head turn or tilt',
  'Blurry near or distance vision',
  'Bumps into surroundings / clumsy',
  'Underperforms relative to intelligence',
  'Avoids sports or outdoor activities',
];

export default function Checklist() {
  const ref = useScrollAnimation();
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const count = checked.size;

  return (
    <section id="signs" className="relative bg-secondary overflow-hidden py-14 md:py-20">
      {/* Cutout — bleeds off left edge */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none select-none hidden lg:block"
        style={{ height: '75%', maxHeight: '460px' }}
      >
        <img
          src={cutoutSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-auto object-contain object-bottom"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>

      <div
        ref={ref as any}
        className="relative z-10 container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="max-w-4xl ml-auto">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Parent Check List
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-3 leading-tight">
            Is this your child?
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-xl">
            These signs are often mistaken for attention or learning problems — but they
            can point to a treatable vision issue. Check everything that sounds familiar.
          </p>

          {/* Interactive checklist grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-5 md:p-7 mb-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SYMPTOMS.map((symptom, idx) => {
                const isChecked = checked.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggle(idx)}
                    className={`flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl border-2 transition-all duration-150 text-sm font-medium cursor-pointer select-none
                      ${isChecked
                        ? 'border-primary bg-primary/8 text-primary'
                        : 'border-border/50 bg-background/60 text-foreground/75 hover:border-primary/40 hover:bg-primary/4'
                      }`}
                    aria-pressed={isChecked}
                  >
                    <span
                      className={`shrink-0 w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors
                        ${isChecked ? 'bg-primary border-primary' : 'border-border'}`}
                    >
                      {isChecked && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {symptom}
                  </button>
                );
              })}
            </div>

            {/* Live count feedback */}
            <div className="mt-5 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between transition-all">
              <div>
                {count === 0 ? (
                  <p className="text-muted-foreground text-sm">Tap any symptom to check it off.</p>
                ) : count <= 2 ? (
                  <p className="text-foreground text-sm font-medium">
                    You checked <span className="text-primary font-bold">{count}</span> sign{count > 1 ? 's' : ''}.
                    {' '}Even a couple of these can signal a vision issue worth evaluating.
                  </p>
                ) : (
                  <p className="text-foreground text-sm font-medium">
                    You checked <span className="text-primary font-bold">{count}</span> signs —
                    {' '}this pattern strongly suggests a functional vision problem. An evaluation can help.
                  </p>
                )}
              </div>

              {count > 0 && (
                <a
                  href="#contact"
                  className="shrink-0 inline-flex items-center bg-primary text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Schedule a Free Evaluation
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic text-right">
            Symptom list sourced from OVDRA (covd.org)
          </p>
        </div>
      </div>
    </section>
  );
}
