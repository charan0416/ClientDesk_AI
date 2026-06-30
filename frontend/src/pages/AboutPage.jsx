import React from "react";
import { Target, Sparkles, Heart } from "lucide-react";
import ContactSection from "../components/ContactSection";

export default function AboutPage() {
  return (
    <div data-testid="about-page" className="pt-28">
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">About ClientDesk AI</span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl mt-4 tracking-tighter leading-tight">
              We build the AI <span className="text-[#00FF66]">your business should have hired yesterday.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl">
              ClientDesk AI was founded to put enterprise-grade AI into the hands of every ambitious business -
              clinics, agencies, real estate, retail, services. We replace the busywork so founders can do the work that grows.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#00FF66]/20 to-[#00E5FF]/10 blur-2xl"/>
            <img
              src="https://images.pexels.com/photos/273682/pexels-photo-273682.jpeg"
              alt="ClientDesk AI"
              className="relative w-full h-96 object-cover rounded-3xl border border-white/10"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { Icon: Target, t: "Mission", d: "Help every business grow smarter with AI - not more headcount." },
            { Icon: Sparkles, t: "Vision", d: "By 2030, every customer interaction starts with an AI agent." },
            { Icon: Heart, t: "Values", d: "Honest selling. Fast delivery. Outcomes over output." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-7 hover:border-[#00FF66]/30 transition">
              <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] mb-4">
                <Icon size={20}/>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">{t}</h3>
              <p className="text-white/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
