import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface HeroArticleProps {
  articles: Article[];
}

const HeroArticle = ({ articles }: HeroArticleProps) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);

  useEffect(() => {
    if (isHovered || articles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [articles.length, isHovered]);

  if (!articles || articles.length === 0) return null;
  const article = articles[current];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Parallax Image */}
          <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays for sharp contrast */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Side accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-10 pointer-events-none"
      >
        <div className="container mx-auto flex items-end justify-between gap-8">
          <div className="flex-1 pointer-events-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.15em] font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    {article.category}
                  </span>
                </div>

                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05]">
                  {article.title}
                </h2>

                <p className="mt-5 text-white/70 text-base md:text-lg font-body max-w-2xl leading-relaxed hidden md:block">
                  {article.excerpt}
                </p>

                <div className="mt-7 flex items-center gap-6">
                  <Link
                    to={`/article/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary text-sm font-bold font-body uppercase tracking-wider group bg-black/30 hover:bg-black/50 backdrop-blur-md px-6 py-3 rounded-full transition-all border border-white/5"
                  >
                    Read Full Story
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="w-px h-4 bg-white/20 hidden md:inline-block" />
                  <span className="text-white/50 text-xs font-body uppercase tracking-wider hidden md:inline-block">{article.date}</span>
                  <span className="text-white/50 text-xs font-body uppercase tracking-wider hidden md:inline-block">{article.readTime}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Slide Indicators */}
          {articles.length > 1 && (
            <div className="hidden md:flex items-center gap-2 pointer-events-auto pb-4">
              {articles.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setCurrent(i)}
                  onClick={() => setCurrent(i)}
                  className="group py-2 px-1 focus:outline-none"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span 
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      current === i 
                        ? "w-12 bg-primary" 
                        : "w-6 bg-white/30 group-hover:bg-white/60 group-hover:w-8"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </motion.section>
  );
};

export default HeroArticle;
