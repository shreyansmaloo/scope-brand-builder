import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Template C — Amber section (bg-primary)
   Eyebrow  : bg-white/15 border-white/25 text-white
   Heading  : text-white
   Body     : text-white/70
   Input    : bg-white text-foreground shadow-xl
   CTA btn  : bg-surface-dark text-white
   Pills    : bg-white/10 border-white/20 text-white/70
*/

const categories = [
  "Binders", "Fillers", "Disintegrants", "Sweeteners",
  "Emollients", "Emulsifiers", "Thickeners", "Stabilizers",
  "Lubricants", "Actives",
];

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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-widest text-white">
            ✦ Product Search
          </span>

          <h2 className="mt-5 font-display text-h1 font-bold text-white leading-tight">
            Find the Right Ingredient
          </h2>
          <p className="mt-4 font-body text-[15px] text-white/70">
            Search by product name, application, or category across 400+ active ingredients.
          </p>

          {/* Search bar — white card on amber */}
          <div className="mt-10 mx-auto max-w-xl">
            <div className="flex items-center rounded-2xl bg-white px-5 py-1 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
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
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-surface-dark px-5 py-2.5 font-display text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category pills */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            className="mt-7 flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                }}
                onClick={() => handleSearch(cat)}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-body text-[11px] font-medium text-white/70 transition-all hover:bg-white hover:text-primary hover:border-transparent"
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcipientSearch;
