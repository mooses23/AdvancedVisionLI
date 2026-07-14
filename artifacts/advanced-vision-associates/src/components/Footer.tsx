export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70 py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-base mb-1">Advanced Vision Associates</p>
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
            <p>© {new Date().getFullYear()} Advanced Vision Associates. All rights reserved.</p>
            <p className="max-w-xs text-white/40 leading-relaxed">
              This website is for informational purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
