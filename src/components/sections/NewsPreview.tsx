import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/news";

const tagStyles: Record<string, string> = {
  Event: "bg-pharma/10 text-pharma border-pharma/20",
  News:  "bg-personal-care/10 text-personal-care border-personal-care/20",
  Press: "bg-primary/10 text-primary border-primary/20",
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return { day: d.getDate(), month: d.toLocaleString("en", { month: "short" }).toUpperCase(), year: d.getFullYear() };
};

const NewsPreview = () => {
  const [featured, ...rest] = articles.slice(0, 3);
  const fd = formatDate(featured.date);

  return (
    <section className="section-padding bg-background">
      <div className="container-scope">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="section-tag">✦ Latest News</span>
            <h2 className="mt-4 font-display text-h1 font-bold text-foreground">Latest from Scope</h2>
          </div>
          <Link
            to="/news"
            className="hidden group items-center gap-1.5 font-display text-sm font-semibold text-accent transition-colors hover:text-accent-light md:inline-flex"
          >
            All News
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-5">

          {/* Featured article — large */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group lg:col-span-3"
          >
            <Link to={`/news/${featured.slug}`} className="block h-full">
              <div className="flex h-full flex-col rounded-[2rem] border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_16px_48px_rgba(219,142,0,0.08)] hover:-translate-y-1">
                {/* Date strip */}
                <div className="flex items-center gap-4 border-b border-border/50 px-7 py-4">
                  <div className="text-center">
                    <p className="font-display text-2xl font-black text-foreground leading-none">{fd.day}</p>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{fd.month} {fd.year}</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <span className={`rounded-full border px-3 py-1 font-body text-[11px] font-semibold ${tagStyles[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold text-foreground leading-snug lg:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-accent transition-all group-hover:gap-2.5">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Smaller articles */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {rest.map((article, i) => {
              const d = formatDate(article.date);
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex-1"
                >
                  <Link to={`/news/${article.slug}`} className="block h-full">
                    <div className="flex h-full flex-col rounded-[1.5rem] border border-border/60 bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(219,142,0,0.06)] hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 font-body text-[11px] font-semibold ${tagStyles[article.category]}`}>
                          {article.category}
                        </span>
                        <span className="font-body text-[11px] text-muted-foreground">
                          {d.day} {d.month} {d.year}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-[15px] font-bold text-foreground leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 font-display text-xs font-bold text-accent transition-all group-hover:gap-2">
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Mobile "all news" link */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/news" className="inline-flex items-center gap-1 font-body text-sm font-medium text-accent">
            View All News →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
