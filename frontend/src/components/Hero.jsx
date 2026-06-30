import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,255,102,0.18), transparent 70%), radial-gradient(40% 40% at 80% 30%, rgba(0,229,255,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/5 text-[11px] uppercase tracking-[0.25em] text-[#00FF66] font-mono">
            <Zap size={12} /> Limited Onboarding · Feb 2026
          </span>
        </div>

        <h1 data-testid="hero-title" className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tighter max-w-5xl">
          Your business deserves an <span className="text-[#00FF66] text-glow-green">AI team</span> that never sleeps, never quits, never misses a lead.
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
          ClientDesk AI deploys AI Sales Execs, AI Receptionists, AI Support
          and a full digital-growth engine for businesses ready to scale without
          scaling headcount. <span className="text-white">Helping Businesses Grow Smarter.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00FF66] text-black font-semibold glow-green hover:glow-green-lg transition-all hover:scale-[1.02]"
          >
            Book Free Strategy Call
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/services"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-[#00FF66]/50 text-white/90 hover:text-white font-medium transition"
          >
            <Sparkles size={16} className="text-[#00FF66]" /> Explore Services
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: "120+", v: "Businesses Scaled" },
            { k: "24/7", v: "AI Coverage" },
            { k: "63%", v: "Avg. Conversion Lift" },
            { k: "<2s", v: "Response Time" },
          ].map((s) => (
            <div key={s.v} className="border-l border-white/10 pl-4">
              <p className="font-display text-3xl md:text-4xl font-semibold text-white">{s.k}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
