import { Link } from "react-router-dom";
import { Instagram, ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/articles";

const Footer = () => {
  return (
    <footer className="bg-accent text-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Big brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
            THE RECAP
            <br />
            <span className="text-primary">REPORT</span>
          </h3>
          <p className="mt-6 text-white/35 font-body text-sm leading-relaxed max-w-md">
            An American news publication covering world news, trending celebrities, luxe lifestyle, business and the latest in sports and entertainment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Categories */}
          <div className="col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 font-body mb-5">Sections</h4>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(/ & /g, "-")}`}
                  className="text-sm text-white/45 hover:text-primary transition-colors font-body inline-flex items-center gap-1 group"
                >
                  {cat}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 font-body mb-5">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-white/45 hover:text-primary transition-colors font-body">About</Link>
              <Link to="/contact" className="text-sm text-white/45 hover:text-primary transition-colors font-body">Contact</Link>
              <Link to="/privacy" className="text-sm text-white/45 hover:text-primary transition-colors font-body">Privacy Policy</Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 font-body mb-5">Connect</h4>
            <a
              href="https://www.instagram.com/therecapreport/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/45 hover:text-primary transition-colors font-body text-sm group"
            >
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <Instagram size={16} />
              </span>
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 font-body uppercase tracking-[0.15em]">
            © 2026 The Recap Report. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20 font-body uppercase tracking-[0.15em] inline-flex items-center gap-1.5">
            <MapPin size={10} />
            Atlanta, GA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
