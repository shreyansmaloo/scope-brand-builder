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
    <span ref={ref} className="font-display text-4xl font-extrabold text-accent lg:text-5xl">
      {count}
      {suffix}
    </span>
  );
};

const StatsBand = () => {
  return (
    <section className="bg-primary">
      <div className="container-scope py-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center lg:border-r lg:border-primary-muted/20 lg:last:border-r-0"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <span className="mt-2 font-body text-sm text-primary-foreground/60">
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
