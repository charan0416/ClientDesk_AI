import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="border-t border-white/[0.06] bg-[#08090B] relative z-10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#00E27A] to-[#00B663] flex items-center justify-center text-[#051910] font-display text-sm font-bold">C</div>
              <span className="font-display text-[15px] text-white">ClientDesk<span className="text-white/40 ml-1">AI</span></span>
            </div>
            <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-sm">
              The AI workforce for modern businesses. Helping Businesses Grow Smarter.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a href="mailto:hello@clientdeskai.com" data-testid="footer-email" className="text-sm text-white/65 hover:text-white">hello@clientdeskai.com</a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Platform</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="text-white/70 hover:text-white">AI Agents</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-white">Growth Engine</Link></li>
              <li><a href="#pricing" className="text-white/70 hover:text-white">Pricing</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-white/70 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white">Book a demo</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="text-white/70 hover:text-white">Use cases</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-white">Integrations</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white">Security</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/70 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Terms</a></li>
              <li><Link to="/admin/login" data-testid="footer-admin-link" className="text-white/70 hover:text-white">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-7 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} ClientDesk AI. All rights reserved.</p>
          <p className="text-xs text-white/40">Made for ambitious businesses · Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
}
