/* ExplorePage - Nearby towns, attractions, and the region
   Tuscan Terracotta & Ink design */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const MONTEPULCIANO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_sunset_a58bf291.jpeg";
const MONTEPULCIANO_STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_street_b2ae7658.jpg";
const PIENZA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_town_faa996e9.jpg";
const PIENZA_VIEW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_view_ff5a5622.jpg";
const MONTALCINO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montalcino_aerial_c92d2747.jpg";
const SIENA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/siena_piazza_01c934d1.jpg";
const TUSCANY_MAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_may-hfVdjaWTo6NDWn3NP9RUbb.webp";

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

const destinations = [
  {
    name: "Montepulciano",
    distance: "2.5 km · 5 min drive",
    tag: "Right Next Door",
    tagColor: "bg-[oklch(0.55_0.12_38)]",
    imgs: [MONTEPULCIANO_IMG, MONTEPULCIANO_STREET_IMG],
    desc: "Perched atop a volcanic ridge at 605 meters, Montepulciano is one of the most beautiful hilltop towns in all of Tuscany. The historic center — a UNESCO World Heritage candidate — is a labyrinth of medieval and Renaissance palaces, churches, and enotecas (wine shops) carved into the tufa stone.",
    highlights: [
      "Piazza Grande — the main square with the Duomo and Palazzo Comunale",
      "Via di Gracciano — the main corso lined with Renaissance palaces",
      "Cantina Contucci — wine cellars beneath the Palazzo Comunale",
      "Pulcino — a local institution for Vino Nobile tasting",
      "Caffe Poliziano — a historic 1920s café with panoramic terrace views",
      "Tempio di San Biagio — a Renaissance masterpiece just below the town",
    ],
    mustDo: "Walk the entire length of the Corso from Porta al Prato to Piazza Grande, stopping at every enoteca along the way.",
  },
  {
    name: "Pienza",
    distance: "9 km · 15 min drive",
    tag: "UNESCO Heritage",
    tagColor: "bg-[oklch(0.48_0.07_130)]",
    imgs: [PIENZA_IMG, PIENZA_VIEW_IMG],
    desc: "Called the 'ideal city of the Renaissance,' Pienza was redesigned in the 15th century by Pope Pius II as a model Renaissance town. Today it is a perfectly preserved jewel of the Val d'Orcia, famous for its Pecorino di Pienza cheese, its stunning views, and its intimate, walkable scale.",
    highlights: [
      "Piazza Pio II — the Renaissance heart of the town",
      "Duomo di Pienza — with its unique Gothic-Renaissance interior",
      "Palazzo Piccolomini — the Pope's summer residence",
      "Pecorino di Pienza — buy directly from local producers",
      "Via dell'Amore — the panoramic walkway with Val d'Orcia views",
      "Buon Gusto — beloved local gelateria",
    ],
    mustDo: "Buy a wedge of aged Pecorino di Pienza from a local shop and eat it on the terrace overlooking the Val d'Orcia.",
  },
  {
    name: "Montalcino",
    distance: "38 km · 40 min drive",
    tag: "Brunello Country",
    tagColor: "bg-[oklch(0.72_0.1_75)]",
    imgs: [MONTALCINO_IMG],
    desc: "Home to Brunello di Montalcino — widely considered one of Italy's greatest red wines — this medieval fortress town sits atop a hill surrounded by vineyards. The town itself is small and easily walkable, with the 14th-century Fortezza at its heart and dozens of enotecas offering tastings of the legendary Brunello.",
    highlights: [
      "La Fortezza di Montalcino — the 14th-century fortress with a wine bar inside",
      "Enoteca Grotta del Brunello — exceptional by-the-glass Brunello selection",
      "Poggio Antico — a beautiful estate winery with tours and tastings",
      "Fattoria dei Barbi — one of the oldest Brunello estates",
      "Sant'Antimo Abbey — a stunning Romanesque abbey in the valley below",
    ],
    mustDo: "Have a glass of Brunello at the enoteca inside the Fortezza — the views from the ramparts are extraordinary.",
  },
  {
    name: "Siena",
    distance: "65 km · 1 hr drive",
    tag: "Medieval Masterpiece",
    tagColor: "bg-[oklch(0.35_0.05_65)]",
    imgs: [SIENA_IMG],
    desc: "One of Italy's most perfectly preserved medieval cities, Siena is a UNESCO World Heritage Site and a must-visit for anyone in Southern Tuscany. The city is built around the extraordinary Piazza del Campo — one of the greatest medieval squares in Europe — and is home to the Palio horse race, the Duomo, and some of the finest Gothic art in Italy.",
    highlights: [
      "Piazza del Campo — the fan-shaped medieval square, heart of the city",
      "Siena Duomo — a stunning Gothic-Romanesque cathedral with extraordinary art",
      "Museo dell'Opera del Duomo — home to Duccio's Maestà",
      "Pinacoteca Nazionale — Sienese Gothic painting collection",
      "Enoteca Italiana — a national wine library in a 16th-century fortress",
      "Osteria Le Logge — one of Siena's finest restaurants",
    ],
    mustDo: "Arrive early, walk to Piazza del Campo, have a coffee at one of the cafes on the square, and spend the morning at the Duomo.",
  },
];

