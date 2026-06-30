import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Within 30 days the AI Receptionist captured 4x more leads than our two-person front desk - at a fraction of the cost.",
    name: "Rohan Mehta",
    role: "Founder, Aurora Clinics",
    avatar: "https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg",
  },
  {
    quote:
      "ClientDesk's WhatsApp booking flow tripled our consultations in 6 weeks. Honestly the best marketing money I've spent.",
    name: "Aisha Khan",
    role: "Director, Lumen Studio",
    avatar: "https://images.unsplash.com/photo-1765776830139-72b2184dae5a?crop=entropy&cs=srgb&fm=jpg",
  },
  {
    quote:
      "Their AI Sales Exec qualifies leads while we sleep. Mornings now start with hot meetings, not cold outreach.",
    name: "Daniel Park",
    role: "CEO, Brightline Realty",
    avatar: "https://images.pexels.com/photos/17685845/pexels-photo-17685845.jpeg",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="py-24 md:py-32 bg-[#070707] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="section-label">Client Wins</span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tighter">
            They trusted us. <span className="text-[#00FF66]">Then they scaled.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-${i}`}
              className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-7 hover:border-[#00FF66]/30 transition"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={14} className="text-[#00FF66] fill-[#00FF66]" />
                ))}
              </div>
              <p className="text-white/85 leading-relaxed italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-white/10" />
                <div>
                  <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
