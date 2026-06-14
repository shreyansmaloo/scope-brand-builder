import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 175, suffix: "+", unit: "Years", label: "Combined team expertise across pharma, personal care & food" },
  { value: 50,  suffix: "+", unit: "Global", label: "Exclusive principal partnerships with world-leading manufacturers" },
  { value: 5,   suffix: "",  unit: "Metro",  label: "City offices and temperature-controlled warehouses across India" },
  { value: 400, suffix: "+", unit: "Products", label: "Pharmaceutical, cosmetic and food-grade ingredients in active portfolio" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsBand = () => (
  <section className="relative overflow-hidden bg-surface-dark py-20 lg:py-28">
    {/* Subtle dot texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
    />

    <div className="container-scope relative z-10">
      {/* Eyebrow rule */}
      <div className="mb-14 flex items-center gap-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          Scope by the Numbers
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 divide-white/10 divide-x divide-y lg:divide-y-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col gap-4 px-8 py-8"
          >
            <div className="font-display text-5xl font-black text-primary xl:text-6xl">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-white/25">{stat.unit}</p>
              <p className="mt-1.5 max-w-[22ch] font-body text-sm leading-snug text-white/50 transition-colors group-hover:text-white/70">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBand;
