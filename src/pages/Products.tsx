import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products, categories, industries } from "@/data/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedPrincipal, setSelectedPrincipal] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [selectedDosageForm, setSelectedDosageForm] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("industry");

  // Derive unique filter values
  const principals = useMemo(() => [...new Set(products.map((p) => p.principal))].sort(), []);
  const forms = useMemo(() => [...new Set(products.filter((p) => p.form).map((p) => p.form!))].sort(), []);
  const dosageForms = useMemo(() => [...new Set(products.filter((p) => p.dosageForm).map((p) => p.dosageForm!))].sort(), []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch = !search || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.inci && p.inci.toLowerCase().includes(q)) || p.principal.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesIndustry = !selectedIndustry || p.industry === selectedIndustry;
      const matchesPrincipal = !selectedPrincipal || p.principal === selectedPrincipal;
      const matchesForm = !selectedForm || p.form === selectedForm;
      const matchesDosageForm = !selectedDosageForm || p.dosageForm === selectedDosageForm;
      return matchesSearch && matchesCategory && matchesIndustry && matchesPrincipal && matchesForm && matchesDosageForm;
    });
  }, [search, selectedCategory, selectedIndustry, selectedPrincipal, selectedForm, selectedDosageForm]);

  const activeFilterCount = [selectedCategory, selectedIndustry, selectedPrincipal, selectedForm, selectedDosageForm].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedIndustry(null);
    setSelectedPrincipal(null);
    setSelectedForm(null);
    setSelectedDosageForm(null);
  };

  const industryColors: Record<string, string> = {
    pharma: "bg-accent text-accent-foreground",
    cosmetics: "bg-teal text-teal-foreground",
    food: "bg-primary text-primary-foreground",
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FilterSection = ({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) => (
    <div className="border-b border-border/50 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex w-full items-center justify-between py-2 font-display text-xs font-semibold uppercase tracking-wider text-foreground"
      >
        {title}
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expandedSection === sectionKey ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expandedSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 flex flex-col gap-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-left font-body text-sm transition-colors ${
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  const filtersContent = (
    <div className="space-y-2">
      <FilterSection title="Industry" sectionKey="industry">
        {industries.map((ind) => (
          <FilterButton
            key={ind}
            label={ind.charAt(0).toUpperCase() + ind.slice(1)}
            active={selectedIndustry === ind}
            onClick={() => setSelectedIndustry(selectedIndustry === ind ? null : ind)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Category" sectionKey="category">
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Principal" sectionKey="principal">
        {principals.map((p) => (
          <FilterButton
            key={p}
            label={p}
            active={selectedPrincipal === p}
            onClick={() => setSelectedPrincipal(selectedPrincipal === p ? null : p)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Form" sectionKey="form">
        {forms.map((f) => (
          <FilterButton
            key={f}
            label={f}
            active={selectedForm === f}
            onClick={() => setSelectedForm(selectedForm === f ? null : f)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Dosage Form" sectionKey="dosageForm">
        {dosageForms.map((d) => (
          <FilterButton
            key={d}
            label={d}
            active={selectedDosageForm === d}
            onClick={() => setSelectedDosageForm(selectedDosageForm === d ? null : d)}
          />
        ))}
      </FilterSection>

      {(selectedCategory || selectedIndustry || selectedPrincipal || selectedForm || selectedDosageForm || search) && (
        <button onClick={clearFilters} className="mt-2 flex items-center gap-1 font-body text-sm text-accent hover:underline">
          <X className="h-3 w-3" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-12">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Products
          </p>
          <h1 className="mt-4 font-display text-h1 font-bold text-primary-foreground">Product Catalog</h1>
          <p className="mt-2 font-body text-primary-foreground/60">Browse our portfolio of 140+ excipients across pharma, cosmetics & food.</p>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, INCI, principal, or application..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-0 bg-card py-3 pl-12 pr-4 font-body text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </section>

      {/* Mobile filter toggle */}
      <div className="sticky top-14 z-30 border-b border-border bg-background py-3 lg:hidden">
        <div className="container-scope flex items-center justify-between">
          <span className="font-body text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-body text-sm font-medium text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-foreground">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="rounded-full p-1 hover:bg-muted">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              {filtersContent}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl bg-card p-5 shadow-[0_4px_24px_rgba(13,33,55,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-foreground">Filters</h3>
                  <span className="rounded-full bg-accent-pale px-2 py-0.5 font-body text-xs font-medium text-accent">
                    {filtered.length} results
                  </span>
                </div>
                {filtersContent}
              </div>
            </div>

            {/* Product grid */}
            <div className="flex-1">
              {/* Active filter pills on desktop */}
              {activeFilterCount > 0 && (
                <div className="mb-4 hidden flex-wrap gap-2 lg:flex">
                  {selectedIndustry && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-pale px-3 py-1 font-body text-xs font-medium text-accent">
                      {selectedIndustry}
                      <button onClick={() => setSelectedIndustry(null)}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-pale px-3 py-1 font-body text-xs font-medium text-teal">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory(null)}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {selectedPrincipal && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-body text-xs font-medium text-foreground">
                      {selectedPrincipal}
                      <button onClick={() => setSelectedPrincipal(null)}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {selectedForm && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-body text-xs font-medium text-foreground">
                      {selectedForm}
                      <button onClick={() => setSelectedForm(null)}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {selectedDosageForm && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-body text-xs font-medium text-foreground">
                      {selectedDosageForm}
                      <button onClick={() => setSelectedDosageForm(null)}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No products found</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <button onClick={clearFilters} className="rounded-full border border-accent px-5 py-2 font-display text-sm font-semibold text-accent hover:bg-accent-pale">
                      Clear Filters
                    </button>
                    <Link to="/contact" className="rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground">
                      Contact Us
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.2) }}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(13,33,55,0.12)]"
                    >
                      {/* Left accent bar on hover */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />

                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${industryColors[product.industry]}`}>
                          {product.industry.toUpperCase()}
                        </span>
                        <span className="rounded-full bg-teal-pale px-2.5 py-0.5 font-body text-xs font-medium text-teal">
                          {product.category}
                        </span>
                        {product.form && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 font-body text-xs font-medium text-muted-foreground">
                            {product.form}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-base font-semibold text-foreground">{product.name}</h3>
                      {product.inci && product.inci !== product.name && (
                        <p className="mt-0.5 font-body text-xs text-teal">INCI: {product.inci}</p>
                      )}
                      <p className="mt-1 font-body text-xs text-muted-foreground">{product.principal}</p>
                      <p className="mt-2 font-body text-sm text-text-secondary line-clamp-2">{product.description}</p>

                      {(product.dosageForm || product.dosage) && (
                        <div className="mt-3 flex flex-wrap gap-2 border-t border-border/50 pt-3">
                          {product.dosageForm && (
                            <span className="font-body text-xs text-muted-foreground">
                              📋 {product.dosageForm}
                            </span>
                          )}
                          {product.dosage && (
                            <span className="font-body text-xs text-muted-foreground">
                              💧 {product.dosage}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        <Link to="/contact" className="rounded-lg bg-accent px-3 py-1.5 font-body text-xs font-medium text-accent-foreground hover:bg-accent-light">
                          Enquire
                        </Link>
                        <Link to="/request-sample" className="rounded-lg border border-border px-3 py-1.5 font-body text-xs font-medium text-foreground hover:bg-muted">
                          Request Sample
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
