/* ExperiencesPage - BSV curated experiences
   Tuscan Terracotta & Ink design */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Wine, ChefHat, Leaf, Bike, Camera, Sunset, ExternalLink } from "lucide-react";

const COOKING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/cooking_class_e1dc8714.jpg";
const WINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/brunello_wine_a58c17d1.jpg";
const FARM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/farm_lunch_fa758607.jpg";
const TUSCANY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_landscape_2caae3ce.jpg";
const TERRACE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_terrace_view_0b0e5a7d.webp";
const FIREPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_firepit_evening_337d6ba2.webp";

function useIntersectionObserver(threshold = 0.12) {
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

const bsvExperiences = [
  {
    icon: Wine,
    title: "Montepulciano Masterclass",
    subtitle: "Weekly · Included",
    img: WINE_IMG,
    desc: "BSV's signature weekly event — an intimate deep-dive into the wines of Montepulciano and Southern Tuscany. Led by BSV's wine director, this masterclass covers the Vino Nobile DOCG appellation, its history, the Prugnolo Gentile grape, and a guided tasting of six to eight exceptional wines.",
    highlights: ["Guided tasting of 6–8 wines", "Vino Nobile DOCG focus", "Led by BSV wine director", "Weekly schedule"],
    color: "bg-[oklch(0.55_0.12_38)]",
  },
  {
    icon: ChefHat,
    title: "Tuscan Cooking Class",
    subtitle: "By Arrangement",
    img: COOKING_IMG,
    desc: "Learn the art of Tuscan cooking from BSV's kitchen team. Classes focus on the fundamentals of regional cuisine — fresh pasta, ribollita, pici al ragù, and classic Sienese desserts. Classes take place in BSV's kitchen and conclude with a shared meal.",
    highlights: ["Fresh pasta making", "Regional recipes", "Shared meal included", "Small groups"],
    color: "bg-[oklch(0.48_0.07_130)]",
  },
  {
    icon: Leaf,
    title: "Truffle Hunt",
    subtitle: "Seasonal · By Arrangement",
    img: FARM_IMG,
    desc: "Join a local truffle hunter and his trained dogs for a morning in the Tuscan woods hunting for the precious black and white truffles of the region. The experience ends with a truffle-focused lunch at a nearby farm.",
    highlights: ["Local truffle hunter guide", "Trained truffle dogs", "Truffle lunch included", "Seasonal availability"],
    color: "bg-[oklch(0.72_0.1_75)]",
  },
  {
    icon: Bike,
    title: "Vineyard Cycling",
    subtitle: "Daily · Self-Guided or Guided",
    img: TUSCANY_IMG,
    desc: "Explore the Vino Nobile wine road by bicycle. BSV provides quality e-bikes and curated route maps for self-guided tours of the vineyards, or join a guided group ride with stops at two or three estate wineries for tastings.",
    highlights: ["E-bikes provided", "Self-guided or guided", "Winery stops included", "Multiple route options"],
    color: "bg-[oklch(0.35_0.05_65)]",
  },
  {
    icon: Camera,
    title: "Winemaker's Dinner",
    subtitle: "Weekly · Reservations Required",
    img: TERRACE_IMG,
    desc: "An intimate dinner series pairing exceptional Tuscan wines with a specially curated menu. Each week features a different winemaker from the region — Vino Nobile, Brunello, Morellino, or Orcia DOC — who joins guests at the table to discuss their wines.",
    highlights: ["Guest winemaker present", "Paired menu", "Intimate setting", "Weekly schedule"],
    color: "bg-[oklch(0.55_0.12_38)]",
  },
  {
    icon: Sunset,
    title: "Aperitivo & Cocktail Party",
    subtitle: "Weekly · Included",
    img: FIREPIT_IMG,
    desc: "BSV's weekly cocktail party is a beloved tradition — guests gather on the terrace at sunset for aperitivo, cocktails from The Flying Monk Bar, and light bites. It's the perfect occasion to meet fellow guests and watch the sun set over the Tuscan hills.",
    highlights: ["Sunset terrace setting", "Signature cocktails", "Light bites", "Weekly schedule"],
    color: "bg-[oklch(0.48_0.07_130)]",
  },
];

const additionalActivities = [
  "Olive oil tasting at a local frantoio",
  "Horseback riding through the Val d'Orcia",
  "Hot air balloon over the Tuscan countryside",
  "Pottery workshop in Montefollonico",
  "Guided meditation in the vineyard at sunrise",
  "Cheese-making at a local pecorino farm",
  "Guided historical walk of Montepulciano",
  "Private wine cellar tours at Avignonesi or Poliziano",
];

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${COOKING_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">At Borgo San Vincenzo</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Curated<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">Experiences</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label mb-4">The BSV Philosophy</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-6">
              More Than a Hotel — <em className="italic text-[oklch(0.55_0.12_38)]">A Way of Life</em>
            </h2>
            <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)]">
              Borgo San Vincenzo was designed around the idea that the best travel experiences are those that connect you to a place — its food, its wine, its people, and its land. Every experience at BSV is curated to deepen that connection, whether you're learning to make pasta, cycling through the vineyards, or simply sitting on the terrace with a glass of Vino Nobile as the sun goes down.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Experiences */}
      <section className="py-10 pb-24 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {bsvExperiences.map((exp, i) => (
              <AnimatedSection key={exp.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative rounded-sm overflow-hidden shadow-xl">
                      <img src={exp.img} alt={exp.title} className="w-full h-72 md:h-80 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.4)] to-transparent" />
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className={`w-10 h-10 ${exp.color} rounded-sm flex items-center justify-center mb-4`}>
                      <exp.icon size={18} className="text-white" />
                    </div>
                    <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-2">{exp.subtitle}</p>
                    <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-4">{exp.title}</h3>
                    <div className="w-12 h-px bg-[oklch(0.55_0.12_38)] mb-4" />
                    <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-5">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <span key={h} className="font-cinzel text-xs tracking-wider uppercase bg-[oklch(0.93_0.03_80)] text-[oklch(0.35_0.02_65)] px-3 py-1 rounded-sm border border-[oklch(0.88_0.03_75)]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Activities */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label mb-3">Also Available</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Beyond the <em className="italic text-[oklch(0.55_0.12_38)]">Borgo</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">
                BSV's concierge team can arrange a wide range of additional experiences throughout the region. Ask at check-in.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {additionalActivities.map((activity) => (
                <div key={activity} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-4 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_38)] flex-shrink-0 mt-2" />
                  <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{activity}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.55_0.12_38)] mb-4">Ready to Explore?</p>
            <h2 className="font-display text-4xl text-white mb-4">
              Full Experience Details at <em className="italic text-[oklch(0.75_0.08_38)]">BSV</em>
            </h2>
            <p className="font-body text-sm text-[oklch(0.65_0.03_75)] mb-8">
              Visit the official Borgo San Vincenzo website for the latest experience offerings, pricing, and booking.
            </p>
            <a
              href="https://borgosanvincenzo.com/experiences/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_38)] hover:bg-[oklch(0.48_0.1_38)] text-white font-cinzel text-xs tracking-widest uppercase px-8 py-4 transition-all duration-200"
            >
              View All Experiences <ExternalLink size={14} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
