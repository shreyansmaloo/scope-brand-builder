import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, SlidersHorizontal, ArrowUpDown, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { partners } from "@/data/partners";

type SortOption = "default" | "az" | "za";

const industries = ["pharma", "cosmetics", "food"] as const;

const Principals = () => {
  const [search, setSearch] = useState("");
  const [optionsSearch, setOptionsSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchSticky, setSearchSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSearchSticky(window.scrollY > 240);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const countries = useMemo(() => [...new Set(partners.map((p) => p.country))].filter(Boolean).sort(), []);

  const filteredIndustries = useMemo(() => industries.filter((i) => i.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);
  const filteredCountries = useMemo(() => countries.filter((c) => c.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch, countries]);

  const filtered = useMemo(() => {
    let result = partners.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.about && p.about.toLowerCase().includes(q));
      const matchesIndustry = !selectedIndustry || p.verticals.includes(selectedIndustry as any);
      const matchesCountry = !selectedCountry || p.country === selectedCountry;
      return matchesSearch && matchesIndustry && matchesCountry;
    });
    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [search, selectedIndustry, selectedCountry, sort]);

  const activeFilterCount = (selectedIndustry ? 1 : 0) + (selectedCountry ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setOptionsSearch("");
    setSelectedIndustry(null);
    setSelectedCountry(null);
    setSort("default");
  };

  const FilterGroup = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
    <div className="border-b border-border/60 py-4 first:pt-0">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-foreground">{title}</h4>
        {count !== undefined && count > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-accent-foreground">{count}</span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );

  const FilterCheckbox = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left font-body text-[13px] transition-colors ${
        active ? "bg-accent-pale text-accent font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${active ? "border-accent bg-accent" : "border-border bg-background"}`}>
        {active && <span className="block h-1.5 w-1.5 rounded-[1px] bg-white" />}
      </span>
      <span className="capitalize truncate">{label}</span>
    </button>
  );

  const filtersContent = (
    <div className="flex flex-col">
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

      <FilterGroup title="Country" count={selectedCountry ? 1 : 0}>
        {filteredCountries.map((c) => (
          <FilterCheckbox key={c} label={c} active={selectedCountry === c} onClick={() => setSelectedCountry(selectedCountry === c ? null : c)} />
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
    { name: "Principals", url: "https://www.scope-india.com/principals" },
  ]);

  return (
    <main>
      <SEO
        title="Global Principal Representation India | Scope India"
        description="View our network of global ingredient manufacturers. Trusted principal representation in India for pharmaceutical, cosmetic, and food ingredients."
        canonical="https://www.scope-india.com/principals"
      />
      <StructuredData data={breadcrumbSchema} />

      <section className="surface-dark pt-28 pb-10">
        <div className="container-scope">
          <p className="font-body text-xs text-surface-dark-foreground/60">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Principals
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-surface-dark-foreground">Our Global Principals</h1>
          <p className="mt-2 max-w-3xl font-body text-sm text-surface-dark-foreground/70">
            World-class ingredient manufacturers we proudly represent in India. Search by name, compound, specialty or country.
          </p>
        </div>
      </section>

      {/* Sticky search bar */}
      <div className={`sticky top-14 z-30 border-b border-border bg-background/95 backdrop-blur-md transition-shadow ${searchSticky ? "shadow-md" : ""}`}>
        <div className="container-scope flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search principals by name, compound, specialty or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-10 font-body text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
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
              <button onClick={() => setMobileFiltersOpen(false)} className="sticky bottom-0 mt-6 w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground shadow-lg">
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="bg-background py-8">
        <div className="container-scope">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-foreground">Filters</h3>
                  <span className="rounded-full bg-accent-pale px-2 py-0.5 font-body text-xs font-medium text-accent">{filtered.length}</span>
                </div>
                {filtersContent}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No principals found</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <button onClick={clearFilters} className="rounded-full border border-accent px-5 py-2 font-display text-sm font-semibold text-accent hover:bg-accent-pale">Clear Filters</button>
                    <Link to="/contact" className="rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground">Contact Us</Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filtered.map((partner, i) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.015, 0.15) }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-accent/40 hover:shadow-[0_12px_40px_rgba(180,90,20,0.12)]"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
                      <div>
                        <div className="flex h-16 w-32 shrink-0 items-center justify-start">
                          <img
                            src={`/logos/${partner.id}.png`}
                            alt={partner.name}
                            className="h-full w-full object-contain object-left"
                            onError={(e) => {
                              const t = e.currentTarget;
                              t.style.display = "none";
                              const div = document.createElement("div");
                              div.className = "flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground font-display text-base font-bold";
                              div.textContent = partner.name.substring(0, 2).toUpperCase();
                              t.parentElement?.appendChild(div);
                            }}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-display text-lg font-semibold text-foreground">{partner.name}</h3>
                          <p className="font-body text-xs text-muted-foreground">{partner.country}</p>
                          <p className="mt-2 font-body text-sm text-text-secondary line-clamp-3">{partner.specialty}</p>
                        </div>
                      </div>
                      <Link to={`/principals/${partner.id}`} className="group mt-6 flex items-center justify-between font-display text-sm font-semibold text-accent hover:text-accent-light">
                        View Details
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Principals;
