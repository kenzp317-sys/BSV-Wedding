/* Footer component - Tuscan Terracotta & Ink design */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.01_65)] text-[oklch(0.78_0.03_75)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[oklch(0.55_0.12_38)] mb-2">
              Borgo San Vincenzo
            </p>
            <p className="font-display italic text-2xl text-[oklch(0.93_0.03_80)] mb-4">
              May 24–29, 2027
            </p>
            <p className="font-body text-sm leading-relaxed text-[oklch(0.65_0.03_75)]">
              A friends and family celebration in the heart of Tuscany, in the Vino Nobile vineyards of Montepulciano.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-4">
              Explore
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Welcome" },
                { href: "/venue", label: "The Venue" },
                { href: "/experiences", label: "Experiences" },
                { href: "/explore", label: "Explore the Region" },
                { href: "/travel", label: "Getting Here" },
                { href: "/schedule", label: "Event Schedule" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="font-body text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.75_0.08_38)] transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Venue Info */}
          <div>
            <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-4">
              The Venue
            </p>
            <div className="space-y-2 text-sm text-[oklch(0.65_0.03_75)]">
              <p className="font-body">Borgo San Vincenzo</p>
              <p className="font-body">Strada del Vino Nobile</p>
              <p className="font-body">Montepulciano, Tuscany, Italy</p>
              <a
                href="https://borgosanvincenzo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] hover:text-[oklch(0.75_0.08_38)] transition-colors"
              >
                borgosanvincenzo.com →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[oklch(0.3_0.02_65)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[oklch(0.45_0.02_65)]">
            © 2027 · A private celebration · All are welcome with love
          </p>
          <p className="font-display italic text-sm text-[oklch(0.55_0.12_38)]">
            Tuscany awaits
          </p>
        </div>
      </div>
    </footer>
  );
}
