import cutoutSrc from '@assets/generated_images/cutout-convergence.png';

export default function Hero() {
  return (
    <section className="relative bg-primary overflow-hidden" style={{ minHeight: '76vh' }}>
      {/* Subtle decorative circles */}
      <div className="absolute top-16 right-[38%] w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 flex items-center" style={{ minHeight: '76vh' }}>
        <div className="max-w-2xl pt-20 pb-14">
          <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Advanced Vision Associates · Inwood, NY
          </p>

          <h1 className="font-serif font-medium text-white leading-[1.08] mb-8"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Did you know that a person can have{' '}
            <em className="not-italic" style={{ color: 'hsl(var(--accent))' }}>20/20 vision</em>{' '}
            and still have a vision problem?
          </h1>

          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Vision therapy treats the functional issues that glasses alone can't fix —
            for children and adults of all ages.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-white/92 active:scale-95 transition-all shadow-lg text-base"
            >
              Schedule a Consultation
            </a>
            <a
              href="#vision-therapy"
              className="inline-flex items-center border-2 border-white/40 text-white font-medium px-8 py-4 rounded-full hover:border-white/80 hover:bg-white/10 transition-all text-base"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Cutout figure — floats bottom-right, bleeds off the edge */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none hidden md:block"
        style={{ height: '92%', maxHeight: '700px' }}
      >
        <img
          src={cutoutSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
