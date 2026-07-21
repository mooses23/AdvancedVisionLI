'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSymptoms } from '@/context/SymptomsContext';
import VisionSimulator from '@/components/VisionSimulator';

/** Matches the Hero's background exactly — combined with the hero's bottom
 *  seam-dissolve gradient, the two sections read as one continuous canvas. */
const BG = '#D8E4E2';
const NAVY = '#0B3B49';
const CORAL = '#F4614B';
const SAND = '#EBCE9D';
const BLOB_TEAL = '#99CBC1';
const CHILD_IMG = `${import.meta.env.BASE_URL}images/signs-child.jpg`;

/* closed organic blob — same visual language as the hero's decorations */
const BLOB_D =
  'M100,6 Q148,2 172,38 Q196,72 186,116 Q176,160 134,180 Q92,200 54,176 Q18,152 12,108 Q6,64 38,32 Q66,8 100,6 Z';

const SYMPTOMS = [
  'Difficulty copying from the board',
  'Distance blur after near activities',
  'Repeats lines when reading',
  'Reverses letters',
  'Avoids reading',
  'Poor reading comprehension',
  'Misaligns digits in columns of numbers',
  'Poor stamina in visual tasks',
  'Eye turn',
  'Covers/closes an eye',
  'Double vision complaints',
  'Eye strain complaints',
  'Headache complaints',
  'Eye irritation complaints',
  'Eye rubbing / tearing',
  'Head turn / tilt',
  'Blurry near vision',
  'Blurry distance vision',
  'Bumps into surroundings',
  'Clumsy',
  'Underperforms relative to intelligence',
  'Avoids sports',
  'Amblyopia diagnosis',
];

const PAGE_SIZE = 8;
/** Fixed three-page split; each entry keeps its global index into SYMPTOMS. */
const PAGES: { symptom: string; idx: number }[][] = [
  SYMPTOMS.slice(0,        PAGE_SIZE  ).map((symptom, i) => ({ symptom, idx: i })),
  SYMPTOMS.slice(PAGE_SIZE, PAGE_SIZE * 2).map((symptom, i) => ({ symptom, idx: i + PAGE_SIZE })),
  SYMPTOMS.slice(PAGE_SIZE * 2).map((symptom, i) => ({ symptom, idx: i + PAGE_SIZE * 2 })),
];

