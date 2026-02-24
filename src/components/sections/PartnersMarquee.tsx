import { Link } from "react-router-dom";
import { partners } from "@/data/partners";

const getLogoUrl = (name: string, id: string) => {
  // Use Clearbit Logo API for well-known companies, fallback to UI Avatars
  const domainMap: Record<string, string> = {
    "prayon": "prayon.com",
    "salvona": "salvona.com",
    "olvea": "olvea.com",
    "3v": "3vsigma.it",
    "sun-chemical": "sunchemical.com",
    "gelymar": "gelymar.com",
    "p2-sciences": "p2science.com",
    "sopure": "sopurestevia.com",
    "algahealth": "algahealth.co.il",
  };
  const domain = domainMap[id];
  if (domain) {
    return `https://logo.clearbit.com/${domain}`;
  }
  // Fallback: generate a text-based logo via UI Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D2137&color=E8721A&size=128&font-size=0.33&bold=true`;
};

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
          <div
            key={`${p.id}-${i}`}
            className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-primary-muted/20 bg-primary-light/30 px-4 transition-all hover:border-accent/40 hover:bg-primary-light/50"
          >
            <img
              src={getLogoUrl(p.name, p.id)}
              alt={p.name}
              className="h-10 max-w-[120px] object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                // Fallback to text if image fails
                const target = e.currentTarget;
                target.style.display = "none";
                const span = document.createElement("span");
                span.className = "font-display text-sm font-semibold text-primary-foreground/60";
                span.textContent = p.name;
                target.parentElement?.appendChild(span);
              }}
              loading="lazy"
            />
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
