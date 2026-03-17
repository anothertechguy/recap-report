import { motion } from "framer-motion";
import { articles } from "@/lib/articles";
import BreakingTicker from "@/components/BreakingTicker";
import Masthead from "@/components/Masthead";
import StockTicker from "@/components/StockTicker";
import HeroArticle from "@/components/HeroArticle";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ArticleCard from "@/components/ArticleCard";
import SectionDivider from "@/components/SectionDivider";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  const featuredArticle = articles[0];
  const carouselArticles = articles.slice(0, 5);
  const latestArticles = articles.slice(1, 5);
  const trendingArticles = articles.slice(5);

  return (
    <div className="min-h-screen bg-background">
      <BreakingTicker />
      <Masthead />
      <StockTicker />
      <HeroArticle article={featuredArticle} />

      {/* Featured Carousel */}
      <FeaturedCarousel articles={carouselArticles} />

      {/* Latest Reports — Broken Grid */}
      <section className="container mx-auto px-6 pb-16">
        <SectionDivider title="Latest Reports" accent />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Main column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            {latestArticles.slice(0, 2).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* Sidebar */}
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
          <SectionDivider title="More Stories" />

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
