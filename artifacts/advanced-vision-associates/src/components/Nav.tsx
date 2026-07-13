import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Vision Therapy', href: '#vision-therapy' },
    { name: 'Conditions', href: '#conditions' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      data-testid="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border py-3' 
          : 'bg-white border-b border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="font-serif font-medium text-xl md:text-2xl text-foreground">
            Advanced Vision Associates
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button asChild className="rounded-full shadow-sm">
            <a href="#contact">Schedule Consultation</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 bg-white z-40 flex flex-col pt-24 px-6 gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            {links.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground border-b border-border pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button asChild size="lg" className="w-full mt-4 rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
              <a href="#contact">Schedule Consultation</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
