import React from "react";
import { Brain, Zap, ShieldCheck, LineChart } from "lucide-react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import HowItWorks from "../components/HowItWorks";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import ContactSection from "../components/ContactSection";
import useReveal from "../hooks/useReveal";

const pillars = [
  { Icon: Brain, t: "Trained on your business", d: "Every agent ingests your offers, FAQs and tone — not a generic LLM response." },
  { Icon: Zap, t: "Live in 7 days", d: "Most clients are deployed and answering customers in under a week." },
  { Icon: ShieldCheck, t: "Enterprise-grade trust", d: "Encrypted, compliant, and aligned with your brand — no rogue replies." },
  { Icon: LineChart, t: "Measurable ROI", d: "Monthly performance reports tie every dollar to bookings and revenue." },
];

export default function Landing() {
  useReveal();
  return (
    <div data-testid="landing-page">
      <Hero />

      <section data-testid="pillars-section" className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {pillars.map(({ Icon, t, d }) => (
              <div key={t} className="bg-[#0A0B0E] p-7 reveal">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#00E27A] mb-5">
                  <Icon size={17}/>
                </div>
                <h3 className="font-display text-lg text-white tracking-tight">{t}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid />
      <HowItWorks />
      <CaseStudies />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <ContactSection />
    </div>
  );
}
