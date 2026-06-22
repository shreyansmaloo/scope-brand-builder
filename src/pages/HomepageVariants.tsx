import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, ChevronRight,
  Pill, Sparkles, Leaf,
  Package, Globe, ShieldCheck, Truck, CheckCircle2,
} from "lucide-react";

import pharmaImg from "@/assets/hero-pharma.jpg";
import cosmeticsImg from "@/assets/hero-cosmetics.jpg";
import foodImg from "@/assets/hero-food.jpg";
import whyChooseImg from "@/assets/why-choose.jpg";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";

const P = "#F69A1E";

const STATS = [
  { value: "65+", label: "Years" },
  { value: "400+", label: "Products" },
  { value: "50+", label: "Principals" },
  { value: "Pan-India", label: "Reach" },
];

const INDUSTRIES = [
  {
    id: "pharma", title: "Pharmaceutical", short: "Pharma", tagline: "Excipient Excellence",
    desc: "400+ pharmaceutical-grade excipients for solid, liquid, topical and specialty dosage forms — backed by 65+ years of expertise.",
    image: industryPharma, heroImg: pharmaImg, href: "/products?industry=pharma",
    icon: Pill, stat: "400+",
    highlights: ["Oral Solid Dosage", "Liquid & Topical", "Specialty Excipients", "CDSCO Compliant"],
  },
  {
    id: "cosmetics", title: "Personal Care & Derma", short: "Personal Care", tagline: "Innovative Actives",
    desc: "Premium active and functional ingredients from world-class global principals for modern personal care formulations.",
    image: industryCosmetics, heroImg: cosmeticsImg, href: "/products?industry=cosmetics",
    icon: Sparkles, stat: "50+",
    highlights: ["Skin Actives & Peptides", "Ceramides & Lipids", "Botanical Extracts", "Hair Care"],
  },
  {
    id: "food", title: "Food & Nutraceuticals", short: "Food & Nutra", tagline: "Health & Wellness",
    desc: "Stabilizers, sweeteners, prebiotic fibers and functional actives for nutraceutical and health & wellness applications.",
    image: industryFood, heroImg: foodImg, href: "/products?industry=food",
    icon: Leaf, stat: "65+",
    highlights: ["Prebiotic Fibers", "Natural Sweeteners", "Plant-based Proteins", "Functional Actives"],
  },
];

const FEATURES = [
  { icon: Package, stat: "400+", title: "One-Stop Shop", desc: "Excipients, actives & functional ingredients across three industries." },
  { icon: Globe, stat: "50+", title: "Global Principals", desc: "Exclusive partnerships with world-renowned ingredient manufacturers." },
  { icon: ShieldCheck, stat: "ISO 9001", title: "Certified Quality", desc: "cGMP, HACCP, Kosher & WHO-GMP compliant supply chains." },
  { icon: Truck, stat: "5 Cities", title: "Pan-India Reach", desc: "Metro offices & temperature-controlled warehouses." },
];

const PILLARS = [
  "65+ years of unmatched industry expertise",
  "Application lab support & formulation guidance",
  "Direct technical access to global principal scientists",
  "Regulatory documentation & compliance assistance",
];

