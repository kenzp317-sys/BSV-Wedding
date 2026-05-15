import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { MapPin, Clock, Plane, Globe } from "lucide-react";

const TUSCANY_MAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_may-hfVdjaWTo6NDWn3NP9RUbb.webp";
const MONTEPULCIANO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_sunset_a58bf291.jpeg";
const MONTEPULCIANO_STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_street_b2ae7658.jpg";
const PIENZA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_town_faa996e9.jpg";
const PIENZA_VIEW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_view_ff5a5622.jpg";
const MONTALCINO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montalcino_aerial_c92d2747.jpg";
const SIENA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/siena_piazza_01c934d1.jpg";

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

const destinations = [
  {
    name: "Montepulciano",
    distance: "2.5 km · 5 min drive",
    tag: "Right Next Door",
    tagColor: "bg-[oklch(0.55_0.12_38)]",
    imgs: [MONTEPULCIANO_IMG, MONTEPULCIANO_STREET_IMG],
    desc: "Perched atop a volcanic ridge at 605 meters, Montepulciano is one of the most beautiful hilltop towns in all of Tuscany. The historic center is a labyrinth of medieval and Renaissance palaces, churches, and enotecas carved into the tufa stone.",
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
    desc: "Called the ideal city of the Renaissance, Pienza was redesigned in the 15th century by Pope Pius II as a model Renaissance town. Today it is a perfectly preserved jewel of the Val d'Orcia, famous for its Pecorino di Pienza cheese and its stunning views.",
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
    desc: "Home to Brunello di Montalcino — widely considered one of Italy's greatest red wines — this medieval fortress town sits atop a hill surrounded by vineyards. The town is small and easily walkable, with the 14th-century Fortezza at its heart.",
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
    desc: "One of Italy's most perfectly preserved medieval cities and a UNESCO World Heritage Site. Built around the extraordinary Piazza del Campo, Siena is home to the Palio horse race, the Duomo, and some of the finest Gothic art in Italy.",
    highlights: [
      "Piazza del Campo — the fan-shaped medieval square, heart of the city",
      "Siena Duomo — a stunning Gothic-Romanesque cathedral",
      "Museo dell'Opera del Duomo — home to Duccio's Maesta",
      "Pinacoteca Nazionale — Sienese Gothic painting collection",
      "Enoteca Italiana — a national wine library in a 16th-century fortress",
      "Osteria Le Logge — one of Siena's finest restaurants",
    ],
    mustDo: "Arrive early, walk to Piazza del Campo, have a coffee on the square, and spend the morning at the Duomo.",
  },
];

const valDorciaHighlights = [
  { title: "Bagno Vignoni", desc: "A unique village built around a thermal pool in the main piazza — one of the most photographed spots in Tuscany. The hot springs have been used since Etruscan times.", distance: "12 km" },
  { title: "San Quirico d'Orcia", desc: "A quiet medieval town with a beautiful Romanesque collegiate church and the Horti Leonini gardens — perfect for a peaceful afternoon stroll.", distance: "18 km" },
  { title: "Radicofani", desc: "A dramatic hilltop fortress town with sweeping views over the Val d'Orcia and Monte Amiata. The ruined medieval tower is visible from miles around.", distance: "42 km" },
  { title: "Castiglione d'Orcia", desc: "One of the lesser-known but most charming villages of the Val d'Orcia, with a small piazza, a medieval well, and extraordinary views.", distance: "28 km" },
  { title: "Cetona", desc: "A perfectly preserved hilltop village with an archaeological museum, artisan shops, and a beloved local restaurant scene.", distance: "22 km" },
  { title: "Chianciano Terme", desc: "A spa town known for its thermal waters and wellness centers — ideal for a relaxing afternoon between sightseeing.", distance: "8 km" },
];

