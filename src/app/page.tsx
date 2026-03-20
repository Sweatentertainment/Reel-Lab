import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import WhatIs from "@/components/sections/what-is";
import ProductDemo from "@/components/sections/product-demo";
import CharacterGallery from "@/components/sections/character-gallery";
import UnderTheHood from "@/components/sections/under-the-hood";
import BookCallSection from "@/components/sections/book-call-section";
import MoodNetwork from "@/components/sections/mood-network";
import FAQ from "@/components/sections/faq";
import FooterCTA from "@/components/sections/footer-cta";

export default function Home() {
  return (
    <main className="min-h-full flex-1">
      <Navbar />
      <Hero />
      <WhatIs />
      <ProductDemo />
      <CharacterGallery />
      <UnderTheHood />
      <BookCallSection />
      <MoodNetwork />
      <FAQ />
      <FooterCTA />
    </main>
  );
}
