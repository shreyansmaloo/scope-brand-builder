import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tablet, Droplets, Pipette, Wind, Syringe, Eye, Star, Layers } from "lucide-react";

const dosageForms = [
  { icon: Tablet, title: "Solid Orals", desc: "Binders, Fillers, Disintegrants, Lubricants, Coatings", href: "/products?form=Powder", color: "bg-accent/10 text-accent" },
  { icon: Droplets, title: "Liquid Orals", desc: "Suspending agents, Sweeteners, Viscosity modifiers", href: "/products?form=Liquid", color: "bg-teal/10 text-teal" },
  { icon: Pipette, title: "Topicals", desc: "Emollients, Emulsifiers, Thickeners, Film formers", href: "/cosmetics", color: "bg-accent/10 text-accent" },
  { icon: Syringe, title: "Parenterals", desc: "Solubilizers, Tonicity agents, Stabilizers", href: "/pharma#parenterals", color: "bg-teal/10 text-teal" },
  { icon: Wind, title: "Inhalation", desc: "Carrier lactose, Dispersing agents", href: "/pharma#inhalation", color: "bg-accent/10 text-accent" },
  { icon: Eye, title: "Ophthalmic & Otic", desc: "Viscosity enhancers, Preservatives, Buffers", href: "/pharma#ophthalmic", color: "bg-teal/10 text-teal" },
  { icon: Star, title: "ODT / MUPS", desc: "Co-processed excipients for specialty delivery", href: "/pharma#odt", color: "bg-accent/10 text-accent" },
  { icon: Layers, title: "Coatings", desc: "Film coatings, Enteric coatings, Sugar coatings", href: "/products?dosageForm=Coatings", color: "bg-teal/10 text-teal" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const BrandStatement = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-scope">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left text block */}
          <div className="lg:w-2/5 lg:sticky lg:top-28">
            <span className="section-tag">✦ Explore by Form</span>
            <h2 className="mt-6 font-display text-h2 font-bold text-foreground">
              Solutions for Every Dosage Form
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
              From solid oral tablets to injectable parenterals — find the right excipient
              for your formulation across all major dosage categories.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-lg"
            >
              View Full Catalog →
            </Link>
          </div>

          {/* Right scrollable cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex-1 grid grid-cols-2 gap-3 lg:grid-cols-1"
          >
            {dosageForms.map((form) => (
              <motion.div key={form.title} variants={item}>
                <Link
                  to={form.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 transition-all hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(13,33,55,0.1)] sm:flex-row sm:gap-5 sm:p-5"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${form.color}`}>
                    <form.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 text-center sm:text-left overflow-hidden">
                    <h3 className="font-display text-xs font-semibold text-foreground group-hover:text-accent transition-colors sm:text-sm">
                      {form.title}
                    </h3>
                    <p className="mt-0.5 font-body text-[10px] text-muted-foreground line-clamp-1 sm:text-xs">
                      {form.desc}
                    </p>
                  </div>
                  <span className="hidden font-body text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:block">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
