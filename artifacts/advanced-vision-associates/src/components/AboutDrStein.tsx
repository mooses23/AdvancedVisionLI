import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CheckCircle2 } from 'lucide-react';
import drSteinImageSrc from '@assets/generated_images/dr-stein.jpg';

export default function AboutDrStein() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-white">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              {/* SWAP: replace drSteinImageSrc with real Dr. Stein headshot */}
              <img 
                src={drSteinImageSrc} 
                alt="Dr. Marcie Stein, OD" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full rounded-2xl bg-muted"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-6">
              Meet Dr. Marcie Stein, OD
            </h2>
            
            <div className="prose prose-lg prose-blue text-muted-foreground mb-8 max-w-none">
              <p>
                <strong>Dr. Marcie Stein, OD</strong> has been practicing optometry in the Inwood and Far Rockaway area for over 40 years. She is a recognized provider through OVDRA — the Optometric Vision Development & Rehabilitation Association — the leading professional organization for developmental optometrists who specialize in vision therapy.
              </p>
              <p>
                Dr. Stein is known for her patient, thorough approach — especially with children, for whom vision therapy can be life-changing. She works with patients of all ages, from young children struggling in school to adults recovering from concussion or seeking sports vision improvement.
              </p>
              <p>
                At Advanced Vision Associates, every patient receives individualized attention and a customized therapy program designed around their specific visual needs and goals.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-accent/40 border border-accent text-accent-foreground px-5 py-3 rounded-full w-fit font-medium">
              <div className="bg-secondary/20 p-1 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              OVDRA Recognized Provider
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
