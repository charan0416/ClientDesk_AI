import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { aiAgents, growthServices } from "../data/services";
import useReveal from "../hooks/useReveal";

function ServiceCard({ s, large }) {
  const Icon = s.icon;
  return (
    <Link
      to={`/service/${s.slug}`}
      data-testid={`service-card-${s.slug}`}
      className={`group relative block card lift p-7 md:p-8 reveal ${large ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#00E27A]">
          <Icon size={18} />
        </div>
        <ArrowUpRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <h3 className="font-display text-[20px] md:text-[22px] text-white tracking-tight">
        {s.title}
      </h3>
      <p className="mt-2.5 text-sm text-white/55 leading-relaxed">{s.short}</p>
    </Link>
  );
}

export default function ServicesGrid() {
  useReveal();
  return (
    <section data-testid="services-section" className="py-24 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl reveal">
          <span className="eyebrow">The AI Workforce</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white text-balance">
            Six AI agents. One unified team.
          </h2>
          <p className="mt-5 text-white/60 text-lg max-w-2xl">
            Purpose-built agents trained on your business, your tone, your offers — ready in 7 days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {aiAgents.map((s, i) => (
            <ServiceCard key={s.slug} s={s} large={i === 0} />
          ))}
        </div>

        <div className="mt-28 mb-14 max-w-3xl reveal">
          <span className="eyebrow">Growth Engine</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white text-balance">
            Eight growth plays. Fully orchestrated.
          </h2>
          <p className="mt-5 text-white/60 text-lg max-w-2xl">
            Conversion-first websites, WhatsApp automation, ads, SEO and monthly reporting — wired together so every lead lands in your CRM.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthServices.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
