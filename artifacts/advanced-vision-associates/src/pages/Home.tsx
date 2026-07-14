import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import VisionTherapy from '@/components/VisionTherapy';
import Checklist from '@/components/Checklist';
import TestimonialsStrip from '@/components/TestimonialsStrip';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <VisionTherapy />
        <Checklist />
        <TestimonialsStrip />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
