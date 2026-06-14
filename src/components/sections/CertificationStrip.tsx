import { motion } from "framer-motion";
import { ShieldCheck, Award, Star, BadgeCheck, FileCheck, Globe2, Leaf } from "lucide-react";

const certs = [
  { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Quality Management System" },
  { icon: Award,       title: "Dun & Bradstreet", desc: "Business Credibility Rated" },
  { icon: Star,        title: "CRISIL Rated", desc: "Financial Strength Assessed" },
  { icon: BadgeCheck,  title: "cGMP Compliant", desc: "Good Manufacturing Practices" },
  { icon: FileCheck,   title: "HACCP", desc: "Hazard Analysis & Critical Control" },
  { icon: Leaf,        title: "Kosher Certified", desc: "Kosher Standards Compliance" },
  { icon: Globe2,      title: "FSSAI", desc: "Food Safety & Standards Authority" },
  { icon: ShieldCheck, title: "WHO-GMP", desc: "World Health Organization GMP" },
];

const CertificationStrip = () => (
  <section className="section-padding bg-background">
    <div className="container-scope">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <span className="section-tag">✦ Quality Assured</span>
        <h2 className="mt-4 font-display text-h2 font-bold text-foreground">
          Certifications That Speak for Themselves
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-muted-foreground">
          Every batch we deliver is backed by rigorous compliance and globally recognised standards.
        </p>
      </motion.div>

      {/* Cert grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-0 lg:divide-x lg:divide-border/40"
      >
        {certs.map((cert) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card p-5 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_20px_rgba(219,142,0,0.06)] lg:rounded-none lg:border-0 lg:bg-transparent lg:hover:bg-accent/5 lg:hover:shadow-none lg:px-4 lg:py-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xs font-bold text-foreground leading-tight">{cert.title}</p>
                <p className="mt-0.5 font-body text-[10px] text-muted-foreground leading-snug">{cert.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default CertificationStrip;
