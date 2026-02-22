import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import whyChooseImg from "@/assets/why-choose.jpg";

const benefits = [
  "One-Stop-Shop for 400+ Excipients",
  "Exclusive Global Principal Partnerships",
  "ISO 9001 & D&B Certified",
  "5 Metro City Offices & Warehouses",
  "Dedicated Technical Sales Support",
  "Cold Chain & Specialized Logistics",
  "R&D Network with Universities & Institutes",
  "Customer-Centric, Relationship-Driven",
];

const WhyChooseScope = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-scope">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Image with floating badges */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={whyChooseImg}
                alt="Quality control laboratory"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -right-4 -top-4 animate-float rounded-xl bg-card px-4 py-2 shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-display text-xs font-semibold text-accent">🏆 ISO 9001 Certified</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 animate-float rounded-xl bg-card px-4 py-2 shadow-lg"
              style={{ animationDelay: "1s" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-display text-xs font-semibold text-teal">⭐ D&B & CRISIL Rated</span>
            </motion.div>
            <motion.div
              className="absolute -right-2 bottom-1/4 animate-float rounded-xl bg-card px-4 py-2 shadow-lg"
              style={{ animationDelay: "2s" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span className="font-display text-xs font-semibold text-foreground">📅 Since 1959</span>
            </motion.div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="section-tag">✦ Why Choose Us</span>
            <h2 className="mt-6 font-display text-h1 font-bold text-foreground">
              65 Years of Excipient Expertise
            </h2>
            <p className="mt-4 font-body text-text-secondary leading-relaxed">
              Scope Ingredients has built a reputation as India's most reliable excipient partner through
              decades of consistent quality, deep industry expertise, and strong principal relationships.
            </p>

            <motion.ul
              className="mt-8 grid gap-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {benefits.map((b) => (
                <motion.li
                  key={b}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-2"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="font-body text-sm text-foreground">{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-xl"
            >
              Know More About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseScope;