const airports = [
  { code: "FCO", name: "Rome Fiumicino", fullName: "Leonardo da Vinci International Airport", distance: "~175 km", driveTime: "~2 hrs", notes: "Italy's largest international airport with the most direct connections from the US and Asia. Best option for most travelers.", recommended: true },
  { code: "FLR", name: "Florence Peretola", fullName: "Amerigo Vespucci Airport", distance: "~130 km", driveTime: "~1.5 hrs", notes: "A smaller airport with fewer international connections, but closer to BSV. Good option if you can find a direct flight.", recommended: false },
  { code: "PSA", name: "Pisa Galileo Galilei", fullName: "Galileo Galilei International Airport", distance: "~160 km", driveTime: "~1.75 hrs", notes: "Good connections from northern Europe and some US cities. A pleasant drive through Tuscany to BSV.", recommended: false },
  { code: "MXP", name: "Milan Malpensa", fullName: "Malpensa International Airport", distance: "~380 km", driveTime: "~3.5 hrs", notes: "Italy's second-largest hub. Best combined with a train to Florence or Siena, then a car rental.", recommended: false },
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
    { title: "Best Flights", desc: "Most US travelers will fly into Rome Fiumicino (FCO) — it has the most direct connections from major US cities (New York, Chicago, Los Angeles, Miami, Boston). Delta, United, American, and ITA Airways all operate transatlantic routes." },
    { title: "Rent a Car", desc: "We strongly recommend renting a car at the airport. The drive from Rome FCO to BSV is about 2 hours on the A1 Autostrada — straightforward and scenic. An international driver's license is helpful but not strictly required for US citizens." },
    { title: "Arrive a Day Early", desc: "Consider arriving in Rome or Florence a day early to recover from jet lag before making the drive to BSV. Both cities are extraordinary and worth at least a night." },
    { title: "Currency & Payments", desc: "Italy uses the Euro. Credit cards are widely accepted. Inform your bank of your travel dates. ATMs are available in Montepulciano." },
    { title: "Electricity", desc: "Italy uses Type F/L plugs at 220V/50Hz. US travelers will need a plug adapter and possibly a voltage converter for older devices." },
    { title: "Time Zone", desc: "Italy in May is on CEST (UTC+2), which is 6 hours ahead of Eastern Time and 9 hours ahead of Pacific Time." },
  ],
  italy: [
    { title: "By Train", desc: "The nearest train station to BSV is Chiusi-Chianciano Terme, about 20 km away. From there, a taxi or rental car is needed. Trenitalia and Italo connect major cities." },
    { title: "By Car", desc: "Italy's A1 Autostrada runs from Milan through Florence and Rome — BSV is easily accessible from the Chianciano Terme or Chiusi exits." },
    { title: "From Rome", desc: "Take the A1 north toward Florence, exit at Chianciano Terme, then follow signs to Montepulciano. Approximately 2 hours." },
    { title: "From Florence", desc: "Take the A1 south toward Rome, exit at Valdichiana, then follow the SR327 and SR146 toward Montepulciano. Approximately 1.5 hours." },
    { title: "From Milan", desc: "Take the A1 south to the Valdichiana exit, then follow signs to Montepulciano. Approximately 3.5 hours. Consider breaking the journey in Florence." },
  ],
  taiwan: [
    { title: "Best Flights", desc: "From Taoyuan International Airport (TPE), the most common routes to Rome FCO are via connecting hubs: Dubai (Emirates), Doha (Qatar Airways), Frankfurt (Lufthansa), or Amsterdam (KLM). Total travel time is typically 14-18 hours." },
    { title: "Direct to Europe", desc: "China Airlines and EVA Air operate flights from Taipei to European hubs (Amsterdam, Frankfurt, Vienna, Paris). Connecting flights to Rome FCO are frequent and quick." },
    { title: "Visa Requirements", desc: "Taiwan passport holders can enter Italy (and the Schengen Area) visa-free for up to 90 days. Ensure your passport is valid for at least 6 months beyond your travel dates." },
    { title: "Currency Exchange", desc: "Exchange New Taiwan Dollars (NTD) to Euros before departure or at the airport. Major credit cards are accepted at BSV and most restaurants." },
    { title: "Time Zone", desc: "Italy in May (CEST) is UTC+2, which is 6 hours behind Taiwan Standard Time (UTC+8). Arriving a day early in Rome is recommended." },
    { title: "Mobile & SIM", desc: "Consider purchasing an Italian or EU SIM card at the airport for data access. International roaming plans from Taiwanese carriers are also available." },
  ],
};