// ── Variant A: Clean Split ─────────────────────────────────
// Pure white, editorial two-column layout, stacked images on right
const VariantA = () => (
  <div className="bg-white">
    {/* Hero */}
    <section className="relative min-h-screen overflow-hidden bg-white pt-28 pb-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: `radial-gradient(circle, ${P} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />
      <div className="container-scope relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}45`, backgroundColor: `${P}10`, color: P }}>
              Trusted Since 1959 · ISO 9001:2015
            </span>
            <h1 className="mt-6 font-display font-black text-foreground leading-[1.05] text-hero">
              India's Premier<br />
              <span style={{ color: P }}>Pharmaceutical</span><br />
              Excipient Partner
            </h1>
            <p className="mt-5 font-body text-[15px] leading-relaxed text-foreground/55 max-w-[46ch]">
              400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms — backed by 65+ years of deep industry expertise.
            </p>
            {/* Inline stats */}
            <div className="mt-8 grid grid-cols-4 divide-x divide-gray-100 border-y border-gray-100 py-5">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0">
                  <p className="font-display text-2xl font-black" style={{ color: P }}>{s.value}</p>
                  <p className="mt-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-foreground/40">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px active:scale-95"
                style={{ backgroundColor: P }}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/principals" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-7 py-3.5 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
                Our Principals <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Stacked image composition */}
          <div className="relative hidden lg:block" style={{ height: "580px" }}>
            <div className="absolute right-0 top-0 w-[68%] rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ height: "370px" }}>
              <img src={pharmaImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-0 bottom-14 w-[52%] rounded-[2rem] overflow-hidden shadow-xl border-[3px] border-white" style={{ height: "256px" }}>
              <img src={cosmeticsImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-4 bottom-0 w-[36%] rounded-[1.5rem] overflow-hidden shadow-xl border-[3px] border-white" style={{ height: "188px" }}>
              <img src={foodImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute top-4 left-0 z-20 rounded-2xl bg-white border border-gray-100 shadow-lg px-5 py-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-widest" style={{ color: `${P}80` }}>Since</p>
              <p className="font-display text-4xl font-black text-foreground leading-none">1959</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Industries */}
    <section className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="container-scope">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}35`, backgroundColor: `${P}0D`, color: P }}>
              Industry Expertise
            </span>
            <h2 className="mt-4 font-display text-h1 font-black text-foreground">
              Three Industries, <span style={{ color: P }}>One Partner</span>
            </h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
            Full Catalog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link key={ind.id} to={ind.href} className="group block rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#F69A1E]/20 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ height: "210px" }}>
                  <img src={ind.image} alt={ind.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 rounded-xl bg-white/95 px-3 py-1.5 shadow-sm">
                    <span className="font-display text-sm font-black" style={{ color: P }}>{ind.stat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: `${P}18`, color: P }}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest" style={{ color: P }}>{ind.tagline}</span>
                  </div>
                  <h3 className="font-display text-xl font-black text-foreground">{ind.title}</h3>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-foreground/50 line-clamp-2">{ind.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 font-display text-sm font-bold group-hover:gap-2.5 transition-all" style={{ color: P }}>
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* Why Choose */}
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-scope">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}35`, backgroundColor: `${P}0D`, color: P }}>
              Why Choose Us
            </span>
            <h2 className="mt-5 font-display text-h1 font-black text-foreground leading-tight">
              India's Most <span style={{ color: P }}>Trusted</span> Ingredient Partner
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-foreground/55 max-w-[46ch]">
              With 65 years of excipient expertise, Scope has built an unmatched reputation combining deep industry knowledge and global principal relationships.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="group rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 hover:border-[#F69A1E]/25 hover:bg-[#FFF9F2] transition-all">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl mb-3 group-hover:bg-[#F69A1E] group-hover:text-white transition-all" style={{ backgroundColor: `${P}15`, color: P }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-display text-xl font-black text-foreground">{f.stat}</p>
                    <p className="font-display text-[13px] font-bold text-foreground/80">{f.title}</p>
                    <p className="mt-1 font-body text-[11px] leading-snug text-foreground/45">{f.desc}</p>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: P }}>
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl" style={{ height: "520px" }}>
              <img src={whyChooseImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-gray-100 bg-white/98 shadow-xl p-5">
              <ul className="space-y-2.5">
                {PILLARS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 font-body text-[12.5px] text-foreground/65">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: P }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Band */}
    <section className="py-20 mt-10 bg-[#FFFBF4]">
      <div className="container-scope">
        <div className="rounded-[2.5rem] border bg-white p-12 lg:p-16 text-center shadow-sm" style={{ borderColor: `${P}20` }}>
          <h2 className="font-display font-black text-foreground text-h1">
            Ready to Evaluate? <span style={{ color: P }}>Request a Free Sample.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-[44ch] font-body text-[15px] leading-relaxed text-foreground/55">
            Test before you commit. Product samples dispatched quickly across India for your formulation and R&D needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/request-sample" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: P }}>
              Request a Sample <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-8 py-4 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ── Variant B: Warm Glow ────────────────────────────────────
// Cream background, center-aligned hero, radial amber glow, industry tab showcase
const VariantB = () => {
  const [activeInd, setActiveInd] = useState(0);
  const ind = INDUSTRIES[activeInd];

  return (
    <div style={{ backgroundColor: "#FFFBF4" }}>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden pt-28 pb-16"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(246,154,30,0.14) 0%, transparent 65%), #FFFBF4" }}>
        <div className="container-scope relative z-10">
          <div className="text-center max-w-4xl mx-auto pt-8">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}35`, backgroundColor: `${P}12`, color: P }}>
              Trusted Since 1959 · ISO 9001:2015
            </span>
            <h1 className="mt-6 font-display font-black text-foreground leading-[1.05] text-hero">
              India's Premier{" "}
              <span className="relative inline-block" style={{ color: P }}>
                Pharmaceutical
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 320 10" fill="none">
                  <path d="M4 7 Q160 2 316 7" stroke={P} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>{" "}
              Excipient Partner
            </h1>
            <p className="mt-7 mx-auto max-w-[50ch] font-body text-[15px] leading-relaxed text-foreground/55">
              400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms — backed by 65+ years of deep industry expertise.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
                style={{ backgroundColor: P, boxShadow: `0 8px 28px ${P}40` }}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/principals" className="inline-flex items-center gap-2 rounded-full border bg-white px-8 py-4 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all"
                style={{ borderColor: `${P}25` }}>
                Our Principals <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-10 lg:gap-16">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-black" style={{ color: P }}>{s.value}</p>
                <p className="mt-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-foreground/40">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Industry tabs + showcase */}
          <div className="mt-14">
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {INDUSTRIES.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <button key={industry.id} onClick={() => setActiveInd(i)}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-all"
                    style={{
                      backgroundColor: activeInd === i ? P : "white",
                      color: activeInd === i ? "white" : "#555",
                      boxShadow: activeInd === i ? `0 4px 16px ${P}40` : "0 1px 4px rgba(0,0,0,0.08)",
                    }}>
                    <Icon className="h-3.5 w-3.5" />
                    {industry.short}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeInd} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mx-auto" style={{ height: "420px", maxWidth: "900px" }}>
                <img src={ind.heroImg} alt={ind.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                <div className="absolute inset-0 flex items-end p-10">
                  <div className="max-w-md">
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: P }}>{ind.tagline}</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-white">{ind.title}</h3>
                    <p className="mt-2 font-body text-sm text-white/70 leading-relaxed">{ind.desc}</p>
                    <Link to={ind.href} className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-xs font-bold text-white border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-foreground transition-all">
                      Explore Products <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="absolute top-6 right-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-5 py-4 text-center">
                  <p className="font-display text-3xl font-black text-white">{ind.stat}</p>
                  <p className="font-body text-[10px] text-white/60 mt-0.5">{ind.highlights[0]}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFBF4" }}>
        <div className="container-scope">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}35`, backgroundColor: `${P}12`, color: P }}>
              Why Choose Us
            </span>
            <h2 className="mt-4 font-display text-h1 font-black text-foreground">
              India's Most <span style={{ color: P }}>Trusted</span> Partner
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl bg-white border p-6 shadow-sm hover:shadow-md hover:border-[#F69A1E]/25 transition-all" style={{ borderColor: `${P}15` }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${P}15`, color: P }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-display text-2xl font-black" style={{ color: P }}>{f.stat}</p>
                  <p className="font-display text-[14px] font-bold text-foreground mt-0.5">{f.title}</p>
                  <p className="mt-2 font-body text-[12px] leading-snug text-foreground/50">{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl bg-white border p-7 shadow-sm" style={{ borderColor: `${P}15` }}>
            <div className="grid md:grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <div key={p} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: P }} />
                  <span className="font-body text-[13px] text-foreground/65">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: P }}>
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-scope">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-[2rem] p-10 lg:p-14"
            style={{ background: `linear-gradient(135deg, ${P}12 0%, white 100%)`, border: `1px solid ${P}25` }}>
            <div>
              <h2 className="font-display text-3xl font-black text-foreground">
                Ready to <span style={{ color: P }}>Evaluate?</span>
              </h2>
              <p className="mt-2 font-body text-[14px] text-foreground/55">Request product samples dispatched across India in 48h.</p>
            </div>
            <Link to="/request-sample" className="shrink-0 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: P }}>
              Request a Sample <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// ── Variant C: Bento Grid ────────────────────────────────────
