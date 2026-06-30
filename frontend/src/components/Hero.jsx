import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Phone, Mail, MessageSquare, Calendar } from "lucide-react";
import useReveal from "../hooks/useReveal";

function LogoMark({ children }) {
  return (
    <div className="px-5 h-9 flex items-center text-white/40 text-sm font-medium tracking-wide whitespace-nowrap">
      {children}
    </div>
  );
}

export default function Hero() {
  useReveal();
  return (
    <section
      data-testid="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-aura"
    >
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E27A] animate-pulse"></span>
            New · Q1 2026 Onboarding Open
          </span>

          <h1
            data-testid="hero-title"
            className="font-display text-[44px] leading-[1.05] sm:text-6xl lg:text-[78px] mt-6 text-white text-balance"
          >
            The AI workforce<br className="hidden sm:block" /> for modern businesses.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed text-balance">
            ClientDesk AI deploys AI Sales Executives, Receptionists, Support agents and a complete
            growth engine — so your business answers every call, books every meeting, and closes every lead.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact" data-testid="hero-cta-primary" className="btn-primary">
              Book a demo <ArrowRight size={16} />
            </Link>
            <Link to="/services" data-testid="hero-cta-secondary" className="btn-secondary">
              <Sparkles size={14} className="text-[#00E27A]" /> Explore the platform
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/40"></span> 7-day deployment</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/40"></span> No long-term contract</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/40"></span> Cancel anytime</span>
          </div>
        </div>

        {/* Product preview */}
        <div className="mt-20 reveal">
          <div className="mock-window p-3 md:p-4">
            <div className="flex items-center gap-1.5 px-2 pb-3 border-b border-white/[0.06]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F2127]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F2127]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F2127]"></span>
              <span className="ml-3 text-[11px] font-mono text-white/35">clientdesk.ai/console</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 p-3">
              {[
                { Icon: Phone, label: "AI Receptionist", k: "1,284", sub: "calls answered", trend: "+38%" },
                { Icon: Calendar, label: "Appointments", k: "412", sub: "this month", trend: "+62%" },
                { Icon: MessageSquare, label: "Conversations", k: "9,127", sub: "qualified leads", trend: "+24%" },
              ].map(({ Icon, label, k, sub, trend }) => (
                <div key={label} className="rounded-xl bg-[#0C0D11] border border-white/[0.06] p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#00E27A]">
                      <Icon size={15}/>
                    </div>
                    <span className="text-[10px] font-mono text-[#00E27A] bg-[#00E27A]/10 px-1.5 py-0.5 rounded-md">{trend}</span>
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">{label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-3xl text-white">{k}</span>
                    <span className="text-xs text-white/45">{sub}</span>
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00E27A] to-[#00B663]" style={{width: `${60 + Math.random() * 30}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-5 gap-3 px-3 pb-3">
              <div className="md:col-span-3 rounded-xl bg-[#0C0D11] border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-white font-medium">Live conversations</p>
                  <span className="text-[10px] font-mono text-white/40">REAL-TIME</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { n: "Priya M.", m: "Wants to book a consultation Friday at 4pm", t: "now" },
                    { n: "Rahul S.", m: "Asked about pricing — qualified as enterprise", t: "2m" },
                    { n: "Maya K.", m: "Reschedule appointment to next Monday", t: "5m" },
                    { n: "Arjun P.", m: "Missed-call recovered via WhatsApp", t: "8m" },
                  ].map((c) => (
                    <div key={c.n} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02]">
                      <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-xs text-white/70">{c.n[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate"><span className="text-white">{c.n}</span> <span className="text-white/55">— {c.m}</span></p>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">{c.t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 rounded-xl bg-[#0C0D11] border border-white/[0.06] p-5">
                <p className="text-sm text-white font-medium mb-4">This week</p>
                <div className="flex items-end gap-1.5 h-28">
                  {[40, 55, 38, 70, 62, 88, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-[#00E27A]/30 to-[#00E27A] rounded-sm" style={{height: `${h}%`}}/>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-mono text-white/35">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 reveal">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/35 mb-6">
            Trusted by ambitious teams across India, UAE & SEA
          </p>
          <div className="overflow-hidden relative">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[..."Aurora Clinics · Lumen Studio · Brightline Realty · Northwind Co · Stellar Health · Vega Auto · Helios Group · Orbit Travel · Aurora Clinics · Lumen Studio · Brightline Realty · Northwind Co · Stellar Health · Vega Auto · Helios Group · Orbit Travel".split("·")].map((n, i) => (
                <LogoMark key={i}>{n.trim()}</LogoMark>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08090B] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08090B] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
