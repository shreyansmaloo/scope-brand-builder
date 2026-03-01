import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Binders", "Fillers", "Disintegrants", "Sweeteners", "Emollients", 
  "Emulsifiers", "Thickeners", "Stabilizers", "Lubricants", "Actives"
];

const ExcipientSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      {/* Search Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal/40 via-primary to-primary-light/50 opacity-90" />
      
      {/* Dot Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      <div className="container-scope relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="font-display text-h2 font-bold text-white">
            Find the Right Excipient
          </h2>
          <p className="mt-3 font-body text-base text-white/70">
            Search by product name, application, or category
          </p>

          {/* Search Bar Container */}
          <div className="mt-8 flex flex-col items-center gap-8">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-12 w-full rounded-full bg-white pl-5 pr-24 font-body text-xs text-foreground shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all lg:h-14 lg:pl-6 lg:pr-28 lg:text-sm"
              />
              <button 
                onClick={() => handleSearch()}
                className="absolute right-1 top-1 h-10 rounded-full bg-accent px-4 font-display text-[10px] font-bold text-white shadow-lg hover:bg-accent-light hover:shadow-xl transition-all flex items-center gap-2 lg:right-1.5 lg:top-1.5 lg:h-11 lg:px-6 lg:text-xs"
              >
                <Search className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                <span className="hidden xs:inline">Search</span>
              </button>
            </div>

            {/* Filter Chips - Horizontal Scroll on Mobile, Wrapped on Desktop */}
            <div className="flex w-full overflow-x-auto pb-4 scrollbar-hide lg:overflow-visible lg:pb-0">
              <div className="flex flex-nowrap gap-2 px-4 lg:flex-wrap lg:justify-center lg:px-0 lg:gap-3">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSearch(cat)}
                    className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-body text-[11px] font-medium text-white/80 backdrop-blur-md hover:border-white/40 hover:bg-white/10 hover:text-white transition-all shadow-sm lg:px-5 lg:py-2 lg:text-sm"
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcipientSearch;
