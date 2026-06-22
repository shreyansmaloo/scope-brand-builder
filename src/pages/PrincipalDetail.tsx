import { useParams, Link } from "react-router-dom";
import { partners } from "@/data/partners";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ArrowLeft, Hexagon, ChevronRight } from "lucide-react";
import NotFound from "./NotFound";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";

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

const PrincipalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return <NotFound />;
  }

  const partnerProducts = products.filter((product) => product.principal === partner.name);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Principals", url: "https://www.scope-india.com/principals" },
    { name: partner.name, url: `https://www.scope-india.com/principals/${partner.id}` }
  ]);

  return (
    <main>
      <SEO 
        title={`${partner.name} | Principal Representation India | Scope Ingredients`}
        description={`Scope Ingredients is the trusted authorized distributor for ${partner.name} in India. Explore their range of ${partner.specialty}.`}
        canonical={`https://www.scope-india.com/principals/${partner.id}`}
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-card border-b border-border/50">
        <div className="container-scope">
          <Link to="/principals" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Principals
          </Link>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-display text-xs font-semibold text-primary">
                  <Globe className="mr-2 h-3 w-3" />
                  {partner.country}
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  {partner.name}
                </h1>
                {partner.about && (
                  <p className="font-body text-lg text-text-secondary leading-relaxed max-w-3xl">
                    {partner.about}
                  </p>
                )}
                {!partner.about && (
                  <p className="font-body text-lg text-text-secondary leading-relaxed max-w-3xl">
                    {partner.specialty}. A trusted global partner of Scope Ingredients.
                  </p>
                )}
              </motion.div>
            </div>
            <div className="md:col-span-4">
               <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-background p-8 shadow-sm flex items-center justify-center min-h-[200px]"
              >
                <img 
                  src={partner.logo ? `/logos/${partner.logo}` : `/logos/${partner.id}.png`} 
                  alt={partner.name}
                  className="w-full max-w-[200px] object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const div = document.createElement("div");
                    div.className = "flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-3xl font-bold";
                    div.textContent = partner.name.substring(0, 2).toUpperCase();
                    target.parentElement?.appendChild(div);
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-h2 font-bold text-foreground">Our Range from {partner.name}</h2>
              <p className="mt-2 font-body text-text-secondary">
                Explore the complete portfolio of {partnerProducts.length} ingredients and solutions.
              </p>
            </div>
            <Link to={`/products?principal=${encodeURIComponent(partner.name)}`} className="mt-4 md:mt-0 inline-flex items-center text-accent hover:text-accent-light font-display text-sm font-semibold transition-colors">
              Filter in Product Catalog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {partnerProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnerProducts.map((product, i) => {
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
                      to={`/products/${product.id}`}
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
          ) : (
            <div className="rounded-2xl border border-dashed border-border/60 bg-card/50 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Hexagon className="h-8 w-8 opacity-50" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">No Catalog Products Found</h3>
              <p className="mt-2 mx-auto max-w-md font-body text-text-secondary text-sm">
                We are currently updating our digital catalog for {partner.name}. Please contact our sales team for the complete product list.
              </p>
              <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 font-display text-sm font-semibold text-primary-foreground hover:bg-primary-light">
                Contact Sales Team
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PrincipalDetail;
