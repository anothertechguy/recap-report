import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface FeaturedCarouselProps {
  articles: Article[];
}

const FeaturedCarousel = ({ articles }: FeaturedCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + articles.length) % articles.length);
    },
    [articles.length],
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => navigate(1), 6000);
    return () => clearInterval(timer);
  }, [navigate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? -8 : 8,
    }),
  };

  const article = articles[current];

  return (
    <section className="container mx-auto px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Editor's Picks</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
      </motion.div>

      <div className="relative rounded-3xl overflow-hidden shadow-card bg-card p-2" style={{ perspective: "1200px" }}>
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Link to={`/article/${article.slug}`} className="group block w-full h-full">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover ken-burns-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium uppercase tracking-widest font-body mb-3"
                  >
                    {article.category}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-headline text-xl md:text-3xl lg:text-4xl font-bold text-accent-foreground leading-[1.1] max-w-3xl"
                  >
                    {article.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 text-accent-foreground/70 text-sm font-body max-w-xl line-clamp-2 hidden md:block"
                  >
                    {article.excerpt}
                  </motion.p>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-accent-foreground/20 backdrop-blur-md text-accent-foreground flex items-center justify-center hover:bg-accent-foreground/30 transition-all duration-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-10 h-10 rounded-full bg-accent-foreground/20 backdrop-blur-md text-accent-foreground flex items-center justify-center hover:bg-accent-foreground/30 transition-all duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 md:bottom-6">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
              style={{ width: i === current ? 32 : 8 }}
            >
              <span className="absolute inset-0 rounded-full bg-accent-foreground/30" />
              {i === current && (
                <motion.span
                  layoutId="carousel-dot"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ duration: 0.4 }}
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
