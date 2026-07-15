const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70 py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              {/* On the dark footer, invert + hue-rotate keeps the logo legible */}
              <img
                src={LOGO_SRC}
                alt=""
                aria-hidden="true"
                style={{
                  height: 28,
                  width: 'auto',
                  display: 'block',
                  flexShrink: 0,
                  filter: 'invert(1) hue-rotate(180deg) saturate(0.5) brightness(1.4)',
                  opacity: 0.85,
                }}
              />
              <span className="text-white font-bold text-base leading-tight">
                Advanced Vision Long Island
              </span>
            </div>
            <p className="text-sm">
              148c Doughty Blvd, Inwood, NY 11096 &nbsp;·&nbsp;{' '}
              <a href="tel:718-268-3937" className="hover:text-white transition-colors">
                (718) 268-3937
              </a>
            </p>
            <p className="text-sm mt-1">
              Dr. Marcie Evans Stein, OD FABM OVDRA &nbsp;·&nbsp; Dr. Esther Moller, OD FAAO
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 text-xs">
            <p>© {new Date().getFullYear()} Advanced Vision Long Island. All rights reserved.</p>
            <p>
              <a href="https://AdvancedVisionLI.com" className="hover:text-white transition-colors">
                AdvancedVisionLI.com
              </a>
            </p>
            <p className="max-w-xs text-white/40 leading-relaxed">
              This website is for informational purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
