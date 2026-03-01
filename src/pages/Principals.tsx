import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  ArrowUpDown, 
  ArrowUpAZ, 
  ArrowDownAZ 
} from "lucide-react";
import { partners } from "@/data/partners";

type SortOption = "default" | "az" | "za";

const industries = ["pharma", "cosmetics", "food"] as const;

const Principals = () => {
  const [search, setSearch] = useState("");
  const [optionsSearch, setOptionsSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("industry");

  const filteredIndustries = useMemo(() => industries.filter(i => i.toLowerCase().includes(optionsSearch.toLowerCase())), [optionsSearch]);

  const filtered = useMemo(() => {
    let result = partners.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.about && p.about.toLowerCase().includes(q));
      
      const matchesIndustry = !selectedIndustry || p.verticals.includes(selectedIndustry as any);
      
      return matchesSearch && matchesIndustry;
    });

    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") result = [...result].sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, selectedIndustry, sort]);

  const activeFilterCount = selectedIndustry ? 1 : 0;

  const clearFilters = () => {
    setSearch("");
    setOptionsSearch("");
    setSelectedIndustry(null);
    setSort("default");
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
            <div className="mt-1 flex flex-col gap-0.5">{children}</div>
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

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-destructive/20 py-2 font-body text-sm text-destructive hover:bg-destructive/5">
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
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Principals
          </p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Our Global Principals
          </motion.h1>
          <p className="mt-2 font-body text-primary-foreground/60 max-w-3xl">
            World-class ingredient manufacturers we proudly represent in India. 
            Search by name, specialty, or country.
          </p>
          
          <div className="relative mt-6 max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search principals..."
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

            {/* Content grid */}
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
                {selectedIndustry && (
                  <div className="ml-auto hidden flex-wrap gap-2 lg:flex">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-pale px-3 py-1 font-body text-xs font-medium text-accent">
                      {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)}
                      <button onClick={() => setSelectedIndustry(null)}><X className="h-3 w-3" /></button>
                    </span>
                  </div>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No principals found</p>
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
                  {filtered.map((partner, i) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.015, 0.15) }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(13,33,55,0.12)]"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
                      
                      <div>
                        <div className="flex h-16 w-32 shrink-0 items-center justify-start rounded-xl">
                          <img 
                            src={`/logos/${partner.id}.png`} 
                            alt={partner.name}
                            className="h-full w-full object-contain object-left"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = "none";
                              const div = document.createElement("div");
                              div.className = "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-base font-bold";
                              div.textContent = partner.name.substring(0, 2).toUpperCase();
                              target.parentElement?.appendChild(div);
                            }}
                          />
                        </div>

                        <div className="mt-4">
                          <h3 className="font-display text-lg font-semibold text-foreground">{partner.name}</h3>
                          <p className="font-body text-xs text-muted-foreground">{partner.country}</p>
                          <p className="mt-2 font-body text-sm text-text-secondary line-clamp-3">{partner.specialty}</p>
                        </div>
                      </div>

                      <Link to={`/principals/${partner.id}`} className="mt-6 flex items-center justify-between text-accent hover:text-accent-light font-display text-sm font-semibold group">
                        View Details
                        <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
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
