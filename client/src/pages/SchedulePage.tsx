/* SchedulePage - Event schedule May 24-29, 2027
   Tuscan Terracotta & Ink design */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sun, Moon, Heart, Coffee, Clock } from "lucide-react";

const WEDDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/hero_wedding-craJfUq4qVGE2iy698tdb3.webp";
const FIREPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663509261243/TTdsT7QyySS9XYyyRtVerp/bsv_firepit_evening_337d6ba2.webp";

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

type TimeOfDay = "morning" | "afternoon" | "evening";

interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
  type: TimeOfDay;
  highlight?: boolean;
  comingSoon?: boolean;
}

interface DaySchedule {
  date: string;
  day: string;
  title: string;
  subtitle: string;
  color: string;
  events: ScheduleEvent[];
}

const schedule: DaySchedule[] = [
  {
    date: "May 24",
    day: "Monday",
    title: "Arrival Day",
    subtitle: "Welcome to Tuscany",
    color: "bg-[oklch(0.48_0.07_130)]",
    events: [
      { time: "From 2:00 PM", title: "Check-in at BSV", desc: "Arrive at your leisure. BSV's team will welcome you and help you settle into your room.", type: "afternoon" },
      { time: "Evening", title: "Welcome Dinner", desc: "Our first dinner together as a group — details to come.", type: "evening", highlight: true },
    ],
  },
  {
    date: "May 25",
    day: "Tuesday",
    title: "Explore & Discover",
    subtitle: "Montepulciano & the Vineyards",
    color: "bg-[oklch(0.55_0.12_38)]",
    events: [
      { time: "Morning", title: "Breakfast at BSV", desc: "A leisurely breakfast to start the day.", type: "morning" },
      { time: "Daytime", title: "Activities & Exploration", desc: "Details to come — expect a mix of guided experiences and free time to explore at your own pace.", type: "afternoon", comingSoon: true },
      { time: "Evening", title: "Dinner", desc: "Details to come.", type: "evening", comingSoon: true },
    ],
  },
  {
    date: "May 26",
    day: "Wednesday",
    title: "Day Trips & Discovery",
    subtitle: "Pienza, Montalcino & the Val d'Orcia",
    color: "bg-[oklch(0.72_0.1_75)]",
    events: [
      { time: "Morning", title: "Breakfast at BSV", desc: "Fuel up for a day of exploration.", type: "morning" },
      { time: "Daytime", title: "Day Trip", desc: "Details to come — we're planning a group excursion to some of the region's most beautiful towns.", type: "afternoon", comingSoon: true },
      { time: "Evening", title: "Dinner", desc: "Details to come.", type: "evening", comingSoon: true },
    ],
  },
  {
    date: "May 27",
    day: "Thursday",
    title: "Celebration Day",
    subtitle: "Our Special Evening Together",
    color: "bg-[oklch(0.55_0.12_38)]",
    events: [
      { time: "Morning & Afternoon", title: "Free Time", desc: "A relaxed day — enjoy the pool, the grounds, or a stroll through the vineyards.", type: "morning" },
      { time: "Evening", title: "Group Celebration Dinner", desc: "Our special dinner together — a long table, exceptional food and wine, toasts, laughter, and the people we love most. This is the one fixed event of the week.", type: "evening", highlight: true },
      { time: "Late", title: "Firepit & Nightcap", desc: "The evening winds down around the firepit — a nightcap, the stars, and the warmth of being together.", type: "evening" },
    ],
  },
  {
    date: "May 28",
    day: "Friday",
    title: "Slow Day in Tuscany",
    subtitle: "Rest, Explore & Savor",
    color: "bg-[oklch(0.35_0.05_65)]",
    events: [
      { time: "Morning", title: "Late Breakfast", desc: "A slow, well-deserved morning — take your time over coffee and pastries.", type: "morning" },
      { time: "Daytime", title: "Activities & Leisure", desc: "Details to come — options may include a cooking class, vineyard cycling, or simply a long afternoon by the pool.", type: "afternoon", comingSoon: true },
      { time: "Evening", title: "Farewell Dinner", desc: "Our last evening together — a final celebration of the week. Details to come.", type: "evening", highlight: true },
    ],
  },
  {
    date: "May 29",
    day: "Saturday",
    title: "Departure Day",
    subtitle: "Until We Meet Again",
    color: "bg-[oklch(0.48_0.07_130)]",
    events: [
      { time: "8:00 – 10:00 AM", title: "Final Breakfast", desc: "One last breakfast together — coffee, pastries, and goodbyes.", type: "morning" },
      { time: "By 11:00 AM", title: "Check-out", desc: "BSV's standard check-out time. Late check-out may be available on request.", type: "morning" },
      { time: "All Day", title: "Departures at Leisure", desc: "Safe travels to all — whether you're heading home or extending your Italian adventure.", type: "afternoon" },
    ],
  },
];

