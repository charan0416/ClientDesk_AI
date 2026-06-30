import React from "react";
import ServicesGrid from "../components/ServicesGrid";
import FOMOBanner from "../components/FOMOBanner";
import ContactSection from "../components/ContactSection";

export default function ServicesPage() {
  return (
    <div data-testid="services-page" className="pt-24">
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">Everything we do</span>
          <h1 className="font-display font-semibold text-4xl md:text-6xl mt-4 tracking-tighter leading-tight max-w-4xl">
            One agency. <span className="text-[#00FF66]">An entire AI workforce.</span>
          </h1>
          <p className="mt-5 text-white/65 text-base md:text-lg max-w-2xl">
            Pick what you need today - scale into the full stack tomorrow. Every service plugs into the next.
          </p>
        </div>
      </section>
      <ServicesGrid />
      <FOMOBanner />
      <ContactSection />
    </div>
  );
}