export default function Checklist() {
  const ref = useScrollAnimation();
  const { checked, toggleSymptom } = useSymptoms();

  const [api, setApi] = useState<CarouselApi>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setPage(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const count = checked.size;

  return (
    <section
      id="signs"
      className="relative overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      {/* Decorative echoes of the hero's blobs — the shape language
          re-emerges below the junction so the two sections flow as one */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ left: -48, top: 16, width: 140, height: 140, opacity: 0.5 }}
      >
        <path d={BLOB_D} fill={SAND} />
      </svg>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{ right: -60, top: '44%', width: 180, height: 180, opacity: 0.35 }}
      >
        <path d={BLOB_D} fill={BLOB_TEAL} />
      </svg>

      {/* ── TOP ZONE: headline + child photo ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-4 md:pb-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-0">

          {/* Text */}
          <div className="lg:w-[52%] lg:pr-10">
            <p className="text-[#147E93] text-xs font-semibold tracking-[0.18em] uppercase mb-2.5">
              Parent Check List
            </p>
            <h2
              className="font-serif text-[1.9rem] sm:text-4xl md:text-5xl font-medium leading-tight mb-3"
              style={{ color: NAVY }}
            >
              Is this <span style={{ color: CORAL }}>your child?</span>
            </h2>
            <p className="text-[15px] md:text-base max-w-md leading-relaxed" style={{ color: 'rgba(11,59,73,0.65)' }}>
              These signs are often mistaken for attention or learning problems —
              but they can point to a treatable vision issue. Check everything
              that sounds familiar.
            </p>
          </div>

          {/* Child photo — every breakpoint, soft-blended into the background */}
          <div className="relative w-full h-[200px] sm:h-[250px] lg:w-[48%] lg:h-auto lg:self-stretch lg:min-h-[250px]">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right,  ${BG} 0%, rgba(216,228,226,0) 28%),
                  linear-gradient(to left,   ${BG} 0%, rgba(216,228,226,0) 18%),
                  linear-gradient(to bottom, rgba(216,228,226,0) 58%, ${BG} 100%),
                  linear-gradient(to top,    rgba(216,228,226,0) 85%, ${BG} 100%)
                `,
              }}
            />
            <img
              src={CHILD_IMG}
              alt="Child resting head on desk, appearing fatigued — a common sign of functional vision problems"
              className="absolute inset-0 w-full h-full object-cover object-[center_22%]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* ── CHECKLIST CARD ── */}
      <div
        ref={ref as any}
        className="relative z-10 container mx-auto px-6 md:px-10 pb-8 scroll-section"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-black/[0.06] p-3 md:p-4 mb-2.5">
          {/* ── Pager: 2 pages of 9 symptoms ── */}
          <div className="relative">
            {/* Screen-reader announcement of page changes */}
            <span className="sr-only" aria-live="polite">
              Page {page + 1} of {PAGES.length}
            </span>

            {/* Left arrow */}
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label={`Previous symptoms page (page ${page + 1} of ${PAGES.length} shown)`}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0B3B49]/15 bg-white shadow-sm text-[#0B3B49] hover:bg-[#0B3B49]/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B49] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label={`Next symptoms page (page ${page + 1} of ${PAGES.length} shown)`}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0B3B49]/15 bg-white shadow-sm text-[#0B3B49] hover:bg-[#0B3B49]/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B49] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>

            <Carousel
              setApi={setApi}
              opts={{ loop: true, align: 'start' }}
              className="mx-9 sm:mx-11"
            >
              <CarouselContent className="-ml-0">
                {PAGES.map((pageItems, pageIdx) => (
                  <CarouselItem
                    key={pageIdx}
                    className="pl-0"
                    aria-label={`Symptoms page ${pageIdx + 1} of ${PAGES.length}`}
                    inert={pageIdx !== page || undefined}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-0.5 sm:gap-1 h-full content-start">
                      {pageItems.map(({ symptom, idx }) => {
                        const isChecked = checked.has(idx);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleSymptom(idx)}
                            className={`flex items-center gap-2 sm:gap-2.5 text-left px-2 sm:px-2.5 py-1.5 rounded-lg transition-all duration-150 text-[12.5px] sm:text-[13.5px] cursor-pointer select-none
                              ${isChecked
                                ? 'bg-[#0B3B49]/[0.06] text-[#0B3B49]'
                                : 'text-[#0B3B49]/65 hover:bg-[#0B3B49]/[0.04]'
                              }`}
                            aria-pressed={isChecked}
                          >
                            {/* Radio-style circular indicator */}
                            <span
                              className={`shrink-0 rounded-full border-2 flex items-center justify-center transition-all
                                ${isChecked
                                  ? 'border-[#0B3B49] bg-[#0B3B49]'
                                  : 'border-[#0B3B49]/30'
                                }`}
                              style={{ width: 16, height: 16, minWidth: 16 }}
                            >
                              {isChecked && (
                                <svg width="7" height="5" viewBox="0 0 8 6" fill="none">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Page indicator */}
          <div className="mt-2.5 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="text-[13px] font-bold tabular-nums" style={{ color: NAVY }}>
              {page + 1} / {PAGES.length}
            </span>
            <span className="flex items-center gap-1.5">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  tabIndex={-1}
                  onClick={() => api?.scrollTo(i)}
                  className="rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    width: i === page ? 18 : 7,
                    height: 7,
                    backgroundColor: i === page ? CORAL : 'rgba(11,59,73,0.2)',
                  }}
                />
              ))}
            </span>
          </div>

          {/* Vision simulator */}
          <VisionSimulator />

          {/* Live count feedback */}
          <div className="mt-3 pt-3 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
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
              fill={NAVY}
              fillOpacity="0.35"
            />
          </svg>
          Symptom list sourced from OVDRA (covd.org)
        </p>
      </div>
    </section>
  );
}
