/* VenuePage - Borgo San Vincenzo details
   Tuscan Terracotta & Ink design
   Sections: Hero, About BSV, Rooms, Facilities, Map */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { Wifi, Wind, Tv, Coffee, ChefHat, Droplets, ExternalLink } from "lucide-react";

const PROPERTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_property-g24S6GHVEdweb5CxDMzbj7.webp";
const POOL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_pool_wide_e4173ab7.webp";
const AERIAL_POOL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_aerial_pool_bdf42441.webp";
const WIDE_AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_pool_dbd7d0ac.jpeg";
const BAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_bar_2ab01fd3.webp";
const WINE_BAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_wine_bar_23a59247.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_sunset_89805c9b.webp";
const COUPLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_couple_terrace_d1d7acf5.webp";
const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_restaurant_night_b04b5355.webp";
const FIREPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_firepit_evening_337d6ba2.webp";

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
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const rooms = [
  {
    name: "Jeroboam Studio",
    size: "~320 sq ft (30 sqm)",
    desc: "BSV's entry-level studio with a king-sized bed, sitting area, and kitchenette. The only room type that can be configured with twin beds. All Jeroboam Studios are on the ground floor.",
    features: ["King bed (or twin option)", "Sitting area", "Kitchenette", "Ground floor", "~320 sq ft"],
    highlight: "Perfect for solo travelers or couples seeking a classic Tuscan escape.",
  },
  {
    name: "Methuselah Studio",
    size: "~390 sq ft (36 sqm)",
    desc: "Deluxe studios with more spacious arrangements, expanded living spaces, and larger bathrooms. Each is uniquely configured with a king-sized bed, sitting area, and kitchenette.",
    features: ["King bed", "Expanded living space", "Larger bathroom", "Kitchenette", "~390 sq ft"],
    highlight: "Ideal for those wanting more room to breathe.",
  },
  {
    name: "Imperial Suite",
    size: "~400 sq ft (38 sqm)",
    desc: "BSV's classic one-bedroom suite with a full separate living room. Every suite has a unique feel based on its location within the 18th-century building. Includes king bed, separate living room, and kitchenette.",
    features: ["King bed", "Separate living room", "Kitchenette", "Unique architecture", "~400 sq ft"],
    highlight: "The sweet spot of space and character.",
  },
  {
    name: "Balthazar Suite",
    size: "~420 sq ft (40 sqm) + terrace",
    desc: "BSV's most sought-after suites, with separate living rooms and private terraces overlooking the Tuscan countryside. Italian linens and Acqua dell'Elba amenities. Two units can be connected via balconies. Located on the upper floor (stairs required).",
    features: ["King bed", "Separate living room", "Private terrace", "Countryside views", "Italian linens", "Acqua dell'Elba amenities", "Upper floor"],
    highlight: "The ultimate dolce vita experience with vineyard views.",
    featured: true,
  },
  {
    name: "Nebuchadnezzar Suite",
    size: "520 sq ft (48 sqm)",
    desc: "BSV's only two-bedroom suite, with two bedrooms each featuring an en-suite bathroom, a common sitting area with kitchenette, and a covered outdoor patio. Best suited for families or two couples who prefer extra space.",
    features: ["Two bedrooms", "Two en-suite bathrooms", "Common sitting area", "Kitchenette", "Covered patio", "520 sq ft"],
    highlight: "Perfect for families or two couples traveling together.",
  },
];

const amenities = [
  { icon: Wind, label: "Air Conditioning" },
  { icon: Tv, label: "Television" },
  { icon: Coffee, label: "Coffee Maker" },
  { icon: Wifi, label: "WiFi" },
  { icon: ChefHat, label: "Kitchenette" },
  { icon: Droplets, label: "Fridge" },
];

