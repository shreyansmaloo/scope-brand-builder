import { motion } from "framer-motion";
import { ShieldCheck, Award, Star } from "lucide-react";

const certs = [
  { icon: ShieldCheck, title: "ISO 9001:2008", desc: "Quality Management System Certified" },
  { icon: Award, title: "Dun & Bradstreet", desc: "Business Credibility Verified & Rated" },
  { icon: Star, title: "CRISIL Rated", desc: "Financial Strength Assessed" },
  { icon: ShieldCheck, title: "cGMP Compliant", desc: "Current Good Manufacturing Practices" },
  { icon: Award, title: "HACCP", desc: "Hazard Analysis & Critical Control Points" },
  { icon: ShieldCheck, title: "Kosher Certified", desc: "Kosher Standards Compliance" },
];

const CertificationStrip = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-scope text-center">
        <h2 className="font-display text-h2 font-bold text-foreground">
          Quality You Can Trust
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-accent/20 bg-card px-6 py-5 shadow-sm transition-all hover:border-accent/40 md:px-8 md:py-6"
            >
              <cert.icon className="h-10 w-10 shrink-0 text-accent" />
              <div className="text-left">
                <h3 className="font-display text-base font-bold text-foreground leading-tight">{cert.title}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground leading-snug">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationStrip;
