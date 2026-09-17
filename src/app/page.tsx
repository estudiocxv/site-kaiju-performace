import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { StagesExplained } from '@/components/sections/StagesExplained';
import { RemapSection } from '@/components/sections/RemapSection';
import { Projects } from '@/components/sections/Projects';
import { Events } from '@/components/sections/Events';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <StagesExplained />
      <RemapSection />
      <Projects />
      <Events />
      <Contact />
    </>
  );
}
