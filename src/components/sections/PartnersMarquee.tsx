import { Link } from "react-router-dom";
import { partners } from "@/data/partners";

// Map partner IDs to actual logo filenames (without extension)
const logoMap: Record<string, string> = {
  "standard-chem": "standard",
  "soho-aneco": "soho",
  "natures-crops": "nature-s-crops",
  "alula": "elula",
  "baltmilk": "balt",
  "china-foodstuff": "china",
  "algahealth": "alga",
  "coffeefruit": "coffee",
  "gn-long": "gn",
};

const getLogoPath = (id: string) => `/logos/${logoMap[id] || id}.png`;

const PartnersMarquee = () => {
  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  const renderRow = (items: typeof partners, direction: "left" | "right") => (
    <div className="overflow-hidden">
      <div
        className={`flex gap-10 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((p, i) => (
          <Link
            to={`/principals/${p.id}`}
            key={`${p.id}-${i}`}
            className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-primary-muted/20 bg-white px-4 transition-all hover:border-accent/40 hover:shadow-lg"
          >
            <img
              src={getLogoPath(p.id)}
              alt={p.name}
              className="h-10 max-w-[120px] object-contain transition-all"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const span = document.createElement("span");
                span.className = "font-display text-sm font-semibold text-primary-foreground/60";
                span.textContent = p.name;
                target.parentElement?.appendChild(span);
              }}
              loading="lazy"
            />
          </Link>
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
