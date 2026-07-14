import { BlobTeal, BlobSand, BlobTealSmall } from './Blobs';

// Placeholder shown until the owner drops the real hero photo into public/images/hero-brock-string.jpg
function HeroPhotoSlot({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ background: 'hsl(185 30% 68% / 0.35)' }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="30" height="24" rx="3" stroke="hsl(185 42% 30%)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <circle cx="12" cy="14" r="3" stroke="hsl(185 42% 30%)" strokeWidth="1.5" fill="none" />
        <path d="M3 26l8-7 6 5 5-4 9 8" stroke="hsl(185 42% 30%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-medium text-center px-2" style={{ color: 'hsl(185 42% 25%)' }}>
        Photo coming soon
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '76vh',
        backgroundColor: 'hsl(185 45% 76%)',
      }}
    >
      {/* Blob decorations — layered on teal bg */}
      <BlobTeal className="absolute -top-24 right-[30%] w-[380px] h-[380px] pointer-events-none select-none opacity-50" />
      <BlobSand className="absolute top-8 -right-12 w-[280px] h-[280px] pointer-events-none select-none opacity-70" />
      <BlobTealSmall className="absolute -bottom-16 left-[8%] w-[200px] h-[200px] pointer-events-none select-none opacity-60" />
      <BlobSand className="absolute bottom-8 left-[22%] w-[180px] h-[180px] pointer-events-none select-none opacity-50" />

      {/* Hero photo — right half, NO gradient/overlay, both mobile and desktop */}
      <div
        className="absolute top-0 right-0 bottom-0 pointer-events-none select-none"
        style={{ width: '52%' }}
      >
        {/* Real photo — drop hero-brock-string.jpg into public/images/ to activate */}
        <HeroPhotoSlot className="w-full h-full" />
      </div>

      {/* Main content — left side on all breakpoints */}
      <div
        className="relative z-10 container mx-auto px-6 md:px-10 flex items-center"
        style={{ minHeight: '76vh' }}
      >
        <div className="max-w-[48%] min-w-[280px] pt-20 pb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: 'hsl(185 42% 22% / 0.65)' }}
          >
            Advanced Vision Associates · Inwood, NY
          </p>

          <h1
            className="font-serif font-medium leading-[1.1] mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
              color: 'hsl(185 42% 14%)',
            }}
          >
            Did you know that a person can have{' '}
            <em
              className="not-italic"
              style={{ color: 'hsl(var(--accent))' }}
            >
              20/20 vision
            </em>{' '}
            and still have a vision problem?
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: 'hsl(185 42% 18% / 0.75)' }}
          >
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {/* Coral filled CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md text-sm md:text-base"
              style={{ backgroundColor: 'hsl(var(--accent))' }}
            >
              Schedule a Consultation
            </a>
            {/* Outlined ghost — white border on teal bg */}
            <a
              href="#vision-therapy"
              className="inline-flex items-center justify-center border-2 font-medium px-7 py-3.5 rounded-full transition-all text-sm md:text-base"
              style={{
                borderColor: 'hsl(185 42% 22% / 0.35)',
                color: 'hsl(185 42% 14%)',
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
