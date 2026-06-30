import React from "react";
import { Star } from "lucide-react";
import useReveal from "../hooks/useReveal";

const testimonials = [
  { quote: "Within 30 days the AI Receptionist captured 4x more leads than our two-person front desk — at a fraction of the cost.", name: "Rohan Mehta", role: "Founder, Aurora Clinics", avatar: "https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg" },
  { quote: "ClientDesk's WhatsApp booking flow tripled our consultations in 6 weeks. Best marketing spend, period.", name: "Aisha Khan", role: "Director, Lumen Studio", avatar: "https://images.unsplash.com/photo-1765776830139-72b2184dae5a?crop=entropy&cs=srgb&fm=jpg" },
  { quote: "Their AI Sales Exec qualifies leads while we sleep. Mornings now start with hot meetings, not cold outreach.", name: "Daniel Park", role: "CEO, Brightline Realty", avatar: "https://images.pexels.com/photos/17685845/pexels-photo-17685845.jpeg" },
  { quote: "Implementation took 6 days. Our no-show rate dropped 58% in the first month alone.", name: "Sneha R.", role: "COO, Stellar Health", avatar: "https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg" },
];

export default function Testimonials() {
  useReveal();
  return (
    <section data-testid="testimonials-section" className="py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl reveal">
          <span className="eyebrow">Loved by operators</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white">
            They trusted us. Then they scaled.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.role}`} data-testid={`testimonial-${t.name.replace(/\s+/g, '-').toLowerCase()}`} className="card p-7 reveal">
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((k) => <Star key={`star-${k}`} size={12} className="text-[#00E27A] fill-[#00E27A]"/>)}
              </div>
              <p className="text-white/85 leading-relaxed text-[15px]">"{t.quote}"</p>
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/10"/>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/45 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
