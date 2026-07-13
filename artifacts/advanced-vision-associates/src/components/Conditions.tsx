import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CheckCircle2, Eye, BookOpen, UserCircle, Target, Brain, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Conditions() {
  const ref = useScrollAnimation();

  const conditions = [
    {
      title: "Learning-Related Vision Problems",
      desc: "Difficulty reading, tracking words, or maintaining focus that affects academic performance",
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: "Convergence Insufficiency",
      desc: "Eyes struggle to work together for near tasks, causing double vision, eye strain, and headaches",
      icon: <Eye className="h-6 w-6 text-primary" />
    },
    {
      title: "Strabismus (Crossed Eyes)",
      desc: "Misalignment of the eyes; vision therapy can improve alignment and binocular function",
      icon: <Target className="h-6 w-6 text-primary" />
    },
    {
      title: "Amblyopia (Lazy Eye)",
      desc: "Reduced vision in one eye; therapy trains both eyes to work together more effectively",
      icon: <UserCircle className="h-6 w-6 text-primary" />
    },
    {
      title: "Sports Vision Enhancement",
      desc: "Improve eye-hand coordination, reaction time, tracking, and visual processing for athletes",
      icon: <Activity className="h-6 w-6 text-primary" />
    },
    {
      title: "Post-Concussion Vision Rehab",
      desc: "Addresses visual symptoms following TBI including double vision, light sensitivity, and reading difficulty",
      icon: <Brain className="h-6 w-6 text-primary" />
    },
    {
      title: "Autism & Visual Processing",
      desc: "Supporting visual attention, eye contact, and sensory integration",
      icon: <Eye className="h-6 w-6 text-primary" />
    }
  ];

  const symptoms = [
    "Skipping or re-reading lines when reading",
    "Losing place while reading or needing a finger to track",
    "Words or letters moving or blurring on the page",
    "Headaches or eye strain after reading or near work",
    "Covering or closing one eye to see better",
    "Difficulty with reading comprehension despite adequate decoding",
    "Poor hand-eye coordination or clumsiness",
    "Avoiding reading or close work",
    "Double vision (intermittent or constant)",
    "Short attention span for visual tasks"
  ];

  return (
    <section id="conditions" className="py-24 bg-background border-t border-border/50">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
            Conditions We Treat
          </h2>
          <p className="text-lg text-muted-foreground">
            Vision therapy addresses a wide range of functional vision challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {conditions.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-border/60 hover:shadow-md transition-shadow">
                <div className="mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-medium text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-accent/30 rounded-2xl p-8 border border-accent">
            <h3 className="font-serif text-2xl text-foreground font-medium mb-6">
              Signs & Symptoms to Watch For
            </h3>
            
            <ul className="space-y-4 mb-8">
              {symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 text-center">
              <p className="text-sm font-medium text-foreground mb-4">
                If you recognize these signs, contact us for an evaluation.
              </p>
              <Button asChild className="w-full rounded-full shadow-sm">
                <a href="#contact">Schedule an Evaluation</a>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6 text-center italic">
              Source: OVDRA — covd.org
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
