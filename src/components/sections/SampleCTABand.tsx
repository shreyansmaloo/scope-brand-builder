import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import sampleCtaImg from "@/assets/sample-cta.jpg";

const SampleCTABand = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left — gradient */}
        <div className="relative flex items-center bg-gradient-to-br from-accent to-accent-light px-6 py-20 lg:px-16 lg:py-28">
          {/* Dot grid decoration */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-h1 font-bold text-accent-foreground">
              Ready to Evaluate?
              <br />
              Request a Free Sample.
            </h2>
            <p className="mt-4 max-w-md font-body text-lg text-accent-foreground/80">
              We make it easy to test before you commit. Request product samples directly for your formulation needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-sample"
                className="rounded-full bg-card px-6 py-3 font-display text-sm font-semibold text-foreground transition-all hover:shadow-xl"
              >
                Request a Sample →
              </Link>
              <a
                href="tel:+914440400400"
                className="flex items-center gap-2 font-body text-sm text-accent-foreground/80"
              >
                <Phone className="h-4 w-4" />
                +91 44 4040 0400
              </a>
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div className="hidden lg:block">
          <img
            src={sampleCtaImg}
            alt="Scientist evaluating ingredient sample"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SampleCTABand;
