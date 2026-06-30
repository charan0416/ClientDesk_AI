import React from "react";
import { Target, Sparkles, Heart, Users } from "lucide-react";
import ContactSection from "../components/ContactSection";
import FinalCTA from "../components/FinalCTA";
import useReveal from "../hooks/useReveal";

export default function AboutPage() {
  useReveal();
  return (
    <div data-testid="about-page" className="pt-28">
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <div className="reveal">
            <span className="eyebrow">About</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[1.02] text-white text-balance">
              We build the AI your business should have hired yesterday.
            </h1>
            <p className="mt-6 text-white/65 text-lg max-w-xl">
              ClientDesk AI was founded to put enterprise-grade AI in the hands of every ambitious business —
              clinics, agencies, real estate, retail and services. We replace the busywork so founders can do the work that grows.
            </p>
          </div>
          <div className="relative reveal">
            <div className="mock-window overflow-hidden">
              <img src="https://images.pexels.com/photos/273682/pexels-photo-273682.jpeg" alt="ClientDesk AI" className="w-full h-[420px] object-cover"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {[
            { Icon: Target, t: "Mission", d: "Make AI growth tooling accessible to every business — not just enterprises." },
            { Icon: Sparkles, t: "Vision", d: "By 2030, every customer touchpoint begins with an AI agent." },
            { Icon: Heart, t: "Values", d: "Honest selling. Fast delivery. Outcomes over output." },
            { Icon: Users, t: "Team", d: "Operators, engineers and designers from Stripe, Razorpay, Freshworks and Zomato alumni." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="bg-[#0A0B0E] p-7 reveal">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#00E27A] mb-5"><Icon size={17}/></div>
              <h3 className="font-display text-lg text-white tracking-tight">{t}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <ContactSection />
    </div>
  );
}
