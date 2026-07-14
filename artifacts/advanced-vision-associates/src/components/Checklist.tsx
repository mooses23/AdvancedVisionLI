'use client';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
    <section id="signs" className="relative bg-background overflow-hidden py-16 md:py-24">
      {/* Tired child photo — bottom left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none select-none hidden lg:block z-10"
        style={{ width: '220px', height: '280px' }}
      >
        <div className="relative w-full h-full">
          {/* Fade right and top */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, transparent 50%, hsl(38 38% 96%)), linear-gradient(to bottom, hsl(38 38% 96%) 0%, transparent 25%)',
            }}
          />
          <img
            src="/images/checklist-tired-child.jpg"
            alt="Child appearing tired, illustrating vision-related fatigue"
            className="w-full h-full object-cover object-top rounded-tr-3xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      <div
        ref={ref as any}
        className="relative z-20 container mx-auto px-6 md:px-10 scroll-section"
      >
        <div className="max-w-4xl ml-auto">
          <p className="text-primary/60 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Parent Check List
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl text-primary font-medium mb-4 leading-tight"
          >
            Is this your child?
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-xl">
            These signs are often mistaken for attention or learning problems —
            but they can point to a treatable vision issue. Check everything
            that sounds familiar.
          </p>

          {/* Interactive checklist grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-5 md:p-7 mb-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SYMPTOMS.map((symptom, idx) => {
                const isChecked = checked.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggle(idx)}
                    className={`flex items-center gap-3 text-left px-3 py-2.5 rounded-xl transition-all duration-150 text-sm cursor-pointer select-none
                      ${isChecked
                        ? 'bg-primary/6 text-primary'
                        : 'text-foreground/70 hover:bg-secondary'
                      }`}
                    aria-pressed={isChecked}
                  >
                    {/* Radio-style circular indicator */}
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isChecked
                          ? 'border-primary bg-primary'
                          : 'border-border'
                        }`}
                    >
                      {isChecked && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path
                            d="M1 3.5L3 5.5L8 1"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="font-medium leading-snug">{symptom}</span>
                  </button>
                );
              })}
            </div>

            {/* Live count feedback */}
            <div className="mt-5 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div>
                {count === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Tap any symptom to check it off.
                  </p>
                ) : count <= 2 ? (
                  <p className="text-foreground text-sm font-medium">
                    You checked{' '}
                    <span className="text-primary font-bold">{count}</span>{' '}
                    sign{count > 1 ? 's' : ''}.{' '}
                    Even a couple of these can signal a vision issue worth
                    evaluating.
                  </p>
                ) : (
                  <p className="text-foreground text-sm font-medium">
                    You checked{' '}
                    <span className="text-primary font-bold">{count}</span>{' '}
                    signs — this pattern strongly suggests a functional vision
                    problem. An evaluation can help.
                  </p>
                )}
              </div>

              {count > 0 && (
                <a
                  href="#contact"
                  className="shrink-0 inline-flex items-center text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'hsl(var(--accent))' }}
                >
                  Schedule a Free Evaluation
                </a>
              )}
            </div>
          </div>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L8.2 4.5H12L9 6.8L10.2 10.5L7 8L3.8 10.5L5 6.8L2 4.5H5.8L7 1Z" fill="hsl(185 40% 17% / 0.35)" />
            </svg>
            Symptom list sourced from OVDRA (covd.org)
          </p>
        </div>
      </div>
    </section>
  );
}
