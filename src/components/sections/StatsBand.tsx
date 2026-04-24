import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 400, suffix: "+", label: "Products in Portfolio" },
  { value: 65, suffix: "+", label: "Years of Legacy" },
  { value: 175, suffix: "", label: "Years Collective Experience" },
  { value: 5, suffix: "", label: "Metro City Offices" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-primary-foreground lg:text-5xl">
      {count}
      {suffix}
    </span>
  );
};

const StatsBand = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-90" />
      <div className="container-scope relative z-10">
        <div className="flex -mx-4 px-4 overflow-x-auto gap-8 pb-4 lg:grid lg:grid-cols-4 lg:mx-0 lg:px-0 lg:pb-0 scrollbar-hide snap-x snap-mandatory">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex min-w-[160px] flex-shrink-0 snap-center flex-col items-center text-center lg:min-w-0 lg:flex-shrink lg:border-r lg:border-primary-foreground/20 lg:last:border-r-0"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <span className="mt-2 font-body text-sm font-medium text-primary-foreground/90">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
