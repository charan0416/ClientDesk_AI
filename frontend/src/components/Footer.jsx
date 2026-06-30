import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="border-t border-white/5 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#00FF66] flex items-center justify-center text-black font-display font-bold text-lg">
              C
            </div>
            <span className="font-display font-semibold text-lg text-white">
              ClientDesk<span className="text-[#00FF66]"> AI</span>
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Helping businesses grow smarter with AI agents, automation, and conversion-first design.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/services" className="hover:text-[#00FF66]">AI Agents</Link></li>
            <li><Link to="/services" className="hover:text-[#00FF66]">Website Design</Link></li>
            <li><Link to="/services" className="hover:text-[#00FF66]">Digital Marketing</Link></li>
            <li><Link to="/services" className="hover:text-[#00FF66]">WhatsApp Booking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2"><Phone size={14} className="text-[#00FF66]"/> +91 90000 00000</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-[#00FF66]"/> hello@clientdeskai.com</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-[#00FF66]"/> Bengaluru, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Follow</h4>
          <div className="flex gap-3">
            <a href="#" data-testid="footer-social-instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00FF66] hover:text-[#00FF66] transition">
              <Instagram size={16}/>
            </a>
            <a href="#" data-testid="footer-social-linkedin" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00FF66] hover:text-[#00FF66] transition">
              <Linkedin size={16}/>
            </a>
            <a href="#" data-testid="footer-social-twitter" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00FF66] hover:text-[#00FF66] transition">
              <Twitter size={16}/>
            </a>
          </div>
          <Link to="/admin/login" data-testid="footer-admin-link" className="text-xs text-white/30 hover:text-white/60 mt-6 inline-block">
            Admin Login
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} ClientDesk AI. Helping Businesses Grow Smarter.
      </div>
    </footer>
  );
}
