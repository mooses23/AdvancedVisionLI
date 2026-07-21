'use client';
import { useEffect, useRef, useState } from 'react';

const NAVY = '#0B3B49';
const CORAL = '#F4614B';
const TEAL = '#147E93';

const PASSAGE =
  'The quick brown fox jumped over the lazy dog. She read the same line twice before realizing her eyes had slipped — again.';

export default function VisionSimulator() {
  const [stage, setStage] = useState<'idle' | 'simulating' | 'revealed'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleShowMe = () => {
    setStage('simulating');
    timerRef.current = setTimeout(() => {
      setStage((prev) => (prev === 'simulating' ? 'revealed' : prev));
      timerRef.current = null;
    }, 2200);
  };

  const handleReset = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setStage('idle');
  };

  return (
    <div className="mt-3 pt-3 border-t border-black/[0.06]">
      {/* Trigger row — always visible */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex items-center gap-1.5 text-[12.5px]" style={{ color: `${NAVY}99` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <ellipse cx="12" cy="12" rx="10" ry="6.5" stroke={TEAL} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="2.8" fill={TEAL} />
          </svg>
          Wonder what your child sees?
        </span>

        {stage === 'idle' ? (
          <button
            type="button"
            onClick={handleShowMe}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-opacity hover:opacity-85 cursor-pointer"
            style={{ backgroundColor: `${TEAL}18`, color: TEAL, border: `1px solid ${TEAL}30` }}
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 2L12 7L3 12V2Z" fill={TEAL} />
            </svg>
            Show me
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-opacity hover:opacity-85 cursor-pointer"
            style={{ backgroundColor: 'rgba(11,59,73,0.06)', color: `${NAVY}bb`, border: '1px solid rgba(11,59,73,0.12)' }}
          >
            ✕ Reset
          </button>
        )}
      </div>

      {/* Expandable passage — only shown when active */}
      {stage !== 'idle' && (
        <div className="mt-2.5 space-y-2">
          {/* Passage with double-vision effect */}
          <div
            className="rounded-lg px-3.5 py-3 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(244,97,75,0.2)',
            }}
          >
            <p
              className="text-[14px] md:text-[15px] leading-relaxed font-medium select-none double-vision-active"
              aria-label="Reading passage with simulated double vision"
              style={{ color: NAVY }}
            >
              {PASSAGE}
            </p>
            {/* scan-line texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background:
                  'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(11,59,73,0.03) 3px,rgba(11,59,73,0.03) 4px)',
              }}
            />
          </div>

          {/* Reveal message */}
          <div
            className="rounded-lg px-3.5 py-2.5 text-[12.5px] leading-snug"
            style={{
              background: `${CORAL}10`,
              border: `1px solid ${CORAL}28`,
              color: NAVY,
              opacity: stage === 'revealed' ? 1 : 0,
              transform: stage === 'revealed' ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: stage === 'revealed' ? 'auto' : 'none',
            }}
            aria-live="polite"
          >
            <span className="font-bold" style={{ color: CORAL }}>Rather frustrating, wasn't it? </span>
            Children with eye teaming problems fight double vision every time they read —
            even if they can see{' '}
            <span className="font-semibold" style={{ color: NAVY }}>20/20!</span>
          </div>
        </div>
      )}
    </div>
  );
}
