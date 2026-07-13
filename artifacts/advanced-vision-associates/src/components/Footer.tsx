import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
          
          {/* Left Column */}
          <div>
            <span className="font-serif font-medium text-2xl block mb-4">
              Advanced Vision Associates
            </span>
            <address className="not-italic text-white/70 leading-relaxed space-y-1">
              <p>148C Doughty Blvd</p>
              <p>Inwood, NY 11096</p>
              <p className="pt-2">
                <a href="tel:718-268-3937" className="hover:text-white transition-colors">(718) 268-3937</a>
              </p>
            </address>
          </div>

          {/* Center Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#vision-therapy" className="text-white/70 hover:text-white transition-colors">Vision Therapy</a></li>
              <li><a href="#conditions" className="text-white/70 hover:text-white transition-colors">Conditions Treated</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About Dr. Stein</a></li>
              <li><a href="#team" className="text-white/70 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white/90">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {currentYear} Advanced Vision Associates. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right text-xs">
            This website is for educational purposes only and does not constitute medical advice. Vision therapy outcomes vary by individual.
          </p>
        </div>
      </div>
    </footer>
  );
}
