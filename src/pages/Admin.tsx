import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Download, RotateCcw, Search,
  ChevronLeft, ChevronRight, Lock, LogOut, Package, Users, Newspaper,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { usePartners } from "@/context/PartnersContext";
import { useNews } from "@/context/NewsContext";
import type { Product } from "@/data/products";
import type { Partner } from "@/data/partners";
import type { NewsArticle } from "@/data/news";

const ADMIN_PASSWORD = "scope@2025";
const PAGE_SIZE = 25;

const INDUSTRIES = ["pharma", "cosmetics", "food"] as const;
const INDUSTRY_LABELS: Record<string, string> = { pharma: "Pharma", cosmetics: "Personal Care", food: "Food" };
const INDUSTRY_BADGE: Record<string, string> = {
  pharma: "bg-blue-50 text-blue-700 border-blue-200",
  cosmetics: "bg-pink-50 text-pink-700 border-pink-200",
  food: "bg-green-50 text-green-700 border-green-200",
};

const PHARMA_CATS = ["Polymers & Cellulosics","Film Coating Polymers","Enteric Polymers","Fillers & Diluents","Disintegrants","Disintegrants & Binders","Binders","Lubricants & Glidants","Solubilizers & Surfactants","Plasticizers & Humectants","Colorants","Coating & Polishing","Capsule & Gel Formers","Pharmaceutical Excipients"];
const COSMETICS_CATS = ["Active Ingredients","Antioxidants & Vitamins","Brightening Agents","Anti-Aging Actives","Peptides","Humectants & Fillers","Humectants & Polyols","Protein Actives","Lipids & Ceramides","UV Filters & Sunscreens","Preservatives","Silicones & Emollients","Botanical Extracts","Exfoliants","Emollients & Oils"];
const FOOD_CATS = ["Sweeteners","Emulsifiers","Stabilizers & Hydrocolloids","Starches & Thickeners","Vitamins & Nutrients","Minerals & Nutrients","Fatty Acids & Lipids","Proteins & Amino Acids","Probiotics & Prebiotics","Colors & Pigments","Flavors & Seasonings","Antioxidants & Preservatives","Food Ingredients"];

const inputCls = "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const labelCls = "font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground";

// ─── Login ────────────────────────────────────────────────────
const LoginGate = ({ onAuth }: { onAuth: () => void }) => {
  const [pw, setPw] = useState(""), [err, setErr] = useState(false);
  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem("scope_admin_auth","1"); onAuth(); }
    else { setErr(true); setPw(""); }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-center font-display text-xl font-bold text-foreground mb-1">Admin Panel</h1>
        <p className="text-center font-body text-sm text-muted-foreground mb-6">Scope Ingredients — CRM</p>
        <input type="password" placeholder="Password" value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key==="Enter" && attempt()}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        {err && <p className="mt-2 font-body text-xs text-destructive">Incorrect password</p>}
        <button onClick={attempt} className="mt-4 w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all">
          Sign In
        </button>
      </motion.div>
    </div>
  );
};

