/* Home page - Tuscan Terracotta & Ink design
   Answers: Who, What, Where, When, How, Why
   Full-bleed hero, editorial split sections, countdown, quick-nav cards */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Calendar, Users, Heart, Wine, Plane } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/hero_tuscany-hMY2MXm2wJCY5AFfqppoVM.webp";
const WEDDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/farm_lunch_46030661.jpg";
const PROPERTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_property-g24S6GHVEdweb5CxDMzbj7.webp";
const TUSCANY_MAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_may-hfVdjaWTo6NDWn3NP9RUbb.webp";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function useIntersectionObserver(threshold = 0.15) {
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
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const quickLinks = [
  {
    href: "/venue",
    icon: MapPin,
    label: "The Venue",
    desc: "Borgo San Vincenzo — 21 rooms, pool, restaurant, and vineyards",
    color: "bg-[oklch(0.55_0.12_38)]",
  },
  {
    href: "/experiences",
    icon: Wine,
    label: "Experiences",
    desc: "Wine tours, cooking classes, truffle hunts, and more",
    color: "bg-[oklch(0.48_0.07_130)]",
  },
  {
    href: "/explore",
    icon: Heart,
    label: "Explore",
    desc: "Pienza, Montalcino, Siena, and the UNESCO Val d'Orcia",
    color: "bg-[oklch(0.72_0.1_75)]",
  },
  {
    href: "/travel",
    icon: Plane,
    label: "Getting Here",
    desc: "Flights, airports, driving directions, and travel tips",
    color: "bg-[oklch(0.35_0.05_65)]",
  },
  {
    href: "/schedule",
    icon: Calendar,
    label: "Schedule",
    desc: "Five days of celebration, May 24–29, 2027",
    color: "bg-[oklch(0.55_0.12_38)]",
  },
];

