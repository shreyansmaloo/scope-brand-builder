import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import CapsuleScene from "@/components/hero/CapsuleScene";

// ─── Shared easing ────────────────────────────────────────────
const ease2: [number,number,number,number] = [0.16, 1, 0.3, 1];
const ease1: [number,number,number,number] = [0.22, 1, 0.36, 1];

// ─── Shared animated headline (line-wipe) ─────────────────────
const Headline = ({
  lines,
  size = "clamp(2.6rem, 6.5vw, 6rem)",
}: {
  lines: { text: string; color: string }[];
  size?: string;
}) => (
  <div>
    {lines.map((line, i) => (
      <div key={i} style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ y: "108%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.05, delay: 0.2 + i * 0.18, ease: ease2 }}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 900,
            fontSize: size,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: line.color,
          }}
        >
          {line.text}
        </motion.div>
      </div>
    ))}
  </div>
);

// ─── Eyebrow tag ──────────────────────────────────────────────
const Tag = ({ children, color = "#F69A1E", dark = false }: {
  children: React.ReactNode; color?: string; dark?: boolean;
}) => (
  <div className="inline-flex items-center gap-2"
    style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color }}>
    <span style={{ height: 1, width: 24, background: color, display: "inline-block" }} />
    {children}
  </div>
);

// ─── Shared stat block ────────────────────────────────────────
const Stats = ({ textColor = "#F69A1E", labelColor = "#a0a0a0", borderColor = "rgba(246,154,30,.14)" }: {
  textColor?: string; labelColor?: string; borderColor?: string;
}) => (
  <div className="flex gap-8 sm:gap-12" style={{ paddingTop: "1.5rem", borderTop: `1px solid ${borderColor}` }}>
    {[
      { v: "65+",  l: "Years",      s: "Est. 1959"     },
      { v: "400+", l: "Products",   s: "3 industries"  },
      { v: "50+",  l: "Principals", s: "Global brands" },
    ].map(s => (
      <div key={s.l}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.8vw,1.85rem)", color: textColor }}>{s.v}</div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: textColor, opacity: 0.8, marginTop: 2 }}>{s.l}</div>
        <div className="hidden sm:block" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: labelColor, marginTop: 1 }}>{s.s}</div>
      </div>
    ))}
  </div>
);

// ─── CTA pair ─────────────────────────────────────────────────
const CTAPair = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
    <Link to="/products"
      className="group inline-flex items-center justify-center gap-2.5 rounded-full font-display text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,154,30,.45)] active:scale-[0.97]"
      style={{ padding: "13px 28px", background: "linear-gradient(135deg,#F69A1E,#FFD166 55%,#F69A1E)", backgroundSize: "200% 100%", color: "#1a1a1a" }}
      onMouseEnter={e => (e.currentTarget.style.backgroundPosition="100% 0")}
      onMouseLeave={e => (e.currentTarget.style.backgroundPosition="0% 0")}>
      Explore Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
    <Link to="/principals"
      className="group inline-flex items-center justify-center gap-2 rounded-full font-display text-[13px] font-semibold transition-all duration-300"
      style={{
        padding: "13px 28px",
        color: dark ? "rgba(255,255,255,.7)" : "#494949",
        border: dark ? "1.5px solid rgba(255,255,255,.18)" : "1.5px solid rgba(246,154,30,.32)",
        background: dark ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.9)",
      }}>
      Our Partners <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </div>
);

