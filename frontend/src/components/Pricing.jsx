import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

const tiers = [
  {
    name: "Starter",
    desc: "For solo founders and small clinics getting started with AI.",
    price: "₹29,999",
    sub: "/ month",
    features: [
      "1 AI agent (your choice)",
      "Up to 500 conversations / month",
      "WhatsApp + Web chat",
      "Email support",
      "Monthly performance report",
    ],
    cta: "Start with Starter",
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "The most popular plan for growing service businesses.",
    price: "₹74,999",
    sub: "/ month",
    features: [
      "3 AI agents + custom training",
      "Up to 3,000 conversations / month",
      "Website redesign included",
      "WhatsApp booking + reminders",
      "Missed-call recovery",
      "Priority support & strategist",
    ],
    cta: "Book a demo",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    desc: "Full AI workforce + dedicated team for established brands.",
    price: "Custom",
    sub: "annual",
    features: [
      "Unlimited AI agents",
      "Unlimited conversations",
      "Full digital marketing engine",
      "Dedicated growth pod",
      "SLA + custom integrations",
      "Quarterly business reviews",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export default function Pricing() {
  useReveal();
  return (
    <section data-testid="pricing-section" id="pricing" className="py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl reveal">
          <span className="eyebrow">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white">
            Simple plans. Outsized returns.
          </h2>
          <p className="mt-5 text-white/60 text-lg">
            Start with one agent or go full stack. Every plan includes onboarding, training and a 30-day money-back guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              data-testid={`pricing-${t.name.toLowerCase()}`}
              className={`relative card p-8 reveal ${
                t.highlighted ? "border-[#00E27A]/30 bg-gradient-to-b from-[#0E1410] to-[#0A0B0E]" : ""
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-2.5 left-8 px-2.5 py-1 rounded-full bg-[#00E27A] text-[#051910] text-[10px] font-mono uppercase tracking-widest">
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-2xl text-white tracking-tight">{t.name}</h3>
              <p className="mt-2 text-sm text-white/55 min-h-[42px]">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-[44px] leading-none text-white">{t.price}</span>
                <span className="text-sm text-white/50">{t.sub}</span>
              </div>
              <Link
                to="/contact"
                data-testid={`pricing-cta-${t.name.toLowerCase()}`}
                className={`mt-7 w-full justify-center ${t.highlighted ? "btn-primary" : "btn-secondary"}`}
              >
                {t.cta} <ArrowRight size={14}/>
              </Link>
              <div className="mt-8 pt-7 border-t border-white/[0.06] space-y-3">
                {t.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check size={15} className="text-[#00E27A] mt-0.5 shrink-0"/> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
