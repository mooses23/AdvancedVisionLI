import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Vision Therapy', href: '#vision-therapy' },
  { label: 'Signs', href: '#signs' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
      }`}
    >
      <div className="container mx-auto px-4 md:px-10 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-tight shrink-0">
          <span className="text-primary font-bold text-sm md:text-base tracking-tight">
            Advanced Vision Associates
          </span>
          <span className="text-muted-foreground text-xs font-medium">
            Inwood, NY
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

        {/* Mobile right side: coral phone button + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:718-268-3937"
            className="text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
          >
            (718) 268-3937
          </a>
          <button
            className="flex flex-col gap-1.5 p-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
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
        </div>
      )}
    </header>
  );
}
