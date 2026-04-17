import { motion } from "framer-motion";
import { ShieldCheck, Award, Star, BadgeCheck, FileCheck, Globe2, Leaf } from "lucide-react";

const certs = [
  { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Quality Management System Certified" },
  { icon: Award, title: "Dun & Bradstreet", desc: "Business Credibility Verified & Rated" },
  { icon: Star, title: "CRISIL Rated", desc: "Financial Strength Assessed" },
  { icon: BadgeCheck, title: "cGMP Compliant", desc: "Current Good Manufacturing Practices" },
  { icon: FileCheck, title: "HACCP", desc: "Hazard Analysis & Critical Control Points" },
  { icon: Leaf, title: "Kosher Certified", desc: "Kosher Standards Compliance" },
  { icon: Globe2, title: "FSSAI", desc: "Food Safety & Standards Authority" },
  { icon: ShieldCheck, title: "WHO-GMP", desc: "World Health Organization GMP" },
];

const CertificationStrip = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-scope text-center">
        <span className="section-tag">Quality Assured</span>
        <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-foreground">
          Quality You Can Trust
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-muted-foreground">
          Certifications & compliance that back every batch we deliver.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-card px-4 py-4 shadow-sm transition-all hover:border-accent/50 hover:shadow-md md:px-5"
            >
              <cert.icon className="h-9 w-9 shrink-0 text-accent" />
              <div className="text-left">
                <h3 className="font-display text-sm font-bold text-foreground leading-tight">{cert.title}</h3>
                <p className="mt-0.5 font-body text-[11px] text-muted-foreground leading-snug">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationStrip;