// ══════════════════════════════════════════════════════════════
// VARIANT 1 — "The Formulator"
// Light white background, clean left-right split, professional
// ══════════════════════════════════════════════════════════════
const V1 = () => (
  <section className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh", background: "#F9F9F7" }}>

    {/* Subtle dot grid */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
      <defs><pattern id="v1-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#F69A1E" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#v1-dots)" />
    </svg>

    {/* Perspective grid bottom */}
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "42%", zIndex: 1 }}>
      <div style={{
        position: "absolute", bottom: 0, left: "-50%", right: "-50%", height: "270%",
        transformOrigin: "bottom center", transform: "perspective(900px) rotateX(60deg)",
        backgroundImage: ["linear-gradient(rgba(246,154,30,.12) 1px,transparent 1px)","linear-gradient(90deg,rgba(246,154,30,.12) 1px,transparent 1px)"].join(","),
        backgroundSize: "54px 54px",
      }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,#F9F9F7 0%,transparent 40%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#F9F9F7 0%,transparent 22%,transparent 78%,#F9F9F7 100%)" }} />
    </div>

    {/* 3D capsule — right column */}
    <div className="absolute hidden lg:block pointer-events-none" style={{ zIndex: 2, top: "4%", right: "0%", width: "50%", bottom: "8%" }}>
      <CapsuleScene fogColor="#F9F9F7" vignetteColor="rgba(249,249,247," bodyColor="#D97B0A" capColor="#F6A820" fov={44} cameraZ={5.5} />
    </div>

    {/* Warm glow behind capsule */}
    <div className="absolute hidden lg:block inset-0 pointer-events-none" style={{ zIndex: 1,
      background: "radial-gradient(ellipse 48% 65% at 78% 46%, rgba(246,154,30,.11) 0%, transparent 65%)" }} />

    {/* Content */}
    <div className="relative flex flex-col flex-1 justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-12" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="lg:max-w-[50%]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}>
            <Tag>Pharma · Personal Care · Food Ingredients</Tag>
          </motion.div>

          <div className="mt-5">
            <Headline lines={[
              { text: "The Science of",     color: "#1a1a1a" },
              { text: "Better",             color: "#1a1a1a" },
              { text: "Formulations.",      color: "#F69A1E" },
            ]} />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.85, ease: ease1 }}
            style={{ height: 2, width: 48, background: "#F69A1E", borderRadius: 2, marginTop: "1.5rem", transformOrigin: "left" }} />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.92, ease: ease1 }}
            className="mt-4 font-body leading-relaxed" style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#6b6b6b", maxWidth: "44ch" }}>
            From the excipient in every tablet to the active behind your skincare — Scope
            has been the silent partner in India's finest formulations since 1959.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05, ease: ease1 }} className="mt-7">
            <CTAPair />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }} className="mt-10">
            <Stats />
          </motion.div>
        </div>
      </div>
    </div>

    <div className="relative h-[3px]" style={{ zIndex: 10, background: "linear-gradient(90deg,#F69A1E,#FFD166,#DB8E00,#F69A1E)", backgroundSize: "300% 100%" }} />
  </section>
);

// ══════════════════════════════════════════════════════════════
// VARIANT 2 — "The Pioneer"
// Dark dramatic, amber glow, capsule large on right
// ══════════════════════════════════════════════════════════════
const V2 = () => (
  <section className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh", background: "#0C0C0C" }}>

    {/* Amber radial glow */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: [
        "radial-gradient(ellipse 55% 70% at 78% 48%, rgba(246,154,30,.18) 0%, transparent 62%)",
        "radial-gradient(ellipse 40% 40% at 15% 88%, rgba(246,154,30,.07) 0%, transparent 55%)",
      ].join(",")
    }} />

    {/* Dot grid */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
      <defs><pattern id="v2-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#F69A1E" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#v2-dots)" />
    </svg>

    {/* 3D capsule — large, right column */}
    <div className="absolute hidden lg:block pointer-events-none" style={{ zIndex: 2, top: "2%", right: "-2%", width: "54%", bottom: "6%" }}>
      <CapsuleScene fogColor="#0C0C0C" vignetteColor="rgba(12,12,12," dark bodyColor="#F69A1E" capColor="#FFD166" fov={44} cameraZ={5.2} />
    </div>

    {/* Mobile capsule — top, smaller */}
    <div className="block lg:hidden pointer-events-none" style={{ height: 260, marginTop: 88 }}>
      <CapsuleScene fogColor="#0C0C0C" vignetteColor="rgba(12,12,12," dark bodyColor="#F69A1E" capColor="#FFD166" fov={50} cameraZ={6} />
    </div>

    {/* Content */}
    <div className="relative flex flex-col flex-1 justify-center px-6 sm:px-10 lg:px-16 pt-4 lg:pt-28 pb-12" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="lg:max-w-[48%]">

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}>
            <Tag color="rgba(246,154,30,.65)" dark>Pharma · Personal Care · Food</Tag>
          </motion.div>

          <div className="mt-5">
            <Headline lines={[
              { text: "India's Most",   color: "#ffffff" },
              { text: "Trusted",        color: "#ffffff" },
              { text: "Ingredient",     color: "#ffffff" },
              { text: "Partner.",       color: "#F69A1E" },
            ]} size="clamp(2.2rem,6vw,5.5rem)" />
          </div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0, ease: ease1 }}
            className="mt-5 font-body leading-relaxed" style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,.5)", maxWidth: "42ch" }}>
            Scope has supplied the raw materials that go into every tablet, serum and supplement
            trusted by India's finest manufacturers — since 1959.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.12, ease: ease1 }} className="mt-7">
            <CTAPair dark />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-10">
            <Stats textColor="#F69A1E" labelColor="rgba(255,255,255,.3)" borderColor="rgba(246,154,30,.12)" />
          </motion.div>
        </div>
      </div>
    </div>

    <div className="relative h-[3px]" style={{ zIndex: 10, background: "linear-gradient(90deg,#F69A1E,#FFD166,#DB8E00,#F69A1E)" }} />
  </section>
);