const timeIcons: Record<TimeOfDay, React.ElementType> = {
  morning: Sun,
  afternoon: Coffee,
  evening: Moon,
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_80)]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${WEDDING_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.01_65/0.85)] via-[oklch(0.18_0.01_65/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="section-label text-[oklch(0.75_0.08_38)] mb-3">May 24–29, 2027</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none">
            Five Days of<br />
            <em className="italic text-[oklch(0.75_0.08_38)]">Celebration</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="section-label mb-4">The Program</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[oklch(0.18_0.01_65)] mb-6">
              Five Nights, <em className="italic text-[oklch(0.55_0.12_38)]">Six Days</em>
            </h2>
            <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.02_65)]">
              The schedule below is a guide — not a rigid itinerary. Every day has organized moments for the group, and plenty of free time for you to explore, rest, or simply sit by the pool with a glass of Vino Nobile. The one truly fixed event is our group dinner on the evening of May 27th. Everything else is an invitation, and full details will be shared closer to the date.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Day Selector */}
      <section className="py-4 bg-[oklch(0.93_0.03_80)] sticky top-16 md:top-20 z-30 border-b border-[oklch(0.88_0.03_75)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {schedule.map((day, i) => (
              <button
                key={day.date}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-sm transition-all duration-200 ${
                  activeDay === i
                    ? `${day.color} text-white shadow-md`
                    : "bg-white text-[oklch(0.35_0.02_65)] hover:bg-[oklch(0.97_0.02_80)] border border-[oklch(0.88_0.03_75)]"
                }`}
              >
                <span className="font-cinzel text-xs tracking-widest uppercase">{day.day.slice(0, 3)}</span>
                <span className="font-display text-lg leading-none">{day.date.split(" ")[1]}</span>
                <span className="font-cinzel text-[0.6rem] tracking-wider uppercase opacity-75">May</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Day Detail */}
      <section className="py-16 bg-[oklch(0.97_0.02_80)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {schedule.map((day, dayIdx) => (
            <div key={day.date} className={dayIdx === activeDay ? "block" : "hidden"}>
              <AnimatedSection>
                <div className="mb-10">
                  <span className={`inline-block font-cinzel text-xs tracking-widest uppercase ${day.color} text-white px-3 py-1 mb-3`}>
                    {day.day}, {day.date}
                  </span>
                  <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)] mb-2">{day.title}</h2>
                  <p className="font-display italic text-xl text-[oklch(0.55_0.12_38)]">{day.subtitle}</p>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-[oklch(0.88_0.03_75)]" />

                  <div className="space-y-6">
                    {day.events.map((event, eventIdx) => {
                      const Icon = event.comingSoon ? Clock : timeIcons[event.type];
                      return (
                        <div key={eventIdx} className="relative flex gap-6 pl-14">
                          {/* Timeline dot */}
                          <div className={`absolute left-3 top-3 w-5 h-5 rounded-full flex items-center justify-center ${event.highlight ? day.color : "bg-[oklch(0.93_0.03_80)] border border-[oklch(0.88_0.03_75)]"}`}>
                            <Icon size={10} className={event.highlight ? "text-white" : "text-[oklch(0.55_0.12_38)]"} />
                          </div>

                          <div className={`flex-1 rounded-sm p-5 ${
                            event.highlight
                              ? "bg-white border border-[oklch(0.55_0.12_38)] shadow-md"
                              : event.comingSoon
                              ? "bg-[oklch(0.97_0.02_80)] border border-dashed border-[oklch(0.82_0.04_75)]"
                              : "bg-white border border-[oklch(0.88_0.03_75)]"
                          }`}>
                            <div className="flex items-start justify-between gap-4 mb-1">
                              <h3 className={`font-display text-xl ${event.comingSoon ? "text-[oklch(0.55_0.05_65)]" : "text-[oklch(0.18_0.01_65)]"}`}>{event.title}</h3>
                              <span className="font-cinzel text-xs tracking-wider uppercase text-[oklch(0.55_0.12_38)] flex-shrink-0">{event.time}</span>
                            </div>
                            <p className={`font-body text-sm leading-relaxed ${event.comingSoon ? "text-[oklch(0.6_0.03_65)] italic" : "text-[oklch(0.45_0.02_65)]"}`}>{event.desc}</p>
                            {event.highlight && (
                              <div className="mt-2 flex items-center gap-1">
                                <Heart size={10} className="text-[oklch(0.55_0.12_38)]" />
                                <span className="font-cinzel text-[0.6rem] tracking-widest uppercase text-[oklch(0.55_0.12_38)]">Group Event</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* All Days Overview */}
      <section className="py-20 bg-[oklch(0.93_0.03_80)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label mb-3">At a Glance</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[oklch(0.18_0.01_65)]">
                The Full <em className="italic text-[oklch(0.55_0.12_38)]">Week</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.map((day) => (
                <div key={day.date} className="bg-white border border-[oklch(0.88_0.03_75)] rounded-sm overflow-hidden">
                  <div className={`${day.color} px-4 py-3`}>
                    <p className="font-cinzel text-xs tracking-widest uppercase text-white/80">{day.day}</p>
                    <p className="font-display text-xl text-white">{day.date} · {day.title}</p>
                  </div>
                  <div className="p-4">
                    <p className="font-display italic text-sm text-[oklch(0.55_0.12_38)] mb-3">{day.subtitle}</p>
                    <ul className="space-y-1">
                      {day.events.filter(e => e.highlight).map((e) => (
                        <li key={e.title} className="flex items-center gap-2 font-body text-sm text-[oklch(0.35_0.02_65)]">
                          <Heart size={10} className="text-[oklch(0.55_0.12_38)] flex-shrink-0" />
                          {e.title}
                        </li>
                      ))}
                      {day.events.filter(e => e.highlight).length === 0 && (
                        <li className="flex items-center gap-2 font-body text-sm text-[oklch(0.6_0.03_65)] italic">
                          <Clock size={10} className="text-[oklch(0.72_0.05_75)] flex-shrink-0" />
                          Details to come
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Note */}
      <section className="py-16 bg-[oklch(0.18_0.01_65)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="relative">
              <img src={FIREPIT_IMG} alt="Evening firepit" className="w-full h-48 object-cover rounded-sm mb-8 opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display italic text-2xl sm:text-3xl text-white px-6 text-center">
                  "The best moments are the ones we didn't plan."
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-[oklch(0.65_0.03_75)] leading-relaxed">
              This schedule is a framework, not a contract. Come and go as you please, rest when you need to, explore when you want to. The one thing we ask is that you join us for our group dinner on the evening of May 27th — everything else is a bonus. Full details for each day will be shared as we get closer to the date.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
