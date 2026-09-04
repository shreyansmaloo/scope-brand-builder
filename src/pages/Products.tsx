import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowUpDown, ArrowUpAZ, ArrowDownAZ, ChevronRight } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import CTASection from "@/components/sections/CTASection";
import { formatChemicalName } from "@/lib/utils";

type SortOption = "default" | "az" | "za";

const industryCardStyles: Record<string, { hoverBorder: string; hoverShadow: string; bgTint: string }> = {
  pharma: {
    hoverBorder: "hover:border-primary/30",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(247,161,0,0.10)]",
    bgTint: "bg-gradient-to-br from-card to-primary/[0.01] hover:to-primary/[0.03]",
  },
  cosmetics: {
    hoverBorder: "hover:border-primary/30",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(247,161,0,0.10)]",
    bgTint: "bg-gradient-to-br from-card to-primary/[0.01] hover:to-primary/[0.03]",
  },
  food: {
    hoverBorder: "hover:border-primary/30",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(247,161,0,0.10)]",
    bgTint: "bg-gradient-to-br from-card to-primary/[0.01] hover:to-primary/[0.03]",
  },
};

const FilterGroup = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
  <div className="border-b border-border/60 py-4 first:pt-0">
    <div className="mb-3 flex items-center justify-between">
      <h4 className="font-display text-base font-extrabold uppercase tracking-wider">{title}</h4>
      {count !== undefined && count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-sm font-bold text-primary-foreground">{count}</span>
      )}
    </div>
    <div className="flex flex-col gap-0.5">{children}</div>
  </div>
);

const FilterCheckbox = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2.5 rounded-md px-2 py-2 text-left font-body text-lg transition-colors ${active ? "bg-primary/10 text-primary font-medium" : "text-foreground/75 hover:bg-muted hover:text-foreground font-normal"}`}
  >
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${active ? "border-primary bg-primary" : "border-border bg-background"}`}>
      {active && <span className="block h-2 w-2 rounded-[1.5px] bg-background" />}
    </span>
    <span className="capitalize truncate">{label}</span>
  </button>
);

