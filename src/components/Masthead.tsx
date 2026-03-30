import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { categories, articles } from "@/lib/articles";
import { motion, AnimatePresence } from "framer-motion";

const Masthead = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchResults = searchQuery.trim()
    ? articles
        .filter(
          (a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[box-shadow] duration-300 will-change-[box-shadow] ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_0_hsl(var(--border)),0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-background/80 backdrop-blur-md shadow-[0_1px_0_hsl(var(--border))]"
      }`}
    >
      {/* Red accent line */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary/30" />

      {/* Main Masthead */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-1 lg:flex-none text-center lg:text-left">
            <h1
              className="font-headline text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-none"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
            >
              THE RECAP <span className="text-primary">REPORT</span>
            </h1>
          </Link>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Open search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-8 mt-3 pt-3 border-t border-border">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
              className="relative text-xs font-semibold uppercase tracking-[0.12em] font-body text-muted-foreground hover:text-primary transition-colors duration-300 py-1 group"
            >
              {cat}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold uppercase tracking-[0.1em] font-body text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all py-2.5 px-3 rounded-lg"
                  >
                    {cat}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-start justify-center pt-[20vh]"
          >
            <div className="w-full max-w-2xl px-6">
              <div className="flex items-center gap-4 border-b-2 border-primary pb-4">
                <Search size={24} className="text-primary flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports..."
                  className="flex-1 bg-transparent text-2xl md:text-4xl font-headline font-medium text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 text-foreground hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {!searchQuery && (
                <p className="mt-4 text-sm text-muted-foreground font-body">Press ESC to close</p>
              )}

              {/* Search Results */}
              {searchQuery && searchResults.length > 0 && (
                <div className="mt-6 space-y-2">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="group block p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">
                            {article.category}
                          </span>
                          <h4 className="font-headline text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {article.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground font-body">No articles found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Masthead;
