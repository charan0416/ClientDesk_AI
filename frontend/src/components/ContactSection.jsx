import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";
import { allServices } from "../data/services";
import useReveal from "../hooks/useReveal";

export default function ContactSection({ defaultService = "" }) {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: defaultService, message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone) { setError("Please share your name, email and phone."); return; }
    setLoading(true);
    try {
      await api.post("/leads", { ...form, source: "contact_form" });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: defaultService, message: "" });
    } catch { setError("Could not submit. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <section data-testid="contact-section" id="contact" className="py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 reveal">
          <span className="eyebrow">Talk to sales</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 leading-[1.05] text-white text-balance">
            Let's scope your deployment.
          </h2>
          <p className="mt-5 text-white/60 text-lg max-w-md">
            Share a few details and a strategist will reach out within 24 hours with a custom plan.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { Icon: Phone, l: "Call or WhatsApp", v: "+91 90000 00000" },
              { Icon: Mail, l: "Email", v: "hello@clientdeskai.com" },
              { Icon: MapPin, l: "HQ", v: "Bengaluru, India" },
            ].map(({ Icon, l, v }) => (
              <div key={l} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#00E27A]">
                  <Icon size={16}/>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{l}</p>
                  <p className="text-white text-[15px]">{v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} data-testid="contact-form" className="lg:col-span-3 card p-8 md:p-10 reveal">
          {success ? (
            <div data-testid="contact-success" className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={48} className="text-[#00E27A] mb-4"/>
              <h3 className="font-display text-2xl text-white">You're in.</h3>
              <p className="mt-2 text-white/60 max-w-sm">A strategist will reach out within 24 hours with your custom plan.</p>
              <button type="button" onClick={() => setSuccess(false)} data-testid="contact-send-another" className="mt-6 text-sm text-[#00E27A] hover:underline">Send another message</button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" testid="contact-input-name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jane Doe"/>
                <Field label="Phone" testid="contact-input-phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 ..."/>
              </div>
              <div className="mt-4">
                <Field label="Work email" type="email" testid="contact-input-email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@company.com"/>
              </div>
              <div className="mt-4">
                <label className="text-[11px] uppercase tracking-[0.2em] text-white/45">Interested in</label>
                <select data-testid="contact-input-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 w-full bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-[#00E27A]/50 transition">
                  <option value="">Select a service</option>
                  {allServices.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="mt-4">
                <label className="text-[11px] uppercase tracking-[0.2em] text-white/45">What are you trying to solve?</label>
                <textarea data-testid="contact-input-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-[#00E27A]/50 transition resize-none"
                  placeholder="Tell us about your business, current bottlenecks, and what success looks like."/>
              </div>
              {error && <p data-testid="contact-error" className="mt-3 text-red-400 text-sm">{error}</p>}
              <button data-testid="contact-submit" type="submit" disabled={loading} className="btn-primary mt-7 w-full justify-center disabled:opacity-50">
                {loading ? "Sending..." : <>Book my demo <ArrowRight size={16}/></>}
              </button>
              <p className="mt-3 text-xs text-white/40 text-center">We respond within 24 hours. No spam, ever.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, testid, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</label>
      <input data-testid={testid} type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-[#00E27A]/50 transition"
        placeholder={placeholder}/>
    </div>
  );
}