export default function ExplorePage() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeTab, setActiveTab] = useState<"us" | "italy" | "taiwan">("us");

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(7);

    const airportCoords = [
      { lat: 41.8003, lng: 12.2389, label: "FCO" },
      { lat: 43.8100, lng: 11.2051, label: "FLR" },
      { lat: 43.6839, lng: 10.3927, label: "PSA" },
    ];

    airportCoords.forEach(({ lat, lng, label }) => {
      new google.maps.Marker({ position: { lat, lng }, map, label: { text: label, color: "white", fontSize: "11px", fontWeight: "bold" }, title: label });
    });

    const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(7);

    const infoWindow = new google.maps.InfoWindow();

    const airportMarkers = [
      { lat: 41.8003, lng: 12.2389, label: "FCO", name: "Rome Fiumicino Airport" },
      { lat: 43.8100, lng: 11.2051, label: "FLR", name: "Florence Peretola Airport" },
      { lat: 43.6839, lng: 10.3927, label: "PSA", name: "Pisa Galileo Galilei Airport" },
      { lat: 45.6306, lng: 8.7231, label: "MXP", name: "Milan Malpensa Airport" },
    ];

    airportMarkers.forEach(({ lat, lng, label, name }) => {
      const marker = new google.maps.Marker({ position: { lat, lng }, map, label: { text: label, color: "white", fontSize: "11px", fontWeight: "bold" }, title: name });
      marker.addListener("click", () => {
        infoWindow.setContent("<div style='font-family:sans-serif;padding:4px 6px;font-size:13px;font-weight:600'>" + name + "</div>");
        infoWindow.open(map, marker);
      });
    });

    const townMarkers = [
      { lat: 43.1060, lng: 11.7833, label: "MP", name: "Montepulciano" },
      { lat: 43.0760, lng: 11.6780, label: "PZ", name: "Pienza" },
      { lat: 43.0560, lng: 11.4890, label: "MB", name: "Montalcino" },
      { lat: 43.3186, lng: 11.3308, label: "SI", name: "Siena" },
      { lat: 42.9197, lng: 11.7886, label: "OR", name: "Orvieto" },
      { lat: 43.1122, lng: 12.3888, label: "PG", name: "Perugia" },
      { lat: 43.7696, lng: 11.2558, label: "FI", name: "Florence" },
      { lat: 41.9028, lng: 12.4964, label: "RM", name: "Rome" },
    ];

    townMarkers.forEach(({ lat, lng, label, name }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng }, map,
        label: { text: label, color: "white", fontSize: "10px", fontWeight: "bold" },
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 14, fillColor: "#2563EB", fillOpacity: 0.85, strokeColor: "#fff", strokeWeight: 2 },
        title: name,
      });
      marker.addListener("click", () => {
        infoWindow.setContent("<div style='font-family:sans-serif;padding:4px 6px;font-size:13px;font-weight:600'>" + name + "</div>");
        infoWindow.open(map, marker);
      });
    });

    const bsvMarker = new google.maps.Marker({
      position: bsvLocation, map, title: "Borgo San Vincenzo",
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 16, fillColor: "#B5541A", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2 },
    });
    bsvMarker.addListener("click", () => {
      infoWindow.setContent("<div style='font-family:sans-serif;padding:4px 6px;font-size:13px;font-weight:600'>Borgo San Vincenzo</div>");
      infoWindow.open(map, bsvMarker);
    });
  };
strokeColor: "#fff", strokeWeight: 2 },
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + TUSCANY_MAY_IMG + ")" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">Southern Tuscany</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Explore &<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">Getting Here</em>
          </h1>
        </div>
      </section>
      
