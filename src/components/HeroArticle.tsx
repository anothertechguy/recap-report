import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";

interface HeroArticleProps {
  article: Article;
}

const HeroArticle = ({ article }: HeroArticleProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="container mx-auto px-6 py-10 md:py-16"
    >
      <Link to={`/article/${article.slug}`} className="group block">
        <div className="relative rounded-3xl overflow-hidden shadow-card article-card-3d bg-card p-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover ken-burns-img"
              loading="eager"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />

            {/* Content over image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium uppercase tracking-widest font-body mb-4">
                {article.category}
              </span>
              <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-accent-foreground leading-[1.1] max-w-4xl">
                {article.title}
              </h2>
              <p className="mt-4 text-accent-foreground/80 text-sm md:text-base font-body max-w-2xl leading-relaxed hidden md:block">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <span className="text-accent-foreground/60 text-xs font-body uppercase tracking-wider">{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-accent-foreground/40" />
                <span className="text-accent-foreground/60 text-xs font-body uppercase tracking-wider">{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
};

export default HeroArticle;
