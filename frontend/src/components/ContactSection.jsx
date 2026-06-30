import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";
import { allServices } from "../data/services";

export default function ContactSection({ defaultService = "" }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: defaultService, message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/leads", { ...form, source: "contact_form" });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: defaultService, message: "" });
    } catch (e2) {
      setError("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="contact-section" id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="section-label">Let's Talk</span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tighter leading-tight">
            Book a free <span className="text-[#00FF66]">15-minute strategy call.</span>
          </h2>
          <p className="mt-5 text-white/65 text-base md:text-lg max-w-lg">
            Tell us a little about your business. We will map exactly which AI agents and growth plays will
            move your revenue this quarter - no pressure, no spam.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                <Phone size={18}/>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Call / WhatsApp</p>
                <p className="text-white font-medium">+91 90000 00000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                <Mail size={18}/>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Email</p>
                <p className="text-white font-medium">hello@clientdeskai.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                <MapPin size={18}/>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Location</p>
                <p className="text-white font-medium">Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 md:p-10"
        >
          {success ? (
            <div data-testid="contact-success" className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={56} className="text-[#00FF66] mb-4"/>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">You're in.</h3>
              <p className="text-white/60 max-w-sm">Our team will reach out within 24 hours with your custom growth plan.</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                data-testid="contact-send-another"
                className="mt-6 text-sm text-[#00FF66] underline-offset-4 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-white/50">Name</label>
                  <input
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50 transition"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-white/50">Phone</label>
                  <input
                    data-testid="contact-input-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50 transition"
                    placeholder="+91 ..."
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.2em] text-white/50">Email</label>
                <input
                  data-testid="contact-input-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50 transition"
                  placeholder="you@business.com"
                />
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.2em] text-white/50">Interested in</label>
                <select
                  data-testid="contact-input-service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50 transition"
                >
                  <option value="">Select a service</option>
                  {allServices.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.2em] text-white/50">Tell us about your business</label>
                <textarea
                  data-testid="contact-input-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50 transition resize-none"
                  placeholder="What do you sell? Where are you stuck?"
                />
              </div>
              {error && <p data-testid="contact-error" className="mt-3 text-red-400 text-sm">{error}</p>}
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={loading}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#00FF66] text-black font-semibold glow-green hover:glow-green-lg transition disabled:opacity-50"
              >
                {loading ? "Sending..." : <>Book My Free Call <Send size={16}/></>}
              </button>
              <p className="mt-3 text-[11px] text-white/40 text-center">
                We respond within 24 hours. No spam. Ever.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
