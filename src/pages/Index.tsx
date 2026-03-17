import { motion } from "framer-motion";
import { articles } from "@/lib/articles";
import BreakingTicker from "@/components/BreakingTicker";
import Masthead from "@/components/Masthead";
import HeroArticle from "@/components/HeroArticle";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 5);
  const trendingArticles = articles.slice(5);

  return (
    <div className="min-h-screen bg-background">
      <BreakingTicker />
      <Masthead />
      <HeroArticle article={featuredArticle} />

      {/* Latest Reports — Broken Grid */}
      <section className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Latest Reports</h2>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Main column — 65% */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            {latestArticles.slice(0, 2).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* Sidebar — 35% */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl bg-card shadow-card p-6"
              >
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-primary font-body mb-2">Trending Now</h3>
                <div className="divide-y divide-border">
                  {latestArticles.slice(0, 4).map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} variant="compact" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">More Stories</h2>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trendingArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