// White, structured bento layout, bold modern grid
const VariantC = () => (
  <div className="bg-white">
    {/* Hero bento */}
    <section className="pt-28 pb-12 bg-white">
      <div className="container-scope">
        <div className="grid grid-cols-12 gap-4">
          {/* Headline tile */}
          <div className="col-span-12 lg:col-span-7 rounded-[2rem] bg-[#FAFAFA] border border-gray-100 p-10 lg:p-14 flex flex-col justify-between" style={{ minHeight: "340px" }}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
                style={{ borderColor: `${P}40`, backgroundColor: `${P}10`, color: P }}>
                ✦ Since 1959 · ISO 9001:2015
              </span>
              <h1 className="mt-6 font-display font-black text-foreground leading-[1.05] text-hero">
                India's Premier<br />
                <span style={{ color: P }}>Pharmaceutical</span><br />
                Excipient Partner
              </h1>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-foreground/55 max-w-[44ch]">
                400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms.
              </p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
                style={{ backgroundColor: P }}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/principals" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-7 py-3.5 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
                Principals <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats + image tile */}
          <div className="col-span-12 lg:col-span-5 rounded-[2rem] overflow-hidden relative" style={{ minHeight: "340px" }}>
            <img src={pharmaImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(246,154,30,0.3) 0%, rgba(0,0,0,0.72) 100%)" }} />
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="inline-flex w-fit rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2">
                <span className="font-display text-xs font-bold text-white">Pharma · Cosmetics · Food</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-3">
                    <p className="font-display text-2xl font-black text-white">{s.value}</p>
                    <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry tiles */}
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link key={ind.id} to={ind.href} className="col-span-12 md:col-span-4 rounded-[1.5rem] overflow-hidden relative group" style={{ minHeight: "220px" }}>
                <img src={ind.image} alt={ind.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 100%)" }} />
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: P }} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg mb-2" style={{ backgroundColor: `${P}25`, color: P }}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="font-display text-[10px] font-bold uppercase tracking-widest" style={{ color: P }}>{ind.tagline}</p>
                  <p className="font-display text-sm font-bold text-white">{ind.short}</p>
                  <div className="mt-2 flex items-center gap-1 font-display text-[11px] font-bold text-white/70 group-hover:text-white group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* Why Choose */}
    <section className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="container-scope">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: `${P}40`, backgroundColor: `${P}10`, color: P }}>
              Why Choose Us
            </span>
            <h2 className="mt-4 font-display text-h1 font-black text-foreground">
              India's Most <span style={{ color: P }}>Trusted</span> Partner
            </h2>
          </div>
          <Link to="/about" className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:border-[#F69A1E]/25 hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4 group-hover:bg-[#F69A1E] group-hover:text-white transition-all" style={{ backgroundColor: `${P}12`, color: P }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-2xl font-black" style={{ color: P }}>{f.stat}</p>
                  <p className="font-display text-[13px] font-bold text-foreground">{f.title}</p>
                  <p className="mt-1.5 font-body text-[11px] leading-snug text-foreground/45">{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div>
            <div className="rounded-[2rem] overflow-hidden shadow-xl mb-5" style={{ height: "280px" }}>
              <img src={whyChooseImg} alt="" className="h-full w-full object-cover" />
            </div>
            <ul className="space-y-3">
              {PILLARS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 font-body text-[13px] text-foreground/65">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: P }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* CTA bento */}
    <section className="py-16 bg-white">
      <div className="container-scope">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-[2rem] p-10" style={{ background: `linear-gradient(135deg, ${P} 0%, #F5B730 100%)` }}>
            <h2 className="font-display text-3xl font-black text-white">Ready to Evaluate?</h2>
            <p className="mt-2 font-body text-[14px] text-white/75">Request product samples for your formulation & R&D needs. Dispatched across India in 48h.</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/request-sample" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-bold transition-all hover:-translate-y-px"
                style={{ color: P }}>
                Request a Sample <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-display text-sm font-bold text-white transition-all hover:bg-white/20">
                Contact Us <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] overflow-hidden relative" style={{ minHeight: "200px" }}>
            <img src={whyChooseImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${P}60, transparent)` }} />
            <div className="absolute bottom-6 right-6 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 px-4 py-3 text-right">
              <p className="font-display text-2xl font-black text-white">48h</p>
              <p className="font-body text-[10px] text-white/60">Sample dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ── Variant D: Bold Type ────────────────────────────────────
// Ultra-airy white, massive typography, alternating industry sections
const VariantD = () => (
  <div className="bg-white">
    {/* Hero */}
    <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-20">
      {/* Watermark number */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-display font-black select-none leading-none"
        style={{ fontSize: "clamp(16rem, 32vw, 30rem)", color: `${P}08`, lineHeight: 1 }}
        aria-hidden
      >
        65+
      </div>
      <div className="container-scope relative z-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-14" style={{ backgroundColor: P }} />
            <span className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: P }}>
              Trusted Since 1959 · ISO 9001:2015
            </span>
          </div>
          <h1 className="font-display font-black text-foreground leading-[1.0]" style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)" }}>
            India's Premier<br />
            <span style={{ color: P }}>Pharmaceutical</span><br />
            Excipient Partner
          </h1>
          <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-3xl">
            <p className="font-body text-[16px] leading-relaxed text-foreground/55">
              400+ pharmaceutical-grade products across solid, liquid, topical and specialty dosage forms — backed by 65+ years of deep industry expertise.
            </p>
            <div className="flex flex-col justify-center gap-4">
              <Link to="/products" className="inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
                style={{ backgroundColor: P }}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/principals" className="inline-flex w-fit items-center gap-1.5 font-body text-sm text-foreground/55 hover:text-foreground transition-colors">
                Our Principals <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        {/* Full-width image with stats */}
        <div className="mt-16 relative rounded-[2.5rem] overflow-hidden" style={{ height: "420px" }}>
          <img src={pharmaImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)" }} />
          <div className="absolute inset-0 p-8 lg:p-12 flex items-end">
            <div className="grid grid-cols-4 gap-4 lg:gap-8 max-w-lg">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl lg:text-3xl font-black text-white">{s.value}</p>
                  <p className="mt-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Industries - alternating */}
    <section className="py-20 bg-white">
      <div className="container-scope">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ backgroundColor: P }} />
            <span className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: P }}>Industry Expertise</span>
            <div className="h-px w-12" style={{ backgroundColor: P }} />
          </div>
          <h2 className="font-display font-black text-foreground text-h1">
            Three Industries, <span style={{ color: P }}>One Partner</span>
          </h2>
        </div>
        <div className="space-y-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div key={ind.id} className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-lg transition-all shadow-sm">
                <div className={`relative ${i % 2 !== 0 ? "lg:order-last" : ""}`} style={{ minHeight: "280px" }}>
                  <img src={ind.image} alt={ind.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: P }} />
                  <div className="absolute top-4 right-4 rounded-xl bg-white/90 px-3 py-1.5 shadow-sm">
                    <span className="font-display text-sm font-black" style={{ color: P }}>{ind.stat}</span>
                  </div>
                </div>
                <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${P}15`, color: P }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest" style={{ color: P }}>{ind.tagline}</span>
                  </div>
                  <h3 className="font-display font-black text-foreground" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>{ind.title}</h3>
                  <p className="mt-3 font-body text-[14px] leading-relaxed text-foreground/55">{ind.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {ind.highlights.map((h) => (
                      <span key={h} className="rounded-full border border-gray-100 bg-[#FAFAFA] px-3 py-1 font-body text-[11px] font-medium text-foreground/60">{h}</span>
                    ))}
                  </div>
                  <Link to={ind.href} className="mt-6 inline-flex w-fit items-center gap-2 font-display text-sm font-bold transition-all hover:gap-3" style={{ color: P }}>
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Why Choose - numbered */}
    <section className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="container-scope">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: P }} />
              <span className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: P }}>Why Choose Us</span>
            </div>
            <h2 className="font-display font-black text-foreground leading-[1.05]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              India's Most<br /><span style={{ color: P }}>Trusted</span> Partner
            </h2>
            <p className="mt-5 font-body text-[15px] leading-relaxed text-foreground/55 max-w-[44ch]">
              With 65 years of excipient expertise, Scope has built an unmatched reputation combining deep industry knowledge and global principal relationships.
            </p>
            <div className="mt-10 space-y-6">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex gap-5 items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-[15px] font-black"
                      style={{ backgroundColor: `${P}12`, color: P }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-[15px] font-black text-foreground">{f.title}</p>
                        <span className="font-display text-sm font-black" style={{ color: P }}>{f.stat}</span>
                      </div>
                      <p className="mt-0.5 font-body text-[13px] leading-snug text-foreground/50">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{ backgroundColor: P }}>
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ height: "600px" }}>
              <img src={whyChooseImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white border border-gray-100 shadow-lg p-6">
              <p className="font-display text-[10px] font-bold uppercase tracking-widest" style={{ color: `${P}80` }}>Established</p>
              <p className="font-display text-5xl font-black text-foreground leading-none">1959</p>
              <p className="mt-1 font-body text-xs" style={{ color: P }}>65+ years of expertise</p>
            </div>
            <div className="absolute -top-5 -right-5 rounded-2xl border bg-white px-5 py-4 shadow-xl" style={{ borderColor: `${P}35` }}>
              <p className="font-display text-3xl font-black leading-none" style={{ color: P }}>400+</p>
              <p className="mt-0.5 font-body text-[11px] text-foreground/55">Active Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-white">
      <div className="container-scope text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: P }} />
          <span className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: P }}>Ready to Start?</span>
          <div className="h-px w-12" style={{ backgroundColor: P }} />
        </div>
        <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Request a Free Sample
        </h2>
        <p className="mt-4 mx-auto max-w-[44ch] font-body text-[15px] leading-relaxed text-foreground/55">
          Test before you commit. Product samples dispatched quickly across India for your formulation and R&D needs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/request-sample" className="inline-flex items-center gap-2 rounded-full px-9 py-4 font-display text-sm font-bold text-white transition-all hover:-translate-y-px"
            style={{ backgroundColor: P }}>
            Request a Sample <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-9 py-4 font-display text-sm font-bold text-foreground hover:border-[#F69A1E]/40 hover:text-[#F69A1E] transition-all">
            Contact Us <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

// ── Page wrapper ───────────────────────────────────────────
const VARIANTS = [
  { id: "A", label: "Clean Split", desc: "Minimal two-column, editorial feel with stacked image composition" },
  { id: "B", label: "Warm Glow", desc: "Cream background, centered headline with amber radial glow" },
  { id: "C", label: "Bento Grid", desc: "Modern card grid hero, structured bento layout" },
  { id: "D", label: "Bold Type", desc: "Giant watermark typography, alternating full-width industry sections" },
];

const HomepageVariants = () => {
  const [active, setActive] = useState("A");

  return (
    <div>
      {/* Sticky selector bar */}
      <div className="sticky top-[68px] z-40 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-scope py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <span className="font-display text-[11px] font-bold uppercase tracking-wider text-foreground/35 shrink-0 hidden sm:block">
            Design Variants:
          </span>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-bold transition-all"
              style={{
                backgroundColor: active === v.id ? P : "transparent",
                color: active === v.id ? "white" : "#888",
                border: active === v.id ? `1px solid ${P}` : "1px solid #E5E7EB",
              }}
            >
              <span>{v.id}</span>
              <span className="hidden sm:block">{v.label}</span>
            </button>
          ))}
          <span className="ml-auto font-body text-[11px] text-foreground/35 shrink-0 hidden lg:block italic">
            {VARIANTS.find((v) => v.id === active)?.desc}
          </span>
        </div>
      </div>

      {/* Active variant */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {active === "A" && <VariantA />}
          {active === "B" && <VariantB />}
          {active === "C" && <VariantC />}
          {active === "D" && <VariantD />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomepageVariants;
