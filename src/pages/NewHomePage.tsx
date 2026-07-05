import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, FlaskConical, Sparkles, Leaf, ClipboardList, Package, Microscope } from "lucide-react";
import { usePartners } from "@/context/PartnersContext";
import DNAScene from "@/components/hero/DNAScene";
import ExcipientSearch from "@/components/sections/ExcipientSearch";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";

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
  <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.25em]"
    style={{ color: "#F69A1E" }}>
    <span className="h-px w-6 bg-[#F69A1E] inline-block" />{children}
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
        background: "radial-gradient(circle, rgba(246,154,30,0.55) 0%, rgba(246,154,30,0.12) 55%, transparent 70%)",
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
  { text: "India's Premier", color: "#1a1a1a" },
  { text: "Ingredient", color: "#1a1a1a" },
  { text: "Partner.", color: "#F69A1E" },
];

const ease1: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ease2: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if the viewport is mobile-ish
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;

    const canvas = mobileCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Handle container resize nicely
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 38; // Optimal count for smooth mobile performance

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.68 ? "rgba(246, 154, 30, 0.22)" : "rgba(100, 116, 139, 0.10)",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connection lines (bonds)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(246, 154, 30, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "100svh", background: "linear-gradient(150deg,#FFF8ED 0%,#FFFCF7 45%,#FFF3DC 100%)" }}
    >
      {/* ── Perspective grid floor ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none" style={{ height: "46%" }}>
        <div style={{
          position: "absolute", bottom: 0,
          left: "-50%", right: "-50%", height: "280%",
          transformOrigin: "bottom center",
          transform: "perspective(900px) rotateX(60deg)",
          backgroundImage: [
            "linear-gradient(rgba(246,154,30,.14) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(246,154,30,.14) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #FFF8ED 0%, transparent 40%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #FFF8ED 0%, transparent 20%, transparent 80%, #FFF8ED 100%)" }} />
      </div>

      {/* ── Dot grid texture ── */}
      <svg className="absolute inset-0 w-full h-full z-[1] opacity-[0.04] pointer-events-none">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="rgb(246,154,30)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* ── Dynamic background glows (Mobile-only) ── */}
      <div className="absolute inset-0 overflow-hidden lg:hidden pointer-events-none z-[1]">
        {/* Soft amber glow top-right */}
        <div
          className="nh-glow-1 absolute rounded-full"
          style={{
            top: "-12%",
            right: "-12%",
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle, rgba(246,154,30,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Soft green glow mid-left */}
        <div
          className="nh-glow-2 absolute rounded-full"
          style={{
            top: "28%",
            left: "-20%",
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Soft blue glow bottom-right */}
        <div
          className="nh-glow-1 absolute rounded-full"
          style={{
            bottom: "8%",
            right: "-15%",
            width: "260px",
            height: "260px",
            background: "radial-gradient(circle, rgba(91,141,239,0.09) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
      </div>

      {/* ── Mobile-only Benzene ring SVG background decoration ── */}
      <svg className="nh-hex-spin absolute z-[2] lg:hidden pointer-events-none"
        style={{ top: "12%", right: "6%", width: 68, height: 68, opacity: 0.12 }}
        viewBox="0 0 100 100">
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="none" stroke="#F69A1E" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#F69A1E" strokeWidth="1.5" strokeDasharray="3 3" />
        {([[50, 6], [88, 28], [88, 72], [50, 94], [12, 72], [12, 28]] as [number, number][]).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#F69A1E" />
        ))}
        <circle cx="50" cy="50" r="4.5" fill="rgba(246,154,30,.8)" />
      </svg>

      {/* ── Lightweight Mobile Particle Canvas ── */}
      <canvas
        ref={mobileCanvasRef}
        className="absolute inset-0 z-[2] lg:hidden pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* ── Warm glow behind 3D scene (desktop) ── */}
      <div className="absolute hidden lg:block inset-0 z-[1] pointer-events-none" style={{
        background: "radial-gradient(ellipse 52% 68% at 76% 46%, rgba(246,154,30,.13) 0%, transparent 68%)",
      }} />

      {/* ── R3F DNA scene — desktop only, interactive ── */}
      <div className="absolute hidden lg:block z-[3]" style={{
        top: "0%", right: "0%", width: "52%", bottom: "0%",
      }}>
        <DNAScene fogColor="#FFF8ED" vignetteColor="rgba(255,248,237," />
      </div>

      {/* ── Benzene ring SVG — md+ ── */}
      <svg className="nh-hex-spin absolute z-[2] hidden md:block"
        style={{ top: "8%", left: "3%", width: 108, height: 108, opacity: 0.22 }}
        viewBox="0 0 100 100">
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="none" stroke="#F69A1E" strokeWidth="2" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#F69A1E" strokeWidth="1.2" strokeDasharray="4 3" />
        {([[50, 6], [88, 28], [88, 72], [50, 94], [12, 72], [12, 28]] as [number, number][]).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#F69A1E" />
        ))}
        <circle cx="50" cy="50" r="4" fill="rgba(246,154,30,.8)" />
      </svg>

      {/* ── Ball-and-stick molecule SVG — lg+ ── */}
      <svg className="nh-float-slow absolute z-[2] hidden lg:block"
        style={{ top: "44%", left: "1.5%", width: 92, height: 74, opacity: 0.18 }}
        viewBox="0 0 100 80">
        <circle cx="50" cy="40" r="8" fill="#F69A1E" />
        <line x1="50" y1="40" x2="18" y2="16" stroke="#F69A1E" strokeWidth="2.5" /><circle cx="18" cy="16" r="6" fill="#F69A1E" opacity="0.75" />
        <line x1="50" y1="40" x2="82" y2="16" stroke="#F69A1E" strokeWidth="2.5" /><circle cx="82" cy="16" r="6" fill="#F69A1E" opacity="0.75" />
        <line x1="50" y1="40" x2="18" y2="64" stroke="#F69A1E" strokeWidth="2.5" /><circle cx="18" cy="64" r="6" fill="#F69A1E" opacity="0.75" />
        <line x1="50" y1="40" x2="82" y2="64" stroke="#F69A1E" strokeWidth="2.5" /><circle cx="82" cy="64" r="6" fill="#F69A1E" opacity="0.75" />
        <line x1="50" y1="40" x2="50" y2="8" stroke="#F69A1E" strokeWidth="2" />
        <circle cx="50" cy="6" r="5.5" fill="#FFD166" />
      </svg>

      {/* ── Polymer chain SVG — lg+ ── */}
      <svg className="nh-float absolute z-[2] hidden lg:block"
        style={{ bottom: "20%", left: "5%", width: 120, height: 36, opacity: 0.15 }}
        viewBox="0 0 120 36">
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <circle cx={12 + i * 24} cy="18" r="7" fill="#F69A1E" />
            {i < 4 && <line x1={19 + i * 24} y1="18" x2={36 + i * 24} y2="18" stroke="#F69A1E" strokeWidth="2.5" />}
          </g>
        ))}
      </svg>

      {/* ── Medium CSS sphere — bottom left, lg+ ── */}
      <div className="nh-float absolute z-[2] hidden lg:block" style={{
        width: 128, height: 128, bottom: "13%", left: "0.5%",
        borderRadius: "50%",
        background: "radial-gradient(circle at 36% 30%, rgba(255,232,165,.98), rgba(246,154,30,.85), rgba(115,48,0,.5))",
        boxShadow: ["inset -6px -8px 20px rgba(0,0,0,.22)", "inset 4px 5px 12px rgba(255,240,150,.52)", "0 20px 50px rgba(246,154,30,.26)"].join(","),
        opacity: 0.66, animationDelay: "1.2s",
      }} />

      {/* ── Glowing atom dots — md+ ── */}
      {([
        { t: "21%", l: "30%", w: 10, d: "0s" },
        { t: "64%", l: "74%", w: 8, d: "1.4s" },
        { t: "14%", l: "60%", w: 7, d: "0.7s" },
        { t: "74%", l: "42%", w: 9, d: "1.8s" },
      ]).map((p, i) => (
        <div key={i} className="nh-dot-float absolute z-[2] rounded-full hidden md:block" style={{
          width: p.w, height: p.w, top: p.t, left: p.l,
          background: "radial-gradient(circle, rgba(246,154,30,.75), rgba(246,154,30,.20))",
          boxShadow: "0 0 10px rgba(246,154,30,.45)",
          animationDelay: p.d,
        }} />
      ))}

      {/* ── Film grain ── */}
      <svg className="absolute inset-0 w-full h-full z-[2] opacity-[0.028] pointer-events-none">
        <filter id="nh-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nh-grain)" />
      </svg>

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col flex-1 justify-center px-5 sm:px-8 lg:px-16 pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto">

          {/* Text column — full width on mobile, left 52% on desktop */}
          <div className="lg:max-w-[52%]">

            {/* Eyebrow — premium glassmorphic pill layout */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: ease1 }}
              className="flex justify-start">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(246,154,30,0.22)] bg-[rgba(255,255,255,0.45)] backdrop-blur-md shadow-[0_2px_12px_rgba(246,154,30,0.05)]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69A1E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F69A1E]"></span>
                </span>
                <span 
                  className="font-display text-[9.5px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "#D97B0A" }}
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
                      fontSize: "clamp(2.3rem, 7.5vw, 6.8rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      color: line.color === "#F69A1E" ? undefined : line.color,
                      backgroundImage: line.color === "#F69A1E" ? "linear-gradient(135deg, #F69A1E 0%, #DB8E00 100%)" : undefined,
                      WebkitBackgroundClip: line.color === "#F69A1E" ? "text" : undefined,
                      WebkitTextFillColor: line.color === "#F69A1E" ? "transparent" : undefined,
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
              style={{ height: 2, width: 64, background: "linear-gradient(90deg, #F69A1E, rgba(246,154,30,0.15))", borderRadius: 2, marginTop: "1.5rem", transformOrigin: "left" }} />

            {/* Body */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.88, ease: ease1 }}
              className="font-body leading-relaxed mt-5"
              style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#6b6b6b", maxWidth: "46ch" }}>
              From the excipient in every tablet to the active behind every skincare glow
              and the fibre in your morning supplement — Scope has been the silent partner
              in India's finest formulations for over 65 years.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.02, ease: ease1 }}
              className="mt-7 flex flex-row flex-wrap gap-3">
              <Link to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full font-display text-[13px] font-bold text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(246,154,30,0.46)] active:scale-[0.97]"
                style={{ padding: "13px 24px", background: "linear-gradient(135deg,#F69A1E,#FFD166 55%,#F69A1E)", backgroundSize: "200% 200%" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundPosition = "100% 0")}
                onMouseLeave={e => (e.currentTarget.style.backgroundPosition = "0% 0")}>
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/principals"
                className="group inline-flex items-center justify-center gap-2 rounded-full font-display text-[13px] font-semibold transition-all duration-300 hover:bg-[#FFF8ED] hover:border-[rgba(246,154,30,.55)]"
                style={{ padding: "13px 24px", color: "#494949", border: "1.5px solid rgba(246,154,30,.32)", background: "rgba(255,255,255,.9)" }}>
                Our Partners
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

          </div>

          {/* Stats row + scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-6 lg:gap-4"
            style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(246,154,30,.14)" }}>

            <div className="w-full lg:w-auto">
              <div 
                className="grid grid-cols-3 gap-2 px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border border-[rgba(255,255,255,0.65)] sm:border-[rgba(246,154,30,0.15)] bg-[rgba(255,255,255,0.42)] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] lg:bg-transparent lg:border-none lg:p-0 lg:backdrop-blur-none lg:shadow-none"
              >
                {[
                  { v: "65+", l: "Years", sub: "Est. 1959" },
                  { v: "400+", l: "Products", sub: "3 industries" },
                  { v: "50+", l: "Principals", sub: "Global brands" },
                ].map((s, idx) => (
                  <div key={s.l} className="flex flex-col items-center lg:items-start text-center lg:text-left relative">
                    {/* Vertical divider on mobile */}
                    {idx > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-[rgba(246,154,30,0.18)] lg:hidden" />
                    )}
                    <div 
                      className="font-display font-black leading-none bg-gradient-to-br from-[#F69A1E] to-[#DB8E00] bg-clip-text text-transparent lg:text-[#F69A1E] lg:bg-none"
                      style={{ fontSize: "clamp(1.4rem, 4.2vw, 1.9rem)" }}
                    >
                      {s.v}
                    </div>
                    <div className="font-display font-semibold mt-1" style={{ fontSize: "clamp(10px, 1.2vw, 13px)", color: "#1a1a1a" }}>{s.l}</div>
                    <div className="font-body mt-0.5 hidden sm:block" style={{ fontSize: 10, color: "#9e9e9e" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator — desktop only */}
            <div className="hidden lg:flex flex-col items-center gap-2 shrink-0">
              <div className="font-display" style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3em", color: "#c0c0c0", writingMode: "vertical-lr" }}>Scroll</div>
              <div style={{ width: 1, height: 44, background: "#e8e8e8", borderRadius: 1, overflow: "hidden", position: "relative" }}>
                <div className="nh-scroll-line" style={{ position: "absolute", inset: 0, background: "#F69A1E", borderRadius: 1 }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Amber bottom rule */}
      <div className="relative z-10 h-[3px] nh-grad"
        style={{ background: "linear-gradient(90deg,#F69A1E,#FFD166,#DB8E00,#F69A1E)", backgroundSize: "300% 100%" }} />
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// TICKER
// ═══════════════════════════════════════════════════════════════
const TICKER = ["Since 1959", "·", "Pharmaceutical", "·", "Personal Care", "·", "Food & Nutra", "·",
  "50+ Global Partners", "·", "400+ Products", "·", "Pan-India Network", "·", "Three Industries One Partner"];

const Ticker = () => (
  <div className="overflow-hidden py-4 flex items-center" style={{ background: "#F69A1E" }}>
    <div className="animate-marquee-left flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
      {[...TICKER, ...TICKER].map((w, i) => (
        <span key={i}
          className="font-display text-sm font-bold uppercase tracking-wider shrink-0"
          style={{ color: w === "·" ? "rgba(0,0,0,.3)" : "#1a1a1a" }}>
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
    href: "/products?industry=pharma", img: industryPharma, accent: "#DB8E00",
  },
  {
    id: "cosmetics", Icon: Sparkles, label: "Personal Care & Derma",
    headline: "Behind Every Glow",
    desc: "The radiant skin, the luxurious lather, the colour that stays — behind every beauty moment is a world-class active ingredient. We bring those ingredients to India.",
    href: "/products?industry=cosmetics", img: industryCosmetics, accent: "#F69A1E",
  },
  {
    id: "food", Icon: Leaf, label: "Food & Nutraceuticals",
    headline: "Nourishing Every Body",
    desc: "From the prebiotic fibre in your morning smoothie to the plant protein in your health bar — functional food ingredients that make wellness delicious.",
    href: "/products?industry=food", img: industryFood, accent: "#4CAF50",
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
          style={{ height: "clamp(320px,52vh,580px)", boxShadow: "0 24px 80px rgba(0,0,0,.14)" }}>
          <img src={ind.img} alt={ind.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {/* Gradient only at the bottom for label readability */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,10,10,.72) 0%, rgba(10,10,10,.15) 35%, transparent 60%)" }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at center bottom, ${ind.accent}28 0%, transparent 60%)` }} />
          {/* Industry name — bottom left */}
          <div className="absolute bottom-6 left-7">
            <span className="font-display text-[1.1rem] font-bold tracking-wide" style={{ color: "#ffffff" }}>
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
  <section className="py-16 lg:py-36 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="mb-12 lg:flex items-end justify-between gap-8">
        <div>
          <motion.div variants={fadeUp}><Tag>What We Supply</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#1a1a1a" }}>
            Three Verticals.<br />
            <span style={{ color: "#F69A1E" }}>Infinite Possibilities</span>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp}
          className="mt-4 lg:mt-0 font-body text-[15px] leading-relaxed max-w-[38ch]"
          style={{ color: "#6b6b6b" }}>
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
        style={{ display: "flex", gap: "1rem", width: "max-content" }}>
        {[...items, ...items].map((p, i) => (
          <Link key={`${p.id}-${i}`} to={`/principals/${p.id}`}
            className="flex-shrink-0 flex items-center justify-center rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(246,154,30,.4)] hover:shadow-[0_8px_28px_rgba(246,154,30,.12)] p-3"
            style={{ width: 200, height: 88, borderColor: "rgba(0,0,0,.07)" }}>
            {p.logo ? (
              <img src={p.logo.startsWith("data:") ? p.logo : `/logos/${p.logo}`} alt={p.name}
                className="w-full h-full object-contain"
                style={{ mixBlendMode: "multiply" }}
                onError={e => {
                  e.currentTarget.style.display = "none";
                  const span = document.createElement("span");
                  span.className = "font-display text-[11px] font-semibold text-center px-3";
                  span.style.color = "#6b6b6b";
                  span.textContent = p.name;
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            ) : (
              <span className="font-display text-[11px] font-semibold text-center px-3"
                style={{ color: "#6b6b6b" }}>{p.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden py-16 lg:py-32" style={{ background: "#FAFAF8" }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
        style={{ background: "linear-gradient(to right, #FAFAF8, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
        style={{ background: "linear-gradient(to left, #FAFAF8, transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="text-center">
          <motion.div variants={fadeUp}><Tag>Our Global Family</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold"
            style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#1a1a1a" }}>
            Backed by the World's Best
          </motion.h2>
          <motion.p variants={fadeUp}
            className="font-body text-[15px] max-w-[42ch] mx-auto mt-3"
            style={{ color: "#6b6b6b" }}>
            Exclusive Indian representation for 50+ globally renowned ingredient manufacturers —
            each chosen for quality, innovation, and reliability.
          </motion.p>
        </motion.div>
      </div>
      <div className="space-y-4">
        {renderRow(row1, "left")}
        {renderRow(row2, "right")}
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-10 flex justify-center">
        <Link to="/principals"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display text-sm font-semibold transition-all duration-200 hover:border-[#F69A1E] hover:text-[#F69A1E]"
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
  { src: u("1584308666744-24d5c474f2ae", 700), caption: "Pharmaceutical" },
  { src: u("1556228578-8c89e6adf883", 700), caption: "Skincare Actives" },
  { src: u("1532187863486-abf9dbad1b69", 700), caption: "R&D Lab" },
  { src: u("1490818387583-1baba5e638af", 700), caption: "Nutraceuticals" },
  { src: u("1596040033229-a9821ebd058d", 700), caption: "Spice & Colour" },
  { src: u("1470058869958-2a77ade41c02", 700), caption: "Herbal Extracts" },
];
const GALLERY_ROW2 = [
  { src: u("1522335789203-aabd1fc54bc9", 700), caption: "Personal Care" },
  { src: u("1544161515-4ab6ce6db874", 700), caption: "Wellness" },
  { src: u("1500382017468-9049fed747ef", 700), caption: "Natural Origin" },
  { src: u("1497366216548-37526070297c", 700), caption: "Innovation Lab" },
  { src: u("1584308666744-24d5c474f2ae", 700), caption: "Formulation Science" },
  { src: u("1470058869958-2a77ade41c02", 700), caption: "Botanical Extracts" },
];

const GalleryCard = ({ src, caption }: { src: string; caption: string }) => (
  <div
    className="group relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer"
    style={{ width: 280, height: 340, boxShadow: "0 8px 28px rgba(0,0,0,.10)" }}>
    <img src={src} alt={caption}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: "linear-gradient(to top, rgba(246,154,30,.28) 0%, transparent 60%)" }} />
    <div className="absolute bottom-4 left-4">
      <span className="font-display text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,.75)" }}>{caption}</span>
    </div>
  </div>
);

const GallerySection = () => (
  <section className="py-16 lg:py-32 bg-white overflow-hidden">
    {/* Header */}
    <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="lg:flex items-end justify-between gap-8">
        <div>
          <motion.div variants={fadeUp}><Tag>Visual Journey</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#1a1a1a" }}>
            Where Ingredients<br />
            <span style={{ color: "#F69A1E" }}>Meet Life</span>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp}
          className="font-body text-[15px] leading-relaxed max-w-[38ch]"
          style={{ color: "#6b6b6b" }}>
          Across three industries, one constant — the highest quality ingredients
          that transform what's possible.
        </motion.p>
      </motion.div>
    </div>

    {/* Single-row marquee */}
    <div className="relative">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />

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
      style={{ background: "linear-gradient(160deg,#FCFDF8 0%,#FFF8ED 100%)" }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(246,154,30,.08) 0%,transparent 70%)", filter: "blur(80px)" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
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
                boxShadow: "0 40px 100px rgba(0,0,0,.15), 0 0 0 1px rgba(246,154,30,.12)",
              }}>
              <motion.img src={featureImg} alt="Since 1959"
                style={{ y: imgY, position: "absolute", inset: 0, width: "100%", height: "115%", objectFit: "cover" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(246,154,30,.15) 0%, transparent 50%)" }} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="nh-float hidden lg:block absolute -bottom-4 -left-4 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,.95)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(246,154,30,.2)",
                boxShadow: "0 16px 56px rgba(246,154,30,.18)",
              }}>
              <p className="font-display text-[9px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: "#F69A1E" }}>Established</p>
              <p className="font-display text-3xl font-black leading-none" style={{ color: "#1a1a1a" }}>1959</p>
              <p className="font-body text-[11px] mt-1" style={{ color: "#a0a0a0" }}>65+ years of excellence</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="hidden lg:block absolute -top-5 -right-4 rounded-xl px-5 py-3.5"
              style={{
                background: "linear-gradient(135deg,#F69A1E,#FFD166)",
                boxShadow: "0 12px 40px rgba(246,154,30,.4)",
              }}>
              <p className="font-display text-2xl font-black leading-none" style={{ color: "#1a1a1a" }}>400+</p>
              <p className="font-body text-[11px] mt-0.5" style={{ color: "rgba(26,26,26,.65)" }}>Active Products</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="order-2 lg:order-2">
            <motion.div variants={fadeUp}><Tag>Our Legacy</Tag></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-4 font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1a1a1a" }}>
              Six Decades of<br />
              <span style={{ color: "#F69A1E" }}>Ingredient Excellence</span>
            </motion.h2>
            <motion.p variants={fadeUp}
              className="mt-5 font-body text-[15px] leading-relaxed max-w-[46ch]"
              style={{ color: "#6b6b6b" }}>
              Since 1959, Scope has been the bridge between the world's finest ingredient
              manufacturers and India's most ambitious product makers. We don't just distribute —
              we partner, advise, and grow together.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
              {PILLARS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[14px]" style={{ color: "#6b6b6b" }}>
                  <span className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(246,154,30,.15)", color: "#F69A1E" }}>
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
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display text-sm font-bold text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(246,154,30,.45)]"
                style={{ background: "linear-gradient(135deg,#F69A1E,#FFD166)" }}>
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
  <section className="relative overflow-hidden py-16 lg:py-36" style={{ background: "#F8F7F4" }}>
    {/* Subtle amber dot texture */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{ backgroundImage: "radial-gradient(#F69A1E 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── Left: headline + CTA ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}><Tag>Try Before You Buy</Tag></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#1a1a1a" }}>
            Request an Ingredient<br />
            <span style={{ color: "#F69A1E" }}>Sample</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="mt-5 font-body text-[15px] leading-relaxed max-w-[44ch]"
            style={{ color: "#6b6b6b" }}>
            Evaluate any ingredient from our portfolio before committing to a bulk order.
            We ship samples to R&amp;D labs across India — typically within 48 hours.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 items-center">
            <Link to="/request-sample"
              className="group inline-flex items-center gap-2.5 rounded-full font-display text-[13px] font-bold text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(246,154,30,.42)] active:scale-[0.97]"
              style={{ padding: "14px 28px", background: "linear-gradient(135deg,#F69A1E,#FFD166 55%,#F69A1E)", backgroundSize: "200% 200%" }}>
              Request a Sample
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-colors"
              style={{ color: "#6b6b6b" }}>
              Browse catalogue <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp}
            className="mt-10 flex flex-wrap gap-5 pt-8"
            style={{ borderTop: "1px solid rgba(246,154,30,.18)" }}>
            {["48-hr dispatch", "No minimum quantity", "Pharma-grade packaging", "Pan-India delivery"].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium"
                style={{ color: "#6b6b6b" }}>
                <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#F69A1E" }} />
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
              className="group flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(246,154,30,.10)]"
              style={{ background: "#fff", border: "1px solid rgba(246,154,30,.14)" }}>
              {/* Step number + icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                  style={{ background: "rgba(246,154,30,.12)", border: "1px solid rgba(246,154,30,.25)" }}>
                  <Icon className="h-5 w-5" style={{ color: "#F69A1E" }} />
                </div>
                <span className="font-display text-[10px] font-black tracking-widest" style={{ color: "rgba(246,154,30,.45)" }}>
                  {step}
                </span>
              </div>
              {/* Text */}
              <div>
                <h3 className="font-display text-[15px] font-bold mb-1.5" style={{ color: "#1a1a1a" }}>{label}</h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: "#6b6b6b" }}>{desc}</p>
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
      style={{ background: "linear-gradient(135deg,#F69A1E 0%,#FFD166 50%,#DB8E00 100%)", backgroundSize: "200% 200%" }} />
    <div className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }} />
    <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle,rgba(255,255,255,.2) 0%,transparent 70%)", filter: "blur(60px)" }} />
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        <motion.span variants={fadeUp}
          className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] mb-6"
          style={{ color: "rgba(26,26,26,.55)" }}>
          <span className="h-px w-6 inline-block bg-current" />Get Started Today
        </motion.span>
        <motion.h2 variants={fadeUp}
          className="font-display font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1a1a1a" }}>
          Ready to Source<br />with Confidence?
        </motion.h2>
        <motion.p variants={fadeUp}
          className="font-body text-base leading-relaxed max-w-[44ch] mx-auto mb-10"
          style={{ color: "rgba(26,26,26,.6)" }}>
          Connect with our technical sales team for product catalogues, samples,
          and formulation guidance — we respond within 24 hours.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact"
            className="group flex items-center gap-2 px-9 py-4 rounded-full font-display text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.25)] active:scale-[0.97]"
            style={{ background: "#1a1a1a", color: "#F69A1E" }}>
            Contact Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/request-sample"
            className="group flex items-center gap-2 px-9 py-4 rounded-full font-display text-sm font-bold transition-all duration-300 hover:bg-black/10"
            style={{ color: "#1a1a1a", border: "2px solid rgba(26,26,26,.25)", background: "rgba(26,26,26,.06)" }}>
            Request a Sample <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
      <PartnersSection />
      <IndustriesSection />
      <ExcipientSearch />
      <FeatureSection />
      <GallerySection />
      <RequestSampleSection />
      <CTASection />
    </main>
  </>
);

export default NewHomePage;
