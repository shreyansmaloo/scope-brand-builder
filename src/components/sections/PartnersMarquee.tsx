import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { partners } from "@/data/partners";

const getLogoPath = (logo?: string) => {
  return logo ? `/logos/${logo}` : null;
};

const PartnersMarquee = () => {
  const withLogos = partners.filter((p) => p.logo);
  const row1 = withLogos.slice(0, Math.ceil(withLogos.length / 2));
  const row2 = withLogos.slice(Math.ceil(withLogos.length / 2));

  const renderRow = (items: typeof partners, direction: "left" | "right") => (
    <div className="overflow-x-hidden py-2">
      <div
        className={`flex gap-3 lg:gap-5 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((p, i) => {
          const logoPath = getLogoPath(p.logo);
          return (
            <Link
              to={`/principals/${p.id}`}
              key={`${p.id}-${i}`}
              className="flex h-16 w-28 lg:h-[96px] lg:w-56 shrink-0 items-center justify-center rounded-xl lg:rounded-2xl border border-border/60 bg-card px-3 lg:px-6 transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(219,142,0,0.08)]"
            >
              {logoPath ? (
                <img
                  src={logoPath}
                  alt={p.name}
                  className="h-8 max-w-[80px] lg:h-12 lg:max-w-[160px] object-contain"
                  style={{ mixBlendMode: "multiply" }}
                  loading="lazy"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const s = document.createElement("span");
                    s.className = "font-display text-xs font-semibold text-foreground/50 text-center";
                    s.textContent = p.name;
                    t.parentElement?.appendChild(s);
                  }}
                />
              ) : (
                <span className="font-display text-xs font-semibold text-foreground/50 text-center">{p.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-10 lg:pt-32 lg:pb-14">
      {/* Left + right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background to-transparent" />

      <div className="container-scope relative z-0 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <span className="section-tag">✦ Our Network</span>
          <h2 className="mt-4 font-display text-h2 font-bold text-foreground">
            Representing the World's Best
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-muted-foreground">
            Exclusive partnerships with globally renowned ingredient manufacturers — bringing world-class innovation to Indian formulators.
          </p>
        </motion.div>
      </div>

      <div className="space-y-8">
        {renderRow(row1, "left")}
        {renderRow(row2, "right")}
      </div>

      <div className="container-scope mt-10 flex justify-center">
        <Link
          to="/principals"
          className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent hover:text-accent"
        >
          View All Partners
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default PartnersMarquee;
