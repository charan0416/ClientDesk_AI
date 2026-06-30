import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Platform" },
  { to: "/about", label: "Company" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onScroll & setScrolled are stable for the lifetime of this component.
  }, []);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090B]/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#00E27A] to-[#00B663] flex items-center justify-center text-[#051910] font-display text-sm font-bold">
            C
          </div>
          <span className="font-display text-[15px] tracking-tight text-white">
            ClientDesk<span className="text-white/40 font-medium ml-1">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`px-3.5 py-1.5 rounded-full text-sm transition-colors ${
                location.pathname === l.to ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/admin/login"
            data-testid="navbar-signin"
            className="text-sm text-white/65 hover:text-white px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            data-testid="navbar-cta-book"
            className="btn-primary text-sm"
          >
            Book a demo <ArrowRight size={14} />
          </Link>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#08090B]">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                className="text-white/85 py-2.5 text-sm"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-cta"
              className="btn-primary mt-3 justify-center text-sm"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
