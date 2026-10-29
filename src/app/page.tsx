import Bataillons from '@/components/Bataillons';
import Contact from '@/components/Contact';
import Dock from '@/components/Dock';
import FireLayer from '@/components/FireLayer';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Story from '@/components/Story';

export default function Page() {
  return (
    <>
      <FireLayer />
      <Dock />
      <main id="top" className="relative z-10">
        <Hero />
        <Story />
        <Bataillons />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
