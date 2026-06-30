import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Flame } from "lucide-react";
import { allServices } from "../data/services";
import ContactSection from "../components/ContactSection";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = allServices.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;

  return (
    <div data-testid="service-detail-page" className="pt-28 md:pt-32">
      <section className="relative py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" data-testid="back-to-services" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#00FF66] transition mb-8">
            <ArrowLeft size={16}/> Back to services
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] mb-6">
                <Icon size={24}/>
              </div>
              <span className="section-label">Service</span>
              <h1 data-testid="service-title" className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tighter leading-tight">
                {service.title}
              </h1>
              <p className="mt-5 text-lg text-white/70 max-w-xl">{service.short}</p>

              <div className="mt-8 p-5 rounded-2xl border border-[#00FF66]/20 bg-[#00FF66]/[0.04] flex items-start gap-3">
                <Flame size={20} className="text-[#00FF66] mt-0.5 shrink-0"/>
                <p className="text-white/85 text-sm leading-relaxed"><span className="font-semibold text-[#00FF66]">FOMO Alert:</span> {service.fomo}</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#00FF66]/30 via-transparent to-[#00E5FF]/20 blur-2xl"/>
              <img
                src={service.image}
                alt={service.title}
                className="relative w-full h-72 md:h-96 object-cover rounded-3xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">What you get</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mt-4 tracking-tighter">
            Real benefits. <span className="text-[#00FF66]">Real numbers.</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {service.benefits.map((b, i) => (
              <div key={i} data-testid={`benefit-${i}`} className="flex items-start gap-3 p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
                <div className="w-7 h-7 rounded-full bg-[#00FF66] text-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14}/>
                </div>
                <p className="text-white/85">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection defaultService={service.title} />
    </div>
  );
}
