import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Droplets, Paintbrush, Syringe, Wind, Eye, Star, Layers } from "lucide-react";
import { getProductsByIndustry } from "@/data/products";
import { getPartnersByVertical } from "@/data/partners";
import heroPharma from "@/assets/hero-pharma.jpg";

const dosageForms = [
  { icon: FlaskConical, name: "Solid Orals", desc: "Binders, Fillers, Disintegrants, Lubricants" },
  { icon: Droplets, name: "Liquid Orals", desc: "Suspending agents, Sweeteners, Viscosity modifiers" },
  { icon: Paintbrush, name: "Topicals", desc: "Emollients, Emulsifiers, Thickeners, Film formers" },
  { icon: Syringe, name: "Parenterals", desc: "Solubilizers, Tonicity agents, Stabilizers" },
  { icon: Wind, name: "Inhalation", desc: "Carrier lactose, Dispersing agents" },
  { icon: Eye, name: "Ophthalmic & Otic", desc: "Viscosity enhancers, Preservatives, Buffers" },
  { icon: Star, name: "ODT / MUPS", desc: "Co-processed excipients for specialty delivery" },
  { icon: Layers, name: "Coatings", desc: "Film coatings, Enteric coatings, Sugar coatings" },
];

const Pharma = () => {
  const pharmaProducts = getProductsByIndustry("pharma");
  const pharmaPartners = getPartnersByVertical("pharma");

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20">
        <img src={heroPharma} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="container-scope relative">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Pharmaceuticals
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Pharmaceutical Excipients
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Comprehensive solutions across every dosage form — from solid orals to parenterals
          </p>
        </div>
      </section>

      {/* Dosage Forms */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Explore by Dosage Form</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dosageForms.map((form, i) => (
              <motion.div
                key={form.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-scope group p-6"
              >
                <form.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{form.name}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{form.desc}</p>
                <Link
                  to={`/products?dosageForm=${encodeURIComponent(form.name)}`}
                  className="mt-3 inline-flex items-center gap-1 font-body text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100"
                >
                  View Products <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharma Principals */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Pharma Principals</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pharmaPartners.map((p) => (
              <div key={p.id} className="card-scope flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold">
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

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container-scope text-center">
          <h2 className="font-display text-h2 font-bold text-primary-foreground">
            Need Formulation Assistance?
          </h2>
          <p className="mt-3 font-body text-primary-foreground/60">Our technical team is ready to help.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light">
            Get in Touch →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Pharma;
