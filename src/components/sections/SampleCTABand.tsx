import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, FlaskConical } from "lucide-react";
import sampleCtaImg from "@/assets/sample-cta.jpg";

const SampleCTABand = () => (
  <section className="relative overflow-hidden">
    <div className="grid lg:grid-cols-2 min-h-[480px]">

      {/* Left — Content */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center bg-surface-dark px-8 py-20 lg:px-16 lg:py-24"
      >
        {/* Dot grid decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        {/* Amber glow */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full blur-[120px] opacity-[0.12] bg-primary" />

        <div className="relative z-10 max-w-lg">
          {/* Icon eyebrow */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <FlaskConical className="h-6 w-6" />
          </div>

          <h2 className="font-display text-h1 font-extrabold leading-[1.05] text-white">
            Ready to{" "}
            <span className="text-primary">Evaluate?</span>
            <br />Request a Free Sample.
          </h2>

          <p className="mt-5 max-w-[44ch] font-body text-[15px] leading-relaxed text-white/55">
            Test before you commit. Request product samples directly for your formulation and R&D needs — dispatched quickly across India.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/request-sample"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_0_0_0_rgba(247,161,0,0.4)] transition-all hover:shadow-[0_0_0_6px_rgba(247,161,0,0.15)] hover:-translate-y-px active:scale-95"
            >
              Request a Sample
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+914440400400"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/50 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              +91 44 4040 0400
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right — Image with amber overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative hidden lg:block min-h-[480px]"
      >
        <img
          src={sampleCtaImg}
          alt="Scientist evaluating an ingredient sample in laboratory"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Warm amber-tinted overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-dark/30" />

        {/* Floating stat card */}
        <div className="absolute right-8 bottom-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
          <p className="font-display text-3xl font-black text-white">48h</p>
          <p className="mt-1 font-body text-xs text-white/60 leading-snug">Average sample<br />dispatch time</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SampleCTABand;
