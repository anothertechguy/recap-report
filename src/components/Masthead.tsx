import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { categories } from "@/lib/articles";
import { motion, AnimatePresence } from "framer-motion";

const Masthead = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl" style={{ boxShadow: '0 1px 0 hsl(var(--border))' }}>
      {/* Main Masthead */}
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-1 lg:flex-none text-center lg:text-left">
            <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-none">
              THE RECAP REPORT
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
        <nav className="hidden lg:flex items-center justify-center gap-8 mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
              className="text-xs font-medium uppercase tracking-[0.12em] font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {cat}
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
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.1em] font-body text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {cat}
                </Link>
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
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-start justify-center pt-[20vh]"
          >
            <div className="w-full max-w-2xl px-6">
              <div className="flex items-center gap-4 border-b-2 border-foreground pb-4">
                <Search size={24} className="text-foreground flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search reports..."
                  className="flex-1 bg-transparent text-2xl md:text-4xl font-headline font-medium text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="p-2 text-foreground hover:text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-body">Press ESC to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Masthead;