const valDorciaHighlights = [
  {
    title: "Bagno Vignoni",
    desc: "A unique village built around a thermal pool in the main piazza — one of the most photographed spots in Tuscany. The hot springs have been used since Etruscan times.",
    distance: "12 km",
  },
  {
    title: "San Quirico d'Orcia",
    desc: "A quiet medieval town with a beautiful Romanesque collegiate church and the Horti Leonini gardens — perfect for a peaceful afternoon stroll.",
    distance: "18 km",
  },
  {
    title: "Radicofani",
    desc: "A dramatic hilltop fortress town with sweeping views over the Val d'Orcia and Monte Amiata. The ruined medieval tower is visible from miles around.",
    distance: "42 km",
  },
  {
    title: "Castiglione d'Orcia",
    desc: "One of the lesser-known but most charming villages of the Val d'Orcia, with a small piazza, a medieval well, and extraordinary views.",
    distance: "28 km",
  },
  {
    title: "Cetona",
    desc: "A perfectly preserved hilltop village with an archaeological museum, artisan shops, and a beloved local restaurant scene.",
    distance: "22 km",
  },
  {
    title: "Chianciano Terme",
    desc: "A spa town known for its thermal waters and wellness centers — ideal for a relaxing afternoon between sightseeing.",
    distance: "8 km",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TUSCANY_MAY_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">Southern Tuscany</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Explore the<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">Region</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label mb-4">The Val d'Orcia & Beyond</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-6">
              One of the World's Most <em className="italic text-[oklch(0.55_0.12_38)]">Beautiful Landscapes</em>
            </h2>
            <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)]">
              Borgo San Vincenzo sits at the heart of Southern Tuscany — a UNESCO World Heritage landscape of rolling hills, medieval hilltop towns, world-class wine, and extraordinary food. Within an hour's drive, you can visit some of Italy's most celebrated destinations. Here is our guide to making the most of your time in the region.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Destinations */}
      <section className="py-10 pb-24 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {destinations.map((dest, i) => (
              <AnimatedSection key={dest.name}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start`}>
                  {/* Images */}
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    {dest.imgs.length === 2 ? (
                      <div className="grid grid-cols-2 gap-3">
                        <img src={dest.imgs[0]} alt={dest.name} className="w-full h-64 object-cover rounded-sm shadow-lg" />
                        <img src={dest.imgs[1]} alt={`${dest.name} street`} className="w-full h-64 object-cover rounded-sm shadow-lg mt-8" />
                      </div>
                    ) : (
                      <img src={dest.imgs[0]} alt={dest.name} className="w-full h-80 object-cover rounded-sm shadow-xl" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`font-cinzel text-xs tracking-widest uppercase ${dest.tagColor} text-white px-3 py-1 rounded-sm`}>
                        {dest.tag}
                      </span>
                      <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)]">
                        <MapPin size={10} /> {dest.distance}
                      </span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] mb-4">{dest.name}</h2>
                    <div className="w-12 h-px bg-[oklch(0.55_0.12_38)] mb-5" />
                    <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-5">{dest.desc}</p>

                    <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-3">Highlights</p>
                    <ul className="space-y-1.5 mb-5">
                      {dest.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 font-body text-sm text-[oklch(0.35_0.02_65)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_38)] flex-shrink-0 mt-1.5" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="bg-[oklch(0.93_0.03_80)] border-l-2 border-[oklch(0.55_0.12_38)] p-4 rounded-sm">
                      <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-1">Must Do</p>
                      <p className="font-display italic text-base text-[oklch(0.18_0.01_65)]">{dest.mustDo}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Val d'Orcia Villages */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label mb-3">Day Trip Ideas</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Val d'Orcia <em className="italic text-[oklch(0.55_0.12_38)]">Villages</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">
                The Val d'Orcia UNESCO landscape is dotted with smaller villages, each with its own character and charm. Perfect for an afternoon drive.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {valDorciaHighlights.map(({ title, desc, distance }) => (
                <div key={title} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-5 card-lift">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl text-[oklch(0.18_0.01_65)]">{title}</h3>
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]">
                      <Clock size={10} /> {distance}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Practical Tips</p>
              <h2 className="font-display text-4xl text-[oklch(0.18_0.01_65)]">
                Getting <em className="italic text-[oklch(0.55_0.12_38)]">Around</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Rent a Car",
                  desc: "The most flexible way to explore the region. Roads are generally good, though some smaller villages require navigating narrow stone streets. International driving licenses are accepted.",
                },
                {
                  title: "BSV Shuttle",
                  desc: "BSV offers a shuttle service to Montepulciano town center for guests. Ask at reception for the schedule and to book a spot.",
                },
                {
                  title: "Taxi & Private Transfers",
                  desc: "Local taxi services are available from Montepulciano. For longer trips (Siena, Florence, airports), BSV can arrange private car transfers.",
                },
                {
                  title: "E-Bikes",
                  desc: "BSV provides quality e-bikes for exploring the vineyards and reaching Montepulciano. Perfect for the fit and adventurous.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[oklch(0.93_0.03_80)] rounded-sm p-5 border border-[oklch(0.88_0.03_75)]">
                  <h3 className="font-display text-lg text-[oklch(0.18_0.01_65)] mb-2">{title}</h3>
                  <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
