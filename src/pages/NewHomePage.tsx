import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, FlaskConical, Sparkles, Leaf, ClipboardList, Package, Microscope } from "lucide-react";
import { usePartners } from "@/context/PartnersContext";
import ExcipientSearch from "@/components/sections/ExcipientSearch";
import heroVideo from "@/assets/Hero Section_Homepage.mp4";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";
import appDairyAlternatives from "@/assets/applications/dairy-alternatives.jpg";
import appBakeryConfectionery from "@/assets/applications/bakery-confectionery.jpg";
import appBeverages from "@/assets/applications/beverages.jpg";
import appSnacksCereals from "@/assets/applications/snacks-cereals.jpg";
import appNutraTablets from "@/assets/applications/nutra-tablets.jpg";
import appNutraCapsules from "@/assets/applications/nutra-capsules.jpg";
import appGummies from "@/assets/applications/gummies.jpg";
import appProteinSportsNutrition from "@/assets/applications/protein-sports-nutrition.jpg";
import appPharmaTablets from "@/assets/applications/pharma-tablets.jpg";
import appPharmaCapsules from "@/assets/applications/pharma-capsules.jpg";
import appInjectableFormulations from "@/assets/applications/injectable-formulations.jpg";
import appTopicalFormulations from "@/assets/applications/topical-formulations.jpg";

// ─── Image helpers ────────────────────────────────────────────
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=88`;

const featureImg = u("1500382017468-9049fed747ef", 1200);

// ─── CSS keyframes ────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes nhShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes nhRipple{0%{transform:scale(1);opacity:.65}100%{transform:scale(2.4);opacity:0}}
  @keyframes nhFloat{0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}}
  @keyframes nhFloatSlow{0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)}}
  @keyframes nhGradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes nhSpherePulse{0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.025)}}
  @keyframes nhRingSpin1{from{transform:perspective(420px) rotateX(72deg) rotateZ(0deg)} to{transform:perspective(420px) rotateX(72deg) rotateZ(360deg)}}
  @keyframes nhRingSpin2{from{transform:perspective(420px) rotateX(54deg) rotateZ(360deg)} to{transform:perspective(420px) rotateX(54deg) rotateZ(0deg)}}
  @keyframes nhHexSpin{0%{transform:perspective(280px) rotateY(0deg) rotateZ(0deg)} 100%{transform:perspective(280px) rotateY(360deg) rotateZ(8deg)}}
  @keyframes nhDotFloat{0%,100%{transform:translateY(0) scale(1);opacity:.45} 50%{transform:translateY(-11px) scale(1.18);opacity:.75}}
  @keyframes nhScrollLine{0%{transform:scaleY(0);opacity:1} 80%{transform:scaleY(1);opacity:1} 100%{transform:scaleY(1);opacity:0}}
  @keyframes nhGlow1 {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(24px, -32px) scale(1.08); }
    66% { transform: translate(-16px, 16px) scale(0.96); }
  }
  @keyframes nhGlow2 {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    50% { transform: translate(-32px, 24px) scale(1.12); }
  }
  .nh-shimmer{background-size:200% auto;animation:nhShimmer 3s linear infinite}
  .nh-ripple{animation:nhRipple 1.8s ease-out infinite}
  .nh-ripple2{animation:nhRipple 1.8s ease-out .6s infinite}
  .nh-float{animation:nhFloat 4s ease-in-out infinite}
  .nh-float-slow{animation:nhFloatSlow 7s ease-in-out infinite}
  .nh-grad{background-size:200% 200%;animation:nhGradShift 6s ease infinite}
  .nh-sphere-pulse{animation:nhSpherePulse 5.5s ease-in-out infinite}
  .nh-ring1{animation:nhRingSpin1 9s linear infinite}
  .nh-ring2{animation:nhRingSpin2 13s linear infinite}
  .nh-hex-spin{animation:nhHexSpin 22s linear infinite}
  .nh-dot-float{animation:nhDotFloat 4.5s ease-in-out infinite}
  .nh-scroll-line{transform-origin:top;animation:nhScrollLine 1.6s ease-in-out infinite}
  .nh-glow-1 { animation: nhGlow1 14s ease-in-out infinite; }
  .nh-glow-2 { animation: nhGlow2 18s ease-in-out infinite; }
`;

