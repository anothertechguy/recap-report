import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface CultureSpotlightProps {
  article: Article;
}

const CultureSpotlight = ({ article }: CultureSpotlightProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Parallax bg — GPU promoted */}
      <motion.div className="absolute inset-0" style={{ y: bgY, willChange: "transform" }}>
        <img
          src={article.image}
          alt=""
          className="w-full h-[130%] object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/85" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-l from-primary via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-[0.2em] font-body mb-8">
              Culture Spotlight
            </span>
          </motion.div>

          {/* Decorative quote marks */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline text-[20rem] font-black text-white select-none pointer-events-none leading-none"
          >
            "
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] italic relative z-10"
          >
            "{article.excerpt}"
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-[2px] bg-primary"
            />
            <p className="text-white/50 font-body text-sm uppercase tracking-widest">
              {article.author.name} — {article.category}
            </p>
            <Link
              to={`/article/${article.slug}`}
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold font-body uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              Read the Story
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CultureSpotlight;
