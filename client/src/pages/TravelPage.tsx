/* TravelPage - Getting to Borgo San Vincenzo
   Tuscan Terracotta & Ink design
   Sections: Airports, driving, trains, tips for US/Italy/Taiwan visitors */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { Plane, Car, Train, Clock, MapPin, Globe } from "lucide-react";

const TUSCANY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_landscape_2caae3ce.jpg";

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

const airports = [
  {
    code: "FCO",
    name: "Rome Fiumicino",
    fullName: "Leonardo da Vinci International Airport",
    city: "Rome, Italy",
    distance: "~175 km",
    driveTime: "~2 hrs",
    notes: "Italy's largest international airport with the most direct connections from the US and Asia. Best option for most travelers. Car rental available at the airport.",
    recommended: true,
  },
  {
    code: "FLR",
    name: "Florence Peretola",
    fullName: "Amerigo Vespucci Airport",
    city: "Florence, Italy",
    distance: "~130 km",
    driveTime: "~1.5 hrs",
    notes: "A smaller airport with fewer international connections, but closer to BSV. Good option if you can find a direct flight from your origin.",
    recommended: false,
  },
  {
    code: "PSA",
    name: "Pisa Galileo Galilei",
    fullName: "Galileo Galilei International Airport",
    city: "Pisa, Italy",
    distance: "~160 km",
    driveTime: "~1.75 hrs",
    notes: "Good connections from northern Europe and some US cities. A pleasant drive through Tuscany to BSV.",
    recommended: false,
  },
  {
    code: "MXP",
    name: "Milan Malpensa",
    fullName: "Malpensa International Airport",
    city: "Milan, Italy",
    distance: "~380 km",
    driveTime: "~3.5 hrs",
    notes: "Italy's second-largest hub with many international connections. Best combined with a train to Florence or Siena, then a car rental.",
    recommended: false,
  },
];

const drivingDistances = [
  { from: "Rome (FCO Airport)", distance: "~175 km", time: "~2 hrs", highway: "A1 Autostrada" },
  { from: "Florence (FLR Airport)", distance: "~130 km", time: "~1.5 hrs", highway: "A1 then SR146" },
  { from: "Pisa (PSA Airport)", distance: "~160 km", time: "~1.75 hrs", highway: "A12 then A1" },
  { from: "Siena", distance: "~65 km", time: "~1 hr", highway: "SS2 then SR146" },
  { from: "Florence City", distance: "~120 km", time: "~1.5 hrs", highway: "A1 then SR146" },
  { from: "Rome City", distance: "~180 km", time: "~2 hrs", highway: "A1 Autostrada" },
  { from: "Perugia", distance: "~80 km", time: "~1 hr", highway: "E45 then SS146" },
  { from: "Orvieto", distance: "~90 km", time: "~1 hr", highway: "A1 then SR146" },
];