<div className="bg-[oklch(0.18_0.01_65)] py-3 px-6 text-center">
        <p className="font-body text-sm text-[oklch(0.75_0.08_38)]">
          Looking for airport and travel information?{" "}
          <a href="#getting-here" className="text-white underline underline-offset-2">
            Jump to Getting Here
          </a>
        </p>
      </div>
      
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label mb-4">The Val d'Orcia & Beyond</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-6">
              One of the World's Most <em className="italic text-[oklch(0.55_0.12_38)]">Beautiful Landscapes</em>
            </h2>
            <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)]">
              Borgo San Vincenzo sits at the heart of Southern Tuscany — a UNESCO World Heritage landscape of rolling hills, medieval hilltop towns, world-class wine, and extraordinary food. Below you will find everything you need to explore the region and find your way to us.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 pb-16 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <p className="section-label mb-3">Regional Map</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)]">
                BSV & <em className="italic text-[oklch(0.55_0.12_38)]">The Region</em>
              </h2>
            </div>
            <div className="rounded-sm overflow-hidden shadow-xl border border-[oklch(0.88_0.03_75)]" style={{ height: 460 }}>
              <MapView onMapReady={handleMapReady} />
            </div>
            <p className="text-center font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)] mt-3">
              Orange dot = Borgo San Vincenzo · Red markers = Airports · Blue markers = Nearby towns
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">By Car</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Driving <em className="italic text-[oklch(0.55_0.12_38)]">Distances</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">A car is the best way to reach BSV and explore the surrounding region at your own pace.</p>
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

      <section className="py-10 pb-24 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection>
              <p className="section-label mb-4">Day Trips</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Explore the <em className="italic text-[oklch(0.55_0.12_38)]">Region</em>
              </h2>
            </AnimatedSection>
          </div>
          <div className="space-y-24">
            {destinations.map((dest, i) => (
              <AnimatedSection key={dest.name}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    {dest.imgs.length === 2 ? (
                      <div className="grid grid-cols-2 gap-3">
                        <img src={dest.imgs[0]} alt={dest.name} className="w-full h-64 object-cover rounded-sm shadow-lg" />
                        <img src={dest.imgs[1]} alt={dest.name} className="w-full h-64 object-cover rounded-sm shadow-lg mt-8" />
                      </div>
                    ) : (
                      <img src={dest.imgs[0]} alt={dest.name} className="w-full h-80 object-cover rounded-sm shadow-xl" />
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={"font-cinzel text-xs tracking-widest uppercase " + dest.tagColor + " text-white px-3 py-1 rounded-sm"}>{dest.tag}</span>
                      <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)]"><MapPin size={10} /> {dest.distance}</span>
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

      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label mb-3">Day Trip Ideas</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Val d'Orcia <em className="italic text-[oklch(0.55_0.12_38)]">Villages</em>
              </h2>
              <p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">The Val d'Orcia UNESCO landscape is dotted with smaller villages, each with its own character. Perfect for an afternoon drive.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {valDorciaHighlights.map(({ title, desc, distance }) => (
                <div key={title} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl text-[oklch(0.18_0.01_65)]">{title}</h3>
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><Clock size={10} /> {distance}</span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="getting-here" className="py-20 bg-[oklch(0.97_0.02_80)]">
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
                <div key={airport.code} className={"bg-white rounded-sm p-6 border " + (airport.recommended ? "border-[oklch(0.55_0.12_38)] shadow-lg" : "border-[oklch(0.88_0.03_75)]")}>
                  {airport.recommended && <span className="inline-block font-cinzel text-xs tracking-widest uppercase bg-[oklch(0.55_0.12_38)] text-white px-3 py-1 mb-3">Recommended</span>}
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
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><MapPin size={10} /> {airport.distance}</span>
                    <span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><Clock size={10} /> {airport.driveTime}</span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{airport.notes}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Personalized Guidance</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                Travel Tips <em className="italic text-[oklch(0.55_0.12_38)]">by Origin</em>
              </h2>
            </div>
            <div className="flex justify-center gap-0 mb-10 border border-[oklch(0.88_0.03_75)] rounded-sm overflow-hidden w-fit mx-auto">
              {[
                { key: "us", label: "From the US", icon: "🇺🇸" },
                { key: "italy", label: "From Italy", icon: "🇮🇹" },
                { key: "taiwan", label: "From Taiwan", icon: "🇹🇼" },
              ].map(({ key, label, icon }) => (
                <button key={key} onClick={() => setActiveTab(key as "us" | "italy" | "taiwan")} className={"flex items-center gap-2 px-5 py-3 font-cinzel text-xs tracking-widest uppercase transition-all duration-200 " + (activeTab === key ? "bg-[oklch(0.55_0.12_38)] text-white" : "bg-white text-[oklch(0.35_0.02_65)]")}>
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
      
      <section className="py-16 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label text-[oklch(0.55_0.12_38)] mb-4">The Destination</p>
            <h2 className="font-display text-4xl text-white mb-6">Borgo San <em className="italic text-[oklch(0.75_0.08_38)]">Vincenzo</em></h2>
            <div className="font-body text-[oklch(0.65_0.03_75)] space-y-1 mb-6">
              <p>Strada del Vino Nobile</p>
              <p>53045 Montepulciano SI, Italy</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://maps.google.com/?q=Borgo+San+Vincenzo+Montepulciano" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_38)] text-white font-cinzel text-xs tracking-widest uppercase px-6 py-3">
                <MapPin size={14} /> Open in Google Maps
              </a>
              <a href="https://borgosanvincenzo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[oklch(0.55_0.12_38)] text-[oklch(0.75_0.08_38)] font-cinzel text-xs tracking-widest uppercase px-6 py-3">
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