// ─── 3-D Tilt hook ───────────────────────────────────────────
function useTilt(strength = 7) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(12px)`;
    el.style.transition = "transform 0.1s ease-out";
  }, [strength]);
  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.transition = "transform 0.55s cubic-bezier(0.03,0.98,0.52,0.99)";
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip tilt on touch devices — 3D transforms cause iOS Safari to composite
    // the image in a separate layer, making it appear to pan during page scroll.
    if (window.matchMedia("(hover: none)").matches) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);
  return ref;
}


// ─── Shared variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ─── Tag ─────────────────────────────────────────────────────
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 font-display text-[17px] font-bold uppercase tracking-[0.25em]"
    style={{ color: "#F7A100" }}>
    <span className="h-px w-6 bg-[#F7A100] inline-block" />{children}
  </span>
);

// ─── Custom glow cursor ───────────────────────────────────────
const GlowCursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        width: 20, height: 20,
        background: "radial-gradient(circle, rgba(247,161,0,0.55) 0%, rgba(247,161,0,0.12) 55%, transparent 70%)",
        filter: "blur(3px)",
        mixBlendMode: "multiply",
        willChange: "transform",
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
const HEADLINE = [
  { text: "India's Premier", color: "#000000" },
  { text: "Ingredient", color: "#000000" },
  { text: "Partner.", color: "#F7A100" },
];

const ease1: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ease2: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex items-center"
      style={{ height: "100svh" }}
    >
      {/* ── Background video ── */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* ── Dark scrim for text legibility — left-weighted on desktop, full on mobile ── */}
      <div
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background: "linear-gradient(100deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0.2) 56%, rgba(0,0,0,0) 74%)",
        }}
      />
      <div className="absolute inset-0 z-[1] lg:hidden" style={{ background: "rgba(0,0,0,0.5)" }} />

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">

          {/* Text column — full width on mobile, left 54% on desktop */}
          <div className="lg:max-w-[54%]">

            {/* Eyebrow — glassmorphic pill on dark video */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}
              className="flex justify-start">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(247,161,0,0.4)] bg-[rgba(0,0,0,0.35)] backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7A100] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F7A100]"></span>
                </span>
                <span
                  className="font-display text-[15.5px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "#F9BD4A" }}
                >
                  Est. 1959 · India's Formulation Partner
                </span>
              </div>
            </motion.div>

            {/* Headline — line-wipe */}
            <div className="mt-5 sm:mt-6">
              {HEADLINE.map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "108%" }} animate={{ y: 0 }}
                    transition={{ duration: 1.05, delay: 0.18 + i * 0.18, ease: ease2 }}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2.7rem, 7.5vw, 7.2rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      color: line.color === "#F7A100" ? undefined : "#FFFFFF",
                      backgroundImage: line.color === "#F7A100" ? "linear-gradient(135deg, #F7A100 0%, #F9BD4A 100%)" : undefined,
                      WebkitBackgroundClip: line.color === "#F7A100" ? "text" : undefined,
                      WebkitTextFillColor: line.color === "#F7A100" ? "transparent" : undefined,
                      textShadow: line.color === "#F7A100" ? undefined : "0 2px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Amber divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: ease1 }}
              style={{ height: 2, width: 64, background: "linear-gradient(90deg, #F7A100, rgba(247,161,0,0.15))", borderRadius: 2, marginTop: "1.5rem", transformOrigin: "left" }} />

            {/* Body */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.88, ease: ease1 }}
              className="font-body leading-relaxed mt-5"
              style={{ fontSize: "clamp(20px, 1.4vw, 22px)", color: "rgba(255,255,255,0.9)", maxWidth: "46ch", textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
              From the excipient in every tablet to the active behind every skincare glow
              and the fibre in your morning supplement — Scope has been the silent partner
              in India's finest formulations for over 65 years.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.02, ease: ease1 }}
              className="mt-7 flex flex-row flex-wrap gap-3">
              <Link to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full font-display text-[19px] font-bold text-[#000000] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(247,161,0,0.46)] active:scale-[0.97]"
                style={{ padding: "13px 24px", background: "linear-gradient(135deg,#F7A100,#F9BD4A 55%,#F7A100)", backgroundSize: "200% 200%" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundPosition = "100% 0")}
                onMouseLeave={e => (e.currentTarget.style.backgroundPosition = "0% 0")}>
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/principals"
                className="group inline-flex items-center justify-center gap-2 rounded-full font-display text-[19px] font-semibold text-white border border-white/55 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                style={{ padding: "13px 24px" }}>
                Our Partners
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// TICKER
// ═══════════════════════════════════════════════════════════════
const TICKER = ["Since 1959", "·", "Pharmaceutical", "·", "Personal Care", "·", "Food & Nutra", "·",
  "50+ Global Partners", "·", "400+ Products", "·", "Pan-India Network", "·", "Three Industries One Partner"];

const Ticker = () => (
  <div className="overflow-hidden py-4 flex items-center" style={{ background: "#F7A100" }}>
    <div className="animate-marquee-left flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
      {[...TICKER, ...TICKER].map((w, i) => (
        <span key={i}
          className="font-display text-sm font-bold uppercase tracking-wider shrink-0"
          style={{ color: w === "·" ? "rgba(0,0,0,.3)" : "#000000" }}>
          {w}
        </span>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// INDUSTRIES — tall poster cards with 3D tilt
// ═══════════════════════════════════════════════════════════════
const INDUSTRIES = [
  {
    id: "pharma", Icon: FlaskConical, label: "Pharmaceutical",
    headline: "Powering India's Medicines",
    desc: "The science that makes every tablet dissolve at exactly the right moment, every capsule hold its potency, every syrup pour perfectly smooth — that starts with us.",
    href: "/products?industry=pharma", img: industryPharma, accent: "#F7A100",
  },
  {
    id: "cosmetics", Icon: Sparkles, label: "Personal Care",
    headline: "Behind Every Glow",
    desc: "The radiant skin, the luxurious lather, the colour that stays — behind every beauty moment is a world-class active ingredient. We bring those ingredients to India.",
    href: "/products?industry=cosmetics", img: industryCosmetics, accent: "#F9BD4A",
  },
  {
    id: "food", Icon: Leaf, label: "Food & Nutraceuticals",
    headline: "Nourishing Every Body",
    desc: "From the prebiotic fibre in your morning smoothie to the plant protein in your health bar — functional food ingredients that make wellness delicious.",
    href: "/products?industry=food", img: industryFood, accent: "#BA821A",
  },
];

const IndustryCard = ({ ind, i }: { ind: typeof INDUSTRIES[0]; i: number }) => {
  const tiltRef = useTilt(6);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{ willChange: "transform" }}
    >
      <Link to={ind.href}>
        <div ref={tiltRef}
          className="relative overflow-hidden rounded-3xl cursor-pointer"
          style={{ height: "clamp(324px, 52vh, 584px)", boxShadow: "0 24px 80px rgba(0,0,0,.14)" }}>
          <img src={ind.img} alt={ind.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {/* Gradient only at the bottom for label readability */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.15) 35%, transparent 60%)" }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at center bottom, ${ind.accent}28 0%, transparent 60%)` }} />
          {/* Industry name — bottom left */}
          <div className="absolute bottom-6 left-7">
            <span className="font-display text-[1.27rem] font-bold tracking-wide" style={{ color: "#FCFDF8" }}>
              {ind.label}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ── Bento accent tile — "65+ Years" ───────────────────────────

