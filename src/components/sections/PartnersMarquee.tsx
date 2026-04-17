import { Link } from "react-router-dom";
import { partners } from "@/data/partners";

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
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((p, i) => (
          <Link
            to={`/principals/${p.id}`}
            key={`${p.id}-${i}`}
            className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-4 transition-all hover:border-accent/50 hover:shadow-lg"
          >
            <img
              src={getLogoPath(p.id)}
              alt={p.name}
              className="h-10 max-w-[120px] object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const span = document.createElement("span");
                span.className = "font-display text-sm font-semibold text-foreground/70 text-center";
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
    <section className="relative overflow-hidden bg-background section-padding">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-scope relative text-center">
        <span className="section-tag">Our Network</span>
        <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-foreground">
          Trusted by Global Leaders
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-muted-foreground">
          We partner exclusively with world-renowned ingredient manufacturers, bringing the best of global innovation to Indian formulators.
        </p>
      </div>

      <div className="relative mt-10 space-y-6">
        {renderRow(row1, "left")}
        {renderRow(row2, "right")}
      </div>

      <div className="mt-10 text-center">
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
