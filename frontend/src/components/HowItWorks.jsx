import React from "react";
import { Search, Workflow, Rocket, BarChart3 } from "lucide-react";
import useReveal from "../hooks/useReveal";

const steps = [
  {
    Icon: Search,
    n: "01",
    t: "Audit & blueprint",
    d: "We map your customer journey, channels and bottlenecks in a 30-minute strategy call. You walk away with a deployment plan.",
  },
  {
    Icon: Workflow,
    n: "02",
    t: "Custom training",
    d: "We train your AI agents on your offers, tone, FAQs and integrations — Calendar, WhatsApp, CRM, telephony.",
  },
  {
    Icon: Rocket,
    n: "03",
    t: "Go live in 7 days",
    d: "Your AI workforce launches in under a week. We monitor everything for the first 30 days and tune in real time.",
  },
  {
    Icon: BarChart3,
    n: "04",
    t: "Scale & report",
    d: "A monthly performance report shows calls, bookings, recovered revenue and ROI. We optimise, you grow.",
  },
];

export default function HowItWorks() {
  useReveal();
  return (
    <section data-testid="how-it-works" className="py-24 md:py-32 border-t border-white/[0.06] bg-[#0A0B0E]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl reveal">
          <span className="eyebrow">How it works</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white">
            From kickoff to ROI in 30 days.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {steps.map(({ Icon, n, t, d }) => (
            <div key={n} className="bg-[#0A0B0E] p-7 md:p-8 reveal hover:bg-[#0F1014] transition">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-white/35">{n}</span>
                <Icon size={18} className="text-[#00E27A]"/>
              </div>
              <h3 className="font-display text-xl text-white tracking-tight">{t}</h3>
              <p className="mt-2.5 text-sm text-white/55 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