const travelTips = {
  us: [
    { title: "Best Flights", desc: "Most US travelers will fly into Rome Fiumicino (FCO) — it has the most direct connections from major US cities (New York, Chicago, Los Angeles, Miami, Boston). Delta, United, American, ITA Airways, and Alitalia all operate transatlantic routes." },
    { title: "Rent a Car", desc: "We strongly recommend renting a car at the airport. The drive from Rome FCO to BSV is about 2 hours on the A1 Autostrada — straightforward and scenic. An international driver's license is helpful but not strictly required for US citizens." },
    { title: "Arrive a Day Early", desc: "Consider arriving in Rome or Florence a day early to recover from jet lag before making the drive to BSV. Both cities are extraordinary and worth at least a night." },
    { title: "Currency & Payments", desc: "Italy uses the Euro (€). Credit cards (Visa, Mastercard) are widely accepted. Inform your bank of your travel dates. ATMs are available in Montepulciano." },
    { title: "Electricity", desc: "Italy uses Type F/L plugs at 220V/50Hz. US travelers will need a plug adapter and possibly a voltage converter for older devices." },
    { title: "Time Zone", desc: "Italy is in the Central European Time zone (CET), which is UTC+1 in winter and UTC+2 in summer (CEST). In May 2027, Italy will be on CEST (UTC+2), which is 6 hours ahead of Eastern Time and 9 hours ahead of Pacific Time." },
  ],
  italy: [
    { title: "By Train", desc: "Italy's Trenitalia and Italo high-speed rail networks connect major cities. The nearest train station to BSV is Chiusi-Chianciano Terme, about 20 km away. From there, a taxi or rental car is needed." },
    { title: "By Car", desc: "Italy's A1 Autostrada runs from Milan through Florence and Rome — BSV is easily accessible from the Chianciano Terme or Chiusi exits. The SS146 scenic road from Chiusi through the Val d'Orcia is highly recommended." },
    { title: "From Rome", desc: "Take the A1 north toward Florence, exit at Chianciano Terme, then follow signs to Montepulciano. The drive is approximately 2 hours." },
    { title: "From Florence", desc: "Take the A1 south toward Rome, exit at Valdichiana, then follow the SR327 and SR146 toward Montepulciano. Approximately 1.5 hours." },
    { title: "From Milan", desc: "Take the A1 south to the Valdichiana exit, then follow signs to Montepulciano. Approximately 3.5 hours. Consider breaking the journey in Florence." },
  ],
  taiwan: [
    { title: "Best Flights", desc: "From Taiwan (Taoyuan International Airport, TPE), the most common routes to Rome FCO are via connecting hubs: Dubai (Emirates), Doha (Qatar Airways), Frankfurt (Lufthansa), or Amsterdam (KLM). Total travel time is typically 14–18 hours." },
    { title: "Direct to Europe", desc: "China Airlines and EVA Air operate flights from Taipei to European hubs (Amsterdam, Frankfurt, Vienna, Paris). From any of these, connecting flights to Rome FCO are frequent and quick." },
    { title: "Visa Requirements", desc: "Taiwan passport holders can enter Italy (and the Schengen Area) visa-free for up to 90 days. No visa application is required. Ensure your passport is valid for at least 6 months beyond your travel dates." },
    { title: "Currency Exchange", desc: "Exchange New Taiwan Dollars (NTD) to Euros before departure or at the airport. Major credit cards are accepted at BSV and most restaurants and shops." },
    { title: "Time Zone", desc: "Italy in May (CEST) is UTC+2, which is 6 hours behind Taiwan Standard Time (UTC+8). Expect some jet lag adjustment — arriving a day early in Rome is recommended." },
    { title: "Mobile & SIM", desc: "Consider purchasing an Italian or EU SIM card at the airport for data access. Alternatively, international roaming plans from Taiwanese carriers are available." },
  ],
};

