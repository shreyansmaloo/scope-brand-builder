import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Pill, Sparkles, Leaf } from "lucide-react";
import industryPharma from "@/assets/industry-pharma.jpg";
import industryCosmetics from "@/assets/industry-cosmetics.jpg";
import industryFood from "@/assets/industry-food.jpg";

const industries = [
  {
    title: "Pharmaceuticals",
    subtitle: "Excipient Excellence",
    desc: "Comprehensive solutions for oral, liquid, and topical dosage forms with global principal support.",
    image: industryPharma,
    href: "/pharma",
    icon: <Pill className="h-6 w-6" />,
    color: "bg-accent", // Deep Orange
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    title: "Cosmetics",
    subtitle: "Personal Care",
    desc: "Innovative actives and functional ingredients for skin, hair, and body care formulations.",
    image: industryCosmetics,
    href: "/cosmetics",
    icon: <Sparkles className="h-6 w-6" />,
    color: "bg-primary", // Orange
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "Food & Nutraceuticals",
    subtitle: "Health & Wellness",
    desc: "Quality stabilizers, sweeteners, and functional ingredients for health and wellness.",
    image: industryFood,
    href: "/food",
    icon: <Leaf className="h-6 w-6" />,
    color: "bg-teal", // Golden Yellow
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
];

const IndustryCards = () => {
  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container-scope">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-tag">✦ Industry Expertise</span>
            <h2 className="mt-6 font-display text-h1 font-bold text-foreground leading-tight">
              A Diverse Portfolio of <span className="text-accent italic">Excipient</span> Solutions
            </h2>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center gap-2 font-display text-sm font-bold text-accent"
          >
            Explore Full Catalog <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:auto-rows-[250px] lg:auto-rows-[300px] md:overflow-visible md:snap-none md:pb-0">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`w-[85%] h-[350px] md:h-auto md:w-auto shrink-0 snap-center sm:w-[400px] group relative overflow-hidden rounded-[2.5rem] ${ind.colSpan} ${ind.rowSpan} card-scope border-none`}
            >
              <img
                src={ind.image}
                alt={`${ind.title} industry at Scope India`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay for high contrast instead of primary color */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/95 via-surface-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${ind.color} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {ind.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">{ind.subtitle}</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white lg:text-3xl">
                  {ind.title}
                </h3>
                <p className="mt-3 max-w-sm font-body text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {ind.desc}
                </p>
                
                <Link
                  to={ind.href}
                  className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-white hover:text-surface-dark"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCards;
