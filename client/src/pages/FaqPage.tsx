/* FaqPage - Frequently Asked Questions
   Tuscan Terracotta & Ink design */

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, Heart, Shirt, Backpack, Zap, MessageCircle, Car, Sun } from "lucide-react";

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

interface FaqItem {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    icon: <Heart size={18} />,
    question: "What is covered by Damon & Mackenzie?",
    answer: (
      <div className="space-y-3">
        <p>We are so thrilled to be hosting you for this week in Tuscany. Here is what we are covering for all guests:</p>
        <ul className="space-y-2 ml-4">
          {[
            "Five nights accommodation at Borgo San Vincenzo (May 24–29)",
            "Daily breakfast at the property",
            "All group dinners throughout the week",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: "oklch(0.55 0.12 38)", marginTop: 2 }}>✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p style={{ color: "oklch(0.45 0.03 65)" }}>
          All other expenses — including lunches, individual day trips, wine tastings, spa treatments, and personal shopping — are at guests' own cost. We will share recommendations for everything worth exploring!
        </p>
      </div>
    ),
  },
  {
    icon: <Shirt size={18} />,
    question: "What is the dress code?",
    answer: (
      <div className="space-y-3">
        <p>Tuscany is effortlessly stylish, and we want you to feel comfortable and beautiful all week. Here's a guide:</p>
        <div className="space-y-3 ml-4">
          {[
            {
              label: "Main Celebration Dinner",
              desc: "Cocktail attire. Think elegant summer dresses, suits or blazers — this is our big night together.",
            },
            {
              label: "Group Dinners",
              desc: "Smart casual. Relaxed but put-together — linen trousers, sundresses, collared shirts.",
            },
            {
              label: "Daytime Exploring",
              desc: "Comfortable and casual. Breathable fabrics, walking shoes, and layers for the mornings and evenings.",
            },
            {
              label: "Churches & Religious Sites",
              desc: "Please pack a scarf or light cover-up for shoulders and knees when visiting churches, chapels, or other religious sites. This is required for entry at most historic sites in Italy.",
            },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-semibold" style={{ color: "oklch(0.55 0.12 38)", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</p>
              <p style={{ color: "oklch(0.35 0.02 65)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Backpack size={18} />,
    question: "What should I pack?",
    answer: (
      <div className="space-y-3">
        <p>
          Late May in Tuscany is glorious — expect warm sunny days in the low-to-mid 20s°C (70s°F), with cooler evenings that can dip to around 13–15°C (mid-50s°F). Some light rain is possible, so it's worth being prepared.
        </p>
        <p>Suggested packing list:</p>
        <ul className="space-y-2 ml-4">
          {[
            "Light, breathable clothing — linen and cotton are ideal",
            "A light jacket or cardigan for evenings and air-conditioned restaurants",
            "Comfortable walking shoes — cobblestones are beautiful but uneven",
            "A swimsuit for the Borgo San Vincenzo pool",
            "Sunscreen and sunglasses",
            "A scarf or wrap for visiting churches (see dress code above)",
            "A compact rain jacket or small umbrella just in case",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: "oklch(0.55 0.12 38)", marginTop: 2 }}>✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: <Zap size={18} />,
    question: "Do I need a power adaptor?",
    answer: (
      <div className="space-y-3">
        <p>Italy uses Type F (Schuko) and Type L plugs, operating at 230V / 50Hz.</p>
        <div className="space-y-3 ml-4">
          <div>
            <p className="font-semibold" style={{ color: "oklch(0.55 0.12 38)", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Guests travelling from the US</p>
            <p style={{ color: "oklch(0.35 0.02 65)" }}>
              You will need a Type C or Type F travel adaptor. Most modern electronics (laptops, phone chargers) are dual-voltage (100–240V) and only need an adaptor, not a converter — check the label on your device. Hair dryers and straighteners often are not dual-voltage, so a universal travel adaptor with voltage conversion is recommended, or consider buying one locally.
            </p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: "oklch(0.55 0.12 38)", fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Guests travelling from Taiwan</p>
            <p style={{ color: "oklch(0.35 0.02 65)" }}>
              Taiwan uses 110V, so you will also need a voltage converter for devices that are not dual-voltage (100–240V), in addition to a Type C or F plug adaptor.
            </p>
          </div>
        </div>
        <p style={{ color: "oklch(0.50 0.03 65)", fontSize: "0.9rem" }}>
          We recommend picking up a universal travel adaptor before you leave — they're easy to find online or at most airports.
        </p>
      </div>
    ),
  },
  {
    icon: <MessageCircle size={18} />,
    question: "Useful Italian phrases",
    answer: (
      <div className="space-y-3">
        <p>Locals in Montepulciano and the surrounding towns genuinely appreciate any effort to speak Italian. Here are a few phrases to get you started:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-4">
          {[
            { italian: "Ciao", english: "Hello / Goodbye (casual)" },
            { italian: "Buongiorno", english: "Good morning / Good day" },
            { italian: "Buonasera", english: "Good evening" },
            { italian: "Per favore", english: "Please" },
            { italian: "Grazie", english: "Thank you" },
            { italian: "Prego", english: "You're welcome" },
            { italian: "Scusi", english: "Excuse me / Sorry" },
            { italian: "Parla inglese?", english: "Do you speak English?" },
            { italian: "Dov'è il bagno?", english: "Where is the bathroom?" },
            { italian: "Il conto, per favore", english: "The bill, please" },
            { italian: "Un tavolo per due", english: "A table for two" },
            { italian: "Molto bello!", english: "Very beautiful!" },
            { italian: "Salute!", english: "Cheers!" },
          ].map((phrase, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span style={{ color: "oklch(0.55 0.12 38)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", minWidth: 160 }}>{phrase.italian}</span>
              <span style={{ color: "oklch(0.45 0.03 65)", fontSize: "0.85rem" }}>— {phrase.english}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Car size={18} />,
    question: "What is the ZTL zone in Montepulciano?",
    answer: (
      <div className="space-y-3">
        <p>
          ZTL stands for <em>Zona a Traffico Limitato</em> — a restricted traffic zone. Most historic Italian town centres, including Montepulciano, have ZTL zones where only authorised vehicles may drive. Cameras monitor entry 24 hours a day, and fines (which can reach €100 or more) are issued automatically — often arriving weeks later back home.
        </p>
        <p style={{ color: "oklch(0.35 0.02 65)" }}>
          <strong>What this means for you:</strong> If you are renting a car and driving into Montepulciano, do not drive into the historic centre unless you have confirmed ZTL authorisation from your accommodation. Borgo San Vincenzo is located outside the ZTL zone, so getting to the property is not an issue.
        </p>
        <p style={{ color: "oklch(0.35 0.02 65)" }}>
          When visiting Montepulciano, park in one of the designated car parks outside the walls (Parcheggio di Sant'Agnese is a convenient option) and walk or take the funicular up into the town. It is a beautiful walk in any case!
        </p>
      </div>
    ),
  },
  {
    icon: <Sun size={18} />,
    question: "Any tips for getting around the region?",
    answer: (
      <div className="space-y-3">
        <p>
          Tuscany is best explored by car — public transport between smaller towns is limited. If you plan to explore beyond Montepulciano, renting a car for a day or two is well worth it. The drive between hilltop towns like Pienza, Montalcino, and Cortona is spectacular.
        </p>
        <ul className="space-y-2 ml-4">
          {[
            "Book hire cars in advance — availability in smaller towns is limited in late May",
            "An International Driving Permit is recommended for US travellers driving in Italy",
            "Google Maps works well for navigation; download the offline map for Tuscany before you go",
            "Taxis are available in Montepulciano but limited — ask the property to arrange transfers where possible",
            "Many roads in the Val d'Orcia are unpaved (white roads / strade bianche) — beautiful but take it slowly",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: "oklch(0.55 0.12 38)", marginTop: 2 }}>✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection>
      <div
        className="border-b"
        style={{ borderColor: "oklch(0.88 0.03 75)" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-6 flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: open ? "oklch(0.55 0.12 38)" : "oklch(0.93 0.03 80)",
                color: open ? "white" : "oklch(0.55 0.12 38)",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
                fontWeight: 500,
                color: "oklch(0.18 0.01 65)",
              }}
            >
              {item.question}
            </span>
          </div>
          <ChevronDown
            size={18}
            className="flex-shrink-0 transition-transform duration-300"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: "oklch(0.55 0.12 38)",
            }}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? 800 : 0 }}
        >
          <div
            className="pb-6 pl-12 pr-4"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "oklch(0.35 0.02 65)",
            }}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.02 80)" }}>
      <Navigation />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "38vh", background: "oklch(0.18 0.02 65)" }}
      >
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, oklch(0.18 0.02 65) 0%, oklch(0.22 0.04 40) 100%)",
        }} />
        <div className="relative z-10 text-center px-6 py-16">
          <p
            className="uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", color: "oklch(0.55 0.12 38)" }}
          >
            Everything You Need to Know
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 300,
              color: "white",
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h1>
          <div style={{ width: 48, height: 1, background: "oklch(0.55 0.12 38)", margin: "1.5rem auto 0" }} />
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <AnimatedSection>
          <p
            className="text-center mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.15rem",
              color: "oklch(0.45 0.04 65)",
              lineHeight: 1.7,
            }}
          >
            We want your week in Tuscany to be as seamless and joyful as possible.
            If you have a question not answered here, please reach out directly.
          </p>
        </AnimatedSection>

        <div>
          {faqs.map((item, i) => (
            <FaqAccordion key={i} item={item} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <AnimatedSection>
          <div
            className="mt-16 rounded-sm p-8 text-center"
            style={{ background: "oklch(0.93 0.03 80)", border: "1px solid oklch(0.88 0.03 75)" }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.55 0.12 38)",
                marginBottom: "0.75rem",
              }}
            >
              Still have questions?
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1.2rem",
                color: "oklch(0.25 0.02 65)",
                lineHeight: 1.6,
              }}
            >
              Don't hesitate to reach out to Damon & Mackenzie directly —<br />
              we are happy to help with anything you need.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
