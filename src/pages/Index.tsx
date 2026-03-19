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
import MoreStories from "@/components/MoreStories";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  // Hero: article 0
  const featuredArticle = articles[0];

  // Carousel: articles 1-5
  const carouselArticles = articles.slice(1, 6);

  // Latest Reports section: articles 6-7
  const latestArticles = articles.slice(6, 8);

  // Trending sidebar: articles 8-11
  const trendingArticles = articles.slice(8, 12);

  // Culture Spotlight: article 12
  const spotlightArticle = articles[12];

  // More Stories: rest of articles (13+), curated across categories
  const moreArticles = articles.slice(13);

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
                className="rounded-2xl bg-card shadow-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary font-body">Trending Now</h3>
                </div>
                <div className="space-y-1 divide-y divide-border">
                  {trendingArticles.map((article, i) => (
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

      {/* More Stories — Topic toggle + thumbnail columns */}
      <MoreStories articles={moreArticles} />

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
