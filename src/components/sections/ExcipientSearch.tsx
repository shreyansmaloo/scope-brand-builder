import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Template C — Amber section (bg-primary)
   Eyebrow  : bg-background/15 border-background/25 text-background
   Heading  : text-background
   Body     : text-background/70
   Input    : bg-background text-foreground shadow-xl
   CTA btn  : bg-surface-dark text-background
   Pills    : bg-background/10 border-background/20 text-background/70
*/

const ExcipientSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (q: string = query) => {
    if (q.trim()) navigate(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      {/* White dot texture on amber */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="container-scope relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow — Template C style */}
          <span className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-background/15 px-4 py-1.5 font-body text-sm font-bold uppercase tracking-widest text-background">
            ✦ Product Search
          </span>

          <h2 className="mt-5 font-display text-h1 font-bold text-background leading-tight">
            Find the Right Ingredient
          </h2>
          <p className="mt-4 font-body text-lg text-background/70">
            Search by product name, application, or category across 400+ active ingredients.
          </p>

          {/* Search bar — white card on amber */}
          <div className="mt-10 mx-auto max-w-xl">
            <div className="flex items-center rounded-2xl bg-background px-5 py-1 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
              <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. Microcrystalline Cellulose, Hyaluronic Acid…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              <button
                onClick={() => handleSearch()}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-surface-dark px-5 py-2.5 font-display text-xs font-bold text-background transition-all hover:opacity-90 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcipientSearch;
