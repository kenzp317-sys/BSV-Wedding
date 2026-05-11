/* Save the Date — standalone page, same Tuscan Terracotta & Ink theme
   Designed to be shared as a link. No nav, no footer — just the essentials. */

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/hero_tuscany-hMY2MXm2wJCY5AFfqppoVM.webp";
const PROPERTY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_property-g24S6GHVEdweb5CxDMzbj7.webp";

export default function SaveTheDatePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{ background: "oklch(0.97 0.02 80)", fontFamily: "Lato, sans-serif" }}
    >
      {/* ── FULL-BLEED HERO ── */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* gradient: darker at bottom to blend into parchment */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.01 65 / 0.35) 0%, oklch(0.18 0.01 65 / 0.55) 60%, oklch(0.97 0.02 80 / 1) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6 py-16 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p
            className="uppercase tracking-[0.3em] text-white text-sm mb-5"
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Save the Date
          </p>

          {/* Names */}
          <h1
            className="text-white leading-none mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              fontWeight: 300,
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            Damon{" "}
            <span style={{ color: "oklch(0.78 0.1 38)" }}>&amp;</span>{" "}
            Mackenzie
          </h1>

          {/* Tagline */}
          <p
            className="text-white/80 mb-0"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              fontStyle: "italic",
            }}
          >
            invite you to join them in the{" "}
            <em style={{ color: "oklch(0.78 0.1 38)" }}>Heart of Italy</em>
          </p>
        </div>
      </section>

      {/* ── DATE & LOCATION CARD ── */}
      <section className="w-full max-w-2xl mx-auto px-6 -mt-8 relative z-10 mb-10">
        <div
          className="rounded-sm shadow-2xl overflow-hidden"
          style={{ background: "oklch(0.18 0.02 65)" }}
        >
          {/* Terracotta accent bar */}
          <div style={{ height: 4, background: "oklch(0.55 0.12 38)" }} />

          <div className="px-8 py-10 text-center">
            {/* THE DATES — hero element */}
            <p
              className="uppercase tracking-[0.25em] mb-3"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                color: "oklch(0.55 0.12 38)",
              }}
            >
              The Dates
            </p>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 8vw, 5rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              May 24 – 29
            </div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                color: "oklch(0.78 0.1 38)",
                letterSpacing: "0.15em",
                marginTop: "0.3rem",
                marginBottom: "1.5rem",
              }}
            >
              2027
            </div>

            {/* Divider */}
            <div
              style={{
                width: 48,
                height: 1,
                background: "oklch(0.55 0.12 38)",
                margin: "0 auto 1.5rem",
              }}
            />

            {/* THE LOCATION */}
            <p
              className="uppercase tracking-[0.25em] mb-3"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                color: "oklch(0.55 0.12 38)",
              }}
            >
              The Location
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 400,
                color: "white",
                lineHeight: 1.2,
              }}
            >
              Borgo San Vincenzo
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                color: "oklch(0.78 0.1 38)",
                letterSpacing: "0.08em",
                marginTop: "0.3rem",
                marginBottom: "1.5rem",
              }}
            >
              Montepulciano · Tuscany, Italy
            </p>

            {/* Divider */}
            <div
              style={{
                width: 48,
                height: 1,
                background: "oklch(0.55 0.12 38)",
                margin: "0 auto 1.5rem",
              }}
            />

            {/* Duration note */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "oklch(0.75 0.03 65)",
                lineHeight: 1.6,
                maxWidth: 420,
                margin: "0 auto 1.8rem",
              }}
            >
              Five nights together in the Vino Nobile vineyards of Southern Tuscany.
              A friends &amp; family celebration — formal invitation to follow.
            </p>

            {/* CTA button */}
            <a
              href="https://mackenzieanddamon2027.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "oklch(0.55 0.12 38)",
                color: "white",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "oklch(0.48 0.1 38)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "oklch(0.55 0.12 38)")
              }
            >
              Learn More &amp; RSVP →
            </a>
          </div>
        </div>
      </section>

      {/* ── VENUE PHOTO STRIP ── */}
      <section className="w-full max-w-2xl mx-auto px-6 mb-12">
        <div className="rounded-sm overflow-hidden shadow-lg" style={{ height: 220 }}>
          <img
            src={PROPERTY_IMG}
            alt="Borgo San Vincenzo, Montepulciano"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <p
          className="text-center mt-3"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "oklch(0.55 0.12 38)",
          }}
        >
          Borgo San Vincenzo · Strada del Vino Nobile · Montepulciano
        </p>
      </section>

      {/* ── FOOTER NOTE ── */}
      <footer
        className="w-full text-center pb-10 px-6"
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.78rem",
          color: "oklch(0.55 0.04 65)",
          lineHeight: 1.8,
        }}
      >
        <p>
          Formal invitations with full details will be sent in due course.
        </p>
        <p className="mt-1">
          Questions?{" "}
          <a
            href="https://mackenzieanddamon2027.manus.space"
            style={{ color: "oklch(0.55 0.12 38)", textDecoration: "none" }}
          >
            mackenzieanddamon2027.manus.space
          </a>
        </p>
      </footer>
    </div>
  );
}
