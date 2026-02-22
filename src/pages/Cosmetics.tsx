import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Sparkles, FlaskConical, Shield, Sun, Palette, Waves, Beaker } from "lucide-react";
import { getPartnersByVertical } from "@/data/partners";
import heroCosmetics from "@/assets/hero-cosmetics.jpg";

const categories = [
  { icon: Droplets, name: "Emollients", desc: "Natural and synthetic skin-conditioning agents" },
  { icon: Sparkles, name: "Actives", desc: "Anti-aging, brightening, and functional actives" },
  { icon: FlaskConical, name: "Emulsifiers", desc: "O/W and W/O emulsion systems" },
  { icon: Beaker, name: "Polymers", desc: "Thickeners and rheology modifiers" },
  { icon: Shield, name: "Preservatives", desc: "Broad-spectrum antimicrobial systems" },
  { icon: Sun, name: "UV Filters", desc: "Organic and inorganic sun protection" },
  { icon: Palette, name: "Pigments", desc: "Color cosmetic ingredients" },
  { icon: Waves, name: "Surfactants", desc: "Mild and effective cleansing agents" },
];

const Cosmetics = () => {
  const cosPartners = getPartnersByVertical("cosmetics");

  return (
    <main>
      <section className="relative bg-primary pt-32 pb-20">
        <img src={heroCosmetics} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="container-scope relative">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Cosmetics
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Cosmetic Ingredients
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            High-performance actives, emollients and specialty ingredients for modern personal care formulations
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Explore by Category</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card-scope group p-6">
                <cat.icon className="h-8 w-8 text-teal" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{cat.desc}</p>
                <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="mt-3 inline-flex items-center gap-1 font-body text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View Products <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Cosmetic Principals</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cosPartners.map((p) => (
              <div key={p.id} className="card-scope flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal text-teal-foreground font-display text-sm font-bold">
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground">{p.name}</h4>
                  <p className="font-body text-xs text-muted-foreground">{p.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal py-16">
        <div className="container-scope text-center">
          <h2 className="font-display text-h2 font-bold text-teal-foreground">Need Technical Support?</h2>
          <p className="mt-3 font-body text-teal-foreground/80">Our cosmetics team can help with formulation development.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-card px-6 py-3 font-display text-sm font-semibold text-foreground hover:shadow-xl">
            Request Tech Support →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Cosmetics;
