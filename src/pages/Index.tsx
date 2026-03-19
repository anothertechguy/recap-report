import { motion } from "framer-motion";
import { articles } from "@/lib/articles";
import BreakingTicker from "@/components/BreakingTicker";
import Masthead from "@/components/Masthead";
import StockTicker from "@/components/StockTicker";
import HeroArticle from "@/components/HeroArticle";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ArticleCard from "@/components/ArticleCard";
import SectionDivider from "@/components/SectionDivider";
import CultureSpotlight from "@/components/CultureSpotlight";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  const featuredArticle = articles[0];
  const carouselArticles = articles.slice(0, 5);
  const latestArticles = articles.slice(1, 5);
  const spotlightArticle = articles[2];
  const moreArticles = articles.slice(5);

  return (
    <div className="min-h-screen bg-background">
      <BreakingTicker />
      <Masthead />
      <StockTicker />
      <HeroArticle article={featuredArticle} />

      {/* Featured Carousel */}
      <FeaturedCarousel articles={carouselArticles} />

      {/* Latest Reports — Feature layout */}
      <section className="container mx-auto px-6 pb-8">
        <SectionDivider title="Latest Reports" accent subtitle="In-depth stories that matter" />

        {/* Feature card for first article */}
        <div className="mb-8">
          <ArticleCard article={latestArticles[0]} index={0} variant="feature" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Main column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <ArticleCard article={latestArticles[1]} index={1} variant="feature" />
          </div>

          {/* Sidebar — Trending */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-[2rem] bg-card shadow-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary font-body">Trending Now</h3>
                </div>
                <div className="space-y-1 divide-y divide-border">
                  {latestArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} variant="compact" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Spotlight — Full bleed editorial moment */}
      <CultureSpotlight article={spotlightArticle} />

      {/* More Stories — Card grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <SectionDivider title="More Stories" subtitle="Explore what's shaping the culture" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {moreArticles.map((article, i) => (
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
