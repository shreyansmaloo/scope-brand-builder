import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroPharma from "@/assets/hero-pharma.jpg";
import heroCosmetics from "@/assets/hero-cosmetics.jpg";
import heroFood from "@/assets/hero-food.jpg";

const slides = [
  {
    image: heroPharma,
    eyebrow: "Trusted Since 1959 · ISO Certified",
    headline: ["India's Premier", "Excipient Solutions", "Partner"],
    subtext: "400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms.",
    cta: { label: "Explore Pharma Products", href: "/pharma" },
    ctaSecondary: { label: "Request a Sample", href: "/request-sample" },
  },
  {
    image: heroCosmetics,
    eyebrow: "Personal Care & Derma Solutions",
    headline: ["High-Performance", "Cosmetic Ingredients", "for Every Formula"],
    subtext: "Active & functional ingredients from world-class principals for modern personal care formulations.",
    cta: { label: "Explore Cosmetics", href: "/cosmetics" },
    ctaSecondary: { label: "Request a Sample", href: "/request-sample" },
  },
  {
    image: heroFood,
    eyebrow: "Food-Grade Ingredients",
    headline: ["Quality Ingredients", "for Health &", "Wellness Products"],
    subtext: "Stabilizers, sweeteners, and functional actives for nutraceutical and food applications.",
    cta: { label: "Explore Food Ingredients", href: "/food" },
    ctaSecondary: { label: "Request a Sample", href: "/request-sample" },
  },
];

/* Floating 3D-style geometric shapes */
const FloatingShapes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Large rotating hexagon */}
    <motion.div
      className="absolute -right-20 top-1/4"
      animate={{ rotate: 360, y: [0, -20, 0] }}
      transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
    >
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="opacity-[0.08]">
        <polygon points="150,10 280,80 280,220 150,290 20,220 20,80" stroke="white" strokeWidth="1.5" />
        <polygon points="150,40 250,95 250,205 150,260 50,205 50,95" stroke="white" strokeWidth="0.8" />
        <polygon points="150,70 220,110 220,190 150,230 80,190 80,110" stroke="white" strokeWidth="0.5" />
      </svg>
    </motion.div>

    {/* Floating molecular dots cluster */}
    {[
      { x: "15%", y: "20%", size: 6, delay: 0 },
      { x: "80%", y: "65%", size: 4, delay: 1.5 },
      { x: "70%", y: "25%", size: 5, delay: 0.8 },
      { x: "25%", y: "70%", size: 3, delay: 2 },
      { x: "60%", y: "80%", size: 4, delay: 1 },
      { x: "85%", y: "40%", size: 5, delay: 0.5 },
    ].map((dot, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-accent"
        style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
      />
    ))}

    {/* Glowing ring */}
    <motion.div
      className="absolute right-[10%] top-[15%]"
      animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-64 w-64 rounded-full border border-accent/20" />
    </motion.div>

    {/* Abstract gradient blob */}
    <motion.div
      className="absolute -left-32 bottom-1/4 h-80 w-80 rounded-full opacity-[0.07]"
      style={{ background: "radial-gradient(circle, hsl(25, 83%, 51%), transparent 70%)", filter: "blur(60px)" }}
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Connected line mesh */}
    <svg className="absolute right-0 bottom-0 h-1/2 w-1/3 opacity-[0.04]" viewBox="0 0 400 400">
      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <line x1="50" y1="50" x2="200" y2="120" stroke="white" strokeWidth="0.5" />
        <line x1="200" y1="120" x2="350" y2="80" stroke="white" strokeWidth="0.5" />
        <line x1="200" y1="120" x2="150" y2="280" stroke="white" strokeWidth="0.5" />
        <line x1="150" y1="280" x2="320" y2="350" stroke="white" strokeWidth="0.5" />
        <line x1="350" y1="80" x2="320" y2="350" stroke="white" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="80" y2="300" stroke="white" strokeWidth="0.5" />
        <line x1="80" y1="300" x2="150" y2="280" stroke="white" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="3" fill="white" />
        <circle cx="200" cy="120" r="3" fill="white" />
        <circle cx="350" cy="80" r="3" fill="white" />
        <circle cx="150" cy="280" r="3" fill="white" />
        <circle cx="320" cy="350" r="3" fill="white" />
        <circle cx="80" cy="300" r="3" fill="white" />
      </motion.g>
    </svg>
  </div>
);

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary">
      {/* Background images */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1.05 : 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          />
        </motion.div>
      ))}

      {/* Gradient overlay — dark navy with warm accent gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,33,55,0.88) 40%, rgba(13,33,55,0.5) 70%, rgba(232,114,26,0.08) 100%)",
        }}
      />

      {/* 3D geometric shapes */}
      <FloatingShapes />

      {/* Content */}
      <div className="container-scope relative z-10 pt-20">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-sm text-accent">
            {slide.eyebrow}
          </span>
          <h1 className="font-display text-hero font-bold leading-[1.05] text-primary-foreground">
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-primary-foreground/70">
            {slide.subtext}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={slide.cta.href}
              className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-xl"
            >
              {slide.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={slide.ctaSecondary.href}
              className="flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/5"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="mt-12 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-8 bg-accent" : "w-2 bg-primary-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
