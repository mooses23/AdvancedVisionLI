/** Hero — layered composition matched to the desktop & mobile mockups.
 *  One CSS background color owns the whole section (no seam possible);
 *  decorations sit behind a genuinely transparent girl cutout.
 */
import { useId } from 'react';
import type { CSSProperties } from 'react';

const BG = '#D8E4E2';
const NAVY = '#0B3B49';
const CORAL = '#F4614B';
const EYEBROW_TEAL = '#147E93';
const CIRCLE_TEAL = '#71B7B8'; // dotted circle top-right
const BLOB_RIGHT = '#99CBC1'; // right-edge blob
const BLOB_ELBOW = '#6CB0B1'; // small blob near the girl's sleeve
const BLOB_MID = '#9DC4C0'; // mobile mid-left blob
const SAND = '#EBCE9D';
const GOLD = '#E9C185';
const CIRCLE_LIGHT = '#E0EBE8'; // soft circle behind headline

const GIRL = `${import.meta.env.BASE_URL}images/hero-girl.png`;

/* ---------- decorative primitives ---------- */

function Blob({
  d,
  fill,
  style,
}: {
  d: string;
  fill: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={style}
      aria-hidden="true"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

/* anchored to left + bottom edges, organic bulge to the top-right */
const BLOB_D_SAND =
  'M0,200 L0,58 Q8,26 44,20 Q96,12 132,40 Q172,66 180,110 Q188,156 162,200 Z';
/* smaller crescent, anchored to bottom */
const BLOB_D_GOLD =
  'M0,200 L0,118 Q28,82 74,86 Q130,92 154,128 Q170,154 162,200 Z';
/* rounded blob cut off at the bottom */
const BLOB_D_ELBOW =
  'M22,200 Q2,148 18,104 Q36,56 88,48 Q142,42 170,88 Q196,132 178,168 Q164,194 148,200 Z';
/* anchored to the right edge */
const BLOB_D_RIGHT =
  'M200,8 Q138,2 94,40 Q50,78 56,124 Q62,170 108,190 Q152,208 200,192 Z';
/* free-floating organic blob */
const BLOB_D_MID =
  'M100,6 Q148,2 172,38 Q196,72 186,116 Q176,160 134,180 Q92,200 54,176 Q18,152 12,108 Q6,64 38,32 Q66,8 100,6 Z';

function DottedCircle({
  size,
  dotGap,
  dotR,
  style,
}: {
  size: number;
  dotGap: number;
  dotR: number;
  style?: CSSProperties;
}) {
  const clipId = useId();
  const dots = [];
  for (let y = dotGap / 2; y < size; y += dotGap) {
    for (let x = dotGap / 2; x < size; x += dotGap) {
      dots.push(
        <circle key={`${x}-${y}`} cx={x} cy={y} r={dotR} fill="#FFFFFF" opacity={0.85} />,
      );
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={size / 2} cy={size / 2} r={size / 2} />
        </clipPath>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={CIRCLE_TEAL} />
      <g clipPath={`url(#${clipId})`}>{dots}</g>
    </svg>
  );
}

function DotGrid({
  rows,
  cols,
  gap,
  r,
  style,
}: {
  rows: number;
  cols: number;
  gap: number;
  r: number;
  style?: CSSProperties;
}) {
  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * gap + r}
          cy={row * gap + r}
          r={r}
          fill="#FFFFFF"
          opacity={0.9}
        />,
      );
    }
  }
  const w = (cols - 1) * gap + r * 2;
  const h = (rows - 1) * gap + r * 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      {dots}
    </svg>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  return (
    <section style={{ backgroundColor: BG }}>
      {/* ═════════════ DESKTOP (md and up) — fixed nav is 72px ═════════════ */}
      <div
        className="hidden md:block relative"
        style={{ minHeight: 'clamp(560px, 47vw, 690px)', overflow: 'hidden' }}
      >
        {/* soft lighter circle behind the headline */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '36%',
            top: 30,
            width: 315,
            height: 315,
            borderRadius: '50%',
            backgroundColor: CIRCLE_LIGHT,
            zIndex: 1,
          }}
        />
        {/* dark teal dotted circle, top-right */}
        <DottedCircle
          size={300}
          dotGap={30}
          dotR={5}
          style={{ position: 'absolute', top: 46, right: -92, zIndex: 1 }}
        />
        {/* teal blob on the right edge */}
        <Blob
          d={BLOB_D_RIGHT}
          fill={BLOB_RIGHT}
          style={{
            position: 'absolute',
            right: 0,
            top: '44%',
            width: 130,
            height: 178,
            zIndex: 1,
          }}
        />
        {/* sand + gold blobs, bottom-left */}
        <Blob
          d={BLOB_D_SAND}
          fill={SAND}
          style={{
            position: 'absolute',
            left: -60,
            bottom: -50,
            width: 318,
            height: 262,
            zIndex: 1,
          }}
        />
        <Blob
          d={BLOB_D_GOLD}
          fill={GOLD}
          style={{
            position: 'absolute',
            left: 62,
            bottom: -40,
            width: 190,
            height: 122,
            zIndex: 1,
          }}
        />
        {/* small teal blob peeking out near the girl's sleeve */}
        <Blob
          d={BLOB_D_ELBOW}
          fill={BLOB_ELBOW}
          style={{
            position: 'absolute',
            left: '50.5%',
            bottom: -34,
            width: 160,
            height: 152,
            zIndex: 1,
          }}
        />
        {/* white dot grid, mid-left */}
        <DotGrid
          rows={5}
          cols={3}
          gap={23}
          r={4}
          style={{ position: 'absolute', left: '2.4%', top: '64%', zIndex: 1 }}
        />

        {/* girl with Brock string — real transparency, never cropped */}
        <img
          src={GIRL}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: '2%',
            height: '90%',
            maxWidth: '58%',
            objectFit: 'contain',
            objectPosition: 'right bottom',
            zIndex: 2,
          }}
        />

        {/* seam dissolve — melts the clipped blobs & girl into the flat
            background before the section edge, so no hard cut line exists */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 96,
            background: `linear-gradient(to bottom, rgba(216,228,226,0) 0%, ${BG} 88%)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* copy — pb keeps buttons clear of the bottom edge at tablet widths,
            where the copy stack is taller than the clamped section height */}
        <div
          className="relative pb-20 lg:pb-0"
          style={{
            zIndex: 3,
            paddingLeft: '15.9%',
            paddingTop: 'clamp(84px, 6.7vw, 97px)',
            maxWidth: '62%',
          }}
        >
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: 11.5,
              letterSpacing: '0.22em',
              color: EYEBROW_TEAL,
              marginBottom: 14,
            }}
          >
            Advanced Vision Associates · Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold"
            style={{
              fontSize: 'clamp(2.55rem, 4.35vw, 3.95rem)',
              lineHeight: 1.1,
              color: NAVY,
              maxWidth: 660,
              marginBottom: 18,
            }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: CORAL }}>
              20/20 vision
            </em>{' '}
            and still have a vision problem?
          </h1>

          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.6,
              color: NAVY,
              opacity: 0.72,
              maxWidth: 470,
              marginBottom: 26,
            }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-wrap" style={{ gap: 12 }}>
            <a
              href="#contact"
              className="inline-flex items-center text-white font-semibold hover:opacity-90 transition-all"
              style={{
                backgroundColor: CORAL,
                height: 52,
                paddingLeft: 30,
                paddingRight: 30,
                borderRadius: 30,
                fontSize: 15.5,
              }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{
                height: 52,
                paddingLeft: 30,
                paddingRight: 30,
                borderRadius: 30,
                border: '1.5px solid #3AA3AB',
                color: EYEBROW_TEAL,
                fontSize: 15.5,
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* ═════════════ MOBILE (below md) — fixed nav is 64px ═════════════ */}
      <div
        className="md:hidden relative"
        style={{ minHeight: 545, overflow: 'hidden' }}
      >
        {/* soft lighter circle behind the headline */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '27%',
            top: 42,
            width: 158,
            height: 158,
            borderRadius: '50%',
            backgroundColor: CIRCLE_LIGHT,
            zIndex: 1,
          }}
        />
        {/* dark teal dotted circle, top-right */}
        <DottedCircle
          size={140}
          dotGap={20}
          dotR={3.4}
          style={{ position: 'absolute', top: 48, right: -46, zIndex: 1 }}
        />
        {/* teal blob, mid-left */}
        <Blob
          d={BLOB_D_MID}
          fill={BLOB_MID}
          style={{
            position: 'absolute',
            left: '31%',
            top: '52%',
            width: 86,
            height: 86,
            zIndex: 1,
          }}
        />
        {/* sand blob, bottom-left */}
        <Blob
          d={BLOB_D_SAND}
          fill={SAND}
          style={{
            position: 'absolute',
            left: -34,
            bottom: -26,
            width: 132,
            height: 120,
            zIndex: 1,
          }}
        />

        {/* girl — bottom-anchored, full image visible */}
        <img
          src={GIRL}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: '-6%',
            width: '96%',
            zIndex: 2,
          }}
        />

        {/* seam dissolve — same treatment as desktop, scaled down */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 64,
            background: `linear-gradient(to bottom, rgba(216,228,226,0) 0%, ${BG} 88%)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* copy — occupies left ~58% so buttons don't run under the girl */}
        <div
          className="relative"
          style={{
            zIndex: 3,
            paddingLeft: 22,
            paddingRight: 16,
            paddingTop: 80,
            paddingBottom: 28,
            width: '62%',
            minWidth: 210,
          }}
        >
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: 9.5,
              letterSpacing: '0.18em',
              color: EYEBROW_TEAL,
              lineHeight: 1.5,
              marginBottom: 8,
            }}
          >
            Advanced Vision Associates
            <br />· Inwood, NY
          </p>

          <h1
            className="font-serif font-semibold"
            style={{
              fontSize: 24,
              lineHeight: 1.19,
              color: NAVY,
              marginBottom: 12,
            }}
          >
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: CORAL }}>
              20/20 vision
            </em>{' '}
            and still have a vision problem?
          </h1>

          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.55,
              color: NAVY,
              opacity: 0.72,
              marginBottom: 18,
            }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-col" style={{ gap: 10 }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-white font-semibold hover:opacity-90 transition-all"
              style={{
                backgroundColor: CORAL,
                height: 46,
                borderRadius: 30,
                fontSize: 13.5,
                whiteSpace: 'nowrap',
              }}
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center font-medium bg-white hover:bg-white/90 transition-all"
              style={{
                height: 46,
                borderRadius: 30,
                border: '1.5px solid #3AA3AB',
                color: EYEBROW_TEAL,
                fontSize: 13.5,
                whiteSpace: 'nowrap',
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
