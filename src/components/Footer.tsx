import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { categories } from "@/lib/articles";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-headline text-2xl font-bold text-accent-foreground">THE RECAP REPORT</h3>
            <p className="mt-4 text-accent-foreground/50 font-body text-sm leading-relaxed max-w-xs">
              An American news publication covering world news, trending celebrities, luxe lifestyle, business and the latest in sports and entertainment.
            </p>
            <a
              href="https://www.instagram.com/therecapreport/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-accent-foreground/60 hover:text-primary transition-colors font-body text-sm"
            >
              <Instagram size={18} />
              Follow us
            </a>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-accent-foreground/40 font-body mb-5">Sections</h4>
            <nav className="flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
                  className="text-sm text-accent-foreground/60 hover:text-primary transition-colors font-body"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-accent-foreground/40 font-body mb-5">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-accent-foreground/60 hover:text-primary transition-colors font-body">About</Link>
              <Link to="/contact" className="text-sm text-accent-foreground/60 hover:text-primary transition-colors font-body">Contact</Link>
              <Link to="/privacy" className="text-sm text-accent-foreground/60 hover:text-primary transition-colors font-body">Privacy Policy</Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent-foreground/10">
          <p className="text-xs text-accent-foreground/30 font-body text-center uppercase tracking-widest">
            © 2026 The Recap Report. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
