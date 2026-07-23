import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const hasRotated = useRef(false);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + articles.length) % articles.length);
      hasRotated.current = true;
    },
    [articles.length],
  );

  useEffect(() => {
    if (isPaused) return;
    const delay = hasRotated.current ? 5000 : 2000;
    const timer = setTimeout(() => navigate(1), delay);
    return () => clearTimeout(timer);
  }, [navigate, isPaused, current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.92,
    }),
  };

  const article = articles[current];

  return (
    <div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-3 h-3 rounded-full bg-primary" />
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Latest Reports</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-card bg-card" style={{ perspective: "1200px" }}>
          <div className="relative overflow-hidden aspect-[16/9]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Link to={`/article/${article.slug}`} className="group block w-full h-full relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-[center_20%] ken-burns-img"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Sharp gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em] font-body">
                        {article.category}
                      </span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="font-headline text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.08] max-w-3xl"
                    >
                      {article.title}
                    </motion.h3>



                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
            <motion.div
              key={current}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-primary origin-left"
            />
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-body font-semibold tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(articles.length).padStart(2, "0")}
            </span>
          </div>

          {/* Mobile nav */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20 md:hidden">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center"
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
              className={`relative flex-1 rounded-lg overflow-hidden transition-all duration-500 group ${
                i === current ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-40 hover:opacity-70 grayscale hover:grayscale-0"
              }`}
            >
              <div className="aspect-[16/9]">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
