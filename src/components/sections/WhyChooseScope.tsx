import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Globe, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import whyChooseImg from "@/assets/why-choose.jpg";

const features = [
  {
    icon: Package,
    stat: "400+",
    title: "One-Stop Shop",
    desc: "Excipients, actives & functional ingredients across three industries under one roof.",
  },
  {
    icon: Globe,
    stat: "50+",
    title: "Global Principals",
    desc: "Exclusive partnerships with world-renowned ingredient manufacturers.",
  },
  {
    icon: ShieldCheck,
    stat: "ISO 9001",
    title: "Certified Quality",
    desc: "D&B, CRISIL rated with cGMP, HACCP, Kosher & WHO-GMP compliant supply chains.",
  },
  {
    icon: Truck,
    stat: "5 Cities",
    title: "Pan-India Reach",
    desc: "Metro offices & temperature-controlled warehouses with dedicated technical sales support.",
  },
];

const pillars = [
  "65+ years of unmatched industry expertise",
  "Application lab support & formulation guidance",
  "Direct technical access to global principal scientists",
  "Regulatory documentation & compliance assistance",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const WhyChooseScope = () => (
  <section className="relative overflow-hidden bg-[#141414] py-20 lg:py-32">

    {/* ── Background decoration ────────────────────── */}
    {/* Warm amber glow — top right */}
    <div
      className="pointer-events-none absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(246,154,30,0.18) 0%, rgba(246,154,30,0.06) 45%, transparent 70%)" }}
    />
    {/* Soft glow — bottom left */}
    <div
      className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(246,154,30,0.10) 0%, transparent 65%)" }}
    />
    {/* Dot grid */}
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
      <defs>
        <pattern id="why-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="rgb(246,154,30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#why-dots)" />
    </svg>

    <div className="container-scope relative z-10">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

        {/* ── LEFT — Image + floating stats ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main image */}
          <div className="relative overflow-hidden rounded-[2rem] aspect-[3/2] sm:aspect-[4/3] lg:aspect-[3/4] shadow-2xl">
            <img
              src={whyChooseImg}
              alt="Quality control at Scope Ingredients laboratory"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* Floating card — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 shadow-2xl"
          >
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Established</p>
            <p className="font-display text-5xl font-black text-white leading-none">1959</p>
            <p className="mt-1 font-body text-xs text-primary">65+ years of expertise</p>
          </motion.div>

          {/* Floating stat — top right */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-5 -right-5 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl px-5 py-4 shadow-xl"
          >
            <p className="font-display text-3xl font-black text-primary leading-none">400+</p>
            <p className="mt-0.5 font-body text-[11px] text-white/60">Active Products</p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Content ────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill tag */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest text-primary">
              ✦ Why Choose Us
            </span>

            <h2 className="mt-6 font-display text-h1 font-black leading-tight text-white">
              India's Most{" "}
              <span className="text-primary">Trusted</span>{" "}
              Ingredient Partner
            </h2>
            <p className="mt-5 font-body text-[15px] leading-relaxed text-white/55 max-w-[46ch]">
              With 65 years of excipient expertise, Scope has built an unmatched reputation — combining deep industry knowledge, global principal relationships, and a relentless focus on quality.
            </p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-2 gap-3"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.07]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-black text-white">{f.stat}</p>
                    <p className="font-display text-[13px] font-bold text-white/80">{f.title}</p>
                    <p className="mt-1.5 font-body text-[11px] leading-snug text-white/40">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust pillars */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 space-y-2.5"
          >
            {pillars.map((p) => (
              <li key={p} className="flex items-start gap-2.5 font-body text-[13px] text-white/55">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-[0_8px_24px_rgba(246,154,30,0.4)] hover:-translate-y-px active:scale-95"
            >
              Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseScope;
