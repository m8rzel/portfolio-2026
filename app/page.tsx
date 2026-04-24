import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { GridBackdrop, NoiseOverlay } from "@/components/layout/GridBackdrop";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <GridBackdrop />
      <CursorSpotlight />
      <NoiseOverlay />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Products />
        <SelectedWork />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
