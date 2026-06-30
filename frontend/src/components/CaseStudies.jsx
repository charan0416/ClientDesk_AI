import React from "react";
import { CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import useReveal from "../hooks/useReveal";

const cases = [
  {
    sector: "Healthcare",
    name: "Aurora Clinics",
    metric: "4.2×",
    metricLabel: "more bookings in 60 days",
    quote: "ClientDesk's AI Receptionist captured every after-hours call. Our booking sheet has never been this full.",
    person: "Rohan Mehta · Founder",
    bullets: ["Replaced 2 front-desk hires", "Zero missed calls in month 1", "Avg booking time: 47s"],
  },
  {
    sector: "Real Estate",
    name: "Brightline Realty",
    metric: "₹3.6 Cr",
    metricLabel: "additional pipeline · Q1",
    quote: "Their AI Sales Exec qualifies leads while we sleep. We start every morning with hot meetings booked.",
    person: "Daniel Park · CEO",
    bullets: ["100% lead response under 2 min", "62% qualified-rate uplift", "30+ hours saved weekly"],
  },
];

export default function CaseStudies() {
  useReveal();
  return (
    <section data-testid="case-studies" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl reveal">
          <span className="eyebrow">Case studies</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white">
            Real businesses. Real revenue.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((c, i) => (
            <article key={c.name} className="card p-8 md:p-10 reveal">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-white/45 font-mono">{c.sector}</span>
                <div className="flex items-center gap-1.5 text-[#00E27A] text-xs">
                  <TrendingUp size={13}/> verified outcome
                </div>
              </div>
              <p className="font-display text-[56px] md:text-[64px] leading-none text-white">{c.metric}</p>
              <p className="text-sm text-white/55 mt-2">{c.metricLabel}</p>
              <blockquote className="mt-8 text-white/85 text-lg leading-relaxed">"{c.quote}"</blockquote>
              <p className="mt-4 text-sm text-white/45">{c.person}, {c.name}</p>
              <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2.5">
                {c.bullets.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 size={14} className="text-[#00E27A] shrink-0"/> {b}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
