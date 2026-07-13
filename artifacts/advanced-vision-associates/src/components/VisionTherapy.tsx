import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Activity, Glasses, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VisionTherapy() {
  const ref = useScrollAnimation();

  return (
    <section id="vision-therapy" className="py-24 bg-white relative">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
            What Is Vision Therapy?
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          <div className="prose prose-lg prose-blue max-w-none text-muted-foreground">
            <p className="lead text-xl text-foreground font-medium mb-6">
              Vision therapy is safe, drug-free, and effective for both children and adults. 
            </p>
            <p>
              While visual acuity (the "20/20" part of vision) requires glasses to improve, visual skills such as tracking together along a line of text must be learned during development — and these skills can also be improved later in life at any age.
            </p>
            <p>
              It is estimated that 1 in 10 children have a vision problem severe enough to affect their learning in school, but school vision screenings can miss up to half of these problems. A comprehensive vision exam with a developmental optometrist checks all aspects of eye health, vision, and visual skills, ensuring you or your child is not struggling unnecessarily with an undiagnosed vision problem.
            </p>
            
            <p className="text-sm mt-8 text-muted-foreground/70 italic">
              Source: OVDRA (Optometric Vision Development & Rehabilitation Association) — covd.org
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                  <Activity className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">What is Vision Therapy?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> A progressive program of vision procedures</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Performed under doctor supervision</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Individualized to fit the visual needs of each patient</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Conducted in-office, once or twice weekly (30–60 minutes), with optional home activities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                  <Glasses className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Tools Used</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Therapeutic lenses and prisms</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Filters and occluders/patches</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Electronic targets with timing mechanisms</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Balance boards and specialized equipment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Goals of Therapy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Develop or improve fundamental visual skills and abilities</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Improve visual comfort, ease, and efficiency</li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Change how a patient processes or interprets visual information</li>
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
