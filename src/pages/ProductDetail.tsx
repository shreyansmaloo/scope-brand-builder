import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, FlaskConical, Tag, Globe, Factory,
  Package, ChevronRight, Send, Building2
} from "lucide-react";
import { products } from "@/data/products";
import { partners } from "@/data/partners";
import NotFound from "./NotFound";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";

const industryLabel: Record<string, string> = {
  pharma: "Pharmaceutical",
  cosmetics: "Personal Care & Cosmetics",
  food: "Food & Nutrition",
};

const industryColors: Record<string, string> = {
  pharma: "bg-accent/10 text-accent border-accent/20",
  cosmetics: "bg-teal/10 text-teal border-teal/20",
  food: "bg-surface-dark/10 text-surface-dark border-surface-dark/20",
};

const formatName = (name: string): string => {
  if (!name) return "";
  if (/[a-z]/.test(name)) return name.trim();
  const minorWords = ["and", "or", "of", "with", "for", "in", "by", "to", "at", "on", "a", "an", "the"];
  return name.split(/\s+/).map((word, idx) => {
    if (!word) return "";
    const parts = word.split('/').map(p =>
      p.split('-').map(sub => {
        if (!sub) return "";
        if (/^C\d+/i.test(sub)) return "C" + sub.slice(1).toUpperCase();
        return sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase();
      }).join('-')
    ).join('/');
    return minorWords.includes(word.toLowerCase()) && idx !== 0 ? word.toLowerCase() : parts;
  }).join(' ');
};

const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-4 py-5 border-b border-border/50 last:border-0">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-body text-base text-foreground leading-relaxed">{value}</p>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) return <NotFound />;

  const partner = partners.find((p) => p.name === product.principal);

  const relatedProducts = products
    .filter((p) => p.principal === product.principal && p.id !== product.id)
    .slice(0, 6);

  const displayTitle = (product.brand && product.brand !== "-" && product.brand.trim())
    ? product.brand.replace(/®/g, "®").replace(/™/g, "™").trim()
    : formatName(product.name);

  const genericName = (product.brand && product.brand !== "-" && product.brand.trim().toLowerCase() !== product.name.trim().toLowerCase())
    ? formatName(product.name)
    : "";

  const sampleParam = product.brand && product.brand !== "-"
    ? `${product.brand} (${product.name})`
    : product.name;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Products", url: "https://www.scope-india.com/products" },
    { name: displayTitle, url: `https://www.scope-india.com/products/${product.id}` },
  ]);

  return (
    <main>
      <SEO
        title={`${displayTitle} | ${product.principal} | Scope India`}
        description={`${displayTitle}${genericName ? ` (${genericName})` : ""} by ${product.principal}. ${product.application || product.description || "Available through Scope India."}`}
        canonical={`https://www.scope-india.com/products/${product.id}`}
      />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <span className="text-primary-foreground/80 truncate max-w-[200px]">{displayTitle}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            {/* Industry badge */}
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-4 ${
              product.industry === "pharma" ? "bg-white/10 border-white/20 text-white/80" :
              product.industry === "cosmetics" ? "bg-teal/20 border-teal/30 text-teal-foreground" :
              "bg-white/10 border-white/20 text-white/80"
            }`}>
              {industryLabel[product.industry]}
            </span>

            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-primary-foreground leading-tight tracking-tight">
              {displayTitle}
            </h1>

            {genericName && (
              <p className="mt-2 font-body text-lg text-primary-foreground/60">{genericName}</p>
            )}

            {product.grade && (
              <p className="mt-3 font-body text-base text-primary-foreground/50">
                Grade: <span className="text-primary-foreground/80 font-semibold">{product.grade}</span>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-background py-12 lg:py-20">
        <div className="container-scope">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">

            {/* Left: details card */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product details */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Product Details</h2>

                {(product.application || product.description) && (
                  <DetailRow
                    icon={FlaskConical}
                    label="Applications"
                    value={product.application || product.description}
                  />
                )}
                {product.category && (
                  <DetailRow icon={Tag} label="Category" value={product.category} />
                )}
                {product.grade && (
                  <DetailRow icon={Package} label="Grade" value={product.grade} />
                )}
                {product.inci && (
                  <DetailRow icon={FlaskConical} label="INCI Name" value={product.inci} />
                )}
                {product.manufacturer && product.manufacturer !== "-" && (
                  <DetailRow icon={Factory} label="Manufacturer" value={product.manufacturer} />
                )}
                {product.country && product.country !== "-" && (
                  <DetailRow icon={Globe} label="Country of Origin" value={product.country} />
                )}
              </motion.div>

              {/* Principal info */}
              {partner && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">About the Principal</h2>
                  <div className="flex items-start gap-4">
                    {partner.logo && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2">
                        <img
                          src={`/logos/${partner.logo}`}
                          alt={partner.name}
                          className="h-full w-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-foreground">{partner.name}</h3>
                      <p className="font-body text-sm text-muted-foreground mt-0.5">{partner.country} · {partner.specialty}</p>
                      {partner.about && (
                        <p className="mt-2 font-body text-base text-muted-foreground leading-relaxed line-clamp-3">
                          {partner.about.split("\n")[0]}
                        </p>
                      )}
                      <Link
                        to={`/principals/${partner.id}`}
                        className="mt-3 inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:underline"
                      >
                        View all {partner.name} products <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Related products */}
              {relatedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">
                    More from {product.principal}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedProducts.map((rp) => {
                      const rtitle = (rp.brand && rp.brand !== "-" && rp.brand.trim())
                        ? rp.brand.replace(/®/g, "®").replace(/™/g, "™").trim()
                        : formatName(rp.name);
                      return (
                        <Link
                          key={rp.id}
                          to={`/products/${rp.id}`}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-card px-4 py-4 transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                          <div className="min-w-0">
                            <p className="font-display text-sm font-bold text-foreground truncate uppercase tracking-tight">
                              {rtitle.replace(/®/g, "").replace(/™/g, "").trim().toUpperCase()}
                            </p>
                            {rp.grade && <p className="font-body text-xs text-muted-foreground mt-0.5">{rp.grade}</p>}
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                  {products.filter(p => p.principal === product.principal).length > 6 && (
                    <Link
                      to={`/products?principal=${encodeURIComponent(product.principal)}`}
                      className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:underline"
                    >
                      View all {product.principal} products <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right: sticky CTA sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="sticky top-28 space-y-4"
              >
                {/* Industry tag */}
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${industryColors[product.industry]}`}>
                  {industryLabel[product.industry]}
                </div>

                {/* Request Sample */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-foreground">Interested in this product?</h3>
                  <p className="mt-1.5 font-body text-base text-muted-foreground">
                    Request a sample or get in touch with our technical team for specifications and pricing.
                  </p>
                  <Link
                    to={`/request-sample?product=${encodeURIComponent(sampleParam)}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                  >
                    <Send className="h-4 w-4" /> Request a Sample
                  </Link>
                  <Link
                    to="/contact"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-display text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Quick facts */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
                  <h3 className="font-display text-base font-bold text-foreground">Quick Facts</h3>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">Principal</p>
                      <p className="font-body text-base font-semibold text-foreground">{product.principal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">Category</p>
                      <p className="font-body text-base font-semibold text-foreground">{product.category}</p>
                    </div>
                  </div>
                  {product.country && product.country !== "-" && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">Origin</p>
                        <p className="font-body text-base font-semibold text-foreground">{product.country}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Back link */}
                <Link
                  to="/products"
                  className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to all products
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