const formatPrincipalName = (name: string): string =>
  name.trim().split(/\s+/).map(word => {
    const core = word.replace(/[^a-zA-Z0-9]/g, "");
    // Keep short all-caps tokens as abbreviations (e.g. USA, CHT, BIO, AG, PVT)
    if (core.length <= 4 && core === core.toUpperCase() && /^[A-Z]+$/.test(core)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");

const Products = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialPrincipalParam = searchParams.get("principal");
  const initialPrincipals = initialPrincipalParam ? initialPrincipalParam.split(",").filter(Boolean) : [];
  const initialIndustry = searchParams.get("industry") || null;
  const initialCategory = searchParams.get("category") || null;

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(initialIndustry);
  const [selectedPrincipals, setSelectedPrincipals] = useState<string[]>(initialPrincipals);
  const [optionsSearch, setOptionsSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("az");
  const [searchSticky, setSearchSticky] = useState(false);
  const [visibleCount, setVisibleCount] = useState(120);
  const isFirstFilterRun = useRef(true);

  useEffect(() => {
    setVisibleCount(120);
    if (isFirstFilterRun.current) {
      isFirstFilterRun.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, selectedCategory, selectedIndustry, selectedPrincipals, sort]);

  useEffect(() => {
    const onScroll = () => setSearchSticky(window.scrollY > 240);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const principalParam = searchParams.get("principal");
    setSelectedPrincipals(principalParam ? principalParam.split(",").filter(Boolean) : []);
    setSearch(searchParams.get("search") || "");
    setSelectedIndustry(searchParams.get("industry"));
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  // Base pool filtered by search text only (no industry/category/principal filters)
  // Each filter group shows options available given the OTHER two filters + search
  const baseSearch = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().trim();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.grade && p.grade.toLowerCase().includes(q)) ||
      p.principal.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [search, products]);

  const availableIndustries = useMemo(() => {
    const pool = baseSearch.filter((p) =>
      (!selectedCategory || p.category === selectedCategory) &&
      (selectedPrincipals.length === 0 || selectedPrincipals.includes(p.principal))
    );
    return [...new Set(pool.map((p) => p.industry))].sort();
  }, [baseSearch, selectedCategory, selectedPrincipals]);

  const availableCategories = useMemo(() => {
    const pool = baseSearch.filter((p) =>
      (!selectedIndustry || p.industry === selectedIndustry) &&
      (selectedPrincipals.length === 0 || selectedPrincipals.includes(p.principal))
    );
    return [...new Set(pool.map((p) => p.category))].sort();
  }, [baseSearch, selectedIndustry, selectedPrincipals]);

  const availablePrincipals = useMemo(() => {
    const pool = baseSearch.filter((p) =>
      (!selectedIndustry || p.industry === selectedIndustry) &&
      (!selectedCategory || p.category === selectedCategory)
    );
    return [...new Set(pool.map((p) => p.principal))].sort();
  }, [baseSearch, selectedIndustry, selectedCategory]);

  const q = optionsSearch.toLowerCase();
  const filteredIndustries = availableIndustries.filter(i => i.toLowerCase().includes(q));
  const filteredCategories = availableCategories.filter(c => c.toLowerCase().includes(q));
  const filteredPrincipals = availablePrincipals.filter(p => p.toLowerCase().includes(q));

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.grade && p.grade.toLowerCase().includes(q)) ||
        p.principal.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesIndustry = !selectedIndustry || p.industry === selectedIndustry;
      const matchesPrincipal = selectedPrincipals.length === 0 || selectedPrincipals.includes(p.principal);
      return matchesSearch && matchesCategory && matchesIndustry && matchesPrincipal;
    });

    const displayName = (p: typeof products[0]) => p.name.trim();
    if (sort === "az") result = [...result].sort((a, b) => displayName(a).localeCompare(displayName(b)));
    if (sort === "za") result = [...result].sort((a, b) => displayName(b).localeCompare(displayName(a)));

    return result;
  }, [products, search, selectedCategory, selectedIndustry, selectedPrincipals, sort]);

  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedIndustry ? 1 : 0) + selectedPrincipals.length;

  const clearFilters = () => {
    setSearch("");
    setOptionsSearch("");
    setSelectedCategory(null);
    setSelectedIndustry(null);
    setSelectedPrincipals([]);
    setSort("default");
  };

  const filtersContent = (
    <div className="flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter options..."
          value={optionsSearch}
          onChange={e => setOptionsSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-8 font-body text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {optionsSearch && (
          <button onClick={() => setOptionsSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <FilterGroup title="Industry" count={selectedIndustry ? 1 : 0}>
        {filteredIndustries.map(ind => (
          <FilterCheckbox key={ind} label={ind === "cosmetics" ? "Personal Care" : ind} active={selectedIndustry === ind} onClick={() => setSelectedIndustry(selectedIndustry === ind ? null : ind)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Category" count={selectedCategory ? 1 : 0}>
        {filteredCategories.map(cat => (
          <FilterCheckbox key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Principal" count={selectedPrincipals.length}>
        {filteredPrincipals.map(p => (
          <FilterCheckbox
            key={p}
            label={formatPrincipalName(p)}
            active={selectedPrincipals.includes(p)}
            onClick={() => setSelectedPrincipals(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
          />
        ))}
      </FilterGroup>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 py-2 font-body text-xs font-medium text-destructive hover:bg-destructive/10">
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      )}
    </div>
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Products", url: "https://www.scope-india.com/products" },
  ]);

  return (
    <main>
      <SEO
        title="Products & Ingredients Catalog | Scope India"
        description="Search our catalog of pharmaceutical, personal care and food ingredients from top global principals. Filter by application, dosage form, principal or industry."
        canonical="https://www.scope-india.com/products"
      />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <h1 className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Product Catalog
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Search by product name, compound name (INCI), brand, principal or application.
          </p>
        </div>
      </section>

      {/* Sticky search + toolbar */}
      <div className={`sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md transition-shadow ${searchSticky ? "shadow-md" : ""}`}>
        <div className="container-scope flex flex-col gap-4 py-4 sm:py-5 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name or compound (INCI)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-10 font-body text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 lg:justify-end">
            <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
              <span className="font-semibold text-foreground">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSort(sort === "az" ? "za" : sort === "za" ? "default" : "az")}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-foreground hover:border-primary/40"
              >
                {sort === "az" ? <ArrowUpAZ className="h-3.5 w-3.5" /> : sort === "za" ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpDown className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">Sort</span>
              </button>
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-foreground hover:border-primary/40 lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-sm text-primary-foreground">{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-foreground/40 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-card p-6 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="rounded-full p-1 hover:bg-muted">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              {filtersContent}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="sticky bottom-0 mt-6 w-full rounded-full bg-primary py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main: Sidebar (full-length, scrollable) + grid */}
      <section className="bg-background py-8">
        <div className="container-scope">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Desktop full-length sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-44 max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wider">Filters</h3>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-body text-xs font-bold text-primary">{filtered.length}</span>
                </div>
                {filtersContent}
              </div>
            </aside>

            {/* Product grid */}
            <div className="min-w-0 flex-1">
              {/* Active filter pills (desktop) */}
              {activeFilterCount > 0 && (
                <div className="mb-4 hidden flex-wrap gap-2 lg:flex">
                  {selectedIndustry && <Pill label={selectedIndustry} onClear={() => setSelectedIndustry(null)} />}
                  {selectedCategory && <Pill label={selectedCategory} onClear={() => setSelectedCategory(null)} />}
                  {selectedPrincipals.map(p => (
                    <Pill key={p} label={formatPrincipalName(p)} onClear={() => setSelectedPrincipals(prev => prev.filter(x => x !== p))} />
                  ))}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No products found</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <button onClick={clearFilters} className="rounded-full border border-primary px-5 py-2 font-display text-sm font-semibold text-primary hover:bg-primary/10">
                      Clear Filters
                    </button>
                    <Link to="/contact" className="rounded-full bg-primary px-5 py-2 font-display text-sm font-semibold text-primary-foreground">
                      Contact Us
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.slice(0, visibleCount).map((product, i) => {
                    const hasBrand = !!(product.brand && product.brand !== "-" && product.brand.trim());
                    const chemicalName = formatChemicalName(product.name.trim());
                    let titleText = hasBrand ? product.brand.trim() : chemicalName;
                    if (product.grade && product.grade !== "-") {
                      titleText = `${titleText} (${product.grade})`;
                    }
                    titleText = titleText.replace(/\s+/g, " ").trim().toUpperCase();
                    const showInci = hasBrand && chemicalName.toLowerCase() !== product.brand.trim().toLowerCase();

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.015, 0.2) }}
                        className="group relative overflow-hidden rounded-[1.25rem] bg-primary-muted/45 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-primary/10 hover:border-primary hover:ring-2 hover:ring-primary/20 hover:bg-primary-muted/65"
                      >
                        <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                        <Link
                          to={`/products/${product.id}`}
                          className="flex items-center justify-between gap-3 w-full"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-body text-xs text-heading/25 shrink-0 w-6 text-right tabular-nums">
                              {i + 1}
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-display text-sm sm:text-base font-bold text-heading uppercase tracking-tight leading-snug truncate">
                                {titleText}
                              </h3>
                              {showInci && (
                                <p className="font-body text-xs text-heading/50 leading-snug truncate">
                                  {chemicalName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:border-transparent">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {filtered.length > visibleCount && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="font-body text-xs text-muted-foreground">
                    Showing {visibleCount} of {filtered.length} products
                  </p>
                  <button
                    onClick={() => setVisibleCount(prev => prev + 120)}
                    className="rounded-full border border-border bg-card px-8 py-2.5 font-display text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        tag="Looking for Something Specific?"
        heading={<>Can't Find What<br />You Need?</>}
        description="We source on demand from our global principal network. Request a sample or talk to our technical team about your requirement."
        buttonText="Request a Sample"
        buttonLink="/request-sample"
      />
    </main>
  );
};

const Pill = ({ label, onClear }: { label: string; onClear: () => void }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary capitalize">
    {label}
    <button onClick={onClear} className="rounded-full hover:bg-primary/20">
      <X className="h-3 w-3" />
    </button>
  </span>
);

export default Products;
