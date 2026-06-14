import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowUpDown, ArrowUpAZ, ArrowDownAZ, ChevronRight } from "lucide-react";
import { products, categories, industries } from "@/data/products";
import { partners } from "@/data/partners";

type SortOption = "default" | "az" | "za";

const industryCardStyles: Record<string, { hoverBorder: string; hoverShadow: string; bgTint: string }> = {
  pharma: {
    hoverBorder: "hover:border-neutral-400",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
    bgTint: "bg-gradient-to-br from-card to-neutral-500/[0.005] hover:to-neutral-500/[0.015]",
  },
  cosmetics: {
    hoverBorder: "hover:border-neutral-400",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
    bgTint: "bg-gradient-to-br from-card to-neutral-500/[0.005] hover:to-neutral-500/[0.015]",
  },
  food: {
    hoverBorder: "hover:border-neutral-400",
    hoverShadow: "hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
    bgTint: "bg-gradient-to-br from-card to-neutral-500/[0.005] hover:to-neutral-500/[0.015]",
  },
};

const formatProductName = (name: string): string => {
  if (!name) return "";
  const hasLowercase = /[a-z]/.test(name);
  if (hasLowercase) {
    return name.trim();
  }
  const minorWords = ["and", "or", "of", "with", "for", "in", "by", "to", "at", "on", "a", "an", "the"];
  return name
    .split(/\s+/)
    .map((word, index) => {
      if (!word) return "";
      const slashParts = word.split('/');
      const formattedSlash = slashParts.map(part => {
        const hyphenParts = part.split('-');
        const formattedHyphen = hyphenParts.map(subWord => {
          if (!subWord) return "";
          if (/^C\d+/i.test(subWord)) {
            return "C" + subWord.slice(1).toUpperCase();
          }
          return subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase();
        });
        return formattedHyphen.join('-');
      });
      const resultWord = formattedSlash.join('/');
      const lower = word.toLowerCase();
      if (minorWords.includes(lower) && index !== 0) {
        return lower;
      }
      return resultWord;
    })
    .join(' ');
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialPrincipal = searchParams.get("principal") || null;
  const initialIndustry = searchParams.get("industry") || null;
  const initialCategory = searchParams.get("category") || null;

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(initialIndustry);
  const [selectedPrincipal, setSelectedPrincipal] = useState<string | null>(initialPrincipal);
  const [optionsSearch, setOptionsSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("default");
  const [searchSticky, setSearchSticky] = useState(false);
  const [visibleCount, setVisibleCount] = useState(120);

  useEffect(() => {
    setVisibleCount(120);
  }, [search, selectedCategory, selectedIndustry, selectedPrincipal, sort]);

  useEffect(() => {
    const onScroll = () => setSearchSticky(window.scrollY > 240);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const p = searchParams.get("principal");
    setSelectedPrincipal(p);
    
    const s = searchParams.get("search");
    setSearch(s || "");
    
    const ind = searchParams.get("industry");
    setSelectedIndustry(ind);
    
    const cat = searchParams.get("category");
    setSelectedCategory(cat);
  }, [searchParams]);

  const selectedPartner = useMemo(() => {
    if (!selectedPrincipal) return null;
    return partners.find((p) => p.name === selectedPrincipal) || null;
  }, [selectedPrincipal]);

  const principals = useMemo(() => [...new Set(products.map((p) => p.principal))].sort(), []);

  const filteredIndustries = useMemo(() => industries.filter((i) => i.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);
  const filteredCategories = useMemo(() => categories.filter((c) => c.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);
  const filteredPrincipals = useMemo(() => principals.filter((p) => p.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch, principals]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.inci && p.inci.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.grade && p.grade.toLowerCase().includes(q)) ||
        p.principal.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesIndustry = !selectedIndustry || p.industry === selectedIndustry;
      const matchesPrincipal = !selectedPrincipal || p.principal === selectedPrincipal;
      return matchesSearch && matchesCategory && matchesIndustry && matchesPrincipal;
    });

    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") result = [...result].sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, selectedCategory, selectedIndustry, selectedPrincipal, sort]);

  const activeFilterCount = [selectedCategory, selectedIndustry, selectedPrincipal].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setOptionsSearch("");
    setSelectedCategory(null);
    setSelectedIndustry(null);
    setSelectedPrincipal(null);
    setSort("default");
  };

  const industryColors: Record<string, string> = {
    pharma: "bg-accent text-accent-foreground",
    cosmetics: "bg-teal text-teal-foreground",
    food: "bg-surface-dark text-surface-dark-foreground",
  };

  const FilterGroup = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
    <div className="border-b border-border/60 py-4 first:pt-0">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-display text-[13px] font-extrabold uppercase tracking-wider text-foreground">{title}</h4>
        {count !== undefined && count > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">{count}</span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );

  const FilterCheckbox = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-md px-2 py-2 text-left font-body text-[15px] transition-colors ${active ? "bg-accent-pale text-accent font-medium" : "text-foreground/75 hover:bg-muted hover:text-foreground font-normal"
        }`}
    >
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${active ? "border-accent bg-accent" : "border-border bg-background"}`}>
        {active && <span className="block h-2 w-2 rounded-[1.5px] bg-white" />}
      </span>
      <span className="capitalize truncate">{label}</span>
    </button>
  );

  const filtersContent = (
    <div className="flex flex-col">
      {/* Inner search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter options..."
          value={optionsSearch}
          onChange={(e) => setOptionsSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-8 font-body text-xs text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {optionsSearch && (
          <button onClick={() => setOptionsSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <FilterGroup title="Industry" count={selectedIndustry ? 1 : 0}>
        {filteredIndustries.map((ind) => (
          <FilterCheckbox key={ind} label={ind} active={selectedIndustry === ind} onClick={() => setSelectedIndustry(selectedIndustry === ind ? null : ind)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Category" count={selectedCategory ? 1 : 0}>
        {filteredCategories.map((cat) => (
          <FilterCheckbox key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Principal" count={selectedPrincipal ? 1 : 0}>
        {filteredPrincipals.map((p) => (
          <FilterCheckbox key={p} label={p} active={selectedPrincipal === p} onClick={() => setSelectedPrincipal(selectedPrincipal === p ? null : p)} />
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
        title={`${selectedPartner ? selectedPartner.name + " " : ""}Products & Ingredients Catalog | Scope India`}
        description="Search our catalog of pharmaceutical, cosmetic and food ingredients from top global principals. Filter by application, dosage form, principal or industry."
        canonical="https://www.scope-india.com/products"
      />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Products
          </p>
          <h1 className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            {selectedPartner ? `${selectedPartner.name} Products` : "Product Catalog"}
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            {selectedPartner?.about ? selectedPartner.about : "Search by product name, compound name (INCI), brand, principal or application."}
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
              className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-10 font-body text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
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
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-foreground hover:border-accent/40"
              >
                {sort === "az" ? <ArrowUpAZ className="h-3.5 w-3.5" /> : sort === "za" ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpDown className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">Sort</span>
              </button>
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-foreground hover:border-accent/40 lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">{activeFilterCount}</span>
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
                <h3 className="font-display text-base font-semibold text-foreground">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="rounded-full p-1 hover:bg-muted">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              {filtersContent}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="sticky bottom-0 mt-6 w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground shadow-lg"
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
                  <h3 className="font-display text-sm font-extrabold text-foreground uppercase tracking-wider">Filters</h3>
                  <span className="rounded-full bg-accent-pale px-2 py-0.5 font-body text-xs font-bold text-accent">{filtered.length}</span>
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
                  {selectedPrincipal && <Pill label={selectedPrincipal} onClear={() => setSelectedPrincipal(null)} />}
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
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.slice(0, visibleCount).map((product, i) => {
                    let titleText = (product.brand && product.brand !== "-" && product.brand.trim() !== "")
                      ? product.brand.trim()
                      : product.name.trim();

                    if (product.grade && product.grade !== "-" && !titleText.includes(product.grade)) {
                      titleText = `${titleText} (${product.grade})`;
                    }

                    // Remove registered trademark ® and trade mark ™ symbols
                    titleText = titleText
                      .replace(/®/g, " ")
                      .replace(/™/g, " ")
                      .replace(/\s+/g, " ")
                      .trim()
                      .toUpperCase();

                    const subtitleText = (product.brand && product.brand !== "-" && product.brand.trim() !== "" && product.brand.trim().toLowerCase() !== product.name.trim().toLowerCase())
                      ? formatProductName(product.name)
                      : "";

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.015, 0.2) }}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-[1.25rem] bg-primary-muted/45 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-primary/10 hover:bg-primary-muted/65"
                      >
                        <Link
                          to={`/request-sample?product=${encodeURIComponent(
                            product.brand && product.brand !== "-"
                              ? `${product.brand} (${product.name})`
                              : product.name
                          )}`}
                          className="flex flex-col justify-between h-full min-h-[160px] w-full"
                        >
                          <div className="flex flex-col">
                            {/* Title (Brand Name) */}
                            <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900 uppercase tracking-tight leading-snug">
                              {titleText}
                            </h3>
                            {/* Subtitle (Generic Name) */}
                            {subtitleText && (
                              <p className="mt-2 font-body text-xs sm:text-sm text-neutral-500 font-normal leading-normal">
                                {subtitleText}
                              </p>
                            )}
                          </div>

                          {/* Bottom Circular Arrow Button */}
                          <div className="mt-4 flex justify-end">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-white text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-transparent">
                              <ChevronRight className="h-4 w-4" />
                            </div>
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
                    className="rounded-full border border-border bg-card px-8 py-2.5 font-display text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-accent py-12">
        <div className="container-scope text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground">Looking for something specific?</h2>
          <p className="mt-2 font-body text-accent-foreground/90">We source on demand from our global principal network.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-card px-6 py-3 font-display text-sm font-semibold text-foreground hover:shadow-xl">
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
};

const Pill = ({ label, onClear }: { label: string; onClear: () => void }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-accent-pale px-3 py-1 font-body text-xs font-medium text-accent capitalize">
    {label}
    <button onClick={onClear} className="rounded-full hover:bg-accent/20">
      <X className="h-3 w-3" />
    </button>
  </span>
);

export default Products;
