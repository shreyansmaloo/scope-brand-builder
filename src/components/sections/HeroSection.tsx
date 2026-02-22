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
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          />
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(13,33,55,0.85) 50%, transparent)",
        }}
      />

      {/* Decorative hex mesh */}
      <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.06]" viewBox="0 0 600 800">
        <pattern id="hexes" width="50" height="86.6" patternUnits="userSpaceOnUse">
          <polygon points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4" fill="none" stroke="white" strokeWidth="0.5" />
          <polygon points="25,28.9 50,43.3 50,72.2 25,86.6 0,72.2 0,43.3" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <rect width="600" height="800" fill="url(#hexes)" />
      </svg>

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
