import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  index: number;
  variant?: "default" | "compact";
}

const ArticleCard = ({ article, index, variant = "default" }: ArticleCardProps) => {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link to={`/article/${article.slug}`} className="group flex gap-5 items-start py-5 border-b border-border last:border-0">
          <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover ken-burns-img"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="category-tag text-[10px]">{article.category}</span>
            <h3 className="font-headline text-base font-semibold text-foreground mt-1 leading-snug line-clamp-2 headline-link">
              {article.title}
            </h3>
            <span className="text-xs text-muted-foreground font-body mt-2 block">{article.date}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link to={`/article/${article.slug}`} className="group block">
        <div className="rounded-3xl overflow-hidden shadow-card article-card-3d bg-card p-2">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover ken-burns-img"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-5 md:p-6">
            <span className="category-tag">{article.category}</span>
            <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mt-2 leading-snug headline-link">
              {article.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-body">{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs text-muted-foreground font-body">{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
