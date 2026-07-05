import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNews } from "@/context/NewsContext";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";

const tagColors: Record<string, string> = {
  Event: "bg-accent text-accent-foreground",
  News: "bg-accent text-accent-foreground",
  Press: "bg-primary text-primary-foreground",
};

const filters = ["All", "Event", "News", "Press"] as const;

const News = () => {
  const { articles } = useNews();
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "News & Events", url: "https://www.scope-india.com/news" }
  ]);

  return (
    <main>
      <SEO 
        title="News & Events | Scope Ingredients"
        description="Stay updated with the latest news, events, and press releases from Scope Ingredients in the pharmaceutical, cosmetic, and food industries."
        canonical="https://www.scope-india.com/news"
      />
      <StructuredData data={breadcrumbSchema} />
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            News & Events
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Stay updated with our latest news, product highlights, and corporate announcements.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                  filter === f ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-accent/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {filtered.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-scope overflow-hidden border-l-4 border-l-transparent transition-all hover:border-l-accent"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${tagColors[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm md:text-base font-semibold text-foreground line-clamp-3">{article.title}</h3>
                  <p className="mt-2 font-body text-xs md:text-sm text-text-secondary line-clamp-2">{article.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-body text-xs md:text-sm font-medium text-accent">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default News;
