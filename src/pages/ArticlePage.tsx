import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Mail, Clock, Calendar, Share2, Link2, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { articles } from "@/lib/articles";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Related stories — same category, excluding current
  const related = article
    ? articles
        .filter((a) => a.id !== article.id && a.categories.some((c) => article.categories.includes(c)))
        .slice(0, 3)
    : [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    if (!article) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-foreground">Article not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary font-body hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <motion.div
        className="reading-progress"
        style={{ scaleX }}
      />

      <Masthead />

      {/* Back link */}
      <div className="container mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Reports
        </Link>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="container mx-auto px-6 mt-6"
      >
        <div
          className="rounded-2xl overflow-hidden shadow-card bg-muted/10 transition-transform duration-700 hover:shadow-card-hover flex justify-center relative"
          style={{ perspective: "1000px" }}
        >
          <div className="w-full max-h-[75vh] flex justify-center items-center group overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="container mx-auto px-6 py-12 max-w-3xl"
      >
        <span className="category-tag">{article.category}</span>
        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 leading-[1.08]">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground font-body">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime}</span>
        </div>

        {/* Author + Share */}
        <div className="flex items-center justify-between gap-4 mt-8 pb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-background ring-offset-2 ring-offset-primary"
              />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground text-sm">{article.author.name}</p>
              <a
                href={`mailto:${article.author.email}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-body underline underline-offset-2"
              >
                <Mail size={12} className="inline mr-1" />
                {article.author.email}
              </a>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              title="Copy link"
            >
              <Link2 size={14} />
            </button>
            <button
              onClick={handleShareTwitter}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              title="Share on X"
            >
              <Share2 size={14} />
            </button>
            {copied && (
              <span className="text-xs text-primary font-body font-medium animate-fade-in">Copied!</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 font-body text-foreground leading-[1.85] text-base md:text-lg max-w-[65ch] space-y-6">
          <p className="text-xl md:text-2xl font-headline font-medium leading-relaxed text-foreground/90">
            {article.excerpt}
          </p>
          <p className="drop-cap">
            In an era where media landscapes shift daily and platforms rise and fall with algorithmic whims, there are those who choose to build differently. Not faster, not louder — but deeper. With intention. With community at the center of every decision.
          </p>
          <p>
            This is a story about vision, resilience, and the kind of leadership that doesn't seek the spotlight but inevitably draws it. It's about creating infrastructure where none existed, and doing so with a clarity of purpose that resonates far beyond any single headline.
          </p>
          <p>
            The journey hasn't been without its challenges. In fact, the obstacles have been the very things that shaped the mission — turning setbacks into stepping stones, and criticism into fuel for innovation.
          </p>
          <blockquote className="border-l-4 border-primary pl-6 py-4 my-10 italic text-xl md:text-2xl text-foreground/80 font-headline leading-snug">
            "We're not just building a platform. We're building a legacy. And legacies aren't built on shortcuts."
          </blockquote>
          <p>
            What makes this work particularly compelling is its refusal to conform to existing models. Instead of replicating what already exists, the approach has been to reimagine what's possible — and then build toward it, one intentional step at a time.
          </p>
          <p>
            The impact is measurable but extends far beyond metrics. It's visible in the communities that have formed, the creators who have found their voice, and the conversations that continue to ripple outward, challenging assumptions and inspiring action.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 pt-8 border-t border-border">
          <span className="text-xs text-muted-foreground font-body uppercase tracking-widest">Filed under</span>
          <div className="flex flex-wrap gap-2 mt-3">
            {article.categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-body font-medium hover:bg-primary hover:text-white transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Related Stories</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
