import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { ColorSection } from "@/components/ColorSection";
import { FrameSection } from "@/components/FrameSection";
import { GallerySection } from "@/components/GallerySection";
import { AudienceSection } from "@/components/AudienceSection";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StorySection />
        <ColorSection />
        <FrameSection />
        <GallerySection />
        <AudienceSection />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
