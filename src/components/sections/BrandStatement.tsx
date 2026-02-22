import { motion } from "framer-motion";
import { FlaskConical, Sparkles, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: FlaskConical,
    title: "Pharma Excipients",
    desc: "Solid, Liquid, Topical & Specialty Dosage Forms",
    href: "/pharma",
    color: "border-l-accent",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Ingredients",
    desc: "Personal Care, Derma & Functional Actives",
    href: "/cosmetics",
    color: "border-l-teal",
  },
  {
    icon: Leaf,
    title: "Food Ingredients",
    desc: "Health, Wellness & Functional Food Solutions",
    href: "/food",
    color: "border-l-accent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const BrandStatement = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-scope">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-tag">✦ Who We Are</span>
          <h2 className="mt-6 font-display text-h1 font-bold text-foreground">
            India's Most Comprehensive
            <br />
            Excipient Partner
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
            From pharmaceutical binders to cosmetic emollients and food-grade functional ingredients — Scope
            Ingredients has been the trusted bridge between world-class global manufacturers and Indian
            formulators since 1959.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={item}>
              <Link
                to={card.href}
                className={`card-scope group flex flex-col border-l-4 ${card.color} p-6`}
              >
                <card.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-sm text-text-secondary">
                  {card.desc}
                </p>
                <span className="mt-4 inline-flex items-center font-body text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStatement;
