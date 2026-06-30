import React from "react";
import { Flame } from "lucide-react";

export default function FOMOBanner() {
  return (
    <section data-testid="fomo-banner" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30" style={{
        backgroundImage: "radial-gradient(50% 50% at 50% 50%, rgba(0,255,102,0.25), transparent 70%)"
      }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/5 mb-6">
          <Flame size={14} className="text-[#00FF66]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#00FF66] font-mono">Only 6 slots left this month</span>
        </div>
        <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-tight">
          Every day without AI is <span className="text-[#00FF66]">money on the table.</span>
        </h2>
        <p className="mt-5 text-white/65 text-base md:text-lg max-w-2xl mx-auto">
          Your competitors are deploying AI agents this quarter. By Q3 they will be impossible to catch.
          Lock in your seat before our February batch closes.
        </p>
        <a
          href="/contact"
          data-testid="fomo-cta"
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00FF66] text-black font-semibold glow-green-lg hover:scale-[1.03] transition"
        >
          Claim My Slot
        </a>
      </div>
    </section>
  );
}
