import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { allServices } from "../data/services";
import ContactSection from "../components/ContactSection";
import FinalCTA from "../components/FinalCTA";
import useReveal from "../hooks/useReveal";

export default function ServiceDetail() {
  useReveal();
  const { slug } = useParams();
  const service = allServices.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = service.icon;

  return (
    <div data-testid="service-detail-page" className="pt-28 md:pt-32">
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          <Link to="/services" data-testid="back-to-services" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition mb-10">
            <ArrowLeft size={14}/> Back to platform
          </Link>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/65 mb-6">
                <div className="w-6 h-6 rounded-md bg-[#00E27A]/15 border border-[#00E27A]/25 flex items-center justify-center text-[#00E27A]"><Icon size={12}/></div>
                Platform module
              </div>
              <h1 data-testid="service-title" className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tighter text-white text-balance">
                {service.title}
              </h1>
              <p className="mt-6 text-xl text-white/65 max-w-xl">{service.short}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Book a demo <ArrowRight size={14}/></Link>
                <a href="#benefits" className="btn-secondary">See benefits</a>
              </div>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="mock-window overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-72 lg:h-96 object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 reveal">
            <span className="eyebrow">What you get</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-[1.05] text-white">Outcomes, not features.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {service.benefits.map((b, i) => (
              <div key={`${service.slug}-benefit-${i}`} data-testid={`benefit-${i}`} className="card p-6 flex items-start gap-4 reveal">
                <div className="w-8 h-8 rounded-lg bg-[#00E27A] text-[#051910] flex items-center justify-center shrink-0"><Check size={14}/></div>
                <p className="text-white/85 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 md:p-7 rounded-2xl border border-[#00E27A]/20 bg-[#00E27A]/[0.04] reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-[#00E27A] font-mono mb-2">Why it matters</p>
            <p className="text-white/85 text-lg leading-relaxed">{service.fomo}</p>
          </div>
        </div>
      </section>

      <FinalCTA />
      <ContactSection defaultService={service.title} />
    </div>
  );
}
