import React from "react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import Testimonials from "../components/Testimonials";
import FOMOBanner from "../components/FOMOBanner";
import ContactSection from "../components/ContactSection";
import { Shield, Zap, Brain, TrendingUp } from "lucide-react";

const whyUs = [
  { icon: Brain, t: "Tailored AI Brains", d: "Every agent is trained on your business, your tone, your offers." },
  { icon: Zap, t: "Live in 7 Days", d: "We deploy your AI stack faster than your competitors finish their meeting." },
  { icon: Shield, t: "Built for Trust", d: "Compliant, secure, and aligned with your brand - no rogue replies." },
  { icon: TrendingUp, t: "Measurable ROI", d: "You get a monthly performance report. Numbers. Not promises." },
];

export default function Landing() {
  return (
    <div data-testid="landing-page">
      <Hero />

      <section data-testid="why-us-section" className="py-20 md:py-24 border-y border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {whyUs.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.t} className="p-6 border border-white/5 rounded-2xl hover:border-[#00FF66]/30 transition bg-[#0A0A0A]">
                  <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] mb-4">
                    <Icon size={20}/>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-1.5">{w.t}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{w.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServicesGrid />
      <Testimonials />
      <FOMOBanner />
      <ContactSection />
    </div>
  );
}
