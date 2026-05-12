/* RsvpRegistryPage - RSVP & Registry
   Tuscan Terracotta & Ink design */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Heart, Gift } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_couple_terrace_d1d7acf5.webp";
const TERRACE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_terrace_view_0b0e5a7d.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_sunset_89805c9b.webp";
const FIREPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_firepit_evening_337d6ba2.webp";

const ZOLA_URL = "https://www.zola.com/wedding/damon-mackenzie/registry";

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function RsvpRegistryPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.02 80)" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "55vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.18 0.01 65 / 0.4) 0%, oklch(0.18 0.01 65 / 0.65) 60%, oklch(0.97 0.02 80 / 1) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-6 py-20">
          <p
            className="uppercase tracking-[0.3em] mb-4 text-white/80"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem" }}
          >
            Damon & Mackenzie · May 2027
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 300,
              color: "white",
              lineHeight: 1.1,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            RSVP & Registry
          </h1>
          <div style={{ width: 48, height: 1, background: "oklch(0.75 0.08 38)", margin: "1.5rem auto" }} />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "oklch(0.92 0.03 80)",
            }}
          >
            Everything you need is on our Zola page
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-2xl mx-auto px-6 py-14 text-center">
        <AnimatedSection>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              color: "oklch(0.38 0.03 65)",
              lineHeight: 1.8,
            }}
          >
            We have set up our RSVP and registry together on Zola so everything is in one place.
            Please use the links below to let us know you're coming and, if you'd like, explore our registry.
          </p>
        </AnimatedSection>
      </section>

      {/* Two Cards */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* RSVP Card */}
          <AnimatedSection>
            <div
              className="rounded-sm overflow-hidden shadow-xl flex flex-col"
              style={{ background: "oklch(0.18 0.02 65)" }}
            >
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={TERRACE_IMG}
                  alt="Borgo San Vincenzo terrace"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, oklch(0.18 0.02 65 / 0.7) 0%, transparent 60%)" }}
                />
              </div>
              <div style={{ height: 3, background: "oklch(0.55 0.12 38)" }} />
              <div className="p-8 flex flex-col flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.55 0.12 38 / 0.15)" }}
                >
                  <Heart size={18} style={{ color: "oklch(0.55 0.12 38)" }} />
                </div>
                <p
                  className="uppercase tracking-[0.25em] mb-2"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "oklch(0.55 0.12 38)" }}
                >
                  Step One
                </p>
                <h2
                  className="mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  RSVP
                </h2>
                <p
                  className="mb-6 flex-1"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.9rem",
                    color: "oklch(0.70 0.03 75)",
                    lineHeight: 1.7,
                  }}
                >
                  Please let us know you'll be joining us in Tuscany. Your RSVP helps us plan the most wonderful week together. We kindly ask that you respond by <strong style={{ color: "oklch(0.78 0.08 38)" }}>January 1, 2027</strong>.
                </p>
                
                  href={ZOLA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: "oklch(0.55 0.12 38)",
                    color: "white",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.9rem 2rem",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "oklch(0.48 0.1 38)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "oklch(0.55 0.12 38)")}
                >
                  RSVP on Zola <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Registry Card */}
          <AnimatedSection>
            <div
              className="rounded-sm overflow-hidden shadow-xl flex flex-col"
              style={{ background: "oklch(0.18 0.02 65)" }}
            >
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={SUNSET_IMG}
                  alt="Borgo San Vincenzo sunset"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, oklch(0.18 0.02 65 / 0.7) 0%, transparent 60%)" }}
                />
              </div>
              <div style={{ height: 3, background: "oklch(0.72 0.1 75)" }} />
              <div className="p-8 flex flex-col flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.72 0.1 75 / 0.15)" }}
                >
                  <Gift size={18} style={{ color: "oklch(0.72 0.1 75)" }} />
                </div>
                <p
                  className="uppercase tracking-[0.25em] mb-2"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "oklch(0.72 0.1 75)" }}
                >
                  Step Two
                </p>
                <h2
                  className="mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  Registry
                </h2>
                <p
                  className="mb-6 flex-1"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.9rem",
                    color: "oklch(0.70 0.03 75)",
                    lineHeight: 1.7,
                  }}
                >
                  Your presence in Tuscany with us is truly the greatest gift. If you would like to give something, we have put together a registry on Zola with a range of options we would cherish.
                </p>
                
                  href={ZOLA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: "oklch(0.72 0.1 75)",
                    color: "oklch(0.15 0.01 65)",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.9rem 2rem",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "oklch(0.65 0.09 75)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "oklch(0.72 0.1 75)")}
                >
                  View Registry on Zola <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo strip with quote */}
      <section className="relative overflow-hidden" style={{ height: 340 }}>
        <img
          src={FIREPIT_IMG}
          alt="Evening at Borgo San Vincenzo"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "oklch(0.18 0.01 65 / 0.55)" }}
        >
          <div className="text-center px-6 max-w-xl">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
                color: "white",
                lineHeight: 1.6,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              "We cannot wait to share this place, this food, and this light with the people we love most."
            </p>
            <p
              className="mt-4"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.75 0.08 38)",
              }}
            >
              — Damon & Mackenzie
            </p>
          </div>
        </div>
      </section>

      {/* Zola direct link */}
      <section className="max-w-2xl mx-auto px-6 py-14 text-center">
        <AnimatedSection>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.55 0.12 38)",
              marginBottom: "0.75rem",
            }}
          >
            Our Zola Page
          </p>
          
            href={ZOLA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "oklch(0.45 0.04 65)",
              textDecoration: "none",
              borderBottom: "1px solid oklch(0.55 0.12 38)",
              paddingBottom: "2px",
            }}
          >
            zola.com/wedding/damon-mackenzie/registry
          </a>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
