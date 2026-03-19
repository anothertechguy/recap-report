import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface HeroArticleProps {
  article: Article;
}

const HeroArticle = ({ article }: HeroArticleProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden"
    >
      {/* Parallax Image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      {/* Side accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary z-10" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-10"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] font-body mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
              {article.category}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-headline text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-accent-foreground leading-[1.05] max-w-5xl"
          >
            {article.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-5 text-accent-foreground/70 text-base md:text-lg font-body max-w-2xl leading-relaxed hidden md:block"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 flex items-center gap-6"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold font-body uppercase tracking-wider group cursor-pointer">
              Read Full Story
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="w-px h-4 bg-accent-foreground/20" />
            <span className="text-accent-foreground/50 text-xs font-body uppercase tracking-wider">{article.date}</span>
            <span className="text-accent-foreground/50 text-xs font-body uppercase tracking-wider">{article.readTime}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </motion.section>
  );
};

export default HeroArticle;
