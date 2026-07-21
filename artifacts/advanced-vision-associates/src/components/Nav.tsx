import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Vision Therapy', href: '#vision-therapy' },
  { label: 'Signs', href: '#signs' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

// The logo PNG has a white background. mix-blend-mode: multiply makes white
// transparent so it sits cleanly on the white / near-white nav.
const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;

      setScrolled(y > 30);

      if (y < 30) {
        // Always show at the very top
        setVisible(true);
      } else if (y > prev && y > 60) {
        // Scrolling down past threshold — hide
        setVisible(false);
      } else if (y < prev) {
        // Scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-sm'
          : 'bg-white/90 backdrop-blur-sm'
      } ${!visible && !open ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">

        {/* Logo lockup — exact PNG + stacked wordmark */}
        <a href="#" className="flex items-center gap-3 leading-none">
          <img
            src={LOGO_SRC}
            alt="Advanced Vision Long Island logo"
            style={{
              height: 36,
              width: 'auto',
              display: 'block',
              flexShrink: 0,
              mixBlendMode: 'multiply',   // white bg disappears on light nav
            }}
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-primary text-[19px] tracking-tight">
              Advanced Vision
            </span>
            <span className="font-sans font-normal text-primary/70 text-[11px] tracking-wide uppercase">
              Long Island
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:718-268-3937"
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(12 62% 52%)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'hsl(var(--accent))')}
          >
            (718) 268-3937
          </a>
        </nav>

        {/* Mobile: coral phone pill + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="tel:718-268-3937"
            className="text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
          >
            (718) 268-3937
          </a>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:718-268-3937"
            className="text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2 transition-colors"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
          >
            Call (718) 268-3937
          </a>
        </div>
      )}
    </header>
  );
}
