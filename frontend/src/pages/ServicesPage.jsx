import React from "react";
import ServicesGrid from "../components/ServicesGrid";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import ContactSection from "../components/ContactSection";
import useReveal from "../hooks/useReveal";

export default function ServicesPage() {
  useReveal();
  return (
    <div data-testid="services-page" className="pt-28">
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 reveal">
          <span className="eyebrow">Platform</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[1.02] text-white max-w-4xl text-balance">
            Everything you need to grow without growing headcount.
          </h1>
          <p className="mt-6 text-white/65 text-lg md:text-xl max-w-2xl">
            Pick a single module or deploy the full stack. Every service is built to plug into the next.
          </p>
        </div>
      </section>
      <ServicesGrid />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <ContactSection />
    </div>
  );
}
