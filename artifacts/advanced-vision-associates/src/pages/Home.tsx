import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import VisionTherapy from '@/components/VisionTherapy';
import Checklist from '@/components/Checklist';
import TestimonialsStrip from '@/components/TestimonialsStrip';
import Services from '@/components/Services';
import LowVisionCare from '@/components/LowVisionCare';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Checklist />
        <VisionTherapy />
        <LowVisionCare />
        <Services />
        <Team />
        <Contact />
        <TestimonialsStrip />
      </main>
      <Footer />
    </div>
  );
}
