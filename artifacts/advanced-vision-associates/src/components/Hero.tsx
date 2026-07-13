import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImageSrc from '@assets/generated_images/hero-vision-therapy.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-24 lg:pt-0 flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full pb-20 lg:pb-0">
        
        {/* Mobile Image (Shows above text on mobile) */}
        <div className="lg:hidden relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
          {/* SWAP: replace heroImageSrc with real Dr. Stein photo when available */}
          <img 
            src={heroImageSrc} 
            alt="Dr. Stein performing a vision exam with a young patient" 
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-6 lg:max-w-xl">
          <div className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-muted-foreground w-fit mb-2">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
            Optometry & Vision Therapy in Inwood, NY
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            Helping Eyes Work Better, <span className="text-primary italic">Helping Lives Improve</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Evidence-based vision therapy for children and adults. We treat the functional vision challenges that glasses alone can't fix.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="rounded-full text-base h-12 px-8 shadow-md">
              <a href="#contact">Schedule a Consultation</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 px-8 group bg-white hover:bg-muted/50">
              <a href="#vision-therapy">
                Learn about vision therapy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:block relative h-[80%] max-h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl">
          {/* SWAP: replace heroImageSrc with real Dr. Stein photo when available */}
          <img 
            src={heroImageSrc} 
            alt="Dr. Stein performing a vision exam with a young patient" 
            className="object-cover w-full h-full"
          />
          {/* Soft decorative elements */}
          <div className="absolute inset-0 border border-white/20 rounded-2xl z-10 pointer-events-none"></div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-70 z-0"></div>
          <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-0"></div>
        </div>
      </div>

      {/* Decorative wave/separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white z-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
    </section>
  );
}
