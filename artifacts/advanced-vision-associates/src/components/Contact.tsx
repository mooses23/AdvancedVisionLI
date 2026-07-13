import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  childAge: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const ref = useScrollAnimation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      childAge: '',
      message: "I'm interested in learning more about vision therapy services. Please contact me to schedule a consultation.",
    },
  });

  const onSubmit = (data: FormValues) => {
    // TODO: connect to Formspree or email backend once domain email is confirmed
    // Example: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(data) })
    console.log("Form Submitted:", data);
    alert("Thank you! We'll be in touch soon.");
    form.reset();
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div 
        ref={ref as any}
        className="container mx-auto px-4 md:px-6 scroll-section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to schedule a consultation? We're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Form Column */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50">
              <h3 className="text-2xl font-medium mb-6">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="childAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child's Age (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 8" {...field} data-testid="input-child-age" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            {...field} 
                            data-testid="input-message"
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full rounded-full" data-testid="button-submit">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info Column */}
            <div className="flex flex-col gap-10">
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Location</h4>
                  <a 
                    href="https://maps.google.com/?q=148C+Doughty+Blvd,+Inwood,+NY+11096" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                  >
                    148C Doughty Blvd<br />
                    Inwood, NY 11096
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Phone</h4>
                  <a 
                    href="tel:718-268-3937" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (718) 268-3937
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Office Hours</h4>
                  <ul className="text-muted-foreground space-y-2">
                    {/* SWAP: add real office hours */}
                    <li className="flex justify-between w-48"><span>Monday–Friday:</span> <span>Call for hours</span></li>
                    <li className="flex justify-between w-48"><span>Saturday:</span> <span>By Appointment</span></li>
                    <li className="flex justify-between w-48"><span>Sunday:</span> <span>Closed</span></li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
