import { BlobTeal, BlobSand, BlobTealSmall } from './Blobs';

export default function Hero() {
  return (
    <section
      className="relative bg-background overflow-hidden"
      style={{ minHeight: '76vh' }}
    >
      {/* Blob decorations */}
      {/* Large teal blob — top right */}
      <BlobTeal className="absolute -top-24 right-[30%] w-[380px] h-[380px] pointer-events-none select-none" />
      {/* Sandy blob — top far right */}
      <BlobSand className="absolute top-8 -right-12 w-[280px] h-[280px] pointer-events-none select-none opacity-80" />
      {/* Small teal blob — bottom left */}
      <BlobTealSmall className="absolute -bottom-16 left-[8%] w-[200px] h-[200px] pointer-events-none select-none" />
      {/* Sandy blob — mid left */}
      <BlobSand className="absolute bottom-8 left-[22%] w-[180px] h-[180px] pointer-events-none select-none opacity-60" />

      {/* Hero photo — right side on desktop, stacked below text on mobile */}
      <div
        className="absolute top-0 right-0 bottom-0 pointer-events-none select-none hidden md:block"
        style={{ width: '48%' }}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to right, hsl(38 38% 96%) 0%, hsl(38 38% 96% / 0.6) 25%, transparent 55%)',
            }}
          />
          <img
            src="/images/hero-brock-string.jpg"
            alt="Child doing Brock string vision therapy exercise"
            className="w-full h-full object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 container mx-auto px-6 md:px-10 flex items-center"
        style={{ minHeight: '76vh' }}
      >
        <div className="w-full md:max-w-xl pt-20 pb-8 md:pb-14">
          <p className="text-primary/60 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Advanced Vision Associates · Inwood, NY
          </p>

          <h1
            className="font-serif font-medium text-primary leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
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

          {/* Mobile-only photo — between heading and subtext */}
          <div className="block md:hidden -mx-6 mb-6 overflow-hidden rounded-none" style={{ height: '260px' }}>
            <img
              src="/images/hero-brock-string.jpg"
              alt="Child doing Brock string vision therapy exercise"
              className="w-full h-full object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <p className="text-foreground/65 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
            Vision therapy treats the functional issues that glasses alone
            can't fix — for children and adults of all ages.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Coral filled CTA */}
            <a
              href="#contact"
              className="inline-flex items-center text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md text-base"
              style={{ backgroundColor: 'hsl(var(--accent))' }}
            >
              Schedule a Consultation
            </a>
            {/* Outlined ghost */}
            <a
              href="#vision-therapy"
              className="inline-flex items-center border-2 border-primary/30 text-primary font-medium px-8 py-4 rounded-full hover:border-primary/60 hover:bg-primary/5 transition-all text-base"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
