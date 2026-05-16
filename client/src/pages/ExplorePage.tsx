import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { MapPin, Clock, Plane } from "lucide-react";

const TUSCANY_MAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/tuscany_may-hfVdjaWTo6NDWn3NP9RUbb.webp";
const MONTEPULCIANO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_sunset_a58bf291.jpeg";
const MONTEPULCIANO_STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montepulciano_street_b2ae7658.jpg";
const PIENZA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_town_faa996e9.jpg";
const PIENZA_VIEW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/pienza_view_ff5a5622.jpg";
const MONTALCINO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/montalcino_aerial_c92d2747.jpg";
const SIENA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/siena_piazza_01c934d1.jpg";
const WINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/brunello_wine_a58c17d1.jpg";
const FARM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/farm_lunch_fa758607.jpg";

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
    <div ref={ref} className={"transition-all duration-700 " + (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8") + " " + className}>
      {children}
    </div>
  );
}

const tabs = [
  { key: "getting-here", label: "Getting Here" },
  { key: "nearby-towns", label: "Nearby Towns" },
  { key: "vineyards", label: "Vineyards & Wine" },
  { key: "villages", label: "Val d'Orcia" },
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

const travelTips: Record<string, { title: string; desc: string }[]> = {
  us: [
    { title: "Best Flights", desc: "Most US travelers will fly into Rome Fiumicino (FCO). Delta, United, American, and ITA Airways all operate transatlantic routes." },
    { title: "Rent a Car", desc: "We strongly recommend renting a car at the airport. The drive from Rome FCO to BSV is about 2 hours on the A1 Autostrada." },
    { title: "Arrive a Day Early", desc: "Consider arriving in Rome or Florence a day early to recover from jet lag before making the drive to BSV." },
    { title: "Time Zone", desc: "Italy in May is on CEST (UTC+2), which is 6 hours ahead of Eastern Time and 9 hours ahead of Pacific Time." },
  ],
  italy: [
    { title: "By Train", desc: "The nearest train station is Chiusi-Chianciano Terme, about 20 km away. From there, a taxi or rental car is needed." },
    { title: "From Rome", desc: "Take the A1 north toward Florence, exit at Chianciano Terme, then follow signs to Montepulciano. Approximately 2 hours." },
    { title: "From Florence", desc: "Take the A1 south, exit at Valdichiana, then follow the SR327 and SR146 toward Montepulciano. Approximately 1.5 hours." },
    { title: "From Milan", desc: "Take the A1 south to the Valdichiana exit. Approximately 3.5 hours. Consider breaking the journey in Florence." },
  ],
  taiwan: [
    { title: "Best Flights", desc: "From Taoyuan (TPE), the most common routes to Rome FCO are via Dubai (Emirates), Doha (Qatar Airways), Frankfurt (Lufthansa), or Amsterdam (KLM)." },
    { title: "Visa Requirements", desc: "Taiwan passport holders can enter Italy visa-free for up to 90 days. Ensure your passport is valid for at least 6 months beyond your travel dates." },
    { title: "Time Zone", desc: "Italy in May (CEST) is UTC+2, which is 6 hours behind Taiwan Standard Time (UTC+8). Arriving a day early in Rome is recommended." },
    { title: "Mobile & SIM", desc: "Consider purchasing an Italian or EU SIM card at the airport for data access." },
  ],
};

const destinations = [
  {
    name: "Montepulciano",
    distance: "2.5 km · 5 min drive",
    tag: "Right Next Door",
    imgs: [MONTEPULCIANO_IMG, MONTEPULCIANO_STREET_IMG],
    desc: "Perched atop a volcanic ridge at 605 meters, Montepulciano is one of the most beautiful hilltop towns in all of Tuscany. The historic center is a labyrinth of medieval and Renaissance palaces, churches, and enotecas.",
    highlights: ["Piazza Grande — the main square with the Duomo and Palazzo Comunale","Via di Gracciano — the main corso lined with Renaissance palaces","Cantina Contucci — wine cellars beneath the Palazzo Comunale","Caffe Poliziano — a historic 1920s cafe with panoramic terrace views","Tempio di San Biagio — a Renaissance masterpiece just below the town"],
    mustDo: "Walk the entire length of the Corso from Porta al Prato to Piazza Grande, stopping at every enoteca along the way.",
  },
  {
    name: "Pienza",
    distance: "9 km · 15 min drive",
    tag: "UNESCO Heritage",
    imgs: [PIENZA_IMG, PIENZA_VIEW_IMG],
    desc: "Called the ideal city of the Renaissance, Pienza was redesigned in the 15th century by Pope Pius II. Today it is famous for its Pecorino di Pienza cheese and stunning Val d'Orcia views.",
    highlights: ["Piazza Pio II — the Renaissance heart of the town","Duomo di Pienza — with its unique Gothic-Renaissance interior","Palazzo Piccolomini — the Pope's summer residence","Pecorino di Pienza — buy directly from local producers","Via dell'Amore — the panoramic walkway with Val d'Orcia views"],
    mustDo: "Buy a wedge of aged Pecorino di Pienza and eat it on the terrace overlooking the Val d'Orcia.",
  },
  {
    name: "Siena",
    distance: "65 km · 1 hr drive",
    tag: "Medieval Masterpiece",
    imgs: [SIENA_IMG],
    desc: "One of Italy's most perfectly preserved medieval cities and a UNESCO World Heritage Site. Built around the extraordinary Piazza del Campo, home to the famous Palio horse race.",
    highlights: ["Piazza del Campo — the fan-shaped medieval square","Siena Duomo — a stunning Gothic-Romanesque cathedral","Museo dell'Opera del Duomo — home to Duccio's Maesta","Enoteca Italiana — a national wine library in a 16th-century fortress","Osteria Le Logge — one of Siena's finest restaurants"],
    mustDo: "Arrive early, walk to Piazza del Campo, have a coffee on the square, and spend the morning at the Duomo.",
  },
];

const vineyards = [
  { name: "Avignonesi", desc: "One of Montepulciano's most celebrated estates, known for exceptional Vino Nobile and the legendary Vin Santo. Offers guided tours and tastings in a beautiful 16th-century palazzo.", distance: "3 km" },
  { name: "Poliziano", desc: "A leading Vino Nobile producer with vineyards surrounding BSV. Their wines are consistently among the finest in the appellation. Tours and cellar tastings available.", distance: "4 km" },
  { name: "Boscarelli", desc: "A small family estate producing some of the most sought-after Vino Nobile. Intimate tastings in a traditional farmhouse setting.", distance: "5 km" },
  { name: "Poggio Antico (Montalcino)", desc: "A beautiful Brunello estate with panoramic views and exceptional wines. Well worth the 40-minute drive for serious wine lovers.", distance: "38 km" },
  { name: "Fattoria dei Barbi (Montalcino)", desc: "One of the oldest Brunello estates, offering tours of ancient cellars and a traditional osteria serving rustic Tuscan food.", distance: "40 km" },
  { name: "La Fortezza di Montalcino", desc: "A 14th-century fortress with a wine bar inside — an extraordinary setting to taste Brunello with views over the Val d'Orcia.", distance: "38 km" },
];

const villages = [
  { title: "Bagno Vignoni", desc: "A unique village built around a thermal pool in the main piazza. One of the most photographed spots in Tuscany.", distance: "12 km" },
  { title: "San Quirico d'Orcia", desc: "A quiet medieval town with a beautiful Romanesque collegiate church and the Horti Leonini gardens.", distance: "18 km" },
  { title: "Castiglione d'Orcia", desc: "One of the lesser-known but most charming villages of the Val d'Orcia, with a small piazza and extraordinary views.", distance: "28 km" },
  { title: "Cetona", desc: "A perfectly preserved hilltop village with an archaeological museum, artisan shops, and a beloved local restaurant scene.", distance: "22 km" },
  { title: "Radicofani", desc: "A dramatic hilltop fortress town with sweeping views over the Val d'Orcia and Monte Amiata.", distance: "42 km" },
  { title: "Chianciano Terme", desc: "A spa town known for its thermal waters and wellness centers — ideal for a relaxing afternoon between sightseeing.", distance: "8 km" },
];

function DrivingTable() {
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <p className="section-label mb-2">By Car</p>
        <h3 className="font-display text-3xl text-[oklch(0.18_0.01_65)]">Driving <em className="italic text-[oklch(0.55_0.12_38)]">Distances</em></h3>
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
            {drivingDistances.map(function(row, i) {
              return (
                <tr key={row.from} className={i % 2 === 0 ? "bg-white" : "bg-[oklch(0.97_0.02_80)]"}>
                  <td className="font-body text-sm text-[oklch(0.18_0.01_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.from}</td>
                  <td className="font-body text-sm text-center text-[oklch(0.35_0.02_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.distance}</td>
                  <td className="font-body text-sm text-center text-[oklch(0.35_0.02_65)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.time}</td>
                  <td className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)] p-4 border-b border-[oklch(0.88_0.03_75)]">{row.highway}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTravelTab, setActiveTravelTab] = useState<"us" | "italy" | "taiwan">("us");

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const bsvLocation = { lat: 43.1207, lng: 11.7817 };
    map.setCenter(bsvLocation);
    map.setZoom(6);
    const iw = new google.maps.InfoWindow();
    const airportMarkers = [
      { lat: 41.8003, lng: 12.2389, label: "FCO", name: "Rome Fiumicino Airport" },
      { lat: 43.8100, lng: 11.2051, label: "FLR", name: "Florence Peretola Airport" },
      { lat: 43.6839, lng: 10.3927, label: "PSA", name: "Pisa Galileo Galilei Airport" },
      { lat: 45.6306, lng: 8.7231, label: "MXP", name: "Milan Malpensa Airport" },
    ];
    airportMarkers.forEach(function(a) {
      const m = new google.maps.Marker({ position: { lat: a.lat, lng: a.lng }, map, label: { text: a.label, color: "white", fontSize: "11px", fontWeight: "bold" }, title: a.name });
      m.addListener("click", function() { iw.setContent("<b>" + a.name + "</b>"); iw.open(map, m); });
    });
    const townMarkers = [
      { lat: 43.1060, lng: 11.7833, label: "MP", name: "Montepulciano" },
      { lat: 43.0760, lng: 11.6780, label: "PZ", name: "Pienza" },
      { lat: 43.0560, lng: 11.4890, label: "MB", name: "Montalcino" },
      { lat: 43.3186, lng: 11.3308, label: "SI", name: "Siena" },
      { lat: 42.7186, lng: 12.1073, label: "OR", name: "Orvieto" },
      { lat: 43.1107, lng: 12.3908, label: "PG", name: "Perugia" },
      { lat: 43.7696, lng: 11.2558, label: "FI", name: "Florence" },
      { lat: 41.9028, lng: 12.4964, label: "RM", name: "Rome" },
    ];
    townMarkers.forEach(function(t) {
      const m = new google.maps.Marker({ position: { lat: t.lat, lng: t.lng }, map, label: { text: t.label, color: "white", fontSize: "10px", fontWeight: "bold" }, icon: { path: google.maps.SymbolPath.CIRCLE, scale: 14, fillColor: "#2563EB", fillOpacity: 0.85, strokeColor: "white", strokeWeight: 2 }, title: t.name });
      m.addListener("click", function() { iw.setContent("<b>" + t.name + "</b>"); iw.open(map, m); });
    });
    const bsv = new google.maps.Marker({ position: bsvLocation, map, title: "Borgo San Vincenzo", icon: { path: google.maps.SymbolPath.CIRCLE, scale: 16, fillColor: "#B5541A", fillOpacity: 1, strokeColor: "white", strokeWeight: 2 } });
    bsv.addListener("click", function() { iw.setContent("<b>Borgo San Vincenzo</b>"); iw.open(map, bsv); });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + TUSCANY_MAY_IMG + ")" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">Southern Tuscany</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">Explore &<br /><em className="italic text-[oklch(0.75_0.08_38)]">Getting Here</em></h1>
        </div>
      </section>
      <section className="bg-[oklch(0.93_0.03_80)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm overflow-hidden shadow-xl border border-[oklch(0.88_0.03_75)]" style={{ height: 420 }}>
            <MapView onMapReady={handleMapReady} />
          </div>
          <p className="text-center font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)] mt-3">Orange dot = Borgo San Vincenzo · Red markers = Airports · Blue markers = Nearby towns</p>
        </div>
      </section>
      <section className="py-4 bg-[oklch(0.93_0.03_80)] sticky top-16 md:top-20 z-30 border-b border-[oklch(0.88_0.03_75)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto justify-center">
            {tabs.map(function(tab, i) {
              return (
                <button key={tab.key} onClick={function() { setActiveTab(i); }} className={"flex-shrink-0 px-5 py-2.5 rounded-sm font-cinzel text-xs tracking-widest uppercase transition-all duration-200 " + (activeTab === i ? "bg-[oklch(0.55_0.12_38)] text-white shadow-md" : "bg-white text-[oklch(0.35_0.02_65)] border border-[oklch(0.88_0.03_75)]")}>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={activeTab === 0 ? "block" : "hidden"}>
            <AnimatedSection>
              <div className="text-center mb-12"><p className="section-label mb-3">Fly In</p><h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">Nearest <em className="italic text-[oklch(0.55_0.12_38)]">Airports</em></h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                {airports.map(function(airport) {
                  return (
                    <div key={airport.code} className={"bg-white rounded-sm p-6 border " + (airport.recommended ? "border-[oklch(0.55_0.12_38)] shadow-lg" : "border-[oklch(0.88_0.03_75)]")}>
                      {airport.recommended && <span className="inline-block font-cinzel text-xs tracking-widest uppercase bg-[oklch(0.55_0.12_38)] text-white px-3 py-1 mb-3">Recommended</span>}
                      <div className="flex items-start justify-between mb-3">
                        <div><div className="flex items-center gap-3"><span className="font-cinzel text-2xl font-semibold text-[oklch(0.55_0.12_38)]">{airport.code}</span><span className="font-display text-xl text-[oklch(0.18_0.01_65)]">{airport.name}</span></div><p className="font-body text-sm text-[oklch(0.5_0.02_65)] mt-0.5">{airport.fullName}</p></div>
                        <Plane size={18} className="text-[oklch(0.55_0.12_38)] flex-shrink-0 mt-1" />
                      </div>
                      <div className="flex items-center gap-4 mb-3"><span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><MapPin size={10} /> {airport.distance}</span><span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><Clock size={10} /> {airport.driveTime}</span></div>
                      <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{airport.notes}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mb-4">
                <p className="section-label mb-3 text-center">Travel Tips by Origin</p>
                <div className="flex justify-center gap-0 mb-8 border border-[oklch(0.88_0.03_75)] rounded-sm overflow-hidden w-fit mx-auto">
                  {[{key:"us",label:"From the US",icon:"🇺🇸"},{key:"italy",label:"From Italy",icon:"🇮🇹"},{key:"taiwan",label:"From Taiwan",icon:"🇹🇼"}].map(function(t) {
                    return <button key={t.key} onClick={function() { setActiveTravelTab(t.key as "us" | "italy" | "taiwan"); }} className={"flex items-center gap-2 px-5 py-3 font-cinzel text-xs tracking-widest uppercase transition-all duration-200 " + (activeTravelTab === t.key ? "bg-[oklch(0.55_0.12_38)] text-white" : "bg-white text-[oklch(0.35_0.02_65)]")}><span>{t.icon}</span> {t.label}</button>;
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {travelTips[activeTravelTab].map(function(tip) {
                    return <div key={tip.title} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-5"><h3 className="font-display text-lg text-[oklch(0.18_0.01_65)] mb-2">{tip.title}</h3><p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{tip.desc}</p></div>;
                  })}
                </div>
              </div>
              <DrivingTable />
            </AnimatedSection>
          </div>
          <div className={activeTab === 1 ? "block" : "hidden"}>
            <div className="space-y-20">
              {destinations.map(function(dest, i) {
                return (
                  <AnimatedSection key={dest.name}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                        {dest.imgs.length === 2 ? <div className="grid grid-cols-2 gap-3"><img src={dest.imgs[0]} alt={dest.name} className="w-full h-64 object-cover rounded-sm shadow-lg" /><img src={dest.imgs[1]} alt={dest.name} className="w-full h-64 object-cover rounded-sm shadow-lg mt-8" /></div> : <img src={dest.imgs[0]} alt={dest.name} className="w-full h-80 object-cover rounded-sm shadow-xl" />}
                      </div>
                      <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                        <div className="flex items-center gap-3 mb-4"><span className="font-cinzel text-xs tracking-widest uppercase bg-[oklch(0.55_0.12_38)] text-white px-3 py-1 rounded-sm">{dest.tag}</span><span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.02_65)]"><MapPin size={10} /> {dest.distance}</span></div>
                        <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] mb-4">{dest.name}</h2>
                        <div className="w-12 h-px bg-[oklch(0.55_0.12_38)] mb-5" />
                        <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)] mb-5">{dest.desc}</p>
                        <p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-3">Highlights</p>
                        <ul className="space-y-1.5 mb-5">{dest.highlights.map(function(h) { return <li key={h} className="flex items-start gap-2 font-body text-sm text-[oklch(0.35_0.02_65)]"><span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_38)] flex-shrink-0 mt-1.5" />{h}</li>; })}</ul>
                        <div className="bg-[oklch(0.93_0.03_80)] border-l-2 border-[oklch(0.55_0.12_38)] p-4 rounded-sm"><p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-1">Must Do</p><p className="font-display italic text-base text-[oklch(0.18_0.01_65)]">{dest.mustDo}</p></div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
            <DrivingTable />
          </div>
          <div className={activeTab === 2 ? "block" : "hidden"}>
            <AnimatedSection>
              <div className="text-center mb-12"><p className="section-label mb-3">Wine Country</p><h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">Vineyards & <em className="italic text-[oklch(0.55_0.12_38)]">Wineries</em></h2><p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">BSV sits in the heart of Vino Nobile country. Below are the wineries most worth visiting during your stay.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2"><img src={WINE_IMG} alt="Tuscan wine" className="w-full h-64 object-cover rounded-sm shadow-lg mb-6" /></div>
                {vineyards.map(function(v) {
                  return <div key={v.name} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-6"><div className="flex items-center justify-between mb-3"><h3 className="font-display text-xl text-[oklch(0.18_0.01_65)]">{v.name}</h3><span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><Clock size={10} /> {v.distance}</span></div><p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{v.desc}</p></div>;
                })}
              </div>
              <div className="bg-[oklch(0.93_0.03_80)] rounded-sm p-6 border border-[oklch(0.88_0.03_75)] mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <img src={FARM_IMG} alt="Farm lunch" className="w-full h-48 object-cover rounded-sm" />
                  <div><p className="font-cinzel text-xs tracking-widest uppercase text-[oklch(0.55_0.12_38)] mb-2">Local Tip</p><p className="font-display italic text-lg text-[oklch(0.18_0.01_65)] mb-3">The Strada del Vino Nobile</p><p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">BSV sits directly on the Vino Nobile wine road. Most wineries require advance booking for tastings — reach out to the BSV concierge team for help arranging visits.</p></div>
                </div>
              </div>
              <DrivingTable />
            </AnimatedSection>
          </div>
          <div className={activeTab === 3 ? "block" : "hidden"}>
            <AnimatedSection>
              <div className="text-center mb-12"><p className="section-label mb-3">Off the Beaten Path</p><h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">Val d'Orcia <em className="italic text-[oklch(0.55_0.12_38)]">Villages</em></h2><p className="font-body text-sm text-[oklch(0.45_0.02_65)] mt-3 max-w-xl mx-auto">The Val d'Orcia UNESCO landscape is dotted with smaller villages. Perfect for an afternoon drive.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
                {villages.map(function(v) {
                  return <div key={v.title} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm p-5"><div className="flex items-center justify-between mb-3"><h3 className="font-display text-xl text-[oklch(0.18_0.01_65)]">{v.title}</h3><span className="flex items-center gap-1 font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)]"><Clock size={10} /> {v.distance}</span></div><p className="font-body text-sm text-[oklch(0.45_0.02_65)] leading-relaxed">{v.desc}</p></div>;
                })}
              </div>
              <DrivingTable />
            </AnimatedSection>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
