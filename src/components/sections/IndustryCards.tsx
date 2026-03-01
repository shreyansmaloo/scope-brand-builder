import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";

const industries = [
  {
    title: "Pharmaceuticals",
    desc: "Excipients for every drug delivery system",
    image: industryPharma,
    href: "/pharma",
  },
  {
    title: "Cosmetics",
    desc: "Active & functional ingredients for personal care",
    image: industryCosmetics,
    href: "/cosmetics",
  },
  {
    title: "Food & Nutraceuticals",
    desc: "Ingredients for health and wellness formulations",
    image: industryFood,
    href: "/food",
  },
];

const IndustryCards = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-scope">
        <h2 className="font-display text-h2 font-bold text-foreground">
          Explore by Industry
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={ind.href}
                className="group relative block h-[350px] overflow-hidden rounded-2xl"
              >
                <img
                  src={ind.image}
                  alt={`${ind.title} industry at Scope India`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-all group-hover:from-primary/95" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-primary-foreground">
                    {ind.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-primary-foreground/70">
                    {ind.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-body text-sm font-medium text-accent transition-all group-hover:gap-2">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCards;