// ─── Shared slide-over wrapper ─────────────────────────────────
const SlideOver = ({ title, onClose, onSave, saveLabel, valid, children }: {
  title: string; onClose: () => void; onSave: () => void;
  saveLabel?: string; valid: boolean; children: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex">
    <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <motion.div initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
      transition={{ type:"spring", damping:28, stiffness:260 }}
      className="w-full max-w-lg flex flex-col bg-card shadow-2xl">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5 text-muted-foreground" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>
      <div className="sticky bottom-0 flex gap-3 border-t border-border bg-card px-6 py-4">
        <button onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold hover:bg-muted transition-all">Cancel</button>
        <button onClick={onSave} disabled={!valid}
          className="flex-1 rounded-full bg-accent py-2.5 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          {saveLabel ?? "Save"}
        </button>
      </div>
    </motion.div>
  </div>
);

// ─── Delete confirm ────────────────────────────────────────────
const DeleteConfirm = ({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <motion.div initial={{ scale:0.95,opacity:0 }} animate={{ scale:1,opacity:1 }}
      className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl border border-border">
      <h3 className="font-display text-lg font-bold text-foreground">Delete?</h3>
      <p className="mt-2 font-body text-sm text-muted-foreground">
        "<span className="font-semibold text-foreground">{name}</span>" will be permanently removed.
      </p>
      <div className="mt-5 flex gap-3">
        <button onClick={onCancel} className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold hover:bg-muted transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 rounded-full bg-destructive py-2.5 font-display text-sm font-semibold text-destructive-foreground hover:opacity-90 transition-all">Delete</button>
      </div>
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// PRODUCTS TAB
// ═══════════════════════════════════════════════════════════════
type ProductDraft = {
  id?: string;
  name: string; brand: string; principal: string; category: string;
  description: string; manufacturer: string; country: string; application: string;
  selectedIndustries: string[];
  grades: string[]; // multiple grades — one product entry per grade × industry
};

const EMPTY_PRODUCT: ProductDraft = {
  name:"", brand:"", principal:"", category:"", description:"",
  manufacturer:"", country:"", application:"",
  selectedIndustries:[], grades:[""],
};

const ProductsTab = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault, isCustomized } = useProducts();
  const { partners } = usePartners();

  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterPrincipal, setFilterPrincipal] = useState("");
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<ProductDraft | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("");

  const principalOptions = useMemo(() => [...new Set(partners.map(p => p.name))].sort(), [partners]);
  const allPrincipals = useMemo(() => [...new Set(products.map(p => p.principal))].sort(), [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p =>
      (!filterIndustry || p.industry === filterIndustry) &&
      (!filterPrincipal || p.principal === filterPrincipal) &&
      (!q || p.name.toLowerCase().includes(q) || (p.grade||"").toLowerCase().includes(q) || p.principal.toLowerCase().includes(q))
    );
  }, [products, search, filterIndustry, filterPrincipal]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const catOptions = (industries: string[]) => {
    const cats = new Set<string>();
    if (industries.includes("pharma")) PHARMA_CATS.forEach(c => cats.add(c));
    if (industries.includes("cosmetics")) COSMETICS_CATS.forEach(c => cats.add(c));
    if (industries.includes("food")) FOOD_CATS.forEach(c => cats.add(c));
    return [...cats].sort();
  };

  const saveDraft = () => {
    if (!draft) return;
    const grades = draft.grades.filter(g => g.trim());
    const industries = draft.selectedIndustries;

    if (draft.id) {
      // Single edit — update the existing entry
      const existing = products.find(p => p.id === draft.id);
      if (!existing) return;
      updateProduct({
        ...existing,
        name: draft.name, brand: draft.brand, principal: draft.principal,
        category: draft.category, description: draft.description,
        manufacturer: draft.manufacturer, country: draft.country, application: draft.application,
        grade: grades[0] || "",
        industry: (industries[0] || existing.industry) as Product["industry"],
      });
    } else {
      // New product — create one entry per industry × grade combination
      const effectiveGrades = grades.length > 0 ? grades : [""];
      for (const industry of industries) {
        for (const grade of effectiveGrades) {
          addProduct({
            name: draft.name, brand: draft.brand, principal: draft.principal,
            category: draft.category, description: draft.description,
            manufacturer: draft.manufacturer, country: draft.country, application: draft.application,
            grade, industry: industry as Product["industry"],
          });
        }
      }
    }
    setDraft(null);
  };

  const openEdit = (p: Product) => {
    setDraft({
      id: p.id, name: p.name, brand: p.brand||"", principal: p.principal,
      category: p.category, description: p.description, manufacturer: p.manufacturer||"",
      country: p.country||"", application: p.application||"",
      selectedIndustries: [p.industry], grades: [p.grade||""],
    });
  };

  const toggleIndustry = (ind: string) => {
    if (!draft) return;
    const has = draft.selectedIndustries.includes(ind);
    setDraft({ ...draft,
      selectedIndustries: has ? draft.selectedIndustries.filter(i => i!==ind) : [...draft.selectedIndustries, ind],
      category: "",
    });
  };

  const addGrade = () => {
    if (!draft || !gradeInput.trim()) return;
    const newGrades = gradeInput.split(/[,;]+/).map(g => g.trim()).filter(Boolean);
    setDraft({ ...draft, grades: [...draft.grades.filter(g=>g), ...newGrades] });
    setGradeInput("");
  };

  const removeGrade = (i: number) => {
    if (!draft) return;
    setDraft({ ...draft, grades: draft.grades.filter((_,idx) => idx!==i) });
  };

  const exportTs = () => {
    const lines = [
      "export interface Product {",
      "  id: string; name: string; brand?: string; grade?: string; principal: string;",
      "  category: string; industry: 'pharma' | 'cosmetics' | 'food';",
      "  description: string; manufacturer?: string; country?: string; application?: string;",
      "}","","export const products: Product[] = [",
    ];
    for (const p of products) {
      const q = (s?:string) => JSON.stringify(s||"");
      const parts = [`  id: ${q(p.id)}`, `  name: ${q(p.name)}`];
      if (p.brand) parts.push(`  brand: ${q(p.brand)}`);
      if (p.grade) parts.push(`  grade: ${q(p.grade)}`);
      parts.push(`  principal: ${q(p.principal)}`, `  category: ${q(p.category)}`,
        `  industry: ${q(p.industry)}`, `  description: ${q(p.description)}`);
      if (p.manufacturer) parts.push(`  manufacturer: ${q(p.manufacturer)}`);
      if (p.country) parts.push(`  country: ${q(p.country)}`);
      if (p.application) parts.push(`  application: ${q(p.application)}`);
      lines.push("  { " + parts.join(", ") + " },");
    }
    lines.push("];","");
    const blob = new Blob([lines.join("\n")], { type:"text/plain" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "products.ts" });
    a.click(); URL.revokeObjectURL(a.href);
  };

  const draftValid = !!draft && draft.name.trim() && draft.principal.trim() && draft.selectedIndustries.length > 0;
  const set = (f: Partial<ProductDraft>) => setDraft(d => d ? {...d,...f} : d);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search name, grade, principal..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-border bg-card pl-9 pr-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <select value={filterIndustry} onChange={e => { setFilterIndustry(e.target.value); setPage(1); }}
          className="rounded-xl border border-border bg-card px-3 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent">
          <option value="">All Industries</option>
          {INDUSTRIES.map(i => <option key={i} value={i}>{INDUSTRY_LABELS[i]}</option>)}
        </select>
        <select value={filterPrincipal} onChange={e => { setFilterPrincipal(e.target.value); setPage(1); }}
          className="rounded-xl border border-border bg-card px-3 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent">
          <option value="">All Principals</option>
          {allPrincipals.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <span className="font-body text-sm text-muted-foreground ml-auto">{filtered.length} products</span>
        {isCustomized && (
          <button onClick={() => confirm("Reset to default?") && resetToDefault()}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 font-display text-xs font-semibold text-muted-foreground hover:bg-muted transition-all">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        )}
        <button onClick={exportTs} className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 font-display text-xs font-semibold text-accent hover:bg-accent/20 transition-all">
          <Download className="h-3.5 w-3.5" /> Export .ts
        </button>
        <button onClick={() => setDraft({ ...EMPTY_PRODUCT })}
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["#","Name","Grade","Principal","Industry","Category","Application",""].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-display text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground tabular-nums">{(page-1)*PAGE_SIZE+i+1}</td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-display text-sm font-semibold text-foreground truncate">{p.name}</p>
                    {p.brand && <p className="font-body text-[11px] text-muted-foreground truncate">{p.brand}</p>}
                  </td>
                  <td className="px-4 py-3 font-body text-sm">{p.grade || <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-4 py-3 font-body text-sm max-w-[130px] truncate">{p.principal}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide ${INDUSTRY_BADGE[p.industry]}`}>
                      {INDUSTRY_LABELS[p.industry]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[140px] truncate">{p.category}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[180px]">
                    <span className="line-clamp-2">{p.application || p.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-accent hover:bg-accent-pale transition-all">
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-destructive hover:bg-destructive/10 transition-all">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center font-body text-sm text-muted-foreground">No products match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <span className="font-body text-xs text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button disabled={page===1} onClick={() => setPage(p=>p-1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-all"><ChevronLeft className="h-4 w-4" /></button>
              {Array.from({length:Math.min(5,totalPages)},(_,i) => {
                const pg = Math.max(1,Math.min(page-2,totalPages-4))+i;
                return <button key={pg} onClick={() => setPage(pg)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border font-display text-xs font-semibold transition-all ${pg===page?"border-accent bg-accent text-accent-foreground":"border-border hover:bg-muted"}`}>{pg}</button>;
              })}
              <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-all"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form */}
      <AnimatePresence>
        {draft && (
          <SlideOver key="product-form"
            title={draft.id ? "Edit Product" : "Add Product"}
            onClose={() => setDraft(null)} onSave={saveDraft} valid={!!draftValid}
            saveLabel={draft.id ? "Save Changes" : `Create ${!draft.id ? Math.max(1, draft.selectedIndustries.length) * Math.max(1, draft.grades.filter(g=>g).length) : 1} entr${!draft.id && Math.max(1, draft.selectedIndustries.length) * Math.max(1, draft.grades.filter(g=>g).length) > 1 ? "ies" : "y"}`}
          >
            {/* Industries — multi-select checkboxes */}
            <div>
              <label className={labelCls}>Industry * (select all that apply)</label>
              <div className="mt-2 flex gap-3">
                {INDUSTRIES.map(ind => (
                  <button key={ind} type="button"
                    onClick={() => toggleIndustry(ind)}
                    className={`flex-1 rounded-xl border py-2.5 font-display text-xs font-semibold transition-all ${draft.selectedIndustries.includes(ind) ? "border-accent bg-accent-pale text-accent" : "border-border text-muted-foreground hover:border-accent/50"}`}>
                    {INDUSTRY_LABELS[ind]}
                  </button>
                ))}
              </div>
              {draft.selectedIndustries.length === 0 && <p className="mt-1 font-body text-xs text-destructive">Select at least one industry</p>}
            </div>

            <div>
              <label className={labelCls}>Product Name (INCI / Generic) *</label>
              <input value={draft.name} onChange={e => set({name:e.target.value})} placeholder="e.g. HYDROXYPROPYL METHYLCELLULOSE" className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Brand Name</label>
                <input value={draft.brand} onChange={e => set({brand:e.target.value})} placeholder="e.g. RUTOCEL®" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Principal *</label>
                <select value={draft.principal} onChange={e => set({principal:e.target.value})} className={inputCls}>
                  <option value="">Select principal...</option>
                  {principalOptions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Grades — multi-entry */}
            <div>
              <label className={labelCls}>Grades {draft.id ? "" : "(add multiple — one product per grade)"}</label>
              <div className="mt-2 flex gap-2">
                <input value={gradeInput} onChange={e => setGradeInput(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && (e.preventDefault(), addGrade())}
                  placeholder="e.g. E3, K4M (comma separated)" className={`${inputCls} mt-0 flex-1`} />
                <button type="button" onClick={addGrade}
                  className="mt-0 rounded-xl border border-accent px-3 font-display text-xs font-semibold text-accent hover:bg-accent-pale transition-all">
                  Add
                </button>
              </div>
              {draft.grades.filter(g=>g).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {draft.grades.filter(g=>g).map((g,i) => (
                    <span key={i} className="flex items-center gap-1 rounded-full bg-accent-pale px-3 py-1 font-display text-xs font-semibold text-accent">
                      {g}
                      <button type="button" onClick={() => removeGrade(i)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-1 font-body text-[11px] text-muted-foreground">Leave empty if product has no specific grade</p>
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <select value={draft.category} onChange={e => set({category:e.target.value})} className={inputCls}>
                <option value="">{draft.selectedIndustries.length === 0 ? "Select industry first..." : "Select category..."}</option>
                {catOptions(draft.selectedIndustries).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Manufacturer</label>
                <input value={draft.manufacturer} onChange={e => set({manufacturer:e.target.value})} placeholder="e.g. Taian Ruitai" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Country</label>
                <input value={draft.country} onChange={e => set({country:e.target.value})} placeholder="e.g. China" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Application</label>
              <textarea value={draft.application} onChange={e => set({application:e.target.value})} rows={3} placeholder="e.g. Solid orals, Coatings & Pellets" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Description / About</label>
              <textarea value={draft.description} onChange={e => set({description:e.target.value})} rows={3} placeholder="Short description..." className={inputCls} />
            </div>
          </SlideOver>
        )}
      </AnimatePresence>

      {deleteId && (
        <DeleteConfirm name={products.find(p=>p.id===deleteId)?.name??""} onCancel={() => setDeleteId(null)}
          onConfirm={() => { deleteProduct(deleteId); setDeleteId(null); }} />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PRINCIPALS TAB
// ═══════════════════════════════════════════════════════════════
type PartnerDraft = Omit<Partner,"id"> & { id?: string };
const EMPTY_PARTNER: PartnerDraft = { name:"", country:"", verticals:[], specialty:"", logo:"", about:"" };

const PrincipalsTab = () => {
  const { partners, addPartner, updatePartner, deletePartner, resetToDefault, isCustomized } = usePartners();
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<PartnerDraft | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? partners : partners.filter(p =>
      p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q));
  }, [partners, search]);

  const set = (f: Partial<PartnerDraft>) => setDraft(d => d ? {...d,...f} : d);

  const toggleVertical = (v: "pharma"|"cosmetics"|"food") => {
    if (!draft) return;
    const has = draft.verticals.includes(v);
    set({ verticals: has ? draft.verticals.filter(x=>x!==v) : [...draft.verticals, v] });
  };

  const save = () => {
    if (!draft) return;
    if (draft.id) updatePartner(draft as Partner);
    else addPartner(draft);
    setDraft(null);
  };

  const exportTs = () => {
    const lines = ["export interface Partner { id:string; name:string; country:string; verticals:(\"pharma\"|\"cosmetics\"|\"food\")[]; specialty:string; logo?:string; about?:string; }","","export const partners: Partner[] = ["];
    for (const p of partners) {
      lines.push(`  { id: ${JSON.stringify(p.id)}, name: ${JSON.stringify(p.name)}, country: ${JSON.stringify(p.country)}, verticals: ${JSON.stringify(p.verticals)}, specialty: ${JSON.stringify(p.specialty)}${p.logo ? `, logo: ${JSON.stringify(p.logo)}` : ""}${p.about ? `, about: ${JSON.stringify(p.about)}` : ""} },`);
    }
    lines.push("];","");
    const blob = new Blob([lines.join("\n")], { type:"text/plain" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "partners.ts" });
    a.click(); URL.revokeObjectURL(a.href);
  };

  const valid = !!draft && draft.name.trim() && draft.country.trim() && draft.verticals.length > 0;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search principals..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-9 pr-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <span className="font-body text-sm text-muted-foreground ml-auto">{filtered.length} principals</span>
        {isCustomized && <button onClick={() => confirm("Reset?") && resetToDefault()} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 font-display text-xs font-semibold text-muted-foreground hover:bg-muted transition-all"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>}
        <button onClick={exportTs} className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 font-display text-xs font-semibold text-accent hover:bg-accent/20 transition-all"><Download className="h-3.5 w-3.5" /> Export .ts</button>
        <button onClick={() => setDraft({...EMPTY_PARTNER})} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all"><Plus className="h-4 w-4" /> Add Principal</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {["Logo","Name","Country","Verticals","Specialty",""].map(h => (
                <th key={h} className="px-4 py-3 text-left font-display text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  {p.logo
                    ? <img src={p.logo.startsWith("data:") ? p.logo : `/logos/${p.logo}`} alt={p.name} className="h-8 w-16 object-contain object-left" />
                    : <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-display text-xs font-bold text-primary">{p.name.slice(0,2).toUpperCase()}</div>}
                </td>
                <td className="px-4 py-3 font-display text-sm font-semibold text-foreground">{p.name}</td>
                <td className="px-4 py-3 font-body text-sm text-muted-foreground">{p.country}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.verticals.map(v => <span key={v} className={`inline-flex rounded-full border px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide ${INDUSTRY_BADGE[v]}`}>{INDUSTRY_LABELS[v]}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[200px] truncate">{p.specialty}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setDraft(p)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-accent hover:bg-accent-pale transition-all"><Pencil className="h-3 w-3" /> Edit</button>
                    <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="h-3 w-3" /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center font-body text-sm text-muted-foreground">No principals found.</td></tr>}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {draft && (
          <SlideOver key="partner-form" title={draft.id ? "Edit Principal" : "Add Principal"}
            onClose={() => setDraft(null)} onSave={save} valid={!!valid}>
            <div>
              <label className={labelCls}>Name *</label>
              <input value={draft.name} onChange={e => set({name:e.target.value})} placeholder="e.g. BASF SE" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Country *</label>
                <input value={draft.country} onChange={e => set({country:e.target.value})} placeholder="e.g. Germany" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Logo</label>
                {/* Preview */}
                {draft.logo && (
                  <div className="mt-1 mb-2 flex items-center gap-3">
                    <img
                      src={draft.logo.startsWith("data:") ? draft.logo : `/logos/${draft.logo}`}
                      alt="preview"
                      className="h-10 max-w-[120px] object-contain rounded border border-border p-1 bg-white"
                    />
                    <button type="button" onClick={() => set({ logo: "" })}
                      className="font-body text-xs text-destructive hover:underline">Remove</button>
                  </div>
                )}
                {/* Upload button */}
                <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-2.5 hover:border-accent/60 transition-colors">
                  <span className="font-body text-sm text-muted-foreground">
                    {draft.logo ? "Replace logo..." : "Upload logo file..."}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => set({ logo: ev.target?.result as string });
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <p className="mt-1 font-body text-[11px] text-muted-foreground">
                  Or type a filename if already in /logos/:{" "}
                  <input value={draft.logo?.startsWith("data:") ? "" : (draft.logo || "")}
                    onChange={e => set({ logo: e.target.value })}
                    placeholder="e.g. basf.png"
                    className="inline w-32 rounded border border-border bg-background px-2 py-0.5 font-body text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent" />
                </p>
              </div>
            </div>
            <div>
              <label className={labelCls}>Verticals * (select all)</label>
              <div className="mt-2 flex gap-3">
                {INDUSTRIES.map(ind => (
                  <button key={ind} type="button" onClick={() => toggleVertical(ind)}
                    className={`flex-1 rounded-xl border py-2.5 font-display text-xs font-semibold transition-all ${draft.verticals.includes(ind) ? "border-accent bg-accent-pale text-accent" : "border-border text-muted-foreground hover:border-accent/50"}`}>
                    {INDUSTRY_LABELS[ind]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Specialty *</label>
              <input value={draft.specialty} onChange={e => set({specialty:e.target.value})} placeholder="e.g. Rheology modifiers & carbomers" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>About</label>
              <textarea value={draft.about||""} onChange={e => set({about:e.target.value})} rows={5} placeholder="Company description..." className={inputCls} />
            </div>
          </SlideOver>
        )}
      </AnimatePresence>

      {deleteId && <DeleteConfirm name={partners.find(p=>p.id===deleteId)?.name??""} onCancel={() => setDeleteId(null)}
        onConfirm={() => { deletePartner(deleteId); setDeleteId(null); }} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// NEWS TAB
// ═══════════════════════════════════════════════════════════════
type ArticleDraft = Omit<NewsArticle,"id"|"slug"> & { id?: string; slug?: string };
const EMPTY_ARTICLE: ArticleDraft = { title:"", excerpt:"", date: new Date().toISOString().slice(0,10), category:"News", image:"" };

const NewsTab = () => {
  const { articles, addArticle, updateArticle, deleteArticle, resetToDefault, isCustomized } = useNews();
  const [draft, setDraft] = useState<ArticleDraft | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const set = (f: Partial<ArticleDraft>) => setDraft(d => d ? {...d,...f} : d);

  const save = () => {
    if (!draft) return;
    if (draft.id) updateArticle(draft as NewsArticle);
    else addArticle(draft);
    setDraft(null);
  };

  const exportTs = () => {
    const lines = ["export type NewsCategory = \"Event\" | \"News\" | \"Press\";","export interface NewsArticle { id:string; slug:string; title:string; excerpt:string; date:string; category:NewsCategory; image?:string; }","","export const articles: NewsArticle[] = ["];
    for (const a of articles) {
      lines.push(`  { id: ${JSON.stringify(a.id)}, slug: ${JSON.stringify(a.slug)}, title: ${JSON.stringify(a.title)}, excerpt: ${JSON.stringify(a.excerpt)}, date: ${JSON.stringify(a.date)}, category: ${JSON.stringify(a.category)}${a.image?`, image: ${JSON.stringify(a.image)}`:""} },`);
    }
    lines.push("];","");
    const blob = new Blob([lines.join("\n")], { type:"text/plain" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "news.ts" });
    a.click(); URL.revokeObjectURL(a.href);
  };

  const CATEGORY_BADGE: Record<string,string> = {
    Event: "bg-accent-pale text-accent border-accent/20",
    News: "bg-blue-50 text-blue-700 border-blue-200",
    Press: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const valid = !!draft && draft.title.trim() && draft.excerpt.trim() && draft.date;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="font-body text-sm text-muted-foreground">{articles.length} articles</span>
        {isCustomized && <button onClick={() => confirm("Reset?") && resetToDefault()} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 font-display text-xs font-semibold text-muted-foreground hover:bg-muted transition-all"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>}
        <button onClick={exportTs} className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 font-display text-xs font-semibold text-accent hover:bg-accent/20 transition-all"><Download className="h-3.5 w-3.5" /> Export .ts</button>
        <button onClick={() => setDraft({...EMPTY_ARTICLE})} className="ml-auto flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all"><Plus className="h-4 w-4" /> Add Article</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {["Date","Category","Title","Excerpt",""].map(h => (
                <th key={h} className="px-4 py-3 text-left font-display text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...articles].sort((a,b) => b.date.localeCompare(a.date)).map(a => (
              <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-body text-xs text-muted-foreground whitespace-nowrap">{a.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 font-display text-[10px] font-bold ${CATEGORY_BADGE[a.category]}`}>{a.category}</span>
                </td>
                <td className="px-4 py-3 font-display text-sm font-semibold text-foreground max-w-[220px]">
                  <p className="truncate">{a.title}</p>
                </td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[280px]">
                  <p className="line-clamp-2">{a.excerpt}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setDraft(a)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-accent hover:bg-accent-pale transition-all"><Pencil className="h-3 w-3" /> Edit</button>
                    <button onClick={() => setDeleteId(a.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-xs font-semibold text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="h-3 w-3" /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && <tr><td colSpan={5} className="py-12 text-center font-body text-sm text-muted-foreground">No articles yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {draft && (
          <SlideOver key="article-form" title={draft.id ? "Edit Article" : "Add Article"}
            onClose={() => setDraft(null)} onSave={save} valid={!!valid}>
            <div>
              <label className={labelCls}>Title *</label>
              <input value={draft.title} onChange={e => set({title:e.target.value})} placeholder="e.g. Scope at CPhI India 2026" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Category *</label>
                <select value={draft.category} onChange={e => set({category:e.target.value as any})} className={inputCls}>
                  <option value="Event">Event</option>
                  <option value="News">News</option>
                  <option value="Press">Press</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Date *</label>
                <input type="date" value={draft.date} onChange={e => set({date:e.target.value})} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Excerpt *</label>
              <textarea value={draft.excerpt} onChange={e => set({excerpt:e.target.value})} rows={3} placeholder="Short summary shown in the news listing..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Image URL (optional)</label>
              <input value={draft.image||""} onChange={e => set({image:e.target.value})} placeholder="https://..." className={inputCls} />
            </div>
          </SlideOver>
        )}
      </AnimatePresence>

      {deleteId && <DeleteConfirm name={articles.find(a=>a.id===deleteId)?.title??""} onCancel={() => setDeleteId(null)}
        onConfirm={() => { deleteArticle(deleteId); setDeleteId(null); }} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN ADMIN
// ═══════════════════════════════════════════════════════════════
type Tab = "products" | "principals" | "news";

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("scope_admin_auth")==="1");
  const [tab, setTab] = useState<Tab>("products");
  const { products } = useProducts();
  const { partners } = usePartners();
  const { articles } = useNews();

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  const TABS: { id: Tab; label: string; icon: any; count: number }[] = [
    { id:"products",   label:"Products",   icon:Package,  count:products.length },
    { id:"principals", label:"Principals", icon:Users,    count:partners.length },
    { id:"news",       label:"News & Events", icon:Newspaper, count:articles.length },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Scope Admin</h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Product, Principal & News Management</p>
          </div>
          <button onClick={() => { sessionStorage.removeItem("scope_admin_auth"); setAuthed(false); }}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-all" title="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-[1600px] px-6 flex gap-1 pb-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 font-display text-sm font-semibold border-b-2 transition-all ${tab===t.id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="h-4 w-4" />
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 font-body text-[10px] font-bold ${tab===t.id ? "bg-accent text-white" : "bg-muted text-muted-foreground"}`}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        {tab === "products"   && <ProductsTab />}
        {tab === "principals" && <PrincipalsTab />}
        {tab === "news"       && <NewsTab />}
      </div>
    </div>
  );
};

export default Admin;
