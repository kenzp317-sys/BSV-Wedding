import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { Wifi, Wind, Tv, Coffee, ChefHat, Droplets, ExternalLink, Wine, Leaf, Bike, Camera, Sunset } from "lucide-react";

const PROPERTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_property-g24S6GHVEdweb5CxDMzbj7.webp";
const POOL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_pool_wide_e4173ab7.webp";
const WIDE_AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_pool_dbd7d0ac.jpeg";
const BAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_bar_2ab01fd3.webp";
const WINE_BAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_wine_bar_23a59247.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_sunset_89805c9b.webp";
const COUPLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_couple_terrace_d1d7acf5.webp";
const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_restaurant_night_b04b5355.webp";
const FIREPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_firepit_evening_337d6ba2.webp";
const COOKING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/cooking_class_e1dc8714.jpg";
const WINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/brunello_wine_a58c17d1.jpg";
const FARM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/farm_lunch_fa758607.jpg";
const TUSCANY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_landscape_2caae3ce.jpg";
const TERRACE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_terrace_view_0b0e5a7d.webp";

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
    <div ref={ref} className={"transition-all duration-700 " + (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8") + " " + className}>
      {children}
    </div>
  );
}

const amenities = [
  { icon: Wind, label: "Air Conditioning" },
  { icon: Tv, label: "Television" },
  { icon: Coffee, label: "Coffee Maker" },
  { icon: Wifi, label: "WiFi" },
  { icon: ChefHat, label: "Kitchenette" },
  { icon: Droplets, label: "Fridge" },
];

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