const IndustriesSection = () => (
  <section className="py-16 lg:py-36 bg-background">
    <div className="container-scope">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="mb-12 lg:flex items-end justify-between gap-8">
        <div>
          <motion.div variants={fadeUp}><Tag>What We Supply</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold leading-tight text-surface-dark"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
            Three Verticals.<br />
            <span className="text-primary">Infinite Possibilities</span>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp}
          className="mt-4 lg:mt-0 font-body text-[21px] leading-relaxed max-w-[38ch]"
          style={{ color: "#494949" }}>
          Deep technical expertise across pharma, personal care, and food — with dedicated teams,
          application labs, and principal access for each vertical.
        </motion.p>
      </motion.div>

      {/* Mobile: horizontal swipe; md+: 3-column grid */}
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {INDUSTRIES.map((ind, i) => (
          <div key={ind.id} className="flex-shrink-0 w-[80vw] max-w-sm md:w-auto md:max-w-none snap-start">
            <IndustryCard ind={ind} i={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);



// ═══════════════════════════════════════════════════════════════
// PARTNERS MARQUEE
// ═══════════════════════════════════════════════════════════════
const PartnersSection = () => {
  const { partners } = usePartners();
  const withLogos = partners.filter(p => p.logo);
  const half = Math.ceil(withLogos.length / 2);
  const row1 = withLogos.slice(0, half);
  const row2 = withLogos.slice(half);

  const renderRow = (items: typeof partners, dir: "left" | "right") => (
    <div className="overflow-x-hidden py-2">
      <div
        className={dir === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ display: "flex", gap: "2rem", width: "max-content" }}>
        {[...items, ...items].map((p, i) => (
          <Link key={`${p.id}-${i}`} to={`/principals/${p.id}`}
            className="flex-shrink-0 flex items-center justify-center rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(247,161,0,.4)] hover:shadow-[0_8px_28px_rgba(247,161,0,.12)] p-3"
            style={{ width: 200, height: 88, borderColor: "rgba(0,0,0,.07)" }}>
            {p.logo ? (
              <img src={p.logo.startsWith("data:") ? p.logo : `/logos/${p.logo}`} alt={p.name}
                className="w-full h-full object-contain"
                style={{ mixBlendMode: "multiply" }}
                onError={e => {
                  e.currentTarget.style.display = "none";
                  const span = document.createElement("span");
                  span.className = "font-display text-[17px] font-semibold text-center px-3";
                  span.style.color = "#494949";
                  span.textContent = p.name;
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            ) : (
              <span className="font-display text-[17px] font-semibold text-center px-3"
                style={{ color: "#494949" }}>{p.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden py-16 lg:py-32" style={{ background: "#F9FAF5" /* foreground @ ~1.5% over background — subtle section tint, not a new color */ }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
        style={{ background: "linear-gradient(to right, #F9FAF5, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
        style={{ background: "linear-gradient(to left, #F9FAF5, transparent)" }} />
      <div className="container-scope mb-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="text-center">
          <motion.div variants={fadeUp}><Tag>Our Global Family</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold text-surface-dark"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)" }}>
            Backed by the World's Best
          </motion.h2>
          <motion.p variants={fadeUp}
            className="font-body text-[21px] max-w-[42ch] mx-auto mt-3"
            style={{ color: "#494949" }}>
            Exclusive Indian representation for 50+ globally renowned ingredient manufacturers —
            each chosen for quality, innovation, and reliability.
          </motion.p>
        </motion.div>
      </div>
      <div className="space-y-6">
        {renderRow(row1, "left")}
        {renderRow(row2, "right")}
      </div>
      <div className="container-scope mt-10 flex justify-center">
        <Link to="/principals"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display text-sm font-semibold transition-all duration-200 hover:border-[#F7A100] hover:text-[#F7A100]"
          style={{ color: "#494949", border: "1.5px solid rgba(0,0,0,.15)" }}>
          View All 50+ Partners
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};


// ═══════════════════════════════════════════════════════════════
// GALLERY — two-row auto-scrolling marquee
// ═══════════════════════════════════════════════════════════════
const GALLERY_ROW1 = [
  { src: appDairyAlternatives, caption: "Dairy & Dairy Alternatives" },
  { src: appNutraTablets, caption: "Nutraceutical Tablets" },
  { src: appPharmaTablets, caption: "Pharma Tablets" },
  { src: appBakeryConfectionery, caption: "Bakery & Confectionery" },
  { src: appNutraCapsules, caption: "Softgel Capsules" },
  { src: appInjectableFormulations, caption: "Injectable Formulations" },
];
const GALLERY_ROW2 = [
  { src: appBeverages, caption: "Functional Beverages" },
  { src: appGummies, caption: "Gummies" },
  { src: appPharmaCapsules, caption: "Pharma Capsules" },
  { src: appSnacksCereals, caption: "Snacks & Cereals" },
  { src: appProteinSportsNutrition, caption: "Protein & Sports Nutrition" },
  { src: appTopicalFormulations, caption: "Topical Formulations" },
];

const GalleryCard = ({ src, caption }: { src: string; caption: string }) => (
  <div
    className="group relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer"
    style={{ width: 280, height: 340, boxShadow: "0 8px 28px rgba(0,0,0,.10)" }}>
    <img src={src} alt={caption}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: "linear-gradient(to top, rgba(247,161,0,.28) 0%, transparent 60%)" }} />
    <div className="absolute bottom-4 left-4">
      <span className="font-display text-[17px] font-bold uppercase tracking-widest"
        style={{ color: "rgba(252,253,248,.75)" }}>{caption}</span>
    </div>
  </div>
);

const GallerySection = () => (
  <section className="py-16 lg:py-32 bg-background overflow-hidden">
    {/* Header */}
    <div className="container-scope mb-12">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="lg:flex items-end justify-between gap-8">
        <div>
          <motion.div variants={fadeUp}><Tag>Visual Journey</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold text-surface-dark"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
            Where Ingredients<br />
            <span className="text-primary">Meet Life</span>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp}
          className="font-body text-[21px] leading-relaxed max-w-[38ch]"
          style={{ color: "#494949" }}>
          Across three industries, one constant — the highest quality ingredients
          that transform what's possible.
        </motion.p>
      </motion.div>
    </div>

    {/* Single-row marquee */}
    <div className="relative">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, #FCFDF8, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, #FCFDF8, transparent)" }} />

      <div className="overflow-hidden py-1">
        <div className="animate-marquee-left flex gap-4" style={{ width: "max-content" }}>
          {[...GALLERY_ROW1, ...GALLERY_ROW2, ...GALLERY_ROW1, ...GALLERY_ROW2].map((item, i) => (
            <GalleryCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════
// FEATURE / HERITAGE SPLIT
// ═══════════════════════════════════════════════════════════════
const PILLARS = [
  "65+ years of deep excipient and active ingredient expertise",
  "Application lab support and formulation guidance for every product",
  "Direct access to principal scientists worldwide",
  "Dedicated technical sales teams for each industry vertical",
];

const FeatureSection = () => {
  const secRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={secRef} className="py-20 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FCFDF8 0%, rgba(247,161,0,0.06) 100%)" }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(247,161,0,.08) 0%,transparent 70%)", filter: "blur(80px)" }} />
      <div className="container-scope lg:pl-28 xl:pl-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-1">
            <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] aspect-[3/2] lg:aspect-[4/3]"
              style={{
                boxShadow: "0 40px 100px rgba(0,0,0,.15), 0 0 0 1px rgba(247,161,0,.12)",
              }}>
              <motion.img src={featureImg} alt="Since 1959"
                style={{ y: imgY, position: "absolute", inset: 0, width: "100%", height: "115%", objectFit: "cover" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(247,161,0,.15) 0%, transparent 50%)" }} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="nh-float hidden lg:block absolute -bottom-4 -left-4 rounded-xl px-4 py-3"
              style={{
                background: "rgba(252,253,248,.95)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(247,161,0,.2)",
                boxShadow: "0 16px 56px rgba(247,161,0,.18)",
              }}>
              <p className="font-display text-[15px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: "#F7A100" }}>Established</p>
              <p className="font-display text-3xl font-black leading-none" style={{ color: "#000000" }}>1959</p>
              <p className="font-body text-[17px] mt-1" style={{ color: "rgba(73,73,73,0.55)" }}>65+ years of excellence</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="hidden lg:block absolute -top-5 -right-4 rounded-xl px-5 py-3.5"
              style={{
                background: "linear-gradient(135deg,#F7A100,#F9BD4A)",
                boxShadow: "0 12px 40px rgba(247,161,0,.4)",
              }}>
              <p className="font-display text-2xl font-black leading-none" style={{ color: "#000000" }}>400+</p>
              <p className="font-body text-[17px] mt-0.5" style={{ color: "rgba(0,0,0,.65)" }}>Active Products</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="order-2 lg:order-2">
            <motion.div variants={fadeUp}><Tag>Our Legacy</Tag></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-4 font-display font-bold leading-tight text-surface-dark"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)" }}>
              Six Decades of<br />
              <span className="text-primary">Ingredient Excellence</span>
            </motion.h2>
            <motion.p variants={fadeUp}
              className="mt-5 font-body text-[21px] leading-relaxed max-w-[46ch]"
              style={{ color: "#494949" }}>
              Since 1959, Scope has been the bridge between the world's finest ingredient
              manufacturers and India's most ambitious product makers. We don't just distribute —
              we partner, advise, and grow together.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
              {PILLARS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[20px]" style={{ color: "#494949" }}>
                  <span className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(247,161,0,.15)", color: "#F7A100" }}>
                    <svg viewBox="0 0 10 10" className="w-3 h-3" fill="currentColor">
                      <path d="M3.5 7.5L1.5 5.5l.7-.7 1.3 1.3 3.3-3.3.7.7z" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-10">
              <Link to="/about"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display text-sm font-bold text-[#000000] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(247,161,0,.45)]"
                style={{ background: "linear-gradient(135deg,#F7A100,#F9BD4A)" }}>
                Our Full Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// REQUEST SAMPLE
// ═══════════════════════════════════════════════════════════════
const SAMPLE_STEPS = [
  {
    Icon: ClipboardList,
    step: "01",
    label: "We review your request",
    desc: "Our technical team assesses your formulation needs and confirms availability within 24 hours.",
  },
  {
    Icon: Package,
    step: "02",
    label: "Sample dispatched",
    desc: "Samples are shipped from our nearest warehouse — pharma-grade packaging, traceable delivery.",
  },
  {
    Icon: Microscope,
    step: "03",
    label: "Technical follow-up",
    desc: "A dedicated application specialist follows up with data sheets and formulation guidance.",
  },
];

const RequestSampleSection = () => (
  <section className="relative overflow-hidden py-16 lg:py-36" style={{ background: "#F8F9F4" /* foreground @ ~2.5% over background — subtle section tint, not a new color */ }}>
    {/* Subtle amber dot texture */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{ backgroundImage: "radial-gradient(#F7A100 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

    <div className="relative z-10 container-scope">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── Left: headline + CTA ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}><Tag>Try Before You Buy</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold leading-tight text-surface-dark"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
            Request an Ingredient<br />
            <span className="text-primary">Sample</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="mt-5 font-body text-[21px] leading-relaxed max-w-[44ch]"
            style={{ color: "#494949" }}>
            Evaluate any ingredient from our portfolio before committing to a bulk order.
            We ship samples to R&amp;D labs across India — typically within 48 hours.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 items-center">
            <Link to="/request-sample"
              className="group inline-flex items-center gap-2.5 rounded-full font-display text-[19px] font-bold text-[#000000] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(247,161,0,.42)] active:scale-[0.97]"
              style={{ padding: "14px 28px", background: "linear-gradient(135deg,#F7A100,#F9BD4A 55%,#F7A100)", backgroundSize: "200% 200%" }}>
              Request a Sample
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-colors"
              style={{ color: "#494949" }}>
              Browse catalogue <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp}
            className="mt-10 flex flex-wrap gap-5 pt-8"
            style={{ borderTop: "1px solid rgba(247,161,0,.18)" }}>
            {["48-hr dispatch", "No minimum quantity", "Pharma-grade packaging", "Pan-India delivery"].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 font-body text-[18px] font-medium"
                style={{ color: "#494949" }}>
                <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#F7A100" }} />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3-step process cards ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col gap-4">
          {SAMPLE_STEPS.map(({ Icon, step, label, desc }) => (
            <motion.div
              key={step}
              variants={{ hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              className="group flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(247,161,0,.10)]"
              style={{ background: "#FCFDF8", border: "1px solid rgba(247,161,0,.14)" }}>
              {/* Step number + icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                  style={{ background: "rgba(247,161,0,.12)", border: "1px solid rgba(247,161,0,.25)" }}>
                  <Icon className="h-5 w-5" style={{ color: "#F7A100" }} />
                </div>
                <span className="font-display text-[16px] font-black tracking-widest" style={{ color: "rgba(247,161,0,.45)" }}>
                  {step}
                </span>
              </div>
              {/* Text */}
              <div>
                <h3 className="font-display text-[21px] font-bold mb-1.5" style={{ color: "#000000" }}>{label}</h3>
                <p className="font-body text-[19px] leading-relaxed" style={{ color: "#494949" }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="relative overflow-hidden py-20 lg:py-44">
    <div className="nh-grad absolute inset-0"
      style={{ background: "linear-gradient(135deg,#F7A100 0%,#F9BD4A 50%,#F7A100 100%)", backgroundSize: "200% 200%" }} />
    <div className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }} />
    <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle,rgba(252,253,248,.2) 0%,transparent 70%)", filter: "blur(60px)" }} />
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        <motion.span variants={fadeUp}
          className="inline-flex items-center gap-2 font-display text-[17px] font-bold uppercase tracking-[0.25em] mb-6"
          style={{ color: "rgba(0,0,0,.55)" }}>
          <span className="h-px w-6 inline-block bg-current" />Get Started Today
        </motion.span>
        <motion.h2 variants={fadeUp}
          className="font-display font-bold leading-tight mb-5 text-surface-dark"
          style={{ fontSize: "clamp(2.8rem, 5vw, 4.4rem)" }}>
          Ready to Source<br />with Confidence?
        </motion.h2>
        <motion.p variants={fadeUp}
          className="font-body text-base leading-relaxed max-w-[44ch] mx-auto mb-10"
          style={{ color: "rgba(0,0,0,.6)" }}>
          Connect with our technical sales team for product catalogues, samples,
          and formulation guidance — we respond within 24 hours.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact"
            className="group flex items-center gap-2 px-9 py-4 rounded-full font-display text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.25)] active:scale-[0.97]"
            style={{ background: "#FCFDF8", color: "#F7A100" }}>
            Contact Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════
const NewHomePage = () => (
  <>
    <GlowCursor />
    <style>{KEYFRAMES}</style>
    <main style={{ background: "#FCFDF8" }}>
      <Hero />
      <Ticker />
      <IndustriesSection />
      <PartnersSection />
      <ExcipientSearch />
      <FeatureSection />
      <GallerySection />
      <RequestSampleSection />
      <CTASection />
    </main>
  </>
);

export default NewHomePage;
