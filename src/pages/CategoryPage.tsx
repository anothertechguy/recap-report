import { useParams } from "react-router-dom";
import { articles, categories } from "@/lib/articles";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SectionDivider from "@/components/SectionDivider";
import NewsletterSignup from "@/components/NewsletterSignup";
import StockTicker from "@/components/StockTicker";
import BreakingTicker from "@/components/BreakingTicker";
import NotFound from "./NotFound";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Dynamically build slug→name map from the categories array
  const categoryName = categorySlug
    ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase())
    : undefined;

  if (!categoryName) return <NotFound />;

  const categoryArticles = articles.filter(a => a.categories.includes(categoryName));

  return (
    <div className="min-h-screen bg-background">
      <BreakingTicker />
      <Masthead />
      <StockTicker />

      <main className="container mx-auto px-6 py-16 md:py-24 min-h-[60vh]">
        <div className="mb-12">
          <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
            {categoryName}
          </h1>
          <div className="w-24 h-2 bg-primary mt-6 mb-8" />
          <p className="text-muted-foreground font-body text-lg max-w-2xl">
            The latest news, features, and deep dives from our {categoryName.toLowerCase()} desk.
          </p>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 gap-y-12">
            {categoryArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} variant="default" />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-border/60 rounded-xl bg-card/30">
            <p className="text-muted-foreground font-body">No stories in this category yet.</p>
          </div>
        )}
      </main>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default CategoryPage;