export default function VenuePage() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(14);
    new google.maps.Marker({
      position: bsvLocation,
      map,
      title: "Borgo San Vincenzo",
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: "#B5541A", fillOpacity: 1, strokeColor: "white", strokeWeight: 2 },
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + PROPERTY_IMG + ")" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.8)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">The Venue</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Borgo San<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">Vincenzo</em>
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <p className="section-label mb-4">About the Property</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] leading-tight mb-6">
                An 18th-Century<br />
                <em className="italic text-[oklch(0.55_0.12_38)]">Tuscan Outpost</em>
              </h2>
              <div className="w-16 h-px bg-[oklch(0.55_0.12_38)] mb-6" />
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Situated along the Strada del Vino Nobile in the vineyards of Montepulciano, Borgo San Vincenzo is proud to call Tuscany home. Originally built in 1780, the team strives to preserve the legacy of gracious hospitality while celebrating artisanal producers and the region's winemaking heritage.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Opened in July 2022 after a complete renovation, BSV is a classic Tuscan outpost turned 21-room boutique hotel. With a wine-driven core and unique guest-only programming, the property focuses on delivering luxurious comforts in an approachable setting.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-6">
                Named for St. Vincent, the patron saint of winemaking, BSV sits in the heart of some of Montepulciano's most prestigious Vino Nobile vineyards — a setting that is both spectacular and deeply authentic.
              </p>
              <a href="https://borgosanvincenzo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] hover:text-[oklch(0.48_0.1_38)] transition-colors">
                Visit borgosanvincenzo.com <ExternalLink size={12} />
              </a>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <img src={WIDE_AERIAL_IMG} alt="BSV property from above" className="w-full h-48 object-cover object-center rounded-sm shadow-md" />
                <img src={SUNSET_IMG} alt="BSV at sunset" className="w-full h-48 object-cover object-center rounded-sm shadow-md mt-8" />
                <img src={COUPLE_IMG} alt="BSV terrace" className="w-full h-48 object-cover object-center rounded-sm shadow-md -mt-4" />
                <img src={FIREPIT_IMG} alt="Evening firepit gathering" className="w-full h-48 object-cover object-center rounded-sm shadow-md mt-4" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pool & Grounds */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-sm overflow-hidden shadow-2xl">
                <img src={POOL_IMG} alt="BSV pool" className="w-full h-[400px] object-cover" />
              </div>
              <div>
                <p className="section-label mb-4">Grounds & Facilities</p>
                <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] leading-tight mb-6">
                  Pool, Piazza<br />
                  <em className="italic text-[oklch(0.55_0.12_38)]">& Beyond</em>
                </h2>
                <div className="w-16 h-px bg-[oklch(0.55_0.12_38)] mb-6" />
                <div className="space-y-4">
                  {[
                    { title: "Swimming Pool", desc: "A sparkling pool surrounded by sun loungers and cypress trees, with views of the Tuscan hills. The perfect place to spend a warm May afternoon." },
                    { title: "The Flying Monk Bar", desc: "BSV's bar serves pre- and post-dinner cocktails, aperitivo, and light meals. The weekly cocktail party is a highlight for guests." },
                    { title: "Restaurant & Piazza", desc: "Start your day with breakfast in the piazza, enjoy lunch at leisure, or settle into a casual dinner celebrating locally-sourced Tuscan ingredients — vegetables, farm-fresh cheeses, meats, and regional seafood." },
                    { title: "Winemaker's Dinner Series", desc: "Exclusive dinners pairing BSV's curated wine selection with exceptional Tuscan cuisine. A weekly highlight for wine lovers." },
                    { title: "Weekly Masterclass", desc: "The Montepulciano Masterclass introduces guests to the nuances of Vino Nobile and the wines of Southern Tuscany." },
                  ].map(function(item) {
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-1 flex-shrink-0 bg-[oklch(0.55_0.12_38)] rounded-full mt-1" />
                        <div>
                          <p className="font-display text-lg font-semibold text-[oklch(0.18_0.01_65)]">{item.title}</p>
                          <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Restaurant & Bar */}
      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="section-label mb-3">Dining at BSV</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Wine, Dine & <em className="italic text-[oklch(0.55_0.12_38)]">Gather</em>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: RESTAURANT_IMG, title: "The Restaurant", desc: "A fresh approach to Tuscan cuisine — locally-sourced vegetables, farm-fresh cheeses and meats, and regional seafood. Breakfast in the piazza, lunch at leisure, dinner al fresco." },
              { img: BAR_IMG, title: "The Flying Monk Bar", desc: "BSV's signature bar named with a nod to the property's history. Aperitivo hour, craft cocktails, and a curated selection of Tuscan wines by the glass." },
              { img: WINE_BAR_IMG, title: "Wine Program", desc: "An extensive by-the-glass list, weekly Winemaker's Dinners, and the Montepulciano Masterclass — all designed to deepen your appreciation of Southern Tuscany's extraordinary wines." },
            ].map(function(item) {
              return (
                <AnimatedSection key={item.title}>
                  <div className="group rounded-sm overflow-hidden shadow-md bg-white">
                    <div className="relative h-52 overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-[oklch(0.18_0.01_65)] mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Room Amenities */}
      <section className="py-12 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label text-center mb-6">All Rooms Include</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {amenities.map(function(a) {
                return (
                  <div key={a.label} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.55_0.12_38/0.1)] flex items-center justify-center">
                      <a.icon size={18} className="text-[oklch(0.55_0.12_38)]" />
                    </div>
                    <span className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.35_0.02_65)]">{a.label}</span>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Location</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Find Us in <em className="italic text-[oklch(0.55_0.12_38)]">Tuscany</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3">Strada del Vino Nobile, Montepulciano, Siena, Tuscany, Italy</p>
            </div>
            <div className="rounded-sm overflow-hidden shadow-xl border border-[oklch(0.88_0.03_75)]" style={{ height: 450 }}>
              <MapView onMapReady={handleMapReady} />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { place: "Montepulciano", dist: "~2.5 km" },
                { place: "Pienza", dist: "~9 km" },
                { place: "Montalcino", dist: "~38 km" },
                { place: "Siena", dist: "~65 km" },
              ].map(function(item) {
                return (
                  <div key={item.place} className="bg-white rounded-sm p-4 border border-[oklch(0.88_0.03_75)]">
                    <p className="font-display text-base text-[oklch(0.18_0.01_65)]">{item.place}</p>
                    <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mt-1">{item.dist}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experiences Divider */}
      <section className="py-20 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.55_0.12_38)] mb-4">At Borgo San Vincenzo</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">
              Curated <em className="italic text-[oklch(0.75_0.08_38)]">Experiences</em>
            </h2>
            <div className="w-16 h-px bg-[oklch(0.55_0.12_38)] mx-auto mb-6" />
            <p className="font-body text-base leading-relaxed text-[oklch(0.65_0.03_75)] max-w-2xl mx-auto">
              Borgo San Vincenzo was designed around the idea that the best travel experiences are those that connect you to a place — its food, its wine, its people, and its land. Every experience at BSV is curated to deepen that connection.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Experiences */}
      <section className="py-10 pb-24 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {bsvExperiences.map(function(exp, i) {
              return (
                <AnimatedSection key={exp.title}>
                  <div className={"grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"}>
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="relative rounded-sm overflow-hidden shadow-xl">
                        <img src={exp.img} alt={exp.title} className="w-full h-72 md:h-80 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.4)] to-transparent" />
                      </div>
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <div className={"w-10 h-10 " + exp.color + " rounded-sm flex items-center justify-center mb-4"}>
                        <exp.icon size={18} className="text-white" />
                      </div>
                      <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-2">{exp.subtitle}</p>
                      <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-4">{exp.title}</h3>
                      <div className="w-12 h-px bg-[oklch(0.55_0.12_38)] mb-4" />
                      <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-5">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map(function(h) {
                          return (
                            <span key={h} className="font-cinzel text-xs tracking-wider uppercase bg-[oklch(0.93_0.03_80)] text-[oklch(0.35_0.02_65)] px-3 py-1 rounded-sm border border-[oklch(0.88_0.03_75)]">{h}</span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
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
              {additionalActivities.map(function(activity) {
                return (
                  <div key={activity} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-4 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_38)] flex-shrink-0 mt-2" />
                    <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{activity}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.55_0.12_38)] mb-4">Learn More</p>
            <h2 className="font-display text-4xl text-white mb-4">
              Full Details at <em className="italic text-[oklch(0.75_0.08_38)]">BSV</em>
            </h2>
            <p className="font-body text-sm text-[oklch(0.65_0.03_75)] mb-8">
              Visit the official Borgo San Vincenzo website for the latest experience offerings, pricing, and booking.
            </p>
            <a href="https://borgosanvincenzo.com/experiences/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_38)] text-white font-cinzel text-xs tracking-widest uppercase px-8 py-4">
              View All Experiences <ExternalLink size={14} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
