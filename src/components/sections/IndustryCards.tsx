import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";

const industries = [
  {
    id: "pharma",
    title: "Pharmaceutical",
    short: "Pharma",
    tagline: "Excipient Excellence",
    desc: "400+ pharmaceutical-grade excipients for solid, liquid, topical and specialty dosage forms — backed by global ISO-certified principal partnerships and 65+ years of formulation expertise.",
    image: industryPharma,
    href: "/products?industry=pharma",
    highlights: ["Oral Solid Dosage", "Liquid & Topical Forms", "Specialty Excipients", "CDSCO Compliant"],
    stat: { value: "400+", label: "Products" },
  },
  {
    id: "cosmetics",
    title: "Personal Care & Derma",
    short: "Personal Care",
    tagline: "Innovative Actives",
    desc: "Premium active and functional ingredients from world-class global principals for modern skin, hair, and body formulations — including peptides, ceramides, and botanical extracts.",
    image: industryCosmetics,
    href: "/products?industry=cosmetics",
    highlights: ["Skin Actives & Peptides", "Ceramides & Lipids", "Botanical Extracts", "Hair Care Solutions"],
    stat: { value: "50+", label: "Principals" },
  },
  {
    id: "food",
    title: "Food & Nutraceuticals",
    short: "Food & Nutra",
    tagline: "Health & Wellness",
    desc: "Stabilizers, sweeteners, prebiotic fibers and functional actives for nutraceutical, food and health & wellness applications — FSSAI certified and globally sourced.",
    image: industryFood,
    href: "/products?industry=food",
    highlights: ["Prebiotic Fibers", "Natural Sweeteners", "Plant-based Proteins", "Functional Actives"],
    stat: { value: "65+", label: "Years" },
  },
];

const IndustryCards = () => {
  const [active, setActive] = useState(0);
  const ind = industries[active];

  return (
    <section className="relative overflow-hidden bg-[#FCFDF8] py-20 lg:py-32">
      {/* Subtle warm background wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(246,154,30,0.06) 0%, transparent 70%)" }}
      />

      <div className="container-scope relative z-10">
        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest text-primary">
              ✦ Industry Expertise
            </span>
            <h2 className="mt-5 font-display text-h1 font-black text-foreground leading-tight">
              Three Industries,{" "}
              <span className="text-primary">One Partner</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-5 py-2.5 font-display text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-md"
          >
            Full Catalog
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* ── Tab selector ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        >
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActive(i)}
              className={`group shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-all duration-300 ${
                active === i
                  ? "bg-primary text-white shadow-[0_4px_16px_rgba(246,154,30,0.35)]"
                  : "border border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  active === i ? "bg-white" : "bg-muted-foreground group-hover:bg-primary"
                }`}
              />
              {ind.short}
            </button>
          ))}
        </motion.div>

        {/* ── Main showcase ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-5 lg:grid-rows-1"
          >
            {/* Image panel */}
            <div className="relative lg:col-span-3 overflow-hidden rounded-[2rem] shadow-2xl" style={{ minHeight: "480px" }}>
              <img
                src={ind.image}
                alt={`${ind.title} ingredients`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
              {/* Primary accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

              {/* Corner stat */}
              <div className="absolute top-6 right-6 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-4 text-right">
                <p className="font-display text-3xl font-black text-white">{ind.stat.value}</p>
                <p className="font-body text-[11px] text-white/60">{ind.stat.label}</p>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{ind.tagline}</p>
                <h3 className="mt-2 font-display text-4xl font-black text-white leading-tight">{ind.title}</h3>
                <Link
                  to={ind.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 font-display text-xs font-semibold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg"
                >
                  Explore Products
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Info panel */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Description card */}
              <div className="flex-1 rounded-[2rem] border border-border/50 bg-card p-7 shadow-sm">
                <p className="font-body text-[15px] leading-relaxed text-muted-foreground">{ind.desc}</p>

                <div className="mt-6 space-y-2.5">
                  {ind.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="font-body text-[13px] font-medium text-foreground">{h}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={ind.href}
                  className="group mt-8 inline-flex items-center gap-2 font-display text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  View all products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Other industry quick-access tiles */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {industries
                  .filter((_, i) => i !== active)
                  .map((other) => (
                    <button
                      key={other.id}
                      onClick={() => setActive(industries.findIndex((x) => x.id === other.id))}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <div
                        className="absolute inset-0 opacity-[0.07] transition-opacity group-hover:opacity-[0.14]"
                        style={{ backgroundImage: `url(${other.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60" />
                      <div className="relative">
                        <p className="font-display text-[10px] font-bold uppercase tracking-widest text-primary">{other.tagline}</p>
                        <p className="mt-0.5 font-display text-sm font-bold text-foreground">{other.short}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default IndustryCards;
