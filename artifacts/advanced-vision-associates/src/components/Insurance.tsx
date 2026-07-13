import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Insurance() {
  const ref = useScrollAnimation();

  return (
    <section id="insurance" className="py-24 bg-white border-y border-border/50">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary mb-6">
            <ShieldCheck className="h-8 w-8" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-8">
            Insurance & Coverage
          </h2>
          
          <div className="prose prose-lg prose-blue text-muted-foreground mx-auto mb-10">
            <p>
              Vision therapy may be covered by medical insurance (not vision insurance). We work with a variety of plans and will help you understand your benefits.
            </p>
            <p>
              <strong>Please contact our office directly to confirm coverage for your specific insurance plan.</strong> Every plan is different, and our staff is happy to assist you navigate your benefits.
            </p>
          </div>

          <Button asChild size="lg" className="rounded-full">
            <a href="#contact">Contact Us About Insurance</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
