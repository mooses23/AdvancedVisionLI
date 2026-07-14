import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
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
      message: "I'm interested in learning more about vision therapy. Please contact me to schedule a consultation.",
    },
  });

  const onSubmit = (data: FormValues) => {
    // TODO: connect to Formspree or email backend once domain email is confirmed
    // fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(data) })
    console.log('Form submitted:', data);
    alert("Thank you! We'll be in touch soon.");
    form.reset();
  };

  return (
    <section id="contact" className="bg-primary py-14 md:py-20">
      <div
        ref={ref as any}
        className="container mx-auto px-6 md:px-10 scroll-section"
      >
        {/* Insurance callout — compact banner */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/15 border border-white/25 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3 text-white">
              <ShieldCheck className="h-5 w-5 shrink-0 opacity-80" />
              <span className="text-sm font-medium">
                Vision therapy may be covered by medical insurance.
                We'll help you navigate your benefits.
              </span>
            </div>
            <a
              href="tel:718-268-3937"
              className="shrink-0 bg-white text-primary font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Call to Verify Coverage
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium mb-3">
              Get in Touch
            </h2>
            <p className="text-white/70 text-lg">
              Ready to schedule an evaluation? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">

            {/* Contact info — left column (narrower) */}
            <div className="md:col-span-2 flex flex-col gap-7 pt-2">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Location</p>
                  <a
                    href="https://maps.google.com/?q=148C+Doughty+Blvd,+Inwood,+NY+11096"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-white/80 transition-colors leading-relaxed"
                  >
                    148c Doughty Blvd<br />
                    Inwood, NY 11096
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Phone</p>
                  <a
                    href="tel:718-268-3937"
                    className="text-white font-medium text-xl hover:text-white/80 transition-colors"
                  >
                    (718) 268-3937
                  </a>
                </div>
              </div>
            </div>

            {/* Form — right column (wider) */}
            <div className="md:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-semibold text-foreground mb-5">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                  <div className="grid sm:grid-cols-2 gap-4">
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
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

          </div>
        </div>
      </div>
    </section>
  );
}
