import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Pill, Sparkles, Leaf } from "lucide-react";

import pharmaImg from "@/assets/hero-pharma.jpg";
import cosmeticsImg from "@/assets/hero-cosmetics.jpg";
import foodImg from "@/assets/hero-food.jpg";

const SLIDE_DURATION = 7000;

const slides = [
  {
    id: "pharma",
    index: 0,
    eyebrow: "Trusted Since 1959 · ISO 9001:2015",
    headlineStart: "India's Premier",
    headlineHighlight: "Pharmaceutical Excipient",
    headlineEnd: "Partner",
    subtext:
      "400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms — backed by 65+ years of deep industry expertise.",
    cta: { label: "Explore Pharma Products", href: "/products?industry=pharma" },
    secondaryCta: { label: "Our Principals", href: "/principals" },
    chips: ["400+ Active Products", "ISO 9001:2015 Certified", "CDSCO Compliant"],
    tagline: "Excipient Excellence",
    title: "Pharma",
    colorClass: "text-primary",
    bgClass: "bg-primary",
    ctaClass:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_24px_rgba(246,154,30,0.45)]",
    eyebrowClass: "bg-primary/[0.12] text-primary border-primary/30",
    chipClass: "bg-primary/[0.10] text-primary border-primary/25",
    icon: Pill,
    imageSrc: pharmaImg,
  },
  {
    id: "cosmetics",
    index: 1,
    eyebrow: "Personal Care & Dermatology",
    headlineStart: "Premium Active Ingredients",
    headlineHighlight: "for Personal Care",
    headlineEnd: "& Derma",
    subtext:
      "Innovative actives and functional ingredients from world-class global principals for skin, hair, and modern personal care formulations.",
    cta: { label: "Explore Personal Care", href: "/products?industry=cosmetics" },
    secondaryCta: { label: "Our Principals", href: "/principals" },
    chips: ["Global Principal Brands", "Application Lab Support", "Custom Sourcing"],
    tagline: "Innovative Actives",
    title: "Personal Care & Derma",
    colorClass: "text-primary",
    bgClass: "bg-primary",
    ctaClass:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_24px_rgba(246,154,30,0.45)]",
    eyebrowClass: "bg-primary/[0.12] text-primary border-primary/30",
    chipClass: "bg-primary/[0.10] text-primary border-primary/25",
    icon: Sparkles,
    imageSrc: cosmeticsImg,
  },
  {
    id: "food",
    index: 2,
    eyebrow: "Food & Nutraceuticals",
    headlineStart: "Quality Functional Ingredients",
    headlineHighlight: "for Health &",
    headlineEnd: "Wellness",
    subtext:
      "Stabilizers, sweeteners, prebiotic fibers and functional actives for nutraceutical, food, and health & wellness applications.",
    cta: { label: "Explore Food Ingredients", href: "/products?industry=food" },
    secondaryCta: { label: "Our Principals", href: "/principals" },
    chips: ["FSSAI Food-Grade Certified", "Prebiotic Fibers & Sweeteners", "Plant-based Proteins"],
    tagline: "Health & Wellness",
    title: "Food & Neutra",
    colorClass: "text-primary",
    bgClass: "bg-primary",
    ctaClass:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_24px_rgba(246,154,30,0.45)]",
    eyebrowClass: "bg-primary/[0.12] text-primary border-primary/30",
    chipClass: "bg-primary/[0.10] text-primary border-primary/25",
    icon: Leaf,
    imageSrc: foodImg,
  },
];

const STATS = [
  { value: "65+", label: "Years of Excellence" },
  { value: "400+", label: "Active Products" },
  { value: "50+", label: "Global Principals" },
  { value: "Pan-India", label: "Distribution Network" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    const startTime = performance.now();

    const animate = (now: number) => {
      const pct = Math.min(((now - startTime) / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent((c) => (c + 1) % slides.length);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current]);

  const slide = slides[current];

  return (
    <section
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #fff8ed 0%, #fef3e2 50%, #ffffff 100%)",
      }}
    >
      {/* ── Main content ─────────────────────────────── */}
      <div className="container-scope relative z-10 flex flex-1 items-center pt-32 pb-12">
        <div className="w-full grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20 items-center">

          {/* ── LEFT: Text ───────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest ${slide.eyebrowClass}`}
                >
                  {slide.eyebrow}
                </span>

                {/* Headline */}
                <h1 className="mt-5 font-display text-hero font-extrabold leading-[1.05] text-foreground">
                  {slide.headlineStart}{" "}
                  <span className={slide.colorClass}>{slide.headlineHighlight}</span>{" "}
                  {slide.headlineEnd}
                </h1>

                {/* Subtext */}
                <p className="mt-5 max-w-[50ch] font-body text-[15px] leading-relaxed text-foreground/60">
                  {slide.subtext}
                </p>

                {/* Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {slide.chips.map((chip) => (
                    <span
                      key={chip}
                      className={`rounded-full border px-3 py-1 font-body text-[11px] font-medium ${slide.chipClass}`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.cta.href}
                    className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-[13px] font-bold transition-all duration-200 hover:-translate-y-px active:scale-[0.98] ${slide.ctaClass}`}
                  >
                    {slide.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to={slide.secondaryCta.href}
                    className="inline-flex items-center gap-1 font-body text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {slide.secondaryCta.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Industry Switcher ─────────────────── */}
            <div className="mt-12 flex gap-3">
              {slides.map((s) => {
                const isActive = current === s.index;
                const SIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(s.index)}
                    className={`group relative flex flex-1 flex-col items-start gap-2 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white/80 border-primary/30 shadow-md backdrop-blur-sm"
                        : "border-primary/10 bg-white/30 hover:bg-white/60 hover:border-primary/25 backdrop-blur-sm"
                    }`}
                  >
                    {/* Animated progress bar */}
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-0 h-[3px] ${s.bgClass} rounded-full`}
                        style={{ width: `${progress}%`, transition: "none" }}
                      />
                    )}

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive ? `${s.bgClass} text-white` : "bg-primary/10 text-primary"
                      }`}
                    >
                      <SIcon className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className={`font-display text-[12px] font-bold leading-tight ${
                          isActive ? "text-foreground" : "text-foreground/60"
                        }`}
                      >
                        {s.title}
                      </p>
                      <p className="mt-0.5 font-body text-[10px] leading-snug text-foreground/40">
                        {s.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Image ─────────────────────────── */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Amber ring behind image */}
                <div
                  className="absolute -inset-4 rounded-[2.8rem]"
                  style={{
                    background: "linear-gradient(145deg, rgba(246,154,30,0.25) 0%, rgba(246,154,30,0.08) 60%, transparent 100%)",
                  }}
                />
                {/* Portrait image card */}
                <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ aspectRatio: "3/4", maxHeight: "680px" }}>
                  <img
                    src={slide.imageSrc}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Warm tint overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, rgba(246,154,30,0.08) 0%, transparent 40%)",
                    }}
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-6 rounded-2xl border border-primary/20 bg-white/90 backdrop-blur-md px-5 py-4 shadow-xl">
                  <p className="font-display text-[10px] font-bold uppercase tracking-widest text-primary/60">Since</p>
                  <p className="font-display text-3xl font-black text-foreground leading-none">1959</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Stats Strip ──────────────────────────────── */}
      <div className="relative z-10 border-t border-primary/15 bg-white/60 backdrop-blur-sm">
        <div className="container-scope">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-primary/15">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-6 text-center">
                <span className="font-display text-[1.65rem] font-black leading-none text-primary">{s.value}</span>
                <span className="font-body text-[11px] font-medium uppercase tracking-wider text-foreground/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
