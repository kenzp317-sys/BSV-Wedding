/* Navigation component - Tuscan Terracotta & Ink design */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Welcome" },
  { href: "/venue", label: "The Venue" },
  { href: "/experiences", label: "Experiences" },
  { href: "/explore", label: "Explore" },
  { href: "/travel", label: "Getting Here" },
  { href: "/schedule", label: "Schedule" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[oklch(0.97_0.02_80/0.97)] backdrop-blur-sm shadow-sm border-b border-[oklch(0.88_0.03_75)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col leading-none cursor-pointer">
              <span
                className={`font-cinzel text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  scrolled || !isHome ? "text-[oklch(0.55_0.12_38)]" : "text-white"
                }`}
              >
                Borgo San Vincenzo
              </span>
              <span
                className={`font-display italic text-lg transition-colors duration-300 ${
                  scrolled || !isHome ? "text-[oklch(0.18_0.01_65)]" : "text-white"
                }`}
              >
                May 2027
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`font-cinzel text-xs tracking-widest uppercase transition-all duration-200 relative group cursor-pointer ${
                    scrolled || !isHome ? "text-[oklch(0.3_0.02_65)]" : "text-white/90"
                  } ${location === link.href ? "text-[oklch(0.55_0.12_38)]" : ""}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[oklch(0.55_0.12_38)] transition-all duration-300 ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden transition-colors ${
              scrolled || !isHome ? "text-[oklch(0.18_0.01_65)]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.97_0.02_80)] border-t border-[oklch(0.88_0.03_75)] shadow-lg">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block px-6 py-3 font-cinzel text-xs tracking-widest uppercase cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-[oklch(0.55_0.12_38)] bg-[oklch(0.93_0.03_80)]"
                      : "text-[oklch(0.3_0.02_65)] hover:text-[oklch(0.55_0.12_38)] hover:bg-[oklch(0.93_0.03_80)]"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
