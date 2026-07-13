import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import VisionTherapy from '@/components/VisionTherapy';
import Conditions from '@/components/Conditions';
import AboutDrStein from '@/components/AboutDrStein';
import Staff from '@/components/Staff';
import Testimonials from '@/components/Testimonials';
import Insurance from '@/components/Insurance';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <VisionTherapy />
        <Conditions />
        <AboutDrStein />
        <Staff />
        <Testimonials />
        <Insurance />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
