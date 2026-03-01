import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronDown, ArrowUpDown, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { products, categories, industries } from "@/data/products";
import { partners } from "@/data/partners";

type SortOption = "default" | "az" | "za";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialPrincipal = searchParams.get("principal") || null;
  
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedPrincipal, setSelectedPrincipal] = useState<string | null>(initialPrincipal);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [selectedDosageForm, setSelectedDosageForm] = useState<string | null>(null);
  const [optionsSearch, setOptionsSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("industry");
  const [sort, setSort] = useState<SortOption>("default");

  // Sync search and principal when URL changes
  useEffect(() => {
    const p = searchParams.get("principal");
    if (p) setSelectedPrincipal(p);
    
    const s = searchParams.get("search");
    if (s !== null) setSearch(s);
  }, [searchParams]);

  const selectedPartner = useMemo(() => {
    if (!selectedPrincipal) return null;
    return partners.find((p) => p.name === selectedPrincipal) || null;
  }, [selectedPrincipal]);

  const principals = useMemo(() => [...new Set(products.map((p) => p.principal))].sort(), []);
  const forms = useMemo(() => [...new Set(products.filter((p) => p.form).map((p) => p.form!))].sort(), []);
  const dosageForms = useMemo(() => [...new Set(products.filter((p) => p.dosageForm).map((p) => p.dosageForm!))].sort(), []);

  // Filter option lists based on optionsSearch
  const filteredIndustries = useMemo(() => industries.filter(i => i.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);
  const filteredCategories = useMemo(() => categories.filter(c => c.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);
  const filteredPrincipals = useMemo(() => principals.filter(p => p.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch, principals]);
  const filteredForms = useMemo(() => forms.filter(f => f.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch, forms]);
  const filteredDosageForms = useMemo(() => dosageForms.filter(d => d.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch, dosageForms]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.inci && p.inci.toLowerCase().includes(q)) ||
        p.principal.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesIndustry = !selectedIndustry || p.industry === selectedIndustry;
      const matchesPrincipal = !selectedPrincipal || p.principal === selectedPrincipal;
      const matchesForm = !selectedForm || p.form === selectedForm;
      const matchesDosageForm = !selectedDosageForm || p.dosageForm === selectedDosageForm;
      return matchesSearch && matchesCategory && matchesIndustry && matchesPrincipal && matchesForm && matchesDosageForm;
    });

    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") result = [...result].sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, selectedCategory, selectedIndustry, selectedPrincipal, selectedForm, selectedDosageForm, sort]);

  const activeFilterCount = [selectedCategory, selectedIndustry, selectedPrincipal, selectedForm, selectedDosageForm].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setOptionsSearch("");
    setSelectedCategory(null);
    setSelectedIndustry(null);
    setSelectedPrincipal(null);
    setSelectedForm(null);
    setSelectedDosageForm(null);
    setSort("default");
  };

  const industryColors: Record<string, string> = {
    pharma: "bg-accent text-accent-foreground",
    cosmetics: "bg-teal text-teal-foreground",
    food: "bg-primary text-primary-foreground",
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FilterSection = ({ title, sectionKey, count, children }: { title: string; sectionKey: string; count?: number; children: React.ReactNode }) => (
    <div className="border-b border-border/50 pb-3">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex w-full items-center justify-between py-2 font-display text-xs font-semibold uppercase tracking-wider text-foreground"
      >
        <span className="flex items-center gap-2">
          {title}
          {count !== undefined && count > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">{count}</span>
          )}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expandedSection === sectionKey ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {(expandedSection === sectionKey || optionsSearch) && (
          <motion.div
            initial={optionsSearch ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 flex flex-col gap-0.5 max-h-48 overflow-y-auto">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-left font-body text-sm transition-colors ${
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span className={`h-3 w-3 shrink-0 rounded-sm border ${active ? "border-accent-foreground bg-accent-foreground" : "border-border"}`} />
      {label}
    </button>
  );

  const filtersContent = (
    <div className="space-y-1">
      {/* Search within filters */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter options..."
          value={optionsSearch}
          onChange={(e) => setOptionsSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-8 font-body text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {optionsSearch && (
          <button 
            onClick={() => setOptionsSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <FilterSection title="Industry" sectionKey="industry" count={selectedIndustry ? 1 : 0}>
        {filteredIndustries.map((ind) => (
          <FilterButton
            key={ind}
            label={ind.charAt(0).toUpperCase() + ind.slice(1)}
            active={selectedIndustry === ind}
            onClick={() => setSelectedIndustry(selectedIndustry === ind ? null : ind)}
          />
        ))}
        {filteredIndustries.length === 0 && <p className="p-2 text-[10px] text-muted-foreground italic text-center">No options match</p>}
      </FilterSection>

      <FilterSection title="Category" sectionKey="category" count={selectedCategory ? 1 : 0}>
        {filteredCategories.map((cat) => (
          <FilterButton
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          />
        ))}
        {filteredCategories.length === 0 && <p className="p-2 text-[10px] text-muted-foreground italic text-center">No options match</p>}
      </FilterSection>

      <FilterSection title="Principal" sectionKey="principal" count={selectedPrincipal ? 1 : 0}>
        {filteredPrincipals.map((p) => (
          <FilterButton
            key={p}
            label={p}
            active={selectedPrincipal === p}
            onClick={() => setSelectedPrincipal(selectedPrincipal === p ? null : p)}
          />
        ))}
        {filteredPrincipals.length === 0 && <p className="p-2 text-[10px] text-muted-foreground italic text-center">No options match</p>}
      </FilterSection>

      <FilterSection title="Form" sectionKey="form" count={selectedForm ? 1 : 0}>
        {filteredForms.map((f) => (
          <FilterButton
            key={f}
            label={f}
            active={selectedForm === f}
            onClick={() => setSelectedForm(selectedForm === f ? null : f)}
          />
        ))}
        {filteredForms.length === 0 && <p className="p-2 text-[10px] text-muted-foreground italic text-center">No options match</p>}
      </FilterSection>

      <FilterSection title="Dosage Form" sectionKey="dosageForm" count={selectedDosageForm ? 1 : 0}>
        {filteredDosageForms.map((d) => (
          <FilterButton
            key={d}
            label={d}
            active={selectedDosageForm === d}
            onClick={() => setSelectedDosageForm(selectedDosageForm === d ? null : d)}
          />
        ))}
        {filteredDosageForms.length === 0 && <p className="p-2 text-[10px] text-muted-foreground italic text-center">No options match</p>}
      </FilterSection>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-destructive/20 py-2 font-body text-sm text-destructive hover:bg-destructive/5">
          <X className="h-3 w-3" /> Clear All Filters
        </button>
      )}
    </div>
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Products", url: "https://www.scope-india.com/products" }
  ]);

  return (
    <main>
      <SEO 
        title={`${selectedPartner ? selectedPartner.name + " " : ""}Products & Ingredients Catalog | Scope India`}
        description="Search our full catalog of pharmaceutical, cosmetic, and food ingredients from top global principals in India. Filter by application, dosage form, or industry."
        canonical="https://www.scope-india.com/products"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero */}
      <section className="bg-primary pt-32 pb-12">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Products
          </p>
          <h1 className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            {selectedPartner ? `${selectedPartner.name} Products` : "Product Catalog"}
          </h1>
          <p className="mt-2 font-body text-primary-foreground/60 max-w-3xl">
            {selectedPartner?.about 
              ? selectedPartner.about 
              : "Search by product name, generic name (INCI), principal, or application."}
          </p>
          {!selectedPartner && (
            <div className="relative mt-6 max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. Carbomer, Hypromellose, Mannitol, HPMC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-0 bg-card py-3.5 pl-12 pr-4 font-body text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Mobile filter toggle + Sort */}
      <div className="sticky top-14 z-30 border-b border-border bg-background py-3 lg:hidden">
        <div className="container-scope flex items-center justify-between">
          <span className="font-body text-sm text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSort(sort === "az" ? "za" : sort === "za" ? "default" : "az")}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-foreground"
            >
              {sort === "az" ? <ArrowUpAZ className="h-3.5 w-3.5" /> : sort === "za" ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpDown className="h-3.5 w-3.5" />}
              Sort
            </button>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-body text-xs font-medium text-foreground"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
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
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-xl lg:hidden"
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
                    {filtered.length}
                  </span>
                </div>
                {filtersContent}
              </div>
            </div>

            {/* Product grid */}
            <div className="flex-1">
              {/* Toolbar: sort + active pills */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {/* Desktop sort */}
                <div className="hidden items-center gap-2 lg:flex">
                  <span className="font-body text-xs text-muted-foreground">Sort:</span>
                  {([["default", "Relevance"], ["az", "A → Z"], ["za", "Z → A"]] as [SortOption, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setSort(val)}
                      className={`rounded-full px-3 py-1 font-body text-xs transition-colors ${sort === val ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Active filters */}
                {activeFilterCount > 0 && (
                  <div className="ml-auto hidden flex-wrap gap-2 lg:flex">
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
              </div>

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
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.015, 0.15) }}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(13,33,55,0.12)]"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />

                      <div className="flex flex-wrap gap-1.5">
                        <span className={`rounded-full px-2 py-0.5 font-body text-[10px] font-semibold uppercase ${industryColors[product.industry]}`}>
                          {product.industry}
                        </span>
                        <span className="rounded-full bg-teal-pale px-2 py-0.5 font-body text-[10px] font-medium text-teal">
                          {product.category}
                        </span>
                        {product.form && (
                          <span className="rounded-full bg-muted px-2 py-0.5 font-body text-[10px] font-medium text-muted-foreground">
                            {product.form}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-sm font-semibold text-foreground leading-snug">{product.name}</h3>
                      {product.inci && product.inci !== product.name && (
                        <p className="mt-0.5 font-body text-xs text-teal italic">INCI: {product.inci}</p>
                      )}
                      <p className="mt-1 font-body text-xs text-muted-foreground">{product.principal}</p>
                      <p className="mt-2 font-body text-xs text-text-secondary line-clamp-2">{product.description}</p>

                      {(product.dosageForm || product.dosage) && (
                        <div className="mt-2.5 flex flex-wrap gap-2 border-t border-border/50 pt-2.5">
                          {product.dosageForm && (
                            <span className="font-body text-[11px] text-muted-foreground">📋 {product.dosageForm}</span>
                          )}
                          {product.dosage && (
                            <span className="font-body text-[11px] text-muted-foreground">💧 {product.dosage}</span>
                          )}
                        </div>
                      )}

                      <div className="mt-3 flex gap-2">
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
