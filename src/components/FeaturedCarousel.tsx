import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Article } from "@/lib/articles";

interface FeaturedCarouselProps {
  articles: Article[];
}

const FeaturedCarousel = ({ articles }: FeaturedCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + articles.length) % articles.length);
    },
    [articles.length],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
  }, [navigate, isPaused]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.88,
    }),
  };

  const article = articles[current];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Editor's Picks</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-11 h-11 rounded-full border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        className="container mx-auto px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-[2rem] overflow-hidden shadow-card bg-card" style={{ perspective: "1200px" }}>
          <div className="relative overflow-hidden aspect-[16/9] md:aspect-[2.4/1]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Link to={`/article/${article.slug}`} className="group block w-full h-full relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover ken-burns-img"
                  />
                  {/* Multi-layer gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/70 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.15em] font-body">
                        {article.category}
                      </span>
                      <span className="text-accent-foreground/50 text-xs font-body">{article.readTime}</span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="font-headline text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-accent-foreground leading-[1.08] max-w-3xl"
                    >
                      {article.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-4 text-accent-foreground/60 text-sm md:text-base font-body max-w-xl line-clamp-2 hidden md:block"
                    >
                      {article.excerpt}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-foreground/10 z-20">
            <motion.div
              key={current}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-primary origin-left"
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <span className="px-3 py-1.5 rounded-full bg-accent-foreground/10 backdrop-blur-md text-accent-foreground text-xs font-body font-semibold tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(articles.length).padStart(2, "0")}
            </span>
          </div>

          {/* Mobile nav */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20 md:hidden">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-accent-foreground/20 backdrop-blur-md text-accent-foreground flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-9 h-9 rounded-full bg-accent-foreground/20 backdrop-blur-md text-accent-foreground flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="hidden lg:flex items-center gap-3 mt-4">
          {articles.map((a, i) => (
            <button
              key={a.id}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`relative flex-1 rounded-xl overflow-hidden transition-all duration-500 group ${
                i === current ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div className="aspect-[16/9]">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
              </div>
              {i === current && (
                <motion.div
                  layoutId="thumb-indicator"
                  className="absolute inset-0 border-2 border-primary rounded-xl"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
