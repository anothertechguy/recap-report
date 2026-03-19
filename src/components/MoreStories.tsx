import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Article } from "@/lib/articles";

interface MoreStoriesProps {
  articles: Article[];
}

const MoreStories = ({ articles }: MoreStoriesProps) => {
  // Extract unique categories from all passed articles
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach((a) => a.categories.forEach((c) => cats.add(c)));
    return ["All", ...Array.from(cats).sort()];
  }, [articles]);

  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return articles;
    return articles.filter((a) => a.categories.includes(active));
  }, [active, articles]);

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">More Stories</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
        </div>

        {/* Topic toggles */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.12em] font-body transition-all duration-300 border ${
                active === cat
                  ? "bg-primary text-white border-primary shadow-[0_0_20px_hsl(0_78%_50%/0.25)]"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Column layout with thumbnails */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0"
          >
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/article/${article.slug}`}
                  className="group flex gap-4 items-center py-5 border-b border-border/60 hover:border-primary/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm ring-1 ring-border/50 group-hover:ring-primary/30 transition-all duration-500" style={{ perspective: "600px" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className="category-tag text-[10px]">{article.category}</span>
                    <h3 className="font-headline text-sm md:text-[15px] font-bold text-foreground mt-1 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-muted-foreground font-body">{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[11px] text-muted-foreground font-body">{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body py-12">No stories in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default MoreStories;
