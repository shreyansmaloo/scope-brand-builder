import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/news";

const tagColors: Record<string, string> = {
  Event: "bg-accent text-accent-foreground",
  News: "bg-teal text-teal-foreground",
  Press: "bg-primary text-primary-foreground",
};

const NewsPreview = () => {
  const latest = articles.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="container-scope">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-h2 font-bold text-foreground">
            Latest from Scope
          </h2>
          <Link
            to="/news"
            className="hidden items-center gap-1 font-body text-sm font-medium text-accent transition-colors hover:text-accent-light md:flex"
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-scope group overflow-hidden border-l-4 border-l-transparent transition-all hover:border-l-accent"
            >
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 font-body text-xs font-medium ${tagColors[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 font-body text-sm text-text-secondary line-clamp-2">
                  {article.excerpt}
                </p>
                <Link
                  to={`/news/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-accent"
                >
                  Read More
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-1 font-body text-sm font-medium text-accent"
          >
            View All News →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
