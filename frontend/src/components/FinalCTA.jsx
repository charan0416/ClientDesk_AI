import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section data-testid="final-cta" className="py-24 md:py-32 border-t border-white/[0.06] relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(60% 80% at 50% 50%, rgba(0, 226, 122, 0.12), transparent 70%)"
      }}/>
      <div className="max-w-[960px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <span className="eyebrow justify-center inline-flex">Ready when you are</span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mt-5 leading-[1.02] text-white text-balance">
          Hire your AI workforce <br className="hidden sm:block"/>this week.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
          A 15-minute call is enough to scope your deployment. No slides. No pressure. Just a clear plan.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" data-testid="final-cta-primary" className="btn-primary">
            Book a demo <ArrowRight size={16}/>
          </Link>
          <a href="#pricing" data-testid="final-cta-secondary" className="btn-secondary">View pricing</a>
        </div>
      </div>
    </section>
  );
}