export default function TravelPage() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(7);

    const airports_coords = [
      { lat: 41.8003, lng: 12.2389, label: "FCO" },
      { lat: 43.8100, lng: 11.2051, label: "FLR" },
      { lat: 43.6839, lng: 10.3927, label: "PSA" },
    ];

    airports_coords.forEach(({ lat, lng, label }) => {
      new google.maps.Marker({
        position: { lat, lng },
        map,
        label: { text: label, color: "white", fontSize: "11px", fontWeight: "bold" },
        title: label,
      });
    });

    new google.maps.Marker({
      position: bsvLocation,
      map,
      title: "Borgo San Vincenzo",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#B5541A",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
      },
    });
  };

  const [activeTab, setActiveTab] = useState<"us" | "italy" | "taiwan">("us");

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TUSCANY_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">Logistics</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Getting<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">to Tuscany</em>
          </h1>
        </div>
      </section>

      {/* Airports */}
      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label mb-3">Fly In</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Nearest <em className="italic text-[oklch(0.55_0.12_38)]">Airports</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {airports.map((airport) => (
                <div
                  key={airport.code}
                  className={`bg-white rounded-sm p-6 border ${airport.recommended ? "border-[oklch(0.55_0.12_38)] shadow-lg" : "border-[oklch(0.88_0.03_75)]"}`}
                >
                  {airport.recommended && (
                    <span className="inline-block font-cinzel text-xs tracking-widest uppercase bg-[oklch(0.55_0.12_38)] text-white px-3 py-1 mb-3">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-2xl font-semibold text-[oklch(0.55_0.12_38)]">{airport.code}</span>
                        <span className="font-display text-xl text-[oklch(0.18_0.01_65)]">{airport.name}</span>
                      </div>
                      <p className="font-body text-sm text-[oklch(0.5_0.02_65)] mt-0.5">{airport.fullName}</p>
                    </div>
                    <Plane size={18} className="text-[oklch(0.55_0.12_38)] flex-shrink-0 mt-1" />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]">
                      <MapPin size={10} /> {airport.distance}
                    </span>
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]">
                      <Clock size={10} /> {airport.driveTime}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{airport.notes}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <p className="section-label mb-3">Regional Map</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)]">
                BSV & <em className="italic text-[oklch(0.55_0.12_38)]">Nearby Airports</em>
              </h2>
            </div>
            <div className="rounded-sm overflow-hidden shadow-xl border border-[oklch(0.88_0.03_75)]" style={{ height: 420 }}>
              <MapView onMapReady={handleMapReady} />
            </div>
            <p className="text-center font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)] mt-3">
              Red marker = Borgo San Vincenzo · Blue markers = Airports
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Driving Distances */}
      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">By Car</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Driving <em className="italic text-[oklch(0.55_0.12_38)]">Distances</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">
                A car is the best way to reach BSV and explore the surrounding region at your own pace.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[oklch(0.93_0.03_80)]">
                    <th className="text-left font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">From</th>
                    <th className="text-center font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">Distance</th>
                    <th className="text-center font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">Drive Time</th>
                    <th className="text-left font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">Route</th>
                  </tr>
                </thead>
                <tbody>
                  {drivingDistances.map((row, i) => (
                    <tr key={row.from} className={i % 2 === 0 ? "bg-white" : "bg-[oklch(0.97_0.02_80)]"}>
                      <td className="font-body text-sm text-[oklch(0.18_0.01_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.from}</td>
                      <td className="font-body text-sm text-center text-[oklch(0.35_0.02_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.distance}</td>
                      <td className="font-body text-sm text-center text-[oklch(0.35_0.02_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.time}</td>
                      <td className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.highway}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Travel Tips by Origin */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Personalized Guidance</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Travel Tips <em className="italic text-[oklch(0.55_0.12_38)]">by Origin</em>
              </h2>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center gap-0 mb-10 border border-[oklch(0.88_0.03_75)] rounded-sm overflow-hidden w-fit mx-auto">
              {[
                { key: "us", label: "From the US", icon: "🇺🇸" },
                { key: "italy", label: "From Italy", icon: "🇮🇹" },
                { key: "taiwan", label: "From Taiwan", icon: "🇹🇼" },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as "us" | "italy" | "taiwan")}
                  className={`flex items-center gap-2 px-5 py-3 font-cinzel text-xs tracking-widest uppercase transition-all duration-200 ${
                    activeTab === key
                      ? "bg-[oklch(0.55_0.12_38)] text-white"
                      : "bg-white text-[oklch(0.35_0.02_65)] hover:bg-[oklch(0.93_0.03_80)]"
                  }`}
                >
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {travelTips[activeTab].map(({ title, desc }) => (
                <div key={title} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-5">
                  <h3 className="font-display text-lg text-[oklch(0.18_0.01_65)] mb-2">{title}</h3>
                  <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BSV Address */}
      <section className="py-16 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.55_0.12_38)] mb-4">The Destination</p>
            <h2 className="font-display text-4xl text-white mb-6">
              Borgo San <em className="italic text-[oklch(0.75_0.08_38)]">Vincenzo</em>
            </h2>
            <div className="font-body text-[oklch(0.65_0.03_75)] space-y-1 mb-6">
              <p>Strada del Vino Nobile</p>
              <p>53045 Montepulciano SI, Italy</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://maps.google.com/?q=Borgo+San+Vincenzo+Montepulciano"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_38)] hover:bg-[oklch(0.48_0.1_38)] text-white font-cinzel text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
              >
                <MapPin size={14} /> Open in Google Maps
              </a>
              <a
                href="https://borgosanvincenzo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[oklch(0.55_0.12_38)] text-[oklch(0.75_0.08_38)] hover:bg-[oklch(0.55_0.12_38)] hover:text-white font-cinzel text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
              >
                <Globe size={14} /> BSV Website
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
