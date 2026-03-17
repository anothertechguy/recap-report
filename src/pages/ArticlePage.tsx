import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Clock, Calendar } from "lucide-react";
import { articles } from "@/lib/articles";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

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
      <Masthead />

      {/* Back link */}
      <div className="container mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
          <ArrowLeft size={16} />
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
        <div className="rounded-3xl overflow-hidden shadow-card p-2 bg-card">
          <div className="overflow-hidden rounded-2xl aspect-[21/9]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover ken-burns-img"
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

        {/* Author */}
        <div className="flex items-center gap-4 mt-8 pb-8 border-b border-border">
          <div className="relative">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
              style={{ boxShadow: '0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary))' }}
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

        {/* Body */}
        <div className="mt-10 font-body text-foreground leading-[1.8] text-base md:text-lg max-w-[65ch] space-y-6">
          <p className="text-xl md:text-2xl font-headline font-medium leading-relaxed text-foreground/90">
            {article.excerpt}
          </p>
          <p>
            In an era where media landscapes shift daily and platforms rise and fall with algorithmic whims, there are those who choose to build differently. Not faster, not louder — but deeper. With intention. With community at the center of every decision.
          </p>
          <p>
            This is a story about vision, resilience, and the kind of leadership that doesn't seek the spotlight but inevitably draws it. It's about creating infrastructure where none existed, and doing so with a clarity of purpose that resonates far beyond any single headline.
          </p>
          <p>
            The journey hasn't been without its challenges. In fact, the obstacles have been the very things that shaped the mission — turning setbacks into stepping stones, and criticism into fuel for innovation.
          </p>
          <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg text-foreground/80 font-headline">
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
              <span key={cat} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-body font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  );
};

export default ArticlePage;
