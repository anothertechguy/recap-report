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
  // 1. Hero: top 3 most recent articles
  const heroArticles = articles.slice(0, 3);
  const usedIds = new Set(heroArticles.map(a => a.id));

  // 2. Editor's Picks (Carousel): exactly 1 from each category, ensuring no overlap with Hero
  const carouselArticles = [];
  // Get unique categories from the articles array to ensure dynamic matching
  const availableCategories = Array.from(new Set(articles.map(a => a.category)));
  
  for (const cat of availableCategories) {
    const articleForCat = articles.find(a => a.category === cat && !usedIds.has(a.id));
    if (articleForCat) {
      carouselArticles.push(articleForCat);
      usedIds.add(articleForCat.id);
    }
  }

  // 3. Latest Reports section: next 2 unique articles
  const latestArticles = articles.filter(a => !usedIds.has(a.id)).slice(0, 2);
  latestArticles.forEach(a => usedIds.add(a.id));

  // 4. Trending sidebar: next 4 unique articles
  const trendingArticles = articles.filter(a => !usedIds.has(a.id)).slice(0, 4);
  trendingArticles.forEach(a => usedIds.add(a.id));

  // 5. Culture Spotlight: next 1 unique article
  const spotlightArticle = articles.filter(a => !usedIds.has(a.id))[0];
  if (spotlightArticle) usedIds.add(spotlightArticle.id);

  // 6. More Stories: the remaining unique articles
  const moreArticles = articles.filter(a => !usedIds.has(a.id));

  return (
    <div className="min-h-screen bg-background">
      <BreakingTicker />
      <Masthead />
      <StockTicker />
      {/* Hero Section */}
      {heroArticles.length > 0 && <HeroArticle articles={heroArticles} />}

      {/* Featured Carousel */}
      {carouselArticles.length > 0 && <FeaturedCarousel articles={carouselArticles} />}

      {/* Latest Reports — Feature layout */}
      <section className="container mx-auto px-6 pb-8">
        <SectionDivider title="Latest Reports" accent subtitle="In-depth stories that matter" />

        {/* Feature card for first article */}
        {latestArticles[0] && (
          <div className="mb-8">
            <ArticleCard article={latestArticles[0]} index={0} variant="feature" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Main column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            {latestArticles[1] && (
              <ArticleCard article={latestArticles[1]} index={1} variant="feature" />
            )}
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
      {spotlightArticle && <CultureSpotlight article={spotlightArticle} />}

      {/* More Stories — Topic toggle + thumbnail columns */}
      <MoreStories articles={moreArticles} />

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
