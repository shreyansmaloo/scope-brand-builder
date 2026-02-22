import { Link } from "react-router-dom";
import { partners } from "@/data/partners";

const PartnersMarquee = () => {
  const row1 = partners.slice(0, 7);
  const row2 = partners.slice(7);

  const renderRow = (items: typeof partners, direction: "left" | "right") => (
    <div className="overflow-hidden">
      <div
        className={`flex gap-12 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-primary-muted/20 bg-primary-light/30 px-4"
          >
            <span className="font-display text-sm font-semibold text-primary-foreground/60">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-scope relative text-center">
        <h2 className="font-display text-h2 font-bold text-primary-foreground">
          Trusted by Global Leaders
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-primary-foreground/60">
          Scope partners exclusively with world-renowned ingredient manufacturers, bringing the best of
          global innovation to Indian formulators.
        </p>
      </div>

      <div className="relative mt-12 space-y-6">
        {renderRow(row1, "left")}
        {renderRow(row2, "right")}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/principals"
          className="inline-flex rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-xl"
        >
          View All Partners →
        </Link>
      </div>
    </section>
  );
};

export default PartnersMarquee;
