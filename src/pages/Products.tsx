import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products, categories, industries } from "@/data/products";

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesIndustry = !selectedIndustry || p.industry === selectedIndustry;
      return matchesSearch && matchesCategory && matchesIndustry;
    });
  }, [search, selectedCategory, selectedIndustry]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedIndustry(null);
  };

  const industryColors: Record<string, string> = {
    pharma: "bg-accent text-accent-foreground",
    cosmetics: "bg-teal text-teal-foreground",
    food: "bg-primary text-primary-foreground",
  };

  return (
    <main>
      <section className="bg-primary pt-32 pb-12">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Products
          </p>
          <h1 className="mt-4 font-display text-h1 font-bold text-primary-foreground">Product Catalog</h1>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name or application..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-0 bg-card py-3 pl-12 pr-4 font-body text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <div className="w-full shrink-0 lg:w-64">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">Category</h3>
                  <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`rounded-lg px-3 py-1.5 text-left font-body text-sm transition-colors ${
                          selectedCategory === cat ? "bg-accent text-accent-foreground" : "text-text-secondary hover:bg-muted"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">Industry</h3>
                  <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setSelectedIndustry(selectedIndustry === ind ? null : ind)}
                        className={`rounded-lg px-3 py-1.5 text-left font-body text-sm capitalize transition-colors ${
                          selectedIndustry === ind ? "bg-accent text-accent-foreground" : "text-text-secondary hover:bg-muted"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedCategory || selectedIndustry || search) && (
                  <button onClick={clearFilters} className="flex items-center gap-1 font-body text-sm text-accent hover:underline">
                    <X className="h-3 w-3" /> Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No products found</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">Can't find what you need? Contact us.</p>
                  <Link to="/contact" className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground">
                    Contact Us
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      className="card-scope border-l-4 border-l-transparent p-5 transition-all hover:border-l-accent"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-2 py-0.5 font-body text-xs font-medium ${industryColors[product.industry]}`}>
                          {product.industry.toUpperCase()}
                        </span>
                        <span className="rounded-full bg-teal-pale px-2 py-0.5 font-body text-xs font-medium text-teal">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-semibold text-foreground">{product.name}</h3>
                      <p className="mt-1 font-body text-xs text-muted-foreground">{product.principal}</p>
                      <p className="mt-2 font-body text-sm text-text-secondary line-clamp-2">{product.description}</p>
                      <div className="mt-4 flex gap-2">
                        <Link to="/contact" className="rounded-lg bg-accent px-3 py-1.5 font-body text-xs font-medium text-accent-foreground hover:bg-accent-light">
                          Enquire
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-accent py-12">
        <div className="container-scope text-center">
          <h2 className="font-display text-h2 font-bold text-accent-foreground">Looking for something specific?</h2>
          <p className="mt-2 font-body text-accent-foreground/80">We source on demand from our global principal network.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-card px-6 py-3 font-display text-sm font-semibold text-foreground hover:shadow-xl">
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Products;
