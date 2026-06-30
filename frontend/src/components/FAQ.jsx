import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import useReveal from "../hooks/useReveal";

const faqs = [
  {
    q: "How fast can you deploy an AI agent?",
    a: "Most clients go live within 7 business days. The first 48 hours are spent in discovery and training data setup. The next 5 days we deploy, integrate with your tools (Calendar, WhatsApp, CRM, telephony), test, and launch.",
  },
  {
    q: "Will the AI sound like a robot to my customers?",
    a: "No. Every agent is trained on your tone of voice, brand vocabulary and FAQs. We benchmark against your top performer and tune until conversations feel like a senior team member is on the line.",
  },
  {
    q: "What if the AI can't handle a complex question?",
    a: "Every agent has a smart escalation path. Complex or sensitive cases are routed to your team via WhatsApp, email or a live transfer with full context attached — so no lead ever falls through the cracks.",
  },
  {
    q: "Do I need to change my existing tools?",
    a: "No. ClientDesk AI integrates with the tools you already use — Google Calendar, WhatsApp Business, HubSpot, Zoho, Pipedrive, custom CRMs, telephony providers and most payment gateways.",
  },
  {
    q: "Is my data and my customers' data secure?",
    a: "Yes. We are SOC-2 aligned, use encrypted data stores, and never train external public models on your data. Every agent runs in an isolated environment scoped to your business.",
  },
  {
    q: "What if it doesn't work for my business?",
    a: "Every plan includes a 30-day money-back guarantee. If your AI agent does not deliver measurable outcomes in the first 30 days, we will refund your investment in full — no questions.",
  },
];

export default function FAQ() {
  useReveal();
  const [open, setOpen] = useState(0);
  return (
    <section data-testid="faq-section" id="faq" className="py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl reveal">
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] mt-4 leading-[1.05] text-white">
            Questions, answered.
          </h2>
        </div>
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                data-testid={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full text-left py-5 md:py-6 flex items-start gap-5 group reveal"
              >
                <div className="flex-1">
                  <p className="text-base md:text-lg text-white font-medium pr-4">{f.q}</p>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="text-white/60 leading-relaxed text-[15px]">{f.a}</p>
                    </div>
                  </div>
                </div>
                <span className="mt-1 shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:border-white/30 transition">
                  {isOpen ? <Minus size={14}/> : <Plus size={14}/>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
