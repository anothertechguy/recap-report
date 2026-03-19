import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  index: number;
  variant?: "default" | "compact" | "feature";
}

const ArticleCard = ({ article, index, variant = "default" }: ArticleCardProps) => {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link to={`/article/${article.slug}`} className="group flex gap-4 items-start py-4 first:pt-0 last:pb-0">
          <span className="text-4xl font-headline font-black text-primary/20 leading-none mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <span className="category-tag text-[10px]">{article.category}</span>
            <h3 className="font-headline text-sm font-bold text-foreground mt-1 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {article.title}
            </h3>
            <span className="text-[11px] text-muted-foreground font-body mt-1.5 block">{article.date}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "feature") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 4 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ perspective: "1000px" }}
      >
        <Link to={`/article/${article.slug}`} className="group block">
          <div className="relative rounded-[2rem] overflow-hidden bg-card shadow-card article-card-3d">
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover ken-burns-img"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 hidden md:block" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="category-tag">{article.category}</span>
                <h3 className="font-headline text-xl md:text-2xl lg:text-3xl font-black text-foreground mt-3 leading-[1.1] group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-body">{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-muted-foreground font-body">{article.readTime}</span>
                  </div>
                  <span className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-foreground">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link to={`/article/${article.slug}`} className="group block">
        <div className="rounded-[2rem] overflow-hidden shadow-card article-card-3d bg-card">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover ken-burns-img"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Hover arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/0 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-primary transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight size={16} className="text-primary-foreground" />
            </div>
          </div>
          <div className="p-5 md:p-6">
            <span className="category-tag">{article.category}</span>
            <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mt-2 leading-snug group-hover:text-primary transition-colors duration-300">
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
