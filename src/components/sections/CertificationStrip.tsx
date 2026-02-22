import { motion } from "framer-motion";
import { ShieldCheck, Award, Star } from "lucide-react";

const certs = [
  { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Quality Management System Certified" },
  { icon: Award, title: "Dun & Bradstreet", desc: "Business Credibility Verified" },
  { icon: Star, title: "CRISIL Rated", desc: "Financial Strength Assessed" },
];

const CertificationStrip = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-scope text-center">
        <h2 className="font-display text-h2 font-bold text-foreground">
          Quality You Can Trust
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-accent/20 bg-card px-8 py-6 shadow-sm"
            >
              <cert.icon className="h-10 w-10 shrink-0 text-accent" />
              <div className="text-left">
                <h3 className="font-display text-base font-bold text-foreground">{cert.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationStrip;
