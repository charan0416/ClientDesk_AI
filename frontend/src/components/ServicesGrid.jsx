import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { aiAgents, growthServices } from "../data/services";

function ServiceCard({ s, featured }) {
  const Icon = s.icon;
  return (
    <Link
      to={`/service/${s.slug}`}
      data-testid={`service-card-${s.slug}`}
      className={`group relative block bg-[#0A0A0A] border border-white/5 hover:border-[#00FF66]/40 rounded-2xl p-6 md:p-8 transition-all hover:-translate-y-1 overflow-hidden ${
        featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#00FF66]/5 blur-3xl group-hover:bg-[#00FF66]/10 transition" />
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] group-hover:bg-[#00FF66] group-hover:text-black transition">
            <Icon size={22} />
          </div>
          <ArrowUpRight size={20} className="text-white/40 group-hover:text-[#00FF66] group-hover:rotate-12 transition" />
        </div>
        <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-3 tracking-tight">
          {s.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">{s.short}</p>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  return (
    <section data-testid="services-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="section-label">Our AI Agents</span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tighter">
            A digital workforce. <span className="text-[#00FF66]">Hired in 7 days.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">
            Six specialist AI agents that work 24/7, never call in sick, and cost a fraction of a human team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {aiAgents.map((s, i) => (
            <ServiceCard key={s.slug} s={s} featured={i === 0} />
          ))}
        </div>

        <div className="mt-24 mb-16 max-w-3xl">
          <span className="section-label">Growth Services</span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tighter">
            Full-stack growth. <span className="text-[#00FF66]">Zero guesswork.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">
            Conversion-first websites, WhatsApp automation, ads, SEO and reporting - all wired together so every lead lands in your CRM.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {growthServices.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
