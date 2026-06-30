import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      data-testid="main-navbar"
      className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#00FF66] flex items-center justify-center text-black font-display font-bold text-lg glow-green">
            C
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-lg tracking-tight text-white">
              ClientDesk<span className="text-[#00FF66]"> AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Grow Smarter
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-[#00FF66] ${
                location.pathname === l.to ? "text-[#00FF66]" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="navbar-cta-book"
            className="px-5 py-2.5 rounded-full bg-[#00FF66] text-black text-sm font-semibold hover:bg-[#00CC52] transition-all glow-green hover:scale-[1.03]"
          >
            Book Free Consultation
          </Link>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#050505]">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                className="text-white/90 py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-cta"
              className="mt-2 px-5 py-2.5 rounded-full bg-[#00FF66] text-black text-center font-semibold"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