export default function VenuePage() {
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(14);
    new google.maps.Marker({
      position: bsvLocation,
      map,
      title: "Borgo San Vincenzo",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#B5541A",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PROPERTY_IMG})` }}
        />
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
                Situated along the <em>Strada del Vino Nobile</em> in the vineyards of Montepulciano, Borgo San Vincenzo is proud to call Tuscany home. Originally built in 1780, the team strives to preserve the legacy of gracious hospitality while celebrating artisanal producers and the region's winemaking heritage.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-4">
                Opened in July 2022 after a complete renovation, BSV is a classic Tuscan outpost turned 21-room boutique hotel. With a wine-driven core and unique guest-only programming, the property focuses on delivering luxurious comforts in an approachable setting.
              </p>
              <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-6">
                Named for St. Vincent, the patron saint of winemaking, BSV sits in the heart of some of Montepulciano's most prestigious Vino Nobile vineyards — a setting that is both spectacular and deeply authentic.
              </p>
              <a
                href="https://borgosanvincenzo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] hover:text-[oklch(0.48_0.1_38)] transition-colors"
              >
                Visit borgosanvincenzo.com <ExternalLink size={12} />
              </a>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <img src={WIDE_AERIAL_IMG} alt="BSV property from above" className="w-full h-48 object-cover object-center rounded-sm shadow-md" />
                <img src={SUNSET_IMG} alt="BSV at sunset" className="w-full h-48 object-cover object-center rounded-sm shadow-md mt-8" />
                <img src={COUPLE_IMG} alt="BSV aerial with pool" className="w-full h-48 object-cover object-center rounded-sm shadow-md -mt-4" />
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
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-1 flex-shrink-0 bg-[oklch(0.55_0.12_38)] rounded-full mt-1" />
                      <div>
                        <p className="font-display text-lg font-semibold text-[oklch(0.18_0.01_65)]">{title}</p>
                        <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
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
            ].map(({ img, title, desc }) => (
              <AnimatedSection key={title}>
                <div className="group rounded-sm overflow-hidden shadow-md card-lift bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-[oklch(0.18_0.01_65)] mb-2">{title}</h3>
                    <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Room Amenities */}
      <section className="py-12 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label text-center mb-6">All Rooms Include</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {amenities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.55_0.12_38/0.1)] flex items-center justify-center">
                    <Icon size={18} className="text-[oklch(0.55_0.12_38)]" />
                  </div>
                  <span className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.35_0.02_65)]">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="section-label mb-3">Accommodations</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Rooms & <em className="italic text-[oklch(0.55_0.12_38)]">Suites</em>
              </h2>
              <p className="font-body text-base text-[oklch(0.45_0.02_65)] mt-4 max-w-2xl mx-auto">
                21 uniquely curated studios and suites, each named after oversized wine bottle formats — a nod to BSV's wine-driven soul.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {rooms.map((room) => (
              <AnimatedSection key={room.name}>
                <div className={`bg-white border rounded-sm p-6 md:p-8 ${room.featured ? "border-[oklch(0.55_0.12_38)] shadow-lg" : "border-[oklch(0.88_0.03_75)]"}`}>
                  {room.featured && (
                    <span className="inline-block font-cinzel text-xs tracking-widest uppercase bg-[oklch(0.55_0.12_38)] text-white px-3 py-1 mb-4">
                      Most Requested
                    </span>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-baseline gap-3 mb-3">
                        <h3 className="font-display text-2xl text-[oklch(0.18_0.01_65)]">{room.name}</h3>
                        <span className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]">{room.size}</span>
                      </div>
                      <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed mb-3">{room.desc}</p>
                      <p className="font-display italic text-base text-[oklch(0.55_0.12_38)]">{room.highlight}</p>
                    </div>
                    <div>
                      <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-3">Features</p>
                      <ul className="space-y-1">
                        {room.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 font-body text-sm text-[oklch(0.35_0.02_65)]">
                            <span className="w-1 h-1 rounded-full bg-[oklch(0.55_0.12_38)] flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <p className="font-body text-sm text-[oklch(0.45_0.02_65)] max-w-xl mx-auto">
              We have reserved the entire property exclusively for our group — all 21 rooms are available to our guests for the duration of the celebration.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Location</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Find Us in <em className="italic text-[oklch(0.55_0.12_38)]">Tuscany</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3">
                Strada del Vino Nobile, Montepulciano, Siena, Tuscany, Italy
              </p>
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
              ].map(({ place, dist }) => (
                <div key={place} className="bg-white rounded-sm p-4 border border-[oklch(0.88_0.03_75)]">
                  <p className="font-display text-base text-[oklch(0.18_0.01_65)]">{place}</p>
                  <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mt-1">{dist}</p>
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
