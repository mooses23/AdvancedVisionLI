'use client';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/** Matches the Hero's background exactly — no colour seam between sections. */
const BG = '#D8E4E2';
const CORAL = '#F4614B';
const CHILD_IMG = `${import.meta.env.BASE_URL}images/signs-child.jpg`;

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
    <section
      id="signs"
      className="relative overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      {/* ── TOP ZONE: headline left, child photo right ── */}
      <div className="container mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 md:pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">

          {/* Left column — text */}
          <div className="lg:w-[52%] lg:pr-10">
            <p className="text-[#147E93] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Parent Check List
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight mb-4"
                style={{ color: '#0B3B49' }}>
              Is this{' '}
              <span style={{ color: CORAL }}>your child?</span>
            </h2>
            <p className="text-[#0B3B49]/65 text-base max-w-md leading-relaxed">
              These signs are often mistaken for attention or learning problems —
              but they can point to a treatable vision issue. Check everything
              that sounds familiar.
            </p>
          </div>

          {/* Right column — child photo (desktop only) */}
          <div
            className="hidden lg:block lg:w-[48%] relative self-stretch"
            style={{ minHeight: '240px' }}
          >
            {/* Fade the left and bottom edges into the teal background */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right,  ${BG} 0%,  transparent 32%),
                  linear-gradient(to bottom, transparent 60%, ${BG} 100%)
                `,
              }}
            />
            <img
              src={CHILD_IMG}
              alt="Child resting head on desk, appearing fatigued — a common sign of functional vision problems"
              className="absolute inset-0 w-full h-full object-cover object-[center_18%] rounded-2xl"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* ── CHECKLIST CARD ── */}
      <div
        ref={ref as any}
        className="relative container mx-auto px-6 md:px-10 pb-10 scroll-section"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-black/[0.06] p-4 md:p-5 mb-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {SYMPTOMS.map((symptom, idx) => {
              const isChecked = checked.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggle(idx)}
                  className={`flex items-center gap-3 text-left px-3 py-2 rounded-xl transition-all duration-150 text-sm cursor-pointer select-none
                    ${isChecked
                      ? 'bg-[#0B3B49]/[0.06] text-[#0B3B49]'
                      : 'text-[#0B3B49]/65 hover:bg-[#0B3B49]/[0.04]'
                    }`}
                  aria-pressed={isChecked}
                >
                  {/* Radio-style circular indicator */}
                  <span
                    className={`shrink-0 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all
                      ${isChecked
                        ? 'border-[#0B3B49] bg-[#0B3B49]'
                        : 'border-[#0B3B49]/30'
                      }`}
                    style={{ width: '18px', height: '18px', minWidth: '18px' }}
                  >
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L2.8 5L7 1"
                          stroke="white"
                          strokeWidth="1.6"
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
          <div className="mt-4 pt-3 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <div>
              {count === 0 ? (
                <p className="text-[#0B3B49]/45 text-sm">
                  Tap any symptom to check it off.
                </p>
              ) : count <= 2 ? (
                <p className="text-[#0B3B49] text-sm font-medium">
                  You checked{' '}
                  <span className="font-bold" style={{ color: CORAL }}>{count}</span>{' '}
                  sign{count > 1 ? 's' : ''}.{' '}
                  Even a couple of these can signal a vision issue worth evaluating.
                </p>
              ) : (
                <p className="text-[#0B3B49] text-sm font-medium">
                  You checked{' '}
                  <span className="font-bold" style={{ color: CORAL }}>{count}</span>{' '}
                  signs — this pattern strongly suggests a functional vision
                  problem. An evaluation can help.
                </p>
              )}
            </div>

            {count > 0 && (
              <a
                href="#contact"
                className="shrink-0 inline-flex items-center text-white font-semibold px-5 py-2 rounded-full text-sm shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: CORAL }}
              >
                Schedule a Free Evaluation
              </a>
            )}
          </div>
        </div>

        {/* OVDRA attribution */}
        <p className="flex items-center gap-2 text-xs text-[#0B3B49]/45">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1L8.2 4.5H12L9 6.8L10.2 10.5L7 8L3.8 10.5L5 6.8L2 4.5H5.8L7 1Z"
              fill="#0B3B49"
              fillOpacity="0.35"
            />
          </svg>
          Symptom list sourced from OVDRA (covd.org)
        </p>
      </div>
    </section>
  );
}
