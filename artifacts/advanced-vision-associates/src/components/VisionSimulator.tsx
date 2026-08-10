'use client';
import { useEffect, useRef, useState } from 'react';

const NAVY = '#0B3B49';
const CORAL = '#F4614B';
const TEAL = '#147E93';

type Simulation = 'teaming' | 'focusing' | 'tracking';
type Stage = 'idle' | 'simulating' | 'revealed';

// Reading passage used by Focusing and Tracking panels
// Shorter passage for Focusing
const FOCUSING_PASSAGE =
  'Henry looked to the right and then to the left. He wanted to cross the street but the cars were going so fast. He waited and waited for the right moment to run.';

// Tracking passage — wraps to roughly three lines inside the card
const TRACKING_PASSAGE =
  'Henry looked to the right and then to the left. He wanted to cross the street but the cars were going so fast. He waited and waited for the right moment to run.';

// Pre-scripted scrambled windowStart sequence for Tracking (~20 steps, 800ms each ≈ 16s)
const TRACKING_SEQUENCE = [
  0, 72, 22, 118, 45, 150, 8, 95, 58, 132, 30, 155, 3, 105, 68, 142, 16, 85,
  48, 125,
];

// ─── Teaming Panel ───────────────────────────────────────────────────────────
function TeamingPanel({ stage }: { stage: Stage }) {
  const PASSAGE =
    'The quick brown fox jumped over the lazy dog. She read the same line twice before realizing her eyes had slipped — again.';
  return (
    <div className="space-y-2">
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
      <RevealCard stage={stage}>
        <span className="font-bold" style={{ color: CORAL }}>
          Rather frustrating, wasn't it?{' '}
        </span>
        Children with eye teaming problems fight double vision every time they
        read — even if they can see{' '}
        <span className="font-semibold" style={{ color: NAVY }}>
          20/20!
        </span>
      </RevealCard>
    </div>
  );
}

// ─── Focusing Panel ───────────────────────────────────────────────────────────
function FocusingPanel({
  stage,
  active,
}: {
  stage: Stage;
  active: boolean;
}) {
  const isAnimating = active && stage !== 'idle';
  return (
    <div className="space-y-2">
      <div
        className="rounded-lg px-3.5 py-3 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(244,97,75,0.2)',
        }}
      >
        <p
          key={isAnimating ? 'animating' : 'static'}
          className={`text-[14px] md:text-[15px] leading-relaxed font-medium select-none${isAnimating ? ' focus-cycle-active' : ''}`}
          aria-label="Reading passage with simulated focusing difficulty"
          style={{ color: NAVY }}
        >
          {FOCUSING_PASSAGE}
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(11,59,73,0.03) 3px,rgba(11,59,73,0.03) 4px)',
          }}
        />
      </div>
      <RevealCard stage={stage}>
        <span className="font-bold" style={{ color: CORAL }}>
          Did you want to quit reading?{' '}
        </span>
        Children with focusing problems often get headaches and stop reading
        when the print blurs. They have to work so hard to keep print clear
        that they just give up.
      </RevealCard>
    </div>
  );
}

// ─── Tracking Panel ───────────────────────────────────────────────────────────
function TrackingPanel({
  stage,
  active,
}: {
  stage: Stage;
  active: boolean;
}) {
  const [windowStart, setWindowStart] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);
  const running = active && stage !== 'idle';

  useEffect(() => {
    if (!running) return;

    stepRef.current = 0;
    setWindowStart(TRACKING_SEQUENCE[0]);

    intervalRef.current = setInterval(() => {
      stepRef.current += 1;
      if (stepRef.current >= TRACKING_SEQUENCE.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setWindowStart(null);
      } else {
        setWindowStart(TRACKING_SEQUENCE[stepRef.current]);
      }
    }, 800);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const chars = TRACKING_PASSAGE.split('');

  return (
    <div className="space-y-2">
      <div
        className="rounded-lg px-3.5 py-3 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(244,97,75,0.2)',
        }}
      >
        <p
          className="text-[14px] md:text-[15px] leading-relaxed font-medium select-none"
          aria-label="Reading passage with simulated tracking difficulty"
        >
          {chars.map((ch, i) => {
            const highlighted =
              windowStart !== null &&
              i >= windowStart &&
              i < windowStart + 4;
            return (
              <span
                key={i}
                style={{
                  color: highlighted ? NAVY : '#bbb',
                  transition: 'color 0.05s',
                }}
              >
                {ch}
              </span>
            );
          })}
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(11,59,73,0.03) 3px,rgba(11,59,73,0.03) 4px)',
          }}
        />
      </div>
      <RevealCard stage={stage}>
        <span className="font-bold" style={{ color: CORAL }}>
          This made reading very difficult, didn't it?{' '}
        </span>
        Children with tracking problems can't control their eye movements during
        reading. They lose their place so much that comprehension becomes
        impossible.
      </RevealCard>
    </div>
  );
}

