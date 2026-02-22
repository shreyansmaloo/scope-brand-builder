import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Beaker, Droplets, FlaskConical, Apple, Pill, Gem, Zap } from "lucide-react";
import { getPartnersByVertical } from "@/data/partners";
import heroFood from "@/assets/hero-food.jpg";

const categories = [
  { icon: Beaker, name: "Stabilizers", desc: "Gums and hydrocolloids for texture and stability" },
  { icon: Droplets, name: "Thickeners", desc: "Viscosity modifiers for beverages and sauces" },
  { icon: FlaskConical, name: "Emulsifiers", desc: "Lecithins and mono-diglycerides" },
  { icon: Apple, name: "Sweeteners", desc: "Natural and artificial sweetening systems" },
  { icon: Pill, name: "Vitamins", desc: "Fortification-grade vitamins and premixes" },
  { icon: Gem, name: "Minerals", desc: "Calcium, zinc, iron and trace minerals" },
  { icon: Zap, name: "Functional Actives", desc: "Botanical extracts and bioactive ingredients" },
];

const Food = () => {
  const foodPartners = getPartnersByVertical("food");

  return (
    <main>
      <section className="relative bg-primary pt-32 pb-20">
        <img src={heroFood} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="container-scope relative">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Food Ingredients
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Food Ingredients
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Quality food-grade excipients, stabilizers and functional ingredients for health & wellness
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Explore by Category</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card-scope group p-6">
                <cat.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Food Principals</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foodPartners.map((p) => (
              <div key={p.id} className="card-scope flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground font-display text-sm font-bold">
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
    </main>
  );
};

export default Food;
