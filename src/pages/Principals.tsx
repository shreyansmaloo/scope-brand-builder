import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { partners, getPartnersByVertical } from "@/data/partners";

const tabs = [
  { label: "All", value: "all" },
  { label: "Pharma", value: "pharma" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Food", value: "food" },
] as const;

const Principals = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all" ? partners : getPartnersByVertical(activeTab as "pharma" | "cosmetics" | "food");

  return (
    <main>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Principals
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Our Global Principals
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            World-class ingredient manufacturers we proudly represent in India
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                  activeTab === tab.value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-accent/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="card-scope flex items-center gap-4 p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-base font-bold">
                  {partner.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">{partner.name}</h3>
                  <p className="font-body text-xs text-muted-foreground">{partner.country}</p>
                  <p className="mt-1 font-body text-sm text-text-secondary">{partner.specialty}</p>
                </div>
                <Link to={`/products`} className="shrink-0 text-accent hover:text-accent-light">
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Principals;
