import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

interface CTASectionProps {
  tag?: string;
  heading: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTASection = ({
  tag = "Get Started Today",
  heading,
  description,
  buttonText = "Contact Us",
  buttonLink = "/contact",
}: CTASectionProps) => (
  <section className="relative py-8 lg:py-12" style={{ background: "#FCFDF8" }}>
    <div className="container-scope">
      <div className="relative overflow-hidden rounded-[1.5rem] py-10 lg:py-14">
        <div className="nh-grad absolute inset-0"
          style={{ background: "linear-gradient(135deg,#F7A100 0%,#F9BD4A 50%,#F7A100 100%)", backgroundSize: "200% 200%" }} />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(252,253,248,.2) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp}
              className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(0,0,0,.55)" }}>
              <span className="h-px w-5 inline-block bg-current" />{tag}
            </motion.span>
            <motion.h2 variants={fadeUp}
              className="font-display text-h2 font-bold leading-tight mb-3 text-surface-dark">
              {heading}
            </motion.h2>
            <motion.p variants={fadeUp}
              className="font-body text-sm leading-relaxed max-w-[40ch] mx-auto mb-6"
              style={{ color: "rgba(0,0,0,.6)" }}>
              {description}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link to={buttonLink}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full font-display text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.25)] active:scale-[0.97]"
                style={{ background: "#FCFDF8", color: "#F7A100" }}>
                {buttonText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