// ══════════════════════════════════════════════════════════════
// VARIANT 3 — "The Heritage"
// Warm cream, large centred capsule, 1959 watermark
// ══════════════════════════════════════════════════════════════
const V3 = () => (
  <section className="relative overflow-hidden" style={{ minHeight: "100svh", background: "linear-gradient(150deg,#FFF8ED 0%,#FFFCF5 50%,#FFF3DC 100%)" }}>

    {/* Giant 1959 watermark */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 1 }}>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontWeight: 900,
        fontSize: "clamp(8rem, 22vw, 22rem)",
        color: "rgba(246,154,30,.055)",
        letterSpacing: "-0.05em",
        lineHeight: 1,
        userSelect: "none",
      }}>1959</span>
    </div>

    {/* Perspective grid */}
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "45%", zIndex: 1 }}>
      <div style={{
        position: "absolute", bottom: 0, left: "-50%", right: "-50%", height: "270%",
        transformOrigin: "bottom center", transform: "perspective(900px) rotateX(60deg)",
        backgroundImage: ["linear-gradient(rgba(246,154,30,.13) 1px,transparent 1px)","linear-gradient(90deg,rgba(246,154,30,.13) 1px,transparent 1px)"].join(","),
        backgroundSize: "54px 54px",
      }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,#FFF8ED 0%,transparent 42%)" }} />
    </div>

    {/* Layout: two-column — left text, right capsule */}
    <div className="relative flex flex-col lg:grid lg:grid-cols-2 min-h-screen" style={{ zIndex: 10 }}>

      {/* Left: text */}
      <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 lg:pt-0 pb-8 lg:pb-0">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}>
          <Tag>Since 1959 · Three Industries · One Partner</Tag>
        </motion.div>

        <div className="mt-6">
          <Headline lines={[
            { text: "65 Years of",      color: "#1a1a1a" },
            { text: "Ingredient",       color: "#1a1a1a" },
            { text: "Excellence.",      color: "#F69A1E" },
          ]} size="clamp(2.4rem, 5.5vw, 5.5rem)" />
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.85, ease: ease1 }}
          style={{ height: 2, width: 48, background: "#F69A1E", borderRadius: 2, marginTop: "1.5rem", transformOrigin: "left" }} />

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.92, ease: ease1 }}
          className="mt-4 font-body leading-relaxed" style={{ fontSize: "clamp(14px,1.3vw,16px)", color: "#6b6b6b", maxWidth: "42ch" }}>
          We are the bridge between the world's finest ingredient manufacturers and India's most
          ambitious pharma, cosmetics and food companies.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05, ease: ease1 }} className="mt-7">
          <CTAPair />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }} className="mt-10">
          <Stats />
        </motion.div>
      </div>

      {/* Right: capsule, fills entire column */}
      <div className="hidden lg:block relative" style={{ minHeight: 400 }}>
        {/* Warm amber bg for right column */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, rgba(255,243,210,.5))" }} />
        <CapsuleScene fogColor="#FFF3DC" vignetteColor="rgba(255,243,220," bodyColor="#D97B0A" capColor="#F6A820" fov={42} cameraZ={5.4} />
      </div>
    </div>

    <div className="relative h-[3px]" style={{ zIndex: 10, background: "linear-gradient(90deg,#F69A1E,#FFD166,#DB8E00,#F69A1E)" }} />
  </section>
);