export default function Home() {
  const weddingDate = new Date("2027-05-24T14:00:00");
  const countdown = useCountdown(weddingDate);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] ease-linear"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.01_65/0.3)] via-[oklch(0.18_0.01_65/0.4)] to-[oklch(0.18_0.01_65/0.7)]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="font-cinzel text-sm sm:text-base tracking-[0.25em] uppercase text-white mb-6 animate-fade-up" style={{textShadow: '0 1px 8px rgba(0,0,0,0.7)'}}>
            A Celebration in Tuscany
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-4 animate-fade-up delay-100">
            Damon <span className="text-[oklch(0.75_0.08_38)]">&</span> Mackenzie
          </h1>
          <p className="font-display italic text-2xl sm:text-3xl text-white/80 mb-6 animate-fade-up delay-150">
            invite you to join them in the <em className="text-[oklch(0.75_0.08_38)]">Heart of Italy</em>
          </p>
          <p className="font-body text-lg sm:text-xl text-white/80 mb-10 animate-fade-up delay-200">
            Borgo San Vincenzo · Montepulciano, Tuscany<br />
            <span className="font-display italic text-[oklch(0.75_0.08_38)]">May 24 – 29, 2027</span>
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 animate-fade-up delay-300">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Min" },
              { value: countdown.seconds, label: "Sec" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-light text-white tabular-nums">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="font-cinzel text-[0.6rem] tracking-widest uppercase text-white/60 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 animate-fade-up delay-400">
            <Link href="/venue">
              <button className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_38)] hover:bg-[oklch(0.48_0.1_38)] text-white font-cinzel text-xs tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:gap-3">
                Discover the Venue <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </section>

      {/* ── WHO & WHAT ── */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-label mb-4">The Occasion</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[oklch(0.18_0.01_65)] leading-tight mb-6">
                A Wedding.<br />
                <em className="italic text-[oklch(0.55_0.12_38)]">A Gathering.</em><br />
                A Memory.
              </h2>
              <div className="w-16 h-px bg-[oklch(0.55_0.12_38)] mb-6" />
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Damon and Mackenzie are celebrating their wedding by bringing together the people they love most — friends and family from across the United States, Italy, and Taiwan — for five unforgettable days in the Tuscan countryside.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Their home for the week — and yours — will be <strong>Borgo San Vincenzo</strong>, an 18th-century boutique hotel nestled in the Vino Nobile vineyards of Montepulciano. It is a place where time slows down, where meals stretch into evenings, and where the rolling hills of Tuscany become the backdrop for moments you will carry for a lifetime.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)]">
                This is not just a wedding — it is an invitation from Damon and Mackenzie to experience one of the world's most beautiful places together.
              </p>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <div className="relative rounded-sm overflow-hidden shadow-2xl">
                <img
                  src={WEDDING_IMG}
                  alt="Friends and family gathered around a Tuscan table"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.4)] to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display italic text-xl text-white">
                    "In Italy, memories are made around a table or over an aperitivo with friends and family."
                  </p>
                  <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.75_0.08_38)] mt-2">
                    — Borgo San Vincenzo
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section className="py-16 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Calendar, value: "May 24–29", label: "2027" },
                { icon: MapPin, value: "Montepulciano", label: "Tuscany, Italy" },
                { icon: Users, value: "5 Nights", label: "6 Days Together" },
                { icon: Wine, value: "21 Rooms", label: "Boutique Hotel" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.55_0.12_38/0.1)] flex items-center justify-center">
                    <Icon size={18} className="text-[oklch(0.55_0.12_38)]" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-[oklch(0.18_0.01_65)]">{value}</p>
                    <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHERE & WHY ── */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="relative rounded-sm overflow-hidden shadow-2xl">
                <img
                  src={PROPERTY_IMG}
                  alt="Borgo San Vincenzo property"
                  className="w-full h-[480px] object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2">
              <p className="section-label mb-4">The Place</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] leading-tight mb-6">
                Borgo San Vincenzo,<br />
                <em className="italic text-[oklch(0.55_0.12_38)]">Montepulciano</em>
              </h2>
              <div className="w-16 h-px bg-[oklch(0.55_0.12_38)] mb-6" />
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Situated along the <em>Strada del Vino Nobile</em> in the vineyards of Montepulciano, Borgo San Vincenzo is a reimagined 18th-century estate turned 21-room boutique hotel. Originally built in 1780, it was completely renovated and reopened in 2022.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Named for St. Vincent, the patron saint of winemaking, BSV sits in the heart of Southern Tuscany — surrounded by UNESCO-protected landscapes, world-class wine, and medieval hilltop towns that have changed little in centuries.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-6">
                May is the finest time to visit: the vineyards are lush and green, wildflowers carpet the hillsides, the weather is warm but not yet the heat of summer, and the region has not yet filled with the crowds of July and August.
              </p>
              <Link href="/venue">
                <button className="inline-flex items-center gap-2 border border-[oklch(0.55_0.12_38)] text-[oklch(0.55_0.12_38)] hover:bg-[oklch(0.55_0.12_38)] hover:text-white font-cinzel text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200">
                  Explore the Venue <ArrowRight size={14} />
                </button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── WHY TUSCANY IN MAY ── */}
      <section
        className="relative py-24 md:py-36 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${TUSCANY_MAY_IMG})` }}
      >
        <div className="absolute inset-0 bg-[oklch(0.18_0.01_65/0.65)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.75_0.08_38)] mb-4">Why Tuscany in May</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-8">
              The Perfect Season<br />
              <em className="italic text-[oklch(0.75_0.08_38)]">for a Celebration</em>
            </h2>
            <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              In late May, Tuscany is at its most beautiful. The hills are a deep, saturated green. Poppies and wildflowers bloom across the Val d'Orcia. The days are long and warm — perfect for pool afternoons, vineyard walks, and long dinners under the stars. It is the Tuscany of postcards, experienced in person.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { title: "15–22°C / 59–72°F", desc: "Warm, sunny days with gentle evenings — ideal for outdoor dining and exploring." },
                { title: "Fewer Crowds", desc: "Before the summer rush, you'll have the hilltop towns and wineries largely to yourselves." },
                { title: "Vineyards in Bloom", desc: "The Vino Nobile vines are lush and green, the olive trees silver in the breeze." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-sm">
                  <p className="font-display text-lg font-semibold text-[oklch(0.75_0.08_38)] mb-2">{title}</p>
                  <p className="font-body text-sm text-white/75 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── QUICK NAVIGATION ── */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="section-label mb-3">Everything You Need</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Plan Your <em className="italic text-[oklch(0.55_0.12_38)]">Tuscan Week</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map(({ href, icon: Icon, label, desc, color }, i) => (
              <AnimatedSection key={href} className={`delay-${(i + 1) * 100}`}>
                <Link href={href}>
                  <div className="group bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-6 card-lift cursor-pointer h-full">
                    <div className={`w-10 h-10 ${color} rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-display text-xl text-[oklch(0.18_0.01_65)] mb-2">{label}</h3>
                    <p className="font-body text-sm text-[oklch(0.5_0.03_65)] leading-relaxed mb-4">{desc}</p>
                    <span className="inline-flex items-center gap-1 font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] group-hover:gap-2 transition-all duration-200">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
