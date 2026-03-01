import { useParams, Link } from "react-router-dom";
import { partners } from "@/data/partners";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ArrowLeft, Hexagon } from "lucide-react";
import NotFound from "./NotFound";

const PrincipalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return <NotFound />;
  }

  const partnerProducts = products.filter((product) => product.principal === partner.name);

  return (
    <main>
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
                  src={`/logos/${partner.id}.png`} 
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partnerProducts.map((product, i) => (
                 <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card-scope flex flex-col justify-between p-6 hover:border-accent/30 transition-colors"
                >
                  <div>
                    <div className="mb-4 inline-flex items-center rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent-light">
                      {product.industry.charAt(0).toUpperCase() + product.industry.slice(1)}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {product.name}
                      </h3>
                    </div>
                    <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                       <span className="inline-flex items-center rounded bg-primary-muted/10 px-2 py-0.5 text-xs font-medium text-primary">
                          <Hexagon className="mr-1.5 h-3 w-3" />
                          {product.category}
                        </span>
                    </div>

                    <Link
                      to={`/contact?product=${encodeURIComponent(product.name)}`}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-card px-4 py-2 font-display text-sm font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-accent hover:text-accent-foreground"
                    >
                      Request Details
                    </Link>
                  </div>
                </motion.div>
              ))}
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