// ─── Shared reveal card ───────────────────────────────────────────────────────
function RevealCard({
  stage,
  children,
}: {
  stage: Stage;
  children: React.ReactNode;
}) {
  return (
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
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function VisionSimulator() {
  const [activeSimulation, setActiveSimulation] =
    useState<Simulation>('teaming');
  const [stages, setStages] = useState<Record<Simulation, Stage>>({
    teaming: 'idle',
    focusing: 'idle',
    tracking: 'idle',
  });
  const [expanded, setExpanded] = useState(false);

  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Track whether the scroll-trigger has already fired
  const scrollFiredRef = useRef(false);

  const setStage = (sim: Simulation, stage: Stage) => {
    setStages((prev) => ({ ...prev, [sim]: stage }));
  };

  const startTeaming = () => {
    setExpanded(true);
    setStage('teaming', 'simulating');
    revealTimerRef.current = setTimeout(() => {
      setStage('teaming', 'revealed');
      revealTimerRef.current = null;
    }, 2200);
  };

  const activateSimulation = (sim: Simulation) => {
    // Clear any pending reveal timer from the previous simulation
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    setActiveSimulation(sim);
    setExpanded(true);

    // Reset ALL simulations, then start the selected one fresh
    setStages({
      teaming: sim === 'teaming' ? 'simulating' : 'idle',
      focusing: sim === 'focusing' ? 'simulating' : 'idle',
      tracking: sim === 'tracking' ? 'simulating' : 'idle',
    });

    // All simulations reveal their message on the same 2.2 s timeline
    revealTimerRef.current = setTimeout(() => {
      setStage(sim, 'revealed');
      revealTimerRef.current = null;
    }, 2200);
  };

  // One-shot IntersectionObserver — fires once per page load, starts Teaming
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !scrollFiredRef.current) {
          scrollFiredRef.current = true;
          observer.disconnect();
          delayTimerRef.current = setTimeout(() => {
            delayTimerRef.current = null;
            // Only auto-start if we're still on teaming and haven't started yet
            setStages((prev) => {
              if (prev.teaming === 'idle') {
                startTeaming();
              }
              return prev;
            });
          }, 1000);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (delayTimerRef.current !== null) clearTimeout(delayTimerRef.current);
      if (revealTimerRef.current !== null) clearTimeout(revealTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pills: { key: Simulation; label: string }[] = [
    { key: 'teaming', label: 'Teaming' },
    { key: 'focusing', label: 'Focusing' },
    { key: 'tracking', label: 'Tracking' },
  ];

  return (
    <div ref={rootRef} className="mt-3 pt-3 border-t border-black/[0.06]">
      {/* Label row + pill selector */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className="flex items-center gap-1.5 text-[12.5px]"
          style={{ color: `${NAVY}99` }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="6.5"
              stroke={TEAL}
              strokeWidth="1.8"
            />
            <circle cx="12" cy="12" r="2.8" fill={TEAL} />
          </svg>
          Wonder what your child sees?
        </span>

        {/* Pill buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {pills.map(({ key, label }) => {
            const isActive = activeSimulation === key;
            return (
              <button
                key={key}
                onClick={() => activateSimulation(key)}
                className="text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full transition-all duration-200"
                style={{
                  background: isActive ? TEAL : 'transparent',
                  color: isActive ? '#fff' : `${NAVY}99`,
                  border: `1px solid ${isActive ? TEAL : `${NAVY}30`}`,
                  cursor: 'pointer',
                }}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable simulation panel — slow, heavy drop */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: expanded ? '460px' : '0',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(24px)',
          transition:
            'max-height 2.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="mt-2.5">
          {activeSimulation === 'teaming' && (
            <TeamingPanel stage={stages.teaming} />
          )}
          {activeSimulation === 'focusing' && (
            <FocusingPanel
              stage={stages.focusing}
              active={activeSimulation === 'focusing'}
            />
          )}
          {activeSimulation === 'tracking' && (
            <TrackingPanel
              stage={stages.tracking}
              active={activeSimulation === 'tracking'}
            />
          )}
        </div>
      </div>
    </div>
  );
}