// ══════════════════════════════════════════════════════════════
// VARIANT 4 — "The Modern"
// Bold oversized type, capsule overlapping text, editorial
// ══════════════════════════════════════════════════════════════
const V4 = () => (
  <section className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh", background: "#FFFFFF" }}>

    {/* Amber left accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom,transparent,#F69A1E 20%,#F69A1E 80%,transparent)" }} />

    {/* Right column warm tint */}
    <div className="absolute hidden lg:block inset-y-0 right-0 pointer-events-none" style={{ left: "52%", background: "linear-gradient(to right,transparent,rgba(255,248,237,.6))" }} />

    {/* Dot grid — right side only */}
    <div className="absolute hidden lg:block inset-y-0 right-0 overflow-hidden pointer-events-none" style={{ left: "52%", opacity: 0.05 }}>
      <svg className="w-full h-full">
        <defs><pattern id="v4-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#F69A1E" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#v4-dots)" />
      </svg>
    </div>

    {/* 3D capsule — right column */}
    <div className="absolute hidden lg:block pointer-events-none" style={{ zIndex: 2, top: "5%", right: "0%", width: "50%", bottom: "8%" }}>
      <CapsuleScene fogColor="#FFFDF9" vignetteColor="rgba(255,253,249," bodyColor="#D97B0A" capColor="#F6A820" fov={42} cameraZ={5.6} />
    </div>

    {/* Content */}
    <div className="relative flex flex-col flex-1 justify-center px-6 sm:px-12 lg:px-16 pt-28 pb-12" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="lg:max-w-[50%]">

          {/* Overline with horizontal rule */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}
            className="flex items-center gap-4 mb-6">
            <div style={{ width: 40, height: 2, background: "#F69A1E", borderRadius: 1 }} />
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#F69A1E" }}>
              Est. 1959 · Pharma · Cosmetics · Food
            </span>
          </motion.div>

          {/* Extra-large headline */}
          <Headline
            lines={[
              { text: "Where",         color: "#111111" },
              { text: "Ingredients",   color: "#111111" },
              { text: "Meet",          color: "#111111" },
              { text: "Innovation.",   color: "#F69A1E" },
            ]}
            size="clamp(2.4rem, 6.8vw, 6.2rem)"
          />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0, ease: ease1 }}
            className="mt-5 font-body leading-relaxed" style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#6b6b6b", maxWidth: "44ch" }}>
            Scope connects India's leading manufacturers with the world's finest excipients,
            actives and functional ingredients — across pharma, personal care and food.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.12, ease: ease1 }} className="mt-7">
            <CTAPair />
          </motion.div>

          {/* Stats — horizontal with dividers */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex items-stretch gap-0 divide-x"
            style={{ paddingTop: "1.5rem", borderTop: "1px solid #efefef", borderLeft: "none", divideColor: "#efefef" }}>
            {[
              { v: "65+",  l: "Years Active"     },
              { v: "400+", l: "Products Listed"  },
              { v: "50+",  l: "Global Principals"},
            ].map((s, i) => (
              <div key={i} style={{ paddingLeft: i === 0 ? 0 : "1.5rem", paddingRight: "1.5rem" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.8vw,1.85rem)", color: "#F69A1E" }}>{s.v}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#a0a0a0", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

    <div className="relative h-[3px]" style={{ zIndex: 10, background: "linear-gradient(90deg,#F69A1E,#FFD166,#DB8E00,#F69A1E)" }} />
  </section>
);

// ══════════════════════════════════════════════════════════════
// ROOT PAGE — tab navigation + variant display
// ══════════════════════════════════════════════════════════════
const VARIANTS = [
  { id: 1, label: "The Formulator", bg: "#F9F9F7", component: V1 },
  { id: 2, label: "The Pioneer",    bg: "#0C0C0C", component: V2 },
  { id: 3, label: "The Heritage",   bg: "#FFF8ED", component: V3 },
  { id: 4, label: "The Modern",     bg: "#FFFFFF", component: V4 },
];

const HeroVariants = () => {
  const [active, setActive] = useState(1);
  const ActiveVariant = VARIANTS.find(v => v.id === active)!.component;

  return (
    <div className="relative">
      {/* ── Sticky variant switcher ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 sm:px-10"
        style={{ background: "rgba(255,255,255,.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,.08)", height: 56 }}>

        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 700, color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Hero Variants
        </span>

        <div className="flex items-center gap-1">
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="relative rounded-full transition-all duration-200"
              style={{
                padding: "5px 14px",
                fontFamily: "'Sora', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: active === v.id ? "#1a1a1a" : "#888",
                background: active === v.id ? "#F69A1E" : "transparent",
              }}
            >
              {v.id}. {v.label}
            </button>
          ))}
        </div>

        <Link to="/"
          className="rounded-full px-4 py-2 font-display text-xs font-semibold transition-all hover:bg-[#FFF8ED]"
          style={{ color: "#F69A1E", border: "1.5px solid rgba(246,154,30,.3)" }}>
          ← Back to site
        </Link>
      </div>

      {/* ── Active variant, full screen, padded below nav ── */}
      <div style={{ paddingTop: 56 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveVariant />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroVariants;
